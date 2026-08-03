import pandas as pd

print("FILE.CSV columns:")
file_sample = pd.read_csv("data/raw/r4.2/file.csv", nrows=5)
print(file_sample.columns.tolist())
print(file_sample.head())

print("\nEMAIL.CSV columns:")
email_sample = pd.read_csv("data/raw/r4.2/email.csv", nrows=5)
print(email_sample.columns.tolist())
print(email_sample.head())