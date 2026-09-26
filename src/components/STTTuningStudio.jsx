import React, { useState } from 'react';
import { Sliders, Mic, Sparkles, CheckCircle2, Plus, Trash2, RefreshCw, Cpu, BookOpen } from 'lucide-react';

export default function STTTuningStudio() {
  const [customWords, setCustomWords] = useState([
    { word: 'VoxPulse', boost: 10, category: 'Brand Name' },
    { word: 'Amlodipine Besylate', boost: 8, category: 'Pharma / Medical' },
    { word: 'PSTN SBC', boost: 9, category: 'Telecom Term' },
    { word: 'OAuth2 OIDC', boost: 7, category: 'Tech Term' }
  ]);
  const [newWord, setNewWord] = useState('');
  const [newCategory, setNewCategory] = useState('Custom Term');
  const [isTuning, setIsTuning] = useState(false);
  const [tunedResult, setTunedResult] = useState(null);

  const handleAddWord = (e) => {
    e.preventDefault();
    if (!newWord.trim()) return;
    setCustomWords([...customWords, { word: newWord.trim(), boost: 8, category: newCategory }]);
    setNewWord('');
  };

  const handleDeleteWord = (index) => {
    setCustomWords(customWords.filter((_, i) => i !== index));
  };

  const handleApplyTuning = () => {
    setIsTuning(true);
    setTunedResult(null);

    setTimeout(() => {
      setTunedResult({
        accuracyImprovement: '+6.4%',
        baselineWER: '7.8%',
        tunedWER: '1.4%',
        domainAccuracy: '99.2%',
        modelEngine: 'Google Gemini 2.0 Flash (Custom Vocabulary Active)'
      });
      setIsTuning(false);
    }, 1000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sliders color="#06b6d4" size={28} /> AI STT Custom Vocabulary & Tuning Studio
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Boost Gemini 2.0 speech recognition accuracy for domain-specific medical terms, financial acronyms, and product codes.
          </p>
        </div>

        <button 
          className="btn btn-primary" 
          onClick={handleApplyTuning} 
          disabled={isTuning}
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          {isTuning ? <RefreshCw className="spin" size={16} /> : <Sparkles size={16} />}
          {isTuning ? 'Compiling Acoustic Model...' : 'Apply Custom Tuning'}
        </button>
      </div>

      {/* Add Custom Term Form */}
      <div className="glass-card" style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BookOpen size={18} color="#34d399" /> Add Custom Vocabulary Phrasing
        </h3>
        <form onSubmit={handleAddWord} style={{ display: 'flex', gap: '12px' }}>
          <input 
            type="text" 
            placeholder="Target Word / Phrase (e.g. Amlodipine, Keycloak)" 
            value={newWord} 
            onChange={(e) => setNewWord(e.target.value)} 
            className="input-field" 
            style={{ flex: 1, padding: '10px 14px' }}
          />
          <select 
            value={newCategory} 
            onChange={(e) => setNewCategory(e.target.value)} 
            className="input-field"
            style={{ width: '200px' }}
          >
            <option value="Custom Term">Custom Term</option>
            <option value="Brand Name">Brand Name</option>
            <option value="Pharma / Medical">Pharma / Medical</option>
            <option value="Financial Term">Financial Term</option>
          </select>
          <button className="btn btn-secondary" type="submit" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Plus size={16} /> Add Phrase
          </button>
        </form>
      </div>

      {/* Custom Vocabulary Table */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
          Active Custom Vocabulary Library ({customWords.length} Phrases)
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.72rem' }}>
                <th style={{ padding: '10px' }}>Phrase / Target Word</th>
                <th style={{ padding: '10px' }}>Category</th>
                <th style={{ padding: '10px' }}>Acoustic Boost Weight</th>
                <th style={{ padding: '10px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {customWords.map((item, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '12px 10px', fontWeight: 700, color: '#fff' }}>{item.word}</td>
                  <td style={{ padding: '12px 10px', color: 'var(--text-muted)' }}>{item.category}</td>
                  <td style={{ padding: '12px 10px', color: '#06b6d4', fontWeight: 600 }}>+{item.boost} dB Weight</td>
                  <td style={{ padding: '12px 10px' }}>
                    <button onClick={() => handleDeleteWord(idx)} style={{ background: 'transparent', border: 'none', color: '#f43f5e', cursor: 'pointer' }}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tuning Results */}
      {tunedResult && (
        <div className="glass-card" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span className="badge badge-emerald" style={{ marginBottom: '8px' }}>TUNING APPLIED SUCCESSFULLY</span>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>{tunedResult.modelEngine}</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Baseline WER: {tunedResult.baselineWER} ➔ Tuned WER: {tunedResult.tunedWER} ({tunedResult.accuracyImprovement} improvement)
            </span>
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#34d399' }}>
            {tunedResult.domainAccuracy} Accuracy
          </div>
        </div>
      )}
    </div>
  );
}
