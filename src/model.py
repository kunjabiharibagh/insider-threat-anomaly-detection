import pandas as pd
from sklearn.ensemble import IsolationForest
from sklearn.cluster import DBSCAN
from sklearn.preprocessing import StandardScaler
import joblib
import os

FEATURE_COLUMNS = ['logon_count', 'after_hours_logon_count', 'distinct_pc_count', 'usb_connect_count']

def load_features():
    return pd.read_csv("data/processed/user_daily_features.csv")

def train_isolation_forest(df):
    X = df[FEATURE_COLUMNS]

    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    model = IsolationForest(
        n_estimators=200,
        contamination=0.005,  # roughly matches our ~0.4% insider rate
        random_state=42
    )
    model.fit(X_scaled)

    # -1 = anomaly, 1 = normal -> convert to 1 = anomaly, 0 = normal
    df['iso_forest_flag'] = (model.predict(X_scaled) == -1).astype(int)
    df['iso_forest_score'] = -model.decision_function(X_scaled)  # higher = more anomalous

    return df, model, scaler

def train_dbscan(df, scaler, sample_size=5000):
    X = df[FEATURE_COLUMNS]
    X_scaled = scaler.transform(X)

    if len(df) > sample_size:
        sample_idx = df.sample(n=sample_size, random_state=42).index
    else:
        sample_idx = df.index

    X_sample = X_scaled[df.index.get_indexer(sample_idx)]

    dbscan = DBSCAN(eps=0.8, min_samples=5, algorithm='ball_tree')
    labels = dbscan.fit_predict(X_sample)

    df['dbscan_flag'] = 0
    df.loc[sample_idx, 'dbscan_flag'] = (labels == -1).astype(int)

    return df
def evaluate(df):
    total_insiders = df['is_insider_day'].sum()

    iso_caught = df[(df['is_insider_day'] == 1) & (df['iso_forest_flag'] == 1)].shape[0]
    dbscan_caught = df[(df['is_insider_day'] == 1) & (df['dbscan_flag'] == 1)].shape[0]

    print(f"\nTotal true insider days: {total_insiders}")
    print(f"Isolation Forest caught: {iso_caught} ({iso_caught/total_insiders*100:.1f}%)")
    print(f"DBSCAN caught: {dbscan_caught} ({dbscan_caught/total_insiders*100:.1f}%)")

    print(f"\nIsolation Forest total flags: {df['iso_forest_flag'].sum()}")
    print(f"DBSCAN total flags: {df['dbscan_flag'].sum()}")

if __name__ == "__main__":
    print("Loading features...")
    df = load_features()

    print("Training Isolation Forest...")
    df, iso_model, scaler = train_isolation_forest(df)

    print("Training DBSCAN...")
    df = train_dbscan(df, scaler)

    print("Evaluating...")
    evaluate(df)

    os.makedirs("models", exist_ok=True)
    joblib.dump(iso_model, "models/isolation_forest.pkl")
    joblib.dump(scaler, "models/scaler.pkl")
    print("\nModels saved to models/")

    df.to_csv("data/processed/user_daily_features_with_flags.csv", index=False)
    print("Results saved to data/processed/user_daily_features_with_flags.csv")