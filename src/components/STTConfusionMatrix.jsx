import React, { useState } from 'react';
import { Grid, Sparkles, CheckCircle2, AlertTriangle, ShieldCheck, Plus } from 'lucide-react';

export default function STTConfusionMatrix() {
  const [selectedPair, setSelectedPair] = useState(null);

  const confusionPairs = [
    { target: 'Four (/f-ao-r/)', recognized: 'For / Door', errorRate: '12.4%', reason: 'Narrowband high-frequency /f/ fricative cutoff at 3.4kHz', recommendation: 'Boost "Number Four" acoustic phrase' },
    { target: 'Eight (/ey-t/)', recognized: 'Ate / Hate', errorRate: '8.2%', reason: 'Vocalic onset aspiration confusion over G.711u', recommendation: 'Phonetic biasing for financial digits' },
    { target: 'Three (/th-r-iy/)', recognized: 'Free / Tree', errorRate: '14.1%', reason: 'Voiceless dental fricative /th/ compression artifact', recommendation: 'Add triphone language model constraint' },
    { target: 'S (/eh-s/)', recognized: 'F (/eh-f/)', errorRate: '18.9%', reason: 'Loss of 4-8kHz spectral energy in PSTN bandpass', recommendation: 'Prompt caller to use NATO phonetic alphabet (Sierra / Foxtrot)' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Grid color="#06b6d4" size={28} /> PSTN Speech-to-Text Phonetic Confusion Matrix & Biasing Tuner
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Acoustic phoneme substitution analyzer. Diagnoses telephony 300Hz-3400Hz bandpass limitations and generates vocabulary boosting phrases.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Highest Error Phoneme</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ef4444', marginTop: '4px' }}>/s/ ➔ /f/</div>
          <span className="badge badge-rose" style={{ marginTop: '8px', display: 'inline-block' }}>18.9% Telephony Error</span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Digit Misrecognition Risk</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f59e0b', marginTop: '4px' }}>4 vs For</div>
          <span className="badge badge-amber" style={{ marginTop: '8px', display: 'inline-block' }}>12.4% Substitution</span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Model Biasing Improvement</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>+82%</div>
          <span className="badge badge-emerald" style={{ marginTop: '8px', display: 'inline-block' }}>With Custom Vocabulary</span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>PSTN Bandpass Limit</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#06b6d4', marginTop: '4px' }}>3.4 kHz</div>
          <span className="badge badge-cyan" style={{ marginTop: '8px', display: 'inline-block' }}>Nyquist Narrowband</span>
        </div>
      </div>

      {/* Confusion Matrix Table */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
          Top Telecom Phonetic Confusion Pairs
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', textAlign: 'left' }}>
                <th style={{ padding: '10px' }}>Intended Spoken Word</th>
                <th style={{ padding: '10px' }}>Confused STT Result</th>
                <th style={{ padding: '10px' }}>Telephony Error Rate</th>
                <th style={{ padding: '10px' }}>Acoustic / Telecom Root Cause</th>
                <th style={{ padding: '10px' }}>Remediation Recommendation</th>
              </tr>
            </thead>
            <tbody>
              {confusionPairs.map((p, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 10px', fontWeight: 700, color: '#fff' }}>{p.target}</td>
                  <td style={{ padding: '12px 10px', color: '#f43f5e', fontWeight: 600 }}>{p.recognized}</td>
                  <td style={{ padding: '12px 10px', color: '#f59e0b', fontWeight: 700 }}>{p.errorRate}</td>
                  <td style={{ padding: '12px 10px', color: '#94a3b8' }}>{p.reason}</td>
                  <td style={{ padding: '12px 10px', color: '#10b981', fontWeight: 600 }}>{p.recommendation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
