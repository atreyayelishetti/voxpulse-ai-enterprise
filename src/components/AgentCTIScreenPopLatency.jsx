import React from 'react';
import { Users, Clock } from 'lucide-react';

export default function AgentCTIScreenPopLatency() {
  const ctiLogs = [
    { callId: 'call-901', agent: 'Agent Sarah M.', screenPopMs: 140, cadData: 'Account #981042', status: 'FAST (<300ms)' },
    { callId: 'call-902', agent: 'Agent John D.', screenPopMs: 220, cadData: 'Account #402910', status: 'FAST (<300ms)' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Clock color="#38bdf8" size={28} /> Agent CTI Screen-Pop CAD Data Latency Benchmark
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Measure CTI CAD customer data arrival latency on agent desktop screen pops upon call answer.
          </p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.72rem' }}>
              <th style={{ padding: '10px' }}>Call ID</th>
              <th style={{ padding: '10px' }}>Agent Name</th>
              <th style={{ padding: '10px' }}>Screen-Pop Render Latency</th>
              <th style={{ padding: '10px' }}>CAD Attached Data</th>
              <th style={{ padding: '10px' }}>SLA Grade</th>
            </tr>
          </thead>
          <tbody>
            {ctiLogs.map((c, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px 10px', color: '#fff', fontWeight: 700 }}>{c.callId}</td>
                <td style={{ padding: '12px 10px', color: '#06b6d4' }}>{c.agent}</td>
                <td style={{ padding: '12px 10px', color: '#34d399', fontWeight: 700 }}>{c.screenPopMs} ms</td>
                <td style={{ padding: '12px 10px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{c.cadData}</td>
                <td style={{ padding: '12px 10px' }}><span className="badge badge-emerald">{c.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
