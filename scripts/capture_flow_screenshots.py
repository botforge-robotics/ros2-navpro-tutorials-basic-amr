#!/usr/bin/env python3
import subprocess
import time
import json
import urllib.request
import base64
import os
import websocket

ARTIFACT_DIR = "/home/chaitu/.gemini/antigravity-cli/brain/5b5c6e15-453a-4d6b-aa2f-31f266c4a27c"

def capture_lesson(lesson_num, out_name, click_btn_text=None, wait_mid=0):
    chrome_proc = subprocess.Popen([
        "/usr/bin/google-chrome",
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        "--remote-debugging-port=9222",
        "--remote-allow-origins=*",
        "--window-size=1600,1200"
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    time.sleep(1.2)

    try:
        targets = json.loads(urllib.request.urlopen("http://127.0.0.1:9222/json").read().decode('utf-8'))
        ws_url = targets[0]["webSocketDebuggerUrl"]
        ws = websocket.create_connection(ws_url)

        msg_id = 1
        def send(method, params=None):
            nonlocal msg_id
            msg_id += 1
            ws.send(json.dumps({"id": msg_id, "method": method, "params": params or {}}))
            while True:
                resp = json.loads(ws.recv())
                if resp.get("id") == msg_id:
                    return resp.get("result", {})

        url = f"http://localhost:8000/#/lesson/{lesson_num}"
        send("Page.navigate", {"url": url})
        time.sleep(1.5)

        # Set user info so no modal appears
        send("Runtime.evaluate", {
            "expression": "localStorage.setItem('navpro_student_info', JSON.stringify({name: 'Alex Rivera', email: 'alex@navpro.io'}));"
        })
        time.sleep(0.5)

        # Scroll flow container into view
        send("Runtime.evaluate", {
            "expression": "const el = document.querySelector('.pubsub-flow-container'); if (el) el.scrollIntoView({block: 'center'});"
        })
        time.sleep(1.0)

        if click_btn_text:
            send("Runtime.evaluate", {
                "expression": f"const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('{click_btn_text}')); if (btn) btn.click();"
            })
            if wait_mid > 0:
                time.sleep(wait_mid)

        ss = send("Page.captureScreenshot", {"format": "png"})
        out_path = os.path.join(ARTIFACT_DIR, out_name)
        with open(out_path, "wb") as f:
            f.write(base64.b64decode(ss["data"]))
        print("Successfully captured:", out_path)

        ws.close()
    finally:
        chrome_proc.terminate()
        time.sleep(0.5)

if __name__ == "__main__":
    print("Capturing Lesson 05 PubSubFlow...")
    capture_lesson("05", "verify_flow_l05_pubsub.png")

    print("Capturing Lesson 07 ServiceFlow (Initial & Ready)...")
    capture_lesson("07", "verify_flow_l07_service_ready.png")

    print("Capturing Lesson 07 ServiceFlow (Mid-Flight RPC)...")
    capture_lesson("07", "verify_flow_l07_service_call.png", click_btn_text="Call Service", wait_mid=0.6)

    print("Capturing Lesson 10 ActionFlow (Initial & Ready)...")
    capture_lesson("10", "verify_flow_l10_action_ready.png")

    print("Capturing Lesson 10 ActionFlow (Active Driving & Feedback)...")
    capture_lesson("10", "verify_flow_l10_action_driving.png", click_btn_text="Send Goal", wait_mid=2.0)

    print("Done!")
