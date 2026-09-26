import React, { useState } from 'react';
import { BarChart3, TrendingUp, Sliders, ShieldCheck, AlertTriangle } from 'lucide-react';

export default function CarrierP50P99LatencyGraph() {
  const [timeRange, setTimeRange] = useState('24h');
  const [selectedMetric, setSelectedMetric] = useState('pdd');

  const carriers = [
    { name: 'Telnyx PSTN Direct', p50: 38, p90: 48, p95: 56, p99: 82, violations: 0, status: 'EXCELLENT' },
    { name: 'Twilio Voice Network', p50: 44, p90: 58, p95: 68, p99: 110, violations: 0, status: 'GOOD' },
    { name: 'Lumen / Level 3 Telecom', p50: 40, p90: 52, p95: 62, p99: 94, violations: 0, status: 'GOOD' },
    { name: 'Bandwidth.com', p50: 46, p90: 60, p95: 74, p99: 124, violations: 1, status: 'ACCEPTABLE' },
    { name: 'Tata Communications', p50: 78, p90: 105, p95: 135, p99: 218, violations: 8, status: 'BREACH_RISK' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <BarChart3 color="#06b6d4" size={28} /> Tier-1 Carrier P50, P90 & P99 Latency Percentile Radar
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            High-percentile tail latency analysis. Measures Post-Dial Delay (PDD) and RTP jitter tail distributions against enterprise SLAs.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['1h', '24h', '7d'].map((r) => (
            <button
              key={r}
              className={`btn ${timeRange === r ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setTimeRange(r)}
              style={{ padding: '6px 12px', fontSize: '0.8rem' }}
            >
              Last {r.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Percentile Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Global P50 (Median)</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>41.2 ms</div>
          <span className="badge badge-emerald" style={{ marginTop: '8px', display: 'inline-block' }}>50% of Calls Under</span>
        </div>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Global P90 Percentile</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#06b6d4', marginTop: '4px' }}>54.8 ms</div>
          <span className="badge badge-cyan" style={{ marginTop: '8px', display: 'inline-block' }}>90% of Calls Under</span>
        </div>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Global P95 Percentile</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f59e0b', marginTop: '4px' }}>67.4 ms</div>
          <span className="badge badge-amber" style={{ marginTop: '8px', display: 'inline-block' }}>95% of Calls Under</span>
        </div>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Global P99 Tail Latency</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f43f5e', marginTop: '4px' }}>112.5 ms</div>
          <span className="badge badge-rose" style={{ marginTop: '8px', display: 'inline-block' }}>SLA Cap: 150ms</span>
        </div>
      </div>

      {/* Percentiles Visual Bars */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
          Carrier Percentile Tail Latency Comparison
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {carriers.map((c) => (
            <div key={c.name}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontWeight: 700, color: '#fff', fontSize: '0.9rem' }}>{c.name}</span>
                <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem' }}>
                  <span>P50: <strong style={{ color: '#10b981' }}>{c.p50}ms</strong></span>
                  <span>P90: <strong style={{ color: '#06b6d4' }}>{c.p90}ms</strong></span>
                  <span>P99: <strong style={{ color: c.p99 > 150 ? '#ef4444' : '#f59e0b' }}>{c.p99}ms</strong></span>
                </div>
              </div>

              {/* Stacked Percentile Range */}
              <div style={{ width: '100%', height: '14px', background: 'rgba(255,255,255,0.06)', borderRadius: '7px', overflow: 'hidden', display: 'flex' }}>
                <div style={{ width: `${(c.p50 / 250) * 100}%`, height: '100%', background: '#10b981' }} title={`P50: ${c.p50}ms`} />
                <div style={{ width: `${((c.p90 - c.p50) / 250) * 100}%`, height: '100%', background: '#06b6d4' }} title={`P90: ${c.p90}ms`} />
                <div style={{ width: `${((c.p99 - c.p90) / 250) * 100}%`, height: '100%', background: c.p99 > 150 ? '#ef4444' : '#f59e0b' }} title={`P99: ${c.p99}ms`} />
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '20px', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '12px', height: '12px', background: '#10b981', borderRadius: '2px' }} /> P50 Median Latency</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '12px', height: '12px', background: '#06b6d4', borderRadius: '2px' }} /> P90 Standard Variance</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '12px', height: '12px', background: '#f59e0b', borderRadius: '2px' }} /> P99 Tail Latency</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width: '12px', height: '12px', background: '#ef4444', borderRadius: '2px' }} /> SLA Threshold Violation (&gt;150ms)</div>
        </div>
      </div>
    </div>
  );
}
