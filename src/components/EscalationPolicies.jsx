import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Clock, 
  MessageSquare, 
  Phone, 
  Send, 
  CheckCircle2, 
  Plus, 
  Trash2,
  Bell
} from 'lucide-react';

const INITIAL_POLICIES = [
  { id: 1, name: '911 Emergency Line Outage Policy', trigger: 'MOS < 3.0 or Unreachable', tier1: 'Instant Slack Alert & PagerDuty High-Urgency', tier2: 'Voice Call to On-Call Engineer after 5m', tier3: 'SMS to VP of Infrastructure after 15m', status: 'ACTIVE' },
  { id: 2, name: 'Toll-Free DID SLA Breach Policy', trigger: 'Latency > 300ms or Silence > 2.5s', tier1: 'Slack #ivr-incidents channel payload', tier2: 'Auto-create ServiceNow P2 Incident after 10m', tier3: 'Email Tier-1 Carrier Manager', status: 'ACTIVE' }
];

export default function EscalationPolicies() {
  const [policies, setPolicies] = useState(INITIAL_POLICIES);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="glass-panel glass-panel-glow" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldAlert size={24} color="#f43f5e" />
              Incident Escalation & Notification Policies
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Define multi-tier alert escalation rules replacing Klearcom 24/7 Outage Escalations.
            </p>
          </div>

          <span className="badge badge-rose" style={{ padding: '6px 12px' }}>
            2 Active Escalation Rules
          </span>
        </div>
      </div>

      {/* Policy List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {policies.map(p => (
          <div key={p.id} className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>{p.name}</div>
              <span className="badge badge-emerald">{p.status}</span>
            </div>

            <div style={{ fontSize: '0.8rem', color: '#f87171', fontWeight: 600, marginBottom: '14px' }}>
              TRIGGER CONDITION: {p.trigger}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', background: 'rgba(0,0,0,0.25)', padding: '14px', borderRadius: '10px' }}>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>TIER 1 (IMMEDIATE)</div>
                <div style={{ fontSize: '0.85rem', color: '#fff', marginTop: '4px' }}>{p.tier1}</div>
              </div>

              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>TIER 2 (+5 MIN DELAY)</div>
                <div style={{ fontSize: '0.85rem', color: '#38bdf8', marginTop: '4px' }}>{p.tier2}</div>
              </div>

              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>TIER 3 (+15 MIN ESCALATION)</div>
                <div style={{ fontSize: '0.85rem', color: '#a78bfa', marginTop: '4px' }}>{p.tier3}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
