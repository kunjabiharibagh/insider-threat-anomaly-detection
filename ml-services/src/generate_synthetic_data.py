"""
generate_synthetic_data.py

Generates synthetic employee activity logs for the Insider Threat Detection
project (US-01 input). Produces realistic normal behavior for most users,
and injects a handful of deliberately anomalous "insider-like" users so the
anomaly detection models (US-05) and validation (US-07) have real ground
truth to check against.

Output: data/raw/user_activity_logs.csv
"""

import numpy as np
import pandas as pd
from datetime import datetime, timedelta
import random

# ---------------------------------------------------------------------
# CONFIG
# ---------------------------------------------------------------------
NUM_USERS = 50
NUM_DAYS = 30
START_DATE = datetime(2026, 7, 1)
ANOMALOUS_USER_RATIO = 0.10  # ~10% of users behave suspiciously
RANDOM_SEED = 42

random.seed(RANDOM_SEED)
np.random.seed(RANDOM_SEED)

DEPARTMENTS = ["Engineering", "Finance", "HR", "Sales", "IT", "Legal"]


def make_users(num_users):
    users = []
    num_anomalous = max(1, int(num_users * ANOMALOUS_USER_RATIO))
    anomalous_ids = set(random.sample(range(num_users), num_anomalous))
    for i in range(num_users):
        users.append({
            "user_id": f"U{i+1:03d}",
            "department": random.choice(DEPARTMENTS),
            "is_insider_threat": i in anomalous_ids,  # ground truth, for validation only
        })
    return pd.DataFrame(users)


def generate_day_activity(user, day_date):
    """Generate one day's activity row for a user (normal or anomalous)."""
    is_anomalous = user["is_insider_threat"]
    # Weekends: much lower activity for everyone
    is_weekend = day_date.weekday() >= 5

    if is_weekend and not is_anomalous:
        if random.random() > 0.15:
            return None  # most normal users don't work weekends

    if is_anomalous and random.random() < 0.6:
        # Anomalous behavior pattern on this day
        login_hour = random.choice([1, 2, 3, 4, 23])  # off-hours login
        session_duration_min = np.random.normal(240, 60)  # unusually long sessions
        files_accessed = np.random.poisson(45)  # excessive file access
        usb_events = np.random.poisson(3)  # unusual USB usage
        emails_sent = np.random.poisson(2)
        emails_with_attachment = np.random.poisson(2)  # possible exfiltration
        external_web_visits = np.random.poisson(15)
    else:
        # Normal behavior pattern
        login_hour = int(np.clip(np.random.normal(9, 1.5), 6, 19))
        session_duration_min = max(15, np.random.normal(75, 25))
        files_accessed = np.random.poisson(6)
        usb_events = np.random.poisson(0.1)
        emails_sent = np.random.poisson(8)
        emails_with_attachment = np.random.poisson(1)
        external_web_visits = np.random.poisson(3)

    return {
        "user_id": user["user_id"],
        "department": user["department"],
        "date": day_date.strftime("%Y-%m-%d"),
        "login_time": f"{login_hour:02d}:{random.randint(0,59):02d}",
        "session_duration_min": round(max(1, session_duration_min), 1),
        "files_accessed": int(files_accessed),
        "usb_events": int(usb_events),
        "emails_sent": int(emails_sent),
        "emails_with_attachment": int(emails_with_attachment),
        "external_web_visits": int(external_web_visits),
        # Hidden ground-truth label — keep this OUT of the model input,
        # only use it later to validate your model (US-07).
        "_ground_truth_insider": is_anomalous,
    }


def generate_dataset():
    users_df = make_users(NUM_USERS)
    rows = []
    for _, user in users_df.iterrows():
        for d in range(NUM_DAYS):
            day_date = START_DATE + timedelta(days=d)
            row = generate_day_activity(user, day_date)
            if row is not None:
                rows.append(row)

    df = pd.DataFrame(rows)

    # Sprinkle in a bit of realistic messiness for US-02 to clean up:
    # a few missing values and a few malformed rows
    messy_idx = df.sample(frac=0.03, random_state=RANDOM_SEED).index
    df.loc[messy_idx, "session_duration_min"] = np.nan

    dup_rows = df.sample(frac=0.01, random_state=RANDOM_SEED)
    df = pd.concat([df, dup_rows], ignore_index=True)

    return df, users_df


if __name__ == "__main__":
    df, users_df = generate_dataset()
    out_path = "data/raw/user_activity_logs.csv"
    df.to_csv(out_path, index=False)
    users_df.to_csv("data/raw/users_ground_truth.csv", index=False)
    print(f"Generated {len(df)} activity records for {len(users_df)} users.")
    print(f"Saved to: {out_path}")
    print(f"Anomalous users (ground truth, for validation only): "
          f"{users_df[users_df.is_insider_threat].user_id.tolist()}")
