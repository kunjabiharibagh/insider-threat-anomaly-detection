import pandas as pd


def compute_validation_metrics(df, flag_col="iso_forest_flag", label_col="is_insider_day"):
    tp = int(((df[flag_col] == 1) & (df[label_col] == 1)).sum())
    fp = int(((df[flag_col] == 1) & (df[label_col] == 0)).sum())
    fn = int(((df[flag_col] == 0) & (df[label_col] == 1)).sum())
    tn = int(((df[flag_col] == 0) & (df[label_col] == 0)).sum())

    precision = tp / (tp + fp) if (tp + fp) else 0.0
    recall = tp / (tp + fn) if (tp + fn) else 0.0
    fpr = fp / (fp + tn) if (fp + tn) else 0.0

    return {
        "tp": tp, "fp": fp, "fn": fn, "tn": tn,
        "precision": precision, "recall": recall, "fpr": fpr,
        "flagged": tp + fp,
    }


def compute_topk_table(df, score_col="iso_forest_score", label_col="is_insider_day",
                       percentages=(0.01, 0.05, 0.10)):
    total_insiders = int(df[label_col].sum())
    random_precision = total_insiders / len(df)
    df_sorted = df.sort_values(score_col, ascending=False)

    rows = []
    for pct in percentages:
        top_n = int(len(df_sorted) * pct)
        caught = int(df_sorted.head(top_n)[label_col].sum())
        rows.append({
            "Top % reviewed": f"{pct * 100:.0f}%",
            "Days reviewed": top_n,
            "Insiders caught": caught,
            "Precision": f"{caught / top_n * 100:.1f}%",
            "Recall": f"{caught / total_insiders * 100:.1f}%",
            "Random-chance precision": f"{random_precision * 100:.2f}%",
        })
    return pd.DataFrame(rows)