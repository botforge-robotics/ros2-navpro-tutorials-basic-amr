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
        "--user-data-dir=/tmp/chrome_flow_test2",
        "--remote-debugging-port=9222",
        "--remote-allow-origins=*",
        "--window-size=1600,1200"
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    time.sleep(1.5)

    try:
        targets = json.loads(urllib.request.urlopen("http://127.0.0.1:9222/json").read().decode('utf-8'))
        page_targets = [t for t in targets if t.get("type") == "page"]
        ws_url = page_targets[0]["webSocketDebuggerUrl"]
        print("Connected to Chrome Page:", ws_url)

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

        # Setup localStorage to avoid login modals
        send("Page.navigate", {"url": "http://localhost:8000/?no_modal=1"})
        time.sleep(1.2)
        send("Runtime.evaluate", {
            "expression": "localStorage.setItem('navpro_student_info', JSON.stringify({name: 'Alex Rivera', email_roll: 'alex@navpro.io', registered: true, host_ip: 'localhost'}));"
        })

        # ----------------------------------------------------
        # 1. Lesson 05: Pub/Sub Flow
        # ----------------------------------------------------
        print("1. Capturing Lesson 05: PubSubFlow...")
        send("Page.navigate", {"url": "http://localhost:8000/?no_modal=1#/lesson/05"})
        time.sleep(2.5)
        send("Runtime.evaluate", {
            "expression": "const el = document.getElementById('pubsub-flow-root'); if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });"
        })
        time.sleep(1.0)
        ss5 = send("Page.captureScreenshot", {"format": "png"})
        out_l5 = os.path.join(ARTIFACT_DIR, "verify_flow_l05_pubsub.png")
        with open(out_l5, "wb") as f:
            f.write(base64.b64decode(ss5["data"]))
        print("-> Saved", out_l5)

        # ----------------------------------------------------
        # 2. Lesson 07: Service Flow
        # ----------------------------------------------------
        print("2. Capturing Lesson 07: ServiceFlow...")
        send("Page.navigate", {"url": "http://localhost:8000/?no_modal=1#/lesson/07"})
        time.sleep(2.5)
        send("Runtime.evaluate", {
            "expression": "const el = document.getElementById('service-flow-root'); if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });"
        })
        time.sleep(1.0)
        # Capture ready state
        ss7_ready = send("Page.captureScreenshot", {"format": "png"})
        out_l7_ready = os.path.join(ARTIFACT_DIR, "verify_flow_l07_service_ready.png")
        with open(out_l7_ready, "wb") as f:
            f.write(base64.b64decode(ss7_ready["data"]))
        print("-> Saved", out_l7_ready)

        # Click Call Service button
        send("Runtime.evaluate", {
            "expression": "const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Call Service') || b.textContent.includes('Send Request')); if (btn) btn.click();"
        })
        # Wait 1.0s: Request packet in flight (Left -> Right)
        time.sleep(1.0)
        ss7_req = send("Page.captureScreenshot", {"format": "png"})
        out_l7_req = os.path.join(ARTIFACT_DIR, "verify_flow_l07_service_request_flight.png")
        with open(out_l7_req, "wb") as f:
            f.write(base64.b64decode(ss7_req["data"]))
        print("-> Saved", out_l7_req)

        # Wait 2.8s: Server executes (2.4s + 1.6s total 4.0s from start; at 3.8s it enters response flight Right <- Left)
        time.sleep(2.6)
        ss7_resp = send("Page.captureScreenshot", {"format": "png"})
        out_l7_resp = os.path.join(ARTIFACT_DIR, "verify_flow_l07_service_response_flight.png")
        with open(out_l7_resp, "wb") as f:
            f.write(base64.b64decode(ss7_resp["data"]))
        print("-> Saved", out_l7_resp)

        # ----------------------------------------------------
        # 3. Lesson 10: Action Flow
        # ----------------------------------------------------
        print("3. Capturing Lesson 10: ActionFlow...")
        send("Page.navigate", {"url": "http://localhost:8000/?no_modal=1#/lesson/10"})
        time.sleep(2.5)
        send("Runtime.evaluate", {
            "expression": "const el = document.getElementById('action-flow-root'); if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });"
        })
        time.sleep(1.0)
        # Capture ready state
        ss10_ready = send("Page.captureScreenshot", {"format": "png"})
        out_l10_ready = os.path.join(ARTIFACT_DIR, "verify_flow_l10_action_ready.png")
        with open(out_l10_ready, "wb") as f:
            f.write(base64.b64decode(ss10_ready["data"]))
        print("-> Saved", out_l10_ready)

        # Click Send Goal
        send("Runtime.evaluate", {
            "expression": "const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Send Goal')); if (btn) btn.click();"
        })
        # Wait 1.0s: Goal packet in flight (Left -> Right)
        time.sleep(1.0)
        ss10_goal = send("Page.captureScreenshot", {"format": "png"})
        out_l10_goal = os.path.join(ARTIFACT_DIR, "verify_flow_l10_action_goal_flight.png")
        with open(out_l10_goal, "wb") as f:
            f.write(base64.b64decode(ss10_goal["data"]))
        print("-> Saved", out_l10_goal)

        # Wait 2.2s: Goal accepted, AMR driving, continuous feedback streaming Right <- Left
        time.sleep(2.2)
        ss10_driving = send("Page.captureScreenshot", {"format": "png"})
        out_l10_driving = os.path.join(ARTIFACT_DIR, "verify_flow_l10_action_driving.png")
        with open(out_l10_driving, "wb") as f:
            f.write(base64.b64decode(ss10_driving["data"]))
        print("-> Saved", out_l10_driving)

        ws.close()
        print("All screenshots successfully captured!")
    finally:
        chrome_proc.terminate()

if __name__ == "__main__":
    run()
