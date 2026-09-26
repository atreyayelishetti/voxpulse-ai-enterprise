import React, { useState } from 'react';
import { Activity, Radio, CheckCircle2, ShieldCheck, RefreshCw, Copy } from 'lucide-react';

export default function WebRTCPeerConnectionStats() {
  const [copied, setCopied] = useState(false);

  const stats = {
    connectionState: 'connected',
    iceConnectionState: 'connected',
    signalingState: 'stable',
    codec: 'Opus (48,000 Hz, 2 Channels)',
    inboundAudio: {
      packetsReceived: 18492,
      packetsLost: 2,
      fractionLost: '0.01%',
      jitterSec: '0.0018s (1.8ms)',
      jitterBufferDelaySec: '0.024s (24ms)',
      audioLevelDbfs: -18.4
    },
    candidatePair: {
      localType: 'srflx (Public STUN Reflexive)',
      localAddress: '198.51.100.45:49152',
      remoteType: 'host (SBC Edge Relay)',
      remoteAddress: '192.76.120.10:16420',
      currentRttMs: 21.2
    }
  };

  const handleCopyStats = () => {
    navigator.clipboard.writeText(JSON.stringify(stats, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Activity color="#06b6d4" size={28} /> WebRTC RTCPeerConnection Diagnostics & Inbound RTP Quality
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            W3C getStats() telemetry inspector. Inspects audio jitter buffers, packet loss concealment, and selected ICE candidate round-trip times.
          </p>
        </div>
        <button 
          className="btn btn-secondary"
          onClick={handleCopyStats}
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          {copied ? <CheckCircle2 size={16} color="#10b981" /> : <Copy size={16} />}
          {copied ? 'Copied Stats JSON!' : 'Export getStats() JSON'}
        </button>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>WebRTC Audio RTT</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>{stats.candidatePair.currentRttMs} ms</div>
          <span className="badge badge-emerald" style={{ marginTop: '8px', display: 'inline-block' }}>Interactive Real-Time</span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Jitter Buffer Delay</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#06b6d4', marginTop: '4px' }}>24 ms</div>
          <span className="badge badge-cyan" style={{ marginTop: '8px', display: 'inline-block' }}>Zero Audio Lag</span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Packet Loss Fraction</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>{stats.inboundAudio.fractionLost}</div>
          <span className="badge badge-emerald" style={{ marginTop: '8px', display: 'inline-block' }}>2 Lost of 18k</span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Active Media Codec</span>
          <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#a855f7', marginTop: '8px' }}>Opus 48 kHz</div>
          <span className="badge badge-purple" style={{ marginTop: '8px', display: 'inline-block' }}>Fullband Audio</span>
        </div>
      </div>

      {/* Inbound Audio & ICE Pair Detail Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
            Inbound Audio Stream RTP Metrics
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Total Packets Received:</span>
              <span style={{ color: '#fff', fontWeight: 700 }}>{stats.inboundAudio.packetsReceived.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Jitter Variance:</span>
              <span style={{ color: '#06b6d4', fontWeight: 700 }}>{stats.inboundAudio.jitterSec}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Audio Energy Level:</span>
              <span style={{ color: '#10b981', fontWeight: 700 }}>{stats.inboundAudio.audioLevelDbfs} dBFS</span>
            </div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
            Active Candidate Pair (Transport)
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Local Candidate:</span>
              <span style={{ color: '#38bdf8', fontFamily: 'monospace' }}>{stats.candidatePair.localAddress}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Remote SBC Media Proxy:</span>
              <span style={{ color: '#10b981', fontFamily: 'monospace' }}>{stats.candidatePair.remoteAddress}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Candidate Pair State:</span>
              <span style={{ color: '#10b981', fontWeight: 700 }}>SUCCEEDED (Nominated)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
