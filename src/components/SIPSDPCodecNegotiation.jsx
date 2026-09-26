import React from 'react';
import { Server, CheckCircle2 } from 'lucide-react';

export default function SIPSDPCodecNegotiation() {
  const sdpOffer = [
    { payload: 0, codec: 'PCMU (G.711 u-law)', sampleRate: '8000 Hz', status: 'MATCHED (Selected)' },
    { payload: 8, codec: 'PCMA (G.711 a-law)', sampleRate: '8000 Hz', status: 'SUPPORTED' },
    { payload: 18, codec: 'G729', sampleRate: '8000 Hz', status: 'SUPPORTED' },
    { payload: 101, codec: 'telephone-event', sampleRate: '8000 Hz', status: 'MATCHED' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Server color="#38bdf8" size={28} /> SDP Offer/Answer Codec Negotiation Matrix Validator
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Audit SDP m=audio payload mappings, fmtp parameters, and telephone-event DTMF payload negotiation.
          </p>
        </div>
        <span className="badge badge-emerald">SDP Handshake 200 OK</span>
      </div>

      <div className="glass-card" style={{ padding: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.72rem' }}>
              <th style={{ padding: '10px' }}>RTP Payload Type</th>
              <th style={{ padding: '10px' }}>Codec Name</th>
              <th style={{ padding: '10px' }}>Clock Sample Rate</th>
              <th style={{ padding: '10px' }}>Negotiation Outcome</th>
            </tr>
          </thead>
          <tbody>
            {sdpOffer.map((item, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px 10px', color: '#a78bfa', fontWeight: 700 }}>PT-{item.payload}</td>
                <td style={{ padding: '12px 10px', color: '#fff', fontWeight: 700 }}>{item.codec}</td>
                <td style={{ padding: '12px 10px', color: 'var(--text-muted)' }}>{item.sampleRate}</td>
                <td style={{ padding: '12px 10px' }}><span className="badge badge-emerald">{item.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
