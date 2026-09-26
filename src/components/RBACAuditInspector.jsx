import React, { useState } from 'react';
import { 
  Key, 
  ShieldCheck, 
  UserCheck, 
  Lock, 
  Shield, 
  CheckCircle2, 
  Globe2, 
  UserPlus, 
  Trash2, 
  RefreshCw, 
  Search, 
  Download,
  AlertCircle,
  FileCode,
  Fingerprint
} from 'lucide-react';

const INITIAL_USERS = [
  { id: 'usr-1', name: 'Alexander Vance', email: 'vance@voxpulse.io', role: 'SuperAdmin', realm: 'voxpulse-realm', status: 'ACTIVE', lastLogin: '2 mins ago', mfa: 'WebAuthn FIDO2', ip: '198.51.100.4', permissions: ['root:*', 'sip:*', 'did:*', 'billing:*'] },
  { id: 'usr-2', name: 'Elena Rostova', email: 'elena.r@voxpulse.io', role: 'TelecomEngineer', realm: 'voxpulse-realm', status: 'ACTIVE', lastLogin: '14 mins ago', mfa: 'TOTP Active', ip: '203.0.113.88', permissions: ['sip:trunk:*', 'polqa:run', 'rtp:capture', 'pcap:export'] },
  { id: 'usr-3', name: 'Marcus Sterling', email: 'compliance@voxpulse.io', role: 'ComplianceAuditor', realm: 'voxpulse-realm', status: 'ACTIVE', lastLogin: '1 hour ago', mfa: 'Hardware Token', ip: '192.0.2.140', permissions: ['audit:read', 'pci:verify', 'hipaa:export', 'retention:purge'] },
  { id: 'usr-4', name: 'Sarah Lin', email: 'sarah.l@voxpulse.io', role: 'QAEngineer', realm: 'voxpulse-realm', status: 'ACTIVE', lastLogin: 'Yesterday', mfa: 'TOTP Active', ip: '198.51.100.22', permissions: ['test:execute', 'campaign:trigger', 'ivr:simulate'] },
  { id: 'usr-5', name: 'David Cho', email: 'david.c@voxpulse.io', role: 'ReadOnlyObserver', realm: 'voxpulse-realm', status: 'ACTIVE', lastLogin: '3 days ago', mfa: 'SMS OTP', ip: '203.0.113.12', permissions: ['dashboard:view', 'reports:read'] }
];

const AUDIT_LOGS = [
  { time: '11:04:12', user: 'vance@voxpulse.io', event: 'OIDC_TOKEN_REFRESH', realm: 'voxpulse-realm', result: 'SUCCESS', details: 'RS256 JWT refresh token exchanged' },
  { time: '10:58:33', user: 'elena.r@voxpulse.io', event: 'SIP_TRUNK_FAILOVER_TRIGGER', realm: 'voxpulse-realm', result: 'SUCCESS', details: 'Manual failover probe executed on SBC-01' },
  { time: '10:42:01', user: 'compliance@voxpulse.io', event: 'PCI_DTMF_AUDIT_EXPORT', realm: 'voxpulse-realm', result: 'SUCCESS', details: 'Exported quarterly PCI DSS redaction verification' },
  { time: '09:15:20', user: 'unknown@external.net', event: 'AUTH_FAILED_BAD_CREDENTIAL', realm: 'voxpulse-realm', result: 'BLOCKED', details: 'Rate limit tripped after 3 bad passwords' }
];

export default function RBACAuditInspector() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(INITIAL_USERS[0]);
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'TelecomEngineer', mfa: 'TOTP Active' });

  const handleRevokeSession = (userId) => {
    setUsers(users.map(u => u.id === userId ? { ...u, status: 'SESSION_REVOKED', lastLogin: 'Revoked by Admin' } : u));
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;
    const added = {
      id: `usr-${Date.now().toString(36)}`,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      realm: 'voxpulse-realm',
      status: 'ACTIVE',
      lastLogin: 'Never',
      mfa: newUser.mfa,
      ip: '127.0.0.1',
      permissions: ['sip:trunk:read', 'reports:read']
    };
    setUsers([added, ...users]);
    setShowAddUser(false);
    setNewUser({ name: '', email: '', role: 'TelecomEngineer', mfa: 'TOTP Active' });
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="glass-panel glass-panel-glow" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Key color="#a78bfa" size={24} /> Keycloak OIDC RBAC & Security Audit Inspector
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
              Centralized IAM identity governance, OAuth2 RS256 token lifecycle, MFA enforcement, and real-time security audit trails.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span className="badge badge-emerald" style={{ padding: '6px 12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={14} /> Keycloak 24 OIDC Realm Synced
            </span>
            <button 
              className="btn btn-primary"
              onClick={() => setShowAddUser(!showAddUser)}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}
            >
              <UserPlus size={16} /> {showAddUser ? 'Close Form' : 'Add Operator'}
            </button>
          </div>
        </div>
      </div>

      {/* Add User Modal / Inline Form */}
      {showAddUser && (
        <form onSubmit={handleAddUser} className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', border: '1px solid #38bdf8' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#38bdf8' }}>Provision New Telephony Operator in Keycloak</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Full Name</label>
              <input 
                type="text" 
                placeholder="e.g. Rachel Adams" 
                value={newUser.name}
                onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                className="input-field" 
                style={{ width: '100%', padding: '8px 12px' }}
                required 
              />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Enterprise Email</label>
              <input 
                type="email" 
                placeholder="e.g. radams@voxpulse.io" 
                value={newUser.email}
                onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                className="input-field" 
                style={{ width: '100%', padding: '8px 12px' }}
                required 
              />
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Assigned Realm Role</label>
              <select 
                value={newUser.role}
                onChange={e => setNewUser({ ...newUser, role: e.target.value })}
                className="input-field"
                style={{ width: '100%', padding: '8px 12px' }}
              >
                <option value="SuperAdmin">SuperAdmin (Full Cluster Access)</option>
                <option value="TelecomEngineer">TelecomEngineer (Trunks, PCAP, POLQA)</option>
                <option value="QAEngineer">QAEngineer (Test Suites, Campaigns)</option>
                <option value="ComplianceAuditor">ComplianceAuditor (PCI, HIPAA, Purge)</option>
                <option value="ReadOnlyObserver">ReadOnlyObserver (Dashboards Only)</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>MFA Enforcement</label>
              <select 
                value={newUser.mfa}
                onChange={e => setNewUser({ ...newUser, mfa: e.target.value })}
                className="input-field"
                style={{ width: '100%', padding: '8px 12px' }}
              >
                <option value="WebAuthn FIDO2">WebAuthn FIDO2 / YubiKey (Strict)</option>
                <option value="TOTP Active">TOTP Authenticator App</option>
                <option value="SMS OTP">SMS OTP Fallback</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setShowAddUser(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Commit Operator to Realm</button>
          </div>
        </form>
      )}

      {/* Main Grid: Users Table + User Detail Card */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        {/* Users Table */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <UserCheck size={18} color="#06b6d4" /> Realm Identity Directory ({filteredUsers.length})
            </h3>
            <div style={{ position: 'relative', width: '220px' }}>
              <input
                type="text"
                placeholder="Search users or roles..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="input-field"
                style={{ width: '100%', padding: '6px 10px', fontSize: '0.8rem' }}
              />
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.7rem' }}>
                  <th style={{ padding: '10px 8px' }}>Operator</th>
                  <th style={{ padding: '10px 8px' }}>Role</th>
                  <th style={{ padding: '10px 8px' }}>MFA Policy</th>
                  <th style={{ padding: '10px 8px' }}>Status</th>
                  <th style={{ padding: '10px 8px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(u => (
                  <tr 
                    key={u.id}
                    onClick={() => setSelectedUser(u)}
                    style={{ 
                      borderBottom: '1px solid rgba(255,255,255,0.04)',
                      background: selectedUser?.id === u.id ? 'rgba(56, 189, 248, 0.08)' : undefined,
                      cursor: 'pointer'
                    }}
                  >
                    <td style={{ padding: '10px 8px' }}>
                      <div style={{ fontWeight: 700, color: '#fff' }}>{u.name}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.74rem' }}>{u.email}</div>
                    </td>
                    <td style={{ padding: '10px 8px' }}>
                      <span className={`badge ${u.role === 'SuperAdmin' ? 'badge-rose' : u.role === 'TelecomEngineer' ? 'badge-cyan' : 'badge-indigo'}`} style={{ fontSize: '0.7rem' }}>
                        {u.role}
                      </span>
                    </td>
                    <td style={{ padding: '10px 8px', color: '#34d399', fontWeight: 600, fontSize: '0.75rem' }}>
                      {u.mfa}
                    </td>
                    <td style={{ padding: '10px 8px' }}>
                      <span className={`badge ${u.status === 'ACTIVE' ? 'badge-emerald' : 'badge-amber'}`} style={{ fontSize: '0.7rem' }}>
                        {u.status}
                      </span>
                    </td>
                    <td style={{ padding: '10px 8px' }}>
                      {u.status === 'ACTIVE' && (
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleRevokeSession(u.id); }}
                          className="btn btn-secondary" 
                          style={{ padding: '3px 8px', fontSize: '0.7rem', color: '#f87171' }}
                        >
                          Revoke
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected User Granular Permissions Detail */}
        {selectedUser && (
          <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #0284c7, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#fff' }}>
                {selectedUser.name.charAt(0)}
              </div>
              <div>
                <div style={{ fontWeight: 800, color: '#fff', fontSize: '1rem' }}>{selectedUser.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{selectedUser.role} • {selectedUser.realm}</div>
              </div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.25)', padding: '12px', borderRadius: '8px', fontSize: '0.78rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div><span style={{ color: 'var(--text-muted)' }}>IP Origin:</span> <strong style={{ color: '#38bdf8' }}>{selectedUser.ip}</strong></div>
              <div><span style={{ color: 'var(--text-muted)' }}>Last Activity:</span> <span style={{ color: '#fff' }}>{selectedUser.lastLogin}</span></div>
              <div><span style={{ color: 'var(--text-muted)' }}>Session State:</span> <span style={{ color: selectedUser.status === 'ACTIVE' ? '#34d399' : '#f59e0b' }}>{selectedUser.status}</span></div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#a78bfa', textTransform: 'uppercase', marginBottom: '8px' }}>
                Granted OAuth2 Scopes
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {selectedUser.permissions.map(p => (
                  <span key={p} style={{ background: 'rgba(167, 139, 250, 0.15)', border: '1px solid rgba(167, 139, 250, 0.3)', color: '#c4b5fd', padding: '3px 8px', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}>
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Realtime Security Audit Logs */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Fingerprint size={16} color="#34d399" />
          Keycloak Security Audit Trail
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {AUDIT_LOGS.map((log, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.2)', padding: '10px 14px', borderRadius: '8px', fontSize: '0.78rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{log.time}</span>
                <span style={{ color: '#38bdf8', fontWeight: 600 }}>{log.user}</span>
                <span className="badge badge-indigo" style={{ fontSize: '0.68rem' }}>{log.event}</span>
                <span style={{ color: 'var(--text-muted)' }}>{log.details}</span>
              </div>
              <span className={`badge ${log.result === 'SUCCESS' ? 'badge-emerald' : 'badge-rose'}`} style={{ fontSize: '0.7rem' }}>
                {log.result}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
