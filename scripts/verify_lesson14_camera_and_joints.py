#!/usr/bin/env python3
import subprocess
import time
import json
import urllib.request
import base64
import os
import websocket

ARTIFACT_DIR = "/home/chaitu/.gemini/antigravity-cli/brain/5b5c6e15-453a-4d6b-aa2f-31f266c4a27c"
os.makedirs(ARTIFACT_DIR, exist_ok=True)

def run():
    chrome_proc = subprocess.Popen([
        "/usr/bin/google-chrome",
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        "--remote-debugging-port=9232",
        "--remote-allow-origins=*",
        "--window-size=1440,1100"
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    time.sleep(2.0)

    try:
        targets = json.loads(urllib.request.urlopen("http://127.0.0.1:9232/json").read().decode("utf-8"))
        page_target = next(t for t in targets if t.get("type") == "page")
        ws = websocket.create_connection(page_target["webSocketDebuggerUrl"], timeout=20)

        def send_cdp(method, params=None):
            msg_id = int(time.time() * 1000) % 1000000
            payload = {"id": msg_id, "method": method, "params": params or {}}
            ws.send(json.dumps(payload))
            while True:
                resp = json.loads(ws.recv())
                if resp.get("id") == msg_id:
                    return resp.get("result", {})

        print("Navigating to Lesson 14 with no_modal...")
        send_cdp("Page.navigate", {"url": "http://localhost:8000/?no_modal=true#/lesson/14"})
        time.sleep(3.0)

        # Set light theme
        send_cdp("Runtime.evaluate", {
            "expression": """
                localStorage.setItem('navpro_student_info', JSON.stringify({name: 'Alex Rivera', email: 'alex@navpro.io', registered: true}));
                localStorage.setItem('navpro_l1_theme', 'light');
                document.documentElement.setAttribute('data-theme', 'light');
            """
        })
        time.sleep(1.0)

        # 1. Scroll to Kinematic Tree SVG & Table
        print("Scrolling to Kinematic Tree Section...")
        send_cdp("Runtime.evaluate", {
            "expression": """
                const el = document.getElementById('2-urdf-anatomy-links-vs-joints');
                const container = document.querySelector('.app-content-container');
                if (el && container) {
                    container.scrollTop = el.offsetTop - 40;
                }
            """
        })
        time.sleep(1.5)
        ss1 = send_cdp("Page.captureScreenshot", {"format": "png"})
        with open(os.path.join(ARTIFACT_DIR, "verify_l14_kinematic_tree_correct.png"), "wb") as f:
            f.write(base64.b64decode(ss1["data"]))
        print("Saved verify_l14_kinematic_tree_correct.png")

        # 2. Scroll to Joint Types Animation
        print("Scrolling to Joint Types Animation Section...")
        send_cdp("Runtime.evaluate", {
            "expression": """
                const el = document.getElementById('22-urdf-joint-types-animated-comparison');
                const container = document.querySelector('.app-content-container');
                if (el && container) {
                    container.scrollTop = el.offsetTop - 30;
                }
            """
        })
        time.sleep(1.5)
        ss2 = send_cdp("Page.captureScreenshot", {"format": "png"})
        with open(os.path.join(ARTIFACT_DIR, "verify_l14_joint_animation_correct.png"), "wb") as f:
            f.write(base64.b64decode(ss2["data"]))
        print("Saved verify_l14_joint_animation_correct.png")

        # 3. Scroll to Challenge Section
        print("Scrolling to Challenge Section...")
        send_cdp("Runtime.evaluate", {
            "expression": """
                const el = document.getElementById('6-hands-on-student-challenge');
                const container = document.querySelector('.app-content-container');
                if (el && container) {
                    container.scrollTop = el.offsetTop - 30;
                }
            """
        })
        time.sleep(1.5)
        ss3 = send_cdp("Page.captureScreenshot", {"format": "png"})
        with open(os.path.join(ARTIFACT_DIR, "verify_l14_challenge_correct.png"), "wb") as f:
            f.write(base64.b64decode(ss3["data"]))
        print("Saved verify_l14_challenge_correct.png")

        ws.close()
    finally:
        chrome_proc.terminate()

if __name__ == "__main__":
    run()
