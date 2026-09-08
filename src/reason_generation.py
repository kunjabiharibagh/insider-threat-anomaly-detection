import pandas as pd

# Human-readable labels for each feature
FEATURE_LABELS = {
    'logon_count_zscore': 'unusual number of logins',
    'after_hours_logon_count_zscore': 'after-hours login activity',
    'distinct_pc_count_zscore': 'logins from unusual number of PCs',
    'usb_connect_count_zscore': 'high USB device usage',
    'file_access_count_zscore': 'unusual file access activity',
    'email_count_zscore': 'unusual email activity',
    'email_external_count_zscore': 'emails sent to external addresses'
}

ZSCORE_FEATURES = list(FEATURE_LABELS.keys())


def load_flagged_data(path="data/processed/user_daily_features_with_flags.csv"):
    return pd.read_csv(path)


def identify_top_contributing_features(row, top_n=2):
    """ITDS-34: Identify which feature(s) contributed most to a flag."""
    feature_scores = {feat: row[feat] for feat in ZSCORE_FEATURES if feat in row}
    # Sort by absolute z-score deviation, descending
    sorted_features = sorted(feature_scores.items(), key=lambda x: abs(x[1]), reverse=True)
    return sorted_features[:top_n]


def compute_deviation_explanation(feature_name, zscore_value):
    """ITDS-35: Explanation logic based on deviation score."""
    direction = "above" if zscore_value > 0 else "below"
    magnitude = abs(zscore_value)

    if magnitude >= 3:
        strength = "extremely"
    elif magnitude >= 2:
        strength = "significantly"
    else:
        strength = "somewhat"

    return {
        "feature": feature_name,
        "zscore": round(zscore_value, 2),
        "direction": direction,
        "strength": strength
    }


def generate_reason_text(row, top_n=2):
    """ITDS-36: Map explanation into human-readable reason text."""
    top_features = identify_top_contributing_features(row, top_n=top_n)

    reasons = []
    for feat_name, zscore in top_features:
        label = FEATURE_LABELS.get(feat_name, feat_name)
        explanation = compute_deviation_explanation(feat_name, zscore)
        reasons.append(f"{label} ({explanation['strength']} {explanation['direction']} normal, z={explanation['zscore']})")

    if not reasons:
        return "No significant deviation identified."

    return "Flagged due to: " + "; ".join(reasons)


def generate_reasons_for_flagged_users(df, flag_col='iso_forest_flag'):
    """ITDS-37: Integrate with Member 1's model output — generate reasons for all flagged rows."""
    flagged = df[df[flag_col] == 1].copy()
    flagged['reason'] = flagged.apply(lambda row: generate_reason_text(row), axis=1)
    return flagged[['user', 'day', flag_col, 'iso_forest_score', 'is_insider_day', 'reason']]


if __name__ == "__main__":
    df = load_flagged_data()
    flagged_with_reasons = generate_reasons_for_flagged_users(df)

    print(f"Total flagged users: {len(flagged_with_reasons)}")
    print("\nSample flagged users with reasons:\n")
    print(flagged_with_reasons.head(10).to_string(index=False))

    flagged_with_reasons.to_csv("data/processed/flagged_users_with_reasons.csv", index=False)
    print("\nSaved to data/processed/flagged_users_with_reasons.csv")