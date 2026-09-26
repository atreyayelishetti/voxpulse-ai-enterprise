import React from 'react';
import { Server, Activity } from 'lucide-react';

export default function SIPOptionPingKeepalive() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Server color="#34d399" size={28} /> SIP OPTIONS Heartbeat & NAT Keep-Alive Probe Engine
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Configure 30-second periodic SIP OPTIONS ping probes to keep firewall pinholes open.
          </p>
        </div>
        <span className="badge badge-emerald">Keepalive Probe 30s</span>
      </div>

      <div className="glass-card" style={{ padding: '24px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Probe Interval</span>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#38bdf8', marginTop: '4px' }}>30 Seconds</div>
        </div>
        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Response Status</span>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#34d399', marginTop: '4px' }}>200 OK (12ms)</div>
        </div>
        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Firewall Pinhole</span>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#a78bfa', marginTop: '4px' }}>OPEN / STABLE</div>
        </div>
      </div>
    </div>
  );
}
