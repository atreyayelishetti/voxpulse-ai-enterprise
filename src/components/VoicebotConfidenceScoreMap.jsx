import React, { useState } from 'react';
import { Target, Sliders, CheckCircle2, AlertTriangle, ShieldAlert, Sparkles } from 'lucide-react';

export default function VoicebotConfidenceScoreMap() {
  const [threshold, setThreshold] = useState(0.75);

  const testUtterances = [
    { text: "What's my checking account balance?", intent: 'inquire_balance', score: 0.98, status: 'HIGH_CONFIDENCE' },
    { text: "I need to pay my monthly credit card bill", intent: 'pay_bill', score: 0.94, status: 'HIGH_CONFIDENCE' },
    { text: "Someone charged fifty dollars I didn't authorize", intent: 'report_fraud', score: 0.92, status: 'HIGH_CONFIDENCE' },
    { text: "Can I speak to a human representative please", intent: 'escalate_agent', score: 0.99, status: 'HIGH_CONFIDENCE' },
    { text: "How much can I borrow for a home mortgage?", intent: 'loan_inquiry', score: 0.84, status: 'MODERATE_CONFIDENCE' },
    { text: "I lost my passport at the airport yesterday", intent: 'unrecognized_out_of_domain', score: 0.32, status: 'LOW_CONFIDENCE' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Target color="#06b6d4" size={28} /> Voicebot NLU Intent Confidence Heatmap & Ambiguity Matrix
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Acoustic intent classification scoring. Audits natural language utterances against Dialogflow CX and Gemini 2.5 NLU models.
          </p>
        </div>
      </div>

      {/* Threshold Slider Card */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>
              Minimum Intent Confidence Execution Threshold
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Utterances scoring below this threshold divert to clarification reprompt or live agent transfer.
            </p>
          </div>
          <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#06b6d4' }}>{(threshold * 100).toFixed(0)}%</span>
        </div>
        <input 
          type="range" 
          min="0.50" 
          max="0.95" 
          step="0.05"
          value={threshold} 
          onChange={(e) => setThreshold(parseFloat(e.target.value))} 
          style={{ width: '100%', accentColor: '#06b6d4' }} 
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
          <span>50% (Permissive / False Positive Risk)</span>
          <span>75% (Industry Standard)</span>
          <span>95% (Strict / False Rejection Risk)</span>
        </div>
      </div>

      {/* Utterance Heatmap Table */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
          Real-time Utterance Intent Match Scores
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', textAlign: 'left' }}>
                <th style={{ padding: '10px' }}>Spoken Utterance Sample</th>
                <th style={{ padding: '10px' }}>Classified Intent</th>
                <th style={{ padding: '10px' }}>Confidence Score</th>
                <th style={{ padding: '10px' }}>Gating Verdict</th>
              </tr>
            </thead>
            <tbody>
              {testUtterances.map((u, i) => {
                const passed = u.score >= threshold;
                return (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '12px 10px', color: '#fff', fontWeight: 600 }}>"{u.text}"</td>
                    <td style={{ padding: '12px 10px', color: '#38bdf8', fontFamily: 'monospace' }}>{u.intent}</td>
                    <td style={{ padding: '12px 10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '80px', height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ width: `${u.score * 100}%`, height: '100%', background: passed ? '#10b981' : '#ef4444' }} />
                        </div>
                        <span style={{ fontWeight: 700, color: passed ? '#10b981' : '#ef4444' }}>
                          {(u.score * 100).toFixed(0)}%
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: '12px 10px' }}>
                      <span className={`badge ${passed ? 'badge-emerald' : 'badge-rose'}`}>
                        {passed ? 'ACTION_EXECUTED' : 'FALLBACK_DIVERT'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
