import React from 'react';
import { Cpu, RefreshCw } from 'lucide-react';

export default function VoIPCodecTranscoder() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Cpu color="#38bdf8" size={28} /> Realtime G.711u to Opus Codec Transcoder Engine
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Transcode PSTN narrowband G.711u audio streams into WebRTC Opus HD wideband media.
          </p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '24px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Input Codec</span>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#38bdf8', marginTop: '4px' }}>G.711u (8kHz PCM)</div>
        </div>
        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Output Transcoded Codec</span>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#34d399', marginTop: '4px' }}>Opus HD (16kHz)</div>
        </div>
        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Transcoding Latency</span>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#a78bfa', marginTop: '4px' }}>&lt; 4 ms</div>
        </div>
      </div>
    </div>
  );
}
