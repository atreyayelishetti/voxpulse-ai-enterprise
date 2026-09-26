import React, { useState } from 'react';
import { GitFork, ArrowDownRight, CheckCircle2, AlertTriangle, ShieldAlert, TrendingUp } from 'lucide-react';

export default function IVRBranchingAnalyticsGraph() {
  const [selectedBranch, setSelectedBranch] = useState('balance');

  const branches = [
    { id: 'balance', name: 'Option 1: Account Balance & Recent Transactions', callers: 4500, share: '45.0%', containment: '92.4% Containment', status: 'OPTIMAL', dropoff: '7.6%' },
    { id: 'fraud', name: 'Option 2: Fraud & Card Dispute Emergency', callers: 2500, share: '25.0%', containment: '14.2% Containment', status: 'AGENT_TRANSFER', dropoff: '85.8% (To Live Desk)' },
    { id: 'loans', name: 'Option 3: Auto & Home Loan Status', callers: 1800, share: '18.0%', containment: '68.0% Containment', status: 'GOOD', dropoff: '32.0%' },
    { id: 'agent', name: 'Option 0 / Reprompt: Agent Escalation & Hangup', callers: 1200, share: '12.0%', containment: '0.0% Containment', status: 'IVR_HELL_RISK', dropoff: '100% Friction' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <GitFork color="#06b6d4" size={28} /> IVR Tree Branching Analytics & Self-Service Containment Graph
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Flow visualization of caller navigation pathways. Identifies high-friction drop-off nodes, circular reprompt loops, and agent escalation rates.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Inbound Callers</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginTop: '4px' }}>10,000 Calls</div>
          <span className="badge badge-cyan" style={{ marginTop: '8px', display: 'inline-block' }}>Root Menu Greeter</span>
        </div>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Self-Service Containment Rate</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>62.8%</div>
          <span className="badge badge-emerald" style={{ marginTop: '8px', display: 'inline-block' }}>Resolved in IVR</span>
        </div>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Live Agent Escalation Rate</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f59e0b', marginTop: '4px' }}>37.2%</div>
          <span className="badge badge-amber" style={{ marginTop: '8px', display: 'inline-block' }}>CTI Screen-Pop Bridge</span>
        </div>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Circular Loop "IVR Hell"</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f43f5e', marginTop: '4px' }}>2.1%</div>
          <span className="badge badge-rose" style={{ marginTop: '8px', display: 'inline-block' }}>3+ Reprompts</span>
        </div>
      </div>

      {/* Branching Tree Diagram */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '20px' }}>
          Root Inbound Menu Branch Distribution
        </h3>

        {/* Root Node */}
        <div style={{ padding: '16px', background: 'rgba(6, 182, 212, 0.1)', border: '1px solid #06b6d4', borderRadius: '8px', textAlign: 'center', maxWidth: '360px', margin: '0 auto 24px' }}>
          <span style={{ fontSize: '0.75rem', color: '#06b6d4', fontWeight: 700 }}>LEVEL 0 (ROOT GREETER)</span>
          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', marginTop: '4px' }}>Enterprise IVR Main Menu</div>
          <span style={{ fontSize: '0.85rem', color: '#38bdf8', fontWeight: 600 }}>10,000 Callers (100%)</span>
        </div>

        {/* Branches */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          {branches.map((b) => (
            <div 
              key={b.id} 
              className="glass-card"
              onClick={() => setSelectedBranch(b.id)}
              style={{ 
                padding: '18px', 
                cursor: 'pointer',
                borderColor: selectedBranch === b.id ? '#06b6d4' : 'var(--border-color)',
                background: selectedBranch === b.id ? 'rgba(6, 182, 212, 0.08)' : 'rgba(0,0,0,0.2)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className={`badge ${b.status === 'OPTIMAL' ? 'badge-emerald' : b.status === 'GOOD' ? 'badge-cyan' : b.status === 'AGENT_TRANSFER' ? 'badge-amber' : 'badge-rose'}`}>
                  {b.status}
                </span>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#06b6d4' }}>{b.share}</span>
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginTop: '10px' }}>{b.name}</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginTop: '6px' }}>{b.callers.toLocaleString()} Calls</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                <span style={{ color: '#10b981', fontWeight: 600 }}>{b.containment}</span>
                <span style={{ color: '#f59e0b' }}>{b.dropoff}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
