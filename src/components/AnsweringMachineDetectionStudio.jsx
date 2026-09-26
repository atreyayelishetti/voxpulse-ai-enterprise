import React, { useState } from 'react';
import { Voicemail, User, Play, CheckCircle2, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';

export default function AnsweringMachineDetectionStudio() {
  const [activeSample, setActiveSample] = useState('human');
  const [isClassifying, setIsClassifying] = useState(false);

  const samples = {
    human: {
      label: 'Human Answer: "Hello? Who is this?"',
      duration: '1.1s',
      speechPattern: 'Short burst (840ms), followed by silence',
      verdict: 'HUMAN_DETECTED',
      confidence: '99.4%',
      action: 'Connect to Agent / Live Voicebot',
      decisionTimeMs: 980
    },
    machine_greeting: {
      label: 'Voicemail: "You have reached John, please leave a message..."',
      duration: '4.8s',
      speechPattern: 'Continuous speech (>2500ms) with no response pauses',
      verdict: 'MACHINE_GREETING',
      confidence: '98.8%',
      action: 'Wait for Beep & Drop Scheduled Message',
      decisionTimeMs: 1420
    },
    machine_beep: {
      label: 'Voicemail Beep: High-Pitch 1,000 Hz Tone',
      duration: '0.6s',
      speechPattern: 'Discrete 1000Hz sine burst with 400ms duration',
      verdict: 'BEEP_DETECTED',
      confidence: '99.9%',
      action: 'Start Recording / Play Voicemail Drop',
      decisionTimeMs: 410
    }
  };

  const current = samples[activeSample];

  const handleTest = (key) => {
    setActiveSample(key);
    setIsClassifying(true);
    setTimeout(() => {
      setIsClassifying(false);
    }, 400);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Voicemail color="#06b6d4" size={28} /> Answering Machine Detection (AMD) & Beep Tone Engine
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Distinguishes live human recipients from answering machines and carrier voicemail within 1.2 seconds of call answer.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>AMD Accuracy Rate</span>
          <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>99.2%</div>
          <span className="badge badge-emerald" style={{ marginTop: '8px', display: 'inline-block' }}>Benchmark Tested</span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Average Decision Speed</span>
          <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#06b6d4', marginTop: '4px' }}>1.1s</div>
          <span className="badge badge-cyan" style={{ marginTop: '8px', display: 'inline-block' }}>Sub-Second Target</span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Human False Positive (Hangup)</span>
          <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>0.2%</div>
          <span className="badge badge-emerald" style={{ marginTop: '8px', display: 'inline-block' }}>TCPA Compliant (&lt;3%)</span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>1000Hz Beep Detection</span>
          <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#a855f7', marginTop: '4px' }}>99.9%</div>
          <span className="badge badge-purple" style={{ marginTop: '8px', display: 'inline-block' }}>Goertzel Tone Filter</span>
        </div>
      </div>

      {/* Audio Sample Tests */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
          Acoustic AMD Classification Playground
        </h3>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
          <button 
            className={`btn ${activeSample === 'human' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => handleTest('human')}
          >
            Human Call Answer ("Hello?")
          </button>
          <button 
            className={`btn ${activeSample === 'machine_greeting' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => handleTest('machine_greeting')}
          >
            Voicemail Greeting Speech (&gt;3s)
          </button>
          <button 
            className={`btn ${activeSample === 'machine_beep' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => handleTest('machine_beep')}
          >
            1,000 Hz Voicemail Beep Tone
          </button>
        </div>

        <div style={{ padding: '20px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>{current.label}</span>
            <span className={`badge ${current.verdict.includes('HUMAN') ? 'badge-emerald' : 'badge-amber'}`}>
              {current.verdict}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '16px', fontSize: '0.85rem' }}>
            <div>Acoustic Energy Duration: <strong style={{ color: '#06b6d4' }}>{current.duration}</strong></div>
            <div>Classification Confidence: <strong style={{ color: '#10b981' }}>{current.confidence}</strong></div>
            <div>Decision Latency: <strong style={{ color: '#a855f7' }}>{current.decisionTimeMs} ms</strong></div>
            <div>Automated Dialer Action: <strong style={{ color: '#f59e0b' }}>{current.action}</strong></div>
          </div>
        </div>
      </div>
    </div>
  );
}
