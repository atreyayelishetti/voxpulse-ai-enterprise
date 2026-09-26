import React, { useState } from 'react';
import { RefreshCcw, ArrowRight, ShieldCheck, CheckCircle2, Sliders, Users, PhoneForwarded } from 'lucide-react';

export default function VoicebotIntentFallbacks() {
  const [maxRetries, setMaxRetries] = useState(2);
  const [simulatedAttempt, setSimulatedAttempt] = useState(1);

  const fallbackTiers = [
    { tier: 1, name: 'Tier 1: Intelligent Acoustic Reprompt', action: 'REPROMPT_NLU', prompt: '"I\'m sorry, I didn\'t catch that. Could you say Account Balance, Billing, or Speak to an Agent?"', status: 'ACTIVE' },
    { tier: 2, name: 'Tier 2: Keypad DTMF Fallback', action: 'SWITCH_TO_DTMF', prompt: '"Let\'s use your phone keypad instead. Press 1 for Account Balance, or Press 2 for Billing."', status: 'ACTIVE' },
    { tier: 3, name: 'Tier 3: Graceful Human Escalation', action: 'SIP_REFER_AGENT', prompt: '"Transferring you to an enterprise banking specialist. One moment while I bridge your call."', status: 'ACTIVE' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <RefreshCcw color="#06b6d4" size={28} /> Voicebot Multi-Tier Intent Fallback & Escalation Chain
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Graceful error recovery architecture. Prevents caller loop deadlocks by escalating from NLU re-prompting to DTMF diversion to agent transfer.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>NLU Reprompt Recovery Rate</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>68.4%</div>
          <span className="badge badge-emerald" style={{ marginTop: '8px', display: 'inline-block' }}>Resolved on 1st Retry</span>
        </div>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>DTMF Fallback Success</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#06b6d4', marginTop: '4px' }}>22.1%</div>
          <span className="badge badge-cyan" style={{ marginTop: '8px', display: 'inline-block' }}>Resolved via Keypad</span>
        </div>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Clean Agent Escalation</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#a855f7', marginTop: '4px' }}>9.5%</div>
          <span className="badge badge-purple" style={{ marginTop: '8px', display: 'inline-block' }}>Context UUI Passed</span>
        </div>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Uncontrolled Hangup / Drop</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>0.0%</div>
          <span className="badge badge-emerald" style={{ marginTop: '8px', display: 'inline-block' }}>Zero Dead Ends</span>
        </div>
      </div>

      {/* Fallback Tiers Chain */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '20px' }}>
          Escalation Strategy Ladder
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {fallbackTiers.map((tier) => (
            <div 
              key={tier.tier}
              style={{ 
                padding: '20px', 
                borderRadius: '8px', 
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '16px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(6, 182, 212, 0.1)', color: '#06b6d4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                  {tier.tier}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: '1rem' }}>{tier.name}</div>
                  <p style={{ fontSize: '0.85rem', color: '#cbd5e1', fontStyle: 'italic', margin: '4px 0 0' }}>{tier.prompt}</p>
                </div>
              </div>
              <span className="badge badge-cyan">{tier.action}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
