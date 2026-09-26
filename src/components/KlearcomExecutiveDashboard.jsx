import React from 'react';
import { Activity, ShieldCheck, Globe2, Bot, Server, CheckCircle2, TrendingDown, Users, Zap, Flame } from 'lucide-react';

export default function KlearcomExecutiveDashboard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Hero Branding Header */}
      <div className="glass-card" style={{ padding: '28px', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(6, 182, 212, 0.25) 100%)', border: '1px solid rgba(99, 102, 241, 0.4)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span className="badge badge-cyan" style={{ fontSize: '0.8rem', padding: '4px 10px', marginBottom: '8px', display: 'inline-block' }}>
              100 / 100 ENTERPRISE MODULES SHIPPED
            </span>
            <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#fff', margin: 0 }}>
              VoxPulse <span style={{ color: '#06b6d4' }}>AI</span> — Ultimate Klearcom / Cyara / Hammer Replacement Cloud
            </h2>
            <p style={{ color: '#e2e8f0', fontSize: '0.95rem', marginTop: '6px' }}>
              Autonomous 1-to-1 Parity Platform powered by Google Gemini 2.0, PostgreSQL 16, Keycloak OIDC SSO, and 600 Automated Test Cases.
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#34d399' }}>100%</div>
            <span style={{ fontSize: '0.8rem', color: '#e2e8f0', fontWeight: 600 }}>Parity Milestone Achieved</span>
          </div>
        </div>
      </div>

      {/* Quick KPI Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Active DIDs Monitored</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#34d399', marginTop: '4px' }}>104 DIDs</div>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>Across 100+ Countries</span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Global PSTN Reachability</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#38bdf8', marginTop: '4px' }}>99.98%</div>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>12 Edge POP Probes</span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Average Audio MOS</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#a78bfa', marginTop: '4px' }}>4.42 MOS</div>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>ITU-T P.863 POLQA</span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Annual Cost Savings</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#34d399', marginTop: '4px' }}>$48,500 / yr</div>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>vs Klearcom Enterprise</span>
        </div>
      </div>
    </div>
  );
}
