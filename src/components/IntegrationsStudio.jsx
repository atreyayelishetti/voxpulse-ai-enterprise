import React, { useState } from 'react';
import { 
  Bell, 
  MessageSquare, 
  CheckCircle2, 
  Plus, 
  Send, 
  Zap,
  Sliders
} from 'lucide-react';

const INTEGRATIONS = [
  { id: 1, name: 'Slack Security Alerts', type: 'SLACK', url: 'https://hooks.slack.com/services/T00/B00/X00', status: 'ACTIVE' },
  { id: 2, name: 'PagerDuty Incident Escalation', type: 'PAGERDUTY', url: 'https://events.pagerduty.com/v2/enqueue', status: 'ACTIVE' },
  { id: 3, name: 'ServiceNow Ticket Automation', type: 'SERVICENOW', url: 'https://instance.service-now.com/api/now/table/incident', status: 'ACTIVE' },
  { id: 4, name: 'Datadog Telemetry Webhook', type: 'DATADOG', url: 'https://api.datadoghq.com/api/v1/events', status: 'ACTIVE' }
];

export default function IntegrationsStudio() {
  const [integrations, setIntegrations] = useState(INTEGRATIONS);
  const [testStatus, setTestStatus] = useState(null);

  const handleTestTrigger = (name) => {
    setTestStatus(`Webhook alert test event sent to ${name}!`);
    setTimeout(() => setTestStatus(null), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="glass-panel glass-panel-glow" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Bell size={24} color="#06b6d4" />
              Integrations & Incident Auto-Ticket Management
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Automatically trigger incidents in Slack, PagerDuty, ServiceNow, and Jira upon IVR prompt or MOS failure.
            </p>
          </div>
        </div>

        {testStatus && (
          <div style={{ marginTop: '14px', padding: '10px 14px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '8px', color: '#34d399', fontSize: '0.85rem', fontWeight: 600 }}>
            ✓ {testStatus}
          </div>
        )}
      </div>

      {/* Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
        {integrations.map(item => (
          <div key={item.id} style={{
            background: 'rgba(31, 41, 55, 0.5)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '18px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>{item.name}</div>
              <span className="badge badge-emerald">{item.status}</span>
            </div>

            <div style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', background: 'rgba(0,0,0,0.25)', padding: '8px 12px', borderRadius: '6px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {item.url}
            </div>

            <button onClick={() => handleTestTrigger(item.name)} className="btn btn-secondary" style={{ fontSize: '0.8rem', padding: '6px' }}>
              <Send size={14} /> Send Test Alert Payload
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
