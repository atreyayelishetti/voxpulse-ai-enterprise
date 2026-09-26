import React from 'react';
import { Globe2, TrendingDown } from 'lucide-react';

export default function CarrierRouteOptimizationEngine() {
  const routes = [
    { prefix: '+1 (800) US', primaryCarrier: 'AT&T Business ($0.014/m)', LCRCost: '$1,400.00', status: 'LEAST COST OPTIMAL' },
    { prefix: '+44 (0800) UK', primaryCarrier: 'BT Wholesale ($0.022/m)', LCRCost: '$2,200.00', status: 'LEAST COST OPTIMAL' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <TrendingDown color="#34d399" size={28} /> PSTN Least Cost Routing (LCR) Carrier Optimization Engine
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Automatically select lowest-cost Tier-1 carrier trunks for outbound PSTN test calls.
          </p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.72rem' }}>
              <th style={{ padding: '10px' }}>Destination Prefix</th>
              <th style={{ padding: '10px' }}>Primary LCR Carrier</th>
              <th style={{ padding: '10px' }}>Est Cost / 100k Mins</th>
              <th style={{ padding: '10px' }}>Optimization Status</th>
            </tr>
          </thead>
          <tbody>
            {routes.map((r, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px 10px', color: '#fff', fontWeight: 700 }}>{r.prefix}</td>
                <td style={{ padding: '12px 10px', color: '#06b6d4' }}>{r.primaryCarrier}</td>
                <td style={{ padding: '12px 10px', color: '#34d399', fontWeight: 700 }}>{r.LCRCost}</td>
                <td style={{ padding: '12px 10px' }}><span className="badge badge-emerald">{r.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
