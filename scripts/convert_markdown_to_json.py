#!/usr/bin/env python3
"""
Converts Markdown tutorials in tutorials/ to HTML for lms/src/data/lessonsData.json
Preserves quiz data, module structure, and lesson metadata.
"""

import os
import re
import json
import html
from markdown_it import MarkdownIt

def slugify(text):
    text = text.lower().strip()
    text = re.sub(r'<[^>]+>', '', text)
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_]+', '-', text)
    return text

def create_converter():
    md = MarkdownIt('default', {'html': True, 'typographer': False}).enable('table')

    def render_fence(tokens, idx, options, env):
        token = tokens[idx]
        info = token.info.strip() if token.info else 'text'
        lang = info.split()[0] if info else 'text'
        code = html.escape(token.content)
        return (
            f'<div class="code-container" data-language="{lang}">\n'
            f'<div class="code-header"><span class="code-lang-tag">{lang}</span><button class="copy-code-btn">📋 Copy</button></div>\n'
            f'<pre><code class="language-{lang}">{code}</code></pre>\n'
            f'</div>\n'
        )

    def render_code_inline(tokens, idx, options, env):
        token = tokens[idx]
        return f'<code class="inline-code">{html.escape(token.content)}</code>'

    def render_heading_open(tokens, idx, options, env):
        token = tokens[idx]
        level = token.tag
        title = ''
        if idx + 1 < len(tokens) and tokens[idx + 1].type == 'inline':
            title = tokens[idx + 1].content
        slug = slugify(title)
        return f'<{level} id="{slug}">'

    def render_hr(tokens, idx, options, env):
        return '<hr class="divider">\n'

    def render_image(tokens, idx, options, env):
        token = tokens[idx]
        src = token.attrGet('src') or ''
        alt = token.content or ''
        src = re.sub(r'^(\.\./)+web/assets/images/', 'assets/images/', src)
        src = re.sub(r'^(\.\./)+assets/images/', 'assets/images/', src)
        src = re.sub(r'^\./assets/images/', 'assets/images/', src)
        return f'<img src="{src}" alt="{html.escape(alt)}" class="lesson-image" loading="lazy" />'

    def render_table_open(tokens, idx, options, env):
        return '<div class="table-responsive"><table>\n'

    def render_table_close(tokens, idx, options, env):
        return '</table></div>\n'

    md.renderer.rules['fence'] = render_fence
    md.renderer.rules['code_inline'] = render_code_inline
    md.renderer.rules['heading_open'] = render_heading_open
    md.renderer.rules['hr'] = render_hr
    md.renderer.rules['image'] = render_image
    md.renderer.rules['table_open'] = render_table_open
    md.renderer.rules['table_close'] = render_table_close

    return md

def preprocess_markdown(content):
    """
    Transforms GitHub-style callouts before markdown parsing:
    > [!NOTE] -> custom callout container
    > [!TIP]
    > [!IMPORTANT]
    > [!WARNING]
    > **Focus:** -> header callout
    """
    lines = content.split('\n')
    output_lines = []
    i = 0
    while i < len(lines):
        line = lines[i]
        
        callout_match = re.match(r'^>\s*\[!(NOTE|TIP|IMPORTANT|WARNING)\]', line, re.IGNORECASE)
        focus_match = re.match(r'^>\s*\*\*Focus:\*\*', line)
        
        if callout_match:
            kind = callout_match.group(1).lower()
            callout_lines = []
            i += 1
            while i < len(lines) and lines[i].startswith('>'):
                body_line = re.sub(r'^>\s?', '', lines[i])
                callout_lines.append(body_line)
                i += 1
            callout_text = '\n'.join(callout_lines)
            output_lines.append(f'\n:::alert-{kind}\n{callout_text}\n:::\n')
            continue
            
        elif focus_match:
            callout_lines = [re.sub(r'^>\s?', '', line)]
            i += 1
            while i < len(lines) and lines[i].startswith('>'):
                body_line = re.sub(r'^>\s?', '', lines[i])
                callout_lines.append(body_line)
                i += 1
            callout_text = '  \n'.join(callout_lines)
            output_lines.append(f'\n:::alert-note\n{callout_text}\n:::\n')
            continue
            
        output_lines.append(line)
        i += 1

    return '\n'.join(output_lines)

def postprocess_html(html_str):
    """
    Converts :::alert-{type} into <div class="alert-callout alert-{type}">...</div>
    """
    def replace_alert(match):
        kind = match.group(1)
        body = match.group(2).strip()
        body = re.sub(r'^<p>', '', body)
        body = re.sub(r'</p>$', '', body)
        # Format line breaks in alert body
        body = body.replace('\n', '<br>')
        return (
            f'<div class="alert-callout alert-{kind}">'
            f'<div class="alert-icon"></div>'
            f'<div class="alert-body">{body}</div>'
            f'</div>'
        )

    pattern = r':::alert-(note|tip|important|warning)\s*([\s\S]*?)\s*:::'
    html_str = re.sub(pattern, replace_alert, html_str)
    
    # Strip <p> wrapping around block elements like alert-callout or code-container
    html_str = re.sub(r'<p>\s*(<div class="alert-callout[\s\S]*?</div>\s*</div>)\s*</p>', r'\1', html_str)
    html_str = re.sub(r'<p>\s*(<div class="code-container[\s\S]*?</div>\s*</div>)\s*</p>', r'\1', html_str)
    html_str = re.sub(r'<p>\s*</p>', '', html_str)
    return html_str

def md_to_lesson_html(md_content):
    # 1. Preprocess callouts first so any code blocks inside callouts have '>' stripped
    preprocessed = preprocess_markdown(md_content)

    # 2. Stash all fenced code blocks to prevent Markdown-It from treating
    # blank lines inside HTML blocks (like <div class="cmd-card">) as heading triggers
    code_blocks = []
    def stash_code_block(match):
        idx = len(code_blocks)
        lang = match.group(1).strip() or "text"
        code = html.escape(match.group(2))
        block_html = (
            f'<div class="code-container" data-language="{lang}">\n'
            f'<div class="code-header"><span class="code-lang-tag">{lang}</span><button class="copy-code-btn">📋 Copy</button></div>\n'
            f'<pre><code class="language-{lang}">{code}</code></pre>\n'
            f'</div>\n'
        )
        code_blocks.append(block_html)
        return f'\n§§CODEBLOCK_{idx}§§\n'

    stashed = re.sub(r'```([a-zA-Z0-9_-]*)\n([\s\S]*?)```', stash_code_block, preprocessed)
    stashed = re.sub(r'(\.\./)+web/assets/images/', 'assets/images/', stashed)
    stashed = re.sub(r'(\.\./)+assets/images/', 'assets/images/', stashed)

    converter = create_converter()
    raw_html = converter.render(stashed)
    final_html = postprocess_html(raw_html)

    for idx, b in enumerate(code_blocks):
        final_html = final_html.replace(f'§§CODEBLOCK_{idx}§§', b)

    final_html = re.sub(r'<p>\s*(<div class="code-container[\s\S]*?</div>\s*</div>)\s*</p>', r'\1', final_html)
    final_html = re.sub(r'<p>\s*(<div class="cmd-card[\s\S]*?</div>\s*</div>)\s*</p>', r'\1', final_html)
    final_html = re.sub(r'<p>\s*</p>', '', final_html)

    return final_html

def update_lessons_json(repo_dir, target_lesson_ids=None):
    json_path = os.path.join(repo_dir, 'lms/src/data/lessonsData.json')
    tutorials_dir = os.path.join(repo_dir, 'tutorials')

    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    updated_count = 0
    for lesson in data['lessons']:
        lesson_id = lesson['id']
        if target_lesson_ids and lesson_id not in target_lesson_ids:
            continue

        filename = lesson['filename']
        md_path = os.path.join(tutorials_dir, filename)
        if not os.path.exists(md_path):
            print(f'Warning: {md_path} does not exist. Skipping.')
            continue

        with open(md_path, 'r', encoding='utf-8') as mf:
            md_content = mf.read()

        new_html = md_to_lesson_html(md_content)
        lesson['html_content'] = new_html
        print(f'Updated {lesson_id} from {filename} ({len(new_html)} bytes HTML)')
        updated_count += 1

    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print(f'Successfully updated {updated_count} lessons in {json_path}')

if __name__ == '__main__':
    import sys
    repo_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    targets = sys.argv[1:] if len(sys.argv) > 1 else None
    update_lessons_json(repo_dir, targets)
