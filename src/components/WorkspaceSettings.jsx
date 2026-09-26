import React, { useState } from 'react';
import { 
  Settings, 
  Key, 
  Database, 
  ShieldCheck, 
  Save, 
  CheckCircle2,
  Sliders,
  Building
} from 'lucide-react';

export default function WorkspaceSettings({ systemConfig }) {
  const [geminiKey, setGeminiKey] = useState('');
  const [twilioSid, setTwilioSid] = useState('');
  const [twilioToken, setTwilioToken] = useState('');
  const [saveStatus, setSaveStatus] = useState(null);

  const handleSave = async () => {
    try {
      const res = await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          geminiApiKey: geminiKey,
          twilioSid,
          twilioToken
        })
      });
      setSaveStatus('Workspace settings saved successfully!');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="glass-panel glass-panel-glow" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Settings size={24} color="#6366f1" />
              Workspace & Organization Configuration
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Manage runtime API keys, carrier credentials, Keycloak SSO realms, and database configurations.
            </p>
          </div>

          <button onClick={handleSave} className="btn btn-emerald">
            <Save size={18} /> Save Settings
          </button>
        </div>

        {saveStatus && (
          <div style={{ marginTop: '14px', padding: '10px 14px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '8px', color: '#34d399', fontSize: '0.85rem', fontWeight: 600 }}>
            ✓ {saveStatus}
          </div>
        )}
      </div>

      {/* Form Settings Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div className="glass-panel" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Key size={18} color="#6366f1" /> Google Gemini API Credentials
          </h3>

          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px', display: 'block' }}>
              GEMINI_API_KEY
            </label>
            <input 
              type="password" 
              className="input-field" 
              placeholder="AIzaSy..." 
              value={geminiKey} 
              onChange={e => setGeminiKey(e.target.value)} 
            />
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Building size={18} color="#06b6d4" /> Twilio / Telnyx Telephony API
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>
              <label style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>TWILIO_ACCOUNT_SID</label>
              <input type="text" className="input-field" placeholder="AC..." value={twilioSid} onChange={e => setTwilioSid(e.target.value)} />
            </div>

            <div>
              <label style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>TWILIO_AUTH_TOKEN</label>
              <input type="password" className="input-field" placeholder="••••••••••••••••" value={twilioToken} onChange={e => setTwilioToken(e.target.value)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
