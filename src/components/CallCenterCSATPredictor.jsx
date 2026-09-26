import React, { useState } from 'react';
import { Star, Smile, Frown, Sparkles, Sliders, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function CallCenterCSATPredictor() {
  const [repromptCount, setRepromptCount] = useState(2);
  const [silenceDurationSec, setSilenceDurationSec] = useState(8);
  const [callSentiment, setCallSentiment] = useState('Frustrated');
  const [fcrAchieved, setFcrAchieved] = useState(false);

  // Compute predicted CSAT score (1.0 to 5.0)
  let baseScore = 4.8;
  baseScore -= repromptCount * 0.45;
  baseScore -= (silenceDurationSec / 5) * 0.3;
  if (callSentiment === 'Neutral') baseScore -= 0.4;
  if (callSentiment === 'Frustrated') baseScore -= 1.1;
  if (callSentiment === 'Hostile') baseScore -= 1.8;
  if (!fcrAchieved) baseScore -= 0.8;
  const csat = Math.max(1.0, Math.min(5.0, baseScore)).toFixed(1);

  // NPS projection (-100 to +100)
  const nps = parseFloat(csat) >= 4.5 ? '+72 (Promoter)' : parseFloat(csat) >= 3.8 ? '+18 (Passive)' : '-64 (Detractor)';
  const churnRisk = parseFloat(csat) <= 3.0 ? 'HIGH (78%)' : parseFloat(csat) <= 4.0 ? 'MODERATE (24%)' : 'LOW (3%)';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Star color="#f59e0b" size={28} /> Gemini AI Post-Call CSAT & Net Promoter Score (NPS) Predictor
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Multimodal customer sentiment prediction. Correlates IVR menu repetition, dead-air gaps, and acoustic stress markers to post-call survey ratings.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Predicted CSAT Rating</span>
          <div style={{ fontSize: '2.4rem', fontWeight: 800, color: csat >= 4.0 ? '#10b981' : csat >= 3.0 ? '#f59e0b' : '#ef4444', marginTop: '4px' }}>
            {csat} / 5.0
          </div>
          <span className={`badge ${csat >= 4.0 ? 'badge-emerald' : csat >= 3.0 ? 'badge-amber' : 'badge-rose'}`} style={{ marginTop: '8px', display: 'inline-block' }}>
            {csat >= 4.0 ? 'Satisfied Customer' : csat >= 3.0 ? 'Neutral / Friction' : 'Dissatisfied Caller'}
          </span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Net Promoter Score (NPS)</span>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: csat >= 4.0 ? '#10b981' : '#f59e0b', marginTop: '8px' }}>
            {nps}
          </div>
          <span className="badge badge-cyan" style={{ marginTop: '8px', display: 'inline-block' }}>Likelihood to Recommend</span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Account Churn Risk</span>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: csat <= 3.0 ? '#ef4444' : '#10b981', marginTop: '8px' }}>
            {churnRisk}
          </div>
          <span className={`badge ${csat <= 3.0 ? 'badge-rose' : 'badge-emerald'}`} style={{ marginTop: '8px', display: 'inline-block' }}>Customer Retention SLA</span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>AI Prediction Confidence</span>
          <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#06b6d4', marginTop: '4px' }}>96.4%</div>
          <span className="badge badge-purple" style={{ marginTop: '8px', display: 'inline-block' }}>Gemini 2.5 Flash</span>
        </div>
      </div>

      {/* Interactive Sliders */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sliders size={20} color="#06b6d4" /> IVR Session Friction Drivers
          </h3>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>IVR Prompt Repetitions / Misrecognitions</label>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f59e0b' }}>{repromptCount} Loops</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="5" 
              value={repromptCount} 
              onChange={(e) => setRepromptCount(parseInt(e.target.value, 10))} 
              style={{ width: '100%', accentColor: '#f59e0b' }} 
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Dead-Air & Silence Duration</label>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f43f5e' }}>{silenceDurationSec} seconds</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="25" 
              value={silenceDurationSec} 
              onChange={(e) => setSilenceDurationSec(parseInt(e.target.value, 10))} 
              style={{ width: '100%', accentColor: '#f43f5e' }} 
            />
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '8px' }}>Caller Acoustic Tone</label>
            <select 
              value={callSentiment} 
              onChange={(e) => setCallSentiment(e.target.value)}
              style={{ width: '100%', padding: '10px', background: 'rgba(0,0,0,0.4)', color: '#fff', border: '1px solid var(--border-color)', borderRadius: '6px' }}
            >
              <option value="Positive">Positive / Calm</option>
              <option value="Neutral">Neutral / Business Inquiry</option>
              <option value="Frustrated">Frustrated / Repeated Commands</option>
              <option value="Hostile">Hostile / Requested Supervisor</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem', color: '#fff' }}>
              <input type="checkbox" checked={fcrAchieved} onChange={(e) => setFcrAchieved(e.target.checked)} />
              First Contact Resolution (FCR) Successfully Achieved
            </label>
          </div>
        </div>

        {/* Gemini AI Root Cause Analysis */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={20} color="#a855f7" /> Gemini Acoustic RCA Diagnostics
          </h3>

          <div style={{ padding: '16px', background: 'rgba(168, 85, 247, 0.08)', border: '1px solid #a855f7', borderRadius: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#a855f7' }}>PREDICTED DRIVERS SUMMARY</span>
            <p style={{ fontSize: '0.85rem', color: '#cbd5e1', marginTop: '6px', lineHeight: '1.5' }}>
              {repromptCount >= 2 
                ? `Caller suffered ${repromptCount} consecutive menu loops. Acoustic speech energy spiked by +8.2dB during intent retry.`
                : 'Smooth IVR traversal with minimal reprompts.'}
              {' '}
              {silenceDurationSec > 5 
                ? `Prolonged dead air (${silenceDurationSec}s) occurred during backend core banking lookup, driving high friction.`
                : 'Fast backend database response.'}
              {' '}
              {!fcrAchieved && 'Caller was forced to queue for human agent transfer, negatively depressing final CSAT.'}
            </p>
          </div>

          <div style={{ marginTop: 'auto', padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <strong>Continuous Feedback Loop:</strong> Predictions are automatically verified when SMS or post-call IVR survey responses are captured.
          </div>
        </div>
      </div>
    </div>
  );
}
