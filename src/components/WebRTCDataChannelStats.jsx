import React from 'react';
import { Activity } from 'lucide-react';

export default function WebRTCDataChannelStats() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Activity color="#06b6d4" size={28} /> WebRTC RTCDataChannel Throughput & Packet Loss Logger
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Log SCTP datagram throughput, out-of-order packet counts, and RTCDataChannel message latencies.
          </p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '24px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>SCTP Stream Protocol</span>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#34d399', marginTop: '4px' }}>SCTP over DTLS</div>
        </div>
        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Message Throughput</span>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#38bdf8', marginTop: '4px' }}>142 msgs / sec</div>
        </div>
        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Data Channel Loss</span>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#a78bfa', marginTop: '4px' }}>0.00%</div>
        </div>
      </div>
    </div>
  );
}
