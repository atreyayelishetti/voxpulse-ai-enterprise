import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserPlus, 
  ShieldCheck, 
  Key, 
  Mail, 
  Trash2, 
  CheckCircle2, 
  AlertCircle,
  Lock,
  Building,
  ShieldAlert
} from 'lucide-react';

export default function SaaSTeamManagement({ currentOrg }) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('TELECOM_ENGINEER');
  const [successMsg, setSuccessMsg] = useState(null);

  useEffect(() => {
    fetchTeam();
  }, [currentOrg?.id]);

  const fetchTeam = async () => {
    try {
      const res = await fetch('/api/saas/team');
      const data = await res.json();
      if (data.success) setMembers(data.teamMembers);
    } catch (e) {
      console.error('Failed to fetch team members:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleInvite = async (e) => {
    e.preventDefault();
    if (!name || !email) return;

    try {
      const res = await fetch('/api/saas/team/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, role })
      });
      const data = await res.json();
      if (data.success) {
        setMembers([...members, data.member]);
        setShowInviteModal(false);
        setName('');
        setEmail('');
        setSuccessMsg(`Invitation dispatched to ${email}!`);
        setTimeout(() => setSuccessMsg(null), 4000);
      }
    } catch (err) {
      console.error('Invite error:', err);
    }
  };

  const handleRemove = async (id) => {
    if (!confirm('Are you sure you want to revoke this team member access?')) return;
    try {
      await fetch(`/api/saas/team/${id}`, { method: 'DELETE' });
      setMembers(members.filter(m => m.id !== id));
    } catch (err) {
      console.error('Failed to remove member:', err);
    }
  };

  const roleBadges = {
    OWNER: 'badge-purple',
    ADMIN: 'badge-cyan',
    TELECOM_ENGINEER: 'badge-emerald',
    COMPLIANCE_AUDITOR: 'badge-amber',
    BILLING_MANAGER: 'badge-blue',
    VIEWER: 'badge-secondary'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Users color="#34d399" size={30} /> Team Members & Organization RBAC
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
            Provision team seats, assign telecom diagnostic permissions, and manage Keycloak SSO / SAML user access.
          </p>
        </div>

        <button
          onClick={() => setShowInviteModal(true)}
          className="btn btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', borderRadius: '10px' }}
        >
          <UserPlus size={16} /> Invite Team Member
        </button>
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

      {/* Members Table */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.86rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.72rem' }}>
                <th style={{ padding: '12px 10px' }}>User</th>
                <th style={{ padding: '12px 10px' }}>Email</th>
                <th style={{ padding: '12px 10px' }}>Assigned Role</th>
                <th style={{ padding: '12px 10px' }}>2FA Security</th>
                <th style={{ padding: '12px 10px' }}>Status</th>
                <th style={{ padding: '12px 10px' }}>Last Active</th>
                <th style={{ padding: '12px 10px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr key={m.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '14px 10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      color: '#fff',
                      fontSize: '0.8rem'
                    }}>
                      {m.name.charAt(0)}
                    </div>
                    <span style={{ fontWeight: 700, color: '#fff' }}>{m.name}</span>
                  </td>
                  <td style={{ padding: '14px 10px', color: '#cbd5e1' }}>
                    {m.email}
                  </td>
                  <td style={{ padding: '14px 10px' }}>
                    <span className={`badge ${roleBadges[m.role] || 'badge-cyan'}`} style={{ fontSize: '0.7rem', padding: '3px 8px' }}>
                      {m.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td style={{ padding: '14px 10px' }}>
                    {m.twoFactor ? (
                      <span style={{ color: '#10b981', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem' }}>
                        <ShieldCheck size={14} /> Enforced
                      </span>
                    ) : (
                      <span style={{ color: '#f59e0b', display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem' }}>
                        <AlertCircle size={14} /> Optional
                      </span>
                    )}
                  </td>
                  <td style={{ padding: '14px 10px' }}>
                    <span className={`badge ${m.status === 'ACTIVE' ? 'badge-emerald' : 'badge-amber'}`} style={{ fontSize: '0.68rem' }}>
                      {m.status}
                    </span>
                  </td>
                  <td style={{ padding: '14px 10px', color: '#94a3b8', fontSize: '0.8rem' }}>
                    {m.lastActive}
                  </td>
                  <td style={{ padding: '14px 10px', textAlign: 'right' }}>
                    {m.role !== 'OWNER' && (
                      <button
                        onClick={() => handleRemove(m.id)}
                        className="btn btn-rose"
                        style={{ padding: '5px 10px', fontSize: '0.72rem', borderRadius: '6px' }}
                        title="Revoke User Access"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role Permission Guidance Card */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Key size={18} color="#6366f1" /> Role Hierarchy & Entitlements
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          <div style={{ padding: '14px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px' }}>
            <div style={{ fontWeight: 700, color: '#c084fc', marginBottom: '4px', fontSize: '0.85rem' }}>Owner / Admin</div>
            <p style={{ color: '#94a3b8', fontSize: '0.75rem', lineHeight: 1.5 }}>
              Full control over billing, subscription tiers, API keys, SSO realm provisioning, and team invites.
            </p>
          </div>

          <div style={{ padding: '14px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px' }}>
            <div style={{ fontWeight: 700, color: '#34d399', marginBottom: '4px', fontSize: '0.85rem' }}>Telecom Engineer</div>
            <p style={{ color: '#94a3b8', fontSize: '0.75rem', lineHeight: 1.5 }}>
              Executes live PSTN calls, triggers automated test suites, analyzes Wireshark SIP PCAPs, and manages DIDs.
            </p>
          </div>

          <div style={{ padding: '14px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px' }}>
            <div style={{ fontWeight: 700, color: '#fbbf24', marginBottom: '4px', fontSize: '0.85rem' }}>Compliance Auditor</div>
            <p style={{ color: '#94a3b8', fontSize: '0.75rem', lineHeight: 1.5 }}>
              Inspects PCI-DSS audio muting, HIPAA encryption audits, GDPR purge rules, and exports PDF SLA certificates.
            </p>
          </div>

          <div style={{ padding: '14px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px' }}>
            <div style={{ fontWeight: 700, color: '#38bdf8', marginBottom: '4px', fontSize: '0.85rem' }}>Billing Manager</div>
            <p style={{ color: '#94a3b8', fontSize: '0.75rem', lineHeight: 1.5 }}>
              Manages Stripe payment methods, downloads tax invoices, and configures spend alerts and capacity add-ons.
            </p>
          </div>
        </div>
      </div>

      {/* Modal: Invite Team Member */}
      {showInviteModal && (
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
              <UserPlus color="#34d399" size={22} /> Invite Team Member
            </h3>

            <form onSubmit={handleInvite} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jordan Miller"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field"
                  style={{ width: '100%', padding: '10px 12px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Corporate Email</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. j.miller@enterprise.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  style={{ width: '100%', padding: '10px 12px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="input-field"
                  style={{ width: '100%', padding: '10px 12px' }}
                >
                  <option value="ADMIN">Admin (Full Management)</option>
                  <option value="TELECOM_ENGINEER">Telecom Engineer (Test Execution & PCAP)</option>
                  <option value="COMPLIANCE_AUDITOR">Compliance Auditor (PCI/HIPAA Audits)</option>
                  <option value="BILLING_MANAGER">Billing Manager (Invoicing & Add-ons)</option>
                  <option value="VIEWER">Read-Only Viewer</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button type="button" onClick={() => setShowInviteModal(false)} className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-primary">Send Invitation</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
