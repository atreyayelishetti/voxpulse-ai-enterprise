import React from 'react';
import { Activity, Zap } from 'lucide-react';

export default function SpeechToTextLatencyRadar() {
  const wordStreams = [
    { word: 'Hello', ttftMs: 110, status: 'STREAMED' },
    { word: 'I', ttftMs: 115, status: 'STREAMED' },
    { word: 'would', ttftMs: 120, status: 'STREAMED' },
    { word: 'like', ttftMs: 125, status: 'STREAMED' },
    { word: 'to', ttftMs: 128, status: 'STREAMED' },
    { word: 'check', ttftMs: 135, status: 'STREAMED' },
    { word: 'my', ttftMs: 138, status: 'STREAMED' },
    { word: 'balance', ttftMs: 142, status: 'STREAMED' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Zap color="#06b6d4" size={28} /> Realtime Streaming STT Word-by-Word Latency Radar
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Measure word-by-word streaming Time-To-First-Token (TTFT) latency for Gemini 2.0 WebSocket audio inputs.
          </p>
        </div>
        <span className="badge badge-cyan">Avg TTFT: 125ms</span>
      </div>

      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>Streaming Token Latency Logs</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {wordStreams.map((item, idx) => (
            <div key={idx} style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(6, 182, 212, 0.3)', padding: '10px 14px', borderRadius: '8px' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>"{item.word}"</div>
              <span style={{ fontSize: '0.72rem', color: '#06b6d4', fontWeight: 600 }}>{item.ttftMs} ms</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
