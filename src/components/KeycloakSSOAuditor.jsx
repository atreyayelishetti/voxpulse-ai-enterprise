import React from 'react';
import { Key, ShieldCheck, Lock, CheckCircle2, Server } from 'lucide-react';

export default function KeycloakSSOAuditor() {
  const ssoLogs = [
    { id: 'auth-901', protocol: 'OAuth2 Authorization Code (PKCE)', user: 'admin@voxpulse.io', ip: '192.168.1.10', status: 'SUCCESS (200 OK)', timestamp: '2m ago' },
    { id: 'auth-902', protocol: 'SAML 2.0 Assertion (Okta SP)', user: 'qa@voxpulse.io', ip: '10.0.4.15', status: 'SUCCESS (200 OK)', timestamp: '15m ago' },
    { id: 'auth-903', protocol: 'OIDC Bearer JWT Token', user: 'service-account-cron', ip: '127.0.0.1', status: 'TOKEN REFRESHED', timestamp: '1 hour ago' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Key color="#a78bfa" size={28} /> Keycloak SAML 2.0 & OAuth2 PKCE Security Handshake Auditor
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Audit SSO authentication handshakes, OpenID Connect JWT tokens, and OAuth2 PKCE verifications.
          </p>
        </div>

        <span className="badge badge-emerald" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
          OIDC Realm Secured
        </span>
      </div>

      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
          Recent SSO Handshake Log Audit
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.72rem' }}>
                <th style={{ padding: '10px' }}>Handshake ID</th>
                <th style={{ padding: '10px' }}>Protocol Type</th>
                <th style={{ padding: '10px' }}>User Subject</th>
                <th style={{ padding: '10px' }}>Originating IP</th>
                <th style={{ padding: '10px' }}>Outcome Status</th>
              </tr>
            </thead>
            <tbody>
              {ssoLogs.map((log) => (
                <tr key={log.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '12px 10px', fontWeight: 700, color: '#fff' }}>{log.id}</td>
                  <td style={{ padding: '12px 10px', color: '#06b6d4', fontWeight: 600 }}>{log.protocol}</td>
                  <td style={{ padding: '12px 10px', color: '#38bdf8' }}>{log.user}</td>
                  <td style={{ padding: '12px 10px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{log.ip}</td>
                  <td style={{ padding: '12px 10px' }}>
                    <span className="badge badge-emerald">{log.status}</span>
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
