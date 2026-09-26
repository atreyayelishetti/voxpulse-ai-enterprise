import React from 'react';
import { Globe2 } from 'lucide-react';

export default function CarrierDNISLookup() {
  const dnisRoutes = [
    { dnis: '8005550199', mappedService: 'US Premium Banking IVR', carrierTrunk: 'AT&T Primary SIP', priority: 'P1 (Primary)' },
    { dnis: '8885550144', mappedService: 'Healthcare Policy Helpline', carrierTrunk: 'Verizon Business SIP', priority: 'P1 (Primary)' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Globe2 color="#06b6d4" size={28} /> Dialed Number Identification Service (DNIS) Router
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Map inbound DNIS digits to target contact center application routes and PBX extensions.
          </p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.72rem' }}>
              <th style={{ padding: '10px' }}>DNIS Digits</th>
              <th style={{ padding: '10px' }}>Mapped Target Application</th>
              <th style={{ padding: '10px' }}>Carrier SIP Trunk</th>
              <th style={{ padding: '10px' }}>Priority</th>
            </tr>
          </thead>
          <tbody>
            {dnisRoutes.map((r, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px 10px', color: '#06b6d4', fontWeight: 700, fontFamily: 'monospace' }}>{r.dnis}</td>
                <td style={{ padding: '12px 10px', color: '#fff' }}>{r.mappedService}</td>
                <td style={{ padding: '12px 10px', color: '#38bdf8' }}>{r.carrierTrunk}</td>
                <td style={{ padding: '12px 10px' }}><span className="badge badge-emerald">{r.priority}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
