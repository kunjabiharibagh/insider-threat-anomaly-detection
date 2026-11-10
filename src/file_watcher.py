import os
import json
import hashlib
import threading
from datetime import datetime
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

APPROVED_FILE_HASHES_PATH = "data/approved_file_hashes.json"

_events = []
_lock = threading.Lock()


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
    def __init__(self):
        self.approved_hashes = load_approved_file_hashes()

    def _record(self, event_type, filepath):
        try:
            size_kb = None
            status = "N/A"
            if event_type != "DELETED":
                file_hash = hash_file(filepath)
                if file_hash is None:
                    status = "UNKNOWN"
                elif file_hash in self.approved_hashes:
                    status = "APPROVED"
                else:
                    status = "ANOMALY"
                try:
                    size_kb = round(os.path.getsize(filepath) / 1024, 2)
                except OSError:
                    pass

            row = {
                "time": format_dt(),
                "event": event_type,
                "file": filepath,
                "size_kb": size_kb,
                "status": status,
            }
            with _lock:
                _events.append(row)
            print(f"[FILE MONITOR] {row}")
        except Exception as e:
            print(f"[FILE MONITOR ERROR] {e}")

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


def start_file_monitor(watch_path):
    observer = Observer()
    observer.schedule(FileAccessHandler(), watch_path, recursive=True)
    observer.start()
    return observer


def stop_file_monitor(observer):
    if observer:
        observer.stop()
        observer.join()


def get_events():
    with _lock:
        return list(_events)


def clear_events():
    with _lock:
        _events.clear()