import React, { useState } from 'react';
import { 
  Bot, 
  BrainCircuit, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Zap,
  Mic,
  Activity
} from 'lucide-react';

const VOICEBOT_BENCHMARKS = [
  { botName: 'Banking Assistant (Dialogflow CX)', intentAccuracy: '98.5%', slotAccuracy: '97.2%', bargeInSuccess: '100%', fallbackRate: '1.2%', status: 'PASSED' },
  { botName: 'Healthcare Patient Scheduler', intentAccuracy: '96.8%', slotAccuracy: '95.4%', bargeInSuccess: '95%', fallbackRate: '2.8%', status: 'PASSED' },
  { botName: 'E-Commerce Order Bot (Gemini Live)', intentAccuracy: '99.1%', slotAccuracy: '98.8%', bargeInSuccess: '100%', fallbackRate: '0.6%', status: 'PASSED' }
];

export default function VoicebotStudio() {
  const [benchmarks, setBenchmarks] = useState(VOICEBOT_BENCHMARKS);
  const [isTesting, setIsTesting] = useState(false);

  const handleRunBenchmark = () => {
    setIsTesting(true);
    setTimeout(() => setIsTesting(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="glass-panel glass-panel-glow" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Bot size={24} color="#6366f1" />
              Conversational AI & Voicebot Benchmark Studio
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Evaluate Dialogflow CX, Gemini Live, and Lex voicebot intent accuracy, entity extraction, and barge-in handling.
            </p>
          </div>

          <button onClick={handleRunBenchmark} className="btn btn-primary" disabled={isTesting}>
            {isTesting ? 'Running Benchmark...' : 'Run Voicebot Suite'}
          </button>
        </div>
      </div>

      {/* Benchmarks Table */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '12px 14px' }}>VOICEBOT BOT NAME</th>
                <th style={{ padding: '12px 14px' }}>INTENT ACCURACY</th>
                <th style={{ padding: '12px 14px' }}>SLOT-FILLING ACCURACY</th>
                <th style={{ padding: '12px 14px' }}>BARGE-IN HANDLING</th>
                <th style={{ padding: '12px 14px' }}>FALLBACK RATE</th>
                <th style={{ padding: '12px 14px' }}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {benchmarks.map((b, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#fff' }}>
                  <td style={{ padding: '14px', fontWeight: 700 }}>{b.botName}</td>
                  <td style={{ padding: '14px', fontWeight: 700, color: '#34d399' }}>{b.intentAccuracy}</td>
                  <td style={{ padding: '14px', color: '#38bdf8' }}>{b.slotAccuracy}</td>
                  <td style={{ padding: '14px', color: '#a78bfa' }}>{b.bargeInSuccess}</td>
                  <td style={{ padding: '14px', color: 'var(--text-muted)' }}>{b.fallbackRate}</td>
                  <td style={{ padding: '14px' }}>
                    <span className="badge badge-emerald">{b.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
