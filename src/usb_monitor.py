import psutil
import os
import hashlib
import json
import time
import threading
from datetime import datetime

APPROVED_HASHES_PATH = "data/approved_hashes.json"
EJECT_LOG_PATH = "data/processed/usb_eject_log.json"

os.makedirs("data/processed", exist_ok=True)

monitoring_active = False


def format_dt(dt=None):
    """Formats a datetime as: 06 Oct 2026, 09:42:15 PM"""
    if dt is None:
        dt = datetime.now()
    return dt.strftime("%d %b %Y, %I:%M:%S %p")


def load_approved_hashes():
    if os.path.exists(APPROVED_HASHES_PATH):
        with open(APPROVED_HASHES_PATH, "r") as f:
            return set(json.load(f))
    return set()


def get_removable_drives():
    drives = []
    for part in psutil.disk_partitions(all=False):
        if os.name == 'nt':
            import ctypes
            drive_type = ctypes.windll.kernel32.GetDriveTypeW(part.mountpoint)
            if drive_type == 2:  # DRIVE_REMOVABLE
                drives.append(part.mountpoint)
        else:
            if 'removable' in part.opts:
                drives.append(part.mountpoint)
    return drives


def hash_file(filepath):
    try:
        h = hashlib.sha256()
        with open(filepath, "rb") as f:
            while chunk := f.read(8192):
                h.update(chunk)
        return h.hexdigest()
    except (PermissionError, FileNotFoundError, OSError):
        return None


def get_file_details(filepath, file_hash, approved_hashes, inject_time_str):
    try:
        stat = os.stat(filepath)
        size_kb = round(stat.st_size / 1024, 2)
        modified = format_dt(datetime.fromtimestamp(stat.st_mtime))
    except OSError:
        size_kb, modified = None, None

    status = "APPROVED" if file_hash in approved_hashes else "ANOMALY"

    return {
        "file": filepath,
        "size_kb": size_kb,
        "last_modified": modified,
        "status": status,
        "inject_time": inject_time_str
    }


def scan_drive_detailed(drive, approved_hashes, inject_time_str=None):
    """Scans a drive and returns detailed per-file info."""
    if inject_time_str is None:
        inject_time_str = format_dt()

    details = []
    for root, dirs, files in os.walk(drive):
        for filename in files:
            filepath = os.path.join(root, filename)
            file_hash = hash_file(filepath)
            if file_hash is None:
                continue
            details.append(get_file_details(filepath, file_hash, approved_hashes, inject_time_str))
    return details


def log_eject(drive):
    """Records the eject time for a drive (for audit purposes)."""
    data = {}
    if os.path.exists(EJECT_LOG_PATH):
        with open(EJECT_LOG_PATH, "r") as f:
            try:
                data = json.load(f)
            except json.JSONDecodeError:
                data = {}
    data[drive] = format_dt()
    with open(EJECT_LOG_PATH, "w") as f:
        json.dump(data, f)


def background_monitor_loop(poll_interval=3):
    global monitoring_active
    monitoring_active = True
    known_drives = set(get_removable_drives())

    while monitoring_active:
        current_drives = set(get_removable_drives())
        removed = known_drives - current_drives

        for drive in removed:
            log_eject(drive)

        known_drives = current_drives
        time.sleep(poll_interval)


def start_background_monitor():
    thread = threading.Thread(target=background_monitor_loop, daemon=True)
    thread.start()
    return thread


def stop_background_monitor():
    global monitoring_active
    monitoring_active = False