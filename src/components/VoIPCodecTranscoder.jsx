import React, { useState } from 'react';
import { Cpu, ArrowRight, Activity, Zap, CheckCircle2, Sliders } from 'lucide-react';

export default function VoIPCodecTranscoder() {
  const [sourceCodec, setSourceCodec] = useState('G.711u');
  const [targetCodec, setTargetCodec] = useState('Opus');
  const [concurrentCalls, setConcurrentCalls] = useState(100);
  const [ptime, setPtime] = useState(20);

  const codecs = {
    'G.711u': { name: 'G.711 µ-law', sampleRate: '8 kHz', bitRate: 64, mosMax: 4.41, cpuLoadFactor: 1.0, type: 'Narrowband' },
    'G.711a': { name: 'G.711 A-law', sampleRate: '8 kHz', bitRate: 64, mosMax: 4.41, cpuLoadFactor: 1.0, type: 'Narrowband' },
    'G.729': { name: 'G.729AB CS-ACELP', sampleRate: '8 kHz', bitRate: 8, mosMax: 3.92, cpuLoadFactor: 7.5, type: 'Low-Bitrate' },
    'G.722': { name: 'G.722 HD Voice', sampleRate: '16 kHz', bitRate: 64, mosMax: 4.50, cpuLoadFactor: 2.2, type: 'Wideband' },
    'Opus': { name: 'Opus Interactive Audio', sampleRate: '48 kHz', bitRate: 24, mosMax: 4.58, cpuLoadFactor: 3.8, type: 'Fullband Dynamic' },
    'AMR-WB': { name: 'AMR-WB (G.722.2)', sampleRate: '16 kHz', bitRate: 12.65, mosMax: 4.48, cpuLoadFactor: 5.4, type: 'Mobile HD Voice' }
  };

  const src = codecs[sourceCodec];
  const dst = codecs[targetCodec];

  // Calculate tandem transcode impairment
  const isDirect = sourceCodec === targetCodec;
  const transcodeLatencyMs = isDirect ? 0 : 12 + (ptime === 10 ? 5 : ptime === 20 ? 10 : 15);
  const transcodeMos = isDirect 
    ? src.mosMax 
    : Math.min(src.mosMax, dst.mosMax) - (sourceCodec === 'G.729' || targetCodec === 'G.729' ? 0.35 : 0.08);

  // Bandwidth calculation (Payload + 40 bytes IP/UDP/RTP headers at 50 pps for 20ms ptime)
  const packetsPerSec = 1000 / ptime;
  const headerOverheadKbps = (40 * 8 * packetsPerSec) / 1000;
  const sourceBandwidthMbps = (((src.bitRate + headerOverheadKbps) * concurrentCalls) / 1000).toFixed(2);
  const targetBandwidthMbps = (((dst.bitRate + headerOverheadKbps) * concurrentCalls) / 1000).toFixed(2);
  const bandwidthSavings = ((sourceBandwidthMbps - targetBandwidthMbps) / sourceBandwidthMbps * 100).toFixed(1);

  // CPU Core Capacity
  const sessionsPerCore = Math.round(180 / (src.cpuLoadFactor + dst.cpuLoadFactor));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Cpu color="#06b6d4" size={28} /> Telecom VoIP Codec Transcoding & DSP Benchmark Matrix
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Real-time DSP transcoding modeling across PSTN narrowband G.711, mobile AMR-WB, and modern Opus wideband WebRTC codecs.
          </p>
        </div>
      </div>

      {/* Codec Transcoder Selector Bar */}
      <div className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
        <div style={{ flex: 1, minWidth: '220px' }}>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
            Ingress Inbound Codec (Caller)
          </label>
          <select 
            value={sourceCodec} 
            onChange={(e) => setSourceCodec(e.target.value)}
            style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.4)', color: '#fff', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '0.95rem', fontWeight: 600 }}
          >
            {Object.keys(codecs).map((c) => (
              <option key={c} value={c}>{codecs[c].name} ({codecs[c].sampleRate})</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(6, 182, 212, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#06b6d4' }}>
            <ArrowRight size={22} />
          </div>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>DSP Transcode</span>
        </div>

        <div style={{ flex: 1, minWidth: '220px' }}>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
            Egress Outbound Codec (Agent / IVR)
          </label>
          <select 
            value={targetCodec} 
            onChange={(e) => setTargetCodec(e.target.value)}
            style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.4)', color: '#fff', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '0.95rem', fontWeight: 600 }}
          >
            {Object.keys(codecs).map((c) => (
              <option key={c} value={c}>{codecs[c].name} ({codecs[c].sampleRate})</option>
            ))}
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Tandem Post-Transcode MOS</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: transcodeMos >= 4.2 ? '#10b981' : '#f59e0b', marginTop: '4px' }}>
            {transcodeMos.toFixed(2)} MOS
          </div>
          <span className="badge badge-emerald" style={{ marginTop: '8px', display: 'inline-block' }}>
            {isDirect ? 'Direct Passthrough' : 'Tandem Impaired'}
          </span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>DSP Transcode Delay</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#06b6d4', marginTop: '4px' }}>{transcodeLatencyMs} ms</div>
          <span className="badge badge-cyan" style={{ marginTop: '8px', display: 'inline-block' }}>Framing & Jitter Latency</span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Bandwidth ({concurrentCalls} Calls)</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#a855f7', marginTop: '4px' }}>{targetBandwidthMbps} Mbps</div>
          <span className="badge badge-purple" style={{ marginTop: '8px', display: 'inline-block' }}>
            {bandwidthSavings > 0 ? `${bandwidthSavings}% Net Savings` : 'Standard Bitrate'}
          </span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>SBC Core Transcode Density</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#38bdf8', marginTop: '4px' }}>{sessionsPerCore} Sessions</div>
          <span className="badge badge-cyan" style={{ marginTop: '8px', display: 'inline-block' }}>Per CPU Xeon Core</span>
        </div>
      </div>

      {/* Codec Comparison Table */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
          Enterprise Carrier Codec Specifications Matrix
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', textAlign: 'left' }}>
                <th style={{ padding: '10px' }}>Codec Identifier</th>
                <th style={{ padding: '10px' }}>Audio Bandwidth</th>
                <th style={{ padding: '10px' }}>Bitrate</th>
                <th style={{ padding: '10px' }}>Theoretical Max MOS</th>
                <th style={{ padding: '10px' }}>DSP Complexity</th>
                <th style={{ padding: '10px' }}>Industry Standard Usage</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(codecs).map((key) => {
                const c = codecs[key];
                const isSelected = key === sourceCodec || key === targetCodec;
                return (
                  <tr key={key} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', background: isSelected ? 'rgba(6, 182, 212, 0.05)' : 'transparent' }}>
                    <td style={{ padding: '12px 10px', fontWeight: 700, color: isSelected ? '#06b6d4' : '#fff' }}>{c.name}</td>
                    <td style={{ padding: '12px 10px', color: '#94a3b8' }}>{c.sampleRate} ({c.type})</td>
                    <td style={{ padding: '12px 10px', color: '#38bdf8' }}>{c.bitRate} kbps</td>
                    <td style={{ padding: '12px 10px', color: '#10b981', fontWeight: 600 }}>{c.mosMax} MOS</td>
                    <td style={{ padding: '12px 10px', color: '#f59e0b' }}>{c.cpuLoadFactor}x relative</td>
                    <td style={{ padding: '12px 10px', color: '#cbd5e1' }}>
                      {key === 'G.711u' ? 'North America PSTN standard' : key === 'G.711a' ? 'Europe / International PSTN' : key === 'G.729' ? 'Bandwidth-constrained MPLS trunks' : key === 'G.722' ? 'Enterprise VoIP Desk Phones' : key === 'Opus' ? 'WebRTC Softphones & Google Voice' : 'Cellular VoLTE / HD Voice'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
