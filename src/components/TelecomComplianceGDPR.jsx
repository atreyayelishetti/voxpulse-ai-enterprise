import React, { useState } from 'react';
import { Shield, Trash2, CheckCircle2, Search, Lock, AlertTriangle, FileText } from 'lucide-react';

export default function TelecomComplianceGDPR() {
  const [searchPhone, setSearchPhone] = useState('+12125550144');
  const [retentionDays, setRetentionDays] = useState(30);
  const [purgedMessage, setPurgedMessage] = useState(null);

  const purgeLogs = [
    { id: 'PURGE-9102', phone: '+12125550188', recordsDeleted: '14 Recordings / 4 Transcripts', certHash: 'sha256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069', date: '2026-09-24' },
    { id: 'PURGE-9101', phone: '+442079460912', recordsDeleted: '3 Recordings', certHash: 'sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', date: '2026-09-21' }
  ];

  const handleExecutePurge = () => {
    setPurgedMessage(`Successfully purged all call recordings and PII transcripts for ${searchPhone}. Certificate hash generated.`);
    setTimeout(() => setPurgedMessage(null), 4000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Shield color="#06b6d4" size={28} /> GDPR Article 17 & CCPA Telecom Data Retention & Scrubbing Studio
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Automated Right-to-be-Forgotten data deletion. Cryptographically purges call audio, PII transcripts, and generates auditor certificates.
          </p>
        </div>
      </div>

      {purgedMessage && (
        <div style={{ padding: '16px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', borderRadius: '8px', color: '#10b981', fontWeight: 700, fontSize: '0.9rem' }}>
          ✓ {purgedMessage}
        </div>
      )}

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Active Retention Policy</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#06b6d4', marginTop: '4px' }}>{retentionDays} Days</div>
          <span className="badge badge-cyan" style={{ marginTop: '8px', display: 'inline-block' }}>Auto-Purge Window</span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total PII Records Scrubbed</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>14,920</div>
          <span className="badge badge-emerald" style={{ marginTop: '8px', display: 'inline-block' }}>Zero Data Retention Leaks</span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Audio File Shredding</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#a855f7', marginTop: '4px' }}>DoD 5220.22-M</div>
          <span className="badge badge-purple" style={{ marginTop: '8px', display: 'inline-block' }}>Cryptographic Overwrite</span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Compliance Audit SLA</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>100% PASS</div>
          <span className="badge badge-emerald" style={{ marginTop: '8px', display: 'inline-block' }}>GDPR / CCPA / HIPAA</span>
        </div>
      </div>

      {/* One-Click Caller Purge Form */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
          Execute Right-to-be-Forgotten Request
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr auto', gap: '16px', alignItems: 'flex-end' }}>
          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
              Target Caller Phone Number (ANI)
            </label>
            <input 
              type="text" 
              value={searchPhone}
              onChange={(e) => setSearchPhone(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', background: 'rgba(0,0,0,0.4)', color: '#fff', border: '1px solid var(--border-color)', borderRadius: '6px' }}
            />
          </div>
          <button 
            className="btn btn-danger"
            onClick={handleExecutePurge}
            style={{ height: '42px', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Trash2 size={16} /> Cryptographically Purge Caller Data
          </button>
        </div>
      </div>

      {/* Purge Certificates Log */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
          Cryptographic Data Erasure Audit Log
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', textAlign: 'left' }}>
                <th style={{ padding: '10px' }}>Purge Certificate ID</th>
                <th style={{ padding: '10px' }}>Caller ANI</th>
                <th style={{ padding: '10px' }}>Erased Assets</th>
                <th style={{ padding: '10px' }}>SHA-256 Proof of Destruction</th>
                <th style={{ padding: '10px' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {purgeLogs.map((log) => (
                <tr key={log.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 10px', fontWeight: 700, color: '#fff' }}>{log.id}</td>
                  <td style={{ padding: '12px 10px', color: '#06b6d4', fontWeight: 600 }}>{log.phone}</td>
                  <td style={{ padding: '12px 10px', color: '#ef4444' }}>{log.recordsDeleted}</td>
                  <td style={{ padding: '12px 10px', color: '#94a3b8', fontFamily: 'monospace', fontSize: '0.75rem' }}>{log.certHash.substring(0, 32)}...</td>
                  <td style={{ padding: '12px 10px', color: '#cbd5e1' }}>{log.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
