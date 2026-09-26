import React, { useState } from 'react';
import { UserCheck, ShieldCheck, RefreshCw, Server, Wifi, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function SIPRegistrationMonitor() {
  const [registrations, setRegistrations] = useState([
    { id: 1, aor: 'sip:agent101@voxpulse.internal', contact: 'sip:agent101@192.168.1.45:5060;transport=udp', publicIp: '203.0.113.12:10424 (NAT Pin)', userAgent: 'VoxPulse WebRTC Dialer v1.4', expiresSec: 284, status: 'REGISTERED' },
    { id: 2, aor: 'sip:operator_qa@voxpulse.internal', contact: 'sip:operator@10.0.4.12:5060', publicIp: '198.51.100.22:5060 (Direct)', userAgent: 'Polycom VVX 450 Desk Phone', expiresSec: 192, status: 'REGISTERED' },
    { id: 3, aor: 'sip:pstn_gateway_01@voxpulse.internal', contact: 'sip:gw01@172.16.0.8:5060', publicIp: '198.51.100.99:5060 (Trunk)', userAgent: 'AudioCodes Mediant 1000 SBC', expiresSec: 412, status: 'REGISTERED' },
    { id: 4, aor: 'sip:test_runner_bot@voxpulse.internal', contact: 'sip:bot@127.0.0.1:5060', publicIp: 'Local Loopback (Simulated)', userAgent: 'VoxPulse PSTN Bot Engine', expiresSec: 540, status: 'REGISTERED' }
  ]);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setRegistrations(registrations.map(r => ({
        ...r,
        expiresSec: Math.max(30, r.expiresSec - 10)
      })));
      setIsRefreshing(false);
    }, 400);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <UserCheck color="#06b6d4" size={28} /> SIP Registrar & Address of Record (AOR) Monitor
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            RFC 3261 Location Service & SIP Registrar database. Inspects registered endpoints, NAT public bindings, and contact expirations.
          </p>
        </div>
        <button 
          className="btn btn-secondary"
          onClick={handleRefresh}
          disabled={isRefreshing}
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
          {isRefreshing ? 'Polling Registrar...' : 'Refresh AOR Pool'}
        </button>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Active Registered AORs</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>{registrations.length} Active</div>
          <span className="badge badge-emerald" style={{ marginTop: '8px', display: 'inline-block' }}>All Endpoints Online</span>
        </div>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>NAT Traversal Method</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#06b6d4', marginTop: '4px' }}>RFC 3581 rport</div>
          <span className="badge badge-cyan" style={{ marginTop: '8px', display: 'inline-block' }}>Symmetric Response</span>
        </div>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Default Registration TTL</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#a855f7', marginTop: '4px' }}>600 sec</div>
          <span className="badge badge-purple" style={{ marginTop: '8px', display: 'inline-block' }}>Expires Header</span>
        </div>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>NAT Keep-Alive Interval</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f59e0b', marginTop: '4px' }}>25 sec</div>
          <span className="badge badge-amber" style={{ marginTop: '8px', display: 'inline-block' }}>CRLF Double Ping</span>
        </div>
      </div>

      {/* Registrations Table */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
          Active SIP Location Service Bindings
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', textAlign: 'left' }}>
                <th style={{ padding: '10px' }}>Address of Record (AOR)</th>
                <th style={{ padding: '10px' }}>Public NAT Binding (rport)</th>
                <th style={{ padding: '10px' }}>User-Agent Device</th>
                <th style={{ padding: '10px' }}>Time-to-Live (TTL)</th>
                <th style={{ padding: '10px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((r) => (
                <tr key={r.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 10px', fontWeight: 700, color: '#fff', fontFamily: 'monospace' }}>{r.aor}</td>
                  <td style={{ padding: '12px 10px', color: '#06b6d4', fontFamily: 'monospace' }}>{r.publicIp}</td>
                  <td style={{ padding: '12px 10px', color: '#cbd5e1' }}>{r.userAgent}</td>
                  <td style={{ padding: '12px 10px', color: r.expiresSec < 60 ? '#ef4444' : '#10b981', fontWeight: 600 }}>
                    {r.expiresSec}s remaining
                  </td>
                  <td style={{ padding: '12px 10px' }}>
                    <span className="badge badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <CheckCircle2 size={12} /> {r.status}
                    </span>
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
