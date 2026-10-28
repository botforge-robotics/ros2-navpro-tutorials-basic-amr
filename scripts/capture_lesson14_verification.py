#!/usr/bin/env python3
import subprocess
import time
import json
import urllib.request
import base64
import os
import websocket

ARTIFACT_DIR = "/home/chaitu/.gemini/antigravity-ide/brain/12adaf3e-6dce-4b79-b140-20e1bdbb9b89"

def run():
    chrome_proc = subprocess.Popen([
        "/usr/bin/google-chrome",
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        "--remote-debugging-port=9223",
        "--remote-allow-origins=*",
        "--window-size=1440,1200"
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    time.sleep(1.5)

    try:
        targets = json.loads(urllib.request.urlopen("http://127.0.0.1:9223/json").read().decode('utf-8'))
        ws_url = targets[0]["webSocketDebuggerUrl"]
        print("Connected to Chrome:", ws_url)

        ws = websocket.create_connection(ws_url, timeout=10)

        def send_cdp(method, params=None):
            msg_id = int(time.time() * 1000) % 1000000
            payload = {"id": msg_id, "method": method, "params": params or {}}
            ws.send(json.dumps(payload))
            while True:
                resp = json.loads(ws.recv())
                if resp.get("id") == msg_id:
                    return resp.get("result", {})

        # Inject student registration into localStorage before page loads
        send_cdp("Page.enable")
        send_cdp("Page.addScriptToEvaluateOnNewDocument", {
            "source": """
                localStorage.setItem('navpro_student_info', JSON.stringify({name: 'Alex Rivera', email: 'alex@botforge.in', registered: true}));
                localStorage.setItem('navpro_l1_theme', 'light');
            """
        })

        # Navigate to Lesson 14
        print("Navigating to Lesson 14...")
        send_cdp("Page.navigate", {"url": "http://localhost:8000/#/lesson/14"})
        time.sleep(2.5)

        # 1. Scroll to 3D Viewer & Capture
        send_cdp("Runtime.evaluate", {
            "expression": "const el = document.querySelector('.interactive-urdf-viewer-container'); if (el) el.scrollIntoView({block: 'start'});"
        })
        time.sleep(1.0)
        ss1 = send_cdp("Page.captureScreenshot", {"format": "png"})
        out1 = os.path.join(ARTIFACT_DIR, "lms_lesson14_3d_viewer_clean.png")
        with open(out1, "wb") as f:
            f.write(base64.b64decode(ss1["data"]))
        print("Saved 3D Viewer:", out1)

        # 2. Scroll to Anatomy Specs Card & Capture
        send_cdp("Runtime.evaluate", {
            "expression": "const el = document.querySelector('.architecture-specs-card'); if (el) el.scrollIntoView({block: 'start'});"
        })
        time.sleep(0.8)
        ss2 = send_cdp("Page.captureScreenshot", {"format": "png"})
        out2 = os.path.join(ARTIFACT_DIR, "lms_lesson14_anatomy_card.png")
        with open(out2, "wb") as f:
            f.write(base64.b64decode(ss2["data"]))
        print("Saved Anatomy Card:", out2)

        # 3. Scroll to Section 6 Camera Challenge & Capture
        send_cdp("Runtime.evaluate", {
            "expression": "const el = document.getElementById('6-hands-on-student-challenge'); if (el) el.scrollIntoView({block: 'start'});"
        })
        time.sleep(0.8)
        ss3 = send_cdp("Page.captureScreenshot", {"format": "png"})
        out3 = os.path.join(ARTIFACT_DIR, "lms_lesson14_camera_challenge.png")
        with open(out3, "wb") as f:
            f.write(base64.b64decode(ss3["data"]))
        print("Saved Camera Challenge:", out3)

        # 4. Navigate to Overview Hub
        print("Navigating to Overview Hub...")
        send_cdp("Page.navigate", {"url": "http://localhost:8000/#/"})
        time.sleep(2.0)
        ss4 = send_cdp("Page.captureScreenshot", {"format": "png"})
        out4 = os.path.join(ARTIFACT_DIR, "lms_overview_nexus_amr.png")
        with open(out4, "wb") as f:
            f.write(base64.b64decode(ss4["data"]))
        print("Saved Overview:", out4)

        ws.close()
    finally:
        chrome_proc.terminate()

if __name__ == "__main__":
    run()
