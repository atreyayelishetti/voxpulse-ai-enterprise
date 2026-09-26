import React, { useState } from 'react';
import { Bot, Zap, Play, RefreshCw } from 'lucide-react';

export default function AIVoicebotBargeInRecovery() {
  const [isTesting, setIsTesting] = useState(false);
  const [recovery, setRecovery] = useState(null);

  const handleTestRecovery = () => {
    setIsTesting(true);
    setTimeout(() => {
      setRecovery({
        bargeInEventTime: '00:06.40s',
        interruptedPrompt: 'Welcome to Apex Bank... [INTERRUPTED]',
        callerUtterance: 'I need to report a lost debit card!',
        newIntent: 'REPORT_LOST_CARD',
        contextRetained: true,
        recoveryTimeMs: 140
      });
      setIsTesting(false);
    }, 1000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Zap color="#38bdf8" size={28} /> AI Voicebot Mid-Prompt Interruption Context Recovery Test
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Test dialog context switching and prompt cancellation when a user interrupts long IVR audio prompts.
          </p>
        </div>

        <button className="btn btn-primary" onClick={handleTestRecovery} disabled={isTesting}>
          {isTesting ? <RefreshCw className="spin" size={16} /> : <Play size={16} />}
          {isTesting ? 'Simulating Interruption...' : 'Run Recovery Test'}
        </button>
      </div>

      {recovery && (
        <div className="glass-card" style={{ padding: '24px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Caller Spoken Input</span>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', marginTop: '4px' }}>"{recovery.callerUtterance}"</div>
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Switched Intent</span>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#06b6d4', marginTop: '4px' }}>{recovery.newIntent}</div>
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Context Recovery Delay</span>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#34d399', marginTop: '4px' }}>{recovery.recoveryTimeMs} ms</div>
          </div>
        </div>
      )}
    </div>
  );
}
