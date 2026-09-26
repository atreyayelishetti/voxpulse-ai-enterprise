import React from 'react';
import { Users, TrendingDown, Sparkles } from 'lucide-react';

export default function CallCenterAHTOptimizer() {
  const recommendations = [
    { area: 'Pre-Validation IVR Authentication', timeSavedSec: '28s', impact: 'HIGH REDUCTION' },
    { area: 'Automated Account Balance Speech Prompt', timeSavedSec: '18s', impact: 'MEDIUM REDUCTION' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <TrendingDown color="#34d399" size={28} /> Gemini AI Average Handle Time (AHT) Reduction Engine
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Identify IVR bottlenecks to shorten customer call handle times and reduce queue costs.
          </p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.72rem' }}>
              <th style={{ padding: '10px' }}>Optimization Target</th>
              <th style={{ padding: '10px' }}>Potential Time Saved</th>
              <th style={{ padding: '10px' }}>AHT Impact</th>
            </tr>
          </thead>
          <tbody>
            {recommendations.map((r, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px 10px', color: '#fff', fontWeight: 700 }}>{r.area}</td>
                <td style={{ padding: '12px 10px', color: '#34d399', fontWeight: 700 }}>-{r.timeSavedSec}</td>
                <td style={{ padding: '12px 10px' }}><span className="badge badge-cyan">{r.impact}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
