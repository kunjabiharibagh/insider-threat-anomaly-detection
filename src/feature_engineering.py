import pandas as pd
from data_preprocessing import load_logon_data, load_device_data, load_insiders_answer

RAW_DATA_PATH = "data/raw/r4.2"

def engineer_logon_features(logon_df):
    logon_df['date'] = pd.to_datetime(logon_df['date'])
    logon_df['day'] = logon_df['date'].dt.date
    logon_df['hour'] = logon_df['date'].dt.hour

    logon_only = logon_df[logon_df['activity'] == 'Logon'].copy()
    logon_only['after_hours'] = logon_only['hour'].apply(lambda h: 1 if (h < 7 or h >= 19) else 0)

    grouped = logon_only.groupby(['user', 'day']).agg(
        logon_count=('id', 'count'),
        after_hours_logon_count=('after_hours', 'sum'),
        distinct_pc_count=('pc', 'nunique')
    ).reset_index()

    return grouped

def engineer_device_features(device_df):
    device_df['date'] = pd.to_datetime(device_df['date'])
    device_df['day'] = device_df['date'].dt.date

    connects_only = device_df[device_df['activity'] == 'Connect'].copy()

    grouped = connects_only.groupby(['user', 'day']).agg(
        usb_connect_count=('id', 'count')
    ).reset_index()

    return grouped

def engineer_file_features():
    print("Loading file.csv...")
    df = pd.read_csv(f"{RAW_DATA_PATH}/file.csv", usecols=['id', 'date', 'user'])
    df['date'] = pd.to_datetime(df['date'])
    df['day'] = df['date'].dt.date

    grouped = df.groupby(['user', 'day']).agg(
        file_access_count=('id', 'count')
    ).reset_index()

    return grouped

def engineer_email_features(chunksize=300000, company_domain="dtaa.com"):
    print("Loading email.csv in chunks (this may take a few minutes)...")
    cols = ['id', 'date', 'user', 'to', 'cc', 'bcc']
    chunks = []

    for chunk in pd.read_csv(f"{RAW_DATA_PATH}/email.csv", usecols=cols, chunksize=chunksize):
        chunk['date'] = pd.to_datetime(chunk['date'])
        chunk['day'] = chunk['date'].dt.date

        def count_external(row):
            recipients = str(row['to']) + ';' + str(row['cc']) + ';' + str(row['bcc'])
            addresses = [a.strip() for a in recipients.split(';') if a.strip() and a.strip() != 'nan']
            return sum(1 for a in addresses if company_domain not in a)

        chunk['external_count'] = chunk.apply(count_external, axis=1)
        chunk['is_external'] = (chunk['external_count'] > 0).astype(int)

        grouped = chunk.groupby(['user', 'day']).agg(
            email_count=('id', 'count'),
            email_external_count=('is_external', 'sum')
        ).reset_index()

        chunks.append(grouped)

    combined = pd.concat(chunks, ignore_index=True)
    final = combined.groupby(['user', 'day']).agg(
        email_count=('email_count', 'sum'),
        email_external_count=('email_external_count', 'sum')
    ).reset_index()

    return final

def label_insider_days(features_df, insiders_df):
    insiders_r42 = insiders_df[insiders_df['dataset'] == 4.2].copy()
    insiders_r42['start'] = pd.to_datetime(insiders_r42['start'])
    insiders_r42['end'] = pd.to_datetime(insiders_r42['end'])

    features_df['day'] = pd.to_datetime(features_df['day'])
    features_df['is_insider_day'] = 0

    for _, row in insiders_r42.iterrows():
        mask = (
            (features_df['user'] == row['user']) &
            (features_df['day'] >= row['start'].normalize()) &
            (features_df['day'] <= row['end'].normalize())
        )
        features_df.loc[mask, 'is_insider_day'] = 1

    return features_df

def add_baseline_deviation_features(df, feature_cols, insider_col='is_insider_day'):
    """Baseline uses only non-insider days, so malicious activity doesn't skew a user's own normal profile."""
    normal_days = df[df[insider_col] == 0]

    user_mean = normal_days.groupby('user')[feature_cols].mean()
    user_std = normal_days.groupby('user')[feature_cols].std().replace(0, 1).fillna(1)

    for col in feature_cols:
        mean_map = df['user'].map(user_mean[col])
        std_map = df['user'].map(user_std[col]).fillna(1)
        df[f'{col}_zscore'] = (df[col] - mean_map) / std_map

    return df

def build_feature_table():
    print("Loading raw data...")
    logon_df = load_logon_data()
    device_df = load_device_data()
    insiders_df = load_insiders_answer()

    print("Engineering logon features...")
    logon_features = engineer_logon_features(logon_df)

    print("Engineering device features...")
    device_features = engineer_device_features(device_df)

    print("Engineering file features...")
    file_features = engineer_file_features()

    print("Engineering email features...")
    email_features = engineer_email_features()

    print("Merging all features...")
    features = logon_features.merge(device_features, on=['user', 'day'], how='left')
    features = features.merge(file_features, on=['user', 'day'], how='left')
    features = features.merge(email_features, on=['user', 'day'], how='left')

    fill_cols = ['usb_connect_count', 'file_access_count', 'email_count', 'email_external_count']
    for col in fill_cols:
        features[col] = features[col].fillna(0)

    print("Labeling insider days...")
    features = label_insider_days(features, insiders_df)

    print("Adding per-user baseline deviation features...")
    base_cols = ['logon_count', 'after_hours_logon_count', 'distinct_pc_count',
                 'usb_connect_count', 'file_access_count', 'email_count', 'email_external_count']
    features = add_baseline_deviation_features(features, base_cols)

    return features

if __name__ == "__main__":
    features_df = build_feature_table()
    print(f"\nFeature table shape: {features_df.shape}")
    print(features_df.columns.tolist())
    print(features_df.head(10))
    print(f"\nTotal insider-labeled rows: {features_df['is_insider_day'].sum()}")

    features_df.to_csv("data/processed/user_daily_features.csv", index=False)
    print("\nSaved to data/processed/user_daily_features.csv")