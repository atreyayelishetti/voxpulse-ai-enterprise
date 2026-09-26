import React, { useState } from 'react';
import { Radio, AlertTriangle, Activity, CheckCircle2, Clock, ShieldAlert, Globe2, RefreshCw } from 'lucide-react';

export default function GlobalOutageTimeline() {
  const [filterCarrier, setFilterCarrier] = useState('ALL');

  const outages = [
    { id: 'inc-901', carrier: 'AT&T Mobility', region: 'US-East (Virginia)', severity: 'Minor Degradation', affectedDIDs: 14, duration: '18m', status: 'MONITORING', rca: 'PSTN fiber route degradation between Ashburn & NYC SBC.' },
    { id: 'inc-902', carrier: 'Vodafone DE', region: 'Europe (Frankfurt)', severity: 'Resolved', affectedDIDs: 8, duration: '42m', status: 'RESOLVED', rca: 'Secondary ISDN gateway restart restored 100% reachability.' },
    { id: 'inc-903', carrier: 'Telstra', region: 'APAC (Sydney)', severity: 'Resolved', affectedDIDs: 4, duration: '12m', status: 'RESOLVED', rca: 'Local carrier SIP 503 error cleared automatically by SBC failover.' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Radio color="#f43f5e" size={28} /> Global PSTN Outage Map & Incident Timeline
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Real-time telemetry ticker tracking global PSTN network disruptions, carrier root causes, and resolution timelines.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <span className="badge badge-emerald" style={{ padding: '6px 12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle2 size={14} /> 99.98% Global Uptime
          </span>
        </div>
      </div>

      {/* Outage Timeline Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {outages.map((inc) => (
          <div key={inc.id} className="glass-card" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderLeft: inc.status === 'MONITORING' ? '4px solid #fbbf24' : '4px solid #10b981' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: inc.status === 'MONITORING' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {inc.status === 'MONITORING' ? <AlertTriangle size={22} color="#fbbf24" /> : <CheckCircle2 size={22} color="#10b981" />}
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff' }}>{inc.carrier} — {inc.region}</h3>
                  <span className={`badge ${inc.status === 'MONITORING' ? 'badge-amber' : 'badge-emerald'}`}>
                    {inc.status}
                  </span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', margin: 0 }}>
                  <strong>Root Cause (RCA):</strong> {inc.rca}
                </p>
              </div>
            </div>

            <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '0.82rem', color: '#06b6d4', fontWeight: 700 }}>
                {inc.affectedDIDs} DIDs Impacted
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Duration: {inc.duration}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
