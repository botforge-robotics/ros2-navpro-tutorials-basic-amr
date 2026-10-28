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

    def capture_section(lesson_num, scroll_target_id, filename):
        send_cdp("Page.navigate", {"url": f"http://localhost:8000/#/lesson/{lesson_num}"})
        time.sleep(2.0)
        # Dismiss any modals
        send_cdp("Runtime.evaluate", {
            "expression": "document.querySelectorAll('.modal-overlay, .modal-backdrop, .student-registration-modal').forEach(el => el.remove());"
        })
        time.sleep(0.5)
        # Scroll element into view
        scroll_js = f"""
        (function() {{
            const el = document.getElementById('{scroll_target_id}');
            if (el) {{
                el.scrollIntoView({{ behavior: 'instant', block: 'start' }});
                window.scrollBy(0, -60);
                return true;
            }}
            return false;
        }})();
        """
        send_cdp("Runtime.evaluate", {"expression": scroll_js})
        time.sleep(1.2)
        res = send_cdp("Page.captureScreenshot", {"format": "png"})
        out_path = os.path.join(ARTIFACT_DIR, filename)
        with open(out_path, "wb") as f:
            f.write(base64.b64decode(res.get("data", "")))
        print(f"Captured {filename} -> {out_path}")

    # 1. Lesson 05 Section 3 Publisher
    capture_section("05", "3-writing-the-ultrasonic-sensor-publisher-node", "verify_l05_sec3_publisher_range.png")
    
    # 2. Lesson 05 Section 5 Subscriber
    capture_section("05", "5-writing-the-subscriber-node", "verify_l05_sec5_subscriber_range.png")
    
    # 3. Lesson 07 Section 3 Service Server
    capture_section("07", "3-building-the-emergency-stop-safety-service-server", "verify_l07_sec3_service_note.png")
    
    # 4. Lesson 10 Section 3 Action Server
    capture_section("10", "3-building-the-linear-traversal-action-server", "verify_l10_sec3_action_note.png")

    ws.close()

if __name__ == '__main__':
    main()
