"""
TextTrace - Root Application Entrypoint
Exposes the Flask app from backend/ for WSGI, Gunicorn, run.bat, and test runners.
"""

import os
import sys

# Ensure root and backend directories are in sys.path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
BACKEND_DIR = os.path.join(BASE_DIR, "backend")

if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from backend.app import app

if __name__ == "__main__":
    import socket

    port = int(os.environ.get("PORT", 5000))
    try:
        local_ip = socket.gethostbyname(socket.gethostname())
    except Exception:
        local_ip = "127.0.0.1"

    print("\n" + "=" * 54)
    print("  TextTrace Full Stack Server Live")
    print(f"  * Desktop Browser:  http://127.0.0.1:{port}/")
    if local_ip != "127.0.0.1":
        print(f"  * Mobile / Wi-Fi:   http://{local_ip}:{port}/")
    print("=" * 54 + "\n")

    # host="0.0.0.0" allows mobile devices on local Wi-Fi and cloud platforms to connect
    app.run(host="0.0.0.0", port=port, debug=True)
