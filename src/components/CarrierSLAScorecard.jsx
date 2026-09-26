import React, { useState } from 'react';
import { 
  BarChart2, 
  Globe2, 
  Activity, 
  CheckCircle2, 
  TrendingUp,
  Server,
  DollarSign,
  AlertTriangle,
  Download,
  Filter,
  Sliders,
  Calculator
} from 'lucide-react';

const INITIAL_CARRIERS = [
  { id: 'att', name: 'AT&T Mobility (USA)', region: 'North America', p50: 38, p95: 72, p99: 115, mos: 4.45, contractualSla: 99.99, actualUptime: 99.995, monthlySpend: 42000, status: 'COMPLIANT' },
  { id: 'vzw', name: 'Verizon Wireless (USA)', region: 'North America', p50: 42, p95: 80, p99: 124, mos: 4.42, contractualSla: 99.98, actualUptime: 99.982, monthlySpend: 38000, status: 'COMPLIANT' },
  { id: 'lmn', name: 'Lumen / CenturyLink', region: 'North America', p50: 46, p95: 98, p99: 165, mos: 4.28, contractualSla: 99.95, actualUptime: 99.890, monthlySpend: 29000, status: 'BREACH' },
  { id: 'bt', name: 'British Telecom (UK)', region: 'Europe', p50: 98, p95: 145, p99: 190, mos: 4.35, contractualSla: 99.95, actualUptime: 99.960, monthlySpend: 24000, status: 'COMPLIANT' },
  { id: 'dt', name: 'Deutsche Telekom (DE)', region: 'Europe', p50: 105, p95: 155, p99: 210, mos: 4.38, contractualSla: 99.97, actualUptime: 99.975, monthlySpend: 26000, status: 'COMPLIANT' },
  { id: 'ntt', name: 'NTT Docomo (Japan)', region: 'Asia Pacific', p50: 165, p95: 210, p99: 280, mos: 4.22, contractualSla: 99.90, actualUptime: 99.910, monthlySpend: 19500, status: 'COMPLIANT' },
  { id: 'tata', name: 'Tata Communications (IN)', region: 'Asia Pacific', p50: 190, p95: 250, p99: 340, mos: 4.18, contractualSla: 99.85, actualUptime: 99.820, monthlySpend: 16000, status: 'BREACH' }
];

export default function CarrierSLAScorecard() {
  const [carriers, setCarriers] = useState(INITIAL_CARRIERS);
  const [selectedRegion, setSelectedRegion] = useState('ALL');
  const [sortBy, setSortBy] = useState('p99'); // 'p99', 'mos', 'uptime'
  const [selectedCarrierForCredit, setSelectedCarrierForCredit] = useState(INITIAL_CARRIERS[2]); // Lumen breach

  const filteredCarriers = (selectedRegion === 'ALL' ? carriers : carriers.filter(c => c.region === selectedRegion))
    .slice()
    .sort((a, b) => {
      if (sortBy === 'p99') return a.p99 - b.p99;
      if (sortBy === 'mos') return b.mos - a.mos;
      if (sortBy === 'uptime') return b.actualUptime - a.actualUptime;
      return 0;
    });

  // Calculate SLA credit penalty for selected carrier
  const breachDeficit = Math.max(0, +(selectedCarrierForCredit.contractualSla - selectedCarrierForCredit.actualUptime).toFixed(3));
  const outageMinutesInMonth = Math.round((43200 * (100 - selectedCarrierForCredit.actualUptime)) / 100);
  const penaltyTier = breachDeficit > 0.05 ? 0.25 : breachDeficit > 0 ? 0.10 : 0.0;
  const creditOwed = Math.round(selectedCarrierForCredit.monthlySpend * penaltyTier);

  const handleExportCSV = () => {
    const headers = ['Carrier,Region,P50_ms,P95_ms,P99_ms,MOS,Contractual_SLA,Actual_Uptime,Status'];
    const rows = carriers.map(c => `"${c.name}","${c.region}",${c.p50},${c.p95},${c.p99},${c.mos},${c.contractualSla}%,${c.actualUptime}%,${c.status}`);
    const csvContent = [headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `VoxPulse_Carrier_SLA_Scorecard_${Date.now()}.csv`;
    a.click();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="glass-panel glass-panel-glow" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <BarChart2 size={24} color="#38bdf8" />
              Carrier SLA Scorecard & Latency Percentiles (P95/P99)
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Benchmark carrier PSTN trunk performance against contractual SLAs to hold telecom providers financially accountable.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button 
              className="btn btn-secondary" 
              onClick={handleExportCSV}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem' }}
            >
              <Download size={15} /> Export SLA Scorecard (CSV)
            </button>
          </div>
        </div>

        {/* Global Summary Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginTop: '20px' }}>
          <div style={{ background: 'rgba(0,0,0,0.25)', padding: '12px 14px', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Monitored Carriers</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff' }}>{carriers.length} Trunks</div>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.25)', padding: '12px 14px', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>SLA Compliant</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#34d399' }}>{carriers.filter(c => c.status === 'COMPLIANT').length} / {carriers.length}</div>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.25)', padding: '12px 14px', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Active SLA Breaches</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ef4444' }}>{carriers.filter(c => c.status === 'BREACH').length} Carriers</div>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.25)', padding: '12px 14px', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Total Penalty Credits</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fbbf24' }}>$11,250 Owed</div>
          </div>
        </div>
      </div>

      {/* SLA Penalty Credit Reimbursement Calculator Card */}
      <div className="glass-panel" style={{ padding: '20px', border: '1px solid #fbbf24' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calculator size={18} /> Contractual SLA Financial Penalty & Credit Auditor
          </h3>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Audit Carrier:</span>
            <select
              value={selectedCarrierForCredit.id}
              onChange={e => setSelectedCarrierForCredit(carriers.find(c => c.id === e.target.value) || carriers[0])}
              className="input-field"
              style={{ padding: '4px 10px', fontSize: '0.8rem' }}
            >
              {carriers.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '8px' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Contractual vs Actual</span>
            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff', marginTop: '2px' }}>
              {selectedCarrierForCredit.contractualSla}% vs <span style={{ color: selectedCarrierForCredit.actualUptime < selectedCarrierForCredit.contractualSla ? '#ef4444' : '#34d399' }}>{selectedCarrierForCredit.actualUptime}%</span>
            </div>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '8px' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Downtime Minutes</span>
            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#38bdf8', marginTop: '2px' }}>
              {outageMinutesInMonth} mins in 30 days
            </div>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '8px' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Contract Penalty Tier</span>
            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: penaltyTier > 0 ? '#f59e0b' : '#34d399', marginTop: '2px' }}>
              {penaltyTier * 100}% Invoice Credit
            </div>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '8px' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Reimbursement Due</span>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: creditOwed > 0 ? '#fbbf24' : '#34d399', marginTop: '2px' }}>
              ${creditOwed.toLocaleString()} USD
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Sort Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          {['ALL', 'North America', 'Europe', 'Asia Pacific'].map(r => (
            <button
              key={r}
              onClick={() => setSelectedRegion(r)}
              style={{
                background: selectedRegion === r ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255,255,255,0.05)',
                border: selectedRegion === r ? '1px solid #38bdf8' : '1px solid rgba(255,255,255,0.1)',
                color: selectedRegion === r ? '#38bdf8' : 'var(--text-muted)',
                borderRadius: '6px',
                padding: '6px 12px',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {r}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Sort By:</span>
          {['p99', 'mos', 'uptime'].map(s => (
            <button
              key={s}
              onClick={() => setSortBy(s)}
              style={{
                background: sortBy === s ? 'rgba(6, 182, 212, 0.2)' : 'rgba(255,255,255,0.05)',
                border: sortBy === s ? '1px solid #06b6d4' : '1px solid rgba(255,255,255,0.1)',
                color: sortBy === s ? '#38bdf8' : 'var(--text-muted)',
                padding: '4px 10px',
                borderRadius: '4px',
                fontSize: '0.72rem',
                cursor: 'pointer'
              }}
            >
              {s === 'p99' ? 'P99 Latency' : s === 'mos' ? 'Audio MOS' : 'Uptime %'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Table */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.7rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '10px 8px' }}>Carrier Trunk</th>
                <th style={{ padding: '10px 8px' }}>Region</th>
                <th style={{ padding: '10px 8px' }}>P50 Latency</th>
                <th style={{ padding: '10px 8px' }}>P95 Latency</th>
                <th style={{ padding: '10px 8px' }}>P99 Latency</th>
                <th style={{ padding: '10px 8px' }}>MOS Score</th>
                <th style={{ padding: '10px 8px' }}>Contract SLA</th>
                <th style={{ padding: '10px 8px' }}>Actual Uptime</th>
                <th style={{ padding: '10px 8px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredCarriers.map(c => (
                <tr 
                  key={c.id} 
                  onClick={() => setSelectedCarrierForCredit(c)}
                  style={{ 
                    borderBottom: '1px solid rgba(255,255,255,0.04)', 
                    color: '#fff',
                    background: selectedCarrierForCredit?.id === c.id ? 'rgba(56, 189, 248, 0.08)' : undefined,
                    cursor: 'pointer'
                  }}
                >
                  <td style={{ padding: '12px 8px', fontWeight: 700 }}>{c.name}</td>
                  <td style={{ padding: '12px 8px', color: 'var(--text-muted)' }}>{c.region}</td>
                  <td style={{ padding: '12px 8px', fontFamily: 'var(--font-mono)' }}>{c.p50}ms</td>
                  <td style={{ padding: '12px 8px', fontFamily: 'var(--font-mono)', color: '#38bdf8' }}>{c.p95}ms</td>
                  <td style={{ padding: '12px 8px', fontFamily: 'var(--font-mono)', color: c.p99 > 250 ? '#ef4444' : '#a78bfa', fontWeight: 700 }}>{c.p99}ms</td>
                  <td style={{ padding: '12px 8px', fontWeight: 700, color: c.mos >= 4.3 ? '#34d399' : '#f59e0b' }}>{c.mos} / 5.0</td>
                  <td style={{ padding: '12px 8px', color: 'var(--text-muted)' }}>{c.contractualSla}%</td>
                  <td style={{ padding: '12px 8px', fontWeight: 700, color: c.actualUptime < c.contractualSla ? '#ef4444' : '#34d399' }}>
                    {c.actualUptime}%
                  </td>
                  <td style={{ padding: '12px 8px' }}>
                    <span className={`badge ${c.status === 'COMPLIANT' ? 'badge-emerald' : 'badge-rose'}`} style={{ fontSize: '0.7rem' }}>
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
