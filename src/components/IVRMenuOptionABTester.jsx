import React, { useState } from 'react';
import { Split, TrendingUp, CheckCircle2, Sliders, Trophy, Sparkles } from 'lucide-react';

export default function IVRMenuOptionABTester() {
  const [trafficSplit, setTrafficSplit] = useState(50);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Split color="#06b6d4" size={28} /> IVR Voice Prompt A/B Containment & Conversion Experiment Studio
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Split-test voice prompt variants. Compares concise DTMF menus vs generative conversational prompts with statistical significance.
          </p>
        </div>
        <span className="badge badge-emerald" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Trophy size={14} /> Winner: Variant B (+14.2% Containment, p &lt; 0.01)
        </span>
      </div>

      {/* Traffic Split Slider */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>Live Inbound Traffic Split Allocation</h3>
          <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#06b6d4' }}>{trafficSplit}% Variant A / {100 - trafficSplit}% Variant B</span>
        </div>
        <input 
          type="range" 
          min="10" 
          max="90" 
          value={trafficSplit} 
          onChange={(e) => setTrafficSplit(parseInt(e.target.value, 10))} 
          style={{ width: '100%', accentColor: '#06b6d4' }} 
        />
      </div>

      {/* A vs B Side-by-side Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Variant A */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#06b6d4' }}>VARIANT A (TRADITIONAL DTMF)</span>
            <span className="badge badge-cyan">{trafficSplit}% Traffic</span>
          </div>

          <div style={{ padding: '16px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.88rem', color: '#cbd5e1', fontStyle: 'italic' }}>
            "Welcome to Apex Bank. For Checking and Savings, press 1. For Loan inquiries, press 2. For all other issues, press 0."
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            <div style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Containment Rate</span>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f59e0b', marginTop: '2px' }}>58.2%</div>
            </div>
            <div style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Average Time-in-Menu</span>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', marginTop: '2px' }}>18.4s</div>
            </div>
          </div>
        </div>

        {/* Variant B */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', borderColor: '#10b981', background: 'rgba(16, 185, 129, 0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#10b981' }}>VARIANT B (CONVERSATIONAL AI)</span>
            <span className="badge badge-emerald">{100 - trafficSplit}% Traffic • WINNER</span>
          </div>

          <div style={{ padding: '16px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', border: '1px solid #10b981', fontSize: '0.88rem', color: '#cbd5e1', fontStyle: 'italic' }}>
            "Hi there! Welcome to Apex Bank. In a few words, tell me what you'd like to do today, like check a balance or pay a bill."
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            <div style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Containment Rate</span>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#10b981', marginTop: '2px' }}>72.4%</div>
            </div>
            <div style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Average Time-in-Menu</span>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#10b981', marginTop: '2px' }}>8.2s (-55%)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
