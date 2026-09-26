import React from 'react';
import { Activity, Globe2 } from 'lucide-react';

export default function VoIPMOSMap3D() {
  const regions = [
    { region: 'North America (US-East)', mos: 4.45, status: 'EXCELLENT' },
    { region: 'Europe (Frankfurt)', mos: 4.38, status: 'EXCELLENT' },
    { region: 'APAC (Sydney)', mos: 4.12, status: 'GOOD' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Activity color="#06b6d4" size={28} /> Global Spatial Telephony MOS Distribution Visualizer
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Multi-region spatial visualization of Mean Opinion Score (MOS) audio quality levels across continental POPs.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        {regions.map((r, i) => (
          <div key={i} className="glass-card" style={{ padding: '20px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{r.region}</span>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#34d399', marginTop: '6px' }}>{r.mos} MOS</div>
            <span className="badge badge-emerald" style={{ marginTop: '8px', display: 'inline-block' }}>{r.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
