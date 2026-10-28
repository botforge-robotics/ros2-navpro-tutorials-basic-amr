#!/usr/bin/env python3
import subprocess
import time
import json
import urllib.request
import urllib.parse
import base64
import os

ARTIFACT_DIR = "/home/chaitu/.gemini/antigravity-cli/brain/5b5c6e15-453a-4d6b-aa2f-31f266c4a27c"

def run():
    chrome_proc = subprocess.Popen([
        "/usr/bin/google-chrome",
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        "--remote-debugging-port=9222",
        "--remote-allow-origins=*",
        "--window-size=1440,2400"
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    time.sleep(1.5)

    try:
        # Get list of targets
        targets = json.loads(urllib.request.urlopen("http://127.0.0.1:9222/json").read().decode('utf-8'))
        ws_url = targets[0]["webSocketDebuggerUrl"]
        print("Connected to Chrome:", ws_url)

        import websocket

        ws = websocket.create_connection(ws_url)

        def send_cdp(method, params=None):
            msg_id = int(time.time() * 1000) % 1000000
            payload = {"id": msg_id, "method": method, "params": params or {}}
            ws.send(json.dumps(payload))
            while True:
                resp = json.loads(ws.recv())
                if resp.get("id") == msg_id:
                    return resp.get("result", {})

        # Navigate to L05
        send_cdp("Page.navigate", {"url": "http://localhost:8000/#/lesson/05"})
        time.sleep(1.5)

        # Set localStorage to dismiss modal
        send_cdp("Runtime.evaluate", {
            "expression": "localStorage.setItem('navpro_student_info', JSON.stringify({name: 'Alex Rivera', email: 'alex@navpro.io'})); location.reload();"
        })
        time.sleep(2.0)

        # Scroll to file card
        send_cdp("Runtime.evaluate", {
            "expression": "document.querySelector('.file-edit-instruction-card').scrollIntoView({block: 'center'});"
        })
        time.sleep(0.5)

        # Capture Screenshot
        ss = send_cdp("Page.captureScreenshot", {"format": "png"})
        img_bytes = base64.b64decode(ss["data"])
        out_l5 = os.path.join(ARTIFACT_DIR, "clean_l5_file_edit_card.png")
        with open(out_l5, "wb") as f:
            f.write(img_bytes)
        print("Saved", out_l5)

        # Navigate to L07
        send_cdp("Page.navigate", {"url": "http://localhost:8000/#/lesson/07"})
        time.sleep(1.5)

        send_cdp("Runtime.evaluate", {
            "expression": "document.querySelector('.file-edit-instruction-card').scrollIntoView({block: 'center'});"
        })
        time.sleep(0.5)

        ss = send_cdp("Page.captureScreenshot", {"format": "png"})
        img_bytes = base64.b64decode(ss["data"])
        out_l7 = os.path.join(ARTIFACT_DIR, "clean_l7_file_edit_card.png")
        with open(out_l7, "wb") as f:
            f.write(img_bytes)
        print("Saved", out_l7)

        ws.close()
    finally:
        chrome_proc.terminate()

if __name__ == "__main__":
    run()
