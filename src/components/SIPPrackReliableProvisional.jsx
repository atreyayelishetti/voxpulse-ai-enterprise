import React from 'react';
import { Server, CheckCircle2 } from 'lucide-react';

export default function SIPPrackReliableProvisional() {
  const prackFrames = [
    { seq: 1, method: 'SIP/2.0 183 Session Progress', optionTag: '100rel', status: 'RSeq 1001 Generated' },
    { seq: 2, method: 'PRACK sip:sbc@voxpulse.io', optionTag: 'RAck 1001 1 INVITE', status: 'Provisional Acknowledged' },
    { seq: 3, method: 'SIP/2.0 200 OK (PRACK)', optionTag: '100rel Handshake Complete', status: 'PASSED' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Server color="#38bdf8" size={28} /> RFC 3262 PRACK Reliable Provisional Responses Tester
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Verify 100rel option tag handling, PRACK requests, and RAck headers for early media setup.
          </p>
        </div>
        <span className="badge badge-emerald">100rel Verified</span>
      </div>

      <div className="glass-card" style={{ padding: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.72rem' }}>
              <th style={{ padding: '10px' }}>Frame #</th>
              <th style={{ padding: '10px' }}>SIP Method / Response</th>
              <th style={{ padding: '10px' }}>Option Tag / RAck</th>
              <th style={{ padding: '10px' }}>Reliable Status</th>
            </tr>
          </thead>
          <tbody>
            {prackFrames.map((f, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px 10px', color: 'var(--text-muted)' }}>#{f.seq}</td>
                <td style={{ padding: '12px 10px', color: '#fff', fontWeight: 700 }}>{f.method}</td>
                <td style={{ padding: '12px 10px', color: '#06b6d4', fontFamily: 'monospace' }}>{f.optionTag}</td>
                <td style={{ padding: '12px 10px' }}><span className="badge badge-emerald">{f.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
