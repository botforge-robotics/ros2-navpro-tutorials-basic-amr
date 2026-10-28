import React, { useState, useMemo } from 'react';

export default function InertiaCalculator() {
  const [shape, setShape] = useState('box');
  const [mass, setMass] = useState(8.0);

  // Box dimensions (meters)
  const [width, setWidth] = useState(0.30);   // Y
  const [height, setHeight] = useState(0.14); // Z
  const [depth, setDepth] = useState(0.40);   // X (length)

  // Cylinder dimensions
  const [radius, setRadius] = useState(0.06);
  const [length, setLength] = useState(0.035);

  // Sphere dimensions
  const [sphereRadius, setSphereRadius] = useState(0.03);

  // Hollow Cylinder dimensions
  const [innerRadius, setInnerRadius] = useState(0.04);
  const [outerRadius, setOuterRadius] = useState(0.06);

  const [copied, setCopied] = useState(false);

  // Compute Moments of Inertia
  const inertia = useMemo(() => {
    const m = Math.max(0.001, parseFloat(mass) || 0.1);

    if (shape === 'box') {
      const w = Math.max(0.001, parseFloat(width) || 0.1);
      const h = Math.max(0.001, parseFloat(height) || 0.1);
      const d = Math.max(0.001, parseFloat(depth) || 0.1);
      // Box: Ixx = (m/12)*(h^2 + d^2), Iyy = (m/12)*(w^2 + d^2), Izz = (m/12)*(w^2 + h^2)
      // Note: In standard ROS REP 103, X=depth/length, Y=width, Z=height
      // Rotation about X (roll): affects Y and Z -> (m/12)*(w^2 + h^2)
      // Rotation about Y (pitch): affects X and Z -> (m/12)*(d^2 + h^2)
      // Rotation about Z (yaw): affects X and Y -> (m/12)*(d^2 + w^2)
      const ixx = (m / 12) * (h * h + d * d);
      const iyy = (m / 12) * (w * w + d * d);
      const izz = (m / 12) * (w * w + h * h);
      return { ixx, iyy, izz, ixy: 0, ixz: 0, iyz: 0 };
    } else if (shape === 'cylinder') {
      const r = Math.max(0.001, parseFloat(radius) || 0.05);
      const l = Math.max(0.001, parseFloat(length) || 0.05);
      // Cylinder with axis along Z:
      // Ixx = Iyy = (m/12)*(3*r^2 + l^2)
      // Izz = (m/2)*(r^2)
      const ixx = (m / 12) * (3 * r * r + l * l);
      const iyy = ixx;
      const izz = (m / 2) * (r * r);
      return { ixx, iyy, izz, ixy: 0, ixz: 0, iyz: 0 };
    } else if (shape === 'sphere') {
      const r = Math.max(0.001, parseFloat(sphereRadius) || 0.03);
      // Solid Sphere: Ixx = Iyy = Izz = (2/5)*m*r^2
      const val = (2 / 5) * m * r * r;
      return { ixx: val, iyy: val, izz: val, ixy: 0, ixz: 0, iyz: 0 };
    } else {
      // Hollow cylinder (pipe)
      const r1 = Math.max(0.001, parseFloat(innerRadius) || 0.02);
      const r2 = Math.max(r1 + 0.001, parseFloat(outerRadius) || 0.05);
      const l = Math.max(0.001, parseFloat(length) || 0.05);
      const ixx = (m / 12) * (3 * (r1 * r1 + r2 * r2) + l * l);
      const iyy = ixx;
      const izz = (m / 2) * (r1 * r1 + r2 * r2);
      return { ixx, iyy, izz, ixy: 0, ixz: 0, iyz: 0 };
    }
  }, [shape, mass, width, height, depth, radius, length, sphereRadius, innerRadius, outerRadius]);

  const xmlOutput = useMemo(() => {
    return `<inertial>
  <origin xyz="0 0 0" rpy="0 0 0"/>
  <mass value="${parseFloat(mass).toFixed(3)}"/>
  <inertia ixx="${inertia.ixx.toFixed(6)}" ixy="0.0" ixz="0.0"
           iyy="${inertia.iyy.toFixed(6)}" iyz="0.0"
           izz="${inertia.izz.toFixed(6)}"/>
</inertial>`;
  }, [mass, inertia]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(xmlOutput).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  const applyPreset = (presetName) => {
    if (presetName === 'chassis') {
      setShape('box');
      setMass(8.0);
      setDepth(0.40);
      setWidth(0.30);
      setHeight(0.14);
    } else if (presetName === 'wheel') {
      setShape('cylinder');
      setMass(0.8);
      setRadius(0.06);
      setLength(0.035);
    } else if (presetName === 'lidar') {
      setShape('cylinder');
      setMass(0.15);
      setRadius(0.04);
      setLength(0.04);
    } else if (presetName === 'camera') {
      setShape('box');
      setMass(0.08);
      setDepth(0.025);
      setWidth(0.09);
      setHeight(0.025);
    } else if (presetName === 'caster') {
      setShape('sphere');
      setMass(0.3);
      setSphereRadius(0.03);
    }
  };

  return (
    <div className="inertia-calculator-card" style={{
      background: 'linear-gradient(145deg, #0d1527 0%, #080d1a 100%)',
      borderRadius: '16px',
      border: '1px solid #1e293b',
      boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      padding: '24px',
      margin: '28px 0',
      color: '#e2e8f0',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid #1e293b', paddingBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #00e5ff 0%, #0284c7 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 16px rgba(0, 229, 255, 0.4)'
          }}>
            <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#090d16' }}>I</span>
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#f8fafc' }}>
              Interactive URDF Inertia Tensor Calculator
            </h3>
            <span style={{ fontSize: '12px', color: '#94a3b8' }}>
              Physics-accurate principal moments of inertia for primitive link geometries
            </span>
          </div>
        </div>
        <span style={{
          fontSize: '11px', fontWeight: '700', textTransform: 'uppercase',
          padding: '4px 10px', borderRadius: '20px',
          background: 'rgba(0, 229, 255, 0.1)', color: '#00e5ff',
          border: '1px solid rgba(0, 229, 255, 0.3)'
        }}>
          ROS 2 / Gazebo Ready
        </span>
      </div>

      {/* Preset Buttons */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '8px' }}>
          Quick Robot Presets:
        </label>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button onClick={() => applyPreset('chassis')} style={presetBtnStyle}>
            📦 AMR Chassis (8kg Box)
          </button>
          <button onClick={() => applyPreset('wheel')} style={presetBtnStyle}>
            ⚙️ Drive Wheel (0.8kg Cyl)
          </button>
          <button onClick={() => applyPreset('lidar')} style={presetBtnStyle}>
            📡 2D LiDAR Puck (0.15kg)
          </button>
          <button onClick={() => applyPreset('camera')} style={presetBtnStyle}>
            📷 RGB Camera (0.08kg)
          </button>
          <button onClick={() => applyPreset('caster')} style={presetBtnStyle}>
            ⚪ Caster Ball (0.3kg)
          </button>
        </div>
      </div>

      {/* Shape Selector Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '22px', borderBottom: '1px solid #1e293b', paddingBottom: '12px' }}>
        {[
          { id: 'box', label: 'Solid Box (Cuboid)', icon: '📦' },
          { id: 'cylinder', label: 'Solid Cylinder', icon: '🥫' },
          { id: 'sphere', label: 'Solid Sphere', icon: '⚽' },
          { id: 'hollow_cylinder', label: 'Hollow Cylinder', icon: '⭕' }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setShape(item.id)}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '13px',
              background: shape === item.id ? '#0284c7' : '#1e293b',
              color: shape === item.id ? '#ffffff' : '#94a3b8',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Input Controls Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {/* Mass */}
        <div style={inputCardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={inputLabelStyle}>Mass (m)</span>
            <span style={inputValueStyle}>{mass} kg</span>
          </div>
          <input
            type="range" min="0.01" max="25" step="0.01" value={mass}
            onChange={(e) => setMass(parseFloat(e.target.value))}
            style={{ width: '100%', accentColor: '#00e5ff' }}
          />
        </div>

        {/* Box Dimensions */}
        {shape === 'box' && (
          <>
            <div style={inputCardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={inputLabelStyle}>Length / X Depth (d)</span>
                <span style={inputValueStyle}>{depth} m</span>
              </div>
              <input
                type="range" min="0.01" max="1.5" step="0.005" value={depth}
                onChange={(e) => setDepth(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: '#ef4444' }}
              />
            </div>
            <div style={inputCardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={inputLabelStyle}>Width / Y Lateral (w)</span>
                <span style={inputValueStyle}>{width} m</span>
              </div>
              <input
                type="range" min="0.01" max="1.5" step="0.005" value={width}
                onChange={(e) => setWidth(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: '#10b981' }}
              />
            </div>
            <div style={inputCardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={inputLabelStyle}>Height / Z Vertical (h)</span>
                <span style={inputValueStyle}>{height} m</span>
              </div>
              <input
                type="range" min="0.01" max="1.0" step="0.005" value={height}
                onChange={(e) => setHeight(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: '#3b82f6' }}
              />
            </div>
          </>
        )}

        {/* Cylinder Dimensions */}
        {(shape === 'cylinder' || shape === 'hollow_cylinder') && (
          <>
            {shape === 'cylinder' ? (
              <div style={inputCardStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={inputLabelStyle}>Radius (r)</span>
                  <span style={inputValueStyle}>{radius} m</span>
                </div>
                <input
                  type="range" min="0.005" max="0.5" step="0.005" value={radius}
                  onChange={(e) => setRadius(parseFloat(e.target.value))}
                  style={{ width: '100%', accentColor: '#00e5ff' }}
                />
              </div>
            ) : (
              <>
                <div style={inputCardStyle}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={inputLabelStyle}>Inner Radius (r1)</span>
                    <span style={inputValueStyle}>{innerRadius} m</span>
                  </div>
                  <input
                    type="range" min="0.005" max="0.3" step="0.005" value={innerRadius}
                    onChange={(e) => setInnerRadius(parseFloat(e.target.value))}
                    style={{ width: '100%', accentColor: '#00e5ff' }}
                  />
                </div>
                <div style={inputCardStyle}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={inputLabelStyle}>Outer Radius (r2)</span>
                    <span style={inputValueStyle}>{outerRadius} m</span>
                  </div>
                  <input
                    type="range" min="0.01" max="0.5" step="0.005" value={outerRadius}
                    onChange={(e) => setOuterRadius(parseFloat(e.target.value))}
                    style={{ width: '100%', accentColor: '#00e5ff' }}
                  />
                </div>
              </>
            )}
            <div style={inputCardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={inputLabelStyle}>Length / Height (l)</span>
                <span style={inputValueStyle}>{length} m</span>
              </div>
              <input
                type="range" min="0.005" max="0.5" step="0.005" value={length}
                onChange={(e) => setLength(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: '#3b82f6' }}
              />
            </div>
          </>
        )}

        {/* Sphere Dimensions */}
        {shape === 'sphere' && (
          <div style={inputCardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={inputLabelStyle}>Radius (r)</span>
              <span style={inputValueStyle}>{sphereRadius} m</span>
            </div>
            <input
              type="range" min="0.005" max="0.5" step="0.005" value={sphereRadius}
              onChange={(e) => setSphereRadius(parseFloat(e.target.value))}
              style={{ width: '100%', accentColor: '#00e5ff' }}
            />
          </div>
        )}
      </div>

      {/* Results & XML Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {/* Calculated Tensor Values */}
        <div style={{ background: '#090d16', padding: '16px', borderRadius: '12px', border: '1px solid #1e293b' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '10px' }}>
            Computed Inertia Tensor Elements (kg·m²):
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', textAlign: 'center' }}>
            <div style={tensorBoxStyle}>
              <div style={{ fontSize: '11px', color: '#ef4444' }}>Ixx (Roll)</div>
              <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#f8fafc' }}>{inertia.ixx.toFixed(5)}</div>
            </div>
            <div style={tensorBoxStyle}>
              <div style={{ fontSize: '11px', color: '#94a3b8' }}>Ixy</div>
              <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#64748b' }}>0.00000</div>
            </div>
            <div style={tensorBoxStyle}>
              <div style={{ fontSize: '11px', color: '#94a3b8' }}>Ixz</div>
              <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#64748b' }}>0.00000</div>
            </div>

            <div style={tensorBoxStyle}>
              <div style={{ fontSize: '11px', color: '#94a3b8' }}>Iyx</div>
              <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#64748b' }}>0.00000</div>
            </div>
            <div style={tensorBoxStyle}>
              <div style={{ fontSize: '11px', color: '#10b981' }}>Iyy (Pitch)</div>
              <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#f8fafc' }}>{inertia.iyy.toFixed(5)}</div>
            </div>
            <div style={tensorBoxStyle}>
              <div style={{ fontSize: '11px', color: '#94a3b8' }}>Iyz</div>
              <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#64748b' }}>0.00000</div>
            </div>

            <div style={tensorBoxStyle}>
              <div style={{ fontSize: '11px', color: '#94a3b8' }}>Izx</div>
              <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#64748b' }}>0.00000</div>
            </div>
            <div style={tensorBoxStyle}>
              <div style={{ fontSize: '11px', color: '#94a3b8' }}>Izy</div>
              <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#64748b' }}>0.00000</div>
            </div>
            <div style={tensorBoxStyle}>
              <div style={{ fontSize: '11px', color: '#3b82f6' }}>Izz (Yaw)</div>
              <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#f8fafc' }}>{inertia.izz.toFixed(5)}</div>
            </div>
          </div>
        </div>

        {/* Copyable XML Block */}
        <div style={{ background: '#090d16', padding: '16px', borderRadius: '12px', border: '1px solid #1e293b', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: '700', color: '#00e5ff', textTransform: 'uppercase' }}>
              Generated URDF &lt;inertial&gt; Snippet
            </span>
            <button
              onClick={copyToClipboard}
              style={{
                background: copied ? '#10b981' : '#1e293b',
                color: copied ? '#ffffff' : '#38bdf8',
                border: '1px solid ' + (copied ? '#10b981' : '#38bdf8'),
                borderRadius: '6px',
                padding: '4px 10px',
                fontSize: '11px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {copied ? '✓ Copied to Clipboard!' : '📋 Copy XML'}
            </button>
          </div>
          <pre style={{
            margin: 0,
            padding: '12px',
            background: '#040711',
            borderRadius: '8px',
            color: '#a5f3fc',
            fontFamily: 'monospace',
            fontSize: '12px',
            lineHeight: '1.5',
            overflowX: 'auto',
            border: '1px solid #162032'
          }}>
            {xmlOutput}
          </pre>
        </div>
      </div>
    </div>
  );
}

const inputCardStyle = {
  background: '#131c31',
  padding: '12px 14px',
  borderRadius: '8px',
  border: '1px solid #1e293b'
};

const inputLabelStyle = {
  fontSize: '12px',
  fontWeight: '600',
  color: '#94a3b8'
};

const inputValueStyle = {
  fontSize: '12px',
  fontWeight: '700',
  color: '#f8fafc'
};

const presetBtnStyle = {
  background: '#1e293b',
  color: '#cbd5e1',
  border: '1px solid #334155',
  borderRadius: '6px',
  padding: '5px 10px',
  fontSize: '11px',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'background 0.2s'
};

const tensorBoxStyle = {
  background: '#131b2e',
  padding: '8px 4px',
  borderRadius: '6px',
  border: '1px solid #1e293b'
};
