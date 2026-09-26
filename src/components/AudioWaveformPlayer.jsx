import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Download, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Clock, 
  AlertTriangle,
  Radio,
  FileAudio
} from 'lucide-react';

export default function AudioWaveformPlayer({ recordingId = 'rec_1092', transcript = 'Welcome to Acme Enterprise Financial. Press 1 for Account Balance, press 2 for Claims.' }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const duration = 4.5; // 4.5 seconds sample
  const canvasRef = useRef(null);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.1;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Draw waveform bars
    const barWidth = 4;
    const gap = 2;
    const totalBars = Math.floor(width / (barWidth + gap));
    const progressPercent = currentTime / duration;

    for (let i = 0; i < totalBars; i++) {
      const x = i * (barWidth + gap);
      const isPlayed = i / totalBars <= progressPercent;

      // Highlight silence region between 25% and 35%
      const isSilenceRegion = i >= totalBars * 0.25 && i <= totalBars * 0.35;

      const barHeight = isSilenceRegion 
        ? 4 
        : Math.max(6, Math.sin(i * 0.2) * (height * 0.4) + Math.random() * 15);

      const y = (height - barHeight) / 2;

      if (isSilenceRegion) {
        ctx.fillStyle = '#f59e0b'; // Amber silence warning
      } else if (isPlayed) {
        ctx.fillStyle = '#6366f1'; // Played indigo
      } else {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'; // Unplayed gray
      }

      ctx.fillRect(x, y, barWidth, barHeight);
    }
  }, [currentTime]);

  return (
    <div className="glass-panel" style={{ padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FileAudio size={18} color="#06b6d4" />
          <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>Call Audio Waveform Recording</span>
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
          ID: {recordingId} • 8000Hz PCM G.711u
        </span>
      </div>

      {/* Waveform Canvas */}
      <div style={{ background: '#060913', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '16px' }}>
        <canvas ref={canvasRef} width={600} height={70} style={{ width: '100%', height: '70px', display: 'block' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: '8px' }}>
          <span>00:00.{Math.floor(currentTime * 10)}</span>
          <span style={{ color: '#f59e0b' }}>⚠️ Silence Detected (00:01.2 - 00:01.5)</span>
          <span>00:04.5</span>
        </div>
      </div>

      {/* Controls & Transcript */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => setIsPlaying(!isPlaying)} className="btn btn-primary" style={{ padding: '8px 16px' }}>
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          {isPlaying ? 'Pause Audio' : 'Play Recording'}
        </button>

        <div style={{ flex: 1, margin: '0 20px', fontSize: '0.82rem', color: '#d1d5db', fontStyle: 'italic' }}>
          "{transcript}"
        </div>

        <a 
          href="/api/dtmf/wav?digit=1" 
          download={`Recording_${recordingId}.wav`}
          className="btn btn-secondary"
          style={{ fontSize: '0.78rem', padding: '6px 12px' }}
        >
          <Download size={14} /> Download WAV
        </a>
      </div>
    </div>
  );
}
