import React from 'react';
import { 
  Activity, 
  ArrowRight, 
  CheckCircle2, 
  Server,
  Layers
} from 'lucide-react';

const SIP_MESSAGES = [
  { step: 1, direction: 'OUTBOUND', from: 'VoxPulse Softswitch', to: 'PSTN Gateway', method: 'INVITE sip:+18005550100@pstn.carrier.net', status: '100 Trying (12ms)' },
  { step: 2, direction: 'INBOUND', from: 'PSTN Gateway', to: 'VoxPulse Softswitch', method: 'SIP/2.0 180 Ringing', status: '180 Ringing (48ms)' },
  { step: 3, direction: 'INBOUND', from: 'PSTN Gateway', to: 'VoxPulse Softswitch', method: 'SIP/2.0 200 OK (G.711u Codec)', status: '200 OK (138ms)' },
  { step: 4, direction: 'OUTBOUND', from: 'VoxPulse Softswitch', to: 'PSTN Gateway', method: 'ACK sip:+18005550100@pstn.carrier.net', status: 'ACK (140ms)' },
  { step: 5, direction: 'INBOUND', from: 'PSTN Gateway', to: 'VoxPulse Softswitch', method: 'RTP Audio Stream (8000Hz PCM)', status: 'RTP Active (142ms)' },
  { step: 6, direction: 'OUTBOUND', from: 'VoxPulse Softswitch', to: 'PSTN Gateway', method: 'BYE sip:+18005550100@pstn.carrier.net', status: '200 OK (Call Ended)' }
];

export default function SIPDiagnostics() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="glass-panel glass-panel-glow" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Server size={24} color="#8b5cf6" />
              SIP Protocol & Softswitch Ladder Diagnostics
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Inspect real-time SIP signaling messages (INVITE, 180 Ringing, 200 OK, ACK, BYE) and RTP stream latency.
            </p>
          </div>

          <span className="badge badge-indigo" style={{ padding: '6px 12px' }}>
            SIP 2.0 / SDP Inspector
          </span>
        </div>
      </div>

      {/* Ladder Diagram View */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-around', fontWeight: 700, color: '#818cf8', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '20px' }}>
          <div>VOXPULSE SOFTSWITCH (ORIGIN)</div>
          <div>PSTN CARRIER GATEWAY (TERMINATION)</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {SIP_MESSAGES.map(msg => (
            <div key={msg.step} style={{
              background: 'rgba(31, 41, 55, 0.5)',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              padding: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#38bdf8', width: '60px' }}>
                STEP {msg.step}
              </span>

              <div style={{ flex: 1, margin: '0 20px', background: 'rgba(0,0,0,0.3)', padding: '10px 14px', borderRadius: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span>{msg.method}</span>
                <span style={{ color: '#34d399', fontWeight: 600 }}>{msg.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
