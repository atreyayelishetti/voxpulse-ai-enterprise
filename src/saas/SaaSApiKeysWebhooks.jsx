import React, { useState, useEffect } from 'react';
import { 
  Key, 
  Plus, 
  Trash2, 
  Copy, 
  Check, 
  Radio, 
  ShieldCheck, 
  Bell, 
  Code, 
  ExternalLink,
  Send,
  CheckCircle2,
  Lock
} from 'lucide-react';

export default function SaaSApiKeysWebhooks({ currentOrg }) {
  const [apiKeys, setApiKeys] = useState([]);
  const [webhooks, setWebhooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals & Forms
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [showWhModal, setShowWhModal] = useState(false);
  const [keyName, setKeyName] = useState('');
  const [keyEnv, setKeyEnv] = useState('PRODUCTION');
  const [selectedScopes, setSelectedScopes] = useState(['tests:trigger', 'telemetry:read']);
  const [whUrl, setWhUrl] = useState('');
  const [selectedEvents, setSelectedEvents] = useState(['test.failed', 'sla.breached']);

  // Copy status & Ping feedback
  const [copiedKeyId, setCopiedKeyId] = useState(null);
  const [pingResult, setPingResult] = useState(null);
  const [testingWhId, setTestingWhId] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  useEffect(() => {
    fetchData();
  }, [currentOrg?.id]);

  const fetchData = async () => {
    try {
      const [keysRes, whRes] = await Promise.all([
        fetch('/api/saas/apikeys'),
        fetch('/api/saas/webhooks')
      ]);
      const keysData = await keysRes.json();
      const whData = await whRes.json();
      if (keysData.success) setApiKeys(keysData.apiKeys);
      if (whData.success) setWebhooks(whData.webhooks);
    } catch (e) {
      console.error('Failed to fetch developer platform data:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateKey = async (e) => {
    e.preventDefault();
    if (!keyName) return;

    try {
      const res = await fetch('/api/saas/apikeys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: keyName, environment: keyEnv, scopes: selectedScopes })
      });
      const data = await res.json();
      if (data.success) {
        setApiKeys([...apiKeys, data.apiKey]);
        setShowKeyModal(false);
        setKeyName('');
        setSuccessMsg(`API Key created! Prefix: ${data.apiKey.prefix}`);
        setTimeout(() => setSuccessMsg(null), 4000);
      }
    } catch (err) {
      console.error('Create API key error:', err);
    }
  };

  const handleRevokeKey = async (id) => {
    if (!confirm('Are you sure you want to revoke this API key? Applications using it will immediately fail.')) return;
    try {
      await fetch(`/api/saas/apikeys/${id}`, { method: 'DELETE' });
      setApiKeys(apiKeys.filter(k => k.id !== id));
    } catch (err) {
      console.error('Revoke API key error:', err);
    }
  };

  const handleCreateWebhook = async (e) => {
    e.preventDefault();
    if (!whUrl) return;

    try {
      const res = await fetch('/api/saas/webhooks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: whUrl, events: selectedEvents })
      });
      const data = await res.json();
      if (data.success) {
        setWebhooks([...webhooks, data.webhook]);
        setShowWhModal(false);
        setWhUrl('');
        setSuccessMsg('Webhook endpoint registered successfully!');
        setTimeout(() => setSuccessMsg(null), 4000);
      }
    } catch (err) {
      console.error('Create webhook error:', err);
    }
  };

  const handleTestPing = async (whId) => {
    setTestingWhId(whId);
    setPingResult(null);
    try {
      const res = await fetch(`/api/saas/webhooks/${whId}/test`, { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setPingResult(data.result);
        fetchData();
      }
    } catch (err) {
      console.error('Test ping failed:', err);
    } finally {
      setTestingWhId(null);
    }
  };

  const handleCopy = (text, id) => {
    navigator.clipboard?.writeText(text);
    setCopiedKeyId(id);
    setTimeout(() => setCopiedKeyId(null), 2500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Code color="#fbbf24" size={30} /> Developer Platform: API Keys & Webhooks
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
            Integrate VoxPulse automated IVR testing into GitHub Actions, Jenkins CI/CD, Datadog, PagerDuty, and custom microservices.
          </p>
        </div>
      </div>

      {successMsg && (
        <div style={{
          background: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid #10b981',
          padding: '12px 18px',
          borderRadius: '10px',
          color: '#34d399',
          fontSize: '0.9rem',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <CheckCircle2 size={18} /> {successMsg}
        </div>
      )}

      {/* SECTION 1: Developer API Keys */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Key size={18} color="#f59e0b" /> Organization API Keys
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '2px' }}>
              Bearer authentication tokens with granular permission scopes.
            </p>
          </div>

          <button
            onClick={() => setShowKeyModal(true)}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', fontSize: '0.8rem', borderRadius: '8px' }}
          >
            <Plus size={15} /> Generate API Key
          </button>
        </div>

        {apiKeys.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '24px', color: '#94a3b8', fontSize: '0.85rem' }}>
            No API keys generated yet. Click "Generate API Key" to connect your CI/CD pipeline.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.72rem' }}>
                  <th style={{ padding: '10px' }}>Key Name</th>
                  <th style={{ padding: '10px' }}>Token Preview</th>
                  <th style={{ padding: '10px' }}>Environment</th>
                  <th style={{ padding: '10px' }}>Scopes</th>
                  <th style={{ padding: '10px' }}>Last Used</th>
                  <th style={{ padding: '10px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {apiKeys.map((k) => (
                  <tr key={k.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '12px 10px', fontWeight: 700, color: '#fff' }}>
                      {k.name}
                    </td>
                    <td style={{ padding: '12px 10px' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(0,0,0,0.3)', padding: '4px 8px', borderRadius: '6px', fontFamily: 'monospace', fontSize: '0.78rem', color: '#38bdf8' }}>
                        <span>{k.prefix}</span>
                        <button
                          onClick={() => handleCopy(k.fullKeyPreview || k.prefix, k.id)}
                          style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0 }}
                          title="Copy Full Token"
                        >
                          {copiedKeyId === k.id ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
                        </button>
                      </div>
                    </td>
                    <td style={{ padding: '12px 10px' }}>
                      <span className={`badge ${k.environment === 'PRODUCTION' ? 'badge-emerald' : 'badge-amber'}`} style={{ fontSize: '0.66rem' }}>
                        {k.environment}
                      </span>
                    </td>
                    <td style={{ padding: '12px 10px' }}>
                      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                        {k.scopes?.map((s, idx) => (
                          <span key={idx} style={{ background: 'rgba(255,255,255,0.06)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.68rem', color: '#cbd5e1' }}>
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td style={{ padding: '12px 10px', color: '#94a3b8', fontSize: '0.8rem' }}>
                      {k.lastUsedAt}
                    </td>
                    <td style={{ padding: '12px 10px', textAlign: 'right' }}>
                      <button
                        onClick={() => handleRevokeKey(k.id)}
                        className="btn btn-rose"
                        style={{ padding: '4px 8px', fontSize: '0.72rem', borderRadius: '6px' }}
                        title="Revoke Key"
                      >
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* SECTION 2: Outbound Webhooks */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Bell size={18} color="#38bdf8" /> Outbound Webhook Subscriptions
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '2px' }}>
              HMAC-SHA256 signed payloads dispatched on test completion, SLA breach, or emergency outage.
            </p>
          </div>

          <button
            onClick={() => setShowWhModal(true)}
            className="btn btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', fontSize: '0.8rem', borderRadius: '8px' }}
          >
            <Plus size={15} /> Add Webhook Endpoint
          </button>
        </div>

        {webhooks.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '24px', color: '#94a3b8', fontSize: '0.85rem' }}>
            No webhook endpoints registered. Click "Add Webhook Endpoint" to receive real-time alerts.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.72rem' }}>
                  <th style={{ padding: '10px' }}>Target URL</th>
                  <th style={{ padding: '10px' }}>Subscribed Events</th>
                  <th style={{ padding: '10px' }}>Signing Secret</th>
                  <th style={{ padding: '10px' }}>Last Delivery</th>
                  <th style={{ padding: '10px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {webhooks.map((wh) => (
                  <tr key={wh.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '12px 10px', fontWeight: 600, color: '#38bdf8', maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {wh.url}
                    </td>
                    <td style={{ padding: '12px 10px' }}>
                      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                        {wh.events?.map((ev, idx) => (
                          <span key={idx} className="badge badge-cyan" style={{ fontSize: '0.64rem', padding: '2px 6px' }}>
                            {ev}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td style={{ padding: '12px 10px', fontFamily: 'monospace', fontSize: '0.75rem', color: '#94a3b8' }}>
                      {wh.secret ? `${wh.secret.slice(0, 10)}...` : 'whsec_••••'}
                    </td>
                    <td style={{ padding: '12px 10px', fontSize: '0.78rem', color: wh.lastStatusCode === 200 ? '#10b981' : '#cbd5e1' }}>
                      {wh.lastDelivery ? (
                        <span>{wh.lastStatusCode ? `HTTP ${wh.lastStatusCode} • ` : ''}{wh.lastDelivery.split('T')[0]}</span>
                      ) : (
                        'Never'
                      )}
                    </td>
                    <td style={{ padding: '12px 10px', textAlign: 'right' }}>
                      <button
                        onClick={() => handleTestPing(wh.id)}
                        disabled={testingWhId === wh.id}
                        className="btn btn-secondary"
                        style={{ padding: '5px 10px', fontSize: '0.74rem', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                      >
                        <Send size={12} /> {testingWhId === wh.id ? 'Sending...' : 'Test Ping'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Ping Result Live Output Card */}
      {pingResult && (
        <div className="glass-card" style={{ padding: '20px', border: '1px solid rgba(16, 185, 129, 0.4)', background: 'rgba(16, 185, 129, 0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#34d399', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} /> Webhook Verification Ping Delivered (HTTP {pingResult.httpStatus})
            </h4>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>URL: {pingResult.deliveredTo}</span>
          </div>

          <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '8px' }}>
            <strong>X-VoxPulse-Signature:</strong> <code style={{ color: '#06b6d4' }}>{pingResult.hmacSignature}</code>
          </div>

          <pre style={{
            background: 'rgba(0,0,0,0.5)',
            padding: '12px',
            borderRadius: '8px',
            fontSize: '0.75rem',
            color: '#a78bfa',
            overflowX: 'auto',
            margin: 0
          }}>
            {JSON.stringify(pingResult.payload, null, 2)}
          </pre>
        </div>
      )}

      {/* Modal: Generate API Key */}
      {showKeyModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div className="glass-card" style={{ width: '460px', padding: '28px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Key color="#f59e0b" size={22} /> Generate Scoped API Key
            </h3>

            <form onSubmit={handleCreateKey} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Key Description</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. GitHub Actions Production E2E Suite"
                  value={keyName}
                  onChange={(e) => setKeyName(e.target.value)}
                  className="input-field"
                  style={{ width: '100%', padding: '10px 12px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Target Environment</label>
                <select
                  value={keyEnv}
                  onChange={(e) => setKeyEnv(e.target.value)}
                  className="input-field"
                  style={{ width: '100%', padding: '10px 12px' }}
                >
                  <option value="PRODUCTION">Production (Live PSTN Calls & Trunks)</option>
                  <option value="STAGING">Staging / Development (Simulator & Sandbox)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Permissions</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.82rem', color: '#cbd5e1' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input type="checkbox" checked={selectedScopes.includes('tests:trigger')} onChange={(e) => {
                      setSelectedScopes(e.target.checked ? [...selectedScopes, 'tests:trigger'] : selectedScopes.filter(s => s !== 'tests:trigger'));
                    }} />
                    <span><code>tests:trigger</code> - Trigger synthetic IVR test flows</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input type="checkbox" checked={selectedScopes.includes('telemetry:read')} onChange={(e) => {
                      setSelectedScopes(e.target.checked ? [...selectedScopes, 'telemetry:read'] : selectedScopes.filter(s => s !== 'telemetry:read'));
                    }} />
                    <span><code>telemetry:read</code> - Read POLQA/MOS & SIP metrics</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input type="checkbox" checked={selectedScopes.includes('dids:read')} onChange={(e) => {
                      setSelectedScopes(e.target.checked ? [...selectedScopes, 'dids:read'] : selectedScopes.filter(s => s !== 'dids:read'));
                    }} />
                    <span><code>dids:read</code> - Query global phone number pools</span>
                  </label>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button type="button" onClick={() => setShowKeyModal(false)} className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-primary">Create Key</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Webhook */}
      {showWhModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div className="glass-card" style={{ width: '480px', padding: '28px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Bell color="#38bdf8" size={22} /> Add Webhook Subscription
            </h3>

            <form onSubmit={handleCreateWebhook} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Endpoint URL</label>
                <input
                  type="url"
                  required
                  placeholder="https://api.yourcompany.com/webhooks/voxpulse"
                  value={whUrl}
                  onChange={(e) => setWhUrl(e.target.value)}
                  className="input-field"
                  style={{ width: '100%', padding: '10px 12px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Event Triggers</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.82rem', color: '#cbd5e1' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input type="checkbox" checked={selectedEvents.includes('test.failed')} onChange={(e) => {
                      setSelectedEvents(e.target.checked ? [...selectedEvents, 'test.failed'] : selectedEvents.filter(ev => ev !== 'test.failed'));
                    }} />
                    <span><code>test.failed</code> - Test flow step failure or timeout</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input type="checkbox" checked={selectedEvents.includes('sla.breached')} onChange={(e) => {
                      setSelectedEvents(e.target.checked ? [...selectedEvents, 'sla.breached'] : selectedEvents.filter(ev => ev !== 'sla.breached'));
                    }} />
                    <span><code>sla.breached</code> - MOS score dropped below 4.0 threshold</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input type="checkbox" checked={selectedEvents.includes('outage.emergency_911')} onChange={(e) => {
                      setSelectedEvents(e.target.checked ? [...selectedEvents, 'outage.emergency_911'] : selectedEvents.filter(ev => ev !== 'outage.emergency_911'));
                    }} />
                    <span><code>outage.emergency_911</code> - Critical PSAP line unreachable</span>
                  </label>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button type="button" onClick={() => setShowWhModal(false)} className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-primary">Save Endpoint</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
