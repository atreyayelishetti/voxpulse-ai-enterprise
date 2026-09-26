import React, { useState } from 'react';
import { Sliders, ArrowRight, CheckCircle2, AlertTriangle, ShieldCheck, RefreshCw } from 'lucide-react';

export default function SIPSDPCodecNegotiation() {
  const [callerCodecs, setCallerCodecs] = useState(['Opus', 'G.722', 'G.711u', 'telephone-event']);
  const [carrierCodecs, setCarrierCodecs] = useState(['G.711u', 'G.729', 'telephone-event']);

  const allAvailable = ['Opus', 'G.722', 'G.711u', 'G.711a', 'G.729', 'AMR-WB', 'telephone-event'];

  const toggleCaller = (c) => {
    setCallerCodecs(callerCodecs.includes(c) ? callerCodecs.filter(x => x !== c) : [...callerCodecs, c]);
  };

  const toggleCarrier = (c) => {
    setCarrierCodecs(carrierCodecs.includes(c) ? carrierCodecs.filter(x => x !== c) : [...carrierCodecs, c]);
  };

  // Find intersection honoring caller's priority order
  const negotiated = callerCodecs.filter(c => carrierCodecs.includes(c) && c !== 'telephone-event');
  const dtmfNegotiated = callerCodecs.includes('telephone-event') && carrierCodecs.includes('telephone-event');
  const selectedAudioCodec = negotiated[0] || null;
  const isMismatch = !selectedAudioCodec;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sliders color="#06b6d4" size={28} /> RFC 3264 SDP Offer & Answer Codec Negotiation Studio
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Simulate SDP media intersection matching. Tests codec preference ordering and prevents SIP 488 Not Acceptable Here call drops.
          </p>
        </div>
        <span className={`badge ${isMismatch ? 'badge-rose' : 'badge-emerald'}`}>
          {isMismatch ? 'SIP 488 Not Acceptable Here' : 'SDP 200 OK Negotiated'}
        </span>
      </div>

      {/* Negotiation Result Banner */}
      <div className="glass-card" style={{ padding: '24px', background: isMismatch ? 'rgba(239, 68, 68, 0.08)' : 'rgba(16, 185, 129, 0.08)', borderColor: isMismatch ? '#ef4444' : '#10b981' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: isMismatch ? '#ef4444' : '#10b981' }}>
              {isMismatch ? 'CRITICAL NEGOTIATION FAILURE' : 'ACTIVE AUDIO MEDIA STREAM ESTABLISHED'}
            </span>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', marginTop: '4px' }}>
              {isMismatch ? 'No Common Audio Codec Found' : `Negotiated Primary Audio: ${selectedAudioCodec}`}
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              {isMismatch 
                ? 'Carrier SBC rejected INVITE with SIP 488 (Warning: 304 "Incompatible network address/media format").' 
                : `DTMF Relay: ${dtmfNegotiated ? 'RFC 4733 telephone-event (PT 101)' : 'In-band Audio Tone Fallback'}`}
            </p>
          </div>
        </div>
      </div>

      {/* Codec Toggle Columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
            UAC (Caller) SDP Offer Codec List
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '16px' }}>Ordered by client priority</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {allAvailable.map((c) => {
              const active = callerCodecs.includes(c);
              return (
                <div 
                  key={c}
                  onClick={() => toggleCaller(c)}
                  style={{ 
                    padding: '10px 14px', 
                    borderRadius: '6px', 
                    background: active ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${active ? '#06b6d4' : 'var(--border-color)'}`,
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span style={{ fontWeight: 600, color: active ? '#fff' : 'var(--text-muted)' }}>{c}</span>
                  {active && <CheckCircle2 size={16} color="#06b6d4" />}
                </div>
              );
            })}
          </div>
        </div>

        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
            UAS (Carrier / PBX) SDP Answer Capability
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '16px' }}>Supported remote codecs</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {allAvailable.map((c) => {
              const active = carrierCodecs.includes(c);
              return (
                <div 
                  key={c}
                  onClick={() => toggleCarrier(c)}
                  style={{ 
                    padding: '10px 14px', 
                    borderRadius: '6px', 
                    background: active ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${active ? '#10b981' : 'var(--border-color)'}`,
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span style={{ fontWeight: 600, color: active ? '#fff' : 'var(--text-muted)' }}>{c}</span>
                  {active && <CheckCircle2 size={16} color="#10b981" />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
