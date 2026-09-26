import React, { useState } from 'react';
import { 
  Bell, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  Play, 
  ShieldAlert, 
  Send,
  Trash2,
  Lock,
  Code,
  Sliders,
  ExternalLink
} from 'lucide-react';

const INITIAL_WEBHOOKS = [
  { id: 'wh-901', endpoint: 'https://hooks.slack.com/services/T00/B00/VOXPULSE', event: 'ALERT_CALL_FAILED', attempts: 1, maxAttempts: 5, status: 'DELIVERED', httpCode: 200, lastAttempt: '10s ago', nextBackoff: 'None', payload: { event: 'ALERT_CALL_FAILED', did: '+18005550100', sipCode: 503, reason: 'Carrier Trunk Timeout' } },
  { id: 'wh-902', endpoint: 'https://events.pagerduty.com/v2/enqueue', event: 'OUTAGE_EMERGENCY_911', attempts: 1, maxAttempts: 5, status: 'DELIVERED', httpCode: 202, lastAttempt: '1m ago', nextBackoff: 'None', payload: { event: 'OUTAGE_EMERGENCY_911', severity: 'CRITICAL', pop: 'US-East (Ashburn)', didsAffected: 14 } },
  { id: 'wh-903', endpoint: 'https://api.servicenow.com/incidents/telephony', event: 'MOS_QUALITY_DEGRADED', attempts: 3, maxAttempts: 5, status: 'RETRYING', httpCode: 503, lastAttempt: '5s ago', nextBackoff: 'In 32s (Attempt 4)', payload: { event: 'MOS_QUALITY_DEGRADED', currentMOS: 3.12, threshold: 4.0, carrier: 'Tata' } },
  { id: 'wh-904', endpoint: 'https://internal-siem.corp.net/v1/telecom', event: 'PCI_DTMF_VIOLATION', attempts: 5, maxAttempts: 5, status: 'DEAD_LETTER', httpCode: 504, lastAttempt: '12m ago', nextBackoff: 'Exhausted (DLQ)', payload: { event: 'PCI_DTMF_VIOLATION', severity: 'HIGH', callId: 'c84920-a892' } }
];

export default function WebHookRetryEngine() {
  const [webhooks, setWebhooks] = useState(INITIAL_WEBHOOKS);
  const [selectedWebhook, setSelectedWebhook] = useState(INITIAL_WEBHOOKS[0]);
  const [isDispatching, setIsDispatching] = useState(false);
  const [newEvent, setNewEvent] = useState('ALERT_CALL_FAILED');
  const [newEndpoint, setNewEndpoint] = useState('https://webhook.site/voxpulse-demo');
  const [backoffBase, setBackoffBase] = useState(2); // base multiplier

  const handleReplayWebhook = (id) => {
    setWebhooks(webhooks.map(w => {
      if (w.id === id) {
        return { 
          ...w, 
          status: 'DELIVERED', 
          httpCode: 200, 
          attempts: w.attempts + 1, 
          nextBackoff: 'Resolved',
          lastAttempt: 'Just now' 
        };
      }
      return w;
    }));
  };

  const handleDispatchTest = (e) => {
    e.preventDefault();
    setIsDispatching(true);
    setTimeout(() => {
      const dispatched = {
        id: `wh-${Date.now().toString().slice(-4)}`,
        endpoint: newEndpoint,
        event: newEvent,
        attempts: 1,
        maxAttempts: 5,
        status: 'DELIVERED',
        httpCode: 200,
        lastAttempt: 'Just now',
        nextBackoff: 'None',
        payload: {
          event: newEvent,
          timestamp: new Date().toISOString(),
          origin: 'VoxPulse Realtime Telephony Webhook Daemon',
          cluster: 'US-East-Primary',
          signature: 'sha256=9b72c91823901a884ef92819'
        }
      };
      setWebhooks([dispatched, ...webhooks]);
      setSelectedWebhook(dispatched);
      setIsDispatching(false);
    }, 600);
  };

  const handlePurgeDLQ = () => {
    setWebhooks(webhooks.filter(w => w.status !== 'DEAD_LETTER'));
  };

  const totalDelivered = webhooks.filter(w => w.status === 'DELIVERED').length;
  const totalRetrying = webhooks.filter(w => w.status === 'RETRYING').length;
  const totalDLQ = webhooks.filter(w => w.status === 'DEAD_LETTER').length;
  const successRate = Math.round((totalDelivered / (webhooks.length || 1)) * 100);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="glass-panel glass-panel-glow" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Bell color="#06b6d4" size={24} /> Webhook Delivery Queue & Exponential Backoff Engine
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
              Enterprise notification dispatcher with HMAC-SHA256 signatures, exponential backoff retries, and dead-letter queue (DLQ) replay.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {totalDLQ > 0 && (
              <button 
                className="btn btn-secondary" 
                onClick={handlePurgeDLQ}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: '#f87171' }}
              >
                <Trash2 size={15} /> Purge DLQ ({totalDLQ})
              </button>
            )}
            <span className="badge badge-emerald" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
              {successRate}% Delivery Success
            </span>
          </div>
        </div>

        {/* Realtime KPI Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '14px', marginTop: '20px' }}>
          <div style={{ background: 'rgba(0,0,0,0.25)', padding: '12px 14px', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Delivered Payloads</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#34d399' }}>{totalDelivered}</div>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.25)', padding: '12px 14px', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Active Backoff Retries</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#f59e0b' }}>{totalRetrying}</div>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.25)', padding: '12px 14px', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Dead Letter Queue</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ef4444' }}>{totalDLQ}</div>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.25)', padding: '12px 14px', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Backoff Formula</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#38bdf8' }}>t = {backoffBase}^n ± 10%</div>
          </div>
        </div>
      </div>

      {/* Manual Dispatch Form */}
      <form onSubmit={handleDispatchTest} className="glass-panel" style={{ padding: '20px', display: 'flex', gap: '12px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '220px' }}>
          <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Target Webhook URL</label>
          <input 
            type="url" 
            value={newEndpoint}
            onChange={e => setNewEndpoint(e.target.value)}
            className="input-field" 
            style={{ width: '100%', padding: '8px 12px' }}
            required
          />
        </div>

        <div style={{ width: '220px' }}>
          <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Simulation Event Trigger</label>
          <select 
            value={newEvent}
            onChange={e => setNewEvent(e.target.value)}
            className="input-field"
            style={{ width: '100%', padding: '8px 12px' }}
          >
            <option value="ALERT_CALL_FAILED">ALERT_CALL_FAILED (SIP 503)</option>
            <option value="MOS_QUALITY_DEGRADED">MOS_QUALITY_DEGRADED (&lt; 3.5)</option>
            <option value="OUTAGE_EMERGENCY_911">OUTAGE_EMERGENCY_911 (P1)</option>
            <option value="PCI_DTMF_VIOLATION">PCI_DTMF_VIOLATION</option>
            <option value="STIR_SHAKEN_FAILED">STIR_SHAKEN_FAILED</option>
          </select>
        </div>

        <button 
          type="submit" 
          disabled={isDispatching}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '6px', height: '38px', padding: '0 16px' }}
        >
          <Send size={15} /> {isDispatching ? 'Dispatching...' : 'Dispatch Test Payload'}
        </button>
      </form>

      {/* Queue Table + Payload Inspector */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: '20px' }}>
        {/* Table */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '14px' }}>
            Dispatched Delivery Queue ({webhooks.length})
          </h3>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.68rem' }}>
                  <th style={{ padding: '8px 6px' }}>ID</th>
                  <th style={{ padding: '8px 6px' }}>Event</th>
                  <th style={{ padding: '8px 6px' }}>Attempts</th>
                  <th style={{ padding: '8px 6px' }}>HTTP</th>
                  <th style={{ padding: '8px 6px' }}>Status</th>
                  <th style={{ padding: '8px 6px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {webhooks.map(w => (
                  <tr 
                    key={w.id}
                    onClick={() => setSelectedWebhook(w)}
                    style={{ 
                      borderBottom: '1px solid rgba(255,255,255,0.04)',
                      background: selectedWebhook?.id === w.id ? 'rgba(6, 182, 212, 0.1)' : undefined,
                      cursor: 'pointer'
                    }}
                  >
                    <td style={{ padding: '10px 6px', fontWeight: 700, color: '#06b6d4', fontFamily: 'var(--font-mono)' }}>{w.id}</td>
                    <td style={{ padding: '10px 6px', color: '#fff' }}>{w.event}</td>
                    <td style={{ padding: '10px 6px', color: 'var(--text-muted)' }}>{w.attempts} / {w.maxAttempts}</td>
                    <td style={{ padding: '10px 6px', fontFamily: 'var(--font-mono)', color: w.httpCode >= 200 && w.httpCode < 300 ? '#34d399' : '#f87171' }}>
                      {w.httpCode}
                    </td>
                    <td style={{ padding: '10px 6px' }}>
                      <span className={`badge ${w.status === 'DELIVERED' ? 'badge-emerald' : w.status === 'RETRYING' ? 'badge-amber' : 'badge-rose'}`} style={{ fontSize: '0.68rem' }}>
                        {w.status}
                      </span>
                    </td>
                    <td style={{ padding: '10px 6px' }}>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleReplayWebhook(w.id); }}
                        className="btn btn-secondary"
                        style={{ padding: '3px 8px', fontSize: '0.7rem' }}
                      >
                        Replay
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Payload Inspector */}
        {selectedWebhook && (
          <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>{selectedWebhook.id} Details</div>
              <span className="badge badge-indigo" style={{ fontSize: '0.7rem' }}>{selectedWebhook.event}</span>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.25)', padding: '10px', borderRadius: '6px', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div><span style={{ color: 'var(--text-muted)' }}>Destination:</span> <span style={{ color: '#38bdf8', wordBreak: 'break-all' }}>{selectedWebhook.endpoint}</span></div>
              <div><span style={{ color: 'var(--text-muted)' }}>Next Backoff:</span> <span style={{ color: '#fff' }}>{selectedWebhook.nextBackoff}</span></div>
              <div><span style={{ color: 'var(--text-muted)' }}>HMAC-SHA256 Auth:</span> <strong style={{ color: '#34d399' }}>Verified</strong></div>
            </div>

            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px' }}>
                Signed JSON Payload Body
              </div>
              <pre style={{ 
                background: 'rgba(0,0,0,0.5)', 
                padding: '12px', 
                borderRadius: '8px', 
                fontFamily: 'var(--font-mono)', 
                fontSize: '0.72rem', 
                color: '#34d399', 
                whiteSpace: 'pre-wrap', 
                maxHeight: '220px', 
                overflowY: 'auto' 
              }}>
                {JSON.stringify(selectedWebhook.payload, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
