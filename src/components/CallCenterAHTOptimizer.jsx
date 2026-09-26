import React, { useState } from 'react';
import { Clock, TrendingDown, DollarSign, CheckCircle2, ShieldCheck, Zap, Sliders } from 'lucide-react';

export default function CallCenterAHTOptimizer() {
  const [optCtiScreenPop, setOptCtiScreenPop] = useState(true);
  const [optSkipReauth, setOptSkipReauth] = useState(true);
  const [optCompressPrompts, setOptCompressPrompts] = useState(true);
  const [agentsCount, setAgentsCount] = useState(150);

  // Seconds saved calculation
  const screenPopSec = optCtiScreenPop ? 14 : 0;
  const skipReauthSec = optSkipReauth ? 38 : 0;
  const compressPromptsSec = optCompressPrompts ? 12 : 0;
  const totalSecSaved = screenPopSec + skipReauthSec + compressPromptsSec;

  // Annual financial savings ($0.65 per agent minute)
  const callsPerAgentPerDay = 42;
  const workDaysPerYear = 250;
  const totalCallsYear = agentsCount * callsPerAgentPerDay * workDaysPerYear;
  const totalMinutesSavedYear = (totalCallsYear * totalSecSaved) / 60;
  const annualSavingsUsd = Math.round(totalMinutesSavedYear * 0.65);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Clock color="#06b6d4" size={28} /> Average Handle Time (AHT) Friction Reducer & Cost Optimizer
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Eliminates redundant agent verification questions, optimizes CTI CAD variables, and compresses verbose voice prompts.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Seconds Saved Per Call</span>
          <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>
            -{totalSecSaved} sec
          </div>
          <span className="badge badge-emerald" style={{ marginTop: '8px', display: 'inline-block' }}>AHT Delta per Caller</span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Projected Annual Cost Savings</span>
          <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#06b6d4', marginTop: '4px' }}>
            ${annualSavingsUsd.toLocaleString()}
          </div>
          <span className="badge badge-cyan" style={{ marginTop: '8px', display: 'inline-block' }}>{agentsCount} Agent Seats</span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Annual Agent Hours Reclaimed</span>
          <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#a855f7', marginTop: '4px' }}>
            {Math.round(totalMinutesSavedYear / 60).toLocaleString()} hrs
          </div>
          <span className="badge badge-purple" style={{ marginTop: '8px', display: 'inline-block' }}>Operational Bandwidth</span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Customer Effort Score (CES)</span>
          <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#f59e0b', marginTop: '4px' }}>+34%</div>
          <span className="badge badge-amber" style={{ marginTop: '8px', display: 'inline-block' }}>Reduced Repetition</span>
        </div>
      </div>

      {/* Optimizations Toggles */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '20px' }}>
          AHT Friction Elimination Levers
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div 
            onClick={() => setOptSkipReauth(!optSkipReauth)}
            style={{ 
              padding: '18px', 
              borderRadius: '8px', 
              background: optSkipReauth ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255,255,255,0.02)',
              border: `1px solid ${optSkipReauth ? '#10b981' : 'var(--border-color)'}`,
              cursor: 'pointer',
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center' 
            }}
          >
            <div>
              <div style={{ fontWeight: 700, color: '#fff', fontSize: '1rem' }}>
                Eliminate Redundant Human Agent Re-Verification (-38s)
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                When caller passes IVR DTMF PIN / voice biometric authentication, securely pass verified auth token to CRM. Agents do not ask for identity twice.
              </p>
            </div>
            <span className="badge badge-emerald">{optSkipReauth ? 'ACTIVE (-38s)' : 'DISABLED'}</span>
          </div>

          <div 
            onClick={() => setOptCtiScreenPop(!optCtiScreenPop)}
            style={{ 
              padding: '18px', 
              borderRadius: '8px', 
              background: optCtiScreenPop ? 'rgba(6, 182, 212, 0.08)' : 'rgba(255,255,255,0.02)',
              border: `1px solid ${optCtiScreenPop ? '#06b6d4' : 'var(--border-color)'}`,
              cursor: 'pointer',
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center' 
            }}
          >
            <div>
              <div style={{ fontWeight: 700, color: '#fff', fontSize: '1rem' }}>
                Sub-200ms CTI CAD Screen-Pop Pre-Fetch (-14s)
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Pre-load customer CRM account profile via WebSocket during the incoming SIP ringback phase so records are open the moment agent answers.
              </p>
            </div>
            <span className="badge badge-cyan">{optCtiScreenPop ? 'ACTIVE (-14s)' : 'DISABLED'}</span>
          </div>

          <div 
            onClick={() => setOptCompressPrompts(!optCompressPrompts)}
            style={{ 
              padding: '18px', 
              borderRadius: '8px', 
              background: optCompressPrompts ? 'rgba(168, 85, 247, 0.08)' : 'rgba(255,255,255,0.02)',
              border: `1px solid ${optCompressPrompts ? '#a855f7' : 'var(--border-color)'}`,
              cursor: 'pointer',
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center' 
            }}
          >
            <div>
              <div style={{ fontWeight: 700, color: '#fff', fontSize: '1rem' }}>
                Compress Verbose IVR Greeting Prompts (-12s)
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Streamline introductory greetings from 24s to 12s, allowing immediate barge-in and direct intent utterance.
              </p>
            </div>
            <span className="badge badge-purple">{optCompressPrompts ? 'ACTIVE (-12s)' : 'DISABLED'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
