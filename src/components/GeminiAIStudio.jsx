import React, { useState } from 'react';
import { 
  Sparkles, 
  Languages, 
  UserCheck, 
  Sliders, 
  Play, 
  CheckCircle2, 
  Bot,
  BrainCircuit,
  MessageSquare
} from 'lucide-react';

export default function GeminiAIStudio({ systemConfig }) {
  const [promptInput, setPromptInput] = useState('Welcome to Acme Enterprise Financial. Press 1 for Account Balance, press 2 for Claims, or say representative.');
  const [expectedText, setExpectedText] = useState('Welcome to Acme');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Translation playground
  const [translateInput, setTranslateInput] = useState('Gracias por llamar a Banco Central. Para saldo presione 1.');
  const [sourceLang, setSourceLang] = useState('es-ES');
  const [translationResult, setTranslationResult] = useState(null);

  // Persona selector
  const [activePersona, setActivePersona] = useState('standard');

  const handleRunAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/gemini/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          promptTranscript: promptInput,
          currentStep: 'Studio Live Sandbox',
          expectedPrompt: expectedText
        })
      });
      const data = await res.json();
      setAnalysisResult(data.analysis);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRunTranslate = async () => {
    try {
      const res = await fetch('/api/gemini/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          promptTranscript: translateInput,
          sourceLanguage: sourceLang
        })
      });
      const data = await res.json();
      setTranslationResult(data.result);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header Banner */}
      <div className="glass-panel glass-panel-glow" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <BrainCircuit size={24} color="#6366f1" />
              Gemini AI Intelligence & Model Studio
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Fine-tune Gemini 2.0 Flash prompt intent parsing, multi-lingual audio verification, and AI caller persona sound profiles.
            </p>
          </div>

          <span className="badge badge-indigo" style={{ padding: '6px 12px' }}>
            Gemini 2.0 Flash Multimodal Live
          </span>
        </div>
      </div>

      {/* Main Grid: Prompt Analysis Playground & Multi-Language Auditor */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px' }}>
        {/* Left: Prompt Analysis Sandbox */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} color="#06b6d4" /> Gemini Prompt Intent Sandbox
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px', display: 'block' }}>
                IVR AUDIO PROMPT TRANSCRIPT (HEARD OVER CALL)
              </label>
              <textarea 
                className="input-field" 
                rows={3} 
                value={promptInput} 
                onChange={e => setPromptInput(e.target.value)}
                style={{ resize: 'vertical' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px', display: 'block' }}>
                EXPECTED PATTERN / KEYWORD MATCH
              </label>
              <input 
                type="text" 
                className="input-field" 
                value={expectedText} 
                onChange={e => setExpectedText(e.target.value)} 
              />
            </div>

            <button onClick={handleRunAnalysis} className="btn btn-primary" disabled={isAnalyzing}>
              {isAnalyzing ? 'Analyzing with Gemini...' : 'Run Gemini Prompt Analysis'}
            </button>

            {/* Output Card */}
            {analysisResult && (
              <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '12px', padding: '16px', marginTop: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#818cf8' }}>ANALYSIS RESULT</span>
                  <span className="badge badge-emerald">
                    {Math.round(analysisResult.confidenceScore * 100)}% Confidence
                  </span>
                </div>

                <div style={{ fontSize: '0.9rem', color: '#fff', fontWeight: 700, marginBottom: '6px' }}>
                  Detected Intent: {analysisResult.detectedIntent}
                </div>

                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
                  Suggested Action: <strong style={{ color: '#38bdf8' }}>{analysisResult.suggestedNextAction}</strong>
                </div>

                <div style={{ fontSize: '0.78rem', color: '#9ca3af' }}>
                  Extracted Menu Options:
                  <ul style={{ paddingLeft: '18px', marginTop: '4px' }}>
                    {analysisResult.extractedOptions?.map((opt, idx) => (
                      <li key={idx}>{opt}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: AI Caller Persona Simulator & Multi-Lingual Engine */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* AI Caller Persona Selector */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Bot size={18} color="#8b5cf6" /> AI Caller Persona Sound Profiles
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {[
                { id: 'standard', name: 'Standard PSTN Caller', desc: 'Clear audio, neutral speed' },
                { id: 'noisy', name: 'Noisy Background', desc: 'Street noise + low SNR' },
                { id: 'frustrated', name: 'Frustrated Customer', desc: 'Fast speech, interrupts prompts' },
                { id: 'accented', name: 'Non-Native Accent', desc: 'Varied pronunciation' }
              ].map(p => (
                <div
                  key={p.id}
                  onClick={() => setActivePersona(p.id)}
                  style={{
                    padding: '12px',
                    borderRadius: '10px',
                    background: activePersona === p.id ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255,255,255,0.03)',
                    border: activePersona === p.id ? '1px solid #8b5cf6' : '1px solid var(--border-color)',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>{p.name}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{p.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Multi-lingual IVR Verification */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Languages size={18} color="#34d399" /> Multi-Lingual IVR Auditor
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input 
                type="text" 
                className="input-field" 
                value={translateInput} 
                onChange={e => setTranslateInput(e.target.value)} 
              />

              <div style={{ display: 'flex', gap: '10px' }}>
                <select className="input-field" value={sourceLang} onChange={e => setSourceLang(e.target.value)} style={{ flex: 1 }}>
                  <option value="es-ES">Spanish (es-ES)</option>
                  <option value="fr-FR">French (fr-FR)</option>
                  <option value="de-DE">German (de-DE)</option>
                  <option value="ja-JP">Japanese (ja-JP)</option>
                  <option value="pt-BR">Portuguese (pt-BR)</option>
                </select>

                <button onClick={handleRunTranslate} className="btn btn-secondary" style={{ fontSize: '0.8rem' }}>
                  Verify
                </button>
              </div>

              {translationResult && (
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '8px', fontSize: '0.8rem', color: '#34d399' }}>
                  ✓ Translation: "{translationResult.translatedText}" (Accuracy {translationResult.accuracyScore || 98}%)
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
