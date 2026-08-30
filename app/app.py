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
    
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from src.eda_summary import load_processed_features, compute_summary_stats, get_trend_comparison_data, get_capture_rate_curve
import matplotlib.pyplot as plt

st.divider()
st.header("📊 Exploratory Data Analysis Dashboard")

try:
    eda_df = load_processed_features()

    st.subheader("Summary Statistics: Normal vs. Insider Days")
    summary_stats = compute_summary_stats(eda_df)
    st.dataframe(summary_stats)

    st.subheader("Feature Comparison: Normal vs. Insider")
    feature_choice = st.selectbox(
        "Select a feature to compare",
        options=['logon_count', 'after_hours_logon_count', 'distinct_pc_count',
                 'usb_connect_count', 'file_access_count', 'email_count', 'email_external_count']
    )

    trend_data = get_trend_comparison_data(eda_df, feature_choice)
    fig, ax = plt.subplots(figsize=(6, 4))
    ax.boxplot([trend_data['Normal'], trend_data['Insider']], tick_labels=['Normal', 'Insider'])
    ax.set_title(f'{feature_choice}: Normal vs Insider Days')
    ax.set_ylabel(feature_choice)
    st.pyplot(fig)

    st.subheader("Model Performance: Capture Rate vs. Data Reviewed")
    capture_df = get_capture_rate_curve(eda_df)
    st.line_chart(capture_df.set_index('pct_reviewed')[['pct_caught', 'random_chance']])

except FileNotFoundError:
    st.warning("Processed features file not found. Run the feature engineering and model pipeline first.")