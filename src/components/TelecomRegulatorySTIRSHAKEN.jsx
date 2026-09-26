import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function TelecomRegulatorySTIRSHAKEN() {
  const stirTokens = [
    { did: '+1 (800) 555-0199', attestation: 'A (Full Attestation)', origId: '9104-att-cert', identityToken: 'eyJhbGciOiJFUzI1NiIsInR5cCI6InBhc3Nwb3J0In0...', status: 'VERIFIED (PASS)' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShieldCheck color="#34d399" size={28} /> STIR / SHAKEN Caller ID Authentication Token Inspector
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Inspect PASSporT identity tokens and A/B/C attestation levels for Robocall Prevention compliance.
          </p>
        </div>
        <span className="badge badge-emerald">Attestation Level A</span>
      </div>

      <div className="glass-card" style={{ padding: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.72rem' }}>
              <th style={{ padding: '10px' }}>Caller ID DID</th>
              <th style={{ padding: '10px' }}>STIR Attestation Level</th>
              <th style={{ padding: '10px' }}>Origination Cert ID</th>
              <th style={{ padding: '10px' }}>Identity PASSporT Token</th>
              <th style={{ padding: '10px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {stirTokens.map((t, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px 10px', color: '#fff', fontWeight: 700 }}>{t.did}</td>
                <td style={{ padding: '12px 10px', color: '#34d399', fontWeight: 700 }}>{t.attestation}</td>
                <td style={{ padding: '12px 10px', color: '#06b6d4' }}>{t.origId}</td>
                <td style={{ padding: '12px 10px', color: 'var(--text-muted)', fontFamily: 'monospace', fontSize: '0.75rem' }}>{t.identityToken}</td>
                <td style={{ padding: '12px 10px' }}><span className="badge badge-emerald">{t.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
