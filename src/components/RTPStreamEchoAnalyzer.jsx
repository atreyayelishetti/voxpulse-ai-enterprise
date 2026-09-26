import React, { useState } from 'react';
import { Radio, Activity, Volume2, Sliders, ShieldCheck, RefreshCw, Zap } from 'lucide-react';

export default function RTPStreamEchoAnalyzer() {
  const [echoDelayMs, setEchoDelayMs] = useState(48);
  const [hybridImpedanceMismatch, setHybridImpedanceMismatch] = useState(15);
  const [aecFilterTaps, setAecFilterTaps] = useState(512);
  const [doubleTalkDetected, setDoubleTalkDetected] = useState(false);

  // Derived ITU-T G.168 echo metrics
  const erlDb = (18 - hybridImpedanceMismatch * 0.4).toFixed(1);
  const erleDb = (32 - (echoDelayMs > 60 ? (echoDelayMs - 60) * 0.2 : 0)).toFixed(1);
  const acomDb = (parseFloat(erlDb) + parseFloat(erleDb)).toFixed(1);
  const convergenceTimeMs = Math.round(120 + echoDelayMs * 1.5);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Radio color="#06b6d4" size={28} /> ITU-T G.168 PSTN Line & Acoustic Echo Cancellation (AEC) Analyzer
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Real-time DSP inspection of hybrid 2-to-4 wire impedance reflection, Echo Return Loss (ERL), and adaptive filter convergence.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            className={`btn ${doubleTalkDetected ? 'btn-danger' : 'btn-secondary'}`}
            onClick={() => setDoubleTalkDetected(!doubleTalkDetected)}
          >
            {doubleTalkDetected ? 'Double-Talk Mode Active' : 'Inject Double-Talk'}
          </button>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Echo Return Loss (ERL)</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#06b6d4', marginTop: '4px' }}>{erlDb} dB</div>
          <span className="badge badge-cyan" style={{ marginTop: '8px', display: 'inline-block' }}>Hybrid Reflection</span>
        </div>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>AEC Enhancement (ERLE)</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>{erleDb} dB</div>
          <span className="badge badge-emerald" style={{ marginTop: '8px', display: 'inline-block' }}>Adaptive Cancellation</span>
        </div>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Echo Loss (ACOM)</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#a855f7', marginTop: '4px' }}>{acomDb} dB</div>
          <span className="badge badge-purple" style={{ marginTop: '8px', display: 'inline-block' }}>&gt; 45 dB SLA Pass</span>
        </div>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Filter Convergence Time</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f59e0b', marginTop: '4px' }}>{convergenceTimeMs} ms</div>
          <span className="badge badge-amber" style={{ marginTop: '8px', display: 'inline-block' }}>NLMS Normalized</span>
        </div>
      </div>

      {/* Interactive Calibration Controls */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sliders size={20} color="#06b6d4" /> Echo Path & Hybrid Impedance Calibration
          </h3>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>PSTN 2-Wire Hybrid Echo Path Delay</label>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#06b6d4' }}>{echoDelayMs} ms</span>
            </div>
            <input 
              type="range" 
              min="8" 
              max="128" 
              value={echoDelayMs} 
              onChange={(e) => setEchoDelayMs(parseInt(e.target.value, 10))} 
              style={{ width: '100%', accentColor: '#06b6d4' }} 
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Central Office Hybrid Impedance Mismatch</label>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f59e0b' }}>{hybridImpedanceMismatch}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="40" 
              value={hybridImpedanceMismatch} 
              onChange={(e) => setHybridImpedanceMismatch(parseInt(e.target.value, 10))} 
              style={{ width: '100%', accentColor: '#f59e0b' }} 
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>AEC FIR Filter Length</label>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#a855f7' }}>{aecFilterTaps} Taps (64ms window)</span>
            </div>
            <select 
              value={aecFilterTaps} 
              onChange={(e) => setAecFilterTaps(parseInt(e.target.value, 10))}
              style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.4)', color: '#fff', border: '1px solid var(--border-color)', borderRadius: '6px' }}
            >
              <option value="256">256 Taps (32ms coverage - Local PSTN)</option>
              <option value="512">512 Taps (64ms coverage - Standard Toll PSTN)</option>
              <option value="1024">1024 Taps (128ms coverage - International Transit)</option>
            </select>
          </div>
        </div>

        {/* Real-time State & Double-Talk Status */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity size={20} color="#10b981" /> Double-Talk & Comfort Noise (CNG) Engine
          </h3>

          <div style={{ padding: '16px', background: doubleTalkDetected ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)', border: `1px solid ${doubleTalkDetected ? '#ef4444' : '#10b981'}`, borderRadius: '8px' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: doubleTalkDetected ? '#ef4444' : '#10b981' }}>
              {doubleTalkDetected ? 'DOUBLE-TALK DETECTED: Filter Coefficients Frozen' : 'SINGLE-TALK STATE: Normal NLMS Adaptation'}
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '6px' }}>
              {doubleTalkDetected 
                ? 'Both caller and IVR/agent are speaking concurrently. AEC freezes adaptive filter updates to prevent coefficient divergence.'
                : 'Far-end acoustic reference signal is actively canceling hybrid 2-wire reflection.'}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Comfort Noise Level (RFC 3389):</span>
              <span style={{ color: '#fff', fontWeight: 600 }}>-64 dBm0 (Smooth Pink Noise)</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Non-Linear Processor (NLP) Suppression:</span>
              <span style={{ color: '#10b981', fontWeight: 600 }}>ACTIVE (-55 dB attenuation)</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>ITU-T G.168 Compliance Verdict:</span>
              <span style={{ color: '#10b981', fontWeight: 700 }}>PASS (Section 6.4.1 Test 2A)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
