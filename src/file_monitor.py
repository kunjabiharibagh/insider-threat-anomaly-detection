import os
import time
import hashlib
import json
from datetime import datetime
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

APPROVED_FILE_HASHES_PATH = "data/approved_file_hashes.json"


def format_dt(dt=None):
    if dt is None:
        dt = datetime.now()
    return dt.strftime("%d %b %Y, %I:%M:%S %p")


def load_approved_file_hashes():
    if os.path.exists(APPROVED_FILE_HASHES_PATH):
        with open(APPROVED_FILE_HASHES_PATH, "r") as f:
            return set(json.load(f))
    return set()


def hash_file(filepath):
    try:
        h = hashlib.sha256()
        with open(filepath, "rb") as f:
            while chunk := f.read(8192):
                h.update(chunk)
        return h.hexdigest()
    except (PermissionError, FileNotFoundError, OSError):
        return None


class FileAccessHandler(FileSystemEventHandler):
    def __init__(self, event_log):
        self.event_log = event_log
        self.approved_hashes = load_approved_file_hashes()

    def _record(self, event_type, filepath):
        if os.path.isdir(filepath):
            return

        file_hash = hash_file(filepath) if event_type != "DELETED" else None
        status = "N/A"
        if event_type != "DELETED":
            status = "APPROVED" if file_hash in self.approved_hashes else "ANOMALY"

        try:
            size_kb = round(os.path.getsize(filepath) / 1024, 2) if event_type != "DELETED" else None
        except OSError:
            size_kb = None

        self.event_log.append({
            "time": format_dt(),
            "event": event_type,
            "file": filepath,
            "size_kb": size_kb,
            "status": status
        })

    def on_created(self, event):
        if not event.is_directory:
            self._record("CREATED", event.src_path)

    def on_modified(self, event):
        if not event.is_directory:
            self._record("MODIFIED", event.src_path)

    def on_deleted(self, event):
        if not event.is_directory:
            self._record("DELETED", event.src_path)

    def on_moved(self, event):
        if not event.is_directory:
            self._record("RENAMED/MOVED", event.dest_path)


def start_file_monitor(watch_path, event_log):
    """Starts watching a folder in the background. Returns the observer so it can be stopped later."""
    handler = FileAccessHandler(event_log)
    observer = Observer()
    observer.schedule(handler, watch_path, recursive=True)
    observer.start()
    return observer


def stop_file_monitor(observer):
    if observer:
        observer.stop()
        observer.join()