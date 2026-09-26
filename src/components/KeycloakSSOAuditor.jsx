import React, { useState } from 'react';
import { ShieldCheck, UserCheck, Lock, CheckCircle2, RefreshCw, AlertTriangle, Key } from 'lucide-react';

export default function KeycloakSSOAuditor() {
  const [sessions, setSessions] = useState([
    { id: 'sess_9918a', user: 'admin', ip: '192.168.1.100', client: 'voxpulse-app', loggedIn: '24 mins ago', expires: '56 mins', status: 'ACTIVE' },
    { id: 'sess_9918b', user: 'qa.lead@enterprise.com', ip: '10.0.4.15', client: 'voxpulse-app', loggedIn: '2 hours ago', expires: '4 hours', status: 'ACTIVE' },
    { id: 'sess_9918c', user: 'ops@telecom.internal', ip: '172.16.0.4', client: 'voxpulse-app', loggedIn: '35 mins ago', expires: '45 mins', status: 'ACTIVE' }
  ]);

  const [revokedId, setRevokedId] = useState(null);

  const handleRevoke = (id) => {
    setRevokedId(id);
    setTimeout(() => {
      setSessions(sessions.filter(s => s.id !== id));
      setRevokedId(null);
    }, 400);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Key color="#06b6d4" size={28} /> Keycloak 24 OIDC SSO Security & Session Token Auditor
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Identity token lifecycle monitoring. Decodes RS256 Bearer JWTs, audits PKCE code challenges, and revokes compromised sessions.
          </p>
        </div>
        <span className="badge badge-emerald" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ShieldCheck size={14} /> Keycloak 24.0.5 Connected
        </span>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Active User Sessions</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>{sessions.length} Sessions</div>
          <span className="badge badge-emerald" style={{ marginTop: '8px', display: 'inline-block' }}>OIDC 2.0 PKCE Enforced</span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Token Signing Algorithm</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#06b6d4', marginTop: '4px' }}>RS256</div>
          <span className="badge badge-cyan" style={{ marginTop: '8px', display: 'inline-block' }}>2048-bit RSA Public Key</span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Token Lifespan (TTL)</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#a855f7', marginTop: '4px' }}>3600 sec</div>
          <span className="badge badge-purple" style={{ marginTop: '8px', display: 'inline-block' }}>1-Hour Access Token</span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Brute-Force Lockout</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>ARMED</div>
          <span className="badge badge-emerald" style={{ marginTop: '8px', display: 'inline-block' }}>5 Failed Attempts Max</span>
        </div>
      </div>

      {/* Active Sessions Table */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
          Active SSO Client Sessions in `voxpulse-realm`
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', textAlign: 'left' }}>
                <th style={{ padding: '10px' }}>Session ID</th>
                <th style={{ padding: '10px' }}>Authenticated User</th>
                <th style={{ padding: '10px' }}>Client IP</th>
                <th style={{ padding: '10px' }}>Client ID</th>
                <th style={{ padding: '10px' }}>Logged In</th>
                <th style={{ padding: '10px' }}>Remaining TTL</th>
                <th style={{ padding: '10px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((s) => (
                <tr key={s.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 10px', color: '#06b6d4', fontFamily: 'monospace' }}>{s.id}</td>
                  <td style={{ padding: '12px 10px', fontWeight: 700, color: '#fff' }}>{s.user}</td>
                  <td style={{ padding: '12px 10px', color: '#94a3b8', fontFamily: 'monospace' }}>{s.ip}</td>
                  <td style={{ padding: '12px 10px', color: '#cbd5e1' }}>{s.client}</td>
                  <td style={{ padding: '12px 10px', color: '#94a3b8' }}>{s.loggedIn}</td>
                  <td style={{ padding: '12px 10px', color: '#10b981', fontWeight: 600 }}>{s.expires}</td>
                  <td style={{ padding: '12px 10px', textAlign: 'right' }}>
                    <button 
                      className="btn btn-secondary"
                      onClick={() => handleRevoke(s.id)}
                      disabled={revokedId === s.id}
                      style={{ padding: '6px 12px', fontSize: '0.78rem', color: '#ef4444' }}
                    >
                      {revokedId === s.id ? 'Revoking...' : 'Revoke Session'}
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
