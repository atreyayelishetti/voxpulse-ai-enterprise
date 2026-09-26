import React from 'react';
import { Radio, FileCode, CheckCircle2 } from 'lucide-react';

export default function DTMFPayloadSniffer() {
  const events = [
    { time: '00:04.10', event: 'DTMF Key 1', format: 'RFC 4733 Telephony Event', payloadType: 101, duration: '160ms' },
    { time: '00:12.45', event: 'DTMF Key #', format: 'RFC 4733 Telephony Event', payloadType: 101, duration: '160ms' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Radio color="#a78bfa" size={28} /> RFC 4733 / RFC 2833 Out-of-Band DTMF Sniffer
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Analyze out-of-band RTP telephony-event payloads, tone durations, and volume levels.
          </p>
        </div>
        <span className="badge badge-indigo">Payload Type 101</span>
      </div>

      <div className="glass-card" style={{ padding: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.72rem' }}>
              <th style={{ padding: '10px' }}>Timestamp</th>
              <th style={{ padding: '10px' }}>Digit Event</th>
              <th style={{ padding: '10px' }}>RFC Format</th>
              <th style={{ padding: '10px' }}>RTP Payload Type</th>
              <th style={{ padding: '10px' }}>Duration</th>
            </tr>
          </thead>
          <tbody>
            {events.map((ev, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px 10px', color: '#06b6d4', fontWeight: 600 }}>{ev.time}</td>
                <td style={{ padding: '12px 10px', color: '#fff', fontWeight: 700 }}>{ev.event}</td>
                <td style={{ padding: '12px 10px', color: 'var(--text-muted)' }}>{ev.format}</td>
                <td style={{ padding: '12px 10px', color: '#a78bfa' }}>PT-{ev.payloadType}</td>
                <td style={{ padding: '12px 10px', color: '#34d399' }}>{ev.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
