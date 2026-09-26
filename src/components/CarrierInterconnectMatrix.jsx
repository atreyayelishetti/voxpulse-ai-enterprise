import React, { useState } from 'react';
import { 
  Server, 
  Activity, 
  Radio, 
  ShieldCheck, 
  AlertTriangle, 
  TrendingDown, 
  RefreshCw, 
  Globe2 
} from 'lucide-react';

export default function CarrierInterconnectMatrix() {
  const [carriers, setCarriers] = useState([
    { name: 'AT&T Communications (OCN 9104)', pop: 'Ashburn, VA', latency: '18 ms', jitter: '2.1 ms', loss: '0.00%', mos: 4.42, status: 'OPTIMAL', route: 'Primary SBC 1' },
    { name: 'Verizon Business (OCN 9132)', pop: 'New York, NY', latency: '24 ms', jitter: '3.4 ms', loss: '0.01%', mos: 4.38, status: 'OPTIMAL', route: 'Primary SBC 2' },
    { name: 'Telnyx Global PSTN', pop: 'Chicago, IL', latency: '32 ms', jitter: '4.8 ms', loss: '0.02%', mos: 4.35, status: 'ACTIVE', route: 'Direct Egress' },
    { name: 'Lumen / Level 3', pop: 'Denver, CO', latency: '41 ms', jitter: '6.2 ms', loss: '0.05%', mos: 4.28, status: 'ACTIVE', route: 'Backup SBC 1' },
    { name: 'Twilio Voice PSTN', pop: 'US-East (Virginia)', latency: '52 ms', jitter: '8.5 ms', loss: '0.12%', mos: 4.15, status: 'EVALUATING', route: 'Secondary' },
    { name: 'Bandwidth.com CLEC', pop: 'Raleigh, NC', latency: '28 ms', jitter: '3.1 ms', loss: '0.01%', mos: 4.36, status: 'OPTIMAL', route: 'Direct Egress' }
  ]);

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setCarriers(prev => prev.map(c => ({
        ...c,
        latency: `${Math.floor(15 + Math.random() * 35)} ms`,
        jitter: `${(1.5 + Math.random() * 5).toFixed(1)} ms`
      })));
      setRefreshing(false);
    }, 800);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Server size={24} color="#6366f1" />
              Tier-1 Carrier Interconnect Latency & Jitter Matrix
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Real-time PSTN carrier route telemetry, SIP setup latency, RTP jitter, and POLQA MOS scores.
            </p>
          </div>

          <button onClick={handleRefresh} className="btn btn-secondary" disabled={refreshing}>
            <RefreshCw size={16} className={refreshing ? 'spin' : ''} /> Refresh Telemetry
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          <div style={{ background: 'rgba(30, 41, 59, 0.5)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>AVG CARRIER LATENCY</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#06b6d4', marginTop: '4px' }}>32.5 ms</div>
          </div>
          <div style={{ background: 'rgba(30, 41, 59, 0.5)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>AVG RTP JITTER</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>4.6 ms</div>
          </div>
          <div style={{ background: 'rgba(30, 41, 59, 0.5)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>GLOBAL PACKET LOSS</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#6366f1', marginTop: '4px' }}>0.035%</div>
          </div>
          <div style={{ background: 'rgba(30, 41, 59, 0.5)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>PSTN POLQA MOS</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f59e0b', marginTop: '4px' }}>4.32 / 5.0</div>
          </div>
        </div>
      </div>

      {/* Carriers Table */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Radio size={18} color="#06b6d4" /> Carrier Egress Routes ({carriers.length})
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', color: 'var(--text-muted)' }}>
                <th style={{ padding: '12px' }}>CARRIER NAME</th>
                <th style={{ padding: '12px' }}>INTERCONNECT POP</th>
                <th style={{ padding: '12px' }}>LATENCY</th>
                <th style={{ padding: '12px' }}>JITTER</th>
                <th style={{ padding: '12px' }}>PACKET LOSS</th>
                <th style={{ padding: '12px' }}>POLQA MOS</th>
                <th style={{ padding: '12px' }}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {carriers.map((c, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <td style={{ padding: '14px 12px', fontWeight: 600, color: '#fff' }}>{c.name}</td>
                  <td style={{ padding: '14px 12px', color: 'var(--text-muted)' }}>{c.pop}</td>
                  <td style={{ padding: '14px 12px', color: '#06b6d4', fontWeight: 700 }}>{c.latency}</td>
                  <td style={{ padding: '14px 12px', color: '#10b981' }}>{c.jitter}</td>
                  <td style={{ padding: '14px 12px', color: '#6366f1' }}>{c.loss}</td>
                  <td style={{ padding: '14px 12px', fontWeight: 700, color: c.mos >= 4.3 ? '#10b981' : '#f59e0b' }}>{c.mos}</td>
                  <td style={{ padding: '14px 12px' }}>
                    <span className={`badge ${c.status === 'OPTIMAL' ? 'badge-emerald' : 'badge-indigo'}`}>
                      {c.status}
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
