import React, { useState } from 'react';
import { Globe2, Activity, Wifi, Radio, Server, ShieldCheck, AlertTriangle } from 'lucide-react';

export default function VoIPMOSMap3D() {
  const [selectedRegion, setSelectedRegion] = useState('us-east');

  const regions = [
    { id: 'us-east', name: 'North America (Ashburn, VA)', mos: 4.45, rFactor: 92.4, latencyMs: 18, jitterMs: 1.8, lossPercent: 0.0, carrier: 'Telnyx / Level 3', status: 'OPTIMAL' },
    { id: 'us-west', name: 'US West Coast (San Jose, CA)', mos: 4.42, rFactor: 91.8, latencyMs: 32, jitterMs: 2.1, lossPercent: 0.0, carrier: 'Twilio Direct', status: 'OPTIMAL' },
    { id: 'eu-central', name: 'Europe Central (Frankfurt)', mos: 4.38, rFactor: 90.5, latencyMs: 24, jitterMs: 2.4, lossPercent: 0.02, carrier: 'Deutsche Telekom PSTN', status: 'OPTIMAL' },
    { id: 'eu-west', name: 'Europe West (London, UK)', mos: 4.40, rFactor: 91.2, latencyMs: 22, jitterMs: 2.0, lossPercent: 0.01, carrier: 'BT / Colt Telecom', status: 'OPTIMAL' },
    { id: 'apac-east', name: 'APAC East (Tokyo, Japan)', mos: 4.25, rFactor: 86.4, latencyMs: 68, jitterMs: 4.5, lossPercent: 0.05, carrier: 'NTT Communications', status: 'GOOD' },
    { id: 'apac-south', name: 'APAC South (Singapore)', mos: 4.28, rFactor: 87.2, latencyMs: 54, jitterMs: 3.8, lossPercent: 0.04, carrier: 'Singtel PSTN', status: 'GOOD' },
    { id: 'apac-se', name: 'Oceania (Sydney, Australia)', mos: 4.15, rFactor: 84.1, latencyMs: 142, jitterMs: 6.2, lossPercent: 0.08, carrier: 'Telstra PSTN', status: 'GOOD' },
    { id: 'sa-east', name: 'South America (São Paulo)', mos: 4.08, rFactor: 82.5, latencyMs: 118, jitterMs: 7.1, lossPercent: 0.12, carrier: 'Embratel / Vivo', status: 'ACCEPTABLE' }
  ];

  const current = regions.find(r => r.id === selectedRegion) || regions[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Globe2 color="#06b6d4" size={28} /> Global Spatial VoIP MOS & Audio Quality Grid
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Real-time global Mean Opinion Score (MOS) distribution across continental Points of Presence (POPs) and carrier transit nodes.
          </p>
        </div>
        <span className="badge badge-emerald" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ShieldCheck size={14} /> 8/8 Global POPs Fully Operational
        </span>
      </div>

      {/* Global Regional Grid Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
        {regions.map((r) => {
          const isSelected = selectedRegion === r.id;
          return (
            <div 
              key={r.id} 
              className="glass-card" 
              onClick={() => setSelectedRegion(r.id)}
              style={{ 
                padding: '20px', 
                cursor: 'pointer',
                borderColor: isSelected ? '#06b6d4' : 'var(--border-color)',
                background: isSelected ? 'rgba(6, 182, 212, 0.08)' : 'var(--bg-glass)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: isSelected ? '#06b6d4' : '#fff' }}>{r.name}</span>
                <span className={`badge ${r.status === 'OPTIMAL' ? 'badge-emerald' : 'badge-cyan'}`}>{r.status}</span>
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: r.mos >= 4.3 ? '#10b981' : '#38bdf8', marginTop: '8px' }}>
                {r.mos} MOS
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                <span>Latency: <strong style={{ color: '#fff' }}>{r.latencyMs}ms</strong></span>
                <span>Jitter: <strong style={{ color: '#fff' }}>{r.jitterMs}ms</strong></span>
                <span>Loss: <strong style={{ color: '#fff' }}>{r.lossPercent}%</strong></span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Deep Dive POP Inspection Panel */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Activity size={22} color="#06b6d4" /> POP Telemetry Telemetry Breakdown: {current.name}
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>ITU-T G.107 R-Factor</span>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>{current.rFactor} / 100</div>
          </div>
          <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Active Egress Carrier</span>
            <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#06b6d4', marginTop: '4px' }}>{current.carrier}</div>
          </div>
          <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Round-Trip Time (RTT)</span>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f59e0b', marginTop: '4px' }}>{current.latencyMs} ms</div>
          </div>
          <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Network Jitter Variance</span>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#38bdf8', marginTop: '4px' }}>±{current.jitterMs} ms</div>
          </div>
        </div>

        {/* Carrier Hop Trace Pathway */}
        <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>
          Live Audio Route Path Architecture
        </h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto', padding: '16px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px' }}>
          <div style={{ padding: '10px 14px', background: 'rgba(6, 182, 212, 0.1)', border: '1px solid #06b6d4', borderRadius: '6px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.72rem', color: '#06b6d4', fontWeight: 600 }}>HOP 1 (ORIGIN)</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>VoxPulse Core Engine</div>
          </div>
          <span style={{ color: 'var(--text-muted)', fontWeight: 800 }}>➔</span>
          <div style={{ padding: '10px 14px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid #3b82f6', borderRadius: '6px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.72rem', color: '#3b82f6', fontWeight: 600 }}>HOP 2 (POP SBC)</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>{current.name.split(' ')[0]} SBC</div>
          </div>
          <span style={{ color: 'var(--text-muted)', fontWeight: 800 }}>➔</span>
          <div style={{ padding: '10px 14px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', borderRadius: '6px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 600 }}>HOP 3 (TIER-1 TRANSIT)</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>{current.carrier}</div>
          </div>
          <span style={{ color: 'var(--text-muted)', fontWeight: 800 }}>➔</span>
          <div style={{ padding: '10px 14px', background: 'rgba(168, 85, 247, 0.1)', border: '1px solid #a855f7', borderRadius: '6px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.72rem', color: '#a855f7', fontWeight: 600 }}>HOP 4 (TARGET PSTN)</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>Local Exchange Central Office</div>
          </div>
        </div>
      </div>
    </div>
  );
}
