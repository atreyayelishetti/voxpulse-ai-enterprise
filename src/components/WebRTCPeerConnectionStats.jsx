import React from 'react';
import { Activity } from 'lucide-react';

export default function WebRTCPeerConnectionStats() {
  const rtpStats = [
    { track: 'Audio Inbound-RTP', bytesReceived: '1.42 MB', packetsLost: 0, jitter: '4.2 ms', roundTripTime: '18 ms' },
    { track: 'Audio Outbound-RTP', bytesSent: '1.38 MB', packetsLost: 0, jitter: '3.8 ms', roundTripTime: '18 ms' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Activity color="#06b6d4" size={28} /> WebRTC RTCPeerConnection inbound-rtp Metrics Logger
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Real-time telemetry dashboard for getStats() inbound-rtp and outbound-rtp WebRTC metrics.
          </p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.72rem' }}>
              <th style={{ padding: '10px' }}>RTP Media Track</th>
              <th style={{ padding: '10px' }}>Data Volume</th>
              <th style={{ padding: '10px' }}>Packets Lost</th>
              <th style={{ padding: '10px' }}>Jitter Delay</th>
              <th style={{ padding: '10px' }}>Round-Trip Time (RTT)</th>
            </tr>
          </thead>
          <tbody>
            {rtpStats.map((s, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px 10px', color: '#fff', fontWeight: 700 }}>{s.track}</td>
                <td style={{ padding: '12px 10px', color: '#06b6d4' }}>{s.bytesReceived || s.bytesSent}</td>
                <td style={{ padding: '12px 10px', color: '#34d399', fontWeight: 700 }}>{s.packetsLost} Packets</td>
                <td style={{ padding: '12px 10px', color: '#38bdf8' }}>{s.jitter}</td>
                <td style={{ padding: '12px 10px', color: '#a78bfa' }}>{s.roundTripTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
