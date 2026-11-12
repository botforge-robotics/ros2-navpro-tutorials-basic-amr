#!/usr/bin/env python3
import subprocess
import time
import json
import urllib.request
import base64
import os
import websocket

ARTIFACT_DIR = "/home/chaitu/.gemini/antigravity-cli/brain/5b5c6e15-453a-4d6b-aa2f-31f266c4a27c"
PORT = 9382

def verify():
    # Clean previous temp directory if exists
    subprocess.run(["rm", "-rf", "/tmp/chrome_verify_l05"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    
    cmd = [
        "/usr/bin/google-chrome",
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        f"--remote-debugging-port={PORT}",
        "--remote-allow-origins=*",
        "--user-data-dir=/tmp/chrome_verify_l05",
        "--window-size=1440,900"
    ]
    proc = subprocess.Popen(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(2.5)

    try:
        targets = json.loads(urllib.request.urlopen(f"http://127.0.0.1:{PORT}/json").read().decode('utf-8'))
        page_targets = [t for t in targets if t.get("type") == "page"]
        ws_url = page_targets[0]["webSocketDebuggerUrl"] if page_targets else targets[0]["webSocketDebuggerUrl"]
        ws = websocket.create_connection(ws_url, timeout=30)

        msg_counter = [1]
        def send_cmd(method, params=None):
            msg_counter[0] += 1
            cid = msg_counter[0]
            ws.send(json.dumps({"id": cid, "method": method, "params": params or {}}))
            while True:
                resp = json.loads(ws.recv())
                if resp.get("id") == cid:
                    return resp.get("result", {})

        def take_screenshot(filename):
            res = send_cmd("Page.captureScreenshot", {"format": "png"})
            data = res.get("data")
            if data:
                path = os.path.join(ARTIFACT_DIR, filename)
                with open(path, "wb") as f:
                    f.write(base64.b64decode(data))
                return path
            return None

        send_cmd("Page.enable")

        print("--- Testing Lesson 05 Card Mode (1440x900) ---")
        send_cmd("Page.navigate", {"url": "http://127.0.0.1:5173/#/presentation/05?slide=0"})
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
        print(f"Total slides in Lesson 05: {total_slides}")

        results = []
        for s in range(total_slides):
            send_cmd("Runtime.evaluate", {
                "expression": f"window.location.hash = '#/presentation/05?slide={s}';"
            })
            time.sleep(0.6)

            data = send_cmd("Runtime.evaluate", {
                "expression": """
                    (() => {
                        const content = document.querySelector('.ppt-slide-content') || document.querySelector('.interactive-stage-container');
                        const body = document.querySelector('.concept-html-body');
                        const titleEl = document.querySelector('.ppt-title') || document.querySelector('.hero-lesson-title') || document.querySelector('h1, h2, h3');
                        const title = titleEl ? titleEl.innerText.trim() : 'Unknown';
                        const badgeEl = document.querySelector('.ppt-slide-badge');
                        const badge = badgeEl ? badgeEl.innerText.trim() : '';

                        const contentDiff = content ? Math.max(0, content.scrollHeight - content.clientHeight) : 0;
                        const bodyDiff = body ? Math.max(0, body.scrollHeight - body.clientHeight) : 0;
                        const overflowDiff = Math.max(contentDiff, bodyDiff);

                        return {
                            slide: window.location.hash,
                            title,
                            badge,
                            overflowDiff,
                            scrollH: body ? body.scrollHeight : (content ? content.scrollHeight : 0),
                            clientH: body ? body.clientHeight : (content ? content.clientHeight : 0)
                        };
                    })()
                """,
                "returnByValue": True
            })
            res = data.get("result", {}).get("value", {})
            results.append(res)
            print(f"Slide {s:02d}: [{res.get('badge')}] {res.get('title')[:45]} | Overflow: {res.get('overflowDiff')}px (scroll: {res.get('scrollH')}px, client: {res.get('clientH')}px)")
            
            img_name = f"l05_overhaul_card_slide_{s:02d}.png"
            take_screenshot(img_name)

            if s == 1:  # Pub/Sub interactive slide (merged Slide 2 & 3)
                ps_data = send_cmd("Runtime.evaluate", {
                    "expression": """
                        (() => {
                            const container = document.querySelector('.pubsub-flow-container');
                            const controls = document.querySelector('.pubsub-controls-bar');
                            const stage = document.querySelector('.interactive-stage-container');
                            if (!container || !controls || !stage) return null;
                            const cR = container.getBoundingClientRect();
                            const ctrlR = controls.getBoundingClientRect();
                            const sR = stage.getBoundingClientRect();
                            return {
                                containerHeight: cR.height,
                                controlsBottom: ctrlR.bottom,
                                containerBottom: cR.bottom,
                                stageBottom: sR.bottom,
                                isClippedByContainer: ctrlR.bottom > cR.bottom + 1,
                                isClippedByStage: ctrlR.bottom > sR.bottom + 1
                            };
                        })()
                    """,
                    "returnByValue": True
                }).get("result", {}).get("value", {})
                print(f"  >>> Pub/Sub Flow Geometry (Card): {json.dumps(ps_data)}")

            if s == 9:  # Multi-Topic Architecture slide with block diagram
                mt_data = send_cmd("Runtime.evaluate", {
                    "expression": """
                        (() => {
                            const img = document.querySelector('.l05-hero-svg');
                            return {
                                hasImage: !!img,
                                src: img ? img.getAttribute('src') : null,
                                naturalWidth: img ? img.naturalWidth : null,
                                naturalHeight: img ? img.naturalHeight : null,
                                clientHeight: img ? img.clientHeight : null
                            };
                        })()
                    """,
                    "returnByValue": True
                }).get("result", {}).get("value", {})
                print(f"  >>> Multi-Topic Diagram Geometry (Card): {json.dumps(mt_data)}")

        # Fullscreen Mode
        print("\n--- Testing Lesson 05 Fullscreen Mode (1920x1080) ---")
        send_cmd("Emulation.setDeviceMetricsOverride", {
            "width": 1920,
            "height": 1080,
            "deviceScaleFactor": 1,
            "mobile": False
        })
        time.sleep(1.0)

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
        for s in range(total_slides):
            send_cmd("Runtime.evaluate", {
                "expression": f"window.location.hash = '#/presentation/05?slide={s}';"
            })
            time.sleep(0.5)

            data = send_cmd("Runtime.evaluate", {
                "expression": """
                    (() => {
                        const content = document.querySelector('.ppt-slide-content') || document.querySelector('.interactive-stage-container');
                        const body = document.querySelector('.concept-html-body');
                        const titleEl = document.querySelector('.ppt-title') || document.querySelector('.hero-lesson-title') || document.querySelector('h1, h2, h3');
                        const title = titleEl ? titleEl.innerText.trim() : 'Unknown';
                        const badgeEl = document.querySelector('.ppt-slide-badge');
                        const badge = badgeEl ? badgeEl.innerText.trim() : '';

                        const contentDiff = content ? Math.max(0, content.scrollHeight - content.clientHeight) : 0;
                        const bodyDiff = body ? Math.max(0, body.scrollHeight - body.clientHeight) : 0;
                        const overflowDiff = Math.max(contentDiff, bodyDiff);

                        return {
                            slide: window.location.hash,
                            title,
                            badge,
                            overflowDiff,
                            scrollH: body ? body.scrollHeight : (content ? content.scrollHeight : 0),
                            clientH: body ? body.clientHeight : (content ? content.clientHeight : 0)
                        };
                    })()
                """,
                "returnByValue": True
            })
            res = data.get("result", {}).get("value", {})
            fs_results.append(res)
            print(f"FS Slide {s:02d}: [{res.get('badge')}] {res.get('title')[:45]} | Overflow: {res.get('overflowDiff')}px")
            
            img_name = f"l05_overhaul_fs_slide_{s:02d}.png"
            take_screenshot(img_name)

            if s == 1:  # Pub/Sub interactive slide (merged Slide 2 & 3)
                ps_data = send_cmd("Runtime.evaluate", {
                    "expression": """
                        (() => {
                            const container = document.querySelector('.pubsub-flow-container');
                            const controls = document.querySelector('.pubsub-controls-bar');
                            const stage = document.querySelector('.interactive-stage-container');
                            if (!container || !controls || !stage) return null;
                            const cR = container.getBoundingClientRect();
                            const ctrlR = controls.getBoundingClientRect();
                            const sR = stage.getBoundingClientRect();
                            return {
                                containerHeight: cR.height,
                                controlsBottom: ctrlR.bottom,
                                containerBottom: cR.bottom,
                                stageBottom: sR.bottom,
                                isClippedByContainer: ctrlR.bottom > cR.bottom + 1,
                                isClippedByStage: ctrlR.bottom > sR.bottom + 1
                            };
                        })()
                    """,
                    "returnByValue": True
                }).get("result", {}).get("value", {})
                print(f"  >>> Pub/Sub Flow Geometry (FS): {json.dumps(ps_data)}")

            if s == 9:  # Multi-Topic Architecture slide with block diagram
                mt_data = send_cmd("Runtime.evaluate", {
                    "expression": """
                        (() => {
                            const img = document.querySelector('.l05-hero-svg');
                            return {
                                hasImage: !!img,
                                src: img ? img.getAttribute('src') : null,
                                naturalWidth: img ? img.naturalWidth : null,
                                naturalHeight: img ? img.naturalHeight : null,
                                clientHeight: img ? img.clientHeight : null
                            };
                        })()
                    """,
                    "returnByValue": True
                }).get("result", {}).get("value", {})
                print(f"  >>> Multi-Topic Diagram Geometry (FS): {json.dumps(mt_data)}")

        card_overflows = [r for r in results if r.get('overflowDiff', 0) > 0]
        fs_overflows = [r for r in fs_results if r.get('overflowDiff', 0) > 0]

        print("\n================== SUMMARY ==================")
        print(f"Card Mode Overflows: {len(card_overflows)}")
        for o in card_overflows:
            print(f"  - Slide {o['slide']}: {o['title']} ({o['overflowDiff']}px)")

        print(f"Fullscreen Mode Overflows: {len(fs_overflows)}")
        for o in fs_overflows:
            print(f"  - Slide {o['slide']}: {o['title']} ({o['overflowDiff']}px)")

        if len(card_overflows) == 0 and len(fs_overflows) == 0:
            print("\n>>> ALL SLIDES VERIFIED WITH 0px OVERFLOW! <<<")

    finally:
        proc.terminate()

if __name__ == "__main__":
    verify()
