import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Terminal, 
  Check, 
  Copy, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw,
  Sparkles,
  Info
} from 'lucide-react';

export function PermissionCalculator() {
  const [fileType, setFileType] = useState('-'); // '-' for file, 'd' for directory
  const [user, setUser] = useState({ r: true, w: true, x: true });
  const [group, setGroup] = useState({ r: true, w: false, x: true });
  const [others, setOthers] = useState({ r: true, w: false, x: true });
  const [copied, setCopied] = useState(false);
  const [animatingBit, setAnimatingBit] = useState(null);

  // Calculate octals
  const userOctal = (user.r ? 4 : 0) + (user.w ? 2 : 0) + (user.x ? 1 : 0);
  const groupOctal = (group.r ? 4 : 0) + (group.w ? 2 : 0) + (group.x ? 1 : 0);
  const othersOctal = (others.r ? 4 : 0) + (others.w ? 2 : 0) + (others.x ? 1 : 0);
  const fullOctal = `${userOctal}${groupOctal}${othersOctal}`;

  // Formatted permission string characters
  const bits = [
    { label: 'Type', val: fileType, desc: fileType === 'd' ? 'Directory' : 'Regular File', color: '#64748b' },
    { label: 'u:r', val: user.r ? 'r' : '-', desc: 'User Read (4)', color: '#10b981', active: user.r },
    { label: 'u:w', val: user.w ? 'w' : '-', desc: 'User Write (2)', color: '#10b981', active: user.w },
    { label: 'u:x', val: user.x ? 'x' : '-', desc: 'User Execute (1)', color: '#10b981', active: user.x },
    { label: 'g:r', val: group.r ? 'r' : '-', desc: 'Group Read (4)', color: '#0284c7', active: group.r },
    { label: 'g:w', val: group.w ? 'w' : '-', desc: 'Group Write (2)', color: '#0284c7', active: group.w },
    { label: 'g:x', val: group.x ? 'x' : '-', desc: 'Group Execute (1)', color: '#0284c7', active: group.x },
    { label: 'o:r', val: others.r ? 'r' : '-', desc: 'Others Read (4)', color: '#8b5cf6', active: others.r },
    { label: 'o:w', val: others.w ? 'w' : '-', desc: 'Others Write (2)', color: '#8b5cf6', active: others.w },
    { label: 'o:x', val: others.x ? 'x' : '-', desc: 'Others Execute (1)', color: '#8b5cf6', active: others.x },
  ];

  const fullPermString = bits.map(b => b.val).join('');
  const commandStr = `chmod ${fullOctal} sensor_diagnostics.sh`;

  const toggleBit = (category, bitName, bitIndex) => {
    setAnimatingBit(bitIndex);
    setTimeout(() => setAnimatingBit(null), 400);

    if (category === 'user') {
      setUser(prev => ({ ...prev, [bitName]: !prev[bitName] }));
    } else if (category === 'group') {
      setGroup(prev => ({ ...prev, [bitName]: !prev[bitName] }));
    } else if (category === 'others') {
      setOthers(prev => ({ ...prev, [bitName]: !prev[bitName] }));
    }
  };

  const applyPreset = (u, g, o, isDir = false) => {
    setUser(u);
    setGroup(g);
    setOthers(o);
    setFileType(isDir ? 'd' : '-');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(commandStr).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="perm-calc-card">
      {/* Header */}
      <div className="perm-calc-header">
        <div className="perm-calc-title-row">
          <div className="perm-calc-badge">
            <Sparkles size={16} />
            <span>Interactive Simulator</span>
          </div>
          <h3 className="perm-calc-title">Linux Permission String &amp; Octal Visualizer</h3>
        </div>
        <p className="perm-calc-subtitle">
          Toggle the checkboxes below to see in real time how Linux parses read, write, and execute bits into the 
          10-character permission string and octal numbers.
        </p>
      </div>

      {/* Big Animated Permission String Display */}
      <div className="perm-display-container">
        <div className="perm-display-label">Active Linux Permission String:</div>
        <div className="perm-string-row">
          {bits.map((bit, idx) => (
            <div 
              key={idx} 
              className={`perm-char-pill ${animatingBit === idx ? 'pulse-anim' : ''} ${bit.active !== false ? 'active-bit' : 'inactive-bit'}`}
              style={{
                borderColor: bit.active !== false ? bit.color : 'var(--border-color)',
                color: bit.active !== false ? bit.color : 'var(--text-muted)'
              }}
              title={bit.desc}
            >
              <span className="char-val">{bit.val}</span>
              <span className="char-sub">{bit.label}</span>
            </div>
          ))}
        </div>

        {/* Breakdown bar */}
        <div className="perm-legend-row">
          <div className="legend-chip file-chip">
            <span className="dot" style={{ background: '#64748b' }}></span>
            <span>Type: <code>{fileType === 'd' ? 'Directory (d)' : 'File (-)'}</code></span>
          </div>
          <div className="legend-chip user-chip">
            <span className="dot" style={{ background: '#10b981' }}></span>
            <span>User/Owner: <code>{userOctal} ({bits.slice(1,4).map(b => b.val).join('')})</code></span>
          </div>
          <div className="legend-chip group-chip">
            <span className="dot" style={{ background: '#0284c7' }}></span>
            <span>Group: <code>{groupOctal} ({bits.slice(4,7).map(b => b.val).join('')})</code></span>
          </div>
          <div className="legend-chip others-chip">
            <span className="dot" style={{ background: '#8b5cf6' }}></span>
            <span>Others: <code>{othersOctal} ({bits.slice(7,10).map(b => b.val).join('')})</code></span>
          </div>
        </div>
      </div>

      {/* Command & Octal Banner */}
      <div className="perm-command-bar">
        <div className="octal-score-box">
          <span className="octal-score-label">Octal Mode:</span>
          <span className="octal-score-number">{fullOctal}</span>
        </div>
        <div className="command-display-box">
          <span className="command-prompt">$</span>
          <code className="command-text">{commandStr}</code>
        </div>
        <button 
          onClick={handleCopy} 
          className={`copy-cmd-btn ${copied ? 'copied' : ''}`}
          title="Copy command to clipboard"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>

      {/* Interactive Checkbox Columns */}
      <div className="perm-columns-grid">
        {/* User (Owner) */}
        <div className="perm-col user-col">
          <div className="perm-col-header" style={{ borderLeftColor: '#10b981' }}>
            <div className="col-header-top">
              <span className="col-badge" style={{ background: '#ecfdf5', color: '#059669' }}>u (User / Owner)</span>
              <span className="col-sum" style={{ color: '#059669' }}>= {userOctal}</span>
            </div>
            <p className="col-desc">The student or process who created the file</p>
          </div>

          <div className="checkbox-list">
            <label className={`perm-check-item ${user.r ? 'checked' : ''}`}>
              <input 
                type="checkbox" 
                checked={user.r} 
                onChange={() => toggleBit('user', 'r', 1)} 
              />
              <span className="check-text">
                <strong>Read (r)</strong>
                <span className="math-badge">+4</span>
              </span>
              <span className="hint-text">View &amp; cat file</span>
            </label>

            <label className={`perm-check-item ${user.w ? 'checked' : ''}`}>
              <input 
                type="checkbox" 
                checked={user.w} 
                onChange={() => toggleBit('user', 'w', 2)} 
              />
              <span className="check-text">
                <strong>Write (w)</strong>
                <span className="math-badge">+2</span>
              </span>
              <span className="hint-text">Edit, modify, delete</span>
            </label>

            <label className={`perm-check-item ${user.x ? 'checked' : ''}`}>
              <input 
                type="checkbox" 
                checked={user.x} 
                onChange={() => toggleBit('user', 'x', 3)} 
              />
              <span className="check-text">
                <strong>Execute (x)</strong>
                <span className="math-badge">+1</span>
              </span>
              <span className="hint-text">Run as executable</span>
            </label>
          </div>
        </div>

        {/* Group */}
        <div className="perm-col group-col">
          <div className="perm-col-header" style={{ borderLeftColor: '#0284c7' }}>
            <div className="col-header-top">
              <span className="col-badge" style={{ background: '#f0f9ff', color: '#0284c7' }}>g (Group)</span>
              <span className="col-sum" style={{ color: '#0284c7' }}>= {groupOctal}</span>
            </div>
            <p className="col-desc">Members of the student's assigned Linux usergroup</p>
          </div>

          <div className="checkbox-list">
            <label className={`perm-check-item ${group.r ? 'checked' : ''}`}>
              <input 
                type="checkbox" 
                checked={group.r} 
                onChange={() => toggleBit('group', 'r', 4)} 
              />
              <span className="check-text">
                <strong>Read (r)</strong>
                <span className="math-badge">+4</span>
              </span>
              <span className="hint-text">View contents</span>
            </label>

            <label className={`perm-check-item ${group.w ? 'checked' : ''}`}>
              <input 
                type="checkbox" 
                checked={group.w} 
                onChange={() => toggleBit('group', 'w', 5)} 
              />
              <span className="check-text">
                <strong>Write (w)</strong>
                <span className="math-badge">+2</span>
              </span>
              <span className="hint-text">Modify file</span>
            </label>

            <label className={`perm-check-item ${group.x ? 'checked' : ''}`}>
              <input 
                type="checkbox" 
                checked={group.x} 
                onChange={() => toggleBit('group', 'x', 6)} 
              />
              <span className="check-text">
                <strong>Execute (x)</strong>
                <span className="math-badge">+1</span>
              </span>
              <span className="hint-text">Run program</span>
            </label>
          </div>
        </div>

        {/* Others */}
        <div className="perm-col others-col">
          <div className="perm-col-header" style={{ borderLeftColor: '#8b5cf6' }}>
            <div className="col-header-top">
              <span className="col-badge" style={{ background: '#f5f3ff', color: '#7c3aed' }}>o (Others / World)</span>
              <span className="col-sum" style={{ color: '#7c3aed' }}>= {othersOctal}</span>
            </div>
            <p className="col-desc">Any other user account or service on the robot</p>
          </div>

          <div className="checkbox-list">
            <label className={`perm-check-item ${others.r ? 'checked' : ''}`}>
              <input 
                type="checkbox" 
                checked={others.r} 
                onChange={() => toggleBit('others', 'r', 7)} 
              />
              <span className="check-text">
                <strong>Read (r)</strong>
                <span className="math-badge">+4</span>
              </span>
              <span className="hint-text">View contents</span>
            </label>

            <label className={`perm-check-item ${others.w ? 'checked' : ''}`}>
              <input 
                type="checkbox" 
                checked={others.w} 
                onChange={() => toggleBit('others', 'w', 8)} 
              />
              <span className="check-text">
                <strong>Write (w)</strong>
                <span className="math-badge">+2</span>
              </span>
              <span className="hint-text">Modify file</span>
            </label>

            <label className={`perm-check-item ${others.x ? 'checked' : ''}`}>
              <input 
                type="checkbox" 
                checked={others.x} 
                onChange={() => toggleBit('others', 'x', 9)} 
              />
              <span className="check-text">
                <strong>Execute (x)</strong>
                <span className="math-badge">+1</span>
              </span>
              <span className="hint-text">Run program</span>
            </label>
          </div>
        </div>
      </div>

      {/* Quick Presets */}
      <div className="perm-presets-row">
        <span className="presets-label">⚡ Common Robotics Presets:</span>
        <div className="preset-buttons">
          <button 
            type="button" 
            className={`preset-btn ${fullOctal === '755' ? 'active' : ''}`}
            onClick={() => applyPreset({ r: true, w: true, x: true }, { r: true, w: false, x: true }, { r: true, w: false, x: true })}
          >
            <strong>755</strong> (ROS Node / Script)
          </button>
          <button 
            type="button" 
            className={`preset-btn ${fullOctal === '644' ? 'active' : ''}`}
            onClick={() => applyPreset({ r: true, w: true, x: false }, { r: true, w: false, x: false }, { r: true, w: false, x: false })}
          >
            <strong>644</strong> (Config / YAML / Read)
          </button>
          <button 
            type="button" 
            className={`preset-btn ${fullOctal === '700' ? 'active' : ''}`}
            onClick={() => applyPreset({ r: true, w: true, x: true }, { r: false, w: false, x: false }, { r: false, w: false, x: false })}
          >
            <strong>700</strong> (Private Script / SSH)
          </button>
          <button 
            type="button" 
            className={`preset-btn ${fullOctal === '600' ? 'active' : ''}`}
            onClick={() => applyPreset({ r: true, w: true, x: false }, { r: false, w: false, x: false }, { r: false, w: false, x: false })}
          >
            <strong>600</strong> (Private Secret / Key)
          </button>
          <button 
            type="button" 
            className={`preset-btn danger ${fullOctal === '777' ? 'active' : ''}`}
            onClick={() => applyPreset({ r: true, w: true, x: true }, { r: true, w: true, x: true }, { r: true, w: true, x: true })}
          >
            <strong>777</strong> (Full Access - Insecure!)
          </button>
        </div>
      </div>

      {/* Live Terminal Execution Simulator */}
      <div className="perm-terminal-simulator">
        <div className="terminal-header">
          <div className="terminal-dots">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <span className="terminal-title">Terminal Execution Test: ~/robotics_lab/scripts/sensor_diagnostics.sh</span>
        </div>
        <div className="terminal-body">
          <div className="terminal-line">
            <span className="term-prompt">student@navpro:~/robotics_lab/scripts$</span>
            <span className="term-cmd">ls -l sensor_diagnostics.sh</span>
          </div>
          <div className="terminal-output ls-output">
            <span style={{ color: '#38bdf8' }}>{fullPermString}</span> 1 student student 1420 Oct 14 10:00 sensor_diagnostics.sh
          </div>
          <div className="terminal-line" style={{ marginTop: '8px' }}>
            <span className="term-prompt">student@navpro:~/robotics_lab/scripts$</span>
            <span className="term-cmd">./sensor_diagnostics.sh</span>
          </div>

          {user.x ? (
            <div className="terminal-output exec-success">
              <div className="status-badge-row">
                <CheckCircle2 size={16} className="text-success" />
                <strong className="text-success">[EXECUTION GRANTED - Exit Code 0]</strong>
              </div>
              <p className="output-msg">
                ==========================================<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ROBOT SENSOR PRE-FLIGHT CHECK<br />
                ==========================================<br />
                All host AMR motor controllers and LiDAR sensors operating normally!
              </p>
            </div>
          ) : (
            <div className="terminal-output exec-denied">
              <div className="status-badge-row">
                <XCircle size={16} className="text-danger" />
                <strong className="text-danger">bash: ./sensor_diagnostics.sh: Permission denied (Exit Code 126)</strong>
              </div>
              <p className="output-tip">
                💡 <strong>Why this happens:</strong> The Owner Execute bit (<code>x</code>) is unchecked! 
                Linux blocks script execution to protect the system. Run <code>chmod +x sensor_diagnostics.sh</code> (or toggle Execute above) to fix this.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
