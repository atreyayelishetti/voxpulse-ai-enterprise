import React, { useState } from 'react';
import { Flame, Server, ShieldCheck, Zap, AlertTriangle, TrendingUp, Sliders } from 'lucide-react';

export default function SIPTrunkBurstingEngine() {
  const [baseCapacity, setBaseCapacity] = useState(250);
  const [burstCeiling, setBurstCeiling] = useState(750);
  const [activeCalls, setActiveCalls] = useState(310);
  const [burstTriggerPercent, setBurstTriggerPercent] = useState(85);
  const [cooldownMinutes, setCooldownMinutes] = useState(5);

  const isBurstingActive = activeCalls > (baseCapacity * (burstTriggerPercent / 100));
  const burstingChannelsInUse = Math.max(0, activeCalls - baseCapacity);
  const burstCostPerMin = 0.0055;
  const currentBurstBurnRateHourly = (burstingChannelsInUse * burstCostPerMin * 60).toFixed(2);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Flame color="#f43f5e" size={28} /> Dynamic SIP Channel Elastic Bursting & Surge Capacity Manager
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Automated carrier SIP trunk expansion during high-volume spikes. Prevents SIP 486 Busy Here and 503 Service Unavailable drops.
          </p>
        </div>
        <span className={`badge ${isBurstingActive ? 'badge-amber' : 'badge-emerald'}`} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Zap size={14} /> {isBurstingActive ? `SURGE ACTIVE: +${burstingChannelsInUse} Burst Channels` : 'NORMAL COMMITTED LOAD'}
        </span>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Active Concurrent Calls</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginTop: '4px' }}>{activeCalls} Channels</div>
          <span className="badge badge-cyan" style={{ marginTop: '8px', display: 'inline-block' }}>Real-time Call Volume</span>
        </div>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Committed Base Channels</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>{baseCapacity} Base</div>
          <span className="badge badge-emerald" style={{ marginTop: '8px', display: 'inline-block' }}>Flat Rate Trunk Tier</span>
        </div>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Burst Ceiling Maximum</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f43f5e', marginTop: '4px' }}>{burstCeiling} Peak</div>
          <span className="badge badge-rose" style={{ marginTop: '8px', display: 'inline-block' }}>SBC License Cap</span>
        </div>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Surge Burn Rate</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f59e0b', marginTop: '4px' }}>${currentBurstBurnRateHourly} / hr</div>
          <span className="badge badge-amber" style={{ marginTop: '8px', display: 'inline-block' }}>Elastic Over-Quota</span>
        </div>
      </div>

      {/* Bursting Controls & Capacity Sliders */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sliders size={20} color="#06b6d4" /> Elastic Trunk Thresholds
          </h3>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Simulate Concurrent Call Volume</label>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#06b6d4' }}>{activeCalls} Calls</span>
            </div>
            <input 
              type="range" 
              min="50" 
              max="1000" 
              value={activeCalls} 
              onChange={(e) => setActiveCalls(parseInt(e.target.value, 10))} 
              style={{ width: '100%', accentColor: '#06b6d4' }} 
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Committed Base Trunk Capacity</label>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#10b981' }}>{baseCapacity} Channels</span>
            </div>
            <input 
              type="range" 
              min="50" 
              max="500" 
              step="25"
              value={baseCapacity} 
              onChange={(e) => setBaseCapacity(parseInt(e.target.value, 10))} 
              style={{ width: '100%', accentColor: '#10b981' }} 
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Elastic Bursting Trigger Threshold</label>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f59e0b' }}>{burstTriggerPercent}% of Base</span>
            </div>
            <input 
              type="range" 
              min="70" 
              max="95" 
              value={burstTriggerPercent} 
              onChange={(e) => setBurstTriggerPercent(parseInt(e.target.value, 10))} 
              style={{ width: '100%', accentColor: '#f59e0b' }} 
            />
          </div>
        </div>

        {/* Visual Channel Capacity Gauge */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Server size={20} color="#3b82f6" /> Real-time Trunk Capacity Saturation
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '8px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Committed Capacity Fill:</span>
                <span style={{ color: '#10b981', fontWeight: 700 }}>
                  {Math.min(100, Math.round((activeCalls / baseCapacity) * 100))}% ({Math.min(activeCalls, baseCapacity)}/{baseCapacity})
                </span>
              </div>
              <div style={{ width: '100%', height: '12px', background: 'rgba(255,255,255,0.06)', borderRadius: '6px', overflow: 'hidden', marginTop: '6px' }}>
                <div style={{ width: `${Math.min(100, (activeCalls / baseCapacity) * 100)}%`, height: '100%', background: 'linear-gradient(90deg, #10b981, #059669)' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Elastic Burst Buffer Used:</span>
                <span style={{ color: '#f43f5e', fontWeight: 700 }}>
                  {burstingChannelsInUse} / {burstCeiling - baseCapacity} Channels
                </span>
              </div>
              <div style={{ width: '100%', height: '12px', background: 'rgba(255,255,255,0.06)', borderRadius: '6px', overflow: 'hidden', marginTop: '6px' }}>
                <div style={{ width: `${Math.min(100, (burstingChannelsInUse / (burstCeiling - baseCapacity)) * 100)}%`, height: '100%', background: 'linear-gradient(90deg, #f59e0b, #ef4444)' }} />
              </div>
            </div>
          </div>

          <div style={{ marginTop: 'auto', padding: '14px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            <strong>Carrier Over-Quota Overflow Policy:</strong> If calls exceed {burstCeiling} channels, auto-reroute overflow INVITE requests to Secondary Carrier SBC (Telnyx Tier-1 Gateway) via DNS SRV priority weighting.
          </div>
        </div>
      </div>
    </div>
  );
}
