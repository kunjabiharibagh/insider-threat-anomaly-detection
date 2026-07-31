import pandas as pd
import os

RAW_DATA_PATH = "data/raw/r4.2"
ANSWERS_PATH = "data/raw/answers"

def load_logon_data():
    path = os.path.join(RAW_DATA_PATH, "logon.csv")
    df = pd.read_csv(path)
    return df

def load_device_data():
    path = os.path.join(RAW_DATA_PATH, "device.csv")
    df = pd.read_csv(path)
    return df

def load_file_data():
    path = os.path.join(RAW_DATA_PATH, "file.csv")
    df = pd.read_csv(path)
    return df

def load_email_data(chunksize=500000):
    """Email file is large (~1.3GB), so we load it in chunks."""
    path = os.path.join(RAW_DATA_PATH, "email.csv")
    chunks = pd.read_csv(path, chunksize=chunksize)
    df = pd.concat(chunks, ignore_index=True)
    return df

def load_insiders_answer():
    path = os.path.join(ANSWERS_PATH, "insiders.csv")
    df = pd.read_csv(path)
    return df

if __name__ == "__main__":
    print("Loading logon data...")
    logon_df = load_logon_data()
    print(f"Logon shape: {logon_df.shape}")
    print(logon_df.head())

    print("\nLoading device data...")
    device_df = load_device_data()
    print(f"Device shape: {device_df.shape}")
    print(device_df.head())

    print("\nLoading insiders answer key...")
    insiders_df = load_insiders_answer()
    print(f"Insiders shape: {insiders_df.shape}")
    print(insiders_df.head())
    
    print("\nUnique dataset values in insiders.csv:")
    print(insiders_df['dataset'].unique())
    
    print("\nFiltering insiders for r4.2 dataset...")
    insiders_r42 = insiders_df[insiders_df['dataset'] == 4.2]
    print(f"r4.2 insiders shape: {insiders_r42.shape}")
    print(insiders_r42)

    print("\nChecking if these insider users exist in logon data...")
    insider_users = insiders_r42['user'].unique()
    matched_users = logon_df[logon_df['user'].isin(insider_users)]['user'].unique()
    print(f"Total r4.2 insiders: {len(insider_users)}")
    print(f"Matched in logon.csv: {len(matched_users)}")
    print(f"Insider user IDs: {insider_users}")