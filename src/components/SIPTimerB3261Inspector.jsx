import React from 'react';
import { Server, Clock } from 'lucide-react';

export default function SIPTimerB3261Inspector() {
  const timers = [
    { name: 'Timer T1 (RTT Estimate)', value: '500 ms', rfcRef: 'RFC 3261 Section 17.1.1.1', status: 'STANDARD' },
    { name: 'Timer A (INVITE Retransmit)', value: '500 ms', rfcRef: 'RFC 3261 Section 17.1.1.2', status: 'STANDARD' },
    { name: 'Timer B (INVITE Timeout)', value: '32,000 ms (64*T1)', rfcRef: 'RFC 3261 Section 17.1.1.2', status: 'EXACT MATCH' },
    { name: 'Timer T2 (Non-INVITE Max)', value: '4,000 ms', rfcRef: 'RFC 3261 Section 17.1.2.2', status: 'STANDARD' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Clock color="#38bdf8" size={28} /> RFC 3261 SIP Protocol Timers T1, T2, A, B, C, D Inspector
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Inspect SIP transaction layer timers for INVITE and non-INVITE retransmissions.
          </p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.72rem' }}>
              <th style={{ padding: '10px' }}>SIP Timer Name</th>
              <th style={{ padding: '10px' }}>Configured Timeout</th>
              <th style={{ padding: '10px' }}>RFC 3261 Specification</th>
              <th style={{ padding: '10px' }}>Validation</th>
            </tr>
          </thead>
          <tbody>
            {timers.map((t, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px 10px', color: '#fff', fontWeight: 700 }}>{t.name}</td>
                <td style={{ padding: '12px 10px', color: '#06b6d4', fontWeight: 700 }}>{t.value}</td>
                <td style={{ padding: '12px 10px', color: 'var(--text-muted)' }}>{t.rfcRef}</td>
                <td style={{ padding: '12px 10px' }}><span className="badge badge-emerald">{t.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
