import streamlit as st
import pandas as pd
import os

st.set_page_config(page_title="Insider Threat Detection - Log Upload", layout="wide")

RAW_DATA_PATH = "data/raw/r4.2"
os.makedirs(RAW_DATA_PATH, exist_ok=True)

# Columns that must exist in the file
REQUIRED_COLUMNS = {
    "logon": ["id", "date", "user", "pc", "activity"],
    "device": ["id", "date", "user", "pc", "activity"],
    "file": ["id", "date", "user", "pc", "filename"],
    "email": ["id", "date", "user", "pc", "to", "cc", "bcc"]
}

# Columns that must exist AND have actual data (blank is a real problem here)
MUST_HAVE_DATA = {
    "logon": ["id", "date", "user", "pc", "activity"],
    "device": ["id", "date", "user", "pc", "activity"],
    "file": ["id", "date", "user", "pc", "filename"],
    "email": ["id", "date", "user", "pc"]  # to/cc/bcc excluded — blank cc/bcc is normal
}

st.title("🔒 Insider Threat Detection — Raw Activity Log Upload")
st.write("Upload a CERT-format activity log file (logon, device, file, or email) to begin analysis.")

log_type = st.selectbox("Select log type", options=list(REQUIRED_COLUMNS.keys()))

uploaded_file = st.file_uploader("Upload CSV log file", type=["csv"])

def validate_log(df, log_type):
    errors = []
    required = REQUIRED_COLUMNS[log_type]

    if df.empty:
        errors.append("The uploaded file is empty.")
        return errors

    missing_cols = [col for col in required if col not in df.columns]
    if missing_cols:
        errors.append(f"Missing required columns for '{log_type}': {missing_cols}")

    if df.columns.duplicated().any():
        errors.append("File contains duplicate column names.")

    for col in MUST_HAVE_DATA[log_type]:
        if col in df.columns and df[col].isnull().all():
            errors.append(f"Required column '{col}' is completely empty.")

    return errors

if uploaded_file is not None:
    try:
        df = pd.read_csv(uploaded_file)

        validation_errors = validate_log(df, log_type)

        if validation_errors:
            st.error("❌ Upload rejected — validation failed:")
            for err in validation_errors:
                st.write(f"- {err}")
        else:
            save_path = os.path.join(RAW_DATA_PATH, f"{log_type}.csv")
            df.to_csv(save_path, index=False)

            st.session_state[f"{log_type}_logs"] = df

            st.success(f"✅ File uploaded and validated successfully as '{log_type}.csv'")
            st.write(f"**Rows:** {df.shape[0]} | **Columns:** {df.shape[1]}")
            st.dataframe(df.head(10))

    except Exception as e:
        st.error(f"❌ An error occurred while processing the file: {str(e)}")

else:
    st.info("Please select a log type and upload a CSV file to continue.")