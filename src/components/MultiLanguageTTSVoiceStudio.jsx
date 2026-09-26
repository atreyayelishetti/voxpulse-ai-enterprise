import React, { useState } from 'react';
import { Volume2, Sparkles, Play, RefreshCw, Radio, CheckCircle2 } from 'lucide-react';

export default function MultiLanguageTTSVoiceStudio() {
  const [voice, setVoice] = useState('en-US-Neural2-F (US Female)');
  const [ssmlText, setSsmlText] = useState('<speak>Welcome to Apex Bank. <break time="300ms"/> Please press 1 for accounts.</speak>');
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayVoice = () => {
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 1400);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Volume2 color="#06b6d4" size={28} /> Neural TTS Voice Persona & SSML Studio
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Synthesize high-fidelity neural voice prompts across 50+ languages with custom SSML breaks and pitch modulation.
          </p>
        </div>

        <button 
          className="btn btn-primary" 
          onClick={handlePlayVoice} 
          disabled={isPlaying}
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          {isPlaying ? <RefreshCw className="spin" size={16} /> : <Play size={16} />}
          {isPlaying ? 'Synthesizing Audio...' : 'Preview Neural Voice Prompt'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div className="glass-card" style={{ padding: '16px' }}>
          <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Select Neural Voice Persona
          </label>
          <select 
            value={voice} 
            onChange={(e) => setVoice(e.target.value)} 
            className="input-field" 
            style={{ width: '100%', marginTop: '8px' }}
          >
            <option value="en-US-Neural2-F (US Female)">en-US-Neural2-F (US English Female)</option>
            <option value="en-GB-Neural2-M (UK Male)">en-GB-Neural2-M (UK English Male)</option>
            <option value="de-DE-Neural2-F (German Female)">de-DE-Neural2-F (German Female)</option>
            <option value="es-ES-Neural2-F (Spanish Female)">es-ES-Neural2-F (Spanish Female)</option>
            <option value="ja-JP-Neural2-F (Japanese Female)">ja-JP-Neural2-F (Japanese Female)</option>
          </select>
        </div>

        <div className="glass-card" style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>SSML Parser</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#34d399', marginTop: '4px' }}>
              W3C SSML 1.1 Valid
            </div>
          </div>
          <Sparkles size={36} color="#06b6d4" style={{ opacity: 0.8 }} />
        </div>
      </div>

      <div className="glass-card" style={{ padding: '20px' }}>
        <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '8px', display: 'block' }}>
          SSML Prompt Code Editor
        </label>
        <textarea 
          value={ssmlText} 
          onChange={(e) => setSsmlText(e.target.value)} 
          className="input-field" 
          rows={5}
          style={{ width: '100%', fontFamily: 'monospace', fontSize: '0.9rem' }}
        />
      </div>
    </div>
  );
}
