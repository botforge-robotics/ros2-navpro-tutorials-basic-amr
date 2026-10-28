#!/usr/bin/env python3
import subprocess
import time
import json
import urllib.request
import base64
import os
import websocket

ARTIFACT_DIR = "/home/chaitu/.gemini/antigravity-cli/brain/5b5c6e15-453a-4d6b-aa2f-31f266c4a27c"

def run():
    chrome_proc = subprocess.Popen([
        "/usr/bin/google-chrome",
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        "--remote-debugging-port=9225",
        "--remote-allow-origins=*",
        "--window-size=1440,1100"
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    time.sleep(1.5)

    try:
        targets = json.loads(urllib.request.urlopen("http://127.0.0.1:9225/json").read().decode("utf-8"))
        ws_url = targets[0]["webSocketDebuggerUrl"]
        print("Connected to Chrome:", ws_url)
        ws = websocket.create_connection(ws_url, timeout=15)

        def send_cdp(method, params=None):
            msg_id = int(time.time() * 1000) % 1000000
            payload = {"id": msg_id, "method": method, "params": params or {}}
            ws.send(json.dumps(payload))
            while True:
                resp = json.loads(ws.recv())
                if resp.get("id") == msg_id:
                    return resp.get("result", {})

        # Navigate to Lesson 14
        print("Navigating to Lesson 14...")
        send_cdp("Page.navigate", {"url": "http://localhost:8000/#/lesson/14"})
        time.sleep(1.5)

        # Set localStorage to dismiss modal and light theme, then reload
        send_cdp("Runtime.evaluate", {
            "expression": """
                localStorage.setItem('navpro_student_info', JSON.stringify({name: 'Alex Rivera', email: 'alex@navpro.io', registered: true}));
                localStorage.setItem('navpro_l1_theme', 'light');
                location.reload();
            """
        })
        time.sleep(2.0)

        # 1. 3D Viewer with Solid Bodies ON (Default)
        send_cdp("Runtime.evaluate", {
            "expression": "const el = document.querySelector('.interactive-urdf-viewer-container'); if (el) el.scrollIntoView({block: 'center'});"
        })
        time.sleep(1.2)
        ss1 = send_cdp("Page.captureScreenshot", {"format": "png"})
        out1 = os.path.join(ARTIFACT_DIR, "l14_urdf_viewer_solid_on.png")
        with open(out1, "wb") as f:
            f.write(base64.b64decode(ss1["data"]))
        print("Saved 3D Viewer (Solid ON):", out1)

        # 2. Toggle Solid Bodies OFF
        send_cdp("Runtime.evaluate", {
            "expression": """
                const labels = Array.from(document.querySelectorAll('label'));
                const solidLabel = labels.find(l => l.textContent.includes('Solid Bodies'));
                if (solidLabel) {
                    const cb = solidLabel.querySelector('input[type="checkbox"]');
                    if (cb) cb.click();
                }
            """
        })
        time.sleep(1.2)
        ss2 = send_cdp("Page.captureScreenshot", {"format": "png"})
        out2 = os.path.join(ARTIFACT_DIR, "l14_urdf_viewer_solid_off.png")
        with open(out2, "wb") as f:
            f.write(base64.b64decode(ss2["data"]))
        print("Saved 3D Viewer (Solid OFF):", out2)

        # 3. Kinematic Tree Diagram and Anatomy Table
        send_cdp("Runtime.evaluate", {
            "expression": "const el = document.getElementById('2-urdf-anatomy-links-vs-joints'); if (el) el.scrollIntoView({block: 'start'});"
        })
        time.sleep(1.5)
        ss3 = send_cdp("Page.captureScreenshot", {"format": "png"})
        out3 = os.path.join(ARTIFACT_DIR, "l14_kinematic_tree_and_table.png")
        with open(out3, "wb") as f:
            f.write(base64.b64decode(ss3["data"]))
        print("Saved Kinematic Tree & Table:", out3)

        # 4. Joint Types Animation and Cards
        send_cdp("Runtime.evaluate", {
            "expression": "const el = document.getElementById('22-urdf-joint-types-animated-comparison'); if (el) el.scrollIntoView({block: 'start'});"
        })
        time.sleep(1.5)
        ss4 = send_cdp("Page.captureScreenshot", {"format": "png"})
        out4 = os.path.join(ARTIFACT_DIR, "l14_joint_types_animation.png")
        with open(out4, "wb") as f:
            f.write(base64.b64decode(ss4["data"]))
        print("Saved Joint Types Animation:", out4)

        ws.close()
        print("All screenshots successfully captured!")
    finally:
        chrome_proc.terminate()

if __name__ == "__main__":
    run()
