import React, { useState } from 'react';
import { 
  Zap, 
  Activity, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle,
  Flame
} from 'lucide-react';

export default function LoadTestConsole() {
  const [concurrency, setConcurrency] = useState(10);
  const [targetNumber, setTargetNumber] = useState('+1 (800) 555-0100');
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState(null);

  const handleStartLoad = async () => {
    setIsRunning(true);
    try {
      const res = await fetch('/api/loadtest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ concurrencyCount: concurrency, targetNumber })
      });
      const data = await res.json();
      setResult(data.result);
    } catch (e) {
      console.error(e);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="glass-panel glass-panel-glow" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Flame size={24} color="#f43f5e" />
              High-Volume PSTN Load & Stress Tester
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Simulate peak contact center traffic with high concurrent call volume across global carriers.
            </p>
          </div>

          <span className="badge badge-rose" style={{ padding: '6px 12px' }}>
            Stress Engine Active
          </span>
        </div>

        {/* Input Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '14px', marginTop: '20px', alignItems: 'center' }}>
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>TARGET IVR NUMBER</label>
            <input type="text" className="input-field" value={targetNumber} onChange={e => setTargetNumber(e.target.value)} />
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>CONCURRENT CALLS</label>
            <select className="input-field" value={concurrency} onChange={e => setConcurrency(Number(e.target.value))}>
              <option value="5">5 Concurrent Calls</option>
              <option value="10">10 Concurrent Calls</option>
              <option value="25">25 Concurrent Calls</option>
              <option value="50">50 Concurrent Calls</option>
            </select>
          </div>

          <button onClick={handleStartLoad} className="btn btn-rose" style={{ marginTop: '18px' }} disabled={isRunning}>
            {isRunning ? <RefreshCw size={18} style={{ animation: 'spin 1s linear infinite' }} /> : <Zap size={18} />}
            {isRunning ? 'Running Stress Test...' : 'Launch Load Test'}
          </button>
        </div>
      </div>

      {/* Results Dashboard */}
      {result && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>TOTAL CALLS</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-display)' }}>{result.totalCalls}</div>
          </div>

          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>SUCCESS SLA</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#34d399', fontFamily: 'var(--font-display)' }}>{result.successRate}</div>
          </div>

          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>AVG LATENCY</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#38bdf8', fontFamily: 'var(--font-display)' }}>{result.averageLatencyMs} ms</div>
          </div>

          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>AVG MOS SCORE</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#a78bfa', fontFamily: 'var(--font-display)' }}>{result.averageMosScore} / 5.0</div>
          </div>
        </div>
      )}
    </div>
  );
}
