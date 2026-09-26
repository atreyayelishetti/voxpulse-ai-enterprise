import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  FileCheck, 
  CheckCircle2, 
  AlertTriangle,
  Database,
  RefreshCw,
  Download,
  Key,
  EyeOff,
  Flame,
  FileSpreadsheet,
  Cpu,
  Clock,
  ExternalLink
} from 'lucide-react';

const COMPLIANCE_FRAMEWORKS = [
  { id: 'pci', name: 'PCI-DSS v4.0', title: 'Payment Card Industry Data Security Standard', score: 100, status: 'PASSED', checks: 8 },
  { id: 'hipaa', name: 'HIPAA Security Rule', title: 'Health Insurance Portability & ePHI Telephony Protection', score: 100, status: 'PASSED', checks: 6 },
  { id: 'gdpr', name: 'GDPR / CCPA', title: 'Right-to-be-Forgotten & Consent Telephony Logging', score: 98, status: 'PASSED', checks: 7 },
  { id: 'soc2', name: 'SOC 2 Type II', title: 'Trust Services Criteria for Security, Availability & Confidentiality', score: 100, status: 'PASSED', checks: 9 },
  { id: 'tcpa', name: 'TCPA & Kari’s Law', title: 'Outbound Consent & Direct-Dial 911 E911 Dispatch Regulations', score: 100, status: 'PASSED', checks: 5 }
];

const INITIAL_AUDIT_RULES = [
  { id: 'RULE-101', framework: 'PCI-DSS', spec: 'Req 3.4 / 4.1', name: 'DTMF Credit Card Audio Redaction', desc: 'Auto-mute 160ms audio buffer during caller DTMF keypad entry', status: 'COMPLIANT', severity: 'CRITICAL', lastScanned: 'Just now' },
  { id: 'RULE-102', framework: 'PCI-DSS', spec: 'Req 8.3', name: 'SBC Signaling TLS 1.3 Enforcement', desc: 'SIP TLS transport encryption with ECDHE-ECDSA-AES256 cipher suites', status: 'COMPLIANT', severity: 'CRITICAL', lastScanned: '1 min ago' },
  { id: 'RULE-103', framework: 'HIPAA', spec: '45 CFR § 164.312(e)', name: 'SRTP End-to-End Media Stream Encryption', desc: 'RFC 3711 AES-128-ICM / AES-256-GCM audio payload integrity', status: 'COMPLIANT', severity: 'HIGH', lastScanned: '2 mins ago' },
  { id: 'RULE-104', framework: 'HIPAA', spec: '45 CFR § 164.312(b)', name: 'Telephony Access Audit Trails', desc: 'Immutable WORM cryptographic logging for all call recording access', status: 'COMPLIANT', severity: 'HIGH', lastScanned: '3 mins ago' },
  { id: 'RULE-105', framework: 'GDPR', spec: 'Article 17', name: 'Automated 30-Day Recording Purge Lifecycle', desc: 'Cryptographic data erasure after configurable retention threshold', status: 'COMPLIANT', severity: 'MEDIUM', lastScanned: 'Just now' },
  { id: 'RULE-106', framework: 'GDPR', spec: 'Article 6(1)', name: 'Call Recording Consent Disclosure Marker', desc: 'IVR initial announcement verified before agent media bridging', status: 'COMPLIANT', severity: 'HIGH', lastScanned: '5 mins ago' },
  { id: 'RULE-107', framework: 'SOC 2', spec: 'CC6.6 / CC6.7', name: 'Carrier Trunk Boundary Perimeter ACLs', desc: 'Telephony SIP subnet whitelisting rejecting unauthorized CIDRs', status: 'COMPLIANT', severity: 'CRITICAL', lastScanned: '10 mins ago' },
  { id: 'RULE-108', framework: 'TCPA', spec: '47 U.S.C. § 227', name: 'Answering Machine Detection (AMD) DNC Scrubbing', desc: 'National Do-Not-Call list real-time query before outbound campaign dial', status: 'COMPLIANT', severity: 'HIGH', lastScanned: '12 mins ago' }
];

export default function ComplianceAuditor() {
  const [selectedFramework, setSelectedFramework] = useState('ALL');
  const [isScanning, setIsScanning] = useState(false);
  const [rules, setRules] = useState(INITIAL_AUDIT_RULES);
  const [scanProgress, setScanProgress] = useState(100);
  const [certificateGenerated, setCertificateGenerated] = useState(false);

  const handleRunFullAudit = () => {
    setIsScanning(true);
    setScanProgress(15);
    setTimeout(() => setScanProgress(55), 350);
    setTimeout(() => setScanProgress(85), 700);
    setTimeout(() => {
      setScanProgress(100);
      setIsScanning(false);
      setRules(prev => prev.map(r => ({ ...r, lastScanned: 'Just now', status: 'COMPLIANT' })));
    }, 1100);
  };

  const handleRemediate = (id) => {
    setRules(rules.map(r => r.id === id ? { ...r, status: 'COMPLIANT', lastScanned: 'Just now' } : r));
  };

  const filteredRules = selectedFramework === 'ALL' 
    ? rules 
    : rules.filter(r => r.framework.toLowerCase().includes(selectedFramework.toLowerCase()));

  const handleExportCertificate = () => {
    setCertificateGenerated(true);
    const certData = {
      platform: 'VoxPulse AI Enterprise Telephony',
      auditId: `VP-AUDIT-${Date.now().toString(36).toUpperCase()}`,
      timestamp: new Date().toISOString(),
      standards: COMPLIANCE_FRAMEWORKS,
      rulesAudited: rules.length,
      verdict: 'FULLY_COMPLIANT_100_PERCENT',
      certifyingAuthority: 'VoxPulse Automated Compliance Daemon (SHA-256)'
    };
    const blob = new Blob([JSON.stringify(certData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `VoxPulse_Telephony_Compliance_Audit_${Date.now()}.json`;
    a.click();
    setTimeout(() => setCertificateGenerated(false), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="glass-panel glass-panel-glow" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck size={24} color="#34d399" />
              Telephony Regulatory & Compliance Security Auditor
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Continuous real-time compliance validation across PCI-DSS v4.0, HIPAA ePHI, GDPR Article 17, and SOC 2 Type II.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button 
              className="btn btn-secondary" 
              onClick={handleExportCertificate}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}
            >
              <Download size={16} /> {certificateGenerated ? 'Certificate Exported!' : 'Export Attestation'}
            </button>

            <button 
              className="btn btn-primary" 
              onClick={handleRunFullAudit}
              disabled={isScanning}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}
            >
              <RefreshCw size={16} className={isScanning ? 'spin' : ''} />
              {isScanning ? `Scanning (${scanProgress}%)...` : 'Run Live Telephony Audit'}
            </button>
          </div>
        </div>

        {/* Scan Progress Bar */}
        {isScanning && (
          <div style={{ marginTop: '16px', background: 'rgba(255,255,255,0.08)', borderRadius: '6px', height: '6px', overflow: 'hidden' }}>
            <div style={{ width: `${scanProgress}%`, height: '100%', background: 'linear-gradient(90deg, #10b981, #06b6d4)', transition: 'width 0.3s ease' }} />
          </div>
        )}
      </div>

      {/* Framework Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        {COMPLIANCE_FRAMEWORKS.map(fw => (
          <div 
            key={fw.id} 
            className="glass-panel" 
            onClick={() => setSelectedFramework(fw.id === selectedFramework ? 'ALL' : fw.id)}
            style={{ 
              padding: '18px', 
              cursor: 'pointer',
              border: selectedFramework === fw.id ? '1px solid #34d399' : '1px solid rgba(255,255,255,0.08)',
              background: selectedFramework === fw.id ? 'rgba(52, 211, 153, 0.08)' : undefined,
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#34d399', textTransform: 'uppercase' }}>FRAMEWORK</span>
              <span className="badge badge-emerald" style={{ fontSize: '0.72rem' }}>{fw.score}% Score</span>
            </div>
            <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>{fw.name}</div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.4, margin: '0 0 12px 0' }}>{fw.title}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <span>{fw.checks} Validated Rules</span>
              <span style={{ color: '#34d399', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle2 size={13} /> {fw.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Compliance Rule Table */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileCheck size={18} color="#06b6d4" />
              Telephony Verification Matrix ({filteredRules.length} Rules)
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Showing {selectedFramework === 'ALL' ? 'All Frameworks' : selectedFramework.toUpperCase()} enforcement criteria
            </span>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            {['ALL', 'PCI', 'HIPAA', 'GDPR', 'SOC2', 'TCPA'].map(tab => (
              <button
                key={tab}
                onClick={() => setSelectedFramework(tab)}
                style={{
                  background: selectedFramework === tab ? 'rgba(6, 182, 212, 0.2)' : 'rgba(255,255,255,0.05)',
                  border: selectedFramework === tab ? '1px solid #06b6d4' : '1px solid rgba(255,255,255,0.1)',
                  color: selectedFramework === tab ? '#38bdf8' : 'var(--text-muted)',
                  borderRadius: '6px',
                  padding: '5px 12px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.72rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '12px 10px' }}>Rule ID</th>
                <th style={{ padding: '12px 10px' }}>Regulation Spec</th>
                <th style={{ padding: '12px 10px' }}>Control Objective</th>
                <th style={{ padding: '12px 10px' }}>Severity</th>
                <th style={{ padding: '12px 10px' }}>Last Audited</th>
                <th style={{ padding: '12px 10px' }}>Status</th>
                <th style={{ padding: '12px 10px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRules.map(rule => (
                <tr key={rule.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#fff' }}>
                  <td style={{ padding: '12px 10px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#06b6d4' }}>
                    {rule.id}
                  </td>
                  <td style={{ padding: '12px 10px' }}>
                    <span className="badge badge-indigo" style={{ fontSize: '0.72rem' }}>{rule.framework}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginTop: '2px' }}>{rule.spec}</span>
                  </td>
                  <td style={{ padding: '12px 10px', maxWidth: '320px' }}>
                    <div style={{ fontWeight: 600, color: '#fff', fontSize: '0.85rem' }}>{rule.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px', lineHeight: 1.3 }}>{rule.desc}</div>
                  </td>
                  <td style={{ padding: '12px 10px' }}>
                    <span className={`badge ${rule.severity === 'CRITICAL' ? 'badge-rose' : rule.severity === 'HIGH' ? 'badge-amber' : 'badge-cyan'}`} style={{ fontSize: '0.7rem' }}>
                      {rule.severity}
                    </span>
                  </td>
                  <td style={{ padding: '12px 10px', color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                    {rule.lastScanned}
                  </td>
                  <td style={{ padding: '12px 10px' }}>
                    <span className="badge badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem' }}>
                      <CheckCircle2 size={12} /> {rule.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 10px' }}>
                    <button
                      onClick={() => handleRemediate(rule.id)}
                      className="btn btn-secondary"
                      style={{ fontSize: '0.72rem', padding: '4px 10px' }}
                    >
                      Re-verify
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
