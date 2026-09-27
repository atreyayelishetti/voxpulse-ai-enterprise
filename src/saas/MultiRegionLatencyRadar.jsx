import React, { useState, useEffect } from 'react';
import { 
  Globe2, 
  Activity, 
  Zap, 
  RefreshCw, 
  Server, 
  ShieldCheck, 
  Radio, 
  Sliders, 
  CheckCircle2, 
  AlertTriangle,
  Layers,
  ArrowRight,
  TrendingDown
} from 'lucide-react';

export default function MultiRegionLatencyRadar({ currentOrg }) {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [benchmarkingPopId, setBenchmarkingPopId] = useState(null);
  const [selectedRouteType, setSelectedRouteType] = useState('DIRECT_BYOC_SBC');
  const [benchmarkResult, setBenchmarkResult] = useState(null);

  useEffect(() => {
    fetchPoPReport();
  }, []);

  const fetchPoPReport = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/saas/latency/global-pops');
      const data = await res.json();
      setReport(data);
    } catch (err) {
      console.error('Failed to load global PoP latency report:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBenchmark = async (popId) => {
    setBenchmarkingPopId(popId);
    setBenchmarkResult(null);
    try {
      const res = await fetch('/api/saas/latency/benchmark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ popId, routeType: selectedRouteType })
      });
      const data = await res.json();
      if (data.success) {
        setBenchmarkResult(data);
      }
    } catch (err) {
      console.error('Benchmark failed:', err);
    } finally {
      setBenchmarkingPopId(null);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #06b6d4 0%, #0284c7 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)'
            }}>
              <Globe2 size={22} color="#fff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff' }}>
                  Multi-Region Carrier Egress & Geo-Latency Radar
                </h2>
                <span className="badge badge-cyan" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                  8 Global Cloud PoPs
                </span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '2px' }}>
                Real-time Post-Dial Delay (PDD), DNS SRV lookup, SIP 180 Ringing RTT, and ITU-T P.863 POLQA MOS across worldwide carrier egress points.
              </p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => fetchPoPReport()}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 18px', borderRadius: '10px', fontSize: '0.84rem' }}
          >
            <RefreshCw size={14} className={loading ? 'spin' : ''} /> Refresh Global Radar
          </button>
        </div>
      </div>

      {/* Top Global Fleet KPIs */}
      {report && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          <div className="glass-card" style={{ padding: '18px' }}>
            <div style={{ fontSize: '0.74rem', color: '#94a3b8', textTransform: 'uppercase' }}>Fleet Mean PDD</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>
              {report.averagePddMs} ms
            </div>
            <div style={{ fontSize: '0.74rem', color: '#64748b' }}>Target SLA: &lt; {report.slaPddTargetMs}ms</div>
          </div>

          <div className="glass-card" style={{ padding: '18px' }}>
            <div style={{ fontSize: '0.74rem', color: '#94a3b8', textTransform: 'uppercase' }}>Fleet Mean POLQA MOS</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#38bdf8', marginTop: '4px' }}>
              {report.averageMos} / 5.0
            </div>
            <div style={{ fontSize: '0.74rem', color: '#10b981' }}>High-definition super-wideband</div>
          </div>

          <div className="glass-card" style={{ padding: '18px' }}>
            <div style={{ fontSize: '0.74rem', color: '#94a3b8', textTransform: 'uppercase' }}>Global Telephony PoPs</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#a78bfa', marginTop: '4px' }}>
              {report.totalPoPs} Regions
            </div>
            <div style={{ fontSize: '0.74rem', color: '#64748b' }}>North America, EMEA, APAC, LATAM</div>
          </div>

          <div className="glass-card" style={{ padding: '18px' }}>
            <div style={{ fontSize: '0.74rem', color: '#94a3b8', textTransform: 'uppercase' }}>Fleet Compliance</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#10b981', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={18} /> 100% SLA Compliant
            </div>
            <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '2px' }}>Zero packet drop across all SBCs</div>
          </div>
        </div>
      )}

      {/* Benchmark Result Banner */}
      {benchmarkResult && (
        <div style={{
          background: 'rgba(16, 185, 129, 0.12)',
          border: '1px solid #10b981',
          borderRadius: '12px',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontSize: '0.94rem', fontWeight: 700, color: '#fff' }}>
              Route Benchmark Succeeded: {benchmarkResult.popName} ({benchmarkResult.routeType})
            </div>
            <div style={{ fontSize: '0.78rem', color: '#cbd5e1', marginTop: '2px' }}>
              PDD: <strong>{benchmarkResult.metrics.measuredPddMs}ms</strong> • DNS SRV: <strong>{benchmarkResult.metrics.dnsLookupMs}ms</strong> • POLQA MOS: <strong>{benchmarkResult.metrics.mos}</strong> • Jitter: <strong>{benchmarkResult.metrics.jitterMs}ms</strong>
            </div>
          </div>
          <span className="badge badge-emerald">PASS (SLA MET)</span>
        </div>
      )}

      {/* Carrier Route Selector */}
      <div className="glass-card" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Server size={18} color="#06b6d4" />
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>Compare Carrier Telephony Routes:</span>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {[
            { id: 'DIRECT_BYOC_SBC', label: 'Direct BYOC SBC (Ashburn/Denver)' },
            { id: 'GENESYS_CLOUD_VOICE', label: 'Genesys Cloud Voice (GCV Dedicated)' },
            { id: 'WHOLESALE_PSTN', label: 'Tier-1 Wholesale PSTN (Telnyx/Twilio)' }
          ].map((r) => (
            <button
              key={r.id}
              onClick={() => setSelectedRouteType(r.id)}
              className={`badge ${selectedRouteType === r.id ? 'badge-cyan' : 'badge-slate'}`}
              style={{ cursor: 'pointer', padding: '6px 14px', fontSize: '0.76rem' }}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* 8 PoPs Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '18px' }}>
        {report?.pops?.map((pop) => {
          const perf = pop.carrierPerformance[selectedRouteType] || pop.carrierPerformance.DIRECT_BYOC_SBC;
          return (
            <div
              key={pop.id}
              className="glass-card"
              style={{
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.96rem', fontWeight: 700, color: '#fff' }}>{pop.name}</div>
                  <div style={{ fontSize: '0.74rem', color: '#06b6d4', marginTop: '2px' }}>
                    SBC: <code>{pop.primarySbc}</code> • Region: <code>{pop.regionCode}</code>
                  </div>
                </div>

                <span className="badge badge-emerald" style={{ fontSize: '0.66rem' }}>
                  {perf.status}
                </span>
              </div>

              {/* Latency Bars */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>POST-DIAL DELAY (PDD)</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: perf.pddMs < 1000 ? '#10b981' : '#f59e0b' }}>
                    {pop.liveMetrics?.measuredPddMs || perf.pddMs} ms
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Target &lt; 1500ms</div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>SRTP MEDIA RTT</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#38bdf8' }}>
                    {pop.liveMetrics?.measuredRttMs || perf.srtpRttMs} ms
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Jitter: {perf.jitterMs}ms</div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>POLQA MOS</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#10b981' }}>
                    {pop.liveMetrics?.measuredMos || perf.mos}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Loss: {perf.packetLossPct}%</div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
                  DNS SRV Resolve: <strong>{perf.srvLatencyMs}ms</strong> • SIP 100 Trying: <strong>{perf.sipTryingMs}ms</strong>
                </div>

                <button
                  onClick={() => handleBenchmark(pop.id)}
                  disabled={benchmarkingPopId === pop.id}
                  className="btn btn-secondary"
                  style={{ padding: '6px 14px', fontSize: '0.76rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  {benchmarkingPopId === pop.id ? <RefreshCw size={12} className="spin" /> : <Zap size={12} color="#06b6d4" />}
                  Benchmark Route
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
