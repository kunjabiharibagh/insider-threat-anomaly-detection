import time
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

class H(FileSystemEventHandler):
    def on_any_event(self, event):
        print(event.event_type, event.src_path)

o = Observer()
o.schedule(H(), r"C:\Users\deepa\Projects\insider-threat-detection\test_files", recursive=True)
o.start()
print("Watching... create, rename or delete a file in test_files. Ctrl+C to stop.")
try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    o.stop()
o.join()