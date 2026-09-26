import React, { useState } from 'react';
import { Sparkles, GitBranch } from 'lucide-react';

export default function GeminiLLMPromptVersioning() {
  const versions = [
    { version: 'v2.4 (Active)', model: 'gemini-2.0-flash', prompt: 'System: You are an empathetic bank agent. Verify customer SSN before balance.', accuracy: '98.6%' },
    { version: 'v2.3 (Staging)', model: 'gemini-2.0-flash', prompt: 'System: You are a quick customer bot. State balance immediately.', accuracy: '94.2%' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sparkles color="#06b6d4" size={28} /> Gemini LLM Prompt Versioning & A/B Testing Sandbox
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Version control, diff, and benchmark Gemini system instructions for voicebot dialog trees.
          </p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.72rem' }}>
              <th style={{ padding: '10px' }}>Prompt Version</th>
              <th style={{ padding: '10px' }}>AI Model</th>
              <th style={{ padding: '10px' }}>System Instruction Snippet</th>
              <th style={{ padding: '10px' }}>Intent Accuracy</th>
            </tr>
          </thead>
          <tbody>
            {versions.map((v, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px 10px', color: '#fff', fontWeight: 700 }}>{v.version}</td>
                <td style={{ padding: '12px 10px', color: '#06b6d4' }}>{v.model}</td>
                <td style={{ padding: '12px 10px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{v.prompt}</td>
                <td style={{ padding: '12px 10px', color: '#34d399', fontWeight: 700 }}>{v.accuracy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
