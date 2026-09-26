import React, { useState } from 'react';
import { Flame, Server } from 'lucide-react';

export default function SIPTrunkBurstingEngine() {
  const [channels, setChannels] = useState(250);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Flame color="#f43f5e" size={28} /> Dynamic SIP Channel Bursting & Capacity Manager
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Configure automatic SIP trunk bursting capacity during high-volume call surges.
          </p>
        </div>
        <span className="badge badge-emerald">Bursting Elastic</span>
      </div>

      <div className="glass-card" style={{ padding: '24px' }}>
        <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Active Bursting Limit (Concurrent Channels)</label>
        <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f43f5e', margin: '8px 0' }}>{channels} Channels</div>
        <input type="range" min="50" max="1000" step="25" value={channels} onChange={(e) => setChannels(parseInt(e.target.value))} style={{ width: '100%', accentColor: '#f43f5e' }} />
      </div>
    </div>
  );
}
