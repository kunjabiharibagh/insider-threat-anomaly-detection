"""
- US-02: Data Cleaning
- US-03: Feature Extraction
"""

import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt

st.set_page_config(page_title="Insider Threat Detection — Member 1 Progress", layout="wide")

st.title("🔍 Insider Threat Detection System")
st.subheader("Member 1 — Data & ML Modeling Progress Demo")

st.markdown("""
This dashboard shows the completed work for **US-02 (Data Cleaning)** and
**US-03 (Feature Extraction)** — the first two stages of the ML pipeline.
""")

# -----------------------------------------------------------------
# Load data
# -----------------------------------------------------------------
raw_df = pd.read_csv("data/raw/user_activity_logs.csv")
clean_df = pd.read_csv("data/processed/cleaned_activity_logs.csv")
features_df = pd.read_csv("data/processed/user_features.csv")

# -----------------------------------------------------------------
# US-02 Section
# -----------------------------------------------------------------
st.header("✅ US-02: Data Cleaning")

col1, col2, col3, col4 = st.columns(4)
col1.metric("Raw Records", len(raw_df))
col2.metric("Cleaned Records", len(clean_df))
col3.metric("Rows Removed", len(raw_df) - len(clean_df))
col4.metric("Missing Values (after cleaning)", int(clean_df.isnull().sum().sum()))

st.markdown("**Before Cleaning — Raw Data Sample**")
st.dataframe(raw_df.head(5), use_container_width=True)

st.markdown("**After Cleaning — Processed Data Sample**")
st.dataframe(clean_df.head(5), use_container_width=True)

st.markdown("**Missing Values Before vs After**")
missing_before = raw_df.isnull().sum()
missing_before = missing_before[missing_before > 0]
if len(missing_before) > 0:
    fig, ax = plt.subplots(figsize=(6, 3))
    ax.bar(missing_before.index, missing_before.values, color="#d62728", label="Before")
    ax.bar(missing_before.index, [0] * len(missing_before), color="#2ca02c", label="After", alpha=0.01)
    ax.set_ylabel("Missing Count")
    ax.set_title("Missing Values Fixed by Cleaning Pipeline")
    st.pyplot(fig)
else:
    st.info("No missing values found in raw sample.")

st.divider()

# -----------------------------------------------------------------
# US-03 Section
# -----------------------------------------------------------------
st.header("✅ US-03: Behavioral Feature Extraction")

col1, col2 = st.columns(2)
col1.metric("Users", features_df["user_id"].nunique())
col2.metric("Features per User", len(features_df.columns) - 1)

st.markdown("**Extracted Feature Table (per user)**")
st.dataframe(features_df, use_container_width=True)

st.markdown("**Feature Distributions**")
feature_cols = [c for c in features_df.columns if c != "user_id"]
selected_feature = st.selectbox("Choose a feature to visualize", feature_cols)

fig, ax = plt.subplots(figsize=(8, 3))
ax.hist(features_df[selected_feature], bins=15, color="#1f77b4", edgecolor="white")
ax.set_xlabel(selected_feature)
ax.set_ylabel("Number of Users")
ax.set_title(f"Distribution of {selected_feature}")
st.pyplot(fig)

st.markdown("**Off-Hours Login % vs Average Files Accessed**")
fig2, ax2 = plt.subplots(figsize=(8, 4))
ax2.scatter(
    features_df["pct_off_hours_logins"],
    features_df["avg_files_accessed"],
    s=60,
    alpha=0.7,
    color="#ff7f0e",
)
for _, row in features_df.iterrows():
    if row["pct_off_hours_logins"] > 40 or row["avg_files_accessed"] > 25:
        ax2.annotate(row["user_id"], (row["pct_off_hours_logins"], row["avg_files_accessed"]))
ax2.set_xlabel("% Off-Hours Logins")
ax2.set_ylabel("Avg Files Accessed / Day")
ax2.set_title("Users with unusual patterns stand out in the top-right")
st.pyplot(fig2)

st.divider()
st.caption("Next stage (US-05): Isolation Forest + DBSCAN will use this feature table to flag anomalous users.")
