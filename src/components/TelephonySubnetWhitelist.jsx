import React from 'react';
import { Server, ShieldCheck } from 'lucide-react';

export default function TelephonySubnetWhitelist() {
  const subnets = [
    { carrier: 'Twilio Voice Direct POPs', cidr: '54.172.60.0/23', portRange: '5060 - 5061 (UDP/TCP)', status: 'WHITELISTED' },
    { carrier: 'Telnyx Global SBC Nodes', cidr: '192.76.120.0/22', portRange: '5060 (UDP/TLS)', status: 'WHITELISTED' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Server color="#34d399" size={28} /> Carrier Telephony IP Subnet Firewall Whitelist Generator
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Generate iptables / AWS Security Group rules for Tier-1 carrier SIP & RTP media subnets.
          </p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.72rem' }}>
              <th style={{ padding: '10px' }}>Carrier Network</th>
              <th style={{ padding: '10px' }}>IP Subnet CIDR</th>
              <th style={{ padding: '10px' }}>Port Range</th>
              <th style={{ padding: '10px' }}>Firewall State</th>
            </tr>
          </thead>
          <tbody>
            {subnets.map((s, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px 10px', color: '#fff', fontWeight: 700 }}>{s.carrier}</td>
                <td style={{ padding: '12px 10px', color: '#06b6d4', fontFamily: 'monospace' }}>{s.cidr}</td>
                <td style={{ padding: '12px 10px', color: 'var(--text-muted)' }}>{s.portRange}</td>
                <td style={{ padding: '12px 10px' }}><span className="badge badge-emerald">{s.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
