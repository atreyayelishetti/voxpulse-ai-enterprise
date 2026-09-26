import React from 'react';
import { 
  Globe2, 
  Activity, 
  MapPin, 
  CheckCircle2, 
  Zap,
  Server
} from 'lucide-react';

const REGIONS = [
  { continent: 'North America', country: 'United States', status: 'EXCELLENT', latency: '42ms', mos: '4.45', nodes: 'US-East (VA), US-West (OR)' },
  { continent: 'Europe', country: 'United Kingdom & Germany', status: 'EXCELLENT', latency: '112ms', mos: '4.38', nodes: 'EU-West (London), EU-Central (Frankfurt)' },
  { continent: 'Asia Pacific', country: 'Japan & India', status: 'GOOD', latency: '185ms', mos: '4.20', nodes: 'AP-Northeast (Tokyo), AP-South (Mumbai)' },
  { continent: 'South America', country: 'Brazil', status: 'GOOD', latency: '195ms', mos: '4.15', nodes: 'SA-East (São Paulo)' },
];

export default function CarrierHeatmap() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="glass-panel glass-panel-glow" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Globe2 size={24} color="#06b6d4" />
              Global Carrier Latency & Audio Quality Heatmap
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Real-time regional PSTN network performance and MOS audio score distribution.
            </p>
          </div>

          <span className="badge badge-cyan" style={{ padding: '6px 12px' }}>
            Multi-Continent Active Nodes
          </span>
        </div>
      </div>

      {/* Grid of Continents */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
        {REGIONS.map((r, idx) => (
          <div key={idx} className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>{r.continent}</div>
              <span className="badge badge-emerald">{r.status}</span>
            </div>

            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
              Target Countries: {r.country}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', background: 'rgba(0,0,0,0.25)', padding: '12px', borderRadius: '10px' }}>
              <div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>LATENCY (RTT)</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#38bdf8' }}>{r.latency}</div>
              </div>

              <div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>AUDIO MOS SCORE</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#34d399' }}>{r.mos} / 5.0</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
