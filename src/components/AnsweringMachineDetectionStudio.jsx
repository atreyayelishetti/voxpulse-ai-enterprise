import React, { useState } from 'react';
import { Bot, Play, RefreshCw } from 'lucide-react';

export default function AnsweringMachineDetectionStudio() {
  const [isTesting, setIsTesting] = useState(false);
  const [result, setResult] = useState(null);

  const handleTestAMD = () => {
    setIsTesting(true);
    setTimeout(() => {
      setResult({
        decision: 'HUMAN_ANSWERED',
        confidence: '98.8%',
        greetingDurationMs: 450,
        beepDetected: false,
        latencyMs: 380
      });
      setIsTesting(false);
    }, 1000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Bot color="#f43f5e" size={28} /> Answering Machine Detection (AMD) Benchmark Studio
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Benchmark AMD accuracy in distinguishing human "Hello" vs voicemail greetings and beep signals.
          </p>
        </div>

        <button className="btn btn-primary" onClick={handleTestAMD} disabled={isTesting}>
          {isTesting ? <RefreshCw className="spin" size={16} /> : <Play size={16} />}
          {isTesting ? 'Analyzing Greeting...' : 'Run AMD Benchmark'}
        </button>
      </div>

      {result && (
        <div className="glass-card" style={{ padding: '24px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>AMD Classification</span>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#34d399', marginTop: '4px' }}>{result.decision}</div>
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Confidence</span>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#38bdf8', marginTop: '4px' }}>{result.confidence}</div>
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Greeting Duration</span>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#a78bfa', marginTop: '4px' }}>{result.greetingDurationMs} ms</div>
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Decision Delay</span>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#06b6d4', marginTop: '4px' }}>{result.latencyMs} ms</div>
          </div>
        </div>
      )}
    </div>
  );
}
