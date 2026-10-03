"""
feature_engineering.py

User Story: US-03 - Extract behavioral features
As the system, I want to extract behavioral features (login frequency,
off-hours activity, session duration), so that the model can detect
meaningful patterns.


"""

import pandas as pd

CLEANED_DATA_PATH = "data/processed/cleaned_activity_logs.csv"
FEATURES_OUTPUT_PATH = "data/processed/user_features.csv"


def load_cleaned_data(path: str) -> pd.DataFrame:
    """Load the cleaned data produced by US-02."""
    df = pd.read_csv(path)
    print(f"Loaded {len(df)} cleaned rows for {df['user_id'].nunique()} users.")
    return df


def mark_off_hours_logins(df: pd.DataFrame) -> pd.DataFrame:
    """Add a True/False column: was this login between 10 PM and 6 AM?"""
    df["is_off_hours"] = (df["login_hour"] >= 22) | (df["login_hour"] < 6)
    return df


def build_user_features(df: pd.DataFrame) -> pd.DataFrame:
    """Group daily records into one summary row per user."""
    features = df.groupby("user_id").agg(
        avg_login_hour=("login_hour", "mean"),
        pct_off_hours_logins=("is_off_hours", "mean"),   # mean of True/False = %
        avg_session_duration=("session_duration_min", "mean"),
        avg_files_accessed=("files_accessed", "mean"),
        total_usb_events=("usb_events", "sum"),
        total_emails_with_attachment=("emails_with_attachment", "sum"),
        avg_external_web_visits=("external_web_visits", "mean"),
    ).reset_index()

    # Turn the 0-1 fraction into a readable percentage
    features["pct_off_hours_logins"] = (features["pct_off_hours_logins"] * 100).round(1)

    print(f"Built feature table for {len(features)} users.")
    print(features.head())
    return features


def save_features(df: pd.DataFrame, output_path: str) -> None:
    """Save the per-user feature table for the modeling stage (US-05)."""
    df.to_csv(output_path, index=False)
    print(f"Feature table saved to: {output_path}")


def main() -> pd.DataFrame:
    """Run the full US-03 feature extraction pipeline end to end."""
    df = load_cleaned_data(CLEANED_DATA_PATH)
    df = mark_off_hours_logins(df)
    features = build_user_features(df)

    # Definition of Done check: one row per user, no missing values
    assert features["user_id"].is_unique, "Feature table has duplicate users."
    assert features.isnull().sum().sum() == 0, "Feature table has missing values."

    save_features(features, FEATURES_OUTPUT_PATH)
    return features


if __name__ == "__main__":
    main()