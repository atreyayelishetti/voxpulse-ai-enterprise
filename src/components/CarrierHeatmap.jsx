import React, { useState, useEffect } from 'react';
import { 
  Globe2, 
  Activity, 
  MapPin, 
  CheckCircle2, 
  Zap,
  Server,
  RefreshCw,
  Radio,
  Sliders,
  Filter,
  Download,
  AlertTriangle
} from 'lucide-react';

const GLOBAL_POPS = [
  { id: 'iad', continent: 'North America', city: 'Ashburn, VA (US-East)', carrier: 'Lumen / Level 3', asNumber: 'AS3356', latency: 28, jitter: 1.8, loss: 0.0, mos: 4.48, status: 'OPTIMAL' },
  { id: 'pdx', continent: 'North America', city: 'Hillsboro, OR (US-West)', carrier: 'Telnyx Global', asNumber: 'AS29838', latency: 46, jitter: 2.1, loss: 0.02, mos: 4.44, status: 'OPTIMAL' },
  { id: 'fra', continent: 'Europe', city: 'Frankfurt, DE (EU-Central)', carrier: 'Deutsche Telekom', asNumber: 'AS3320', latency: 89, jitter: 2.4, loss: 0.01, mos: 4.40, status: 'OPTIMAL' },
  { id: 'lhr', continent: 'Europe', city: 'London, UK (EU-West)', carrier: 'British Telecom', asNumber: 'AS2856', latency: 82, jitter: 1.9, loss: 0.0, mos: 4.42, status: 'OPTIMAL' },
  { id: 'tyo', continent: 'Asia Pacific', city: 'Tokyo, JP (AP-East)', carrier: 'NTT Communications', asNumber: 'AS2914', latency: 138, jitter: 3.5, loss: 0.04, mos: 4.28, status: 'GOOD' },
  { id: 'bom', continent: 'Asia Pacific', city: 'Mumbai, IN (AP-South)', carrier: 'Tata Communications', asNumber: 'AS4755', latency: 174, jitter: 4.2, loss: 0.08, mos: 4.18, status: 'GOOD' },
  { id: 'sao', continent: 'South America', city: 'São Paulo, BR (SA-East)', carrier: 'Claro / Embratel', asNumber: 'AS4230', latency: 165, jitter: 3.8, loss: 0.05, mos: 4.22, status: 'GOOD' },
  { id: 'syd', continent: 'Oceania', city: 'Sydney, AU (AP-Southeast)', carrier: 'Telstra Enterprise', asNumber: 'AS4637', latency: 188, jitter: 4.0, loss: 0.06, mos: 4.15, status: 'GOOD' }
];

export default function CarrierHeatmap() {
  const [metricMode, setMetricMode] = useState('latency'); // 'latency', 'mos', 'loss', 'jitter'
  const [selectedContinent, setSelectedContinent] = useState('ALL');
  const [isPinging, setIsPinging] = useState(false);
  const [popData, setPopData] = useState(GLOBAL_POPS);

  const handleRunGlobalPing = () => {
    setIsPinging(true);
    setTimeout(() => {
      setPopData(prev => prev.map(p => ({
        ...p,
        latency: Math.max(20, Math.round(p.latency + (Math.random() * 8 - 4))),
        jitter: +(p.jitter + (Math.random() * 0.4 - 0.2)).toFixed(1),
        mos: Math.min(4.5, +(p.mos + (Math.random() * 0.06 - 0.03)).toFixed(2))
      })));
      setIsPinging(false);
    }, 800);
  };

  const filteredPops = selectedContinent === 'ALL'
    ? popData
    : popData.filter(p => p.continent === selectedContinent);

  const avgLatency = Math.round(popData.reduce((acc, p) => acc + p.latency, 0) / popData.length);
  const avgMos = (popData.reduce((acc, p) => acc + p.mos, 0) / popData.length).toFixed(2);
  const avgLoss = (popData.reduce((acc, p) => acc + p.loss, 0) / popData.length).toFixed(2);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="glass-panel glass-panel-glow" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Globe2 size={24} color="#06b6d4" />
              Global Carrier Latency & Audio Quality Heatmap
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Live edge POP latency probes, BGP carrier transit telemetry, and P.863 POLQA voice clarity distribution.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button 
              className="btn btn-primary"
              onClick={handleRunGlobalPing}
              disabled={isPinging}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}
            >
              <RefreshCw size={16} className={isPinging ? 'spin' : ''} />
              {isPinging ? 'Probing POPs...' : 'Probe All Edge Nodes'}
            </button>
          </div>
        </div>

        {/* Global Summary KPI Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginTop: '20px' }}>
          <div style={{ background: 'rgba(0,0,0,0.25)', padding: '12px 16px', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Global Avg RTT</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#38bdf8' }}>{avgLatency} ms</div>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.25)', padding: '12px 16px', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Avg Voice MOS</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#34d399' }}>{avgMos} / 5.0</div>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.25)', padding: '12px 16px', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Avg Packet Loss</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#a78bfa' }}>{avgLoss}%</div>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.25)', padding: '12px 16px', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Active POP Nodes</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f59e0b' }}>{popData.length} POPs</div>
          </div>
        </div>
      </div>

      {/* Control Bar: Metric Toggle & Continent Filter */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['ALL', 'North America', 'Europe', 'Asia Pacific', 'South America', 'Oceania'].map(c => (
            <button
              key={c}
              onClick={() => setSelectedContinent(c)}
              style={{
                background: selectedContinent === c ? 'rgba(6, 182, 212, 0.2)' : 'rgba(255,255,255,0.05)',
                border: selectedContinent === c ? '1px solid #06b6d4' : '1px solid rgba(255,255,255,0.1)',
                color: selectedContinent === c ? '#38bdf8' : 'var(--text-muted)',
                borderRadius: '6px',
                padding: '6px 12px',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {c}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '6px', background: 'rgba(0,0,0,0.3)', padding: '4px', borderRadius: '8px' }}>
          {[
            { id: 'latency', label: 'Latency (RTT)' },
            { id: 'mos', label: 'MOS Clarity' },
            { id: 'jitter', label: 'Jitter' },
            { id: 'loss', label: 'Packet Loss' }
          ].map(m => (
            <button
              key={m.id}
              onClick={() => setMetricMode(m.id)}
              style={{
                background: metricMode === m.id ? '#0284c7' : 'transparent',
                border: 'none',
                color: metricMode === m.id ? '#fff' : 'var(--text-muted)',
                padding: '5px 10px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Global Edge Nodes */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {filteredPops.map((pop) => {
          let metricVal = `${pop.latency} ms`;
          let metricColor = pop.latency < 60 ? '#34d399' : pop.latency < 120 ? '#38bdf8' : '#f59e0b';
          if (metricMode === 'mos') {
            metricVal = `${pop.mos} / 5.0`;
            metricColor = pop.mos >= 4.3 ? '#34d399' : pop.mos >= 4.1 ? '#38bdf8' : '#f59e0b';
          } else if (metricMode === 'jitter') {
            metricVal = `${pop.jitter} ms`;
            metricColor = pop.jitter <= 2.5 ? '#34d399' : '#38bdf8';
          } else if (metricMode === 'loss') {
            metricVal = `${pop.loss}%`;
            metricColor = pop.loss === 0 ? '#34d399' : '#f59e0b';
          }

          return (
            <div key={pop.id} className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: '0.72rem', color: '#06b6d4', fontWeight: 800, textTransform: 'uppercase' }}>{pop.continent}</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>{pop.city}</div>
                </div>
                <span className={`badge ${pop.status === 'OPTIMAL' ? 'badge-emerald' : 'badge-cyan'}`} style={{ fontSize: '0.72rem' }}>
                  {pop.status}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.25)', padding: '12px 14px', borderRadius: '10px' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{metricMode.toUpperCase()}</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: metricColor }}>
                    {metricVal}
                  </div>
                </div>
                <div style={{ textAlign: 'right', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <div>BGP: <strong style={{ color: '#fff' }}>{pop.asNumber}</strong></div>
                  <div>Carrier: <span style={{ color: '#a78bfa' }}>{pop.carrier.split(' ')[0]}</span></div>
                </div>
              </div>

              {/* Progress visual bar */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  <span>SLA Threshold Margin</span>
                  <span>{pop.latency < 100 ? '99.99%' : '99.95%'}</span>
                </div>
                <div style={{ height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${Math.max(15, 100 - (pop.latency / 3))}%`, height: '100%', background: metricColor }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
