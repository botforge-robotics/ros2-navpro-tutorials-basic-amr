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
    print("Connecting to Chrome target:", target.get('title'), ws_url)

    ws = websocket.create_connection(ws_url)

    def send_cdp(method, params=None):
        msg_id = int(time.time() * 1000) % 1000000
        payload = {"id": msg_id, "method": method, "params": params or {}}
        ws.send(json.dumps(payload))
        while True:
            resp = json.loads(ws.recv())
            if resp.get("id") == msg_id:
                return resp.get("result", {})

    # Ensure student registration modal is dismissed
    send_cdp("Page.navigate", {"url": "http://localhost:8000/#/lesson/15"})
    time.sleep(1.0)
    send_cdp("Runtime.evaluate", {
        "expression": """
        localStorage.setItem('nexus_amr_student_info', JSON.stringify({
            name: 'Robotics Engineer',
            email_roll: 'engineer@nexus.io',
            registered: true
        }));
        localStorage.setItem('navpro_student_info', JSON.stringify({
            name: 'Robotics Engineer',
            email_roll: 'engineer@nexus.io',
            registered: true
        }));
        // Remove any open modal backdrop
        document.querySelectorAll('.modal-overlay, .modal-backdrop, .student-registration-modal').forEach(el => el.remove());
        location.reload();
        """
    })
    time.sleep(1.5)

    def screenshot(filename, selector=None):
        out_path = os.path.join(ARTIFACT_DIR, filename)
        # Dismiss any modals
        send_cdp("Runtime.evaluate", {
            "expression": "document.querySelectorAll('.modal-overlay, .modal-backdrop, .student-registration-modal').forEach(el => el.remove());"
        })
        time.sleep(0.2)
        if selector:
            send_cdp("Runtime.evaluate", {
                "expression": f"document.querySelector('{selector}')?.scrollIntoView({{behavior: 'instant', block: 'center'}});"
            })
            time.sleep(0.6)
        
        res = send_cdp("Page.captureScreenshot", {"format": "png"})
        with open(out_path, "wb") as f:
            f.write(base64.b64decode(res["data"]))
        print(f"Captured: {out_path} ({os.path.getsize(out_path)} bytes)")

    # 1. Lesson 15
    print("\n--- Verifying Lesson 15 ---")
    send_cdp("Page.navigate", {"url": "http://localhost:8000/#/lesson/15"})
    time.sleep(1.5)
    screenshot("audit_l15_coordinate_axes.png", selector="img[src*='rviz_coordinate_axes.svg']")
    screenshot("audit_l15_section6_end.png", selector=".asset-handoff-card")

    # 2. Lesson 16
    print("\n--- Verifying Lesson 16 ---")
    send_cdp("Page.navigate", {"url": "http://localhost:8000/#/lesson/16"})
    time.sleep(1.5)
    screenshot("audit_l16_sim_world_launch.png", selector="#6-creating-the-simulation-bringup-launch-file-simworldlaunchpy")

    # 3. Lesson 17
    print("\n--- Verifying Lesson 17 ---")
    send_cdp("Page.navigate", {"url": "http://localhost:8000/#/lesson/17"})
    time.sleep(1.5)
    screenshot("audit_l17_floor_plan_and_specs.png", selector=".warehouse-specs-grid")

    # 4. Lesson 18
    print("\n--- Verifying Lesson 18 ---")
    send_cdp("Page.navigate", {"url": "http://localhost:8000/#/lesson/18"})
    time.sleep(1.5)
    screenshot("audit_l18_slam_math.png", selector="#2-slam-problem-formulation-front-end-vs-back-end")

    # 5. Lesson 19
    print("\n--- Verifying Lesson 19 ---")
    send_cdp("Page.navigate", {"url": "http://localhost:8000/#/lesson/19"})
    time.sleep(1.5)
    screenshot("audit_l19_costmap_math.png", selector="#2-costmap-2d-layered-architecture")

    # 6. Lesson 20
    print("\n--- Verifying Lesson 20 ---")
    send_cdp("Page.navigate", {"url": "http://localhost:8000/#/lesson/20"})
    time.sleep(1.5)
    screenshot("audit_l20_dwb_critics.png", selector="#4-key-dwb-critics-tuning-matrix")

    # 7. Lesson 22
    print("\n--- Verifying Lesson 22 ---")
    send_cdp("Page.navigate", {"url": "http://localhost:8000/#/lesson/22"})
    time.sleep(1.5)
    screenshot("audit_l22_autonomous_patrol.png", selector="#4-complete-autonomous-patrol-script-walkthrough")

    ws.close()
    print("\nAll verification screenshots captured successfully!")

if __name__ == "__main__":
    main()
