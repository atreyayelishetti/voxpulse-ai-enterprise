import React, { useState } from 'react';
import { Bell, ShieldAlert, CheckCircle2, Sliders, AlertTriangle } from 'lucide-react';

export default function RealtimeMOSAlarmThresholds() {
  const [minMOS, setMinMOS] = useState(3.8);
  const [maxJitter, setMaxJitter] = useState(60);
  const [maxPacketLoss, setMaxPacketLoss] = useState(5);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Bell color="#f43f5e" size={28} /> Realtime MOS Alarm Thresholds & Trigger Manager
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Configure automatic PagerDuty / Slack alert triggers when PSTN MOS audio quality drops below SLA thresholds.
          </p>
        </div>

        <span className="badge badge-emerald" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
          Monitoring Engine Active
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
        <div className="glass-card" style={{ padding: '20px' }}>
          <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>Minimum Acceptable MOS Score</label>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#34d399', margin: '8px 0' }}>{minMOS} MOS</div>
          <input type="range" min="2.0" max="4.5" step="0.1" value={minMOS} onChange={(e) => setMinMOS(parseFloat(e.target.value))} style={{ width: '100%', accentColor: '#34d399' }} />
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>Max Allowed Jitter (ms)</label>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#38bdf8', margin: '8px 0' }}>{maxJitter} ms</div>
          <input type="range" min="10" max="200" step="5" value={maxJitter} onChange={(e) => setMaxJitter(parseInt(e.target.value))} style={{ width: '100%', accentColor: '#38bdf8' }} />
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>Max Allowed Packet Loss (%)</label>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f43f5e', margin: '8px 0' }}>{maxPacketLoss}%</div>
          <input type="range" min="1" max="25" step="1" value={maxPacketLoss} onChange={(e) => setMaxPacketLoss(parseInt(e.target.value))} style={{ width: '100%', accentColor: '#f43f5e' }} />
        </div>
      </div>
    </div>
  );
}
