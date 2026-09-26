import React, { useState } from 'react';
import { VolumeX, Play, Activity, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function CallRecordingSilenceMarker() {
  const silenceGaps = [
    { startSec: '00:04.2s', endSec: '00:09.8s', durationSec: '5.6s', type: 'Dead Air (Menu Timeout)', alertLevel: 'HIGH' },
    { startSec: '00:18.1s', endSec: '00:20.5s', durationSec: '2.4s', type: 'Normal Pause', alertLevel: 'NORMAL' },
    { startSec: '00:42.0s', endSec: '00:54.2s', durationSec: '12.2s', type: 'Dead Air (Agent Transfer)', alertLevel: 'HIGH' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <VolumeX color="#f43f5e" size={28} /> Audio Silence Gap & Dead Air Marker
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Detect awkward silences, delayed speech synthesis, and unprompted dead air in call recordings.
          </p>
        </div>

        <span className="badge badge-amber" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
          2 High Dead-Air Gaps Marked
        </span>
      </div>

      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
          Detected Audio Silence Gaps (&gt;2.0 Seconds)
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.72rem' }}>
                <th style={{ padding: '10px' }}>Start Time</th>
                <th style={{ padding: '10px' }}>End Time</th>
                <th style={{ padding: '10px' }}>Silence Duration</th>
                <th style={{ padding: '10px' }}>Classification</th>
                <th style={{ padding: '10px' }}>Severity Alert</th>
              </tr>
            </thead>
            <tbody>
              {silenceGaps.map((gap, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '12px 10px', color: '#06b6d4', fontWeight: 600 }}>{gap.startSec}</td>
                  <td style={{ padding: '12px 10px', color: '#06b6d4', fontWeight: 600 }}>{gap.endSec}</td>
                  <td style={{ padding: '12px 10px', color: '#38bdf8', fontWeight: 700 }}>{gap.durationSec}</td>
                  <td style={{ padding: '12px 10px', color: '#fff' }}>{gap.type}</td>
                  <td style={{ padding: '12px 10px' }}>
                    <span className={`badge ${gap.alertLevel === 'HIGH' ? 'badge-rose' : 'badge-emerald'}`}>
                      {gap.alertLevel}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
