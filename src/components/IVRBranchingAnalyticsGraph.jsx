import React from 'react';
import { GitFork, Activity, TrendingDown, Users, CheckCircle2 } from 'lucide-react';

export default function IVRBranchingAnalyticsGraph() {
  const nodes = [
    { name: 'Root Greeting Menu (Main DID)', inboundCalls: 10000, dropRate: '0.2%', avgLatency: '120ms' },
    { name: 'Option 1: Account Balances', inboundCalls: 4500, dropRate: '1.4%', avgLatency: '180ms' },
    { name: 'Option 2: Billing & Disputes', inboundCalls: 3200, dropRate: '3.8%', avgLatency: '340ms' },
    { name: 'Option 0: Live Agent Transfer', inboundCalls: 2300, dropRate: '8.2%', avgLatency: '1200ms' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <GitFork color="#6366f1" size={28} /> IVR Tree Branch Navigation & Drop-off Graph
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Analyze caller traversal heatmaps, menu option drop-off rates, and bottleneck nodes.
          </p>
        </div>

        <span className="badge badge-emerald" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
          Realtime Heatmap Active
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {nodes.map((node, i) => (
          <div key={i} className="glass-card" style={{ padding: '16px' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>NODE #{i + 1}</span>
            <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 700, margin: '4px 0 10px 0' }}>{node.name}</h4>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#06b6d4' }}>{node.inboundCalls.toLocaleString()} Calls</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginTop: '8px', color: 'var(--text-muted)' }}>
              <span>Drop-off: <strong style={{ color: parseFloat(node.dropRate) > 5 ? '#f43f5e' : '#34d399' }}>{node.dropRate}</strong></span>
              <span>Delay: <strong style={{ color: '#a78bfa' }}>{node.avgLatency}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
