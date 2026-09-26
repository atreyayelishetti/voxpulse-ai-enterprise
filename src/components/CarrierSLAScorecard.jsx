import React from 'react';
import { 
  BarChart2, 
  Globe2, 
  Activity, 
  CheckCircle2, 
  TrendingUp,
  Server
} from 'lucide-react';

const CARRIERS = [
  { name: 'AT&T Mobility (USA)', region: 'North America', p50: '38ms', p95: '72ms', p99: '115ms', mos: '4.45', sla: '99.99%' },
  { name: 'Verizon Wireless (USA)', region: 'North America', p50: '42ms', p95: '80ms', p99: '124ms', mos: '4.42', sla: '99.98%' },
  { name: 'British Telecom (UK)', region: 'Europe', p50: '98ms', p95: '145ms', p99: '190ms', mos: '4.35', sla: '99.95%' },
  { name: 'Deutsche Telekom (DE)', region: 'Europe', p50: '105ms', p95: '155ms', p99: '210ms', mos: '4.38', sla: '99.97%' },
  { name: 'NTT Docomo (Japan)', region: 'Asia Pacific', p50: '165ms', p95: '210ms', p99: '280ms', mos: '4.22', sla: '99.90%' },
  { name: 'Bharti Airtel (India)', region: 'Asia Pacific', p50: '190ms', p95: '250ms', p99: '340ms', mos: '4.18', sla: '99.85%' }
];

export default function CarrierSLAScorecard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="glass-panel glass-panel-glow" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <BarChart2 size={24} color="#38bdf8" />
              Carrier SLA Scorecard & Latency Percentiles (P95/P99)
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Benchmark carrier PSTN trunk performance against contractual SLAs to hold carriers accountable.
            </p>
          </div>

          <span className="badge badge-cyan" style={{ padding: '6px 12px' }}>
            6 Tier-1 Carriers Monitored
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '12px 14px' }}>CARRIER TRUNK</th>
                <th style={{ padding: '12px 14px' }}>REGION</th>
                <th style={{ padding: '12px 14px' }}>P50 LATENCY</th>
                <th style={{ padding: '12px 14px' }}>P95 LATENCY</th>
                <th style={{ padding: '12px 14px' }}>P99 LATENCY</th>
                <th style={{ padding: '12px 14px' }}>MOS CLARITY</th>
                <th style={{ padding: '12px 14px' }}>UPTIME SLA</th>
              </tr>
            </thead>
            <tbody>
              {CARRIERS.map((c, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#fff' }}>
                  <td style={{ padding: '14px', fontWeight: 700 }}>{c.name}</td>
                  <td style={{ padding: '14px', color: 'var(--text-muted)' }}>{c.region}</td>
                  <td style={{ padding: '14px', fontFamily: 'var(--font-mono)' }}>{c.p50}</td>
                  <td style={{ padding: '14px', fontFamily: 'var(--font-mono)', color: '#38bdf8' }}>{c.p95}</td>
                  <td style={{ padding: '14px', fontFamily: 'var(--font-mono)', color: '#a78bfa' }}>{c.p99}</td>
                  <td style={{ padding: '14px', fontWeight: 700, color: '#34d399' }}>{c.mos} / 5.0</td>
                  <td style={{ padding: '14px' }}>
                    <span className="badge badge-emerald">{c.sla}</span>
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
