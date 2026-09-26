import React from 'react';
import { GitFork, Play } from 'lucide-react';

export default function IVRNavigationPathRecorder() {
  const steps = [
    { step: 1, action: 'DIAL +1 (800) 555-0199', timestamp: '00:00s' },
    { step: 2, action: 'SEND DTMF 1 (Account Balance)', timestamp: '00:04s' },
    { step: 3, action: 'SEND DTMF 0 (Agent Override)', timestamp: '00:14s' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <GitFork color="#6366f1" size={28} /> IVR Session Replay & Caller Keypad Path Recorder
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Record and replay exact DTMF keypad sequences pressed during live test calls.
          </p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.72rem' }}>
              <th style={{ padding: '10px' }}>Step #</th>
              <th style={{ padding: '10px' }}>Recorded Action</th>
              <th style={{ padding: '10px' }}>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {steps.map((s, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px 10px', color: '#a78bfa', fontWeight: 700 }}>#{s.step}</td>
                <td style={{ padding: '12px 10px', color: '#fff', fontWeight: 700 }}>{s.action}</td>
                <td style={{ padding: '12px 10px', color: '#06b6d4' }}>{s.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
