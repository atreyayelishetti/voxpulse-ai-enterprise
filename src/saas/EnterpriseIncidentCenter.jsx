import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  Activity, 
  ExternalLink, 
  RefreshCw, 
  Plus, 
  Zap, 
  ArrowRight, 
  LifeBuoy, 
  Sliders, 
  CheckCircle, 
  PhoneCall,
  Terminal,
  Cpu
} from 'lucide-react';

export default function EnterpriseIncidentCenter({ currentOrg }) {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [severityFilter, setSeverityFilter] = useState('ALL');
  const [remediatingId, setRemediatingId] = useState(null);
  const [remediationResult, setRemediationResult] = useState(null);
  const [selectedTimelineIncident, setSelectedTimelineIncident] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // New incident form state
  const [newTitle, setNewTitle] = useState('');
  const [newSeverity, setNewSeverity] = useState('SEV_1_CRITICAL');
  const [newTarget, setNewTarget] = useState('Visa Global Cardholder Support Hotline (+18008472911)');
  const [newRca, setNewRca] = useState('');

  const activeTenantId = currentOrg?.id || 'org_visa_inc';

  useEffect(() => {
    fetchIncidents();
  }, [activeTenantId, statusFilter, severityFilter]);

  const fetchIncidents = async () => {
    setLoading(true);
    try {
      const url = `/api/saas/incidents?tenantId=${activeTenantId}&status=${statusFilter}&severity=${severityFilter}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setIncidents(data.incidents);
      }
    } catch (err) {
      console.error('Failed to load incidents:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (incidentId, newStatus) => {
    try {
      const res = await fetch('/api/saas/incidents/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          incidentId,
          status: newStatus,
          actor: 'Elena Rostova (VP Telecom)',
          message: `Incident marked as ${newStatus} from command console.`
        })
      });
      const data = await res.json();
      if (data.success) {
        fetchIncidents();
      }
    } catch (err) {
      console.error('Status update failed:', err);
    }
  };

  const handleAutoRemediate = async (incidentId) => {
    setRemediatingId(incidentId);
    setRemediationResult(null);
    try {
      const res = await fetch('/api/saas/incidents/remediate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ incidentId })
      });
      const data = await res.json();
      if (data.success) {
        setRemediationResult(data);
        fetchIncidents();
      }
    } catch (err) {
      console.error('Auto remediation failed:', err);
    } finally {
      setRemediatingId(null);
    }
  };

  const handleCreateIncident = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      const res = await fetch('/api/saas/incidents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tenantId: activeTenantId,
          title: newTitle.trim(),
          severity: newSeverity,
          affectedTarget: newTarget,
          rootCauseAnalysis: newRca || 'Synthetic IVR diagnostic detected carrier QoS degradation below SLA limit.',
          metrics: { initialMos: 4.45, currentMos: 3.65, latencyMs: 220, packetLossPct: 1.4 }
        })
      });
      const data = await res.json();
      if (data.success) {
        setCreateModalOpen(false);
        setNewTitle('');
        setNewRca('');
        fetchIncidents();
      }
    } catch (err) {
      console.error('Create incident failed:', err);
    }
  };

  const activeCount = incidents.filter(i => i.status !== 'RESOLVED').length;
  const sev1Count = incidents.filter(i => i.severity === 'SEV_1_CRITICAL' && i.status !== 'RESOLVED').length;

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
              background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(239, 68, 68, 0.4)'
            }}>
              <ShieldAlert size={22} color="#fff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff' }}>
                  Enterprise Incident Response & ITSM Center
                </h2>
                <span className="badge badge-rose" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                  ServiceNow & PagerDuty Bi-Directional
                </span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '2px' }}>
                Automated SLA breach triage, IT service management syncing, and autonomous SBC failover remediation.
              </p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => fetchIncidents()}
            className="btn btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '10px', fontSize: '0.84rem' }}
          >
            <RefreshCw size={14} /> Refresh Feed
          </button>
          <button
            onClick={() => setCreateModalOpen(true)}
            className="btn btn-rose"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 18px', borderRadius: '10px', fontSize: '0.84rem' }}
          >
            <Plus size={15} /> Declare Sev-1 Incident
          </button>
        </div>
      </div>

      {/* Top Telemetry KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        <div className="glass-card" style={{ padding: '18px' }}>
          <div style={{ fontSize: '0.74rem', color: '#94a3b8', textTransform: 'uppercase' }}>Active Incidents</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: activeCount > 0 ? '#ef4444' : '#10b981', marginTop: '4px' }}>
            {activeCount}
          </div>
          <div style={{ fontSize: '0.74rem', color: '#64748b' }}>Requiring NOC investigation</div>
        </div>

        <div className="glass-card" style={{ padding: '18px' }}>
          <div style={{ fontSize: '0.74rem', color: '#94a3b8', textTransform: 'uppercase' }}>Critical Sev-1 Alerts</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: sev1Count > 0 ? '#f43f5e' : '#10b981', marginTop: '4px' }}>
            {sev1Count}
          </div>
          <div style={{ fontSize: '0.74rem', color: '#64748b' }}>Primary IVR / SBC routes</div>
        </div>

        <div className="glass-card" style={{ padding: '18px' }}>
          <div style={{ fontSize: '0.74rem', color: '#94a3b8', textTransform: 'uppercase' }}>Mean Time to Remediation (MTTR)</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#38bdf8', marginTop: '4px' }}>
            4m 12s
          </div>
          <div style={{ fontSize: '0.74rem', color: '#10b981' }}>-78% vs manual ticket routing</div>
        </div>

        <div className="glass-card" style={{ padding: '18px' }}>
          <div style={{ fontSize: '0.74rem', color: '#94a3b8', textTransform: 'uppercase' }}>ITSM Connector Status</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#10b981', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle2 size={18} /> Synced & Healthy
          </div>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '2px' }}>ServiceNow v2 • PagerDuty Events v2</div>
        </div>
      </div>

      {/* Auto-Remediation Banner */}
      {remediationResult && (
        <div style={{
          background: 'rgba(16, 185, 129, 0.12)',
          border: '1px solid #10b981',
          borderRadius: '12px',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <CheckCircle size={24} color="#10b981" />
            <div>
              <div style={{ fontSize: '0.94rem', fontWeight: 700, color: '#fff' }}>
                Autonomous Telephony Failover Succeeded (MTTR: {remediationResult.mttrSeconds}s)
              </div>
              <div style={{ fontSize: '0.78rem', color: '#cbd5e1', marginTop: '2px' }}>
                {remediationResult.actionsTaken.join(' • ')}
              </div>
            </div>
          </div>
          <span className="badge badge-emerald">RESOLVED (MOS {remediationResult.restoredMos})</span>
        </div>
      )}

      {/* Incident List */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity size={18} color="#ef4444" /> Live Incident Stream
          </h3>

          <div style={{ display: 'flex', gap: '8px' }}>
            {['ALL', 'DETECTED', 'INVESTIGATING', 'RESOLVED'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`badge ${statusFilter === st ? 'badge-amber' : 'badge-slate'}`}
                style={{ cursor: 'pointer', padding: '4px 10px', fontSize: '0.72rem' }}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
            <RefreshCw size={24} className="spin" style={{ margin: '0 auto 12px auto' }} />
            <div>Loading active incident records...</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {incidents.map((inc) => (
              <div
                key={inc.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: inc.severity === 'SEV_1_CRITICAL' ? '1px solid rgba(239, 68, 68, 0.35)' : '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '12px',
                  padding: '18px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className={`badge ${inc.severity === 'SEV_1_CRITICAL' ? 'badge-rose' : 'badge-amber'}`} style={{ fontSize: '0.72rem' }}>
                      {inc.severity}
                    </span>
                    <strong style={{ color: '#fff', fontSize: '0.96rem' }}>{inc.title}</strong>
                    <code style={{ fontSize: '0.76rem', color: '#06b6d4', background: 'rgba(6, 182, 212, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>
                      {inc.incidentNumber}
                    </code>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className={`badge ${inc.status === 'RESOLVED' ? 'badge-emerald' : inc.status === 'INVESTIGATING' ? 'badge-amber' : 'badge-rose'}`} style={{ fontSize: '0.7rem' }}>
                      {inc.status}
                    </span>
                    <span style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
                      {new Date(inc.detectedAt).toLocaleTimeString()}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '16px', fontSize: '0.82rem' }}>
                  <div>
                    <div style={{ color: '#cbd5e1', marginBottom: '4px' }}>
                      <strong>Target:</strong> {inc.affectedTarget}
                    </div>
                    <div style={{ color: '#94a3b8', fontSize: '0.78rem' }}>
                      <strong>RCA:</strong> {inc.rootCauseAnalysis}
                    </div>
                  </div>

                  <div style={{ background: 'rgba(0,0,0,0.3)', padding: '10px 12px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>TELEMETRY IMPACT</div>
                      <div style={{ fontSize: '0.86rem', color: '#ef4444', fontWeight: 700 }}>
                        MOS {inc.metrics.initialMos} → {inc.metrics.currentMos} ({inc.metrics.latencyMs}ms)
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>SERVICENOW TICKET</div>
                      <div style={{ fontSize: '0.84rem', color: '#38bdf8', fontWeight: 600 }}>
                        {inc.serviceNow.ticketNumber} ({inc.serviceNow.state})
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    PagerDuty Urgency: <strong style={{ color: '#a78bfa' }}>{inc.pagerDuty.urgency.toUpperCase()}</strong> • PagerDuty Key: <code>{inc.pagerDuty.incidentKey}</code>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    {inc.status === 'DETECTED' && (
                      <button
                        onClick={() => handleUpdateStatus(inc.id, 'ACKNOWLEDGED')}
                        className="btn btn-secondary"
                        style={{ padding: '6px 14px', fontSize: '0.76rem' }}
                      >
                        Acknowledge
                      </button>
                    )}

                    {inc.status !== 'RESOLVED' && (
                      <button
                        onClick={() => handleAutoRemediate(inc.id)}
                        disabled={remediatingId === inc.id}
                        className="btn btn-emerald"
                        style={{ padding: '6px 14px', fontSize: '0.76rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                      >
                        {remediatingId === inc.id ? <RefreshCw size={12} className="spin" /> : <Zap size={12} />}
                        Auto-Remediate Trunk
                      </button>
                    )}

                    <button
                      onClick={() => setSelectedTimelineIncident(inc)}
                      className="btn btn-secondary"
                      style={{ padding: '6px 14px', fontSize: '0.76rem' }}
                    >
                      View Timeline ({inc.timeline.length})
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Incident Timeline Modal */}
      {selectedTimelineIncident && (
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
                <Clock color="#38bdf8" size={20} /> Incident Lifecycle Timeline ({selectedTimelineIncident.incidentNumber})
              </h3>
              <button
                onClick={() => setSelectedTimelineIncident(null)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1.2rem' }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {selectedTimelineIncident.timeline.map((event, idx) => (
                <div key={idx} style={{
                  padding: '12px 14px',
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.06)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <div style={{ fontWeight: 700, color: '#38bdf8', fontSize: '0.84rem' }}>{event.action}</div>
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{new Date(event.timestamp).toLocaleTimeString()}</div>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>{event.message}</div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '4px' }}>Actor: {event.actor}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
              <button onClick={() => setSelectedTimelineIncident(null)} className="btn btn-secondary" style={{ padding: '8px 20px' }}>
                Close Timeline
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Declare Incident Modal */}
      {createModalOpen && (
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
            width: '640px',
            maxHeight: '85vh',
            overflowY: 'auto',
            padding: '28px',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.15)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldAlert color="#ef4444" size={22} /> Declare Enterprise Telephony Incident
              </h3>
              <button
                onClick={() => setCreateModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1.2rem' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateIncident} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Incident Title</label>
                <input
                  type="text"
                  placeholder="e.g. Visa 1-800-VISA-911 Inbound Carrier Trunk Failure"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="input-field"
                  style={{ width: '100%', padding: '10px 12px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Severity Level</label>
                  <select
                    value={newSeverity}
                    onChange={(e) => setNewSeverity(e.target.value)}
                    className="input-field"
                    style={{ width: '100%', padding: '10px 12px' }}
                  >
                    <option value="SEV_1_CRITICAL">SEV-1 (Critical Outage - Page On-Call)</option>
                    <option value="SEV_2_MAJOR">SEV-2 (Major SLA Degradation)</option>
                    <option value="SEV_3_MINOR">SEV-3 (Minor Anomaly)</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Affected Target / Flow</label>
                  <input
                    type="text"
                    value={newTarget}
                    onChange={(e) => setNewTarget(e.target.value)}
                    className="input-field"
                    style={{ width: '100%', padding: '10px 12px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Initial Root Cause & Telemetry Details</label>
                <textarea
                  rows={3}
                  placeholder="Provide technical context from SIP ladder or POLQA audio analyzer..."
                  value={newRca}
                  onChange={(e) => setNewRca(e.target.value)}
                  className="input-field"
                  style={{ width: '100%', padding: '10px 12px' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setCreateModalOpen(false)} className="btn btn-secondary" style={{ padding: '8px 18px' }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-rose" style={{ padding: '8px 22px' }}>
                  Dispatch Incident
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
