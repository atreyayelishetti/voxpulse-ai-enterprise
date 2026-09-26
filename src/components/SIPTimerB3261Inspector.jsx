import React, { useState } from 'react';
import { Clock, Sliders, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';

export default function SIPTimerB3261Inspector() {
  const [t1Ms, setT1Ms] = useState(500);

  // Derived RFC 3261 timers
  const t2Ms = 4000;
  const t4Ms = 5000;
  const timerBMs = t1Ms * 64; // 32s default
  const timerFMs = t1Ms * 64;
  const timerHMs = t1Ms * 64;

  const retransmits = [
    { attempt: 1, delayMs: t1Ms, cumSec: (t1Ms / 1000).toFixed(2) },
    { attempt: 2, delayMs: t1Ms * 2, cumSec: ((t1Ms + t1Ms * 2) / 1000).toFixed(2) },
    { attempt: 3, delayMs: t1Ms * 4, cumSec: ((t1Ms * 7) / 1000).toFixed(2) },
    { attempt: 4, delayMs: t1Ms * 8, cumSec: ((t1Ms * 15) / 1000).toFixed(2) },
    { attempt: 5, delayMs: t1Ms * 16, cumSec: ((t1Ms * 31) / 1000).toFixed(2) },
    { attempt: 6, delayMs: t1Ms * 32, cumSec: ((t1Ms * 63) / 1000).toFixed(2) }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Clock color="#06b6d4" size={28} /> RFC 3261 SIP Protocol Timers & Retransmit Ladder
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Inspect client/server transaction timers. Calculates exponential backoff intervals and SIP 408 Request Timeout trigger thresholds.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Base RTT Estimate (Timer T1)</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#06b6d4', marginTop: '4px' }}>{t1Ms} ms</div>
          <span className="badge badge-cyan" style={{ marginTop: '8px', display: 'inline-block' }}>RFC 3261 Default</span>
        </div>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>INVITE Timeout (Timer B)</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f43f5e', marginTop: '4px' }}>{(timerBMs / 1000).toFixed(1)} sec</div>
          <span className="badge badge-rose" style={{ marginTop: '8px', display: 'inline-block' }}>SIP 408 Trigger</span>
        </div>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Non-INVITE Max Interval (Timer T2)</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#a855f7', marginTop: '4px' }}>{t2Ms / 1000} sec</div>
          <span className="badge badge-purple" style={{ marginTop: '8px', display: 'inline-block' }}>Ceiling Retransmit</span>
        </div>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Message Clearing (Timer T4)</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>{t4Ms / 1000} sec</div>
          <span className="badge badge-emerald" style={{ marginTop: '8px', display: 'inline-block' }}>Network Transit Flush</span>
        </div>
      </div>

      {/* Interactive Base T1 Slider */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sliders size={20} color="#06b6d4" /> Base Round-Trip Time Calibration (Timer T1)
        </h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Timer T1 Value (ms)</label>
          <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#06b6d4' }}>{t1Ms} ms</span>
        </div>
        <input 
          type="range" 
          min="100" 
          max="1200" 
          step="50"
          value={t1Ms} 
          onChange={(e) => setT1Ms(parseInt(e.target.value, 10))} 
          style={{ width: '100%', accentColor: '#06b6d4' }} 
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
          <span>100ms (Low-Latency LAN)</span>
          <span>500ms (Standard Internet PSTN)</span>
          <span>1200ms (GEO Satellite Links)</span>
        </div>
      </div>

      {/* Retransmit Ladder Diagram */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
          UDP INVITE Exponential Retransmission Schedule (Timer A ➔ B)
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
          {retransmits.map((r) => (
            <div key={r.attempt} style={{ padding: '16px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '8px', textAlign: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Attempt #{r.attempt}</span>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#38bdf8', marginTop: '4px' }}>+{r.delayMs} ms</div>
              <div style={{ fontSize: '0.75rem', color: '#10b981', marginTop: '4px' }}>T = {r.cumSec}s</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
