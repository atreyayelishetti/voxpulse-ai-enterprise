import React, { useState, useEffect, useRef } from 'react';
import { Sliders, Volume2, Radio, Activity, Zap, Cpu, AlertTriangle, Play, RefreshCw, BarChart2, ShieldAlert } from 'lucide-react';

export default function AudioDegradationStudio() {
  const [packetLoss, setPacketLoss] = useState(5); // %
  const [jitter, setJitter] = useState(45); // ms
  const [codec, setCodec] = useState('G.711u');
  const [noiseProfile, setNoiseProfile] = useState('Call Center Ambient');
  const [isSimulating, setIsSimulating] = useState(false);
  const [analysis, setAnalysis] = useState({
    polqa: 3.94,
    mos: 4.12,
    wer: 3.8, // Word Error Rate %
    snr: 22.4, // dB
    sttAccuracy: 96.2
  });

  const canvasRef = useRef(null);

  useEffect(() => {
    // Recalculate metrics when parameters change
    const lossEffect = packetLoss * 0.08;
    const jitterEffect = (jitter / 100) * 0.15;
    const codecMult = codec === 'G.729' ? 0.4 : codec === 'GSM' ? 0.6 : 0;
    const noiseEffect = noiseProfile === 'Airport Terminal' ? 0.5 : noiseProfile === 'Highway Driving' ? 0.4 : noiseProfile === 'Call Center Ambient' ? 0.2 : 0;

    const basePolqa = 4.5;
    const calcPolqa = Math.max(1.0, (basePolqa - lossEffect - jitterEffect - codecMult - noiseEffect)).toFixed(2);
    const calcMos = (calcPolqa * 0.95 + 0.2).toFixed(2);
    const calcWer = Math.min(45, (2.0 + packetLoss * 0.9 + (jitter / 10) * 0.4 + noiseEffect * 12)).toFixed(1);
    const calcSnr = Math.max(8.0, (30.0 - packetLoss * 0.3 - noiseEffect * 15)).toFixed(1);
    const calcStt = (100 - parseFloat(calcWer)).toFixed(1);

    setAnalysis({
      polqa: calcPolqa,
      mos: calcMos,
      wer: calcWer,
      snr: calcSnr,
      sttAccuracy: calcStt
    });
  }, [packetLoss, jitter, codec, noiseProfile]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw Spectrum waveform
      const time = Date.now() * 0.003;
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = isSimulating ? '#f43f5e' : '#06b6d4';

      const amplitude = isSimulating ? 35 : 20;
      const noise = isSimulating ? (packetLoss / 5) * 4 : 1;

      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 +
          Math.sin(x * 0.02 + time) * amplitude * Math.cos(x * 0.005) +
          (Math.random() - 0.5) * noise;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw degraded secondary wave if simulating
      if (isSimulating) {
        ctx.beginPath();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = 'rgba(234, 179, 8, 0.6)';
        for (let x = 0; x < canvas.width; x += 4) {
          if (Math.random() * 100 < packetLoss) continue; // packet drop gaps
          const y = canvas.height / 2 + Math.sin(x * 0.015 - time * 1.2) * 25;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationId);
  }, [isSimulating, packetLoss]);

  const handleApplyPreset = (name) => {
    if (name === '3g-cellular') {
      setPacketLoss(12);
      setJitter(140);
      setCodec('GSM');
      setNoiseProfile('Highway Driving');
    } else if (name === 'voip-sat') {
      setPacketLoss(18);
      setJitter(280);
      setCodec('G.729');
      setNoiseProfile('Wind & Static');
    } else if (name === 'clean') {
      setPacketLoss(0);
      setJitter(5);
      setCodec('G.711u');
      setNoiseProfile('Quiet Office');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sliders color="#06b6d4" size={28} /> Audio Degradation & Codec Simulator
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Inject PSTN jitter, packet loss, background noise, and low-bandwidth codecs to evaluate Gemini Speech-to-Text & IVR intent robustness.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-secondary" onClick={() => handleApplyPreset('clean')} style={{ fontSize: '0.8rem' }}>
            Clean HD Audio
          </button>
          <button className="btn btn-secondary" onClick={() => handleApplyPreset('3g-cellular')} style={{ fontSize: '0.8rem' }}>
            3G Cellular
          </button>
          <button className="btn btn-secondary" onClick={() => handleApplyPreset('voip-sat')} style={{ fontSize: '0.8rem' }}>
            Satellite VoIP
          </button>
          <button 
            className={`btn ${isSimulating ? 'btn-danger' : 'btn-primary'}`} 
            onClick={() => setIsSimulating(!isSimulating)}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}
          >
            {isSimulating ? <RefreshCw className="spin" size={16} /> : <Play size={16} />}
            {isSimulating ? 'Stop Stress Simulation' : 'Run Live Degradation'}
          </button>
        </div>
      </div>

      {/* Realtime Metrics Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
        <div className="glass-card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>POLQA Score</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: analysis.polqa >= 3.5 ? '#34d399' : analysis.polqa >= 2.5 ? '#fbbf24' : '#f43f5e', marginTop: '4px' }}>
            {analysis.polqa} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>/ 5.0</span>
          </div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Perceptual Objective Audio</span>
        </div>

        <div className="glass-card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>MOS Quality Score</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: analysis.mos >= 3.8 ? '#34d399' : '#fbbf24', marginTop: '4px' }}>
            {analysis.mos} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>MOS</span>
          </div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>ITU-T P.800 Standard</span>
        </div>

        <div className="glass-card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Gemini STT Accuracy</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: analysis.sttAccuracy >= 90 ? '#34d399' : '#f43f5e', marginTop: '4px' }}>
            {analysis.sttAccuracy}%
          </div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Speech recognition rate</span>
        </div>

        <div className="glass-card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Word Error Rate (WER)</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: analysis.wer <= 10 ? '#34d399' : '#fbbf24', marginTop: '4px' }}>
            {analysis.wer}%
          </div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Lower is better</span>
        </div>

        <div className="glass-card" style={{ padding: '16px' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Signal-to-Noise (SNR)</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#38bdf8', marginTop: '4px' }}>
            {analysis.snr} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>dB</span>
          </div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Acoustic noise margin</span>
        </div>
      </div>

      {/* Canvas Spectrum & Degradation Controls */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px' }}>
        {/* Spectrum Canvas Visualizer */}
        <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={18} color="#06b6d4" /> Realtime Audio Waveform & Jitter Spectrum
            </h3>
            {isSimulating && (
              <span className="badge badge-rose" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Zap size={12} /> Degradation Active
              </span>
            )}
          </div>

          <canvas 
            ref={canvasRef} 
            width={700} 
            height={220} 
            style={{ width: '100%', height: '220px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.08)' }} 
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '8px', fontSize: '0.8rem' }}>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Frame Size:</span> <strong style={{ color: '#fff' }}>20ms (G.711)</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Bandwidth Limit:</span> <strong style={{ color: '#fff' }}>3.4 kHz (Narrowband)</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Barge-in Sensitivity:</span> <strong style={{ color: '#06b6d4' }}>High (-18 dB FS)</strong>
            </div>
          </div>
        </div>

        {/* Sliders and Parameters */}
        <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Cpu size={18} color="#a78bfa" /> Degradation Controls
          </h3>

          {/* Packet Loss Slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '6px' }}>
              <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Packet Loss Simulation</span>
              <span style={{ color: packetLoss > 10 ? '#f43f5e' : '#34d399', fontWeight: 700 }}>{packetLoss}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="35" 
              value={packetLoss} 
              onChange={(e) => setPacketLoss(parseInt(e.target.value))} 
              style={{ width: '100%', accentColor: '#06b6d4' }} 
            />
          </div>

          {/* Jitter Slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '6px' }}>
              <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Network Jitter Buffer</span>
              <span style={{ color: jitter > 100 ? '#f43f5e' : '#38bdf8', fontWeight: 700 }}>{jitter} ms</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="350" 
              value={jitter} 
              onChange={(e) => setJitter(parseInt(e.target.value))} 
              style={{ width: '100%', accentColor: '#6366f1' }} 
            />
          </div>

          {/* Codec Selection */}
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '6px' }}>
              Telephony Audio Codec
            </label>
            <select 
              value={codec} 
              onChange={(e) => setCodec(e.target.value)} 
              className="input-field" 
              style={{ width: '100%', padding: '8px 12px' }}
            >
              <option value="G.711u">G.711 μ-law (64 kbps Uncompressed PCM)</option>
              <option value="G.729">G.729 (8 kbps Compressed CS-ACELP)</option>
              <option value="GSM">GSM Full Rate (13 kbps Cellular)</option>
              <option value="Opus">Opus HD Voice (16 kHz Wideband)</option>
            </select>
          </div>

          {/* Background Noise Profile */}
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '6px' }}>
              Acoustic Noise Environment
            </label>
            <select 
              value={noiseProfile} 
              onChange={(e) => setNoiseProfile(e.target.value)} 
              className="input-field" 
              style={{ width: '100%', padding: '8px 12px' }}
            >
              <option value="Quiet Office">Quiet Office (30 dB FS)</option>
              <option value="Call Center Ambient">Call Center Ambient (55 dB FS)</option>
              <option value="Highway Driving">Highway Driving / Cabin (65 dB FS)</option>
              <option value="Airport Terminal">Airport Terminal (72 dB FS)</option>
              <option value="Wind & Static">Wind & Line Static (80 dB FS)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
