import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Activity, 
  PhoneCall, 
  Globe2, 
  Sparkles, 
  AlertTriangle, 
  ShieldCheck, 
  TrendingUp, 
  Zap, 
  Clock, 
  RefreshCw,
  Plus
} from 'lucide-react';

export default function SaaSUsageMetering({ currentOrg }) {
  const [usage, setUsage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [simulating, setSimulating] = useState(false);

  useEffect(() => {
    fetchUsage();
  }, [currentOrg?.id]);

  const fetchUsage = async () => {
    try {
      const res = await fetch('/api/saas/usage');
      const data = await res.json();
      if (data.success) setUsage(data.usage);
    } catch (e) {
      console.error('Failed to fetch usage:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleSimulateUsage = async (minutes) => {
    setSimulating(true);
    try {
      const res = await fetch('/api/saas/usage/record', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ minutes })
      });
      const data = await res.json();
      if (data.success) setUsage(data.usage);
    } catch (e) {
      console.error('Failed to simulate usage:', e);
    } finally {
      setSimulating(false);
    }
  };

  const minutesPercent = usage?.minutes?.percent || 42;
  const isNearLimit = minutesPercent >= 80;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <BarChart3 color="#22d3ee" size={30} /> Real-Time Metered Usage & Quota Telemetry
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
            Live tracking of PSTN telephony minutes, active global DIDs, concurrent load channels, and Gemini AI tokens.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => handleSimulateUsage(250)}
            disabled={simulating}
            className="btn btn-secondary"
            style={{ padding: '8px 14px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            {simulating ? <RefreshCw size={14} className="spin" /> : <Plus size={14} />} Simulate +250 Mins
          </button>
          <span className={`badge ${isNearLimit ? 'badge-amber' : 'badge-emerald'}`} style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
            {isNearLimit ? 'Approaching Quota' : 'Quota Healthy'}
          </span>
        </div>
      </div>

      {/* 4 Metric Dial Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '20px'
      }}>
        {/* Metric 1: Automated Test Minutes */}
        <div className="glass-card" style={{ padding: '24px', borderRadius: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
              PSTN Test Minutes
            </span>
            <PhoneCall size={18} color="#6366f1" />
          </div>

          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>
            {usage?.minutes?.used?.toLocaleString() || '42,380'}
          </div>

          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
            Limit: <strong>{usage?.minutes?.limit ? (usage.minutes.limit >= 99999 ? '100,000' : usage.minutes.limit.toLocaleString()) : '100,000'}</strong> mins / mo ({minutesPercent}%)
          </div>

          <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{
              width: `${minutesPercent}%`,
              height: '100%',
              background: isNearLimit ? '#ef4444' : 'linear-gradient(90deg, #6366f1, #06b6d4)',
              transition: 'width 0.4s ease'
            }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '0.74rem', color: '#64748b' }}>
            <span>{usage?.minutes?.remaining?.toLocaleString() || '57,620'} remaining</span>
            <span>Overage: $0.035/min</span>
          </div>
        </div>

        {/* Metric 2: Active Global DIDs */}
        <div className="glass-card" style={{ padding: '24px', borderRadius: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
              Active Global DIDs
            </span>
            <Globe2 size={18} color="#06b6d4" />
          </div>

          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#38bdf8', marginBottom: '6px' }}>
            {usage?.dids?.used || 64}
          </div>

          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
            Capacity: <strong>{usage?.dids?.limit >= 9999 ? 'Unlimited (Enterprise)' : `${usage?.dids?.limit} DIDs`}</strong>
          </div>

          <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{
              width: `${usage?.dids?.percent || 15}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #06b6d4, #10b981)',
              transition: 'width 0.4s ease'
            }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '0.74rem', color: '#64748b' }}>
            <span>Across 14 Countries</span>
            <span>Tier 1 PSTN SLA</span>
          </div>
        </div>

        {/* Metric 3: Concurrent Stress Channels */}
        <div className="glass-card" style={{ padding: '24px', borderRadius: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
              Concurrent Channels
            </span>
            <Zap size={18} color="#a855f7" />
          </div>

          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#c084fc', marginBottom: '6px' }}>
            {usage?.concurrentChannels?.peak || 28} / {usage?.concurrentChannels?.limit || 50}
          </div>

          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
            Peak concurrent stress capacity: <strong>{usage?.concurrentChannels?.limit || 50} calls/sec</strong>
          </div>

          <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{
              width: `${usage?.concurrentChannels?.percent || 56}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #a855f7, #ec4899)',
              transition: 'width 0.4s ease'
            }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '0.74rem', color: '#64748b' }}>
            <span>SBC SIP Trunking</span>
            <span>Zero Call Dropping</span>
          </div>
        </div>

        {/* Metric 4: Gemini 3.8 AI RCA Tokens */}
        <div className="glass-card" style={{ padding: '24px', borderRadius: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
              Gemini AI RCA Tokens
            </span>
            <Sparkles size={18} color="#f59e0b" />
          </div>

          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fbbf24', marginBottom: '6px' }}>
            {usage?.geminiTokens?.used ? Math.round(usage.geminiTokens.used / 1000) : 312}k
          </div>

          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
            Monthly allowance: <strong>500,000 tokens</strong> ({usage?.geminiTokens?.percent || 62}%)
          </div>

          <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{
              width: `${usage?.geminiTokens?.percent || 62}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #f59e0b, #ef4444)',
              transition: 'width 0.4s ease'
            }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '0.74rem', color: '#64748b' }}>
            <span>Multimodal Acoustic Audit</span>
            <span>Flash 3.8 Engine</span>
          </div>
        </div>
      </div>

      {/* Daily Usage Chart Simulation */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Activity size={18} color="#6366f1" /> Daily Automated PSTN Minute Consumption (Past 14 Days)
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(14, 1fr)',
          gap: '8px',
          alignItems: 'flex-end',
          height: '180px',
          padding: '10px 0',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
          {[
            { day: 'Sep 13', mins: 2800 },
            { day: 'Sep 14', mins: 1900 },
            { day: 'Sep 15', mins: 3400 },
            { day: 'Sep 16', mins: 4100 },
            { day: 'Sep 17', mins: 3800 },
            { day: 'Sep 18', mins: 4600 },
            { day: 'Sep 19', mins: 4200 },
            { day: 'Sep 20', mins: 1800 },
            { day: 'Sep 21', mins: 2100 },
            { day: 'Sep 22', mins: 3900 },
            { day: 'Sep 23', mins: 4500 },
            { day: 'Sep 24', mins: 4900 },
            { day: 'Sep 25', mins: 5100 },
            { day: 'Sep 26', mins: 3200 }
          ].map((bar, idx) => {
            const heightPercent = Math.round((bar.mins / 5500) * 100);
            return (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ fontSize: '0.65rem', color: '#94a3b8', marginBottom: '4px' }}>
                  {bar.mins}
                </div>
                <div
                  style={{
                    width: '100%',
                    height: `${heightPercent}%`,
                    background: idx === 13 ? '#38bdf8' : 'rgba(99, 102, 241, 0.45)',
                    borderRadius: '4px 4px 0 0',
                    transition: 'height 0.3s ease'
                  }}
                  title={`${bar.day}: ${bar.mins} test minutes`}
                />
                <div style={{ fontSize: '0.62rem', color: '#64748b', marginTop: '6px', textAlign: 'center' }}>
                  {bar.day.split(' ')[1]}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Overage & Quota Policy Notification Settings */}
      <div className="glass-card" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={18} color="#10b981" /> Automated Overage Protection & Notifications
          </h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '4px' }}>
            Your organization will receive Slack and Email alerts when minute consumption reaches 80% and 95% of plan quota.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-secondary" style={{ padding: '8px 14px', fontSize: '0.8rem' }}>
            Configure Notification Webhook
          </button>
          <button className="btn btn-primary" style={{ padding: '8px 14px', fontSize: '0.8rem' }}>
            Set Spend Cap ($2,500/mo)
          </button>
        </div>
      </div>
    </div>
  );
}
