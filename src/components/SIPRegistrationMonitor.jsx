import React from 'react';
import { Server, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function SIPRegistrationMonitor() {
  const registrars = [
    { aor: 'sip:agent101@voxpulse.io', contact: 'sip:agent101@192.168.1.10:5060', expires: '3600s', status: 'REGISTERED' },
    { aor: 'sip:sbc_primary@voxpulse.io', contact: 'sip:sbc1@10.0.4.1:5061', expires: '1800s', status: 'REGISTERED' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Server color="#34d399" size={28} /> SIP User Agent Registrar & Expiry Tracker
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Track active SIP REGISTER Address-of-Record (AOR) bindings and binding expiration timeouts.
          </p>
        </div>
        <span className="badge badge-emerald">Registrar Healthy</span>
      </div>

      <div className="glass-card" style={{ padding: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.72rem' }}>
              <th style={{ padding: '10px' }}>Address of Record (AOR)</th>
              <th style={{ padding: '10px' }}>Binding Contact URI</th>
              <th style={{ padding: '10px' }}>Expiry Remaining</th>
              <th style={{ padding: '10px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {registrars.map((r, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px 10px', color: '#fff', fontWeight: 700 }}>{r.aor}</td>
                <td style={{ padding: '12px 10px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{r.contact}</td>
                <td style={{ padding: '12px 10px', color: '#38bdf8' }}>{r.expires}</td>
                <td style={{ padding: '12px 10px' }}><span className="badge badge-emerald">{r.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
