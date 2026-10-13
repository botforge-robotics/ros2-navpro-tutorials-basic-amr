#!/usr/bin/env python3
"""
Custom HTTP server for NavPro Learning Hub LMS.
Serves static frontend assets and provides a clipboard synchronization API
bridging web browser copy events to container X11/VNC clipboard.
"""

import sys
import os
import json
import argparse
import subprocess
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler

class LMSHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        # Enable CORS for local API access
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        if self.path == '/api/clipboard':
            self.send_response(200)
            self.send_header('Content-Type', 'text/plain')
            self.end_headers()
        else:
            self.send_error(404, 'Not Found')

    def do_POST(self):
        if self.path == '/api/clipboard':
            try:
                content_len = int(self.headers.get('Content-Length', 0))
                post_body = self.rfile.read(content_len).decode('utf-8')
                
                try:
                    payload = json.loads(post_body)
                    text = payload.get('text', '')
                except Exception:
                    text = post_body

                if text:
                    # Sync to X11 clipboard & primary selections on DISPLAY :1
                    display = os.environ.get('DISPLAY', ':1')
                    env = os.environ.copy()
                    env['DISPLAY'] = display
                    
                    for sel in ['clipboard', 'primary']:
                        try:
                            proc = subprocess.Popen(
                                ['xclip', '-selection', sel],
                                stdin=subprocess.PIPE,
                                stdout=subprocess.DEVNULL,
                                stderr=subprocess.DEVNULL,
                                env=env
                            )
                            proc.communicate(input=text.encode('utf-8'), timeout=2)
                        except Exception as e:
                            print(f"[Clipboard] Error setting {sel}: {e}", file=sys.stderr)

                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                resp = json.dumps({'status': 'ok', 'length': len(text)}).encode('utf-8')
                self.wfile.write(resp)
            except Exception as ex:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'error': str(ex)}).encode('utf-8'))
        else:
            self.send_error(404, 'Not Found')

    def do_GET(self):
        if self.path == '/api/clipboard':
            # Diagnostic endpoint to read current clipboard
            display = os.environ.get('DISPLAY', ':1')
            env = os.environ.copy()
            env['DISPLAY'] = display
            current_text = ''
            try:
                out = subprocess.check_output(
                    ['xclip', '-selection', 'clipboard', '-o'],
                    env=env,
                    stderr=subprocess.DEVNULL,
                    timeout=2
                )
                current_text = out.decode('utf-8', errors='replace')
            except Exception:
                pass

            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'clipboard': current_text}).encode('utf-8'))
        else:
            # Delegate all other paths to static file server
            super().do_GET()

def run_server(port, directory):
    os.chdir(directory)
    server_address = ('0.0.0.0', port)
    httpd = ThreadingHTTPServer(server_address, LMSHandler)
    print(f"[LMS Server] Serving {directory} on port {port} with X11 clipboard bridge...")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n[LMS Server] Shutting down.")
        httpd.server_close()

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="NavPro LMS Static Server with Clipboard Bridge")
    parser.add_argument('--port', type=int, default=8000, help="Port to listen on (default 8000)")
    parser.add_argument('--directory', type=str, default='/opt/navpro_level1/lms/dist', help="Directory to serve")
    args = parser.parse_args()

    # Fallback directory if running outside container
    if not os.path.exists(args.directory):
        local_dist = os.path.abspath(os.path.join(os.path.dirname(__file__), '../lms/dist'))
        if os.path.exists(local_dist):
            args.directory = local_dist

    run_server(args.port, args.directory)
