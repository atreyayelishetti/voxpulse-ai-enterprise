import React from 'react';
import { Bot, RefreshCw } from 'lucide-react';

export default function VoicebotIntentFallbacks() {
  const fallbacks = [
    { triggerCount: 1, strategy: 'Polite Clarification Re-prompt', prompt: 'I didn\'t quite catch that. Did you mean account balance or billing?' },
    { triggerCount: 2, strategy: 'DTMF Keypad Fallback Overlay', prompt: 'Please press 1 for balance, or press 2 for billing options.' },
    { triggerCount: 3, strategy: 'Seamless Human Agent Transfer', prompt: 'Transferring your call to a customer representative now.' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Bot color="#06b6d4" size={28} /> AI Voicebot Unrecognized Intent Fallback Strategy Sandbox
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Configure multi-tier fallback recovery steps when caller intent confidence falls below 60%.
          </p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.72rem' }}>
              <th style={{ padding: '10px' }}>Fallback Trigger Tier</th>
              <th style={{ padding: '10px' }}>Recovery Strategy</th>
              <th style={{ padding: '10px' }}>Fallback Spoken Prompt</th>
            </tr>
          </thead>
          <tbody>
            {fallbacks.map((f, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px 10px', color: '#a78bfa', fontWeight: 700 }}>Attempt #{f.triggerCount}</td>
                <td style={{ padding: '12px 10px', color: '#fff', fontWeight: 700 }}>{f.strategy}</td>
                <td style={{ padding: '12px 10px', color: 'var(--text-muted)', fontStyle: 'italic' }}>"{f.prompt}"</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
