import React, { useState } from 'react';
import { Send, CheckCircle2, ShieldCheck, Activity, Terminal, Layers } from 'lucide-react';

export default function WebRTCDataChannelStats() {
  const [messages, setMessages] = useState([
    { id: 1, direction: 'TX', payload: '{"event":"AGENT_MUTE","state":true}', bytes: 34, rtt: '18ms' },
    { id: 2, direction: 'RX', payload: '{"event":"CAD_UPDATE","callerId":"+12125550100"}', bytes: 48, rtt: '19ms' },
    { id: 3, direction: 'TX', payload: '{"event":"DTMF_SEND","digit":"1"}', bytes: 29, rtt: '16ms' }
  ]);

  const [inputMsg, setInputMsg] = useState('{"event":"PING","time":' + Date.now() + '}');

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputMsg) return;
    setMessages([
      ...messages,
      { id: Date.now(), direction: 'TX', payload: inputMsg, bytes: inputMsg.length, rtt: '14ms' }
    ]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Layers color="#06b6d4" size={28} /> WebRTC SCTP RTCDataChannel Telemetry & Backpressure Inspector
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Inspects out-of-band SCTP data channel streams for softphone CTI telemetry, real-time call controls, and binary DTMF signaling.
          </p>
        </div>
        <span className="badge badge-emerald">RTCDataChannel OPEN</span>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>SCTP RTT Latency</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>17.4 ms</div>
          <span className="badge badge-emerald" style={{ marginTop: '8px', display: 'inline-block' }}>Real-time Sync</span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Messages Exchanged</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#06b6d4', marginTop: '4px' }}>{messages.length} Frames</div>
          <span className="badge badge-cyan" style={{ marginTop: '8px', display: 'inline-block' }}>0 Drops</span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>BufferedAmount Backpressure</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>0 Bytes</div>
          <span className="badge badge-emerald" style={{ marginTop: '8px', display: 'inline-block' }}>Buffer Empty</span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Max Packet Life Time</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#a855f7', marginTop: '4px' }}>3000 ms</div>
          <span className="badge badge-purple" style={{ marginTop: '8px', display: 'inline-block' }}>Ordered Delivery</span>
        </div>
      </div>

      {/* Frame Message Sender */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
          Dispatch JSON Control Frame over DataChannel
        </h3>
        <form onSubmit={handleSend} style={{ display: 'flex', gap: '12px' }}>
          <input 
            type="text" 
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            style={{ flex: 1, padding: '10px 14px', background: 'rgba(0,0,0,0.4)', color: '#38bdf8', fontFamily: 'monospace', fontSize: '0.85rem', border: '1px solid var(--border-color)', borderRadius: '6px' }}
          />
          <button 
            type="submit" 
            className="btn btn-primary"
            style={{ padding: '0 20px', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Send size={16} /> Send SCTP Frame
          </button>
        </form>
      </div>

      {/* Messages Stream */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
          Active DataChannel Frame Stream
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {messages.map((m) => (
            <div 
              key={m.id} 
              style={{ 
                padding: '10px 14px', 
                background: 'rgba(0,0,0,0.3)', 
                borderRadius: '6px', 
                border: '1px solid var(--border-color)',
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center' 
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span className={`badge ${m.direction === 'TX' ? 'badge-cyan' : 'badge-emerald'}`}>{m.direction}</span>
                <span style={{ color: '#fff', fontFamily: 'monospace', fontSize: '0.82rem' }}>{m.payload}</span>
              </div>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{m.bytes} Bytes ({m.rtt})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
