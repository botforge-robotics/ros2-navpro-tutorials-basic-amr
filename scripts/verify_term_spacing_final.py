#!/usr/bin/env python3
import subprocess
import time
import json
import urllib.request
import base64
import os
import websocket

ARTIFACT_DIR = "/home/chaitu/.gemini/antigravity-cli/brain/5b5c6e15-453a-4d6b-aa2f-31f266c4a27c"
PORT = 9345

def run():
    cmd = [
        "/usr/bin/google-chrome",
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        f"--remote-debugging-port={PORT}",
        "--remote-allow-origins=*",
        "--user-data-dir=/tmp/chrome_verify_final",
        "--window-size=1440,900"
    ]
    proc = subprocess.Popen(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(2.0)

    try:
        targets = json.loads(urllib.request.urlopen(f"http://127.0.0.1:{PORT}/json").read().decode('utf-8'))
        page_targets = [t for t in targets if t.get("type") == "page"]
        ws_url = page_targets[0]["webSocketDebuggerUrl"] if page_targets else targets[0]["webSocketDebuggerUrl"]
        ws = websocket.create_connection(ws_url, timeout=15)

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

        def take_screenshot(name):
            res = send_cmd("Page.captureScreenshot", {"format": "png", "captureBeyondViewport": False})
            img_data = base64.b64decode(res["data"])
            path = os.path.join(ARTIFACT_DIR, name)
            with open(path, "wb") as f:
                f.write(img_data)
            print("Saved screenshot:", name)
            return path

        send_cmd("Page.enable")

        # Test on production build at port 8000
        print("1. Loading Slide 23 on Production Build (http://127.0.0.1:8000/#/presentation/01?slide=22)...")
        send_cmd("Page.navigate", {"url": "http://127.0.0.1:8000/#/presentation/01?slide=22"})
        time.sleep(2.5)

        take_screenshot("ppt_verified_l01_merged_terminator_light.png")

        # Check metrics
        light_metrics = send_cmd("Runtime.evaluate", {
            "expression": """
                (() => {
                    const content = document.querySelector('.ppt-slide-content');
                    const leftCol = document.querySelector('.term-left-col');
                    const rightCol = document.querySelector('.term-right-col');
                    const img = document.querySelector('.term-graphic-frame img, .term-left-col img');
                    const table = document.querySelector('.term-right-col table');
                    return {
                        overflowDiff: content ? content.scrollHeight - content.offsetHeight : 0,
                        leftColH: leftCol ? leftCol.offsetHeight : 0,
                        rightColH: rightCol ? rightCol.offsetHeight : 0,
                        imgH: img ? img.offsetHeight : 0,
                        tableH: table ? table.offsetHeight : 0
                    };
                })()
            """,
            "returnByValue": True
        })
        print("LIGHT METRICS:", json.dumps(light_metrics.get("result", {}).get("value"), indent=2))

        # Toggle Dark Mode
        print("2. Toggling Dark Mode...")
        send_cmd("Runtime.evaluate", {
            "expression": "document.querySelector('button[title*=\"Dark\"]').click()"
        })
        time.sleep(0.8)
        take_screenshot("ppt_verified_l01_merged_terminator_dark.png")
        # Also save as ppt_verified_l01_merged_terminator.png to update previous artifact
        take_screenshot("ppt_verified_l01_merged_terminator.png")

        # Switch to 1920x1080 Fullscreen
        print("3. Testing Fullscreen Mode (1920x1080)...")
        send_cmd("Emulation.setDeviceMetricsOverride", {
            "width": 1920,
            "height": 1080,
            "deviceScaleFactor": 1,
            "mobile": False
        })
        send_cmd("Runtime.evaluate", {
            "expression": """
                (() => {
                    const vp = document.querySelector('.presentation-viewport');
                    if (vp) vp.classList.add('is-fullscreen');
                })()
            """
        })
        time.sleep(1.0)
        take_screenshot("ppt_verified_l01_merged_terminator_fs.png")

        fs_metrics = send_cmd("Runtime.evaluate", {
            "expression": """
                (() => {
                    const content = document.querySelector('.ppt-slide-content');
                    return {
                        fsOverflowDiff: content ? content.scrollHeight - content.offsetHeight : 0
                    };
                })()
            """,
            "returnByValue": True
        })
        print("FULLSCREEN METRICS:", json.dumps(fs_metrics.get("result", {}).get("value"), indent=2))

        ws.close()
    finally:
        proc.terminate()

if __name__ == "__main__":
    run()
