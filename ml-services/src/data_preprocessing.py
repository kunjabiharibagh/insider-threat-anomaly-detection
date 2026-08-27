import pandas as pd

def load_raw_data(path: str) -> pd.DataFrame:
    df = pd.read_csv(path)
    print(f"Loaded {len(df)} rows and {len(df.columns)} columns.")
    print(df.head())
    return df

if __name__ == "__main__":
    df = load_raw_data("data/raw/user_activity_logs.csv")