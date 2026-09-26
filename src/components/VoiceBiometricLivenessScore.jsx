import React, { useState } from 'react';
import { Mic, ShieldCheck, ShieldAlert, Activity, Play, RefreshCw, Zap, Sliders } from 'lucide-react';

export default function VoiceBiometricLivenessScore() {
  const [testMode, setTestMode] = useState('genuine');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [metrics, setMetrics] = useState({
    livenessScore: 98.4,
    deepfakeProbability: 1.2,
    replayAttackConfidence: 0.8,
    pitchJitter: '0.48% (Natural)',
    amplitudeShimmer: '1.82% (Natural)',
    spectralCentroid: '2,480 Hz',
    verdict: 'GENUINE_HUMAN'
  });

  const handleRunAnalysis = (mode) => {
    setTestMode(mode);
    setIsAnalyzing(true);
    setTimeout(() => {
      if (mode === 'genuine') {
        setMetrics({
          livenessScore: 98.4,
          deepfakeProbability: 1.2,
          replayAttackConfidence: 0.8,
          pitchJitter: '0.48% (Natural)',
          amplitudeShimmer: '1.82% (Natural)',
          spectralCentroid: '2,480 Hz',
          verdict: 'GENUINE_HUMAN'
        });
      } else {
        setMetrics({
          livenessScore: 14.8,
          deepfakeProbability: 94.6,
          replayAttackConfidence: 89.2,
          pitchJitter: '0.04% (Unnaturally Flat)',
          amplitudeShimmer: '0.12% (Synthetic)',
          spectralCentroid: '4,850 Hz (Vocoder Artifacts)',
          verdict: 'SPOOF_ATTACK_DETECTED'
        });
      }
      setIsAnalyzing(false);
    }, 500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Mic color="#06b6d4" size={28} /> AI Voice Biometric Anti-Spoofing & Liveness Verification
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Defense against generative AI voice cloning (ElevenLabs, VALL-E) and acoustic loudspeaker replay attacks on telephone banking IVRs.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            className={`btn ${testMode === 'genuine' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => handleRunAnalysis('genuine')}
            disabled={isAnalyzing}
          >
            Inject Genuine Voice
          </button>
          <button 
            className={`btn ${testMode === 'deepfake' ? 'btn-danger' : 'btn-secondary'}`}
            onClick={() => handleRunAnalysis('deepfake')}
            disabled={isAnalyzing}
          >
            Inject AI Voice Clone Attack
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Liveness Confidence Score</span>
          <div style={{ fontSize: '2.4rem', fontWeight: 800, color: metrics.livenessScore > 80 ? '#10b981' : '#ef4444', marginTop: '4px' }}>
            {metrics.livenessScore}%
          </div>
          <span className={`badge ${metrics.livenessScore > 80 ? 'badge-emerald' : 'badge-rose'}`} style={{ marginTop: '8px', display: 'inline-block' }}>
            {metrics.verdict}
          </span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Deepfake Synthesis Risk</span>
          <div style={{ fontSize: '2.4rem', fontWeight: 800, color: metrics.deepfakeProbability > 50 ? '#ef4444' : '#10b981', marginTop: '4px' }}>
            {metrics.deepfakeProbability}%
          </div>
          <span className="badge badge-cyan" style={{ marginTop: '8px', display: 'inline-block' }}>Diffusion Vocoder Check</span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Replay Attack Risk</span>
          <div style={{ fontSize: '2.4rem', fontWeight: 800, color: metrics.replayAttackConfidence > 50 ? '#f59e0b' : '#10b981', marginTop: '4px' }}>
            {metrics.replayAttackConfidence}%
          </div>
          <span className="badge badge-amber" style={{ marginTop: '8px', display: 'inline-block' }}>Room Impulse Response</span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Vocal Tract Micro-Tremor</span>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#06b6d4', marginTop: '8px' }}>
            {metrics.pitchJitter}
          </div>
          <span className="badge badge-purple" style={{ marginTop: '8px', display: 'inline-block' }}>Physiological Biometrics</span>
        </div>
      </div>

      {/* Dynamic Nonce Challenge & Acoustic Inspection */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
            Dynamic Acoustic Nonce Challenge
          </h3>
          <div style={{ padding: '16px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', border: '1px solid var(--border-color)', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.75rem', color: '#06b6d4', fontWeight: 700 }}>EPHEMERAL CHALLENGE PROMPT</span>
            <div style={{ fontSize: '1.05rem', fontWeight: 600, color: '#fff', marginTop: '6px' }}>
              "The golden eagle flies over Mount Rainier at twilight 8 - 4 - 9"
            </div>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Dynamic random phrases cannot be pre-recorded by adversaries. Combined with millisecond response latency checking to prevent LLM speech synthesis relay attacks.
          </p>
        </div>

        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
            Acoustic Signal Artifact Decomposition
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Amplitude Shimmer (Perturbation):</span>
              <span style={{ color: '#fff', fontWeight: 600 }}>{metrics.amplitudeShimmer}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Spectral Centroid High-Frequency:</span>
              <span style={{ color: '#06b6d4', fontWeight: 600 }}>{metrics.spectralCentroid}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Human Glottal Pulse Naturalness:</span>
              <span style={{ color: testMode === 'genuine' ? '#10b981' : '#ef4444', fontWeight: 700 }}>
                {testMode === 'genuine' ? 'VERIFIED (Human Vocal Cords)' : 'REJECTED (Neural Vocoder Synthesizer)'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
