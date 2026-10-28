import React, { useState } from 'react';
import hljs from 'highlight.js';
import { Terminal, Copy, Check } from 'lucide-react';

export function TerminalBlock({ 
  code, 
  children, 
  terminal = "bash", 
  language = "bash",
  showControls = true,
  className = ""
}) {
  const [copied, setCopied] = useState(false);
  const rawCode = (code || children || '').trim();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rawCode);
      setCopied(true);

      // Synchronize with container X11 / VNC clipboard
      fetch('/api/clipboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: rawCode })
      }).catch(() => {});

      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard API fails
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Syntax highlighting
  let highlightedHtml = '';
  try {
    if (language && hljs.getLanguage(language)) {
      highlightedHtml = hljs.highlight(rawCode, { language }).value;
    } else {
      highlightedHtml = hljs.highlightAuto(rawCode).value;
    }
  } catch {
    highlightedHtml = rawCode
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  return (
    <div className={`ide-code-window code-container ${className}`} data-language={language}>
      <div className="ide-header code-header">
        {showControls && (
          <div className="ide-controls">
            <span className="ide-dot ide-dot-red" />
            <span className="ide-dot ide-dot-yellow" />
            <span className="ide-dot ide-dot-green" />
          </div>
        )}

        <div className="ide-tab">
          <Terminal size={12} className="ide-tab-icon" />
          <span>{terminal}</span>
        </div>

        <button 
          type="button" 
          className={`copy-code-btn ${copied ? 'copied' : ''}`}
          onClick={handleCopy}
          aria-label="Copy command"
        >
          {copied ? (
            <>
              <Check size={12} />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      <pre>
        <code 
          className={`language-${language}`}
          dangerouslySetInnerHTML={{ __html: highlightedHtml }}
        />
      </pre>
    </div>
  );
}

export default TerminalBlock;
