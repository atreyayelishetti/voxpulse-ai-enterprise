import React from 'react';
import { Fingerprint, ShieldCheck } from 'lucide-react';

export default function VoiceBiometricLivenessScore() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Fingerprint color="#a78bfa" size={28} /> Voice Biometric Liveness Confidence Meter
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Evaluate acoustic micro-variations to detect synthetic AI voice cloning vs live human vocal cords.
          </p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '24px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Micro-Pitch Jitter Variation</span>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#34d399', marginTop: '4px' }}>0.84% (Natural)</div>
        </div>
        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Glottal Flow Periodicity</span>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#38bdf8', marginTop: '4px' }}>99.2% Human</div>
        </div>
        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Deepfake Spoof Probability</span>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#a78bfa', marginTop: '4px' }}>1.2% (Low Risk)</div>
        </div>
      </div>
    </div>
  );
}
