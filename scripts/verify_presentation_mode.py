#!/usr/bin/env python3
import subprocess
import time
import json
import urllib.request
import base64
import os
import websocket

ARTIFACT_DIR = "/home/chaitu/.gemini/antigravity-cli/brain/5b5c6e15-453a-4d6b-aa2f-31f266c4a27c"

def capture_screenshot(ws, filename, clip=None):
    params = {"format": "png"}
    if clip:
        params["clip"] = clip
        params["captureBeyondViewport"] = False

    msg_id = int(time.time() * 1000) % 1000000
    req = {
        "id": msg_id,
        "method": "Page.captureScreenshot",
        "params": params
    }
    ws.send(json.dumps(req))
    
    while True:
        resp = json.loads(ws.recv())
        if resp.get("id") == msg_id:
            data = resp["result"]["data"]
            path = os.path.join(ARTIFACT_DIR, filename)
            with open(path, "wb") as f:
                f.write(base64.b64decode(data))
            print(f"Captured: {path}")
            return path

def send_cdp(ws, method, params=None):
    msg_id = int(time.time() * 1000) % 1000000
    req = {"id": msg_id, "method": method, "params": params or {}}
    ws.send(json.dumps(req))
    while True:
        resp = json.loads(ws.recv())
        if resp.get("id") == msg_id:
            return resp.get("result")

def run():
    chrome_proc = subprocess.Popen([
        "/usr/bin/google-chrome",
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        "--remote-debugging-port=9222",
        "--remote-allow-origins=*",
        "--window-size=1440,900"
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    time.sleep(1.5)

    try:
        targets = json.loads(urllib.request.urlopen("http://127.0.0.1:9222/json").read().decode('utf-8'))
        ws_url = targets[0]["webSocketDebuggerUrl"]
        print("Connected to Chrome:", ws_url)
        ws = websocket.create_connection(ws_url)

        # 1. Main LMS Hub with PPT button in Navbar (Light Mode)
        send_cdp(ws, "Page.navigate", {"url": "http://127.0.0.1:5173/"})
        time.sleep(2.0)
        capture_screenshot(ws, "navbar_ppt_button_hub_light.png", clip={"x": 0, "y": 0, "width": 1440, "height": 180, "scale": 1})

        # 2. Presentation Deck - Lesson 01 Cover Slide (Light Mode)
        send_cdp(ws, "Page.navigate", {"url": "http://127.0.0.1:5173/#/presentation/01?slide=0"})
        time.sleep(1.5)
        capture_screenshot(ws, "ppt_lesson01_title_light.png")

        # 3. Presentation Deck - Lesson 01 mkdir slide
        # Find which slide is mkdir
        res = send_cdp(ws, "Runtime.evaluate", {
            "expression": """
                (() => {
                    const dots = document.querySelectorAll('.ppt-dot');
                    // Find dot for mkdir
                    for (let i = 0; i < dots.length; i++) {
                        if (dots[i].title && dots[i].title.includes('mkdir')) {
                            dots[i].click();
                            return { found: true, index: i, title: dots[i].title };
                        }
                    }
                    return { found: false };
                })()
            """,
            "returnByValue": True
        })
        print("mkdir search result:", res)
        time.sleep(1.0)
        capture_screenshot(ws, "ppt_lesson01_mkdir_slide_light.png")

        # 4. Same mkdir slide in Dark Mode
        send_cdp(ws, "Runtime.evaluate", {
            "expression": "document.querySelector('button[title*=\"Dark\"]').click()"
        })
        time.sleep(0.5)
        capture_screenshot(ws, "ppt_lesson01_mkdir_slide_dark.png")

        # 5. Presentation Deck - Grid Overview Modal
        send_cdp(ws, "Runtime.evaluate", {
            "expression": "document.querySelector('button[title*=\"Slide Grid\"]').click()"
        })
        time.sleep(0.5)
        capture_screenshot(ws, "ppt_grid_modal_overview_dark.png")

        # Close grid modal
        send_cdp(ws, "Runtime.evaluate", {
            "expression": "document.querySelector('.grid-modal-close-btn').click()"
        })
        time.sleep(0.5)

        # 6. Presentation Deck - Quiz Question with Answer Reveal (Lesson 01)
        send_cdp(ws, "Runtime.evaluate", {
            "expression": """
                (() => {
                    const dots = document.querySelectorAll('.ppt-dot');
                    for (let i = 0; i < dots.length; i++) {
                        if (dots[i].classList.contains('type-quiz')) {
                            dots[i].click();
                            return { found: true, index: i };
                        }
                    }
                    return { found: false };
                })()
            """,
            "returnByValue": True
        })
        time.sleep(0.8)
        # Click reveal answer
        send_cdp(ws, "Runtime.evaluate", {
            "expression": "document.querySelector('.reveal-answer-btn').click()"
        })
        time.sleep(0.5)
        capture_screenshot(ws, "ppt_quiz_reveal_answer_dark.png")

        # 7. Presentation Deck - Lesson 05 PubSubFlow Live Interactive Demo Slide
        send_cdp(ws, "Page.navigate", {"url": "http://127.0.0.1:5173/#/presentation/05"})
        time.sleep(1.5)
        send_cdp(ws, "Runtime.evaluate", {
            "expression": """
                (() => {
                    const dots = document.querySelectorAll('.ppt-dot');
                    for (let i = 0; i < dots.length; i++) {
                        if (dots[i].classList.contains('type-interactive')) {
                            dots[i].click();
                            return { found: true, index: i, title: dots[i].title };
                        }
                    }
                    return { found: false };
                })()
            """,
            "returnByValue": True
        })
        time.sleep(1.0)
        capture_screenshot(ws, "ppt_lesson05_pubsub_interactive_dark.png")

        print("All verification screenshots successfully captured!")
        ws.close()

    finally:
        chrome_proc.terminate()

if __name__ == "__main__":
    run()
