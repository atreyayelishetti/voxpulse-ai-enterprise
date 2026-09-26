import React from 'react';
import { Server, Activity } from 'lucide-react';

export default function SIPDialogStateTracker() {
  const dialogs = [
    { callId: 'c891042-901@192.168.1.10', fromTag: 'as9104', toTag: 'sbc9102', state: 'CONFIRMED (Active Audio)', duration: '00:14.2s' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Server color="#38bdf8" size={28} /> Active SIP Dialog State Machine & Call Leg Tracker
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Track active SIP dialog Call-IDs, From/To tags, and CSeq transaction numbers.
          </p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.72rem' }}>
              <th style={{ padding: '10px' }}>SIP Call-ID</th>
              <th style={{ padding: '10px' }}>From Tag</th>
              <th style={{ padding: '10px' }}>To Tag</th>
              <th style={{ padding: '10px' }}>Dialog State</th>
              <th style={{ padding: '10px' }}>Duration</th>
            </tr>
          </thead>
          <tbody>
            {dialogs.map((d, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px 10px', color: '#fff', fontWeight: 700, fontFamily: 'monospace' }}>{d.callId}</td>
                <td style={{ padding: '12px 10px', color: '#06b6d4', fontFamily: 'monospace' }}>{d.fromTag}</td>
                <td style={{ padding: '12px 10px', color: '#38bdf8', fontFamily: 'monospace' }}>{d.toTag}</td>
                <td style={{ padding: '12px 10px' }}><span className="badge badge-emerald">{d.state}</span></td>
                <td style={{ padding: '12px 10px', color: '#a78bfa' }}>{d.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
