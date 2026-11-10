import streamlit as st
import pandas as pd
import os
import sys

st.set_page_config(page_title="Insider Threat Detection - Log Upload", layout="wide")

RAW_DATA_PATH = "data/raw/r4.2"
os.makedirs(RAW_DATA_PATH, exist_ok=True)

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

REQUIRED_COLUMNS = {
    "logon": ["id", "date", "user", "pc", "activity"],
    "device": ["id", "date", "user", "pc", "activity"],
    "file": ["id", "date", "user", "pc", "filename"],
    "email": ["id", "date", "user", "pc", "to", "cc", "bcc"]
}

MUST_HAVE_DATA = {
    "logon": ["id", "date", "user", "pc", "activity"],
    "device": ["id", "date", "user", "pc", "activity"],
    "file": ["id", "date", "user", "pc", "filename"],
    "email": ["id", "date", "user", "pc"]
}

st.title("🔒 Insider Threat Detection — Raw Activity Log Upload")
st.write("Upload a CERT-format activity log file (logon, device, file, or email) to begin analysis.")

with st.expander("ℹ️ How This System Works (Pipeline Overview)"):
    st.markdown("""
    **Data Pipeline:**

    1. **Raw Logs** — Admin uploads CERT-format activity logs (logon, device, file, email)
    2. **Feature Extraction** — Raw events are converted into per-user daily behavioral features
    3. **Z-Score Normalization** — Each feature is compared against that specific user's own historical baseline
    4. **Isolation Forest / DBSCAN** — Unsupervised models assign an anomaly score to each user-day
    5. **Anomaly Scores** — The most statistically unusual days (top ~1%) are flagged for review
    6. **Reason Generation** — For each flagged day, the system explains which features contributed most
    """)

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

# ========== EDA DASHBOARD ==========
from src.eda_summary import load_processed_features, compute_summary_stats, get_trend_comparison_data, get_capture_rate_curve
from src.reason_generation import load_flagged_data, generate_reasons_for_flagged_users
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

# ========== FLAGGED USERS ==========
st.divider()
st.header("🚩 Flagged Users — Reasons")

try:
    flagged_df = load_flagged_data()
    flagged_with_reasons = generate_reasons_for_flagged_users(flagged_df)

    st.write(f"**Total flagged user-days:** {len(flagged_with_reasons)}")

    search_user = st.text_input("Search by username (optional)")
    display_df = flagged_with_reasons
    if search_user:
        display_df = display_df[display_df['user'].str.contains(search_user, case=False, na=False)]

    st.dataframe(
        display_df.sort_values('iso_forest_score', ascending=False).head(50),
        use_container_width=True
    )

except FileNotFoundError:
    st.warning("Run the model pipeline first to generate flagged users with reasons.")

# ========== USB DEVICE MONITOR (single unified section) ==========
from src.usb_monitor import (
    get_removable_drives, load_approved_hashes, scan_drive_detailed,
    format_dt
)

st.divider()
st.header("🔌 USB Device Monitor")
st.write("Fully automatic — just insert or eject a USB drive. No action needed.")

if "usb_current_files" not in st.session_state:
    st.session_state.usb_current_files = {}
if "usb_last_session" not in st.session_state:
    st.session_state.usb_last_session = {}


@st.fragment(run_every="3s")
def usb_monitor_fragment():
    current_drives = get_removable_drives()
    approved_hashes = load_approved_hashes()

    for drive in current_drives:
        session = st.session_state.usb_last_session.get(drive)
        if session is None or session.get("eject_time") is not None:
            inject_time_str = format_dt()
            st.session_state.usb_last_session[drive] = {"inject_time": inject_time_str, "eject_time": None}
            st.session_state.usb_current_files[drive] = scan_drive_detailed(drive, approved_hashes, inject_time_str)

    for drive in list(st.session_state.usb_current_files.keys()):
        if drive not in current_drives:
            eject_time_str = format_dt()
            if drive in st.session_state.usb_last_session:
                st.session_state.usb_last_session[drive]["eject_time"] = eject_time_str
            del st.session_state.usb_current_files[drive]

    st.write(f"**Status:** {'🟢 Drive connected' if current_drives else '⚪ No drive connected'}")

    all_files = []
    for drive, files in st.session_state.usb_current_files.items():
        for f in files:
            all_files.append({"drive": drive, **f})

    total_checked = len(all_files)
    total_anomalies = len([f for f in all_files if f["status"] == "ANOMALY"])
    st.write(f"**Files checked:** {total_checked} | **Anomalies:** {total_anomalies}")

    if st.session_state.usb_last_session:
        st.subheader("Session Times")
        for drive, session in st.session_state.usb_last_session.items():
            eject_display = session["eject_time"] if session["eject_time"] else "Still connected"
            st.write(f"**{drive}** — Inject Time: {session['inject_time']} | Eject Time: {eject_display}")

    st.subheader("File Details — Anomalous Files")
    if all_files:
        files_df = pd.DataFrame(all_files)
        anomaly_df = files_df[files_df["status"] == "ANOMALY"]
        if not anomaly_df.empty:
            st.dataframe(
                anomaly_df[["drive", "file", "size_kb", "last_modified", "inject_time"]],
                use_container_width=True
            )
        else:
            st.success("✅ No anomalous files on currently connected drives.")
    else:
        if st.session_state.usb_last_session:
            st.success("✅ No anomalous files detected — last connected drive has been ejected.")
        else:
            st.info("No USB drive currently connected.")


usb_monitor_fragment()
from src.file_monitor import start_file_monitor, stop_file_monitor

st.divider()
st.header("📁 File Access Monitor")
st.write("Watches a folder in real time for file creation, modification, deletion, and renaming.")

if "file_monitor_observer" not in st.session_state:
    st.session_state.file_monitor_observer = None
if "file_monitor_events" not in st.session_state:
    st.session_state.file_monitor_events = []
if "file_monitor_path" not in st.session_state:
    st.session_state.file_monitor_path = os.path.join(os.getcwd(), "test_files")

watch_path = st.text_input("Folder to monitor", value=st.session_state.file_monitor_path)

col1, col2 = st.columns(2)
with col1:
    if st.button("▶️ Start File Monitoring"):
        if st.session_state.file_monitor_observer is not None:
            st.info("Already monitoring.")
        elif not os.path.isdir(watch_path):
            st.error(f"Folder not found: {watch_path}")
        else:
            st.session_state.file_monitor_path = watch_path
            st.session_state.file_monitor_events.clear()
            st.session_state.file_monitor_observer = start_file_monitor(
                watch_path, st.session_state.file_monitor_events
            )

with col2:
    if st.button("⏹️ Stop File Monitoring"):
        if st.session_state.file_monitor_observer is not None:
            stop_file_monitor(st.session_state.file_monitor_observer)
            st.session_state.file_monitor_observer = None


@st.fragment(run_every="2s")
def file_monitor_fragment():
    if st.session_state.file_monitor_observer:
        st.write(f"**Status:** 🟢 Monitoring: {st.session_state.file_monitor_path}")
    else:
        st.write("**Status:** 🔴 Not monitoring")

    events = st.session_state.file_monitor_events
    if events:
        st.dataframe(pd.DataFrame(events[::-1]), use_container_width=True)
    else:
        st.info("No file events recorded yet.")


file_monitor_fragment()