#!/usr/bin/env python3
import subprocess
import time
import json
import urllib.request
import base64
import os
import websocket

ARTIFACT_DIR = "/home/chaitu/.gemini/antigravity-cli/brain/5b5c6e15-453a-4d6b-aa2f-31f266c4a27c"
PORT = 9334

def run():
    cmd = [
        "/usr/bin/google-chrome",
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        f"--remote-debugging-port={PORT}",
        "--remote-allow-origins=*",
        "--user-data-dir=/tmp/chrome_ppt_test2",
        "--window-size=1440,900"
    ]
    proc = subprocess.Popen(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(2.0)

    try:
        targets = json.loads(urllib.request.urlopen(f"http://127.0.0.1:{PORT}/json").read().decode('utf-8'))
        page_targets = [t for t in targets if t.get("type") == "page"]
        ws_url = page_targets[0]["webSocketDebuggerUrl"] if page_targets else targets[0]["webSocketDebuggerUrl"]
        print("Connected to Chrome CDP:", ws_url)
        ws = websocket.create_connection(ws_url, timeout=10)

        msg_counter = 1

        def send_cmd(method, params=None):
            nonlocal msg_counter
            msg_counter += 1
            cid = msg_counter
            ws.send(json.dumps({"id": cid, "method": method, "params": params or {}}))
            while True:
                resp = json.loads(ws.recv())
                if resp.get("id") == cid:
                    return resp.get("result", {})

        def take_screenshot(name, clip=None):
            params = {"format": "png"}
            if clip:
                params["clip"] = clip
                params["captureBeyondViewport"] = False
            res = send_cmd("Page.captureScreenshot", params)
            img_data = base64.b64decode(res["data"])
            path = os.path.join(ARTIFACT_DIR, name)
            with open(path, "wb") as f:
                f.write(img_data)
            print("Saved screenshot:", name)
            return path

        send_cmd("Page.enable")

        # 1. Check Navbar on LMS Hub
        print("1. Loading LMS Hub...")
        send_cmd("Page.navigate", {"url": "http://127.0.0.1:5173/"})
        time.sleep(2.5)
        take_screenshot("navbar_ppt_button_hub_light.png", clip={"x": 0, "y": 0, "width": 1440, "height": 180, "scale": 1})

        # 2. Check Presentation Deck - Lesson 01 Cover
        print("2. Loading Presentation Deck Lesson 01...")
        send_cmd("Page.navigate", {"url": "http://127.0.0.1:5173/#/presentation/01?slide=0"})
        time.sleep(2.0)
        take_screenshot("ppt_lesson01_title_light.png")

        # 3. Direct navigate to Slide 9 (which is #10: mkdir / mkdir -p)
        print("3. Navigating directly to mkdir slide (slide=9)...")
        send_cmd("Page.navigate", {"url": "http://127.0.0.1:5173/#/presentation/01?slide=9"})
        time.sleep(1.8)
        take_screenshot("ppt_lesson01_mkdir_slide_light.png")

        # 4. Toggle dark mode on mkdir slide
        print("4. Toggling Dark Mode...")
        send_cmd("Runtime.evaluate", {
            "expression": "document.querySelector('button[title*=\"Dark\"]').click()"
        })
        time.sleep(0.8)
        take_screenshot("ppt_lesson01_mkdir_slide_dark.png")

        # 5. Navigate to Slide 33 (which is Quiz 1) and click reveal answer
        print("5. Navigating to Quiz slide (slide=33)...")
        send_cmd("Page.navigate", {"url": "http://127.0.0.1:5173/#/presentation/01?slide=33"})
        time.sleep(1.8)
        send_cmd("Runtime.evaluate", {
            "expression": "document.querySelector('.reveal-answer-btn').click()"
        })
        time.sleep(0.8)
        take_screenshot("ppt_quiz_reveal_answer_dark.png")

        # 6. Test Lesson 07 Launch file code step slide
        print("6. Testing Lesson 07 Launch file code step slide...")
        send_cmd("Page.navigate", {"url": "http://127.0.0.1:5173/#/presentation/07?slide=4"})
        time.sleep(2.0)
        take_screenshot("ppt_lesson07_launch_codestep_dark.png")

        print("SUCCESS: All verification screenshots successfully updated!")
        ws.close()

    finally:
        proc.terminate()

if __name__ == "__main__":
    run()
