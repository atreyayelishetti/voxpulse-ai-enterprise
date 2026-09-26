import React from 'react';
import { BarChart3 } from 'lucide-react';

export default function CarrierP50P99LatencyGraph() {
  const percentiles = [
    { percentile: 'P50 (Median)', latencyMs: 110, status: 'EXCELLENT' },
    { percentile: 'P90', latencyMs: 145, status: 'GOOD' },
    { percentile: 'P95', latencyMs: 180, status: 'SLA COMPLIANT' },
    { percentile: 'P99 (Worst Case)', latencyMs: 240, status: 'SLA COMPLIANT' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <BarChart3 color="#a78bfa" size={28} /> PSTN P50 / P90 / P95 / P99 Percentile Latency Distribution
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Benchmark long-tail latency percentiles to catch transient PSTN call setup delays.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {percentiles.map((p, i) => (
          <div key={i} className="glass-card" style={{ padding: '20px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.percentile}</span>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#38bdf8', marginTop: '4px' }}>{p.latencyMs} ms</div>
            <span className="badge badge-emerald" style={{ marginTop: '8px', display: 'inline-block' }}>{p.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
