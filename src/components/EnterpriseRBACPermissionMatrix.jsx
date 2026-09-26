import React from 'react';
import { Key, ShieldCheck } from 'lucide-react';

export default function EnterpriseRBACPermissionMatrix() {
  const permissions = [
    { role: 'SuperAdmin', createTest: true, executeTest: true, viewReports: true, manageUsers: true },
    { role: 'TelecomEngineer', createTest: true, executeTest: true, viewReports: true, manageUsers: false },
    { role: 'ComplianceAuditor', createTest: false, executeTest: false, viewReports: true, manageUsers: false }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Key color="#a78bfa" size={28} /> Keycloak Fine-Grained RBAC Permission Matrix
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Inspect role permission policies across administrators, QA engineers, and compliance auditors.
          </p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.72rem' }}>
              <th style={{ padding: '10px' }}>OIDC Role</th>
              <th style={{ padding: '10px' }}>Create Test Suite</th>
              <th style={{ padding: '10px' }}>Execute Test Call</th>
              <th style={{ padding: '10px' }}>View Reports</th>
              <th style={{ padding: '10px' }}>Manage Users</th>
            </tr>
          </thead>
          <tbody>
            {permissions.map((p, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px 10px', color: '#fff', fontWeight: 700 }}>{p.role}</td>
                <td style={{ padding: '12px 10px' }}>{p.createTest ? <span className="badge badge-emerald">ALLOWED</span> : <span className="badge badge-rose">DENIED</span>}</td>
                <td style={{ padding: '12px 10px' }}>{p.executeTest ? <span className="badge badge-emerald">ALLOWED</span> : <span className="badge badge-rose">DENIED</span>}</td>
                <td style={{ padding: '12px 10px' }}>{p.viewReports ? <span className="badge badge-emerald">ALLOWED</span> : <span className="badge badge-rose">DENIED</span>}</td>
                <td style={{ padding: '12px 10px' }}>{p.manageUsers ? <span className="badge badge-emerald">ALLOWED</span> : <span className="badge badge-rose">DENIED</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
