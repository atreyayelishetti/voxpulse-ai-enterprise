import React from 'react';
import { Activity } from 'lucide-react';

export default function VoiceQualityPOLQASpectrum() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Activity color="#06b6d4" size={28} /> High-Resolution FFT Audio Frequency Spectrum Visualizer
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Analyze Fast Fourier Transform (FFT) harmonics, sibilance, and high-frequency attenuation.
          </p>
        </div>
        <span className="badge badge-cyan">FFT 2048-pt Active</span>
      </div>

      <div className="glass-card" style={{ padding: '24px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Fundamental Freq (f0)</span>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#34d399', marginTop: '4px' }}>185 Hz</div>
        </div>
        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>High Cutoff Frequency</span>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#38bdf8', marginTop: '4px' }}>3,400 Hz (G.711)</div>
        </div>
        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Harmonic Distortion</span>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#a78bfa', marginTop: '4px' }}>0.42%</div>
        </div>
      </div>
    </div>
  );
}
