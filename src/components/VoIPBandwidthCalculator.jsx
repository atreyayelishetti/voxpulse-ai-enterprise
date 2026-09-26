import React, { useState } from 'react';
import { Wifi, Sliders, CheckCircle2, ShieldCheck, Cpu, HardDrive } from 'lucide-react';

export default function VoIPBandwidthCalculator() {
  const [concurrentCalls, setConcurrentCalls] = useState(250);
  const [codec, setCodec] = useState('G.711');
  const [ptime, setPtime] = useState(20); // ms
  const [enableSrtp, setEnableSrtp] = useState(true);
  const [enableIpsec, setEnableIpsec] = useState(false);

  const codecPayloads = {
    'G.711': { bitRate: 64, bytesPerMs: 8 },
    'G.729': { bitRate: 8, bytesPerMs: 1 },
    'G.722': { bitRate: 64, bytesPerMs: 8 },
    'Opus': { bitRate: 24, bytesPerMs: 3 }
  };

  const pps = 1000 / ptime;
  const payloadBytes = codecPayloads[codec].bytesPerMs * ptime;
  const rtpHeader = 12 + (enableSrtp ? 4 : 0);
  const udpHeader = 8;
  const ipHeader = 20 + (enableIpsec ? 52 : 0);
  const ethernetHeader = 14 + 4 + 8 + 12; // Preamble + Header + CRC + Inter-packet gap = 38 bytes L2

  const packetSizeBytesL3 = payloadBytes + rtpHeader + udpHeader + ipHeader;
  const packetSizeBytesL2 = packetSizeBytesL3 + ethernetHeader;

  // Bandwidth per call in kbps
  const kbpsPerCallL3 = (packetSizeBytesL3 * 8 * pps) / 1000;
  const kbpsPerCallL2 = (packetSizeBytesL2 * 8 * pps) / 1000;

  // Total bandwidth in Mbps
  const totalMbpsL2 = ((kbpsPerCallL2 * concurrentCalls) / 1000).toFixed(2);
  const recommendedTrunkMbps = (parseFloat(totalMbpsL2) * 1.3).toFixed(1); // 30% overhead buffer

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Wifi color="#06b6d4" size={28} /> Enterprise VoIP Network Bandwidth & IP/UDP/RTP Overhead Calculator
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Accurate protocol layer overhead sizing. Calculates Ethernet L2, IP L3, UDP, RTP, and SRTP crypto bandwidth requirements.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Symmetrical Bandwidth</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#06b6d4', marginTop: '4px' }}>{totalMbpsL2} Mbps</div>
          <span className="badge badge-cyan" style={{ marginTop: '8px', display: 'inline-block' }}>{concurrentCalls} Concurrent Calls</span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Recommended ISP Committed Pipe</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>{recommendedTrunkMbps} Mbps</div>
          <span className="badge badge-emerald" style={{ marginTop: '8px', display: 'inline-block' }}>Includes 30% QoS Headroom</span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Bandwidth per Call (Ethernet L2)</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#a855f7', marginTop: '4px' }}>{kbpsPerCallL2.toFixed(1)} kbps</div>
          <span className="badge badge-purple" style={{ marginTop: '8px', display: 'inline-block' }}>{pps} Packets / Sec</span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Header Overhead Ratio</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f59e0b', marginTop: '4px' }}>
            {Math.round(((packetSizeBytesL2 - payloadBytes) / packetSizeBytesL2) * 100)}%
          </div>
          <span className="badge badge-amber" style={{ marginTop: '8px', display: 'inline-block' }}>L2-L4 Encapsulation</span>
        </div>
      </div>

      {/* Interactive Sizing Sliders */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sliders size={20} color="#06b6d4" /> Telephony Pipe Configuration
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Simultaneous Calls</label>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#06b6d4' }}>{concurrentCalls} Calls</span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="1000" 
              step="10"
              value={concurrentCalls} 
              onChange={(e) => setConcurrentCalls(parseInt(e.target.value, 10))} 
              style={{ width: '100%', accentColor: '#06b6d4' }} 
            />
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '8px' }}>Voice Codec</label>
            <select 
              value={codec} 
              onChange={(e) => setCodec(e.target.value)}
              style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.4)', color: '#fff', border: '1px solid var(--border-color)', borderRadius: '6px' }}
            >
              <option value="G.711">G.711 µ-law / A-law (64 kbps standard)</option>
              <option value="G.729">G.729 CS-ACELP (8 kbps compressed)</option>
              <option value="G.722">G.722 HD Voice (64 kbps wideband)</option>
              <option value="Opus">Opus Voice Dynamic (24 kbps)</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '8px' }}>Packetization (ptime)</label>
            <select 
              value={ptime} 
              onChange={(e) => setPtime(parseInt(e.target.value, 10))}
              style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.4)', color: '#fff', border: '1px solid var(--border-color)', borderRadius: '6px' }}
            >
              <option value="10">10 ms (100 pps - Ultra-low latency)</option>
              <option value="20">20 ms (50 pps - Telecom standard)</option>
              <option value="30">30 ms (33.3 pps - WAN efficiency)</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '10px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem', color: '#fff' }}>
              <input type="checkbox" checked={enableSrtp} onChange={(e) => setEnableSrtp(e.target.checked)} />
              Enable SRTP Media Encryption (+4B)
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem', color: '#fff' }}>
              <input type="checkbox" checked={enableIpsec} onChange={(e) => setEnableIpsec(e.target.checked)} />
              Enable IPsec VPN Tunneling (+52B)
            </label>
          </div>
        </div>
      </div>

      {/* Packet Breakdown */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
          Single VoIP Voice Packet Header & Payload Anatomy ({packetSizeBytesL2} Bytes Total)
        </h3>
        <div style={{ display: 'flex', height: '48px', borderRadius: '8px', overflow: 'hidden', textAlign: 'center', fontSize: '0.75rem', fontWeight: 700 }}>
          <div style={{ width: `${(ethernetHeader / packetSizeBytesL2) * 100}%`, background: '#3b82f6', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Ethernet L2 ({ethernetHeader}B)
          </div>
          <div style={{ width: `${(ipHeader / packetSizeBytesL2) * 100}%`, background: '#06b6d4', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            IP ({ipHeader}B)
          </div>
          <div style={{ width: `${(udpHeader / packetSizeBytesL2) * 100}%`, background: '#a855f7', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            UDP ({udpHeader}B)
          </div>
          <div style={{ width: `${(rtpHeader / packetSizeBytesL2) * 100}%`, background: '#f59e0b', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            RTP ({rtpHeader}B)
          </div>
          <div style={{ width: `${(payloadBytes / packetSizeBytesL2) * 100}%`, background: '#10b981', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Voice Audio Payload ({payloadBytes}B)
          </div>
        </div>
      </div>
    </div>
  );
}
