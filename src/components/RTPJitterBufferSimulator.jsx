import React, { useState } from 'react';
import { Activity, Radio, Cpu, CheckCircle2 } from 'lucide-react';

export default function RTPJitterBufferSimulator() {
  const [bufferSizeMs, setBufferSizeMs] = useState(60);
  const [jitterMs, setJitterMs] = useState(45);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Activity color="#06b6d4" size={28} /> RTP Adaptive Jitter Buffer & Packet Reordering Simulator
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Simulate adaptive jitter buffer size adjustment, late packet concealment, and buffer underrun/overrun penalties.
          </p>
        </div>
        <span className="badge badge-emerald">Jitter Engine Active</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div className="glass-card" style={{ padding: '20px' }}>
          <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>Adaptive Buffer Size (ms)</label>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#34d399', margin: '8px 0' }}>{bufferSizeMs} ms</div>
          <input type="range" min="20" max="200" value={bufferSizeMs} onChange={(e) => setBufferSizeMs(parseInt(e.target.value))} style={{ width: '100%', accentColor: '#34d399' }} />
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <label style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>Network Jitter Delay (ms)</label>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#38bdf8', margin: '8px 0' }}>{jitterMs} ms</div>
          <input type="range" min="0" max="150" value={jitterMs} onChange={(e) => setJitterMs(parseInt(e.target.value))} style={{ width: '100%', accentColor: '#38bdf8' }} />
        </div>
      </div>
    </div>
  );
}
