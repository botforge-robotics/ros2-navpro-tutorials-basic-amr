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
        "--remote-debugging-port=9222",
        "--remote-allow-origins=*",
        "--window-size=1600,1200"
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    time.sleep(1.5)

    try:
        targets = json.loads(urllib.request.urlopen("http://127.0.0.1:9222/json").read().decode('utf-8'))
        ws_url = targets[0]["webSocketDebuggerUrl"]
        print("Connected to Chrome:", ws_url)

        ws = websocket.create_connection(ws_url, timeout=10)

        msg_counter = 1
        def send_cdp(method, params=None):
            nonlocal msg_counter
            msg_counter += 1
            msg_id = msg_counter
            payload = {"id": msg_id, "method": method, "params": params or {}}
            ws.send(json.dumps(payload))
            while True:
                resp = json.loads(ws.recv())
                if resp.get("id") == msg_id:
                    return resp.get("result", {})

        # Navigate to home first
        print("Initializing student session...")
        send_cdp("Page.navigate", {"url": "http://localhost:8000/"})
        time.sleep(1.5)
        send_cdp("Runtime.evaluate", {
            "expression": "localStorage.setItem('navpro_student_info', JSON.stringify({name: 'Alex Rivera', email: 'alex@navpro.io'}));"
        })
        time.sleep(0.5)

        # 1. TEST NAVIGATION TRANSITION: Lesson 04 -> Lesson 05
        print("Navigating to Lesson 04...")
        send_cdp("Page.navigate", {"url": "http://localhost:8000/#/lesson/04"})
        time.sleep(1.5)

        print("Navigating to Lesson 05...")
        send_cdp("Page.navigate", {"url": "http://localhost:8000/#/lesson/05"})
        time.sleep(2.0)

        # Scroll to PubSubFlow
        send_cdp("Runtime.evaluate", {
            "expression": "const flow = document.querySelector('.pubsub-flow-container'); if (flow) flow.scrollIntoView({block: 'center'});"
        })
        time.sleep(1.5)

        # Capture PubSubFlow screenshot
        ss = send_cdp("Page.captureScreenshot", {"format": "png"})
        out_l5 = os.path.join(ARTIFACT_DIR, "verify_pubsub_smooth.png")
        with open(out_l5, "wb") as f:
            f.write(base64.b64decode(ss["data"]))
        print("Saved", out_l5)

        # 2. TEST LESSON 07: ServiceFlow
        print("Testing Lesson 07 ServiceFlow...")
        send_cdp("Page.navigate", {"url": "http://localhost:8000/#/lesson/07"})
        time.sleep(2.0)
        send_cdp("Runtime.evaluate", {
            "expression": "const flow = document.querySelector('.pubsub-flow-container'); if (flow) flow.scrollIntoView({block: 'center'});"
        })
        time.sleep(1.0)

        # Click Call Service button
        send_cdp("Runtime.evaluate", {
            "expression": "const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Call Service') || b.textContent.includes('Send Request')); if (btn) btn.click();"
        })
        time.sleep(0.6)
        ss = send_cdp("Page.captureScreenshot", {"format": "png"})
        out_l7_mid = os.path.join(ARTIFACT_DIR, "verify_service_midflight.png")
        with open(out_l7_mid, "wb") as f:
            f.write(base64.b64decode(ss["data"]))
        print("Saved", out_l7_mid)

        # Wait for completion
        time.sleep(3.0)
        ss = send_cdp("Page.captureScreenshot", {"format": "png"})
        out_l7_done = os.path.join(ARTIFACT_DIR, "verify_service_completed.png")
        with open(out_l7_done, "wb") as f:
            f.write(base64.b64decode(ss["data"]))
        print("Saved", out_l7_done)

        # 3. TEST LESSON 10: ActionFlow
        print("Testing Lesson 10 ActionFlow...")
        send_cdp("Page.navigate", {"url": "http://localhost:8000/#/lesson/10"})
        time.sleep(2.0)
        send_cdp("Runtime.evaluate", {
            "expression": "const flow = document.querySelector('.pubsub-flow-container'); if (flow) flow.scrollIntoView({block: 'center'});"
        })
        time.sleep(1.0)

        # Click Send Goal
        send_cdp("Runtime.evaluate", {
            "expression": "const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Send Goal')); if (btn) btn.click();"
        })
        time.sleep(2.2)
        ss = send_cdp("Page.captureScreenshot", {"format": "png"})
        out_l10_run = os.path.join(ARTIFACT_DIR, "verify_action_driving.png")
        with open(out_l10_run, "wb") as f:
            f.write(base64.b64decode(ss["data"]))
        print("Saved", out_l10_run)

        # Click Cancel Goal
        send_cdp("Runtime.evaluate", {
            "expression": "const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Cancel')); if (btn) btn.click();"
        })
        time.sleep(1.0)
        ss = send_cdp("Page.captureScreenshot", {"format": "png"})
        out_l10_cancel = os.path.join(ARTIFACT_DIR, "verify_action_canceled.png")
        with open(out_l10_cancel, "wb") as f:
            f.write(base64.b64decode(ss["data"]))
        print("Saved", out_l10_cancel)

        ws.close()
        print("All interactive verifications completed successfully!")
    finally:
        chrome_proc.terminate()

if __name__ == "__main__":
    run()
