import React from 'react';
import { Bot, BarChart2 } from 'lucide-react';

export default function VoicebotConfidenceScoreMap() {
  const intents = [
    { intent: 'QUERY_BALANCE', confidence: '98.4%', status: 'HIGH CONFIDENCE' },
    { intent: 'CLAIM_REFUND', confidence: '94.1%', status: 'HIGH CONFIDENCE' },
    { intent: 'CHANGE_ADDRESS', confidence: '78.2%', status: 'MEDIUM CONFIDENCE' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Bot color="#06b6d4" size={28} /> Gemini NLU Intent Confidence Score Heatmap
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Heatmap visualization of Gemini Natural Language Understanding (NLU) confidence scores per intent.
          </p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.72rem' }}>
              <th style={{ padding: '10px' }}>Recognized NLU Intent</th>
              <th style={{ padding: '10px' }}>Mean Confidence Score</th>
              <th style={{ padding: '10px' }}>Confidence Rating</th>
            </tr>
          </thead>
          <tbody>
            {intents.map((item, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px 10px', color: '#fff', fontWeight: 700 }}>{item.intent}</td>
                <td style={{ padding: '12px 10px', color: '#34d399', fontWeight: 800 }}>{item.confidence}</td>
                <td style={{ padding: '12px 10px' }}><span className="badge badge-emerald">{item.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
