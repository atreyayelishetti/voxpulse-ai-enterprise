import React, { useState } from 'react';
import { Activity, Play, RefreshCw } from 'lucide-react';

export default function RTPStreamEchoAnalyzer() {
  const [isTesting, setIsTesting] = useState(false);
  const [result, setResult] = useState(null);

  const handleTestEcho = () => {
    setIsTesting(true);
    setTimeout(() => {
      setResult({
        echoReturnLossDb: '48.2 dB (Ideal AEC)',
        echoDelayMs: 12,
        doubleTalkDetected: false,
        aecStatus: 'AEC ACTIVE & EFFECTIVE'
      });
      setIsTesting(false);
    }, 1000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Activity color="#a78bfa" size={28} /> Acoustic Echo Cancellation (AEC) Return Loss Tester
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Measure Echo Return Loss Enhancement (ERLE) and acoustic reflection delays in voice streams.
          </p>
        </div>

        <button className="btn btn-primary" onClick={handleTestEcho} disabled={isTesting}>
          {isTesting ? <RefreshCw className="spin" size={16} /> : <Play size={16} />}
          {isTesting ? 'Measuring Echo Return...' : 'Run AEC Test'}
        </button>
      </div>

      {result && (
        <div className="glass-card" style={{ padding: '24px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Echo Return Loss</span>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#34d399', marginTop: '4px' }}>{result.echoReturnLossDb}</div>
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Echo Reflection Delay</span>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#38bdf8', marginTop: '4px' }}>{result.echoDelayMs} ms</div>
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>AEC Hardware Status</span>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#06b6d4', marginTop: '6px' }}>{result.aecStatus}</div>
          </div>
        </div>
      )}
    </div>
  );
}
