#!/usr/bin/env python3
import time
import json
import urllib.request
import base64
import os
import websocket

ARTIFACT_DIR = "/home/chaitu/.gemini/antigravity-cli/brain/5b5c6e15-453a-4d6b-aa2f-31f266c4a27c"

def main():
    targets = json.loads(urllib.request.urlopen("http://127.0.0.1:9222/json").read().decode('utf-8'))
    app_targets = [t for t in targets if 'localhost:8000' in t.get('url', '') or t.get('type') == 'page']
    target = app_targets[0] if app_targets else targets[0]
    ws_url = target["webSocketDebuggerUrl"]

    ws = websocket.create_connection(ws_url)

    def send_cdp(method, params=None):
        msg_id = int(time.time() * 1000) % 1000000
        payload = {"id": msg_id, "method": method, "params": params or {}}
        ws.send(json.dumps(payload))
        while True:
            resp = json.loads(ws.recv())
            if resp.get("id") == msg_id:
                return resp.get("result", {})

    def capture_section(lesson_num, eval_js, filename):
        send_cdp("Page.navigate", {"url": f"http://localhost:8000/#/lesson/{lesson_num}"})
        time.sleep(2.0)
        # Dismiss any modals
        send_cdp("Runtime.evaluate", {
            "expression": "document.querySelectorAll('.modal-overlay, .modal-backdrop, .student-registration-modal').forEach(el => el.remove());"
        })
        time.sleep(0.3)
        send_cdp("Runtime.evaluate", {"expression": eval_js})
        time.sleep(1.0)
        res = send_cdp("Page.captureScreenshot", {"format": "png"})
        out_path = os.path.join(ARTIFACT_DIR, filename)
        with open(out_path, "wb") as f:
            f.write(base64.b64decode(res["data"]))
        print(f"Captured: {out_path} ({os.path.getsize(out_path)} bytes)")

    # 1. Lesson 15 coordinate axes
    capture_section(
        15,
        "document.querySelector(\"img[src*='rviz_coordinate_axes.svg']\").scrollIntoView({block: 'center'});",
        "verify_l15_axes_clean.png"
    )

    # 2. Lesson 18 SLAM math
    capture_section(
        18,
        "document.querySelector('#2-slam-problem-formulation-front-end-vs-back-end').scrollIntoView({block: 'start'});",
        "verify_l18_slam_math_clean.png"
    )

    # 3. Lesson 19 Costmap inflation math
    capture_section(
        19,
        "document.querySelector('#2-costmap-2d-layered-architecture').scrollIntoView({block: 'start'});",
        "verify_l19_costmap_clean.png"
    )

    # 4. Lesson 20 DWB Score formula
    capture_section(
        20,
        "document.querySelector('#4-key-dwb-critics-tuning-matrix').scrollIntoView({block: 'start'});",
        "verify_l20_dwb_clean.png"
    )

    ws.close()

if __name__ == '__main__':
    main()
