import pandas as pd
import os

# Valid files
pd.DataFrame({
    'id': ['{LOGON-01}', '{LOGON-02}'],
    'date': ['01/02/2010 08:00:00', '01/02/2010 08:05:00'],
    'user': ['ABC0001', 'ABC0001'],
    'pc': ['PC-1000', 'PC-1000'],
    'activity': ['Logon', 'Logoff']
}).to_csv('sample_logon_valid.csv', index=False)

pd.DataFrame({
    'id': ['{DEV-01}', '{DEV-02}'],
    'date': ['01/02/2010 09:30:00', '01/02/2010 10:15:00'],
    'user': ['ABC0001', 'ABC0001'],
    'pc': ['PC-1000', 'PC-1000'],
    'activity': ['Connect', 'Disconnect']
}).to_csv('sample_device_valid.csv', index=False)

pd.DataFrame({
    'id': ['{FILE-01}', '{FILE-02}'],
    'date': ['01/02/2010 10:00:00', '01/02/2010 10:05:00'],
    'user': ['ABC0001', 'ABC0001'],
    'pc': ['PC-1000', 'PC-1000'],
    'filename': ['report.docx', 'budget.xlsx'],
    'activity': ['File Open', 'File Copy']
}).to_csv('sample_file_valid.csv', index=False)

pd.DataFrame({
    'id': ['{EMAIL-01}', '{EMAIL-02}'],
    'date': ['01/02/2010 09:15:00', '01/02/2010 09:20:00'],
    'user': ['ABC0001', 'ABC0001'],
    'pc': ['PC-1000', 'PC-1000'],
    'to': ['bob@dtaa.com', 'external@gmail.com'],
    'cc': ['', ''],
    'bcc': ['', ''],
    'from': ['alice@dtaa.com', 'alice@dtaa.com'],
    'size': [1024, 2048],
    'attachments': [0, 1]
}).to_csv('sample_email_valid.csv', index=False)

# Invalid files (missing required columns)
pd.DataFrame({
    'id': ['{LOGON-BAD-01}'],
    'timestamp': ['01/02/2010 08:00:00'],
    'username': ['ABC0001']
}).to_csv('sample_logon_invalid.csv', index=False)

pd.DataFrame({
    'id': ['{DEV-BAD-01}'],
    'time': ['01/02/2010 09:00:00'],
    'employee': ['ABC0001']
}).to_csv('sample_device_invalid.csv', index=False)

pd.DataFrame({
    'id': ['{FILE-BAD-01}'],
    'timestamp': ['01/02/2010 10:00:00'],
    'owner': ['ABC0001']
}).to_csv('sample_file_invalid.csv', index=False)

pd.DataFrame({
    'id': ['{EMAIL-BAD-01}'],
    'timestamp': ['01/02/2010 09:00:00'],
    'sender': ['alice@dtaa.com'],
    'recipient': ['bob@dtaa.com']
}).to_csv('sample_email_invalid.csv', index=False)

print("All 8 test files created successfully.")