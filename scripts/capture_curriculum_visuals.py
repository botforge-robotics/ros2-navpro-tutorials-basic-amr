#!/usr/bin/env python3
import subprocess
import time
import json
import urllib.request
import base64
import os

ARTIFACT_DIR = "/home/chaitu/.gemini/antigravity-cli/brain/5b5c6e15-453a-4d6b-aa2f-31f266c4a27c"

def capture():
    print("Launching Headless Chrome...")
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

        def capture_page(lesson_hash, scroll_selector, out_filename):
            print(f"Navigating to {lesson_hash}...")
            send_cdp("Page.navigate", {"url": f"http://localhost:8000/#{lesson_hash}"})
            time.sleep(1.2)
            # Dismiss modal via localStorage
            send_cdp("Runtime.evaluate", {
                "expression": "localStorage.setItem('navpro_student_info', JSON.stringify({name: 'Alex Rivera', email: 'alex@navpro.io'})); location.reload();"
            })
            time.sleep(1.5)
            if scroll_selector:
                send_cdp("Runtime.evaluate", {
                    "expression": f"const el = document.querySelector('{scroll_selector}'); if(el) el.scrollIntoView({{block: 'center'}});"
                })
                time.sleep(0.6)

            ss = send_cdp("Page.captureScreenshot", {"format": "png"})
            img_bytes = base64.b64decode(ss["data"])
            out_path = os.path.join(ARTIFACT_DIR, out_filename)
            with open(out_path, "wb") as f:
                f.write(img_bytes)
            print(f"Captured: {out_path}")

        # 1. Lesson 05: Ultrasonic Pub/Sub & Interactive Diagram
        capture_page("/lesson/05", ".pubsub-flow-container", "l05_robotics_pubsub_visual.png")

        # 2. Lesson 14: Interactive Inertia Calculator
        capture_page("/lesson/14", ".inertia-calculator-card", "l14_inertia_calculator_visual.png")

        # 3. Lesson 15: Spatial Conventions (X Forward Towards Screen)
        capture_page("/lesson/15", "img[src*='rviz_coordinate_axes']", "l15_spatial_tf_axes_visual.png")

        # 4. Lesson 17: Warehouse CAD Floor Plan
        capture_page("/lesson/17", "img[src*='warehouse_floor_plan']", "l17_warehouse_floorplan_visual.png")

        ws.close()
    finally:
        chrome_proc.terminate()
        print("Chrome terminated.")

if __name__ == "__main__":
    capture()
