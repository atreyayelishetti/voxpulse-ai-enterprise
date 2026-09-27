import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  Lock, 
  Terminal, 
  RefreshCw, 
  FileText, 
  Filter, 
  Key, 
  ExternalLink,
  ShieldAlert,
  Hash,
  Database
} from 'lucide-react';

export default function EnterpriseAuditVault({ currentOrg }) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState('ALL');
  const [verifying, setVerifying] = useState(false);
  const [chainVerification, setChainVerification] = useState(null);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState('CEF');
  const [exportData, setExportData] = useState('');

  const activeTenantId = currentOrg?.id || 'org_visa_inc';

  useEffect(() => {
    fetchLogs();
  }, [activeTenantId, severityFilter]);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const url = `/api/saas/audit/logs?tenantId=${activeTenantId}&severity=${severityFilter}${searchQuery ? `&search=${encodeURIComponent(searchQuery)}` : ''}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setLogs(data.logs);
      }
    } catch (err) {
      console.error('Failed to load audit logs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyChain = async () => {
    setVerifying(true);
    try {
      const res = await fetch('/api/saas/audit/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tenantId: activeTenantId })
      });
      const data = await res.json();
      setChainVerification(data);
    } catch (err) {
      console.error('Chain verification failed:', err);
    } finally {
      setVerifying(false);
    }
  };

  const handleExportSIEM = async (format) => {
    try {
      const res = await fetch(`/api/saas/audit/export?tenantId=${activeTenantId}&format=${format}`);
      const text = await res.text();
      setExportFormat(format);
      setExportData(text);
      setExportModalOpen(true);
    } catch (err) {
      console.error('SIEM export failed:', err);
    }
  };

  const handleDownloadFile = () => {
    const blob = new Blob([exportData], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `voxpulse-audit-${activeTenantId}-${exportFormat.toLowerCase()}-${Date.now()}.log`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(16, 185, 129, 0.35)'
            }}>
              <ShieldCheck size={22} color="#fff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff' }}>
                  Enterprise Compliance & Audit Vault
                </h2>
                <span className="badge badge-emerald" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                  SOC-2 Type II • PCI-DSS 4.0
                </span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '2px' }}>
                Cryptographically sealed, tamper-evident audit ledger with SHA-256 hash chaining and SIEM forwarder integration.
              </p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => handleExportSIEM('CEF')}
            className="btn btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '10px', fontSize: '0.84rem' }}
          >
            <Download size={14} color="#38bdf8" /> Export SIEM (CEF)
          </button>
          <button
            onClick={() => handleExportSIEM('JSONL')}
            className="btn btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '10px', fontSize: '0.84rem' }}
          >
            <Terminal size={14} color="#a78bfa" /> Export JSONL
          </button>
          <button
            onClick={() => handleVerifyChain()}
            disabled={verifying}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 18px', borderRadius: '10px', fontSize: '0.84rem' }}
          >
            {verifying ? <RefreshCw size={14} className="spin" /> : <Lock size={14} />}
            Verify Chain Integrity
          </button>
        </div>
      </div>

      {/* Chain Verification Result Banner */}
      {chainVerification && (
        <div style={{
          background: chainVerification.success ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
          border: chainVerification.success ? '1px solid #10b981' : '1px solid #ef4444',
          borderRadius: '12px',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {chainVerification.success ? (
              <CheckCircle2 size={24} color="#10b981" />
            ) : (
              <AlertTriangle size={24} color="#ef4444" />
            )}
            <div>
              <div style={{ fontSize: '0.94rem', fontWeight: 700, color: '#fff' }}>
                {chainVerification.success
                  ? `Cryptographic Ledger Integrity Confirmed (${chainVerification.totalEntriesVerified} Blocks Verified)`
                  : 'Ledger Corruption Detected! Block Hash Mismatch'}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8', fontFamily: 'monospace' }}>
                Latest Block Hash: {chainVerification.latestBlockHash}
              </div>
            </div>
          </div>

          <span className={`badge ${chainVerification.success ? 'badge-emerald' : 'badge-rose'}`}>
            {chainVerification.chainStatus}
          </span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="glass-card" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={15} color="#64748b" style={{ position: 'absolute', left: '12px', top: '11px' }} />
            <input
              type="text"
              placeholder="Search by action, actor, resource, or details..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') fetchLogs(); }}
              className="input-field"
              style={{ width: '100%', padding: '8px 12px 8px 36px', fontSize: '0.86rem' }}
            />
          </div>

          <button
            onClick={() => fetchLogs()}
            className="btn btn-secondary"
            style={{ padding: '8px 16px', fontSize: '0.84rem' }}
          >
            Search
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter size={15} color="#94a3b8" />
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Severity:</span>
          {['ALL', 'INFO', 'WARN', 'CRITICAL'].map((sev) => (
            <button
              key={sev}
              onClick={() => setSeverityFilter(sev)}
              className={`badge ${severityFilter === sev ? (sev === 'CRITICAL' ? 'badge-rose' : sev === 'WARN' ? 'badge-amber' : 'badge-cyan') : 'badge-slate'}`}
              style={{ cursor: 'pointer', padding: '4px 10px', fontSize: '0.72rem' }}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Hash size={18} color="#10b981" /> Immutable Audit Ledger (Tenant: {activeTenantId})
          </h3>
          <span className="badge badge-emerald" style={{ fontSize: '0.72rem' }}>
            {logs.length} Logged Security Events
          </span>
        </div>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
            <RefreshCw size={24} className="spin" style={{ margin: '0 auto 12px auto' }} />
            <div>Loading verified audit trail...</div>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.84rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.72rem' }}>
                  <th style={{ padding: '10px' }}>Timestamp (UTC)</th>
                  <th style={{ padding: '10px' }}>Severity</th>
                  <th style={{ padding: '10px' }}>Action & Description</th>
                  <th style={{ padding: '10px' }}>Actor</th>
                  <th style={{ padding: '10px' }}>Resource</th>
                  <th style={{ padding: '10px' }}>Block Hash (SHA-256)</th>
                  <th style={{ padding: '10px', textAlign: 'right' }}>Payload</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((entry) => (
                  <tr key={entry.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '12px 10px', color: '#94a3b8', fontSize: '0.78rem' }}>
                      {new Date(entry.timestamp).toLocaleString()}
                    </td>
                    <td style={{ padding: '12px 10px' }}>
                      <span className={`badge ${entry.severity === 'CRITICAL' ? 'badge-rose' : entry.severity === 'WARN' ? 'badge-amber' : 'badge-cyan'}`} style={{ fontSize: '0.64rem' }}>
                        {entry.severity}
                      </span>
                    </td>
                    <td style={{ padding: '12px 10px' }}>
                      <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.85rem' }}>{entry.action}</div>
                      <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
                        {JSON.stringify(entry.details).substring(0, 50)}...
                      </div>
                    </td>
                    <td style={{ padding: '12px 10px' }}>
                      <div style={{ color: '#e2e8f0', fontWeight: 600 }}>{entry.actor.name}</div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{entry.actor.email}</div>
                    </td>
                    <td style={{ padding: '12px 10px', color: '#a78bfa', fontSize: '0.78rem' }}>
                      {entry.resourceType}: <span style={{ color: '#06b6d4' }}>{entry.resourceId}</span>
                    </td>
                    <td style={{ padding: '12px 10px', fontFamily: 'monospace', fontSize: '0.72rem', color: '#10b981' }}>
                      {entry.currentBlockHash ? `${entry.currentBlockHash.substring(0, 16)}...` : 'SEALED'}
                    </td>
                    <td style={{ padding: '12px 10px', textAlign: 'right' }}>
                      <button
                        onClick={() => setSelectedEntry(entry)}
                        className="btn btn-secondary"
                        style={{ padding: '4px 10px', fontSize: '0.72rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                      >
                        <FileText size={12} /> Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Inspect Entry Modal */}
      {selectedEntry && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 99999
        }}>
          <div className="glass-card" style={{
            width: '680px',
            maxHeight: '85vh',
            overflowY: 'auto',
            padding: '28px',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.15)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck color="#10b981" size={20} /> Cryptographic Audit Block Inspector
              </h3>
              <button
                onClick={() => setSelectedEntry(null)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1.2rem' }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.84rem' }}>
              <div style={{ background: 'rgba(0,0,0,0.4)', padding: '12px', borderRadius: '10px' }}>
                <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>PREVIOUS BLOCK HASH (SHA-256)</div>
                <div style={{ fontFamily: 'monospace', color: '#06b6d4', wordBreak: 'break-all', fontSize: '0.75rem' }}>
                  {selectedEntry.previousBlockHash}
                </div>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.4)', padding: '12px', borderRadius: '10px' }}>
                <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>CURRENT BLOCK HASH (SHA-256)</div>
                <div style={{ fontFamily: 'monospace', color: '#10b981', wordBreak: 'break-all', fontSize: '0.75rem' }}>
                  {selectedEntry.currentBlockHash}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.74rem', color: '#94a3b8', marginBottom: '4px' }}>STRUCTURED EVENT PAYLOAD</div>
                <pre style={{
                  background: 'rgba(0,0,0,0.5)',
                  padding: '12px',
                  borderRadius: '8px',
                  fontSize: '0.76rem',
                  color: '#e2e8f0',
                  overflowX: 'auto',
                  border: '1px solid rgba(255,255,255,0.08)'
                }}>
                  {JSON.stringify(selectedEntry, null, 2)}
                </pre>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
              <button onClick={() => setSelectedEntry(null)} className="btn btn-secondary" style={{ padding: '8px 20px' }}>
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SIEM Export Modal */}
      {exportModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 99999
        }}>
          <div className="glass-card" style={{
            width: '740px',
            maxHeight: '85vh',
            overflowY: 'auto',
            padding: '28px',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.15)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Terminal color="#38bdf8" size={20} /> SIEM Forwarder Stream Export ({exportFormat})
              </h3>
              <button
                onClick={() => setExportModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1.2rem' }}
              >
                ✕
              </button>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '14px' }}>
              Ready for ingestion into Splunk, Datadog, AWS Security Lake, IBM QRadar, or ArcSight SIEM collectors.
            </p>

            <pre style={{
              background: 'rgba(0,0,0,0.6)',
              padding: '14px',
              borderRadius: '10px',
              fontSize: '0.74rem',
              color: '#34d399',
              maxHeight: '340px',
              overflowY: 'auto',
              fontFamily: 'monospace',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              {exportData}
            </pre>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button onClick={() => setExportModalOpen(false)} className="btn btn-secondary" style={{ padding: '8px 18px' }}>
                Close
              </button>
              <button onClick={() => handleDownloadFile()} className="btn btn-primary" style={{ padding: '8px 20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Download size={14} /> Download {exportFormat} File
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
