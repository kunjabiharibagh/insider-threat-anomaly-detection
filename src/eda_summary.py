import pandas as pd

def load_processed_features(path="data/processed/user_daily_features_with_flags.csv"):
    return pd.read_csv(path)

def compute_summary_stats(df):
    """ITDS-30: Summary statistics comparing insider vs normal days."""
    summary = df.groupby('is_insider_day')[
        ['logon_count', 'after_hours_logon_count', 'distinct_pc_count',
         'usb_connect_count', 'file_access_count', 'email_count', 'email_external_count']
    ].mean().reset_index()

    summary['is_insider_day'] = summary['is_insider_day'].map({0: 'Normal Days', 1: 'Insider Days'})
    summary = summary.rename(columns={'is_insider_day': 'Group'})

    return summary

def get_trend_comparison_data(df, feature):
    """ITDS-31: Data prepared for normal vs unusual trend comparison charts."""
    normal = df[df['is_insider_day'] == 0][feature]
    insider = df[df['is_insider_day'] == 1][feature]

    return {
        "Normal": normal,
        "Insider": insider
    }

def get_capture_rate_curve(df, score_col='iso_forest_score', percentages=None):
    """ITDS-32: Prepared data structure for the model performance chart."""
    if percentages is None:
        percentages = [0.01, 0.02, 0.05, 0.10, 0.15, 0.20, 0.30, 0.50]

    total_insiders = df['is_insider_day'].sum()
    df_sorted = df.sort_values(score_col, ascending=False)

    results = []
    for pct in percentages:
        top_n = int(len(df_sorted) * pct)
        caught = df_sorted.head(top_n)['is_insider_day'].sum()
        results.append({
            "pct_reviewed": pct * 100,
            "pct_caught": caught / total_insiders * 100,
            "random_chance": pct * 100
        })

    return pd.DataFrame(results)