import React, { useState } from 'react';
import { UploadCloud, FileAudio, CheckCircle2, Play, Volume2, Music, Trash2, ArrowUpRight } from 'lucide-react';

export default function IVRVoicePromptUploader() {
  const [prompts, setPrompts] = useState([
    { id: 1, name: 'enterprise_greeting_v3.wav', duration: '4.8s', format: 'G.711u 8kHz Mono', size: '38.4 KB', lufs: -16.2, language: 'en-US', status: 'DEPLOYED' },
    { id: 2, name: 'spanish_routing_menu.wav', duration: '6.2s', format: 'G.711u 8kHz Mono', size: '49.6 KB', lufs: -15.9, language: 'es-MX', status: 'DEPLOYED' },
    { id: 3, name: 'pin_retry_exhausted.wav', duration: '3.1s', format: 'G.711u 8kHz Mono', size: '24.8 KB', lufs: -16.0, language: 'en-US', status: 'STAGED' }
  ]);

  const [isUploading, setIsUploading] = useState(false);
  const [newPromptName, setNewPromptName] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');

  const handleSimulateUpload = (e) => {
    e.preventDefault();
    if (!newPromptName) return;
    setIsUploading(true);
    setTimeout(() => {
      setPrompts([
        {
          id: Date.now(),
          name: newPromptName.endsWith('.wav') ? newPromptName : `${newPromptName}.wav`,
          duration: '5.2s',
          format: 'G.711u 8kHz Mono (Auto-Transcoded)',
          size: '41.6 KB',
          lufs: -16.0,
          language: selectedLanguage,
          status: 'STAGED'
        },
        ...prompts
      ]);
      setNewPromptName('');
      setIsUploading(false);
    }, 600);
  };

  const handleDelete = (id) => {
    setPrompts(prompts.filter(p => p.id !== id));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <UploadCloud color="#06b6d4" size={28} /> IVR Voice Prompt Transcoder & Carrier Deployment Hub
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Upload raw studio master audio files. Automatically resamples to 8000Hz 16-bit PCM G.711u mono and deploys across edge SBCs.
          </p>
        </div>
      </div>

      {/* Upload Zone & Form */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <form onSubmit={handleSimulateUpload} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ 
            border: '2px dashed var(--border-color)', 
            borderRadius: '8px', 
            padding: '32px', 
            textAlign: 'center',
            background: 'rgba(0,0,0,0.2)',
            cursor: 'pointer'
          }}>
            <FileAudio size={42} color="#06b6d4" style={{ margin: '0 auto 12px' }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>Drag & Drop Master Audio (WAV / MP3 / FLAC)</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Files are automatically normalized to -16 LUFS and converted to CCITT G.711 µ-law mono.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr auto', gap: '16px', alignItems: 'flex-end' }}>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                Prompt Identifier / File Label
              </label>
              <input 
                type="text" 
                placeholder="e.g. credit_card_activation_step1.wav"
                value={newPromptName}
                onChange={(e) => setNewPromptName(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', background: 'rgba(0,0,0,0.4)', color: '#fff', border: '1px solid var(--border-color)', borderRadius: '6px' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                Audio Spoken Language
              </label>
              <select 
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', background: 'rgba(0,0,0,0.4)', color: '#fff', border: '1px solid var(--border-color)', borderRadius: '6px' }}
              >
                <option value="en-US">English (United States)</option>
                <option value="es-MX">Spanish (Mexico)</option>
                <option value="fr-CA">French (Canada)</option>
                <option value="de-DE">German (Germany)</option>
                <option value="ja-JP">Japanese (Japan)</option>
              </select>
            </div>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isUploading || !newPromptName}
              style={{ padding: '10px 20px', height: '42px' }}
            >
              {isUploading ? 'Transcoding PCM...' : 'Transcode & Stage'}
            </button>
          </div>
        </form>
      </div>

      {/* Prompts Catalog Table */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
          Active SBC Edge Prompt Media Library
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', textAlign: 'left' }}>
                <th style={{ padding: '10px' }}>Prompt Name</th>
                <th style={{ padding: '10px' }}>Duration</th>
                <th style={{ padding: '10px' }}>Target Codec</th>
                <th style={{ padding: '10px' }}>EBU LUFS</th>
                <th style={{ padding: '10px' }}>Language</th>
                <th style={{ padding: '10px' }}>Deployment Status</th>
                <th style={{ padding: '10px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {prompts.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 10px', fontWeight: 600, color: '#fff' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Volume2 size={16} color="#06b6d4" />
                      {p.name}
                    </div>
                  </td>
                  <td style={{ padding: '12px 10px', color: '#94a3b8' }}>{p.duration}</td>
                  <td style={{ padding: '12px 10px', color: '#38bdf8' }}>{p.format}</td>
                  <td style={{ padding: '12px 10px', color: '#10b981' }}>{p.lufs} LUFS</td>
                  <td style={{ padding: '12px 10px', color: '#a855f7' }}>{p.language}</td>
                  <td style={{ padding: '12px 10px' }}>
                    <span className={`badge ${p.status === 'DEPLOYED' ? 'badge-emerald' : 'badge-amber'}`}>
                      {p.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 10px', textAlign: 'right' }}>
                    <button 
                      onClick={() => handleDelete(p.id)} 
                      style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px' }}
                      title="Delete Prompt"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
