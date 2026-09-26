import React, { useState } from 'react';
import { ShieldCheck, UserCheck, Lock, CheckCircle2, RefreshCw } from 'lucide-react';

export default function EnterpriseRBACPermissionMatrix() {
  const [roles, setRoles] = useState([
    { name: 'Super Admin', realm: 'voxpulse-realm', liveDial: true, testRunner: true, sbcFailover: true, gdprScrub: true, lcrBilling: true, users: 2 },
    { name: 'Carrier Telecom Operator', realm: 'telecom-ops', liveDial: true, testRunner: true, sbcFailover: true, gdprScrub: false, lcrBilling: false, users: 8 },
    { name: 'QA Automation Engineer', realm: 'voxpulse-realm', liveDial: false, testRunner: true, sbcFailover: false, gdprScrub: false, lcrBilling: false, users: 14 },
    { name: 'Compliance Auditor', realm: 'voxpulse-realm', liveDial: false, testRunner: false, sbcFailover: false, gdprScrub: true, lcrBilling: false, users: 3 },
    { name: 'Billing / Finance Lead', realm: 'finance-ops', liveDial: false, testRunner: false, sbcFailover: false, gdprScrub: false, lcrBilling: true, users: 4 }
  ]);

  const togglePerm = (roleIdx, field) => {
    const updated = [...roles];
    updated[roleIdx][field] = !updated[roleIdx][field];
    setRoles(updated);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Lock color="#06b6d4" size={28} /> Keycloak 24 Enterprise Role-Based Access Control (RBAC) Matrix
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Fine-grained access control policy grid. Maps Keycloak JWT scopes to telecommunications diagnostics, live dialing, and billing tools.
          </p>
        </div>
        <span className="badge badge-emerald" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ShieldCheck size={14} /> Synchronized with Keycloak OIDC Realm
        </span>
      </div>

      {/* RBAC Matrix Grid */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
          Granular Permission Entitlements Grid
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', textAlign: 'left' }}>
                <th style={{ padding: '12px 10px' }}>Role Profile</th>
                <th style={{ padding: '12px 10px' }}>Keycloak Realm</th>
                <th style={{ padding: '12px 10px', textAlign: 'center' }}>Live PSTN Dialing</th>
                <th style={{ padding: '12px 10px', textAlign: 'center' }}>Test Runner Exec</th>
                <th style={{ padding: '12px 10px', textAlign: 'center' }}>SBC Trunk Failover</th>
                <th style={{ padding: '12px 10px', textAlign: 'center' }}>GDPR Purge Logs</th>
                <th style={{ padding: '12px 10px', textAlign: 'center' }}>LCR / Financials</th>
                <th style={{ padding: '12px 10px', textAlign: 'right' }}>Active Users</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((r, idx) => (
                <tr key={r.name} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '14px 10px', fontWeight: 700, color: '#fff' }}>{r.name}</td>
                  <td style={{ padding: '14px 10px', color: '#06b6d4', fontFamily: 'monospace' }}>{r.realm}</td>
                  <td style={{ padding: '14px 10px', textAlign: 'center' }}>
                    <input type="checkbox" checked={r.liveDial} onChange={() => togglePerm(idx, 'liveDial')} />
                  </td>
                  <td style={{ padding: '14px 10px', textAlign: 'center' }}>
                    <input type="checkbox" checked={r.testRunner} onChange={() => togglePerm(idx, 'testRunner')} />
                  </td>
                  <td style={{ padding: '14px 10px', textAlign: 'center' }}>
                    <input type="checkbox" checked={r.sbcFailover} onChange={() => togglePerm(idx, 'sbcFailover')} />
                  </td>
                  <td style={{ padding: '14px 10px', textAlign: 'center' }}>
                    <input type="checkbox" checked={r.gdprScrub} onChange={() => togglePerm(idx, 'gdprScrub')} />
                  </td>
                  <td style={{ padding: '14px 10px', textAlign: 'center' }}>
                    <input type="checkbox" checked={r.lcrBilling} onChange={() => togglePerm(idx, 'lcrBilling')} />
                  </td>
                  <td style={{ padding: '14px 10px', textAlign: 'right', fontWeight: 700, color: '#38bdf8' }}>
                    {r.users} Users
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
