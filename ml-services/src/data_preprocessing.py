import pandas as pd

def load_raw_data(path: str) -> pd.DataFrame:
    df = pd.read_csv(path)
    print(f"Loaded {len(df)} rows and {len(df.columns)} columns.")
    print(df.head())
    return df

def handle_missing_values(df):
    # Check how many missing values are in each column
    print("Missing values before cleaning:")
    print(df.isnull().sum())

    # Fill missing numbers with the median of that column
    # (median is safer than average because it ignores extreme outliers)
    df["session_duration_min"] = df["session_duration_min"].fillna(
        df["session_duration_min"].median()
    )

    # Check again to confirm nothing is missing now
    print("\nMissing values after cleaning:")
    print(df.isnull().sum())

    return df
def fix_formats(df):
    # Convert the "date" column from plain text into a real date type
    # errors="coerce" means: if a date is broken/unreadable, turn it into NaT (empty date)
    df["date"] = pd.to_datetime(df["date"], errors="coerce")

    # Count how many dates were broken
    bad_dates = df["date"].isnull().sum()
    print(f"Broken dates found: {bad_dates}")

    # Drop any rows where the date couldn't be understood
    df = df.dropna(subset=["date"])

    # Extract just the hour number from login_time (e.g. "09:34" -> 9)
    # This turns text into a number the model can actually use later
    df["login_hour"] = df["login_time"].str.split(":").str[0].astype(int)

    print("Formats fixed. Sample:")
    print(df[["date", "login_time", "login_hour"]].head())

    return df
def remove_bad_rows(df):
    # Remove duplicate rows — same user, same date shouldn't appear twice
    before = len(df)
    df = df.drop_duplicates(subset=["user_id", "date"])
    print(f"Duplicate rows removed: {before - len(df)}")

    # Remove rows with impossible values (e.g. negative counts don't make sense)
    before = len(df)
    df = df[df["files_accessed"] >= 0]
    df = df[df["session_duration_min"] >= 0]
    df = df[df["usb_events"] >= 0]
    print(f"Invalid rows removed: {before - len(df)}")

    return df

if __name__ == "__main__":
    df = load_raw_data("data/raw/user_activity_logs.csv")
    df = handle_missing_values(df)
    df = fix_formats(df)

    df = remove_bad_rows(df)

    print(f"\nFinal cleaned dataset: {len(df)} rows")