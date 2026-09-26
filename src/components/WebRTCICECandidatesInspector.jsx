import React from 'react';
import { Globe2, ShieldCheck } from 'lucide-react';

export default function WebRTCICECandidatesInspector() {
  const candidates = [
    { type: 'host', ip: '192.168.1.10', port: 52140, protocol: 'UDP', priority: 2122260223, state: 'SELECTED' },
    { type: 'srflx (STUN)', ip: '74.125.200.1', port: 19302, protocol: 'UDP', priority: 1686052863, state: 'VERIFIED' },
    { type: 'relay (TURN)', ip: '34.200.10.4', port: 3478, protocol: 'UDP', priority: 41885439, state: 'BACKUP' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Globe2 color="#06b6d4" size={28} /> WebRTC STUN / TURN & ICE Candidate Connectivity Inspector
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Inspect ICE candidate harvesting, STUN NAT traversal, and TURN relay socket connectivity.
          </p>
        </div>
        <span className="badge badge-emerald">ICE Connected</span>
      </div>

      <div className="glass-card" style={{ padding: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.72rem' }}>
              <th style={{ padding: '10px' }}>Candidate Type</th>
              <th style={{ padding: '10px' }}>IP Endpoint</th>
              <th style={{ padding: '10px' }}>Port</th>
              <th style={{ padding: '10px' }}>Protocol</th>
              <th style={{ padding: '10px' }}>ICE Priority</th>
              <th style={{ padding: '10px' }}>State</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((c, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px 10px', color: '#fff', fontWeight: 700 }}>{c.type}</td>
                <td style={{ padding: '12px 10px', color: '#06b6d4', fontFamily: 'monospace' }}>{c.ip}</td>
                <td style={{ padding: '12px 10px', color: '#38bdf8' }}>{c.port}</td>
                <td style={{ padding: '12px 10px', color: 'var(--text-muted)' }}>{c.protocol}</td>
                <td style={{ padding: '12px 10px', color: '#a78bfa' }}>{c.priority}</td>
                <td style={{ padding: '12px 10px' }}><span className="badge badge-emerald">{c.state}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
