import React, { useState } from 'react';
import { Route, Play, Pause, CheckCircle2, AlertCircle, Volume2, ShieldCheck } from 'lucide-react';

export default function IVRNavigationPathRecorder() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeStep, setActiveStep] = useState(3);

  const steps = [
    { time: '00:00.000', event: 'SIP 200 OK Answer', type: 'SIGNALING', desc: 'Call answered by carrier SBC. Inbound RTP media negotiated.', latency: '18ms' },
    { time: '00:00.850', event: 'Acoustic Prompt Heard', type: 'PROMPT', desc: '"Welcome to Global Financial. For Retail Banking, press 1."', latency: '3.2s duration' },
    { time: '00:04.100', event: 'DTMF Key Injected', type: 'INPUT', desc: 'Digit [ 1 ] injected via RFC 4733 telephone-event', latency: '160ms' },
    { time: '00:04.420', event: 'Submenu Prompt Heard', type: 'PROMPT', desc: '"Please enter your 4-digit telephone security PIN."', latency: '2.4s duration' },
    { time: '00:07.120', event: 'PIN Input Burst', type: 'INPUT', desc: 'Digits [ 7 - 4 - 2 - 9 ] entered with 220ms inter-digit pause', latency: '980ms' },
    { time: '00:08.240', event: 'Core Banking API Query', type: 'BACKEND', desc: 'POST /v2/accounts/balance HTTP/2.0 TLS 1.3', latency: '124ms' },
    { time: '00:08.400', event: 'Final Balance Prompt', type: 'PROMPT', desc: '"Your primary checking account balance is $4,892.40."', latency: '4.1s duration' },
    { time: '00:12.600', event: 'Clean Teardown', type: 'SIGNALING', desc: 'BYE sent. Session ended normally without agent escalation.', latency: '12.6s Total' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Route color="#06b6d4" size={28} /> IVR Session Replay & High-Fidelity Navigation Path Recorder
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Millisecond-accurate timeline inspector. Replays prompts heard, DTMF keys injected, and backend API latencies step-by-step.
          </p>
        </div>
      </div>

      {/* Session Metadata Card */}
      <div className="glass-card" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>CALL SESSION IDENTIFIER</span>
          <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', fontFamily: 'monospace' }}>session_rec_9941a8_retail_banking</div>
        </div>
        <div style={{ display: 'flex', gap: '16px', fontSize: '0.85rem' }}>
          <div>Duration: <strong style={{ color: '#06b6d4' }}>12.6s</strong></div>
          <div>MOS Quality: <strong style={{ color: '#10b981' }}>4.42 MOS</strong></div>
          <div>Containment: <strong style={{ color: '#38bdf8' }}>100% IVR Resolved</strong></div>
        </div>
      </div>

      {/* Step by step timeline */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '20px' }}>
          Chronological Caller Interaction Trace
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {steps.map((s, idx) => (
            <div 
              key={idx}
              onClick={() => setActiveStep(idx)}
              style={{ 
                padding: '16px', 
                borderRadius: '8px', 
                background: idx === activeStep ? 'rgba(6, 182, 212, 0.08)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${idx === activeStep ? '#06b6d4' : 'var(--border-color)'}`,
                cursor: 'pointer',
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                gap: '16px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span style={{ color: 'var(--text-muted)', fontFamily: 'monospace', fontSize: '0.82rem', width: '75px' }}>
                  {s.time}
                </span>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: 700, color: '#fff', fontSize: '0.92rem' }}>{s.event}</span>
                    <span className={`badge ${s.type === 'PROMPT' ? 'badge-cyan' : s.type === 'INPUT' ? 'badge-amber' : s.type === 'BACKEND' ? 'badge-purple' : 'badge-emerald'}`}>
                      {s.type}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '4px 0 0' }}>{s.desc}</p>
                </div>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                {s.latency}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
