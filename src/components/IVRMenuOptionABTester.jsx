import React from 'react';
import { GitFork, Sparkles } from 'lucide-react';

export default function IVRMenuOptionABTester() {
  const abVariants = [
    { variant: 'Variant A (Short Prompt)', prompt: 'Press 1 for balance, 2 for billing.', containment: '68.4%', winner: false },
    { variant: 'Variant B (Conversational AI)', prompt: 'Tell me in a few words how I can help you today.', containment: '84.2%', winner: true }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sparkles color="#06b6d4" size={28} /> Dynamic IVR Menu Prompt A/B Testing Engine
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Split caller traffic across IVR prompt variants to measure containment rate optimization.
          </p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.72rem' }}>
              <th style={{ padding: '10px' }}>A/B Variant</th>
              <th style={{ padding: '10px' }}>Spoken Prompt Phrasing</th>
              <th style={{ padding: '10px' }}>Self-Service Containment</th>
              <th style={{ padding: '10px' }}>Outcome</th>
            </tr>
          </thead>
          <tbody>
            {abVariants.map((v, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px 10px', color: '#fff', fontWeight: 700 }}>{v.variant}</td>
                <td style={{ padding: '12px 10px', color: 'var(--text-muted)', fontStyle: 'italic' }}>"{v.prompt}"</td>
                <td style={{ padding: '12px 10px', color: '#34d399', fontWeight: 800 }}>{v.containment}</td>
                <td style={{ padding: '12px 10px' }}>
                  {v.winner ? <span className="badge badge-emerald">WINNER (+15.8%)</span> : <span className="badge badge-indigo">BASELINE</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
