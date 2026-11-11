"""Local preview server. Run: python server.py"""
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import os

os.chdir(Path(__file__).resolve().parent)
address = ("0.0.0.0", 8000)
print("Open http://localhost:8000")
ThreadingHTTPServer(address, SimpleHTTPRequestHandler).serve_forever()
