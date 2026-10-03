"""
anomaly_model.py

User Story: US-05 - Apply Isolation Forest and DBSCAN
As the system, I want to apply Isolation Forest and DBSCAN on extracted
features, so that unusual user behavior can be flagged without labeled data.

Definition of Done: Model runs and outputs a flagged/not-flagged label per user.
"""

import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import IsolationForest
from sklearn.cluster import DBSCAN

FEATURES_PATH = "data/processed/user_features.csv"
OUTPUT_PATH = "data/processed/user_features_with_flags.csv"

FEATURE_COLUMNS = [
    "avg_login_hour",
    "pct_off_hours_logins",
    "avg_session_duration",
    "avg_files_accessed",
    "total_usb_events",
    "total_emails_with_attachment",
    "avg_external_web_visits",
]


def load_features(path: str) -> pd.DataFrame:
    """Load the per-user feature table produced by US-03."""
    df = pd.read_csv(path)
    print(f"Loaded features for {len(df)} users.")
    return df


def scale_features(df: pd.DataFrame):
    """
    Scale features so they're all on a similar range.
    Sub-task 1: without this, big-number features (like session duration)
    would unfairly dominate over small-number features (like login hour).
    """
    scaler = StandardScaler()
    scaled_values = scaler.fit_transform(df[FEATURE_COLUMNS])
    print("Features scaled (mean=0, std=1 for each column).")
    return scaled_values


def run_isolation_forest(scaled_values):
    """
    Sub-task 2: Isolation Forest flags points that are 'easy to isolate'
    from the rest of the data - those are the anomalies.
    contamination=0.1 means: assume roughly 10% of users might be unusual.
    """
    model = IsolationForest(contamination=0.1, random_state=42)
    predictions = model.fit_predict(scaled_values)
    is_anomaly_if = predictions == -1
    print(f"Isolation Forest flagged {is_anomaly_if.sum()} users as anomalous.")
    return is_anomaly_if


def run_dbscan(scaled_values):
    """
    Sub-task 3: DBSCAN groups users into clusters of similar behavior.
    Users who don't fit into any cluster get labeled -1 (noise) - those
    are our anomalies.
    """
    model = DBSCAN(eps=1.5, min_samples=3)
    cluster_labels = model.fit_predict(scaled_values)
    is_anomaly_dbscan = cluster_labels == -1
    print(f"DBSCAN flagged {is_anomaly_dbscan.sum()} users as anomalous (noise).")
    return is_anomaly_dbscan


def combine_flags(df: pd.DataFrame, is_anomaly_if, is_anomaly_dbscan) -> pd.DataFrame:
    """
    Sub-task 4: Combine both models' opinions.
    A user is flagged if EITHER model thinks they're unusual - this way
    we don't miss a threat that only one method catches.
    """
    df["flagged_isolation_forest"] = is_anomaly_if
    df["flagged_dbscan"] = is_anomaly_dbscan
    df["is_flagged"] = is_anomaly_if | is_anomaly_dbscan
    print(f"Combined result: {df['is_flagged'].sum()} users flagged in total.")
    return df


def save_results(df: pd.DataFrame, output_path: str) -> None:
    """Sub-task 5: Save the final flagged/not-flagged label per user."""
    df.to_csv(output_path, index=False)
    print(f"Results saved to: {output_path}")


def main() -> pd.DataFrame:
    """Run the full US-05 anomaly detection pipeline end to end."""
    df = load_features(FEATURES_PATH)

    scaled_values = scale_features(df)
    is_anomaly_if = run_isolation_forest(scaled_values)
    is_anomaly_dbscan = run_dbscan(scaled_values)

    df = combine_flags(df, is_anomaly_if, is_anomaly_dbscan)

    print("\nFlagged users:")
    print(df[df["is_flagged"]][["user_id", "flagged_isolation_forest", "flagged_dbscan"]])

    save_results(df, OUTPUT_PATH)
    return df


if __name__ == "__main__":
    main()