import React, { useState } from 'react';
import { VolumeX, Sliders, AlertTriangle, ShieldAlert, CheckCircle2, Play, Pause, BarChart2 } from 'lucide-react';

export default function CallRecordingSilenceMarker() {
  const [silenceThresholdDb, setSilenceThresholdDb] = useState(-48);
  const [minGapSeconds, setMinGapSeconds] = useState(2.5);
  const [isPlaying, setIsPlaying] = useState(false);

  const silenceEvents = [
    { startSec: 0.0, endSec: 1.8, duration: '1.8s', category: 'POST_RINGBACK_CONNECT', severity: 'NORMAL', reason: 'Carrier answer supervision connect delay' },
    { startSec: 8.4, endSec: 14.1, duration: '5.7s', category: 'DATABASE_BACKEND_STALL', severity: 'CRITICAL', reason: 'Core banking account balance API timeout' },
    { startSec: 22.0, endSec: 24.9, duration: '2.9s', category: 'USER_DELIBERATION', severity: 'WARNING', reason: 'Caller listening to multi-tier menu prompt' },
    { startSec: 36.2, endSec: 39.5, duration: '3.3s', category: 'SIP_REFER_TRANSFER', severity: 'WARNING', reason: 'Agent CTI bridge ringback dead air' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <VolumeX color="#f43f5e" size={28} /> Automated Dead-Air & Audio Silence Gap Marker
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Acoustic silence energy detector. Classifies dead air intervals caused by backend API stalls, slow SIP transfers, or caller hesitation.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Call Dead Air</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f43f5e', marginTop: '4px' }}>13.7s (22.8%)</div>
          <span className="badge badge-rose" style={{ marginTop: '8px', display: 'inline-block' }}>SLA Violation &gt; 15%</span>
        </div>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Longest Silence Spike</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f59e0b', marginTop: '4px' }}>5.7s Critical</div>
          <span className="badge badge-amber" style={{ marginTop: '8px', display: 'inline-block' }}>Backend CRM Lookup</span>
        </div>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Silence Sensitivity Threshold</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#06b6d4', marginTop: '4px' }}>{silenceThresholdDb} dBFS</div>
          <span className="badge badge-cyan" style={{ marginTop: '8px', display: 'inline-block' }}>Noise Floor Cutoff</span>
        </div>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Caller Abandonment Risk</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ef4444', marginTop: '4px' }}>64% High</div>
          <span className="badge badge-rose" style={{ marginTop: '8px', display: 'inline-block' }}>5s+ Silence Drop-off</span>
        </div>
      </div>

      {/* Controls & Thresholds */}
      <div className="glass-card" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button 
            className="btn btn-primary"
            onClick={() => setIsPlaying(!isPlaying)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            {isPlaying ? 'Pause Audio Analysis' : 'Play & Scan Session'}
          </button>
          <span style={{ fontSize: '0.85rem', color: isPlaying ? '#10b981' : 'var(--text-muted)' }}>
            {isPlaying ? '▶ Acoustic scanner active (60 FPS)' : '⏸ Playback paused'}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sliders size={16} color="#06b6d4" /> Silence Floor Threshold:
          </label>
          <input 
            type="range" 
            min="-60" 
            max="-30" 
            step="1"
            value={silenceThresholdDb} 
            onChange={(e) => setSilenceThresholdDb(Number(e.target.value))}
            style={{ accentColor: '#06b6d4', width: '120px' }}
          />
          <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#06b6d4', minWidth: '60px' }}>
            {silenceThresholdDb} dBFS
          </span>
        </div>
      </div>

      {/* Waveform Timeline Visualizer with Red Highlighted Silence Bars */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>
            60-Second Call Session Acoustic Timeline
          </h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Call ID: rec_session_881923_us</span>
        </div>

        <div style={{ position: 'relative', height: '80px', background: 'rgba(0,0,0,0.4)', borderRadius: '8px', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
          {/* Active speech bars */}
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', gap: '3px', padding: '0 8px' }}>
            {Array.from({ length: 60 }, (_, i) => {
              const isSilence = (i >= 8 && i <= 14) || (i >= 22 && i <= 24) || (i >= 36 && i <= 39);
              const height = isSilence ? 4 : Math.sin(i / 2) * 28 + 36;
              return (
                <div 
                  key={i} 
                  style={{ 
                    flex: 1, 
                    height: `${height}px`, 
                    background: isSilence ? '#ef4444' : '#06b6d4',
                    borderRadius: '2px'
                  }} 
                />
              );
            })}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px' }}>
          <span>00:00</span>
          <span>00:15</span>
          <span>00:30</span>
          <span>00:45</span>
          <span>01:00</span>
        </div>
      </div>

      {/* Silence Gaps Table */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
          Detected Silence & Dead-Air Event Log
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', textAlign: 'left' }}>
                <th style={{ padding: '10px' }}>Timeline Window</th>
                <th style={{ padding: '10px' }}>Duration</th>
                <th style={{ padding: '10px' }}>Root Cause Classification</th>
                <th style={{ padding: '10px' }}>Diagnostic Details</th>
                <th style={{ padding: '10px' }}>Severity</th>
              </tr>
            </thead>
            <tbody>
              {silenceEvents.map((evt, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 10px', fontWeight: 600, color: '#fff' }}>{evt.startSec}s - {evt.endSec}s</td>
                  <td style={{ padding: '12px 10px', color: '#f59e0b', fontWeight: 700 }}>{evt.duration}</td>
                  <td style={{ padding: '12px 10px', color: '#06b6d4' }}>{evt.category}</td>
                  <td style={{ padding: '12px 10px', color: '#94a3b8' }}>{evt.reason}</td>
                  <td style={{ padding: '12px 10px' }}>
                    <span className={`badge ${evt.severity === 'CRITICAL' ? 'badge-rose' : evt.severity === 'WARNING' ? 'badge-amber' : 'badge-emerald'}`}>
                      {evt.severity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
