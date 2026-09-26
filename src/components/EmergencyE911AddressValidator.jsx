import React from 'react';
import { ShieldAlert, MapPin, CheckCircle2 } from 'lucide-react';

export default function EmergencyE911AddressValidator() {
  const e911Records = [
    { number: '+1 (800) 555-0199', psap: 'Fairfax County PSAP #402', location: '10200 Main St, Fairfax, VA 22030', status: 'E911 DISPATCH VERIFIED' },
    { number: '+1 (212) 555-0144', psap: 'NYC Metro PSAP #101', location: '1 Penn Plaza, New York, NY 10119', status: 'E911 DISPATCH VERIFIED' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShieldAlert color="#f43f5e" size={28} /> Emergency E911 PSAP Location Dispatch Address Validator
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Audit Public Safety Answering Point (PSAP) emergency routing addresses and Kari's Law / RAY BAUM'S Act compliance.
          </p>
        </div>
        <span className="badge badge-emerald">E911 Compliant</span>
      </div>

      <div className="glass-card" style={{ padding: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.72rem' }}>
              <th style={{ padding: '10px' }}>DID Number</th>
              <th style={{ padding: '10px' }}>Assigned PSAP Authority</th>
              <th style={{ padding: '10px' }}>Registered Street Address</th>
              <th style={{ padding: '10px' }}>Dispatch Verification</th>
            </tr>
          </thead>
          <tbody>
            {e911Records.map((r, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px 10px', color: '#fff', fontWeight: 700 }}>{r.number}</td>
                <td style={{ padding: '12px 10px', color: '#06b6d4' }}>{r.psap}</td>
                <td style={{ padding: '12px 10px', color: 'var(--text-muted)' }}>{r.location}</td>
                <td style={{ padding: '12px 10px' }}><span className="badge badge-emerald">{r.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
