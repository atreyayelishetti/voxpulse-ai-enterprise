import React, { useState } from 'react';
import { GitBranch, Sparkles, CheckCircle2, RotateCcw, Play, Sliders } from 'lucide-react';

export default function GeminiLLMPromptVersioning() {
  const [selectedVersion, setSelectedVersion] = useState('v1.3');

  const versions = [
    {
      id: 'v1.3',
      name: 'v1.3 - Empathetic Conversational Banking (Active)',
      systemPrompt: 'You are VoxPulse AI, a courteous financial assistant. Listen to the caller intent, acknowledge emotions, and directly extract actionable DTMF options or execute account queries.',
      ttft: '142ms',
      accuracy: '98.4%',
      containment: '68.2%',
      status: 'PRODUCTION'
    },
    {
      id: 'v1.2',
      name: 'v1.2 - Terse Strict Menu Extractor',
      systemPrompt: 'You are an automated IVR bot. Map user speech strictly to [1: Balance, 2: Payments, 3: Fraud, 0: Agent]. Do not output conversational filler.',
      ttft: '118ms',
      accuracy: '94.1%',
      containment: '54.0%',
      status: 'ARCHIVED'
    }
  ];

  const current = versions.find(v => v.id === selectedVersion) || versions[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <GitBranch color="#06b6d4" size={28} /> Gemini LLM System Prompt Versioning & A/B Governance
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            System prompt registry. Audits version diffs, temperature parameters, intent classification accuracy, and rollback governance.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Active Production Version</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>{current.id}</div>
          <span className="badge badge-emerald" style={{ marginTop: '8px', display: 'inline-block' }}>{current.status}</span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Intent Accuracy</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#06b6d4', marginTop: '4px' }}>{current.accuracy}</div>
          <span className="badge badge-cyan" style={{ marginTop: '8px', display: 'inline-block' }}>Benchmark Pass</span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Time-to-First-Token</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#a855f7', marginTop: '4px' }}>{current.ttft}</div>
          <span className="badge badge-purple" style={{ marginTop: '8px', display: 'inline-block' }}>Gemini 2.5 Flash</span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Self-Service Containment</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f59e0b', marginTop: '4px' }}>{current.containment}</div>
          <span className="badge badge-amber" style={{ marginTop: '8px', display: 'inline-block' }}>+14.2% vs v1.2</span>
        </div>
      </div>

      {/* Version Selector Tabs & Prompt Editor */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
          {versions.map((v) => (
            <button
              key={v.id}
              className={`btn ${selectedVersion === v.id ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setSelectedVersion(v.id)}
            >
              {v.name}
            </button>
          ))}
        </div>

        <div>
          <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
            System Instructions / Prompt Definition
          </label>
          <textarea
            value={current.systemPrompt}
            readOnly
            rows={5}
            style={{ width: '100%', padding: '14px', background: 'rgba(0,0,0,0.4)', color: '#38bdf8', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '0.9rem', lineHeight: '1.5' }}
          />
        </div>
      </div>
    </div>
  );
}
