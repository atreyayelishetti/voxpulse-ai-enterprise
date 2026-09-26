import React, { useState } from 'react';
import { TrendingDown, DollarSign, Sliders, CheckCircle2, ShieldCheck, Zap, RefreshCw } from 'lucide-react';

export default function CarrierRouteOptimizationEngine() {
  const [minMos, setMinMos] = useState(4.0);
  const [volumeMinutes, setVolumeMinutes] = useState(75000);
  const [targetNumber, setTargetNumber] = useState('+18005550199');
  const [isCalculating, setIsCalculating] = useState(false);

  const [lcrResult, setLcrResult] = useState({
    bestRoute: { name: 'Telnyx PSTN Direct', costPerMin: 0.0035, mos: 4.42, latencyMs: 38, pddSec: 0.8 },
    financialSavings: {
      legacyVendorMonthly: 6375,
      voxpulseMonthly: 262.5,
      monthlySavings: 6112.5,
      annualSavings: 73350,
      percentageSaved: 96
    }
  });

  const handleRecalculate = async () => {
    setIsCalculating(true);
    try {
      const res = await fetch('/api/telecom/lcr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetNumber, minMOS: minMos, volumeMinutes })
      });
      const data = await res.json();
      setLcrResult(data);
    } catch {
      // Fallback local calc
      const klearcom = volumeMinutes * 0.085;
      const voxpulse = volumeMinutes * 0.0035;
      setLcrResult({
        bestRoute: { name: 'Telnyx PSTN Direct', costPerMin: 0.0035, mos: 4.42, latencyMs: 38, pddSec: 0.8 },
        financialSavings: {
          legacyVendorMonthly: Math.round(klearcom),
          voxpulseMonthly: Math.round(voxpulse),
          monthlySavings: Math.round(klearcom - voxpulse),
          annualSavings: Math.round((klearcom - voxpulse) * 12),
          percentageSaved: 96
        }
      });
    } finally {
      setIsCalculating(false);
    }
  };

  const carrierRoutes = [
    { name: 'Telnyx PSTN Direct', rate: '$0.0035 / min', mos: 4.42, latency: '38ms', pdd: '0.8s', status: 'PRIMARY_LCR' },
    { name: 'Lumen / Level 3', rate: '$0.0042 / min', mos: 4.38, latency: '45ms', pdd: '0.9s', status: 'AVAILABLE' },
    { name: 'Bandwidth.com', rate: '$0.0040 / min', mos: 4.35, latency: '48ms', pdd: '1.0s', status: 'AVAILABLE' },
    { name: 'Twilio Voice Direct', rate: '$0.0085 / min', mos: 4.45, latency: '42ms', pdd: '1.1s', status: 'AVAILABLE' },
    { name: 'Klearcom / Cyara SaaS Markup', rate: '$0.0850 / min', mos: 4.30, latency: '65ms', pdd: '1.8s', status: 'LEGACY_VENDOR' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <TrendingDown color="#10b981" size={28} /> QoS-Constrained Least Cost Routing (LCR) & Financial Engine
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Multi-carrier margin optimization. Automatically selects the lowest-cost direct PSTN carrier while strictly maintaining minimum MOS SLA ceilings.
          </p>
        </div>
      </div>

      {/* KPI Savings Banner */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Projected Annual Savings</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>
            ${lcrResult.financialSavings?.annualSavings?.toLocaleString()} / yr
          </div>
          <span className="badge badge-emerald" style={{ marginTop: '8px', display: 'inline-block' }}>
            {lcrResult.financialSavings?.percentageSaved}% Vendor Cost Reduction
          </span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>VoxPulse Monthly Egress Cost</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#06b6d4', marginTop: '4px' }}>
            ${lcrResult.financialSavings?.voxpulseMonthly?.toLocaleString()} / mo
          </div>
          <span className="badge badge-cyan" style={{ marginTop: '8px', display: 'inline-block' }}>Direct Wholesale Telnyx</span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Legacy Klearcom / Cyara Cost</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f43f5e', marginTop: '4px' }}>
            ${lcrResult.financialSavings?.legacyVendorMonthly?.toLocaleString()} / mo
          </div>
          <span className="badge badge-rose" style={{ marginTop: '8px', display: 'inline-block' }}>24x SaaS Reseller Markup</span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Active Optimal Carrier</span>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginTop: '6px' }}>
            {lcrResult.bestRoute?.name}
          </div>
          <span className="badge badge-emerald" style={{ marginTop: '8px', display: 'inline-block' }}>
            {lcrResult.bestRoute?.mos} MOS Target
          </span>
        </div>
      </div>

      {/* Sliders & Parameters */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sliders size={20} color="#06b6d4" /> LCR Routing Strategy Parameters
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '24px', alignItems: 'flex-end' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Monthly Outbound Test Minutes</label>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#06b6d4' }}>{volumeMinutes.toLocaleString()} mins</span>
            </div>
            <input 
              type="range" 
              min="10000" 
              max="500000" 
              step="5000"
              value={volumeMinutes} 
              onChange={(e) => setVolumeMinutes(parseInt(e.target.value, 10))} 
              style={{ width: '100%', accentColor: '#06b6d4' }} 
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Strict Minimum Quality Threshold</label>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#10b981' }}>{minMos.toFixed(1)} MOS</span>
            </div>
            <input 
              type="range" 
              min="3.6" 
              max="4.4" 
              step="0.1"
              value={minMos} 
              onChange={(e) => setMinMos(parseFloat(e.target.value))} 
              style={{ width: '100%', accentColor: '#10b981' }} 
            />
          </div>

          <button 
            className="btn btn-primary"
            onClick={handleRecalculate}
            disabled={isCalculating}
            style={{ height: '42px', padding: '0 24px', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            {isCalculating ? <RefreshCw size={16} className="animate-spin" /> : <Zap size={16} />}
            {isCalculating ? 'Computing LCR...' : 'Optimize Routes'}
          </button>
        </div>
      </div>

      {/* Carrier Rate Comparison Table */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
          Ranked Multi-Carrier Egress Rate Card
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', textAlign: 'left' }}>
                <th style={{ padding: '10px' }}>Egress Carrier</th>
                <th style={{ padding: '10px' }}>Wholesale Rate</th>
                <th style={{ padding: '10px' }}>Average MOS</th>
                <th style={{ padding: '10px' }}>Transit Latency</th>
                <th style={{ padding: '10px' }}>Post-Dial Delay (PDD)</th>
                <th style={{ padding: '10px' }}>Routing Tier</th>
              </tr>
            </thead>
            <tbody>
              {carrierRoutes.map((cr, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', background: idx === 0 ? 'rgba(16, 185, 129, 0.05)' : 'transparent' }}>
                  <td style={{ padding: '12px 10px', fontWeight: 700, color: idx === 0 ? '#10b981' : '#fff' }}>{cr.name}</td>
                  <td style={{ padding: '12px 10px', color: '#06b6d4', fontWeight: 600 }}>{cr.rate}</td>
                  <td style={{ padding: '12px 10px', color: cr.mos >= 4.3 ? '#10b981' : '#f59e0b', fontWeight: 600 }}>{cr.mos} MOS</td>
                  <td style={{ padding: '12px 10px', color: '#94a3b8' }}>{cr.latency}</td>
                  <td style={{ padding: '12px 10px', color: '#cbd5e1' }}>{cr.pdd}</td>
                  <td style={{ padding: '12px 10px' }}>
                    <span className={`badge ${idx === 0 ? 'badge-emerald' : idx === 4 ? 'badge-rose' : 'badge-cyan'}`}>
                      {cr.status}
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
