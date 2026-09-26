import React, { useState, useEffect } from 'react';
import { Activity, Send, CheckCircle2, AlertTriangle, RefreshCw, Server, Wifi } from 'lucide-react';

export default function SIPOptionPingKeepalive() {
  const [intervalSec, setIntervalSec] = useState(30);
  const [isPinging, setIsPinging] = useState(false);
  const [lastPingTime, setLastPingTime] = useState(new Date().toLocaleTimeString());

  const [trunks, setTrunks] = useState([
    { id: 'telnyx', name: 'Telnyx Primary SBC', uri: 'sip:sip.telnyx.com:5060', rttMs: 14, status: 'HEALTHY', lastCode: '200 OK', missedPings: 0 },
    { id: 'twilio', name: 'Twilio Voice Gateway', uri: 'sip:chicago.pstn.twilio.com:5060', rttMs: 22, status: 'HEALTHY', lastCode: '200 OK', missedPings: 0 },
    { id: 'lumen', name: 'Lumen / Level 3 SBC', uri: 'sip:sip.lumen.com:5060', rttMs: 18, status: 'HEALTHY', lastCode: '200 OK', missedPings: 0 },
    { id: 'bandwidth', name: 'Bandwidth.com Gateway', uri: 'sip:sip.bandwidth.com:5060', rttMs: 31, status: 'HEALTHY', lastCode: '200 OK', missedPings: 0 },
    { id: 'backup', name: 'VoxPulse Internal Backup SBC', uri: 'sip:backup-sbc.voxpulse.internal:5060', rttMs: 8, status: 'HEALTHY', lastCode: '200 OK', missedPings: 0 }
  ]);

  const handleInstantPing = () => {
    setIsPinging(true);
    setTimeout(() => {
      setTrunks(trunks.map(t => ({
        ...t,
        rttMs: Math.max(5, Math.round(t.rttMs + (Math.random() - 0.5) * 6)),
        lastCode: '200 OK'
      })));
      setLastPingTime(new Date().toLocaleTimeString());
      setIsPinging(false);
    }, 400);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Activity color="#06b6d4" size={28} /> SIP RFC 3261 OPTIONS Heartbeat & Trunk Keepalive Monitor
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Periodic synthetic SIP OPTIONS pinging. Detects silent carrier SBC link failures before production calls are dropped.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            className="btn btn-primary"
            onClick={handleInstantPing}
            disabled={isPinging}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            {isPinging ? <RefreshCw size={16} className="animate-spin" /> : <Send size={16} />}
            {isPinging ? 'Pinging Trunks...' : 'Send Instant OPTIONS Ping'}
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Active Trunks Monitored</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginTop: '4px' }}>5 / 5 Up</div>
          <span className="badge badge-emerald" style={{ marginTop: '8px', display: 'inline-block' }}>100% Reachability</span>
        </div>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Average Heartbeat RTT</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#06b6d4', marginTop: '4px' }}>18.6 ms</div>
          <span className="badge badge-cyan" style={{ marginTop: '8px', display: 'inline-block' }}>Sub-30ms Low Latency</span>
        </div>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Keepalive Frequency</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#a855f7', marginTop: '4px' }}>Every {intervalSec}s</div>
          <span className="badge badge-purple" style={{ marginTop: '8px', display: 'inline-block' }}>RFC 3261 Standard</span>
        </div>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Failover Threshold</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f59e0b', marginTop: '4px' }}>3 Strikes</div>
          <span className="badge badge-amber" style={{ marginTop: '8px', display: 'inline-block' }}>Auto SBC Reroute</span>
        </div>
      </div>

      {/* Trunk Ping Table */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>
            Live SIP SBC Trunk Registry & Ping Status
          </h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Last Ping Cycle: {lastPingTime}</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', textAlign: 'left' }}>
                <th style={{ padding: '10px' }}>Trunk Target</th>
                <th style={{ padding: '10px' }}>SIP URI</th>
                <th style={{ padding: '10px' }}>RTT Round-Trip</th>
                <th style={{ padding: '10px' }}>Response Code</th>
                <th style={{ padding: '10px' }}>Consecutive Misses</th>
                <th style={{ padding: '10px' }}>Health State</th>
              </tr>
            </thead>
            <tbody>
              {trunks.map((t) => (
                <tr key={t.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 10px', fontWeight: 700, color: '#fff' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Server size={16} color="#06b6d4" />
                      {t.name}
                    </div>
                  </td>
                  <td style={{ padding: '12px 10px', color: '#94a3b8', fontFamily: 'monospace' }}>{t.uri}</td>
                  <td style={{ padding: '12px 10px', color: '#38bdf8', fontWeight: 600 }}>{t.rttMs} ms</td>
                  <td style={{ padding: '12px 10px', color: '#10b981', fontWeight: 700 }}>{t.lastCode}</td>
                  <td style={{ padding: '12px 10px', color: t.missedPings > 0 ? '#ef4444' : '#94a3b8' }}>{t.missedPings} / 3</td>
                  <td style={{ padding: '12px 10px' }}>
                    <span className="badge badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <CheckCircle2 size={12} /> {t.status}
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
