import React from 'react';
import { Users, Sparkles } from 'lucide-react';

export default function CallCenterCSATPredictor() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sparkles color="#06b6d4" size={28} /> Gemini AI Post-Call Customer CSAT Score Predictor
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Predict customer CSAT survey ratings based on speech tone, queue hold times, and resolution status.
          </p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '24px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Predicted CSAT Rating</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#34d399', marginTop: '4px' }}>4.8 / 5.0</div>
        </div>
        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Customer Sentiment</span>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#38bdf8', marginTop: '4px' }}>HIGHLY SATISFIED</div>
        </div>
        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>First Contact Resolution</span>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#a78bfa', marginTop: '4px' }}>RESOLVED (100%)</div>
        </div>
      </div>
    </div>
  );
}
