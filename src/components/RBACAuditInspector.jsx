import React from 'react';
import { Key, ShieldCheck, UserCheck, Lock, Shield, CheckCircle2, Globe2 } from 'lucide-react';

export default function RBACAuditInspector() {
  const users = [
    { id: 'usr-1', name: 'Admin Engineer', email: 'admin@voxpulse.io', role: 'SuperAdmin', realm: 'voxpulse-realm', status: 'ACTIVE', lastLogin: '2 mins ago', mfa: 'TOTP Active' },
    { id: 'usr-2', name: 'Telecom QA Tester', email: 'qa@voxpulse.io', role: 'TelecomEngineer', realm: 'voxpulse-realm', status: 'ACTIVE', lastLogin: '1 hour ago', mfa: 'TOTP Active' },
    { id: 'usr-3', name: 'Compliance Officer', email: 'compliance@voxpulse.io', role: 'ComplianceAuditor', realm: 'voxpulse-realm', status: 'ACTIVE', lastLogin: 'Yesterday', mfa: 'Hardware Key' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Key color="#a78bfa" size={28} /> Keycloak OIDC RBAC & Security Audit Inspector
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Manage OAuth2 / OpenID Connect user roles, granular permissions, MFA enforcement, and access audit logs.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <span className="badge badge-emerald" style={{ padding: '6px 12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldCheck size={14} /> Keycloak Realm Active
          </span>
        </div>
      </div>

      {/* Users & Roles Table */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <UserCheck size={18} color="#06b6d4" /> Keycloak Authenticated Users & Role Matrix
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.72rem' }}>
                <th style={{ padding: '10px' }}>User Name</th>
                <th style={{ padding: '10px' }}>Email Address</th>
                <th style={{ padding: '10px' }}>OIDC Realm Role</th>
                <th style={{ padding: '10px' }}>MFA Security</th>
                <th style={{ padding: '10px' }}>Last Activity</th>
                <th style={{ padding: '10px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '12px 10px', fontWeight: 700, color: '#fff' }}>{u.name}</td>
                  <td style={{ padding: '12px 10px', color: 'var(--text-muted)' }}>{u.email}</td>
                  <td style={{ padding: '12px 10px' }}>
                    <span className="badge badge-indigo">{u.role}</span>
                  </td>
                  <td style={{ padding: '12px 10px', color: '#34d399', fontWeight: 600 }}>{u.mfa}</td>
                  <td style={{ padding: '12px 10px', color: 'var(--text-muted)' }}>{u.lastLogin}</td>
                  <td style={{ padding: '12px 10px' }}>
                    <span className="badge badge-emerald">{u.status}</span>
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
