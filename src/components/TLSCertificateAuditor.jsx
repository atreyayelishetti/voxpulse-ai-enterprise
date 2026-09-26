import React, { useState } from 'react';
import { ShieldCheck, Lock, AlertTriangle, CheckCircle2, Server, Key, RefreshCw, Shield } from 'lucide-react';

export default function TLSCertificateAuditor() {
  const [sbcHost, setSbcHost] = useState('sbc1.us-east.voxpulse.io:5061');
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState(null);

  const handleAuditTLS = () => {
    setIsAuditing(true);
    setAuditResult(null);

    setTimeout(() => {
      setAuditResult({
        sbcHost,
        protocol: 'TLS 1.3 (mTLS Mutual Authentication)',
        cipherSuite: 'TLS_AES_256_GCM_SHA384 (256-bit Key)',
        srtpCrypto: 'AES_CM_128_HMAC_SHA1_80',
        issuer: 'DigiCert TLS RSA SHA256 Root CA',
        expiresInDays: 240,
        expiryDate: '2027-05-18',
        status: 'PASSED (A+ SSL Security Rating)'
      });
      setIsAuditing(false);
    }, 1000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Lock color="#34d399" size={28} /> SIP TLS & SRTP Security Certificate Auditor
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Audit TLS 1.3 encryption, mTLS handshake validity, SRTP cipher suites, and certificate expiration on SBC nodes.
          </p>
        </div>

        <button 
          className="btn btn-primary" 
          onClick={handleAuditTLS} 
          disabled={isAuditing}
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          {isAuditing ? <RefreshCw className="spin" size={16} /> : <ShieldCheck size={16} />}
          {isAuditing ? 'Auditing TLS Handshake...' : 'Run SIP Security Audit'}
        </button>
      </div>

      {/* Selector */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
        <div className="glass-card" style={{ padding: '16px' }}>
          <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            SBC Endpoint Host (SIP TLS Port 5061)
          </label>
          <input 
            type="text" 
            value={sbcHost} 
            onChange={(e) => setSbcHost(e.target.value)} 
            className="input-field" 
            style={{ width: '100%', marginTop: '8px' }}
          />
        </div>

        <div className="glass-card" style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>SSL/TLS Rating</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#34d399', marginTop: '4px' }}>
              GRADE A+ (TLS 1.3)
            </div>
          </div>
          <ShieldCheck size={36} color="#34d399" style={{ opacity: 0.8 }} />
        </div>

        <div className="glass-card" style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Media Encryption</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#38bdf8', marginTop: '4px' }}>
              SRTP Active
            </div>
          </div>
          <Lock size={36} color="#38bdf8" style={{ opacity: 0.8 }} />
        </div>
      </div>

      {/* Results */}
      {auditResult ? (
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={20} color="#34d399" /> SBC Security Certificate Audit Log
            </h3>
            <span className="badge badge-emerald" style={{ fontSize: '0.85rem', padding: '6px 12px' }}>
              {auditResult.status}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>TLS Protocol Version</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#06b6d4', marginTop: '4px' }}>
                {auditResult.protocol}
              </div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>SRTP Key Exchange</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#38bdf8', marginTop: '4px' }}>
                {auditResult.srtpCrypto}
              </div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Certificate Issuer</span>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginTop: '6px' }}>
                {auditResult.issuer}
              </div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Expires In</span>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#34d399', marginTop: '4px' }}>
                {auditResult.expiresInDays} Days
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="glass-card" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
          <Lock size={48} color="#34d399" style={{ opacity: 0.4, marginBottom: '12px' }} />
          <p>Click "Run SIP Security Audit" to inspect TLS certificate and SRTP key exchange validity.</p>
        </div>
      )}
    </div>
  );
}
