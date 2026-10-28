import time
import json
import urllib.request
import base64
import os
import websocket

ARTIFACT_DIR = "/home/chaitu/.gemini/antigravity-cli/brain/5b5c6e15-453a-4d6b-aa2f-31f266c4a27c"

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

def capture_note(lesson_num, search_text, filename):
    # Navigate and reload
    send_cdp("Page.navigate", {"url": f"http://localhost:8000/#/lesson/{lesson_num}"})
    time.sleep(1.5)
    send_cdp("Page.reload", {"ignoreCache": True})
    time.sleep(2.0)
    
    # Dismiss modals
    send_cdp("Runtime.evaluate", {
        "expression": "document.querySelectorAll('.modal-overlay, .modal-backdrop, .student-registration-modal').forEach(el => el.remove());"
    })
    time.sleep(0.3)
    
    # Scroll to element containing text
    find_and_scroll_js = f"""
    (function() {{
        const allAlerts = Array.from(document.querySelectorAll('.alert-callout, .alert'));
        const target = allAlerts.find(el => el.textContent.includes('{search_text}'));
        if (target) {{
            target.scrollIntoView({{ behavior: 'instant', block: 'center' }});
            return true;
        }}
        return false;
    }})();
    """
    res = send_cdp("Runtime.evaluate", {"expression": find_and_scroll_js})
    found = res.get("result", {}).get("value", False)
    time.sleep(1.0)
    
    shot = send_cdp("Page.captureScreenshot", {"format": "png"})
    out_path = os.path.join(ARTIFACT_DIR, filename)
    with open(out_path, "wb") as f:
        f.write(base64.b64decode(shot.get("data", "")))
    print(f"[{lesson_num}] Found: {found} -> Saved: {filename}")

# 1. Lesson 05 Publisher Note
capture_note("05", "Discovering & Inspecting Message Interfaces", "verify_l05_pub_sonar_note.png")

# 2. Lesson 05 Subscriber Note
capture_note("05", "Inspecting Topic & Interface Schema", "verify_l05_sub_sonar_note.png")

# 3. Lesson 07 Service Note
capture_note("07", "Discovering & Inspecting Service Interfaces", "verify_l07_srv_note.png")

# 4. Lesson 10 Action Note
capture_note("10", "Discovering & Inspecting Action Interfaces", "verify_l10_action_note.png")

ws.close()
