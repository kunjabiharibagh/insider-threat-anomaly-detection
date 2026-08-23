import pandas as pd
from data_preprocessing import load_logon_data, load_device_data, load_insiders_answer

def clean_dataframe(df, name, key_cols):
    print(f"\n--- Cleaning {name} ---")
    initial_rows = len(df)

    # Check missing values
    missing = df[key_cols].isnull().sum()
    print(f"Missing values per column:\n{missing}")

    # Drop rows with missing values in key columns
    df_clean = df.dropna(subset=key_cols)
    dropped_missing = initial_rows - len(df_clean)

    # Check and drop exact duplicate rows
    before_dedup = len(df_clean)
    df_clean = df_clean.drop_duplicates()
    dropped_duplicates = before_dedup - len(df_clean)

    # Validate date parsing (drop rows where date can't be parsed)
    df_clean['date_parsed'] = pd.to_datetime(df_clean['date'], errors='coerce')
    invalid_dates = df_clean['date_parsed'].isnull().sum()
    df_clean = df_clean.dropna(subset=['date_parsed'])
    df_clean = df_clean.drop(columns=['date_parsed'])

    final_rows = len(df_clean)

    print(f"Initial rows: {initial_rows}")
    print(f"Dropped (missing values): {dropped_missing}")
    print(f"Dropped (duplicates): {dropped_duplicates}")
    print(f"Dropped (invalid dates): {invalid_dates}")
    print(f"Final clean rows: {final_rows}")
    print(f"Data retained: {final_rows/initial_rows*100:.2f}%")

    return df_clean

def run_cleaning_report():
    print("Loading raw data for cleaning report...")

    logon_df = load_logon_data()
    device_df = load_device_data()
    insiders_df = load_insiders_answer()

    logon_clean = clean_dataframe(logon_df, "logon.csv", key_cols=['user', 'pc', 'date', 'activity'])
    device_clean = clean_dataframe(device_df, "device.csv", key_cols=['user', 'pc', 'date', 'activity'])

    print("\n--- Checking insiders.csv (answer key) ---")
    print(f"Missing values:\n{insiders_df.isnull().sum()}")
    print(f"Duplicate rows: {insiders_df.duplicated().sum()}")

    return logon_clean, device_clean

if __name__ == "__main__":
    run_cleaning_report()
    print("\nData cleaning report complete.")