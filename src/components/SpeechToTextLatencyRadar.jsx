import React, { useState } from 'react';
import { Zap, Activity, Clock, ShieldCheck, Play, Sparkles } from 'lucide-react';

export default function SpeechToTextLatencyRadar() {
  const [selectedEngine, setSelectedEngine] = useState('gemini');
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcript, setTranscript] = useState('I want to dispute an unauthorized charge on my business platinum card.');

  const engines = [
    { id: 'gemini', name: 'Google Gemini 2.5 Flash Audio', ttftMs: 142, werPercent: 3.1, costPerMin: '$0.0020', streaming: 'Real-time WebSocket', status: 'RECOMMENDED' },
    { id: 'deepgram', name: 'Deepgram Nova-2 Phone Call', ttftMs: 184, werPercent: 4.6, costPerMin: '$0.0043', streaming: 'Real-time WebSocket', status: 'COMPETITIVE' },
    { id: 'whisper', name: 'OpenAI Whisper v3 Large', ttftMs: 512, werPercent: 3.4, costPerMin: '$0.0060', streaming: 'Chunked Batch', status: 'HIGH_LATENCY' },
    { id: 'gcp_stt', name: 'Google Cloud STT v2 Phone', ttftMs: 295, werPercent: 4.0, costPerMin: '$0.0160', streaming: 'gRPC Bi-directional', status: 'LEGACY' },
    { id: 'azure', name: 'Azure Cognitive Speech Phone', ttftMs: 340, werPercent: 4.3, costPerMin: '$0.0120', streaming: 'WebSocket Streaming', status: 'LEGACY' }
  ];

  const current = engines.find(e => e.id === selectedEngine) || engines[0];

  const handleTestTranscription = () => {
    setIsTranscribing(true);
    setTimeout(() => {
      setIsTranscribing(false);
    }, current.ttftMs);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Zap color="#06b6d4" size={28} /> Speech-to-Text (STT) Engine Latency Radar & Word Error Rate (WER)
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Benchmark Time-to-First-Token (TTFT), phonetic accuracy, and per-minute transcription costs across state-of-the-art speech models.
          </p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={handleTestTranscription}
          disabled={isTranscribing}
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          {isTranscribing ? <Activity size={16} className="animate-spin" /> : <Play size={16} />}
          {isTranscribing ? `Streaming (${current.ttftMs}ms)...` : 'Simulate Live Audio Stream'}
        </button>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Top Engine (Gemini 2.5 Flash)</span>
          <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>142 ms</div>
          <span className="badge badge-emerald" style={{ marginTop: '8px', display: 'inline-block' }}>Fastest TTFT</span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Lowest Word Error Rate</span>
          <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#06b6d4', marginTop: '4px' }}>3.1% WER</div>
          <span className="badge badge-cyan" style={{ marginTop: '8px', display: 'inline-block' }}>96.9% Accurate</span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Transcription Cost Floor</span>
          <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#a855f7', marginTop: '4px' }}>$0.0020</div>
          <span className="badge badge-purple" style={{ marginTop: '8px', display: 'inline-block' }}>Per Audio Minute</span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Cost Savings vs Legacy Cloud</span>
          <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#f59e0b', marginTop: '4px' }}>87.5%</div>
          <span className="badge badge-amber" style={{ marginTop: '8px', display: 'inline-block' }}>vs Google STT v2 ($0.016)</span>
        </div>
      </div>

      {/* Latency Comparison Bars */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '20px' }}>
          Time-To-First-Token (TTFT) Latency Race (Milliseconds)
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {engines.map((e) => {
            const isSelected = selectedEngine === e.id;
            return (
              <div 
                key={e.id}
                onClick={() => setSelectedEngine(e.id)}
                style={{ cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 700, color: isSelected ? '#06b6d4' : '#fff' }}>{e.name}</span>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <span>TTFT: <strong style={{ color: e.ttftMs < 200 ? '#10b981' : e.ttftMs < 400 ? '#06b6d4' : '#f43f5e' }}>{e.ttftMs}ms</strong></span>
                    <span>WER: <strong style={{ color: '#fff' }}>{e.werPercent}%</strong></span>
                    <span>Cost: <strong style={{ color: '#38bdf8' }}>{e.costPerMin}/min</strong></span>
                  </div>
                </div>

                <div style={{ width: '100%', height: '12px', background: 'rgba(255,255,255,0.06)', borderRadius: '6px', overflow: 'hidden' }}>
                  <div 
                    style={{ 
                      width: `${(e.ttftMs / 600) * 100}%`, 
                      height: '100%', 
                      background: e.ttftMs < 200 ? '#10b981' : e.ttftMs < 400 ? '#06b6d4' : '#f43f5e',
                      borderRadius: '6px'
                    }} 
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Test Sample Transcript Card */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={18} color="#06b6d4" /> Real-time Streaming Transcript Output
        </h3>
        <div style={{ padding: '16px', background: 'rgba(0,0,0,0.4)', borderRadius: '8px', border: '1px solid var(--border-color)', color: '#34d399', fontSize: '0.95rem', fontWeight: 600, fontFamily: 'monospace' }}>
          "{transcript}"
        </div>
        <div style={{ display: 'flex', gap: '16px', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '10px' }}>
          <span>Selected Engine: <strong style={{ color: '#fff' }}>{current.name}</strong></span>
          <span>Streaming Mode: <strong style={{ color: '#06b6d4' }}>{current.streaming}</strong></span>
        </div>
      </div>
    </div>
  );
}
