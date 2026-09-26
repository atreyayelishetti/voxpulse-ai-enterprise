import React, { useState } from 'react';
import { Languages, Globe, CheckCircle2, Play, Sparkles } from 'lucide-react';

export default function IVRMultilingualAutoDetect() {
  const [selectedSample, setSelectedSample] = useState(0);

  const samples = [
    { text: "Hola, quisiera saber el saldo de mi cuenta bancaria por favor", lang: 'Spanish (Latin America)', code: 'es-419', confidence: 0.99, branch: 'IVR_SPANISH_BRANCH_v2' },
    { text: "Bonjour, je voudrais vérifier l'état de ma demande de prêt", lang: 'French (Canadian)', code: 'fr-CA', confidence: 0.98, branch: 'IVR_FRENCH_BRANCH_v1' },
    { text: "Guten Tag, ich möchte eine verdächtige Transaktion melden", lang: 'German (Standard)', code: 'de-DE', confidence: 0.99, branch: 'IVR_GERMAN_BRANCH_v1' },
    { text: "Hello, I want to dispute a transaction on my credit card", lang: 'English (US)', code: 'en-US', confidence: 0.99, branch: 'IVR_ENGLISH_ROOT' }
  ];

  const current = samples[selectedSample];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Languages color="#06b6d4" size={28} /> Acoustic Multilingual Auto-Detect & Dynamic Branch Switcher
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Zero-keypad language auto-routing. Detects caller native tongue in the first 2 seconds and auto-switches prompt media catalog.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Detected Language</span>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#10b981', marginTop: '6px' }}>{current.lang}</div>
          <span className="badge badge-emerald" style={{ marginTop: '8px', display: 'inline-block' }}>ISO {current.code}</span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Classification Confidence</span>
          <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#06b6d4', marginTop: '4px' }}>{(current.confidence * 100).toFixed(0)}%</div>
          <span className="badge badge-cyan" style={{ marginTop: '8px', display: 'inline-block' }}>Acoustic Phoneme Match</span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Automatic Route Target</span>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#a855f7', marginTop: '8px', fontFamily: 'monospace' }}>{current.branch}</div>
          <span className="badge badge-purple" style={{ marginTop: '8px', display: 'inline-block' }}>Zero Keypad Clicks</span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Average Detection Time</span>
          <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#f59e0b', marginTop: '4px' }}>620 ms</div>
          <span className="badge badge-amber" style={{ marginTop: '8px', display: 'inline-block' }}>Sub-Second Handshake</span>
        </div>
      </div>

      {/* Interactive Sample Selector */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
          Test Multilingual Caller Utterances
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {samples.map((s, idx) => (
            <div 
              key={idx}
              onClick={() => setSelectedSample(idx)}
              style={{ 
                padding: '16px', 
                borderRadius: '8px', 
                background: idx === selectedSample ? 'rgba(6, 182, 212, 0.08)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${idx === selectedSample ? '#06b6d4' : 'var(--border-color)'}`,
                cursor: 'pointer',
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                gap: '16px'
              }}
            >
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#fff' }}>"{s.text}"</div>
                <div style={{ display: 'flex', gap: '12px', marginTop: '6px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  <span>Language: <strong style={{ color: '#06b6d4' }}>{s.lang}</strong></span>
                  <span>Branch: <strong style={{ color: '#10b981', fontFamily: 'monospace' }}>{s.branch}</strong></span>
                </div>
              </div>
              <span className={`badge ${idx === selectedSample ? 'badge-cyan' : 'badge-emerald'}`}>
                {idx === selectedSample ? 'ACTIVE TEST' : 'SELECT'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
