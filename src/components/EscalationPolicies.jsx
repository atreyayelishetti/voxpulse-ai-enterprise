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
  Bell,
  Play,
  UserCheck,
  Smartphone,
  ExternalLink,
  Flame,
  Radio
} from 'lucide-react';

const INITIAL_POLICIES = [
  { 
    id: 1, 
    name: '911 Emergency Line Outage & PSAP Failure', 
    trigger: 'MOS < 3.0 or SIP 503 on E911 Routes', 
    tier1: 'Instant Slack #telecom-p1 & PagerDuty High-Urgency', 
    tier2: 'Automated Voice Call to Lead Telecom Engineer (+5m)', 
    tier3: 'SMS to VP of Infrastructure & Carrier VP (+15m)', 
    status: 'ACTIVE',
    channel: 'PagerDuty + Voice',
    lastFired: '3 days ago'
  },
  { 
    id: 2, 
    name: 'Toll-Free Inbound DID SLA Breach Policy', 
    trigger: 'P99 Latency > 350ms or Dead Air Silence > 2.5s', 
    tier1: 'Slack #ivr-incidents webhook notification', 
    tier2: 'Auto-create ServiceNow P2 Incident after 10m', 
    tier3: 'Email Tier-1 Carrier Account Manager after 30m', 
    status: 'ACTIVE',
    channel: 'Slack + ServiceNow',
    lastFired: 'Yesterday'
  },
  { 
    id: 3, 
    name: 'Voicebot NLU Intent Hallucination Surge', 
    trigger: 'Intent Fallback Escalation Rate > 18%', 
    tier1: 'Slack #ai-voicebot-alerts payload', 
    tier2: 'Auto-pivot prompt version to Safe Fallback LLM (+5m)', 
    tier3: 'Engage Human Agent Overflow Queue (+10m)', 
    status: 'ACTIVE',
    channel: 'Slack + Gemini Prompt Switch',
    lastFired: '6 hours ago'
  }
];

const ON_CALL_ROTATION = [
  { shift: 'Primary On-Call (24/7)', engineer: 'Alexander Vance (Telecom Ops)', phone: '+1 (555) 019-2831', status: 'ON_DUTY' },
  { shift: 'Secondary Escalation', engineer: 'Elena Rostova (SBC Architect)', phone: '+1 (555) 014-9912', status: 'STANDBY' },
  { shift: 'VP Engineering Escalation', engineer: 'Marcus Sterling (Infrastructure)', phone: '+1 (555) 018-4421', status: 'TIER_3' }
];

export default function EscalationPolicies() {
  const [policies, setPolicies] = useState(INITIAL_POLICIES);
  const [showAddForm, setShowAddForm] = useState(false);
  const [testAlertToast, setTestAlertToast] = useState(null);
  const [newPolicy, setNewPolicy] = useState({
    name: '',
    trigger: '',
    tier1: '',
    tier2: '',
    tier3: '',
    channel: 'Slack + PagerDuty'
  });

  const handleToggleStatus = (id) => {
    setPolicies(policies.map(p => {
      if (p.id === id) {
        return { ...p, status: p.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE' };
      }
      return p;
    }));
  };

  const handleDeletePolicy = (id) => {
    setPolicies(policies.filter(p => p.id !== id));
  };

  const handleCreatePolicy = (e) => {
    e.preventDefault();
    if (!newPolicy.name || !newPolicy.trigger) return;
    const added = {
      id: Date.now(),
      name: newPolicy.name,
      trigger: newPolicy.trigger,
      tier1: newPolicy.tier1 || 'Slack webhook notification',
      tier2: newPolicy.tier2 || 'Voice call to on-call engineer',
      tier3: newPolicy.tier3 || 'Executive notification',
      status: 'ACTIVE',
      channel: newPolicy.channel,
      lastFired: 'Never'
    };
    setPolicies([...policies, added]);
    setShowAddForm(false);
    setNewPolicy({ name: '', trigger: '', tier1: '', tier2: '', tier3: '', channel: 'Slack + PagerDuty' });
  };

  const handleTestAlert = (policy) => {
    setTestAlertToast(`Synthetic test alert successfully dispatched for "${policy.name}" across ${policy.channel}!`);
    setTimeout(() => setTestAlertToast(null), 4000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="glass-panel glass-panel-glow" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldAlert size={24} color="#f43f5e" />
              Incident Escalation & Multi-Tier Notification Policies
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Define automated alert escalation rules replacing Klearcom and Cyara 24/7 Outage Escalation services.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button 
              className="btn btn-primary"
              onClick={() => setShowAddForm(!showAddForm)}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem' }}
            >
              <Plus size={15} /> {showAddForm ? 'Close Form' : 'New Escalation Policy'}
            </button>
          </div>
        </div>

        {/* Live Notification Alert Toast */}
        {testAlertToast && (
          <div style={{ 
            marginTop: '16px', 
            background: 'rgba(16, 185, 129, 0.2)', 
            border: '1px solid #10b981', 
            borderRadius: '8px', 
            padding: '12px 16px', 
            color: '#34d399', 
            fontSize: '0.85rem', 
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <CheckCircle2 size={16} />
            {testAlertToast}
          </div>
        )}
      </div>

      {/* On-Call Engineer Rotation Bar */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <UserCheck size={18} color="#06b6d4" />
          Live 24/7 Telecom Operations On-Call Roster
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
          {ON_CALL_ROTATION.map((oc, i) => (
            <div key={i} style={{ background: 'rgba(0,0,0,0.25)', padding: '12px 14px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '0.7rem', color: '#38bdf8', fontWeight: 800, textTransform: 'uppercase' }}>{oc.shift}</span>
                <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.9rem', marginTop: '2px' }}>{oc.engineer}</div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{oc.phone}</div>
              </div>
              <span className={`badge ${oc.status === 'ON_DUTY' ? 'badge-emerald' : 'badge-cyan'}`} style={{ fontSize: '0.7rem' }}>
                {oc.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Add Policy Form */}
      {showAddForm && (
        <form onSubmit={handleCreatePolicy} className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', border: '1px solid #38bdf8' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#38bdf8' }}>Create Incident Escalation Policy</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Policy Title</label>
              <input 
                type="text" 
                placeholder="e.g. SIP Trunk Loss of Signaling" 
                value={newPolicy.name} 
                onChange={e => setNewPolicy({ ...newPolicy, name: e.target.value })} 
                className="input-field" 
                style={{ width: '100%', padding: '8px 12px' }} 
                required 
              />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Trigger SLA Condition</label>
              <input 
                type="text" 
                placeholder="e.g. Packet Loss > 5% for 3 mins" 
                value={newPolicy.trigger} 
                onChange={e => setNewPolicy({ ...newPolicy, trigger: e.target.value })} 
                className="input-field" 
                style={{ width: '100%', padding: '8px 12px' }} 
                required 
              />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Tier 1 (Immediate)</label>
              <input 
                type="text" 
                placeholder="e.g. Slack & PagerDuty" 
                value={newPolicy.tier1} 
                onChange={e => setNewPolicy({ ...newPolicy, tier1: e.target.value })} 
                className="input-field" 
                style={{ width: '100%', padding: '8px 12px' }} 
              />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Tier 2 (+5m Delay)</label>
              <input 
                type="text" 
                placeholder="e.g. Phone call to on-call lead" 
                value={newPolicy.tier2} 
                onChange={e => setNewPolicy({ ...newPolicy, tier2: e.target.value })} 
                className="input-field" 
                style={{ width: '100%', padding: '8px 12px' }} 
              />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setShowAddForm(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Escalation Policy</button>
          </div>
        </form>
      )}

      {/* Policy List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {policies.map(p => (
          <div key={p.id} className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>{p.name}</div>
                <span className={`badge ${p.status === 'ACTIVE' ? 'badge-emerald' : 'badge-amber'}`} style={{ fontSize: '0.72rem' }}>
                  {p.status}
                </span>
                <span className="badge badge-indigo" style={{ fontSize: '0.7rem' }}>
                  {p.channel}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button 
                  onClick={() => handleTestAlert(p)}
                  className="btn btn-secondary"
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', padding: '5px 10px' }}
                >
                  <Send size={13} /> Test Alert Trigger
                </button>

                <button 
                  onClick={() => handleToggleStatus(p.id)}
                  className="btn btn-secondary"
                  style={{ fontSize: '0.75rem', padding: '5px 10px' }}
                >
                  {p.status === 'ACTIVE' ? 'Pause' : 'Activate'}
                </button>

                <button 
                  onClick={() => handleDeletePolicy(p.id)}
                  className="btn btn-secondary"
                  style={{ padding: '5px 8px', color: '#f87171' }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            <div style={{ fontSize: '0.82rem', color: '#f87171', fontWeight: 600, background: 'rgba(239, 68, 68, 0.1)', padding: '8px 12px', borderRadius: '6px' }}>
              TRIGGER THRESHOLD: {p.trigger}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', background: 'rgba(0,0,0,0.25)', padding: '14px', borderRadius: '10px' }}>
              <div>
                <div style={{ fontSize: '0.7rem', color: '#34d399', fontWeight: 800, textTransform: 'uppercase' }}>TIER 1 (IMMEDIATE)</div>
                <div style={{ fontSize: '0.85rem', color: '#fff', marginTop: '4px' }}>{p.tier1}</div>
              </div>

              <div>
                <div style={{ fontSize: '0.7rem', color: '#38bdf8', fontWeight: 800, textTransform: 'uppercase' }}>TIER 2 (+5 MIN DELAY)</div>
                <div style={{ fontSize: '0.85rem', color: '#38bdf8', marginTop: '4px' }}>{p.tier2}</div>
              </div>

              <div>
                <div style={{ fontSize: '0.7rem', color: '#a78bfa', fontWeight: 800, textTransform: 'uppercase' }}>TIER 3 (+15 MIN ESCALATION)</div>
                <div style={{ fontSize: '0.85rem', color: '#a78bfa', marginTop: '4px' }}>{p.tier3}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
