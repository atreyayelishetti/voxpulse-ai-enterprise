import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';

export default function IVRAudioVolumeNormalizer() {
  const [lufsTarget, setLufsTarget] = useState(-16);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Volume2 color="#06b6d4" size={28} /> EBU R128 IVR Audio Loudness & LUFS Normalizer
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Normalize IVR voice prompt volumes to prevent sudden volume spikes between dynamic prompts.
          </p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '24px' }}>
        <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Target Integrated Loudness (LUFS)</label>
        <div style={{ fontSize: '2rem', fontWeight: 800, color: '#34d399', margin: '8px 0' }}>{lufsTarget} LUFS</div>
        <input type="range" min="-24" max="-10" value={lufsTarget} onChange={(e) => setLufsTarget(parseInt(e.target.value))} style={{ width: '100%', accentColor: '#34d399' }} />
      </div>
    </div>
  );
}
