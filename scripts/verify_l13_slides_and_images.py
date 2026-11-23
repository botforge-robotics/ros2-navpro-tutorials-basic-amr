#!/usr/bin/env python3
import subprocess
import time
import json
import urllib.request
import base64
import os
import websocket

PORT = 9355
cmd = [
    "/usr/bin/google-chrome",
    "--headless=new",
    "--disable-gpu",
    "--no-sandbox",
    f"--remote-debugging-port={PORT}",
    "--remote-allow-origins=*",
    "--user-data-dir=/tmp/chrome_audit_test",
    "--window-size=1440,900"
]
proc = subprocess.Popen(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
time.sleep(2.0)

try:
    targets = json.loads(urllib.request.urlopen(f"http://127.0.0.1:{PORT}/json").read().decode("utf-8"))
    page_targets = [t for t in targets if t.get("type") == "page"]
    ws_url = page_targets[0]["webSocketDebuggerUrl"] if page_targets else targets[0]["webSocketDebuggerUrl"]
    ws = websocket.create_connection(ws_url, timeout=15)

    msg_id = 1
    def send(method, params=None):
        global msg_id
        msg_id += 1
        cid = msg_id
        ws.send(json.dumps({"id": cid, "method": method, "params": params or {}}))
        while True:
            resp = json.loads(ws.recv())
            if resp.get("id") == cid:
                return resp.get("result", {})

    send("Page.enable")
    send("Page.navigate", {"url": "http://127.0.0.1:5173/#/presentation/13?slide=0"})
    time.sleep(3.0)

    total_res = send("Runtime.evaluate", {
        "expression": 'document.querySelector(".slide-total-num")?.innerText || "0"',
        "returnByValue": True
    })
    total = int(total_res.get("result", {}).get("value", 0))
    print(f"Total slides loaded in browser: {total}")

    all_imgs_ok = True
    all_diffs_ok = True

    for s in range(total):
        send("Page.navigate", {"url": f"http://127.0.0.1:5173/#/presentation/13?slide={s}"})
        time.sleep(0.5)
        info = send("Runtime.evaluate", {
            "expression": """
                (() => {
                    const title = document.querySelector(".ppt-title")?.innerText || document.querySelector("h1, h2, h3")?.innerText || "Unknown";
                    const content = document.querySelector(".ppt-slide-content");
                    const diff = content ? (content.scrollHeight - content.clientHeight) : 0;
                    const imgs = Array.from(document.querySelectorAll("img")).map(img => ({
                        src: img.src,
                        complete: img.complete,
                        naturalWidth: img.naturalWidth,
                        naturalHeight: img.naturalHeight,
                        visible: img.offsetWidth > 0 && img.offsetHeight > 0
                    }));
                    return { title, diff, imgs };
                })()
            """,
            "returnByValue": True
        })
        val = info.get("result", {}).get("value", {})
        diff = val.get("diff", 0)
        title = val.get("title", "")[:40]
        imgs = val.get("imgs", [])
        
        img_desc_list = []
        has_broken = False
        for im in imgs:
            fname = im["src"].split("/")[-1]
            w = im["naturalWidth"]
            h = im["naturalHeight"]
            comp = im["complete"]
            if w == 0 or not comp:
                has_broken = True
                all_imgs_ok = False
                img_desc_list.append(f"BROKEN:{fname}")
            else:
                img_desc_list.append(f"{fname}({w}x{h})")

        img_status = "No imgs" if not imgs else (", ".join(img_desc_list))
        if has_broken:
            img_status = "❌ " + img_status
        elif imgs:
            img_status = "✅ " + img_status

        overflow_str = f"diff={diff}px" if diff > 1 else "OK"
        if diff > 1:
            all_diffs_ok = False
            overflow_str = f"⚠️ {overflow_str}"

        print(f"Slide {s+1:02d} | {overflow_str:12s} | {img_status:55s} | {title}")

    print("\n--- Summary ---")
    print(f"All images loaded cleanly: {all_imgs_ok}")
    print(f"Zero overflow on 1440x900: {all_diffs_ok}")

finally:
    proc.kill()
