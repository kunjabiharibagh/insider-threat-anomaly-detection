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

if __name__ == "__main__":
    df = load_raw_data("data/raw/user_activity_logs.csv")
    df = handle_missing_values(df)