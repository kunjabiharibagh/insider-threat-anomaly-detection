from usb_monitor import get_removable_drives

drives = get_removable_drives()
print(f"Detected removable drives: {drives}")