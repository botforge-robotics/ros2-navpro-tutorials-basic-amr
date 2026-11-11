#!/usr/bin/env python3
import subprocess
import time
import json
import urllib.request
import base64
import os
import websocket

ARTIFACT_DIR = "/home/chaitu/.gemini/antigravity-cli/brain/5b5c6e15-453a-4d6b-aa2f-31f266c4a27c"
PORT = 9346

def run():
    cmd = [
        "/usr/bin/google-chrome",
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        f"--remote-debugging-port={PORT}",
        "--remote-allow-origins=*",
        "--user-data-dir=/tmp/chrome_audit_l03",
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

        print("Navigating to Lesson 03...")
        send_cmd("Page.navigate", {"url": "http://127.0.0.1:5173/#/presentation/03?slide=0"})
        time.sleep(3.0)

        # Get total slides count and slide metadata
        meta = send_cmd("Runtime.evaluate", {
            "expression": """
                (() => {
                    const counterBtn = document.querySelector('.ppt-slide-counter-btn');
                    const text = counterBtn ? counterBtn.innerText : '';
                    return { text };
                })()
            """,
            "returnByValue": True
        })
        print("Initial counter:", meta.get("result", {}).get("value"))

        # We can query all slide titles from the slide deck state or by iterating
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

        slide_reports = []
        for s in range(total_slides):
            send_cmd("Page.navigate", {"url": f"http://127.0.0.1:5173/#/presentation/03?slide={s}"})
            time.sleep(1.0)

            report = send_cmd("Runtime.evaluate", {
                "expression": """
                    (() => {
                        const content = document.querySelector('.ppt-slide-content');
                        const titleEl = document.querySelector('.ppt-title') || document.querySelector('h1, h2, h3');
                        const title = titleEl ? titleEl.innerText.trim() : 'Unknown';
                        const badgeEl = document.querySelector('.ppt-slide-badge');
                        const badge = badgeEl ? badgeEl.innerText.trim() : '';
                        
                        const imgs = Array.from(content ? content.querySelectorAll('img, svg:not(.lucide)') : []).map(img => {
                            const rect = img.getBoundingClientRect();
                            return {
                                src: img.getAttribute('src') || img.tagName,
                                w: Math.round(rect.width),
                                h: Math.round(rect.height),
                                naturalW: img.naturalWidth || 0,
                                naturalH: img.naturalH || 0
                            };
                        });

                        const overflowDiff = content ? (content.scrollHeight - content.clientHeight) : 0;
                        const scrollH = content ? content.scrollHeight : 0;
                        const clientH = content ? content.clientHeight : 0;

                        // Check if any element is clipped or overflowing
                        const hasOverflow = overflowDiff > 1;

                        return {
                            slideIdx: window.location.hash,
                            title,
                            badge,
                            overflowDiff,
                            scrollH,
                            clientH,
                            hasOverflow,
                            imgs,
                            htmlSnippet: content ? content.innerHTML.substring(0, 300) : ''
                        };
                    })()
                """,
                "returnByValue": True
            })
            val = report.get("result", {}).get("value", {})
            slide_reports.append(val)
            print(f"[{s+1}/{total_slides}] Slide {s}: {val.get('title')} | Overflow: {val.get('overflowDiff')}px | Imgs: {len(val.get('imgs', []))}")
            if val.get('hasOverflow') or len(val.get('imgs', [])) > 0:
                img_name = f"l03_slide_{s:02d}.png"
                take_screenshot(img_name)
                print(f"   -> Screenshot saved: {img_name}")

        with open(os.path.join(ARTIFACT_DIR, "l03_audit_report.json"), "w") as f:
            json.dump(slide_reports, f, indent=2)

        ws.close()
    finally:
        proc.terminate()

if __name__ == "__main__":
    run()
