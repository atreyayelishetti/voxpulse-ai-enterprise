import React from 'react';
import { Code, FileCode } from 'lucide-react';

export default function SIPMessageBodyParser() {
  const mimeSample = `Content-Type: application/sdp
Content-Length: 242

v=0
o=VoxPulse 19284 9104 IN IP4 192.168.1.10
s=Talk
c=IN IP4 192.168.1.10
t=0 0
m=audio 5004 RTP/AVP 0 101
a=rtpmap:0 PCMU/8000
a=rtpmap:101 telephone-event/8000`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Code color="#a78bfa" size={28} /> SIP MIME & XML / ISUP Message Body Inspector
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Parse multi-part MIME payloads, SDP session descriptors, and ISUP PSTN signaling bodies.
          </p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '20px' }}>
        <h4 style={{ color: '#fff', marginBottom: '10px' }}>Raw SIP Payload Body Output</h4>
        <pre style={{ background: 'rgba(0,0,0,0.4)', padding: '14px', borderRadius: '8px', color: '#06b6d4', fontFamily: 'monospace', fontSize: '0.85rem' }}>
          {mimeSample}
        </pre>
      </div>
    </div>
  );
}
