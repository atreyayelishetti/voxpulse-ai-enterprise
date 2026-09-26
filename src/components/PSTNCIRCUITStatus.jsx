import React, { useState } from 'react';
import { Cpu, Server, CheckCircle2, AlertTriangle, ShieldCheck, Activity } from 'lucide-react';

export default function PSTNCIRCUITStatus() {
  const [selectedSpan, setSelectedSpan] = useState(1);

  const spans = [
    { id: 1, name: 'Span 1: T1 Primary Trunks (Ashburn)', type: 'T1 (23B+D)', framing: 'ESF / B8ZS', dChannel: 'LAPD Q.921 UP', bChannelsActive: 18, totalB: 23, alarms: 'NONE', status: 'SYNCHRONIZED' },
    { id: 2, name: 'Span 2: T1 Failover Trunks (San Jose)', type: 'T1 (23B+D)', framing: 'ESF / B8ZS', dChannel: 'LAPD Q.921 UP', bChannelsActive: 11, totalB: 23, alarms: 'NONE', status: 'SYNCHRONIZED' },
    { id: 3, name: 'Span 3: E1 International PRI (London)', type: 'E1 (30B+D)', framing: 'CRC4 / HDB3', dChannel: 'LAPD Q.921 UP', bChannelsActive: 22, totalB: 30, alarms: 'NONE', status: 'SYNCHRONIZED' }
  ];

  const currentSpan = spans.find(s => s.id === selectedSpan) || spans[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Cpu color="#06b6d4" size={28} /> ISDN PRI T1 / E1 Legacy PSTN Circuit Span & D-Channel Monitor
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Direct digital trunk diagnostics. Monitors T1 ESF/B8ZS and E1 CRC4 framing, Q.921/Q.931 signaling, and B-channel timeslots.
          </p>
        </div>
        <span className="badge badge-emerald" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ShieldCheck size={14} /> Stratum 1 Clock Synchronized
        </span>
      </div>

      {/* Spans Selector Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {spans.map((s) => {
          const isSelected = selectedSpan === s.id;
          return (
            <div 
              key={s.id}
              className="glass-card"
              onClick={() => setSelectedSpan(s.id)}
              style={{ 
                padding: '20px', 
                cursor: 'pointer',
                borderColor: isSelected ? '#06b6d4' : 'var(--border-color)',
                background: isSelected ? 'rgba(6, 182, 212, 0.08)' : 'var(--bg-glass)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: isSelected ? '#06b6d4' : '#fff' }}>{s.name}</span>
                <span className="badge badge-emerald">{s.status}</span>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginTop: '8px' }}>
                {s.bChannelsActive} / {s.totalB} B-Channels
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                <span>Type: <strong style={{ color: '#06b6d4' }}>{s.type}</strong></span>
                <span>Framing: <strong style={{ color: '#fff' }}>{s.framing}</strong></span>
              </div>
            </div>
          );
        })}
      </div>

      {/* B-Channel Timeslot Grid Visualizer */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
          {currentSpan.name} Timeslot Occupancy Map
        </h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
          Time-Division Multiplexed (TDM) DS0 Timeslots (64 kbps PCM uncompressed G.711 voice channels)
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))', gap: '10px' }}>
          {Array.from({ length: currentSpan.totalB }, (_, i) => {
            const isBusy = i < currentSpan.bChannelsActive;
            return (
              <div 
                key={i}
                style={{ 
                  padding: '12px 8px', 
                  borderRadius: '6px', 
                  background: isBusy ? 'rgba(6, 182, 212, 0.15)' : 'rgba(16, 185, 129, 0.08)',
                  border: `1px solid ${isBusy ? '#06b6d4' : 'rgba(255,255,255,0.06)'}`,
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>TS #{i + 1}</div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: isBusy ? '#38bdf8' : '#10b981', marginTop: '2px' }}>
                  {isBusy ? 'BUSY' : 'IDLE'}
                </div>
              </div>
            );
          })}
          {/* D-Channel Timeslot */}
          <div style={{ padding: '12px 8px', borderRadius: '6px', background: 'rgba(168, 85, 247, 0.15)', border: '1px solid #a855f7', textAlign: 'center' }}>
            <div style={{ fontSize: '0.7rem', color: '#a855f7' }}>TS #D</div>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff', marginTop: '2px' }}>D-CHAN</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '10px', height: '10px', background: '#38bdf8', borderRadius: '2px' }} /> Active Call DS0</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '10px', height: '10px', background: '#10b981', borderRadius: '2px' }} /> Available Standby DS0</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '10px', height: '10px', background: '#a855f7', borderRadius: '2px' }} /> Q.931 Signaling D-Channel</div>
        </div>
      </div>
    </div>
  );
}
