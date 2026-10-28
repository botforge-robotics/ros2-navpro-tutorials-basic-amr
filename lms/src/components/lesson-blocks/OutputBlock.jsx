import React, { useState } from 'react';
import { FileText, Copy, Check } from 'lucide-react';

export function OutputBlock({ 
  code, 
  children, 
  title = "output / log", 
  language = "text",
  className = ""
}) {
  const [copied, setCopied] = useState(false);
  const rawContent = (code || children || '').trim();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rawContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={`ide-code-window code-container output-container ${className}`} data-language={language}>
      <div className="ide-header code-header">
        <div className="ide-controls">
          <span className="ide-dot ide-dot-red" />
          <span className="ide-dot ide-dot-yellow" />
          <span className="ide-dot ide-dot-green" />
        </div>

        <div className="ide-tab">
          <FileText size={12} className="ide-tab-icon" />
          <span>{title}</span>
        </div>

        <button 
          type="button" 
          className={`copy-code-btn ${copied ? 'copied' : ''}`}
          onClick={handleCopy}
          aria-label="Copy output"
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
        <code className={`language-${language}`}>{rawContent}</code>
      </pre>
    </div>
  );
}

export default OutputBlock;
