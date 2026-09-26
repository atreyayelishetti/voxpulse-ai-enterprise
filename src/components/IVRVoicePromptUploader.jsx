import React, { useState } from 'react';
import { Upload, FileAudio, CheckCircle2 } from 'lucide-react';

export default function IVRVoicePromptUploader() {
  const [uploaded, setUploaded] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Upload color="#34d399" size={28} /> Custom Voice Prompt Audio Converter (G.711u 8kHz PCM)
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Upload raw audio files and automatically transcode them into PSTN-compliant 8kHz Mono G.711u WAV format.
          </p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '30px', textAlign: 'center', border: '2px dashed rgba(255,255,255,0.15)' }}>
        <FileAudio size={48} color="#34d399" style={{ opacity: 0.8, marginBottom: '12px' }} />
        <h3 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 700 }}>Drag & Drop Audio Files (MP3, WAV, OGG, FLAC)</h3>
        <button className="btn btn-primary" onClick={() => setUploaded(true)} style={{ marginTop: '14px' }}>
          Simulate Audio Conversion
        </button>
      </div>

      {uploaded && (
        <div className="glass-card" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span className="badge badge-emerald" style={{ marginBottom: '4px' }}>CONVERTED SUCCESSFULLY</span>
            <h4 style={{ color: '#fff', margin: 0 }}>greeting_prompt_g711u.wav</h4>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Format: 8000 Hz, 16-bit PCM Mono (64 kbps)</span>
          </div>
          <CheckCircle2 color="#34d399" size={28} />
        </div>
      )}
    </div>
  );
}
