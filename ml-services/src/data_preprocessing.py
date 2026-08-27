"""
data_preprocessing.py

User Story: US-02 - Clean and format uploaded data
As the system, I want the uploaded data cleaned and formatted, so that
missing or inconsistent values don't break the model.

Definition of Done: Cleaned dataset has no missing/broken values.
"""

import pandas as pd

# File paths - kept as constants so they're easy to find and change
RAW_DATA_PATH = "data/raw/user_activity_logs.csv"
CLEANED_DATA_PATH = "data/processed/cleaned_activity_logs.csv"

# Columns that must never be negative (used in remove_bad_rows)
NON_NEGATIVE_COLUMNS = ["files_accessed", "session_duration_min", "usb_events"]


def load_raw_data(path: str) -> pd.DataFrame:
    """Load the raw activity log CSV into a DataFrame."""
    df = pd.read_csv(path)
    print(f"Loaded {len(df)} rows and {len(df.columns)} columns.")
    print(df.head())
    return df


def handle_missing_values(df: pd.DataFrame) -> pd.DataFrame:
    """Fill missing numeric values using the column median."""
    print("Missing values before cleaning:")
    print(df.isnull().sum())

    median_value = df["session_duration_min"].median()
    df["session_duration_min"] = df["session_duration_min"].fillna(median_value)

    print("\nMissing values after cleaning:")
    print(df.isnull().sum())
    return df


def fix_formats(df: pd.DataFrame) -> pd.DataFrame:
    """Convert date text to real dates, and extract login hour as a number."""
    df["date"] = pd.to_datetime(df["date"], errors="coerce")

    bad_dates = df["date"].isnull().sum()
    print(f"Broken dates found: {bad_dates}")
    df = df.dropna(subset=["date"])

    df["login_hour"] = df["login_time"].str.split(":").str[0].astype(int)

    print("Formats fixed. Sample:")
    print(df[["date", "login_time", "login_hour"]].head())
    return df


def remove_bad_rows(df: pd.DataFrame) -> pd.DataFrame:
    """Remove duplicate records and rows with impossible (negative) values."""
    before = len(df)
    df = df.drop_duplicates(subset=["user_id", "date"])
    print(f"Duplicate rows removed: {before - len(df)}")

    before = len(df)
    for col in NON_NEGATIVE_COLUMNS:
        df = df[df[col] >= 0]
    print(f"Invalid rows removed: {before - len(df)}")
    return df


def save_cleaned_data(df: pd.DataFrame, output_path: str) -> None:
    """Sort and save the cleaned dataset for the next stage (US-03)."""
    df = df.sort_values(["user_id", "date"])
    df.to_csv(output_path, index=False)
    print(f"Cleaned data saved to: {output_path}")


def main() -> pd.DataFrame:
    """Run the full US-02 cleaning pipeline end to end."""
    df = load_raw_data(RAW_DATA_PATH)
    df = handle_missing_values(df)
    df = fix_formats(df)
    df = remove_bad_rows(df)

    print(f"\nFinal cleaned dataset: {len(df)} rows")

    # Definition of Done check: no missing values should remain anywhere
    remaining_missing = df.isnull().sum().sum()
    assert remaining_missing == 0, "Cleaning incomplete - missing values still remain."

    save_cleaned_data(df, CLEANED_DATA_PATH)
    return df


if __name__ == "__main__":
    main()