import React from 'react';
import { ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';

export default function TelecomComplianceGDPR() {
  const policies = [
    { name: '30-Day Auto-Expunge Retention Policy', scope: 'All Call Recordings & Transcripts', status: 'ENFORCED (EU GDPR)' },
    { name: 'Right-to-be-Forgotten Erasure Workflow', scope: 'Caller Phone Number Hash Index', status: 'ACTIVE' },
    { name: 'EU-US Data Privacy Framework (DPF) Encryption', scope: 'TLS 1.3 & AES-256 Storage', status: 'VERIFIED' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShieldCheck color="#34d399" size={28} /> GDPR Telecom Data Privacy & Auto-Expunge Manager
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Automate GDPR 30-day recording retention policies, caller PII erasure requests, and data residency compliance.
          </p>
        </div>
        <span className="badge badge-emerald">GDPR Compliant</span>
      </div>

      <div className="glass-card" style={{ padding: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.72rem' }}>
              <th style={{ padding: '10px' }}>Compliance Policy Rule</th>
              <th style={{ padding: '10px' }}>Target Data Scope</th>
              <th style={{ padding: '10px' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {policies.map((p, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px 10px', color: '#fff', fontWeight: 700 }}>{p.name}</td>
                <td style={{ padding: '12px 10px', color: '#06b6d4' }}>{p.scope}</td>
                <td style={{ padding: '12px 10px' }}><span className="badge badge-emerald">{p.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
