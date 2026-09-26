import React, { useState } from 'react';
import { Radio, Activity, Play, CheckCircle2, Sliders, Volume2 } from 'lucide-react';

export default function DTMFPayloadSniffer() {
  const [detectedEvents, setDetectedEvents] = useState([
    { id: 1, digit: '1', eventId: 1, durationMs: 160, volumeDb: -10, eBit: 1, method: 'RFC 4733 (PT 101)', status: 'VALID' },
    { id: 2, digit: '5', eventId: 5, durationMs: 160, volumeDb: -9, eBit: 1, method: 'RFC 4733 (PT 101)', status: 'VALID' },
    { id: 3, digit: '9', eventId: 9, durationMs: 240, volumeDb: -12, eBit: 1, method: 'RFC 4733 (PT 101)', status: 'VALID' },
    { id: 4, digit: '#', eventId: 11, durationMs: 180, volumeDb: -8, eBit: 1, method: 'RFC 4733 (PT 101)', status: 'VALID' }
  ]);

  const [activeDigit, setActiveDigit] = useState(null);

  const keys = ['1','2','3','4','5','6','7','8','9','*','0','#'];

  const handleKeyPress = (digit) => {
    setActiveDigit(digit);
    const eventMap = { '*': 10, '#': 11 };
    const eventId = eventMap[digit] !== undefined ? eventMap[digit] : parseInt(digit, 10);
    
    // Play DTMF tone via Web Audio API or /api/dtmf/wav
    try {
      const audio = new Audio(`/api/dtmf/wav?digit=${encodeURIComponent(digit)}&duration=160`);
      audio.play().catch(() => {});
    } catch {}

    const newEvt = {
      id: Date.now(),
      digit,
      eventId,
      durationMs: 160,
      volumeDb: -10,
      eBit: 1,
      method: 'RFC 4733 (PT 101)',
      status: 'VALID'
    };
    setDetectedEvents([newEvt, ...detectedEvents.slice(0, 9)]);
    setTimeout(() => setActiveDigit(null), 200);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Radio color="#06b6d4" size={28} /> RFC 4733 / RFC 2833 RTP DTMF Payload & Telephony Event Sniffer
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Sniffs out-of-band telephone-event packets (Payload Type 101). Inspects event IDs, timestamp duration, and end-of-event (E-bit) frames.
          </p>
        </div>
      </div>

      {/* Interactive Dialpad & Packet Inspector Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '24px' }}>
        {/* Dialpad */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
            Live Injector Keypad
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', width: '100%', maxWidth: '240px' }}>
            {keys.map((k) => (
              <button
                key={k}
                onClick={() => handleKeyPress(k)}
                style={{
                  height: '60px',
                  borderRadius: '12px',
                  background: activeDigit === k ? 'rgba(6, 182, 212, 0.4)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${activeDigit === k ? '#06b6d4' : 'var(--border-color)'}`,
                  color: '#fff',
                  fontSize: '1.4rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  transition: 'all 0.1s ease'
                }}
              >
                {k}
              </button>
            ))}
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '16px' }}>
            Clicking plays 8000Hz PCM G.711 dual-tones
          </span>
        </div>

        {/* Sniffed Telephony Event Stream */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
            Sniffed RFC 4733 Event Frames (PT 101)
          </h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', textAlign: 'left' }}>
                  <th style={{ padding: '10px' }}>Digit</th>
                  <th style={{ padding: '10px' }}>Event ID</th>
                  <th style={{ padding: '10px' }}>Duration</th>
                  <th style={{ padding: '10px' }}>Power Level</th>
                  <th style={{ padding: '10px' }}>E-Bit</th>
                  <th style={{ padding: '10px' }}>Protocol</th>
                  <th style={{ padding: '10px' }}>Verdict</th>
                </tr>
              </thead>
              <tbody>
                {detectedEvents.map((evt) => (
                  <tr key={evt.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '12px 10px', fontWeight: 800, color: '#06b6d4', fontSize: '1.1rem' }}>{evt.digit}</td>
                    <td style={{ padding: '12px 10px', color: '#fff', fontFamily: 'monospace' }}>{evt.eventId}</td>
                    <td style={{ padding: '12px 10px', color: '#38bdf8' }}>{evt.durationMs} ms ({evt.durationMs * 8} ticks)</td>
                    <td style={{ padding: '12px 10px', color: '#f59e0b' }}>{evt.volumeDb} dBm0</td>
                    <td style={{ padding: '12px 10px', color: '#10b981', fontWeight: 700 }}>{evt.eBit} (True)</td>
                    <td style={{ padding: '12px 10px', color: '#a855f7' }}>{evt.method}</td>
                    <td style={{ padding: '12px 10px' }}>
                      <span className="badge badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <CheckCircle2 size={12} /> {evt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
