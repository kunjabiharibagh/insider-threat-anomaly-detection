import hashlib
import json
import os
import sys

APPROVED_HASHES_PATH = "data/approved_hashes.json"

def hash_file(filepath):
    h = hashlib.sha256()
    with open(filepath, "rb") as f:
        while chunk := f.read(8192):
            h.update(chunk)
    return h.hexdigest()

def approve_file(filepath):
    if os.path.exists(APPROVED_HASHES_PATH):
        with open(APPROVED_HASHES_PATH, "r") as f:
            hashes = set(json.load(f))
    else:
        hashes = set()

    file_hash = hash_file(filepath)
    hashes.add(file_hash)

    os.makedirs("data", exist_ok=True)
    with open(APPROVED_HASHES_PATH, "w") as f:
        json.dump(list(hashes), f)

    print(f"✅ Approved: {filepath}")
    print(f"   Hash: {file_hash}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python src\\approve_file.py <filepath>")
    else:
        approve_file(sys.argv[1])