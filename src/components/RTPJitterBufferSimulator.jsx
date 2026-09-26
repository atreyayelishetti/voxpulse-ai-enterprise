import React, { useState } from 'react';
import { Sliders, Activity, Zap, ShieldAlert, CheckCircle2, RotateCcw } from 'lucide-react';

export default function RTPJitterBufferSimulator() {
  const [jitterMs, setJitterMs] = useState(35);
  const [packetLoss, setPacketLoss] = useState(2);
  const [bufferMode, setBufferMode] = useState('adaptive');
  const [plcAlgorithm, setPlcAlgorithm] = useState('g711_app1');

  // Calculate buffer performance
  const targetBufferDelayMs = bufferMode === 'fixed' ? 40 : bufferMode === 'satellite' ? 250 : Math.max(20, Math.min(140, Math.round(jitterMs * 2.2)));
  const latePacketDiscardRate = bufferMode === 'fixed' && jitterMs > 40 ? ((jitterMs - 40) * 0.12).toFixed(1) : (0.0).toFixed(1);
  const audioGlitchRatePerHour = Math.round(packetLoss * 18 + parseFloat(latePacketDiscardRate) * 12);
  const effectiveMos = Math.max(1.0, (4.45 - (packetLoss * 0.15) - (parseFloat(latePacketDiscardRate) * 0.2) - (targetBufferDelayMs > 150 ? 0.4 : 0))).toFixed(2);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Activity color="#06b6d4" size={28} /> Adaptive RTP Jitter Buffer & Packet Loss Concealment (PLC) Simulator
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Simulate VoIP packet arrival variance, dynamic de-jitter queue expansion, late packet discards, and waveform interpolation.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Adaptive Buffer Delay</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#06b6d4', marginTop: '4px' }}>{targetBufferDelayMs} ms</div>
          <span className="badge badge-cyan" style={{ marginTop: '8px', display: 'inline-block' }}>De-Jitter Queue Depth</span>
        </div>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Late Packet Discard Rate</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: latePacketDiscardRate > 0 ? '#ef4444' : '#10b981', marginTop: '4px' }}>{latePacketDiscardRate}%</div>
          <span className={`badge ${latePacketDiscardRate > 0 ? 'badge-rose' : 'badge-emerald'}`} style={{ marginTop: '8px', display: 'inline-block' }}>
            {latePacketDiscardRate > 0 ? 'Buffer Underflow' : 'Zero Discards'}
          </span>
        </div>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Projected MOS Quality</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: effectiveMos >= 4.0 ? '#10b981' : '#f59e0b', marginTop: '4px' }}>{effectiveMos} MOS</div>
          <span className="badge badge-purple" style={{ marginTop: '8px', display: 'inline-block' }}>ITU-T P.863 POLQA</span>
        </div>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Audio Glitch Events</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f59e0b', marginTop: '4px' }}>{audioGlitchRatePerHour} / hr</div>
          <span className="badge badge-amber" style={{ marginTop: '8px', display: 'inline-block' }}>PLC Compensated</span>
        </div>
      </div>

      {/* Simulator Controls */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sliders size={20} color="#06b6d4" /> Network Impairment Parameters
          </h3>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Network Jitter Variance (PDV)</label>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#06b6d4' }}>{jitterMs} ms</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="120" 
              value={jitterMs} 
              onChange={(e) => setJitterMs(parseInt(e.target.value, 10))} 
              style={{ width: '100%', accentColor: '#06b6d4' }} 
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Random Packet Loss (%)</label>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f43f5e' }}>{packetLoss}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="15" 
              value={packetLoss} 
              onChange={(e) => setPacketLoss(parseInt(e.target.value, 10))} 
              style={{ width: '100%', accentColor: '#f43f5e' }} 
            />
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '8px' }}>Jitter Buffer Mode</label>
            <select 
              value={bufferMode} 
              onChange={(e) => setBufferMode(e.target.value)}
              style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.4)', color: '#fff', border: '1px solid var(--border-color)', borderRadius: '6px' }}
            >
              <option value="adaptive">Adaptive Jitter Buffer (Dynamic 20ms - 140ms)</option>
              <option value="fixed">Fixed Low-Latency (Static 40ms)</option>
              <option value="satellite">High-Latency Resilient (Static 250ms)</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '8px' }}>Concealment Algorithm (PLC)</label>
            <select 
              value={plcAlgorithm} 
              onChange={(e) => setPlcAlgorithm(e.target.value)}
              style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.4)', color: '#fff', border: '1px solid var(--border-color)', borderRadius: '6px' }}
            >
              <option value="g711_app1">ITU-T G.711 Appendix I (Pitch-Synchronous Interpolation)</option>
              <option value="repetition">Zero-Order Hold / Packet Repetition</option>
              <option value="silence">Silence Insertion (Zero Padding)</option>
            </select>
          </div>
        </div>

        {/* Live Packet Buffer Slot Visualization */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Zap size={20} color="#f59e0b" /> Real-time RTP Queue Slot Layout
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '10px', padding: '16px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px' }}>
            {Array.from({ length: 18 }, (_, i) => {
              const isLost = i === 4 || i === 11;
              const isLate = bufferMode === 'fixed' && jitterMs > 50 && i === 15;
              return (
                <div 
                  key={i} 
                  style={{ 
                    padding: '12px 6px', 
                    background: isLost 
                      ? 'rgba(239, 68, 68, 0.15)' 
                      : isLate 
                      ? 'rgba(245, 158, 11, 0.15)' 
                      : 'rgba(16, 185, 129, 0.15)',
                    border: `1px solid ${isLost ? '#ef4444' : isLate ? '#f59e0b' : '#10b981'}`,
                    borderRadius: '6px',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>PKT #{1024 + i}</div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: isLost ? '#ef4444' : isLate ? '#f59e0b' : '#10b981', marginTop: '2px' }}>
                    {isLost ? 'PLC' : isLate ? 'DROP' : 'OK'}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', gap: '16px', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '10px', height: '10px', background: '#10b981', borderRadius: '2px' }} /> Received In Window</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '10px', height: '10px', background: '#ef4444', borderRadius: '2px' }} /> PLC Concealed</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '10px', height: '10px', background: '#f59e0b', borderRadius: '2px' }} /> Late Discard</div>
          </div>
        </div>
      </div>
    </div>
  );
}
