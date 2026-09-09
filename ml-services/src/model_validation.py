"""
model_validation.py

User Story: US-07 - Validate model accuracy
As an administrator, I want the model's flagging accuracy validated, so
that false alarms are minimized.

Definition of Done: False positive rate is measured and documented.
"""

import pandas as pd

RESULTS_PATH = "data/processed/user_features_with_flags.csv"
GROUND_TRUTH_PATH = "data/raw/users_ground_truth.csv"
REPORT_PATH = "data/processed/validation_report.txt"


def load_data():
    """Load the model's flagged results and the known ground truth."""
    results = pd.read_csv(RESULTS_PATH)
    ground_truth = pd.read_csv(GROUND_TRUTH_PATH)
    merged = results.merge(ground_truth[["user_id", "is_insider_threat"]], on="user_id")
    print(f"Loaded {len(merged)} users with both model results and ground truth.")
    return merged


def calculate_confusion_counts(df: pd.DataFrame):
    """
    Sub-task 2: Compare model predictions against known truth.

    True Positive  (TP): actually a threat, AND flagged      -> good catch
    False Positive (FP): NOT a threat, but flagged           -> false alarm
    True Negative  (TN): NOT a threat, and NOT flagged       -> correctly ignored
    False Negative (FN): actually a threat, but NOT flagged  -> missed threat
    """
    tp = ((df["is_flagged"]) & (df["is_insider_threat"])).sum()
    fp = ((df["is_flagged"]) & (~df["is_insider_threat"])).sum()
    tn = ((~df["is_flagged"]) & (~df["is_insider_threat"])).sum()
    fn = ((~df["is_flagged"]) & (df["is_insider_threat"])).sum()
    return tp, fp, tn, fn


def calculate_metrics(tp, fp, tn, fn):
    """
    Turn raw counts into readable rates.

    False Positive Rate = FP / (FP + TN)  -> % of normal users wrongly flagged
    Precision = TP / (TP + FP)            -> % of flagged users who were real threats
    Recall = TP / (TP + FN)               -> % of real threats we actually caught
    """
    false_positive_rate = fp / (fp + tn) if (fp + tn) > 0 else 0
    precision = tp / (tp + fp) if (tp + fp) > 0 else 0
    recall = tp / (tp + fn) if (tp + fn) > 0 else 0
    return false_positive_rate, precision, recall


def write_report(tp, fp, tn, fn, fpr, precision, recall, path: str):
    """Save a plain-text validation report as evidence."""
    lines = [
        "MODEL VALIDATION REPORT - US-07",
        "=" * 40,
        f"True Positives  (correctly flagged threats): {tp}",
        f"False Positives (normal users wrongly flagged): {fp}",
        f"True Negatives  (correctly left unflagged): {tn}",
        f"False Negatives (missed threats): {fn}",
        "",
        f"False Positive Rate: {fpr:.1%}",
        f"Precision: {precision:.1%}",
        f"Recall: {recall:.1%}",
    ]
    report_text = "\n".join(lines)
    print("\n" + report_text)
    with open(path, "w") as f:
        f.write(report_text)
    print(f"\nReport saved to: {path}")


def main():
    """Run the full US-07 validation pipeline end to end."""
    df = load_data()
    tp, fp, tn, fn = calculate_confusion_counts(df)
    fpr, precision, recall = calculate_metrics(tp, fp, tn, fn)
    write_report(tp, fp, tn, fn, fpr, precision, recall, REPORT_PATH)


if __name__ == "__main__":
    main()