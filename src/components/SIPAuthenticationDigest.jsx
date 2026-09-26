import React from 'react';
import { Lock, ShieldCheck } from 'lucide-react';

export default function SIPAuthenticationDigest() {
  const authLogs = [
    { realm: 'voxpulse-sbc-realm', nonce: 'dcd98b71578b7d016001dcd6970636e6', algorithm: 'MD5 / SHA-256', response: '6629fae49393a05397450978507c4ef1', status: '401 AUTH CHALLENGE PASSED' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Lock color="#a78bfa" size={28} /> SIP HTTP Digest 401/407 Challenge Authentication Auditor
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Audit RFC 2617 / RFC 7616 Digest authentication nonce challenges and MD5 / SHA-256 response hashes.
          </p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.72rem' }}>
              <th style={{ padding: '10px' }}>Auth Realm</th>
              <th style={{ padding: '10px' }}>Nonce String</th>
              <th style={{ padding: '10px' }}>Hash Algorithm</th>
              <th style={{ padding: '10px' }}>Auth Outcome</th>
            </tr>
          </thead>
          <tbody>
            {authLogs.map((a, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px 10px', color: '#fff', fontWeight: 700 }}>{a.realm}</td>
                <td style={{ padding: '12px 10px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{a.nonce}</td>
                <td style={{ padding: '12px 10px', color: '#06b6d4' }}>{a.algorithm}</td>
                <td style={{ padding: '12px 10px' }}><span className="badge badge-emerald">{a.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
