import React, { useState } from 'react';
import { 
  Radio, 
  AlertTriangle, 
  Activity, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  Globe2, 
  RefreshCw,
  Plus,
  Filter,
  ArrowRight,
  TrendingDown,
  DollarSign
} from 'lucide-react';

const INITIAL_OUTAGES = [
  { 
    id: 'INC-901', 
    carrier: 'AT&T Mobility', 
    region: 'US-East (Virginia)', 
    severity: 'MONITORING', 
    affectedDIDs: 14, 
    callVolumePerHour: 4800,
    financialRisk: '$1,240/hr',
    duration: '18m', 
    rca: 'PSTN fiber route degradation between Ashburn & NYC SBC. Auto-rerouted 100% traffic to Telnyx.',
    steps: [
      { time: '10:48', text: 'MOS dropped below 3.2 on 14 DIDs' },
      { time: '10:49', text: 'SBC auto-failover triggered to Secondary Carrier' },
      { time: '10:55', text: 'AT&T NOC confirmed fiber splice degradation' }
    ]
  },
  { 
    id: 'INC-902', 
    carrier: 'Vodafone DE', 
    region: 'Europe (Frankfurt)', 
    severity: 'RESOLVED', 
    affectedDIDs: 8, 
    callVolumePerHour: 1950,
    financialRisk: '$0 (Mitigated)',
    duration: '42m', 
    rca: 'Secondary ISDN gateway restart restored 100% reachability. Zero dropped calls due to LCR failover.',
    steps: [
      { time: '09:12', text: 'SIP 503 Service Unavailable received from Frankfurt gateway' },
      { time: '09:13', text: 'Dynamic LCR engine pivoted to Deutsche Telekom' },
      { time: '09:54', text: 'Gateway reconnected and verified clean' }
    ]
  },
  { 
    id: 'INC-903', 
    carrier: 'Telstra Enterprise', 
    region: 'APAC (Sydney)', 
    severity: 'RESOLVED', 
    affectedDIDs: 4, 
    callVolumePerHour: 820,
    financialRisk: '$0 (Mitigated)',
    duration: '12m', 
    rca: 'Local carrier SIP 503 error cleared automatically by softswitch session border controller.',
    steps: [
      { time: '07:30', text: 'Latency spiked to 310ms on Sydney POP' },
      { time: '07:42', text: 'BGP path restored to normal Tier-1 transit' }
    ]
  },
  { 
    id: 'INC-904', 
    carrier: 'Lumen / CenturyLink', 
    region: 'US-Central (Chicago)', 
    severity: 'CRITICAL', 
    affectedDIDs: 26, 
    callVolumePerHour: 9200,
    financialRisk: '$3,850/hr',
    duration: '6m', 
    rca: 'SS7 STP signaling node flapping in Chicago transit office. Active failover in progress.',
    steps: [
      { time: '11:02', text: 'Loss of ISUP signaling messages detected' },
      { time: '11:03', text: 'Auto-shedding non-priority toll-free inbound routes' }
    ]
  }
];

export default function GlobalOutageTimeline() {
  const [outages, setOutages] = useState(INITIAL_OUTAGES);
  const [filterSeverity, setFilterSeverity] = useState('ALL');
  const [showNewIncidentForm, setShowNewIncidentForm] = useState(false);
  const [newIncident, setNewIncident] = useState({ carrier: 'Verizon Wireless', region: 'US-West (Oregon)', severity: 'MONITORING', affectedDIDs: 5, rca: 'TDM tandem maintenance' });

  const handleCreateIncident = (e) => {
    e.preventDefault();
    const inc = {
      id: `INC-${Date.now().toString().slice(-3)}`,
      carrier: newIncident.carrier,
      region: newIncident.region,
      severity: newIncident.severity,
      affectedDIDs: Number(newIncident.affectedDIDs),
      callVolumePerHour: Number(newIncident.affectedDIDs) * 250,
      financialRisk: `$${Number(newIncident.affectedDIDs) * 65}/hr`,
      duration: 'Just now',
      rca: newIncident.rca,
      steps: [{ time: 'Just now', text: 'Incident registered in VoxPulse Telemetry' }]
    };
    setOutages([inc, ...outages]);
    setShowNewIncidentForm(false);
  };

  const handleResolveIncident = (id) => {
    setOutages(outages.map(o => o.id === id ? { ...o, severity: 'RESOLVED', rca: `${o.rca} (Marked RESOLVED by NOC engineer)` } : o));
  };

  const filteredOutages = filterSeverity === 'ALL'
    ? outages
    : outages.filter(o => o.severity === filterSeverity);

  const activeIncidents = outages.filter(o => o.severity !== 'RESOLVED').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="glass-panel glass-panel-glow" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Radio color="#f43f5e" size={24} /> Global PSTN Outage Map & Incident Timeline
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
              Real-time telemetry tracking international PSTN carrier disruptions, automated SBC route shedding, and blast-radius economics.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span className={`badge ${activeIncidents > 0 ? 'badge-rose' : 'badge-emerald'}`} style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
              {activeIncidents} Active Disruptions
            </span>
            <button 
              className="btn btn-primary"
              onClick={() => setShowNewIncidentForm(!showNewIncidentForm)}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem' }}
            >
              <Plus size={15} /> {showNewIncidentForm ? 'Close Form' : 'Register Incident'}
            </button>
          </div>
        </div>
      </div>

      {/* Register Incident Form */}
      {showNewIncidentForm && (
        <form onSubmit={handleCreateIncident} className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', border: '1px solid #f43f5e' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#f87171' }}>Simulate / Register New Carrier Disruption</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Carrier</label>
              <input 
                type="text" 
                value={newIncident.carrier} 
                onChange={e => setNewIncident({ ...newIncident, carrier: e.target.value })} 
                className="input-field" 
                style={{ width: '100%', padding: '8px 12px' }} 
                required 
              />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Region</label>
              <input 
                type="text" 
                value={newIncident.region} 
                onChange={e => setNewIncident({ ...newIncident, region: e.target.value })} 
                className="input-field" 
                style={{ width: '100%', padding: '8px 12px' }} 
                required 
              />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Severity</label>
              <select 
                value={newIncident.severity} 
                onChange={e => setNewIncident({ ...newIncident, severity: e.target.value })} 
                className="input-field"
                style={{ width: '100%', padding: '8px 12px' }}
              >
                <option value="CRITICAL">CRITICAL (P1 Outage)</option>
                <option value="MONITORING">MONITORING (P2 Degradation)</option>
                <option value="RESOLVED">RESOLVED</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Affected DIDs</label>
              <input 
                type="number" 
                value={newIncident.affectedDIDs} 
                onChange={e => setNewIncident({ ...newIncident, affectedDIDs: e.target.value })} 
                className="input-field" 
                style={{ width: '100%', padding: '8px 12px' }} 
                min="1" 
                required 
              />
            </div>
          </div>
          <div>
            <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Root Cause Analysis / Summary</label>
            <input 
              type="text" 
              value={newIncident.rca} 
              onChange={e => setNewIncident({ ...newIncident, rca: e.target.value })} 
              className="input-field" 
              style={{ width: '100%', padding: '8px 12px' }} 
              required 
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setShowNewIncidentForm(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Publish Incident</button>
          </div>
        </form>
      )}

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px' }}>
        {['ALL', 'CRITICAL', 'MONITORING', 'RESOLVED'].map(tab => (
          <button
            key={tab}
            onClick={() => setFilterSeverity(tab)}
            style={{
              background: filterSeverity === tab ? 'rgba(244, 63, 94, 0.2)' : 'rgba(255,255,255,0.05)',
              border: filterSeverity === tab ? '1px solid #f43f5e' : '1px solid rgba(255,255,255,0.1)',
              color: filterSeverity === tab ? '#fb7185' : 'var(--text-muted)',
              borderRadius: '6px',
              padding: '6px 14px',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Outage Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredOutages.map(inc => {
          const isCritical = inc.severity === 'CRITICAL';
          const isMonitoring = inc.severity === 'MONITORING';
          const accentColor = isCritical ? '#ef4444' : isMonitoring ? '#f59e0b' : '#10b981';

          return (
            <div 
              key={inc.id} 
              className="glass-panel" 
              style={{ 
                padding: '20px', 
                borderLeft: `4px solid ${accentColor}`,
                display: 'flex',
                flexDirection: 'column',
                gap: '14px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: `${accentColor}25`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {isCritical ? <AlertTriangle size={22} color={accentColor} /> : isMonitoring ? <Clock size={22} color={accentColor} /> : <CheckCircle2 size={22} color={accentColor} />}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                        {inc.carrier} — {inc.region}
                      </h3>
                      <span className={`badge ${isCritical ? 'badge-rose' : isMonitoring ? 'badge-amber' : 'badge-emerald'}`} style={{ fontSize: '0.72rem' }}>
                        {inc.severity}
                      </span>
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '2px' }}>
                      Incident ID: <strong style={{ color: '#06b6d4' }}>{inc.id}</strong> • Duration: {inc.duration}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Blast Radius</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#38bdf8' }}>{inc.affectedDIDs} DIDs</div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Financial Risk</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#f87171' }}>{inc.financialRisk}</div>
                  </div>

                  {inc.severity !== 'RESOLVED' && (
                    <button 
                      onClick={() => handleResolveIncident(inc.id)}
                      className="btn btn-secondary"
                      style={{ fontSize: '0.75rem', padding: '6px 12px', color: '#34d399' }}
                    >
                      Resolve
                    </button>
                  )}
                </div>
              </div>

              {/* RCA Explanation */}
              <div style={{ background: 'rgba(0,0,0,0.25)', padding: '12px 14px', borderRadius: '8px', fontSize: '0.82rem', color: '#fff' }}>
                <strong style={{ color: '#fbbf24' }}>Root Cause Analysis (RCA):</strong> {inc.rca}
              </div>

              {/* Event Step Milestones */}
              {inc.steps && inc.steps.length > 0 && (
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                  {inc.steps.map((st, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', color: '#06b6d4', fontWeight: 700 }}>{st.time}</span>
                      <span>{st.text}</span>
                      {i < inc.steps.length - 1 && <ArrowRight size={12} color="var(--border-color)" />}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
