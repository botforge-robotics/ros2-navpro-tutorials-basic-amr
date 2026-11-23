#!/usr/bin/env python3
import subprocess
import time
import json
import urllib.request
import base64
import os
import websocket
import sys

ARTIFACT_DIR = "/home/chaitu/.gemini/antigravity-cli/brain/5b5c6e15-453a-4d6b-aa2f-31f266c4a27c"
PORT = 9366

VIEWPORTS = [
    {"name": "1440x900", "w": 1440, "h": 900},
    {"name": "1920x1080_FS", "w": 1920, "h": 1080},
    {"name": "1366x768", "w": 1366, "h": 768},
    {"name": "1280x800", "w": 1280, "h": 800}
]

def run():
    cmd = [
        "/usr/bin/google-chrome",
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        f"--remote-debugging-port={PORT}",
        "--remote-allow-origins=*",
        "--user-data-dir=/tmp/chrome_audit_l14_l15",
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
            return path

        send_cmd("Page.enable")

        lessons_to_test = [("14", "Lesson 14"), ("15", "Lesson 15")]

        for lesson_num, lesson_label in lessons_to_test:
            print(f"\n=======================================================")
            print(f"               AUDITING {lesson_label}")
            print(f"=======================================================")

            # Navigate to lesson
            send_cmd("Page.navigate", {"url": f"http://127.0.0.1:5173/#/presentation/{lesson_num}?slide=0"})
            time.sleep(2.5)

            total_slides_res = send_cmd("Runtime.evaluate", {
                "expression": """
                    (() => {
                        const totalNumEl = document.querySelector('.slide-total-num');
                        return totalNumEl ? parseInt(totalNumEl.innerText, 10) : 0;
                    })()
                """,
                "returnByValue": True
            })
            total_slides = total_slides_res.get("result", {}).get("value", 0)
            print(f"Total slides in {lesson_label}: {total_slides}")

            all_passed = True
            overflow_issues = []

            for vp in VIEWPORTS:
                send_cmd("Emulation.setDeviceMetricsOverride", {
                    "width": vp["w"],
                    "height": vp["h"],
                    "deviceScaleFactor": 1,
                    "mobile": False
                })
                time.sleep(0.4)
                print(f"\n--- Checking Viewport {vp['name']} ({vp['w']}x{vp['h']}) ---")

                for s in range(total_slides):
                    send_cmd("Page.navigate", {"url": f"http://127.0.0.1:5173/#/presentation/{lesson_num}?slide={s}"})
                    time.sleep(0.6)

                    report = send_cmd("Runtime.evaluate", {
                        "expression": """
                            (() => {
                                const content = document.querySelector('.ppt-slide-content');
                                const titleEl = document.querySelector('.ppt-title') || document.querySelector('h1, h2, h3');
                                const title = titleEl ? titleEl.innerText.trim() : 'Unknown';
                                const badgeEl = document.querySelector('.ppt-slide-badge');
                                const badge = badgeEl ? badgeEl.innerText.trim() : '';

                                const overflowDiff = content ? (content.scrollHeight - content.clientHeight) : 0;
                                const scrollH = content ? content.scrollHeight : 0;
                                const clientH = content ? content.clientHeight : 0;
                                const preScroll = (overflowDiff > 1);

                                return {
                                    title,
                                    badge,
                                    scrollH,
                                    clientH,
                                    overflowDiff,
                                    preScroll
                                };
                            })()
                        """,
                        "returnByValue": True
                    })
                    r = report.get("result", {}).get("value", {})
                    diff = r.get("overflowDiff", 0)
                    pre_scroll = r.get("preScroll", False)
                    title = r.get("title", f"Slide {s+1}")

                    if diff > 1:
                        all_passed = False
                        overflow_issues.append((vp["name"], s+1, title, diff))
                        print(f"  [Slide {s+1:02d}] OVERFLOW (diff={diff}px) - {title[:40]}")
                    else:
                        if s % 3 == 0 or s == total_slides - 1:
                            print(f"  [Slide {s+1:02d}] OK (diff={diff}px) - {title[:40]}")

                    if vp["name"] == "1440x900":
                        snap_name = f"l{lesson_num}_slide_{s+1:02d}_1440x900.png"
                        take_screenshot(snap_name)

            print(f"\n=== Summary for {lesson_label} ===")
            if all_passed:
                print(f" ALL SLIDES IN {lesson_label} PASSED (diff <= 1px across all 4 viewports)!")
            else:
                print(f" {len(overflow_issues)} overflow issues in {lesson_label}:")
                for vp_name, s_num, stitle, diff in overflow_issues:
                    print(f"   - {vp_name} | Slide {s_num:02d} ({stitle}): {diff}px overflow")

    finally:
        proc.kill()

if __name__ == "__main__":
    run()
