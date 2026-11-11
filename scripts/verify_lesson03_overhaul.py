#!/usr/bin/env python3
import subprocess
import time
import json
import urllib.request
import base64
import os
import websocket

ARTIFACT_DIR = "/home/chaitu/.gemini/antigravity-cli/brain/5b5c6e15-453a-4d6b-aa2f-31f266c4a27c"
PORT = 9348

def verify():
    cmd = [
        "/usr/bin/google-chrome",
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        f"--remote-debugging-port={PORT}",
        "--remote-allow-origins=*",
        "--user-data-dir=/tmp/chrome_verify_l03",
        "--window-size=1440,900"
    ]
    proc = subprocess.Popen(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(2.0)

    try:
        targets = json.loads(urllib.request.urlopen(f"http://127.0.0.1:{PORT}/json").read().decode('utf-8'))
        page_targets = [t for t in targets if t.get("type") == "page"]
        ws_url = page_targets[0]["webSocketDebuggerUrl"] if page_targets else targets[0]["webSocketDebuggerUrl"]
        ws = websocket.create_connection(ws_url, timeout=30)

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

        print("--- Testing Card Mode (1440x900) ---")
        send_cmd("Page.navigate", {"url": "http://127.0.0.1:5173/#/presentation/03?slide=0"})
        time.sleep(3.0)

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
        print(f"Total slides in Lesson 03: {total_slides}")

        results = []
        for s in range(total_slides):
            # Navigate by changing hash
            send_cmd("Runtime.evaluate", {
                "expression": f"window.location.hash = '#/presentation/03?slide={s}';"
            })
            time.sleep(0.8)

            data = send_cmd("Runtime.evaluate", {
                "expression": """
                    (() => {
                        const content = document.querySelector('.ppt-slide-content') || document.querySelector('.interactive-stage-container');
                        const card = document.querySelector('.ppt-presentation-card');
                        const titleEl = document.querySelector('.ppt-title') || document.querySelector('.hero-lesson-title') || document.querySelector('h1, h2, h3');
                        const title = titleEl ? titleEl.innerText.trim() : 'Unknown';
                        const badgeEl = document.querySelector('.ppt-slide-badge');
                        const badge = badgeEl ? badgeEl.innerText.trim() : '';

                        const overflowDiff = content ? (content.scrollHeight - content.clientHeight) : 0;
                        const scrollH = content ? content.scrollHeight : 0;
                        const clientH = content ? content.clientHeight : 0;

                        const imgs = Array.from(document.querySelectorAll('.ppt-slide-content img, .ppt-slide-content svg:not(.lucide)')).map(img => {
                            const rect = img.getBoundingClientRect();
                            return {
                                src: img.getAttribute('src') || img.tagName,
                                w: Math.round(rect.width),
                                h: Math.round(rect.height),
                                naturalW: img.naturalWidth || 0,
                                naturalH: img.naturalHeight || 0
                            };
                        });

                        return {
                            slide: window.location.hash,
                            title,
                            badge,
                            overflowDiff,
                            scrollH,
                            clientH,
                            imgs
                        };
                    })()
                """,
                "returnByValue": True
            })
            res = data.get("result", {}).get("value", {})
            results.append(res)
            print(f"Slide {s:02d}: {res.get('badge')} | {res.get('title')[:40]} | Overflow: {res.get('overflowDiff')}px | Imgs: {len(res.get('imgs', []))}")
            
            # Save screenshots for verification
            img_name = f"l03_overhaul_slide_{s:02d}.png"
            take_screenshot(img_name)

        # Now test Fullscreen Mode
        print("\n--- Testing Fullscreen Mode (1920x1080) ---")
        send_cmd("Emulation.setDeviceMetricsOverride", {
            "width": 1920,
            "height": 1080,
            "deviceScaleFactor": 1,
            "mobile": False
        })
        time.sleep(1.0)

        # Click fullscreen toggle or trigger fullscreen class
        send_cmd("Runtime.evaluate", {
            "expression": """
                (() => {
                    const fsBtn = document.querySelector('.ppt-control-btn[title*="Full"]');
                    if (fsBtn) fsBtn.click();
                    const viewport = document.querySelector('.presentation-viewport');
                    if (viewport && !viewport.classList.contains('is-fullscreen')) {
                        viewport.classList.add('is-fullscreen');
                    }
                })()
            """
        })
        time.sleep(1.0)

        fs_results = []
        for s in [1, 2, 3, 4, 10, 13, 14]:
            if s < total_slides:
                send_cmd("Runtime.evaluate", {
                    "expression": f"window.location.hash = '#/presentation/03?slide={s}';"
                })
                time.sleep(0.8)

                data = send_cmd("Runtime.evaluate", {
                    "expression": """
                        (() => {
                            const content = document.querySelector('.ppt-slide-content');
                            const titleEl = document.querySelector('.ppt-title') || document.querySelector('h1, h2, h3');
                            const title = titleEl ? titleEl.innerText.trim() : 'Unknown';
                            const overflowDiff = content ? (content.scrollHeight - content.clientHeight) : 0;
                            return { title, overflowDiff };
                        })()
                    """,
                    "returnByValue": True
                })
                res = data.get("result", {}).get("value", {})
                fs_results.append(res)
                print(f"FS Slide {s:02d}: {res.get('title')[:40]} | Overflow: {res.get('overflowDiff')}px")
                take_screenshot(f"l03_overhaul_fs_slide_{s:02d}.png")

        ws.close()
        print("\nVerification completed successfully!")
    finally:
        proc.terminate()

if __name__ == "__main__":
    verify()
