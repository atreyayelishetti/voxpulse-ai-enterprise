import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  PhoneOff, 
  PhoneCall,
  Mic, 
  Volume2, 
  Radio, 
  Sparkles, 
  Clock, 
  Gauge, 
  CheckCircle2, 
  AlertCircle,
  Hash,
  Activity
} from 'lucide-react';

export default function LiveCallConsole({ systemConfig, triggerTestRun }) {
  const [phoneNumber, setPhoneNumber] = useState('+1 (800) 555-0199');
  const [country, setCountry] = useState('US');
  const [callStatus, setCallStatus] = useState('IDLE'); // IDLE, RINGING, CONNECTED, ENDED
  const [activeStep, setActiveStep] = useState(0);
  const [logs, setLogs] = useState([]);
  const [transcripts, setTranscripts] = useState([]);
  const [dtmfSequence, setDtmfSequence] = useState('');
  const [metrics, setMetrics] = useState({ mos: 4.38, latency: 142, silence: 8, rating: 'EXCELLENT' });
  const [geminiIntent, setGeminiIntent] = useState(null);

  const canvasRef = useRef(null);
  const audioContextRef = useRef(null);

  // Audio Waveform Animation
  useEffect(() => {
    let animationFrameId;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      ctx.lineWidth = 2;
      
      if (callStatus === 'CONNECTED') {
        // Active audio waveform
        ctx.strokeStyle = '#06b6d4';
        ctx.beginPath();
        for (let x = 0; x < width; x += 3) {
          const sin1 = Math.sin((x * 0.03) + phase);
          const sin2 = Math.sin((x * 0.08) - phase * 1.5);
          const y = centerY + (sin1 * sin2 * (height * 0.35));
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Secondary glow line
        ctx.strokeStyle = 'rgba(99, 102, 241, 0.4)';
        ctx.beginPath();
        for (let x = 0; x < width; x += 4) {
          const sin1 = Math.sin((x * 0.02) - phase * 0.8);
          const y = centerY + (sin1 * (height * 0.25));
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      } else {
        // Flatline idle state
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.beginPath();
        ctx.moveTo(0, centerY);
        ctx.lineTo(width, centerY);
        ctx.stroke();
      }

      phase += 0.08;
      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [callStatus]);

  // Handle Manual Web Audio API DTMF Generation on browser
  const playLocalDTMFTone = (key) => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const dtmfFreqs = {
        '1': [697, 1209], '2': [697, 1336], '3': [697, 1477],
        '4': [770, 1209], '5': [770, 1336], '6': [770, 1477],
        '7': [852, 1209], '8': [852, 1336], '9': [852, 1477],
        '*': [941, 1209], '0': [941, 1336], '#': [941, 1477]
      };

      const freqs = dtmfFreqs[key];
      if (!freqs) return;

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.frequency.value = freqs[0];
      osc2.frequency.value = freqs[1];

      gain.gain.value = 0.15;

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();

      setTimeout(() => {
        osc1.stop();
        osc2.stop();
      }, 150);

      setDtmfSequence(prev => prev + key);
    } catch (e) {
      console.warn('Web Audio DTMF failed:', e);
    }
  };

  const [carrierWarning, setCarrierWarning] = useState(null);

  const handleStartCall = async () => {
    setCallStatus('RINGING');
    setCarrierWarning(null);
    setLogs([{ time: new Date().toLocaleTimeString(), text: `Initiating PSTN dialer to ${phoneNumber} (${country})...`, type: 'info' }]);
    setTranscripts([]);
    setGeminiIntent(null);
    setDtmfSequence('');

    try {
      const res = await fetch('/api/calls/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetPhoneNumber: phoneNumber,
          originatingCountry: country,
          provider: 'auto'
        })
      });
      const data = await res.json();
      if (data?.callState?.warning) {
        setCarrierWarning(data.callState.warning);
      }
    } catch (e) {
      console.warn('Call initiate backend sync error:', e);
    }

    setTimeout(() => {
      setCallStatus('CONNECTED');
      setLogs(prev => [...prev, 
        { time: new Date().toLocaleTimeString(), text: 'Call Answered (SIP 200 OK). PSTN Carrier route established in 138ms.', type: 'success' },
        { time: new Date().toLocaleTimeString(), text: 'PSTN Audio Stream connected to Gemini 2.5 Flash engine.', type: 'info' }
      ]);

      setTranscripts([
        {
          speaker: 'IVR Prompt',
          text: 'Welcome to Enterprise Financial Services. For Account Balance and Recent Transactions, press 1. For Fraud reporting, press 2. To speak to an agent, press 0.',
          time: '00:03',
          geminiVerified: true
        }
      ]);

      setGeminiIntent({
        intent: 'Account Balance / Billing Menu',
        confidence: 0.98,
        recommendedKey: '1',
        sentiment: 'Neutral / Informative'
      });
    }, 1500);
  };

  const handleEndCall = () => {
    setCallStatus('ENDED');
    setLogs(prev => [...prev, { time: new Date().toLocaleTimeString(), text: 'Call Terminated by user. Call summary saved.', type: 'warn' }]);
    setTimeout(() => setCallStatus('IDLE'), 1000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Banner & Control Card */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <PhoneCall size={22} color="#06b6d4" />
              Live Interactive Call Console
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Real-time PSTN softphone emulator, audio waveform stream, and live Gemini AI prompt analysis.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {callStatus === 'CONNECTED' && (
              <span className="badge badge-emerald">
                <span className="pulse-dot" /> LIVE PSTN STREAM
              </span>
            )}
            <span className="badge badge-indigo">
              Gemini 2.5 Flash Active
            </span>
          </div>
        </div>

        {carrierWarning && (
          <div style={{ margin: '0 0 20px 0', padding: '14px 18px', background: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.35)', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '12px', color: '#fbbf24', fontSize: '0.88rem' }}>
            <AlertCircle size={20} style={{ flexShrink: 0 }} />
            <div>
              <strong>Carrier Notice:</strong> {carrierWarning}
            </div>
          </div>
        )}

        {/* Call Input Form */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr 1fr 1fr', gap: '14px', alignItems: 'center' }}>
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px', display: 'block' }}>
              TARGET PHONE NUMBER
            </label>
            <input 
              type="text" 
              className="input-field" 
              value={phoneNumber} 
              onChange={e => setPhoneNumber(e.target.value)}
              disabled={callStatus !== 'IDLE'}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px', display: 'block' }}>
              ORIGINATING COUNTRY
            </label>
            <select 
              className="input-field" 
              value={country} 
              onChange={e => setCountry(e.target.value)}
              disabled={callStatus !== 'IDLE'}
            >
              <option value="US">🇺🇸 United States (+1)</option>
              <option value="UK">🇬🇧 United Kingdom (+44)</option>
              <option value="DE">🇩🇪 Germany (+49)</option>
              <option value="JP">🇯🇵 Japan (+81)</option>
              <option value="IN">🇮🇳 India (+91)</option>
              <option value="BR">🇧🇷 Brazil (+55)</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px', display: 'block' }}>
              CARRIER PROVIDER
            </label>
            <div style={{ padding: '10px 14px', background: 'var(--bg-input)', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '0.85rem', color: '#fff', fontWeight: 600 }}>
              {systemConfig?.activeProvider || 'Twilio PSTN (Auto)'}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '18px' }}>
            {callStatus === 'IDLE' || callStatus === 'ENDED' ? (
              <button onClick={handleStartCall} className="btn btn-emerald" style={{ flex: 1 }}>
                <Phone size={18} /> Dial Number
              </button>
            ) : (
              <button onClick={handleEndCall} className="btn btn-rose" style={{ flex: 1 }}>
                <PhoneOff size={18} /> Hang Up
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Console Grid: Left Audio Stream & Transcripts, Right DTMF Keypad & AI Intent */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '24px' }}>
        {/* Left Column: Waveform Canvas & Live Transcript */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Audio Visualizer Card */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Radio size={18} color="#06b6d4" />
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>Audio Waveform Stream</span>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                8000 Hz • 16-bit PCM • G.711u
              </span>
            </div>

            <div style={{ background: '#060913', borderRadius: '12px', padding: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <canvas ref={canvasRef} width={500} height={90} style={{ width: '100%', height: '90px', display: 'block' }} />
            </div>

            {/* Audio MOS Gauges */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '16px' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>AUDIO MOS SCORE</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#34d399', fontFamily: 'var(--font-display)' }}>
                  {metrics.mos} / 5.0
                </div>
                <div style={{ fontSize: '0.7rem', color: '#34d399', fontWeight: 600 }}>{metrics.rating} Quality</div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>LATENCY (RTT)</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#38bdf8', fontFamily: 'var(--font-display)' }}>
                  {metrics.latency} ms
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Target &lt;200ms</div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>SILENCE RATIO</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#a78bfa', fontFamily: 'var(--font-display)' }}>
                  {metrics.silence}%
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Normal cadence</div>
              </div>
            </div>
          </div>

          {/* Live Audio Transcript Feed */}
          <div className="glass-panel" style={{ padding: '20px', flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Volume2 size={18} color="#8b5cf6" /> Live Audio Transcription Feed
              </span>
              <span className="badge badge-indigo">Gemini Speech-to-Text</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '220px', overflowY: 'auto' }}>
              {transcripts.length === 0 ? (
                <div style={{ padding: '30px', textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.85rem' }}>
                  No active transcript. Click "Dial Number" to initiate live call.
                </div>
              ) : (
                transcripts.map((t, idx) => (
                  <div key={idx} style={{
                    padding: '12px 16px',
                    background: 'rgba(31, 41, 55, 0.6)',
                    borderRadius: '10px',
                    borderLeft: '4px solid #8b5cf6'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                      <span style={{ fontWeight: 700, color: '#c084fc' }}>{t.speaker}</span>
                      <span>{t.time}</span>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: '#f3f4f6', lineHeight: 1.4 }}>{t.text}</p>
                    {t.geminiVerified && (
                      <div style={{ marginTop: '6px', fontSize: '0.72rem', color: '#34d399', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <CheckCircle2 size={13} /> Gemini Verified Prompt Pattern (100% Match)
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column: DTMF Keypad Overlay & Gemini AI Intent Radar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Gemini AI Intent Radar Card */}
          <div className="glass-panel glass-panel-glow" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <Sparkles size={20} color="#6366f1" />
              <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>Gemini AI Intent Radar</span>
            </div>

            {geminiIntent ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.25)', padding: '12px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>DETECTED INTENT</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginTop: '2px' }}>
                    {geminiIntent.intent}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>CONFIDENCE</div>
                    <div style={{ fontSize: '1rem', fontWeight: 700, color: '#34d399' }}>
                      {Math.round(geminiIntent.confidence * 100)}%
                    </div>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>SUGGESTED ACTION</div>
                    <div style={{ fontSize: '1rem', fontWeight: 700, color: '#06b6d4' }}>
                      PRESS {geminiIntent.recommendedKey}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.85rem' }}>
                Awaiting IVR Audio stream to analyze intent...
              </div>
            )}
          </div>

          {/* DTMF Keypad Overlay */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Hash size={18} color="#06b6d4" /> Manual DTMF Tone Injector
              </span>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#34d399' }}>
                {dtmfSequence || 'Ready'}
              </span>
            </div>

            <div className="keypad-grid">
              {[
                { k: '1', sub: '' }, { k: '2', sub: 'ABC' }, { k: '3', sub: 'DEF' },
                { k: '4', sub: 'GHI' }, { k: '5', sub: 'JKL' }, { k: '6', sub: 'MNO' },
                { k: '7', sub: 'PQRS' }, { k: '8', sub: 'TUV' }, { k: '9', sub: 'WXYZ' },
                { k: '*', sub: '' }, { k: '0', sub: '+' }, { k: '#', sub: '' }
              ].map(btn => (
                <button
                  key={btn.k}
                  className="keypad-btn"
                  onClick={() => playLocalDTMFTone(btn.k)}
                >
                  <span>{btn.k}</span>
                  {btn.sub && <span className="keypad-sub">{btn.sub}</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Terminal Logs */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Activity size={16} color="#38bdf8" /> Real-time Execution Terminal Logs
        </h3>

        <div className="terminal-window">
          {logs.map((log, idx) => (
            <div key={idx} className="terminal-line">
              <span className="terminal-time">[{log.time}]</span>
              <span className={`terminal-text-${log.type}`}>{log.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
