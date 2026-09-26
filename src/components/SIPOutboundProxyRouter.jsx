import React from 'react';
import { Server, GitBranch } from 'lucide-react';

export default function SIPOutboundProxyRouter() {
  const proxies = [
    { proxy: 'sip:outbound1.us-east.voxpulse.io:5060', weight: 80, priority: 1, state: 'ACTIVE' },
    { proxy: 'sip:outbound2.us-west.voxpulse.io:5060', weight: 20, priority: 2, state: 'STANDBY' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <GitBranch color="#6366f1" size={28} /> Outbound SIP Proxy Load Balancing Router
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Configure priority-weighted outbound SIP proxies for geographic call routing.
          </p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.72rem' }}>
              <th style={{ padding: '10px' }}>Outbound Proxy URI</th>
              <th style={{ padding: '10px' }}>Traffic Weight</th>
              <th style={{ padding: '10px' }}>Failover Priority</th>
              <th style={{ padding: '10px' }}>State</th>
            </tr>
          </thead>
          <tbody>
            {proxies.map((p, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px 10px', color: '#fff', fontWeight: 700, fontFamily: 'monospace' }}>{p.proxy}</td>
                <td style={{ padding: '12px 10px', color: '#06b6d4', fontWeight: 700 }}>{p.weight}%</td>
                <td style={{ padding: '12px 10px', color: '#a78bfa' }}>P{p.priority}</td>
                <td style={{ padding: '12px 10px' }}><span className="badge badge-emerald">{p.state}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
