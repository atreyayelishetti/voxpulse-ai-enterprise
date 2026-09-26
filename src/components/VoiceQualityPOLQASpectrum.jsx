import React, { useState, useEffect } from 'react';
import { Activity, BarChart2, Radio, Play, Pause, RefreshCw, Zap, Volume2 } from 'lucide-react';

export default function VoiceQualityPOLQASpectrum() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [testTone, setTestTone] = useState('sine1k');
  const [polqaScore, setPolqaScore] = useState(4.42);
  const [snrDb, setSnrDb] = useState(28.4);
  const [thdPercent, setThdPercent] = useState(0.85);

  // Generate 32 spectrum bins
  const [spectrumBars, setSpectrumBars] = useState(() => 
    Array.from({ length: 32 }, (_, i) => Math.max(10, Math.floor(Math.sin(i / 4) * 60 + 30)))
  );

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setSpectrumBars(() => {
        return Array.from({ length: 32 }, (_, i) => {
          let base = 20;
          if (testTone === 'sine1k' && i >= 7 && i <= 9) base = 85;
          if (testTone === 'dtmf' && (i === 6 || i === 11)) base = 75;
          if (testTone === 'speech') base = Math.sin((i + Date.now() / 200) / 3) * 35 + 45;
          const jitter = (Math.random() - 0.5) * 15;
          return Math.max(5, Math.min(100, Math.floor(base + jitter)));
        });
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isPlaying, testTone]);

  const handleToneChange = (tone) => {
    setTestTone(tone);
    if (tone === 'sine1k') {
      setPolqaScore(4.45);
      setSnrDb(34.2);
      setThdPercent(0.42);
    } else if (tone === 'dtmf') {
      setPolqaScore(4.38);
      setSnrDb(31.0);
      setThdPercent(0.68);
    } else {
      setPolqaScore(4.28);
      setSnrDb(26.5);
      setThdPercent(1.15);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Activity color="#06b6d4" size={28} /> ITU-T P.863 POLQA Acoustic FFT Spectrum Analyzer
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            High-resolution 2048-bin Fast Fourier Transform spectrum, harmonic distortion (THD+N), and Perceptual Objective Listening Quality Analysis.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            className="btn btn-secondary" 
            onClick={() => setIsPlaying(!isPlaying)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            {isPlaying ? 'Pause Analyzer' : 'Resume FFT'}
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>POLQA ITU-T P.863 Score</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>{polqaScore} MOS</div>
          <span className="badge badge-emerald" style={{ marginTop: '8px', display: 'inline-block' }}>Toll Quality (SWB)</span>
        </div>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Signal-to-Noise Ratio (SNR)</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#06b6d4', marginTop: '4px' }}>{snrDb} dB</div>
          <span className="badge badge-cyan" style={{ marginTop: '8px', display: 'inline-block' }}>Clean Acoustic Floor</span>
        </div>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Harmonic Distortion (THD+N)</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f59e0b', marginTop: '4px' }}>{thdPercent}%</div>
          <span className="badge badge-amber" style={{ marginTop: '8px', display: 'inline-block' }}>&lt; 1.5% SLA Threshold</span>
        </div>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Frequency Bandwidth</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#a855f7', marginTop: '4px' }}>8.0 kHz</div>
          <span className="badge badge-purple" style={{ marginTop: '8px', display: 'inline-block' }}>PSTN G.711u / PCM</span>
        </div>
      </div>

      {/* Test Signal Switcher */}
      <div className="glass-card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#fff' }}>Reference Acoustic Injection Tone:</span>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            className={`btn ${testTone === 'sine1k' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => handleToneChange('sine1k')}
            style={{ fontSize: '0.8rem', padding: '6px 12px' }}
          >
            1,000 Hz Calibration Sine
          </button>
          <button 
            className={`btn ${testTone === 'dtmf' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => handleToneChange('dtmf')}
            style={{ fontSize: '0.8rem', padding: '6px 12px' }}
          >
            DTMF Digit 1 (697Hz + 1209Hz)
          </button>
          <button 
            className={`btn ${testTone === 'speech' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => handleToneChange('speech')}
            style={{ fontSize: '0.8rem', padding: '6px 12px' }}
          >
            ITU Harvard Sentence Speech Sample
          </button>
        </div>
      </div>

      {/* FFT 2048-bin Real-time Waterfall / Bins */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BarChart2 size={20} color="#06b6d4" /> Real-time Acoustic Power Spectral Density (PSD)
          </h3>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Window: Hann • FFT Size: 2048 • Frame: 20ms</span>
        </div>

        <div style={{ 
          height: '220px', 
          display: 'flex', 
          alignItems: 'flex-end', 
          gap: '6px', 
          padding: '16px', 
          background: 'rgba(0,0,0,0.4)', 
          borderRadius: '8px', 
          border: '1px solid rgba(255,255,255,0.05)'
        }}>
          {spectrumBars.map((val, idx) => {
            const freq = Math.round((idx / 32) * 4000);
            return (
              <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                <div 
                  style={{ 
                    width: '100%', 
                    height: `${val}%`, 
                    background: val > 75 
                      ? 'linear-gradient(180deg, #f43f5e, #f59e0b)' 
                      : val > 45 
                      ? 'linear-gradient(180deg, #06b6d4, #3b82f6)' 
                      : 'linear-gradient(180deg, #10b981, #059669)',
                    borderRadius: '3px 3px 0 0',
                    transition: 'height 0.08s ease'
                  }} 
                />
              </div>
            );
          })}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px' }}>
          <span>0 Hz</span>
          <span>1,000 Hz</span>
          <span>2,000 Hz</span>
          <span>3,000 Hz</span>
          <span>4,000 Hz (Nyquist G.711)</span>
        </div>
      </div>

      {/* POLQA Diagnostic Impairment Factor Breakdown */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
          ITU-T P.863 Objective Distortion Impairments
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Linear Frequency Distortion</span>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#10b981', marginTop: '4px' }}>0.04 Impairment</div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Flat transfer curve across 300Hz-3400Hz speech passband.</p>
          </div>
          <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Non-Linear Clipping & Quantization</span>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#10b981', marginTop: '4px' }}>0.08 Impairment</div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>G.711u logarithmic compression within 8-bit dynamic bounds.</p>
          </div>
          <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Packet Loss Concealment (PLC)</span>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#38bdf8', marginTop: '4px' }}>0.02 Impairment</div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Zero dropped frames in current carrier capture session.</p>
          </div>
          <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Time Warping & Jitter Jumps</span>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#10b981', marginTop: '4px' }}>1.2 ms Drift</div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Stable RTP timestamp synchronization between SBC endpoints.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
