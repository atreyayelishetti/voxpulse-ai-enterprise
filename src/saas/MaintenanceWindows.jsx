import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  ShieldCheck, 
  RefreshCw, 
  Sliders, 
  Filter,
  CheckCircle,
  AlertCircle,
  FileText
} from 'lucide-react';

export default function MaintenanceWindows({ currentOrg }) {
  const [windows, setWindows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [checkFreezeFlow, setCheckFreezeFlow] = useState('flow_visa_cardholder_main');
  const [freezeStatusResult, setFreezeStatusResult] = useState(null);

  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startUtc, setStartUtc] = useState(new Date(Date.now() + 86400000).toISOString().slice(0, 16));
  const [endUtc, setEndUtc] = useState(new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 16));
  const [mode, setMode] = useState('PASSIVE_PROBES_ONLY');
  const [affectedFlows, setAffectedFlows] = useState('ALL');

  const activeTenantId = currentOrg?.id || 'org_visa_inc';

  useEffect(() => {
    fetchWindows();
  }, [activeTenantId, statusFilter]);

  const fetchWindows = async () => {
    setLoading(true);
    try {
      const url = `/api/saas/maintenance/windows?tenantId=${activeTenantId}&status=${statusFilter}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setWindows(data.windows);
      }
    } catch (err) {
      console.error('Failed to load maintenance windows:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!name.trim()) return;

    try {
      const res = await fetch('/api/saas/maintenance/windows', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tenantId: activeTenantId,
          name: name.trim(),
          description,
          startUtc: new Date(startUtc).toISOString(),
          endUtc: new Date(endUtc).toISOString(),
          mode,
          affectedFlows: affectedFlows === 'ALL' ? ['ALL'] : affectedFlows.split(',').map(s => s.trim()),
          approvedBy: 'Elena Rostova (VP Telecom)',
          ticketReference: `CHG00${Math.floor(10000 + Math.random() * 90000)}`
        })
      });
      const data = await res.json();
      if (data.success) {
        setCreateModalOpen(false);
        setName('');
        setDescription('');
        fetchWindows();
      }
    } catch (err) {
      console.error('Create window failed:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/saas/maintenance/windows/${id}`, { method: 'DELETE' });
      fetchWindows();
    } catch (err) {
      console.error('Delete window failed:', err);
    }
  };

  const handleCheckFreeze = async () => {
    try {
      const res = await fetch(`/api/saas/maintenance/freeze-status?tenantId=${activeTenantId}&flowId=${checkFreezeFlow}`);
      const data = await res.json();
      if (data.success) {
        setFreezeStatusResult(data);
      }
    } catch (err) {
      console.error('Check freeze failed:', err);
    }
  };

  const activeWindowNow = windows.find(w => w.isActiveNow);

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
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(245, 158, 11, 0.4)'
            }}>
              <Calendar size={22} color="#fff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff' }}>
                  Enterprise Change Freezes & Maintenance Windows
                </h2>
                <span className="badge badge-amber" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                  Synthetic Suppression Governance
                </span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '2px' }}>
                Prevent synthetic test bursts from interfering with live high-volume settlement or scheduled SBC network maintenance.
              </p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => fetchWindows()}
            className="btn btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '10px', fontSize: '0.84rem' }}
          >
            <RefreshCw size={14} /> Refresh
          </button>
          <button
            onClick={() => setCreateModalOpen(true)}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 18px', borderRadius: '10px', fontSize: '0.84rem' }}
          >
            <Plus size={15} /> Schedule Maintenance Window
          </button>
        </div>
      </div>

      {/* Active Change Freeze Alert Banner */}
      {activeWindowNow ? (
        <div style={{
          background: 'rgba(239, 68, 68, 0.12)',
          border: '1px solid #ef4444',
          borderRadius: '12px',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <AlertTriangle size={24} color="#ef4444" />
            <div>
              <div style={{ fontSize: '0.94rem', fontWeight: 700, color: '#fff' }}>
                ACTIVE CHANGE FREEZE ENFORCED: {activeWindowNow.name}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#cbd5e1', marginTop: '2px' }}>
                Mode: <strong>{activeWindowNow.mode}</strong> • Ticket Ref: {activeWindowNow.ticketReference} • Synthetic tests are governed.
              </div>
            </div>
          </div>
          <span className="badge badge-rose">IN PROGRESS</span>
        </div>
      ) : (
        <div style={{
          background: 'rgba(16, 185, 129, 0.08)',
          border: '1px solid rgba(16, 185, 129, 0.25)',
          borderRadius: '12px',
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: '#fff' }}>
            <CheckCircle2 size={18} color="#10b981" />
            No active change freeze. Automated synthetic IVR and PSTN load testing operating normally.
          </div>
          <span className="badge badge-emerald">NORMAL TESTING STATE</span>
        </div>
      )}

      {/* Diagnostic: Check Freeze Status */}
      <div className="glass-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
        <div>
          <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff' }}>
            Pre-Flight IVR Flow Freeze Evaluation
          </div>
          <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
            Verify whether a specific Architect flow or DID is currently suppressed by enterprise freeze policies.
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <select
            value={checkFreezeFlow}
            onChange={(e) => setCheckFreezeFlow(e.target.value)}
            className="input-field"
            style={{ padding: '8px 12px', fontSize: '0.84rem' }}
          >
            <option value="flow_visa_cardholder_main">Visa Global Cardholder Services (+18008472911)</option>
            <option value="flow_visa_fraud_vaa">Visa VAA Real-time Fraud Dispute Voicebot (+18002524370)</option>
            <option value="flow_visa_merchant_vip">Visa Direct & Merchant POS Voice Auth (+18005234116)</option>
          </select>

          <button
            onClick={() => handleCheckFreeze()}
            className="btn btn-secondary"
            style={{ padding: '8px 16px', fontSize: '0.82rem' }}
          >
            Evaluate Flow
          </button>
        </div>
      </div>

      {freezeStatusResult && (
        <div style={{
          background: freezeStatusResult.underFreeze ? 'rgba(245, 158, 11, 0.12)' : 'rgba(16, 185, 129, 0.12)',
          border: freezeStatusResult.underFreeze ? '1px solid #f59e0b' : '1px solid #10b981',
          padding: '12px 18px',
          borderRadius: '10px',
          fontSize: '0.84rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ color: '#fff' }}>
            Flow Evaluation Result: <strong>{freezeStatusResult.underFreeze ? `SUPPRESSED (${freezeStatusResult.mode})` : 'PERMITTED (NORMAL TESTING)'}</strong>
            {freezeStatusResult.activeWindow && (
              <span style={{ fontSize: '0.76rem', color: '#cbd5e1', marginLeft: '8px' }}>
                Window: {freezeStatusResult.activeWindow.name}
              </span>
            )}
          </div>
          <button
            onClick={() => setFreezeStatusResult(null)}
            style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Windows Listing */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={18} color="#f59e0b" /> Configured Maintenance Windows
          </h3>

          <div style={{ display: 'flex', gap: '8px' }}>
            {['ALL', 'ACTIVE', 'SCHEDULED', 'EXPIRED'].map((st) => (
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
            <div>Loading maintenance schedules...</div>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.72rem' }}>
                  <th style={{ padding: '10px' }}>Window Name & ServiceNow Ref</th>
                  <th style={{ padding: '10px' }}>Start (UTC)</th>
                  <th style={{ padding: '10px' }}>End (UTC)</th>
                  <th style={{ padding: '10px' }}>Suppression Mode</th>
                  <th style={{ padding: '10px' }}>Affected Targets</th>
                  <th style={{ padding: '10px' }}>Status</th>
                  <th style={{ padding: '10px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {windows.map((win) => (
                  <tr key={win.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '14px 10px' }}>
                      <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.88rem' }}>{win.name}</div>
                      <div style={{ color: '#06b6d4', fontSize: '0.75rem', marginTop: '2px' }}>
                        Ref: {win.ticketReference} • Approved by: {win.approvedBy}
                      </div>
                    </td>
                    <td style={{ padding: '14px 10px', color: '#94a3b8', fontSize: '0.78rem' }}>
                      {new Date(win.startUtc).toLocaleString()}
                    </td>
                    <td style={{ padding: '14px 10px', color: '#94a3b8', fontSize: '0.78rem' }}>
                      {new Date(win.endUtc).toLocaleString()}
                    </td>
                    <td style={{ padding: '14px 10px' }}>
                      <span className="badge badge-amber" style={{ fontSize: '0.66rem' }}>
                        {win.mode}
                      </span>
                    </td>
                    <td style={{ padding: '14px 10px', color: '#cbd5e1', fontSize: '0.78rem' }}>
                      {win.affectedFlows.join(', ')}
                    </td>
                    <td style={{ padding: '14px 10px' }}>
                      <span className={`badge ${win.status === 'ACTIVE' ? 'badge-rose' : win.status === 'SCHEDULED' ? 'badge-cyan' : 'badge-slate'}`} style={{ fontSize: '0.66rem' }}>
                        {win.status}
                      </span>
                    </td>
                    <td style={{ padding: '14px 10px', textAlign: 'right' }}>
                      <button
                        onClick={() => handleDelete(win.id)}
                        className="btn btn-secondary"
                        style={{ padding: '5px 10px', fontSize: '0.72rem', color: '#ef4444' }}
                      >
                        <Trash2 size={12} /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Schedule Window Modal */}
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
                <Calendar color="#f59e0b" size={22} /> Schedule Enterprise Change Freeze
              </h3>
              <button
                onClick={() => setCreateModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1.2rem' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Window Name</label>
                <input
                  type="text"
                  placeholder="e.g. Visa Ashburn SBC Firmware Patching"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field"
                  style={{ width: '100%', padding: '10px 12px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Start Time (UTC)</label>
                  <input
                    type="datetime-local"
                    value={startUtc}
                    onChange={(e) => setStartUtc(e.target.value)}
                    className="input-field"
                    style={{ width: '100%', padding: '8px 12px' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>End Time (UTC)</label>
                  <input
                    type="datetime-local"
                    value={endUtc}
                    onChange={(e) => setEndUtc(e.target.value)}
                    className="input-field"
                    style={{ width: '100%', padding: '8px 12px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Suppression Mode</label>
                  <select
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                    className="input-field"
                    style={{ width: '100%', padding: '9px 12px' }}
                  >
                    <option value="PASSIVE_PROBES_ONLY">PASSIVE_PROBES_ONLY (OPTIONS Ping only, no calls)</option>
                    <option value="HARD_FREEZE_ALL_TESTS">HARD_FREEZE_ALL_TESTS (Suppress all testing)</option>
                    <option value="LOW_CONCURRENCY">LOW_CONCURRENCY (Max 1 concurrent synthetic call)</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Affected Flow IDs (or ALL)</label>
                  <input
                    type="text"
                    value={affectedFlows}
                    onChange={(e) => setAffectedFlows(e.target.value)}
                    placeholder="ALL or flow_visa_cardholder_main"
                    className="input-field"
                    style={{ width: '100%', padding: '9px 12px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Technical Scope & Change Justification</label>
                <textarea
                  rows={2}
                  placeholder="Reference core banking maintenance window or carrier cutover plan..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="input-field"
                  style={{ width: '100%', padding: '10px 12px' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button type="button" onClick={() => setCreateModalOpen(false)} className="btn btn-secondary" style={{ padding: '8px 18px' }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ padding: '8px 22px' }}>
                  Enact Freeze Window
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
