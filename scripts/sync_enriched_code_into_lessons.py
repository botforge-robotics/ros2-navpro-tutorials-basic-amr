#!/usr/bin/env python3
"""
Sync enriched Python reference files directly into lessonsData.json code blocks,
ensuring that HTML-escaped code blocks contain all the rich comments and docstrings.
"""

import json
import html
import re
import sys
import os

LESSONS_JSON_PATH = 'ros2-navpro-tutorials-basic-amr/lms/src/data/lessonsData.json'

def main():
    sys.path.append('ros2-navpro-tutorials-basic-amr/scripts')
    from enrich_reference_code_comments import FILES_TO_ENRICH

    with open(LESSONS_JSON_PATH, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # 1. Lesson 05
    l5 = [x for x in data['lessons'] if x['id'] == 'lesson_05'][0]
    l5_html = l5['html_content']

    # Update ultrasonic publisher code in L05
    pub_code_raw = FILES_TO_ENRICH['m01_l05_01_publisher_member_function.py']
    pub_py = pub_code_raw[pub_code_raw.find('import math'):]
    pub_escaped = html.escape(pub_py)

    pattern_pub = r'(<span class="code-filename">ultrasonic_sensor_node\.py &mdash; AMR Proximity Rangefinder Publisher</span>\s*</div>\s*<pre><code class="language-python">)(.*?)(</code></pre>)'
    l5_html = re.sub(pattern_pub, r'\g<1>' + pub_escaped + r'\g<3>', l5_html, flags=re.DOTALL)

    # Update collision monitor code in L05
    sub_code_raw = FILES_TO_ENRICH['m01_l05_02_subscriber_member_function.py']
    sub_py = sub_code_raw[sub_code_raw.find('import rclpy'):]
    sub_escaped = html.escape(sub_py)

    pattern_sub = r'(<span class="code-filename">collision_monitor_node\.py &mdash; AMR Collision Supervisor</span>\s*</div>\s*<pre><code class="language-python">)(.*?)(</code></pre>)'
    l5_html = re.sub(pattern_sub, r'\g<1>' + sub_escaped + r'\g<3>', l5_html, flags=re.DOTALL)
    l5['html_content'] = l5_html
    print("Updated Lesson 05 code blocks with enriched comments.")

    # 2. Lesson 07
    l7 = [x for x in data['lessons'] if x['id'] == 'lesson_07'][0]
    l7_html = l7['html_content']

    # Update server code in L07
    srv_code_raw = FILES_TO_ENRICH['m02_l08_01_service_member_function.py']
    srv_py = srv_code_raw[srv_code_raw.find('import rclpy'):]
    srv_escaped = html.escape(srv_py)

    pattern_srv = r'(<span class="code-filename">emergency_stop_server\.py &mdash; AMR Emergency Stop Service Server</span>\s*</div>\s*<pre><code class="language-python">)(.*?)(</code></pre>)'
    l7_html = re.sub(pattern_srv, r'\g<1>' + srv_escaped + r'\g<3>', l7_html, flags=re.DOTALL)

    # Update client code in L07
    cli_code_raw = FILES_TO_ENRICH['m02_l08_02_client_member_function.py']
    cli_py = cli_code_raw[cli_code_raw.find('import sys'):]
    cli_escaped = html.escape(cli_py)

    pattern_cli = r'(<span class="code-filename">emergency_stop_client\.py &mdash; AMR Emergency Stop Client</span>\s*</div>\s*<pre><code class="language-python">)(.*?)(</code></pre>)'
    l7_html = re.sub(pattern_cli, r'\g<1>' + cli_escaped + r'\g<3>', l7_html, flags=re.DOTALL)

    # Update solution code in L07
    sol_code_raw = FILES_TO_ENRICH.get('m02_l07_solution_speed_mode_server.py', FILES_TO_ENRICH.get('m02_l08_solution_service_calculator.py', ''))
    sol_escaped = html.escape(sol_code_raw)
    pattern_sol = r'(<span>🔍 View Reference Solution \(<code class="inline-code">m02_l07_solution_speed_mode_server\.py</code>\).*?<pre><code class="language-python">)(.*?)(</code></pre>)'
    l7_html = re.sub(pattern_sol, r'\g<1>' + sol_escaped + r'\g<3>', l7_html, flags=re.DOTALL)

    l7['html_content'] = l7_html
    print("Updated Lesson 07 code blocks with enriched comments.")

    # 3. Lesson 10
    l10 = [x for x in data['lessons'] if x['id'] == 'lesson_10'][0]
    l10_html = l10['html_content']

    # Update solution code in L10
    nav_sol_raw = FILES_TO_ENRICH['m02_l12_02_solution_navigate_distance_server.py']
    nav_sol_escaped = html.escape(nav_sol_raw)
    pattern_nav_sol = r'(<span>🔍 View Reference Solution \(<code class="inline-code">m02_l12_02_solution_navigate_distance_server\.py</code>\).*?<pre><code class="language-python">)(.*?)(</code></pre>)'
    l10_html = re.sub(pattern_nav_sol, r'\g<1>' + nav_sol_escaped + r'\g<3>', l10_html, flags=re.DOTALL)

    l10['html_content'] = l10_html
    print("Updated Lesson 10 code blocks with enriched comments.")

    with open(LESSONS_JSON_PATH, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print("Successfully synchronized all code blocks into lessonsData.json!")

if __name__ == '__main__':
    main()
