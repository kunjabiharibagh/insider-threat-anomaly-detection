import pandas as pd
from data_preprocessing import load_logon_data, load_device_data

def engineer_logon_features(logon_df):
    logon_df['date'] = pd.to_datetime(logon_df['date'])
    logon_df['day'] = logon_df['date'].dt.date
    logon_df['hour'] = logon_df['date'].dt.hour

    # Only consider actual "Logon" events (ignore "Logoff")
    logon_only = logon_df[logon_df['activity'] == 'Logon'].copy()

    # After-hours = before 7am or after 7pm
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

def build_feature_table():
    print("Loading raw data...")
    logon_df = load_logon_data()
    device_df = load_device_data()

    print("Engineering logon features...")
    logon_features = engineer_logon_features(logon_df)

    print("Engineering device features...")
    device_features = engineer_device_features(device_df)

    print("Merging features...")
    features = pd.merge(logon_features, device_features, on=['user', 'day'], how='left')
    features['usb_connect_count'] = features['usb_connect_count'].fillna(0)

    return features

if __name__ == "__main__":
    features_df = build_feature_table()
    print(f"\nFeature table shape: {features_df.shape}")
    print(features_df.head(10))

    # Save to processed data folder
    features_df.to_csv("data/processed/user_daily_features.csv", index=False)
    print("\nSaved to data/processed/user_daily_features.csv")