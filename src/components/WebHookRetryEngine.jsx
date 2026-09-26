import React, { useState } from 'react';
import { Bell, RefreshCw, CheckCircle2, AlertTriangle, Play, ShieldAlert, Send } from 'lucide-react';

export default function WebHookRetryEngine() {
  const [webhooks, setWebhooks] = useState([
    { id: 'wh-901', endpoint: 'https://hooks.slack.com/services/T00/B00/XXXX', event: 'ALERT_CALL_FAILED', attempts: 1, maxAttempts: 5, status: 'DELIVERED (HTTP 200)', lastAttempt: '10s ago' },
    { id: 'wh-902', endpoint: 'https://events.pagerduty.com/v2/enqueue', event: 'OUTAGE_EMERGENCY_911', attempts: 1, maxAttempts: 5, status: 'DELIVERED (HTTP 202)', lastAttempt: '1m ago' },
    { id: 'wh-903', endpoint: 'https://api.servicenow.com/incidents', event: 'MOS_QUALITY_DEGRADED', attempts: 3, maxAttempts: 5, status: 'RETRYING (HTTP 503)', lastAttempt: '5s ago' }
  ]);

  const handleReplayWebhook = (id) => {
    setWebhooks(webhooks.map(w => w.id === id ? { ...w, status: 'DELIVERED (HTTP 200)', attempts: w.attempts + 1 } : w));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Bell color="#06b6d4" size={28} /> Webhook Delivery Queue & Exponential Backoff Engine
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Monitor real-time webhook payload deliveries, exponential backoff retries, and dead-letter queue (DLQ) replay.
          </p>
        </div>

        <span className="badge badge-emerald" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
          Queue Health 100%
        </span>
      </div>

      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
          Webhook Dispatch Queue Table
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.72rem' }}>
                <th style={{ padding: '10px' }}>Dispatch ID</th>
                <th style={{ padding: '10px' }}>Endpoint URL</th>
                <th style={{ padding: '10px' }}>Trigger Event</th>
                <th style={{ padding: '10px' }}>Retry Attempt</th>
                <th style={{ padding: '10px' }}>Status</th>
                <th style={{ padding: '10px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {webhooks.map((w) => (
                <tr key={w.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '12px 10px', fontWeight: 700, color: '#fff' }}>{w.id}</td>
                  <td style={{ padding: '12px 10px', color: 'var(--text-muted)', fontSize: '0.78rem' }}>{w.endpoint}</td>
                  <td style={{ padding: '12px 10px', color: '#06b6d4', fontWeight: 600 }}>{w.event}</td>
                  <td style={{ padding: '12px 10px', color: 'var(--text-muted)' }}>{w.attempts} / {w.maxAttempts}</td>
                  <td style={{ padding: '12px 10px' }}>
                    <span className={`badge ${w.status.includes('DELIVERED') ? 'badge-emerald' : 'badge-amber'}`}>
                      {w.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 10px' }}>
                    <button className="btn btn-secondary" onClick={() => handleReplayWebhook(w.id)} style={{ fontSize: '0.72rem', padding: '4px 8px' }}>
                      Replay Payload
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
