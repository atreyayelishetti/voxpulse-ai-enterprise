import React from 'react';
import { Globe2 } from 'lucide-react';

export default function TelecomNumberPortingTracker() {
  const ports = [
    { orderId: 'lnp-901', did: '+1 (800) 555-0199', losingCarrier: 'Verizon', winningCarrier: 'AT&T Business', FOCDate: '2026-09-28', status: 'FOC CONFIRMED' },
    { orderId: 'lnp-902', did: '+1 (212) 555-0144', losingCarrier: 'Lumen', winningCarrier: 'Twilio Direct', FOCDate: '2026-09-30', status: 'IN PROGRESS' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Globe2 color="#38bdf8" size={28} /> Local Number Portability (LNP) FOC Workflow Tracker
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Track Firm Order Commitment (FOC) dates and carrier porting status.
          </p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.72rem' }}>
              <th style={{ padding: '10px' }}>Order ID</th>
              <th style={{ padding: '10px' }}>DID Number</th>
              <th style={{ padding: '10px' }}>Losing SP</th>
              <th style={{ padding: '10px' }}>Winning SP</th>
              <th style={{ padding: '10px' }}>FOC Date</th>
              <th style={{ padding: '10px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {ports.map((p, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px 10px', color: '#fff', fontWeight: 700 }}>{p.orderId}</td>
                <td style={{ padding: '12px 10px', color: '#06b6d4' }}>{p.did}</td>
                <td style={{ padding: '12px 10px', color: 'var(--text-muted)' }}>{p.losingCarrier}</td>
                <td style={{ padding: '12px 10px', color: '#38bdf8' }}>{p.winningCarrier}</td>
                <td style={{ padding: '12px 10px', color: '#a78bfa' }}>{p.FOCDate}</td>
                <td style={{ padding: '12px 10px' }}><span className="badge badge-emerald">{p.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
