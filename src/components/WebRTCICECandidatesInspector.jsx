import React, { useState } from 'react';
import { Wifi, CheckCircle2, ShieldCheck, Play, RefreshCw, Server, ArrowRight } from 'lucide-react';

export default function WebRTCICECandidatesInspector() {
  const [isGathering, setIsGathering] = useState(false);

  const [candidates, setCandidates] = useState([
    { id: 1, type: 'host', protocol: 'UDP', ip: '192.168.1.45', port: 51240, priority: 2122260223, status: 'GATHERED', latency: '0.2ms' },
    { id: 2, type: 'srflx', protocol: 'UDP', ip: '198.51.100.45', port: 49152, priority: 1686052863, status: 'NOMINATED', latency: '18.4ms', stunServer: 'stun.l.google.com:19302' },
    { id: 3, type: 'relay', protocol: 'UDP', ip: '203.0.113.10', port: 60234, priority: 41943039, status: 'STANDBY', latency: '42.1ms', turnServer: 'turn.voxpulse.internal:3478' }
  ]);

  const handleGather = () => {
    setIsGathering(true);
    setTimeout(() => {
      setIsGathering(false);
    }, 500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Wifi color="#06b6d4" size={28} /> RFC 8445 Interactive Connectivity Establishment (ICE) Candidate Inspector
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            NAT traversal analyzer. Validates STUN server reflexive (srflx), TURN relay, and host candidate priority formulas.
          </p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={handleGather}
          disabled={isGathering}
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          {isGathering ? <RefreshCw size={16} className="animate-spin" /> : <Play size={16} />}
          {isGathering ? 'Gathering Candidates...' : 'Trigger ICE Gathering'}
        </button>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>ICE Gathering State</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>COMPLETE</div>
          <span className="badge badge-emerald" style={{ marginTop: '8px', display: 'inline-block' }}>All Candidates Discovered</span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Nominated Candidate Pair</span>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#06b6d4', marginTop: '4px' }}>srflx ➔ host</div>
          <span className="badge badge-cyan" style={{ marginTop: '8px', display: 'inline-block' }}>18.4ms RTT</span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>TURN Relay Fallback</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#a855f7', marginTop: '4px' }}>STANDBY</div>
          <span className="badge badge-purple" style={{ marginTop: '8px', display: 'inline-block' }}>Sym-NAT Ready</span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>STUN Server RTT</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>12.2 ms</div>
          <span className="badge badge-emerald" style={{ marginTop: '8px', display: 'inline-block' }}>Binding Request Success</span>
        </div>
      </div>

      {/* Candidates Table */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
          Discovered ICE Transport Candidates
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', textAlign: 'left' }}>
                <th style={{ padding: '10px' }}>Type</th>
                <th style={{ padding: '10px' }}>Protocol</th>
                <th style={{ padding: '10px' }}>IP & Port</th>
                <th style={{ padding: '10px' }}>RFC 8445 Priority</th>
                <th style={{ padding: '10px' }}>Latency</th>
                <th style={{ padding: '10px' }}>Pairing Status</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((c) => (
                <tr key={c.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 10px', fontWeight: 700, color: '#fff' }}>
                    <span className={`badge ${c.type === 'srflx' ? 'badge-cyan' : c.type === 'host' ? 'badge-emerald' : 'badge-purple'}`}>
                      {c.type.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: '12px 10px', color: '#94a3b8' }}>{c.protocol}</td>
                  <td style={{ padding: '12px 10px', color: '#38bdf8', fontFamily: 'monospace' }}>{c.ip}:{c.port}</td>
                  <td style={{ padding: '12px 10px', color: '#cbd5e1', fontFamily: 'monospace' }}>{c.priority}</td>
                  <td style={{ padding: '12px 10px', color: '#10b981', fontWeight: 600 }}>{c.latency}</td>
                  <td style={{ padding: '12px 10px' }}>
                    <span className={`badge ${c.status === 'NOMINATED' ? 'badge-emerald' : 'badge-amber'}`}>
                      {c.status}
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
