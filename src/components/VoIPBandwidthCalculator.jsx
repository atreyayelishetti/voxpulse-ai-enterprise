import React, { useState } from 'react';
import { Cpu, Calculator } from 'lucide-react';

export default function VoIPBandwidthCalculator() {
  const [codec, setCodec] = useState('G.711u');
  const [concurrentCalls, setConcurrentCalls] = useState(100);

  const codecBandwidthMap = {
    'G.711u': { kbpsPerCall: 87.2, totalMbps: ((87.2 * concurrentCalls) / 1000).toFixed(2) },
    'G.729': { kbpsPerCall: 31.2, totalMbps: ((31.2 * concurrentCalls) / 1000).toFixed(2) },
    'Opus HD': { kbpsPerCall: 110.0, totalMbps: ((110.0 * concurrentCalls) / 1000).toFixed(2) }
  };

  const current = codecBandwidthMap[codec] || codecBandwidthMap['G.711u'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Calculator color="#38bdf8" size={28} /> VoIP Codec Ethernet & IP Overhead Bandwidth Calculator
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Calculate total network bandwidth throughput requirements including IP/UDP/RTP headers.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
        <div className="glass-card" style={{ padding: '16px' }}>
          <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Codec Selection</label>
          <select value={codec} onChange={(e) => setCodec(e.target.value)} className="input-field" style={{ width: '100%', marginTop: '8px' }}>
            <option value="G.711u">G.711u (64 kbps PCM)</option>
            <option value="G.729">G.729 (8 kbps CS-ACELP)</option>
            <option value="Opus HD">Opus HD Wideband</option>
          </select>
        </div>

        <div className="glass-card" style={{ padding: '16px' }}>
          <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Concurrent Calls Count</label>
          <input type="number" value={concurrentCalls} onChange={(e) => setConcurrentCalls(parseInt(e.target.value) || 0)} className="input-field" style={{ width: '100%', marginTop: '8px' }} />
        </div>

        <div className="glass-card" style={{ padding: '16px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Required Bandwidth</span>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#34d399', marginTop: '4px' }}>{current.totalMbps} Mbps</div>
        </div>
      </div>
    </div>
  );
}
