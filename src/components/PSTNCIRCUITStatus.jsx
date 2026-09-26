import React from 'react';
import { Server, Activity } from 'lucide-react';

export default function PSTNCIRCUITStatus() {
  const circuits = [
    { span: 'T1 Span 1 (24 Channels)', framing: 'ESF / B8ZS', slipCount: 0, status: 'IN SERVICE (UP)' },
    { span: 'E1 Span 2 (30 Channels)', framing: 'CCS / HDB3', slipCount: 0, status: 'IN SERVICE (UP)' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Server color="#38bdf8" size={28} /> PSTN T1 / E1 PRI ISDN Circuit Framing & Slip Counter
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Monitor physical T1/E1 PSTN PRI circuit framing errors, clock slips, and D-channel signaling.
          </p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.72rem' }}>
              <th style={{ padding: '10px' }}>PSTN Circuit Span</th>
              <th style={{ padding: '10px' }}>Framing / Line Code</th>
              <th style={{ padding: '10px' }}>Clock Slips</th>
              <th style={{ padding: '10px' }}>Circuit State</th>
            </tr>
          </thead>
          <tbody>
            {circuits.map((c, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px 10px', color: '#fff', fontWeight: 700 }}>{c.span}</td>
                <td style={{ padding: '12px 10px', color: '#06b6d4' }}>{c.framing}</td>
                <td style={{ padding: '12px 10px', color: '#34d399', fontWeight: 700 }}>{c.slipCount} Slips</td>
                <td style={{ padding: '12px 10px' }}><span className="badge badge-emerald">{c.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
