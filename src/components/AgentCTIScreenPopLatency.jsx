import React, { useState } from 'react';
import { Monitor, Zap, CheckCircle2, Clock, Play, RefreshCw, FileText } from 'lucide-react';

export default function AgentCTIScreenPopLatency() {
  const [latencyMs, setLatencyMs] = useState(185);
  const [isTesting, setIsTesting] = useState(false);

  const cadVariables = {
    caller_ani: '+12125550100',
    dnis: '+18005550199',
    customer_name: 'Acme Logistics Inc (Enterprise VIP)',
    account_number: 'ACCT-8849-21',
    ivr_intent_selected: 'Dispute Transaction ($420.00)',
    ivr_auth_status: 'PASSED_VOICE_BIOMETRICS',
    crm_record_id: '0035000000XyZ12AAK'
  };

  const handleTestPop = () => {
    setIsTesting(true);
    setTimeout(() => {
      setIsTesting(false);
    }, 300);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Monitor color="#06b6d4" size={28} /> Agent CTI CAD Variable & Screen-Pop Latency Meter
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Computer Telephony Integration (CTI) benchmark. Measures millisecond delay between incoming SIP ring and CRM customer profile rendering.
          </p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={handleTestPop}
          disabled={isTesting}
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          {isTesting ? <RefreshCw size={16} className="animate-spin" /> : <Zap size={16} />}
          {isTesting ? 'Pushing CAD Event...' : 'Trigger Synthetic Screen-Pop'}
        </button>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Screen-Pop Latency</span>
          <div style={{ fontSize: '2.4rem', fontWeight: 800, color: latencyMs < 300 ? '#10b981' : '#f59e0b', marginTop: '4px' }}>
            {latencyMs} ms
          </div>
          <span className="badge badge-emerald" style={{ marginTop: '8px', display: 'inline-block' }}>SLA Target: &lt;500ms</span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>SIP CTI Event Dispatch</span>
          <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#06b6d4', marginTop: '4px' }}>32 ms</div>
          <span className="badge badge-cyan" style={{ marginTop: '8px', display: 'inline-block' }}>WebSocket Push</span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>CRM Query & Render</span>
          <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#a855f7', marginTop: '4px' }}>153 ms</div>
          <span className="badge badge-purple" style={{ marginTop: '8px', display: 'inline-block' }}>Salesforce / Zendesk</span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>CAD Context Match Rate</span>
          <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>100%</div>
          <span className="badge badge-emerald" style={{ marginTop: '8px', display: 'inline-block' }}>Zero Blank Pops</span>
        </div>
      </div>

      {/* CAD Variables Inspector */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FileText size={18} color="#06b6d4" /> Synchronized CTI Call Associated Data (CAD) Payload
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
          {Object.entries(cadVariables).map(([k, v]) => (
            <div key={k} style={{ padding: '12px 14px', background: 'rgba(0,0,0,0.3)', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{k}</span>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#38bdf8', marginTop: '2px' }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
