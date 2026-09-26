import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  FileCheck, 
  CheckCircle2, 
  AlertTriangle,
  Database
} from 'lucide-react';

const COMPLIANCE_STANDARDS = [
  { name: 'PCI-DSS v4.0 Compliance', desc: 'DTMF Security PIN & Credit Card Audio Redaction', status: 'COMPLIANT', score: '100%' },
  { name: 'HIPAA Security Rule', desc: 'Encrypted SIP TLS / SRTP Media Streams for Patient PII', status: 'COMPLIANT', score: '100%' },
  { name: 'GDPR / CCPA Data Retention', desc: 'Automated 30-Day Call Recording Purging Policy', status: 'COMPLIANT', score: '100%' }
];

export default function ComplianceAuditor() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="glass-panel glass-panel-glow" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck size={24} color="#34d399" />
              PCI-DSS, HIPAA & GDPR Compliance Auditor
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Verify regulatory compliance standards, DTMF audio PIN redaction, and encrypted media streams.
            </p>
          </div>

          <span className="badge badge-emerald" style={{ padding: '6px 12px' }}>
            100% Audit Score
          </span>
        </div>
      </div>

      {/* Grid of Standards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        {COMPLIANCE_STANDARDS.map((std, idx) => (
          <div key={idx} className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#34d399', textTransform: 'uppercase', marginBottom: '4px' }}>STANDARD</div>
            <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>{std.name}</div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4, marginBottom: '14px' }}>{std.desc}</p>
            <span className="badge badge-emerald"><CheckCircle2 size={12} /> {std.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
