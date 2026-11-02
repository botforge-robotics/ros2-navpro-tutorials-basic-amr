#!/usr/bin/env python3
import subprocess
import time
import json
import urllib.request
import base64
import os
import websocket

ARTIFACT_DIR = "/home/chaitu/.gemini/antigravity-cli/brain/5b5c6e15-453a-4d6b-aa2f-31f266c4a27c"
PORT = 9335

def run():
    cmd = [
        "/usr/bin/google-chrome",
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        f"--remote-debugging-port={PORT}",
        "--remote-allow-origins=*",
        "--user-data-dir=/tmp/chrome_ppt_test3",
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

        # 1. Lesson 01 Refined Launchpad (Slide 1) - Light Mode
        print("1. Loading Refined Lesson 01 Launchpad...")
        send_cmd("Page.navigate", {"url": "http://127.0.0.1:5173/#/presentation/01?slide=0"})
        time.sleep(2.0)
        take_screenshot("ppt_lesson01_launchpad_unified_light.png")

        # 2. Refined Launchpad in Dark Mode
        print("2. Toggling Dark Mode...")
        send_cmd("Runtime.evaluate", {
            "expression": "document.querySelector('button[title*=\"Dark\"]').click()"
        })
        time.sleep(0.8)
        take_screenshot("ppt_lesson01_launchpad_unified_dark.png")

        # 3. Grid Overview Modal showing the clean, non-redundant slides
        print("3. Opening Refined Grid Overview Modal...")
        send_cmd("Runtime.evaluate", {
            "expression": "document.querySelector('button[title*=\"Slide Grid\"]').click()"
        })
        time.sleep(0.8)
        take_screenshot("ppt_grid_modal_overview_refined.png")

        # Close grid
        send_cmd("Runtime.evaluate", {
            "expression": "document.querySelector('.grid-modal-close-btn').click()"
        })
        time.sleep(0.5)

        # 4. Slide 1 (which is now Key Directory Guide - substantive concept table)
        print("4. Navigating to Slide 1 (Key Directory Guide)...")
        send_cmd("Page.navigate", {"url": "http://127.0.0.1:5173/#/presentation/01?slide=1"})
        time.sleep(1.5)
        take_screenshot("ppt_lesson01_directory_guide_dark.png")

        # 5. Slide 5 (mkdir command slide)
        print("5. Navigating to mkdir command slide...")
        send_cmd("Page.navigate", {"url": "http://127.0.0.1:5173/#/presentation/01?slide=5"})
        time.sleep(1.5)
        take_screenshot("ppt_lesson01_mkdir_clean_dark.png")

        # 6. Hands-on Challenge Lab slide
        print("6. Navigating to Challenge Lab slide...")
        send_cmd("Runtime.evaluate", {
            "expression": """
                (() => {
                    const dots = document.querySelectorAll('.ppt-dot');
                    for (let i = 0; i < dots.length; i++) {
                        if (dots[i].title && (dots[i].title.includes('Challenge') || dots[i].title.includes('Lab'))) {
                            dots[i].click();
                            return true;
                        }
                    }
                    return false;
                })()
            """
        })
        time.sleep(1.5)
        take_screenshot("ppt_lesson01_challenge_lab_dark.png")

        print("SUCCESS: Refined presentation screenshots captured!")
        ws.close()

    finally:
        proc.terminate()

if __name__ == "__main__":
    run()
