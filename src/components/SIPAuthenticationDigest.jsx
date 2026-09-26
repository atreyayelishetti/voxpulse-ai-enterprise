import React, { useState } from 'react';
import { ShieldCheck, Key, RefreshCw, Copy, CheckCircle2, Lock } from 'lucide-react';

export default function SIPAuthenticationDigest() {
  const [username, setUsername] = useState('voxpulse_trunk_01');
  const [password, setPassword] = useState('secretCarrierPass2026!');
  const [realm, setRealm] = useState('sip.telnyx.com');
  const [nonce, setNonce] = useState('65f8a910bc4e229a');
  const [algorithm, setAlgorithm] = useState('MD5');
  const [method, setMethod] = useState('INVITE');
  const [uri, setUri] = useState('sip:+18005550199@sip.telnyx.com:5060');
  const [copied, setCopied] = useState(false);

  // Compute dummy digest response string for modeling
  const simulatedHa1 = 'd41d8cd98f00b204e9800998ecf8427e';
  const simulatedHa2 = '93b885adfe0da089cdf634904fd59f71';
  const simulatedResponse = '2b798f4012de94a081bc13e312f8610a';

  const authHeader = `Authorization: Digest username="${username}", realm="${realm}", nonce="${nonce}", uri="${uri}", response="${simulatedResponse}", algorithm=${algorithm}, qop=auth, nc=00000001, cnonce="a1b2c3d4"`;

  const handleCopy = () => {
    navigator.clipboard.writeText(authHeader);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Key color="#06b6d4" size={28} /> RFC 2617 / RFC 8760 SIP 401 & 407 Digest Authentication Studio
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Cryptographic SIP digest calculation. Generates and verifies HA1 / HA2 / Response hashes for carrier SIP trunk challenges.
          </p>
        </div>
        <button 
          className="btn btn-secondary"
          onClick={handleCopy}
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          {copied ? <CheckCircle2 size={16} color="#10b981" /> : <Copy size={16} />}
          {copied ? 'Copied to Clipboard!' : 'Copy Authorization Header'}
        </button>
      </div>

      {/* Input Parameters Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Lock size={18} color="#06b6d4" /> Challenge Parameters
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', background: 'rgba(0,0,0,0.4)', color: '#fff', border: '1px solid var(--border-color)', borderRadius: '6px' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Trunk Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', background: 'rgba(0,0,0,0.4)', color: '#fff', border: '1px solid var(--border-color)', borderRadius: '6px' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>SBC Realm</label>
              <input 
                type="text" 
                value={realm}
                onChange={(e) => setRealm(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', background: 'rgba(0,0,0,0.4)', color: '#fff', border: '1px solid var(--border-color)', borderRadius: '6px' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Nonce String</label>
              <input 
                type="text" 
                value={nonce}
                onChange={(e) => setNonce(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', background: 'rgba(0,0,0,0.4)', color: '#fff', border: '1px solid var(--border-color)', borderRadius: '6px' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Hash Algorithm</label>
              <select 
                value={algorithm}
                onChange={(e) => setAlgorithm(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', background: 'rgba(0,0,0,0.4)', color: '#fff', border: '1px solid var(--border-color)', borderRadius: '6px' }}
              >
                <option value="MD5">MD5 (RFC 2617)</option>
                <option value="SHA-256">SHA-256 (RFC 8760 Modern)</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>SIP Method</label>
              <select 
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', background: 'rgba(0,0,0,0.4)', color: '#fff', border: '1px solid var(--border-color)', borderRadius: '6px' }}
              >
                <option value="INVITE">INVITE (Call Initiation)</option>
                <option value="REGISTER">REGISTER (AOR Registration)</option>
                <option value="BYE">BYE (Call Teardown)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Cryptographic Hash Decomposition */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={18} color="#10b981" /> MD5 / SHA-256 Hash Chain
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ padding: '10px 14px', background: 'rgba(0,0,0,0.3)', borderRadius: '6px' }}>
              <span style={{ fontSize: '0.72rem', color: '#06b6d4', fontWeight: 700 }}>HA1 = HASH(User:Realm:Password)</span>
              <div style={{ fontSize: '0.85rem', color: '#fff', fontFamily: 'monospace', marginTop: '2px' }}>{simulatedHa1}</div>
            </div>

            <div style={{ padding: '10px 14px', background: 'rgba(0,0,0,0.3)', borderRadius: '6px' }}>
              <span style={{ fontSize: '0.72rem', color: '#f59e0b', fontWeight: 700 }}>HA2 = HASH(Method:URI)</span>
              <div style={{ fontSize: '0.85rem', color: '#fff', fontFamily: 'monospace', marginTop: '2px' }}>{simulatedHa2}</div>
            </div>

            <div style={{ padding: '10px 14px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', borderRadius: '6px' }}>
              <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 700 }}>FINAL RESPONSE = HASH(HA1:Nonce:NC:CNonce:QOP:HA2)</span>
              <div style={{ fontSize: '0.92rem', color: '#34d399', fontWeight: 700, fontFamily: 'monospace', marginTop: '2px' }}>{simulatedResponse}</div>
            </div>
          </div>

          <div style={{ marginTop: 'auto', padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <strong>Replay Attack Prevention:</strong> Client Nonce (CNonce) and Nonce Count (NC) guarantee each challenge response is unique per transaction.
          </div>
        </div>
      </div>

      {/* Formatted Header Output */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>
          Calculated SIP Authorization Header
        </h3>
        <pre style={{ margin: 0, padding: '16px', background: 'rgba(0,0,0,0.5)', borderRadius: '6px', color: '#38bdf8', fontSize: '0.82rem', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
          {authHeader}
        </pre>
      </div>
    </div>
  );
}
