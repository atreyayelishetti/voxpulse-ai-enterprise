import React, { useState } from 'react';
import { Shield, Plus, CheckCircle2, Copy, Trash2, Terminal, ShieldAlert } from 'lucide-react';

export default function TelephonySubnetWhitelist() {
  const [subnets, setSubnets] = useState([
    { id: 1, carrier: 'Telnyx Signaling SIP', cidr: '192.76.120.0/22', port: '5060 UDP/TCP', region: 'Global Anycast', status: 'ACTIVE' },
    { id: 2, carrier: 'Telnyx RTP Media', cidr: '64.16.224.0/19', port: '10000-20000 UDP', region: 'Global Anycast', status: 'ACTIVE' },
    { id: 3, carrier: 'Twilio Voice Ingress', cidr: '54.172.60.0/23', port: '5060 UDP', region: 'US-East (Ashburn)', status: 'ACTIVE' },
    { id: 4, carrier: 'Twilio RTP Media', cidr: '168.86.128.0/18', port: '10000-20000 UDP', region: 'US-West / US-East', status: 'ACTIVE' },
    { id: 5, carrier: 'Bandwidth.com SBC', cidr: '216.82.224.0/20', port: '5060 UDP', region: 'North America', status: 'ACTIVE' }
  ]);

  const [newCidr, setNewCidr] = useState('');
  const [newCarrier, setNewCarrier] = useState('');
  const [copied, setCopied] = useState(false);

  const handleAddSubnet = (e) => {
    e.preventDefault();
    if (!newCidr || !newCarrier) return;
    setSubnets([
      ...subnets,
      { id: Date.now(), carrier: newCarrier, cidr: newCidr, port: '5060 UDP', region: 'Custom Carrier', status: 'ACTIVE' }
    ]);
    setNewCidr('');
    setNewCarrier('');
  };

  const handleDelete = (id) => {
    setSubnets(subnets.filter(s => s.id !== id));
  };

  const generateIptables = () => {
    return subnets.map(s => `iptables -A INPUT -p udp -s ${s.cidr} --dport 5060 -j ACCEPT # ${s.carrier}`).join('\n');
  };

  const handleCopyIptables = () => {
    navigator.clipboard.writeText(generateIptables());
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Shield color="#06b6d4" size={28} /> Carrier IP CIDR Subnet Whitelist & SIP Firewall Policy
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Protects edge SBCs from malicious SIP scanning (e.g. SIPPvicious, friendly-scanner). Enforces zero-trust carrier IP ingress rules.
          </p>
        </div>
        <button 
          className="btn btn-secondary"
          onClick={handleCopyIptables}
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          {copied ? <CheckCircle2 size={16} color="#10b981" /> : <Copy size={16} />}
          {copied ? 'Copied iptables Script!' : 'Export iptables Script'}
        </button>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Active Whitelist Subnets</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>{subnets.length} CIDR Blocks</div>
          <span className="badge badge-emerald" style={{ marginTop: '8px', display: 'inline-block' }}>Zero-Trust Enforced</span>
        </div>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Blocked Ghost Scans (24h)</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f43f5e', marginTop: '4px' }}>18,492 Drops</div>
          <span className="badge badge-rose" style={{ marginTop: '8px', display: 'inline-block' }}>Unauthorized INVITEs</span>
        </div>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Firewall Drop Policy</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#06b6d4', marginTop: '4px' }}>DROP (Silent)</div>
          <span className="badge badge-cyan" style={{ marginTop: '8px', display: 'inline-block' }}>No ICMP Unreachable</span>
        </div>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>DDoS Flood Protection</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#a855f7', marginTop: '4px' }}>SYN / UDP Rate Limit</div>
          <span className="badge badge-purple" style={{ marginTop: '8px', display: 'inline-block' }}>500 pkts/sec ceiling</span>
        </div>
      </div>

      {/* Add New CIDR Form */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
          Whitelist Carrier IP Range
        </h3>
        <form onSubmit={handleAddSubnet} style={{ display: 'grid', gridTemplateColumns: '2fr 2fr auto', gap: '16px', alignItems: 'flex-end' }}>
          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Carrier / Node Label</label>
            <input 
              type="text" 
              placeholder="e.g. Lumen Secondary Carrier SBC"
              value={newCarrier}
              onChange={(e) => setNewCarrier(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', background: 'rgba(0,0,0,0.4)', color: '#fff', border: '1px solid var(--border-color)', borderRadius: '6px' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>CIDR Subnet IP Block</label>
            <input 
              type="text" 
              placeholder="e.g. 198.51.100.0/24"
              value={newCidr}
              onChange={(e) => setNewCidr(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', background: 'rgba(0,0,0,0.4)', color: '#fff', border: '1px solid var(--border-color)', borderRadius: '6px' }}
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-primary"
            style={{ height: '42px', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Plus size={16} /> Add Whitelist Rule
          </button>
        </form>
      </div>

      {/* Whitelist Subnets Table */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
          Authorized Carrier Subnet Rules
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', textAlign: 'left' }}>
                <th style={{ padding: '10px' }}>Carrier Network</th>
                <th style={{ padding: '10px' }}>CIDR Subnet Block</th>
                <th style={{ padding: '10px' }}>Allowed Ports</th>
                <th style={{ padding: '10px' }}>Region / POP</th>
                <th style={{ padding: '10px' }}>Rule Status</th>
                <th style={{ padding: '10px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {subnets.map((s) => (
                <tr key={s.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 10px', fontWeight: 700, color: '#fff' }}>{s.carrier}</td>
                  <td style={{ padding: '12px 10px', color: '#06b6d4', fontFamily: 'monospace', fontWeight: 600 }}>{s.cidr}</td>
                  <td style={{ padding: '12px 10px', color: '#38bdf8' }}>{s.port}</td>
                  <td style={{ padding: '12px 10px', color: '#cbd5e1' }}>{s.region}</td>
                  <td style={{ padding: '12px 10px' }}>
                    <span className="badge badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <CheckCircle2 size={12} /> {s.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 10px', textAlign: 'right' }}>
                    <button 
                      onClick={() => handleDelete(s.id)}
                      style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px' }}
                      title="Remove Rule"
                    >
                      <Trash2 size={16} />
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
