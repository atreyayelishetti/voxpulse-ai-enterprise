import React, { useState } from 'react';
import { Route, Server, ShieldCheck, ArrowRight, CheckCircle2, Play, RefreshCw, Sliders } from 'lucide-react';

export default function SIPOutboundProxyRouter() {
  const [strategy, setStrategy] = useState('priority');
  const [testNumber, setTestNumber] = useState('+18005550199');
  const [routeDecision, setRouteDecision] = useState(null);

  const proxies = [
    { id: 'ashburn', name: 'US-East Ashburn SBC', host: 'sbc-ashburn.voxpulse.internal:5060', priority: 10, weight: 70, latency: '14ms', status: 'ACTIVE' },
    { id: 'sanjose', name: 'US-West San Jose SBC', host: 'sbc-sanjose.voxpulse.internal:5060', priority: 20, weight: 30, latency: '32ms', status: 'ACTIVE' },
    { id: 'frankfurt', name: 'EU-Central Frankfurt SBC', host: 'sbc-frankfurt.voxpulse.internal:5060', priority: 50, weight: 0, latency: '88ms', status: 'STANDBY' }
  ];

  const handleTestRoute = () => {
    setRouteDecision({
      destination: testNumber,
      selectedProxy: proxies[0],
      outboundURI: `sip:${testNumber}@${proxies[0].host}`,
      headersInjected: ['P-Asserted-Identity', 'X-VoxPulse-Route-ID: route_ash_p10', 'Max-Forwards: 69'],
      latencyExpectation: '14ms'
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Route color="#06b6d4" size={28} /> SIP Outbound Proxy Router & SBC Edge Gateway
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            RFC 3261 Outbound Proxy distribution. Reroutes SIP INVITE requests across geographic SBC clusters with DNS SRV prioritization.
          </p>
        </div>
      </div>

      {/* Strategy Selector & Test Form */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr auto', gap: '16px', alignItems: 'flex-end' }}>
          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
              Routing Policy
            </label>
            <select 
              value={strategy}
              onChange={(e) => setStrategy(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', background: 'rgba(0,0,0,0.4)', color: '#fff', border: '1px solid var(--border-color)', borderRadius: '6px' }}
            >
              <option value="priority">Priority Failover (DNS SRV Priority)</option>
              <option value="roundrobin">Weighted Round-Robin (Capacity Load)</option>
              <option value="latency">Lowest Latency First (GEO-DNS)</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
              Target PSTN Destination Number
            </label>
            <input 
              type="text" 
              value={testNumber}
              onChange={(e) => setTestNumber(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', background: 'rgba(0,0,0,0.4)', color: '#fff', border: '1px solid var(--border-color)', borderRadius: '6px' }}
            />
          </div>

          <button 
            className="btn btn-primary"
            onClick={handleTestRoute}
            style={{ height: '42px', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Play size={16} /> Simulate Route
          </button>
        </div>

        {routeDecision && (
          <div style={{ marginTop: '20px', padding: '16px', background: 'rgba(6, 182, 212, 0.08)', border: '1px solid #06b6d4', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#06b6d4' }}>
              Route Calculated: Forwarding to {routeDecision.selectedProxy.name}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginTop: '10px', fontSize: '0.82rem' }}>
              <div>Outbound URI: <strong style={{ color: '#fff', fontFamily: 'monospace' }}>{routeDecision.outboundURI}</strong></div>
              <div>Estimated Hop Latency: <strong style={{ color: '#10b981' }}>{routeDecision.latencyExpectation}</strong></div>
              <div>SIP Headers Added: <strong style={{ color: '#38bdf8' }}>{routeDecision.headersInjected.join(', ')}</strong></div>
            </div>
          </div>
        )}
      </div>

      {/* SBC Proxy Node Pool */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
          Configured SBC Outbound Proxy Nodes
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', textAlign: 'left' }}>
                <th style={{ padding: '10px' }}>Proxy Cluster</th>
                <th style={{ padding: '10px' }}>FQDN / Socket</th>
                <th style={{ padding: '10px' }}>SRV Priority</th>
                <th style={{ padding: '10px' }}>SRV Weight</th>
                <th style={{ padding: '10px' }}>Ping Latency</th>
                <th style={{ padding: '10px' }}>Node State</th>
              </tr>
            </thead>
            <tbody>
              {proxies.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 10px', fontWeight: 700, color: '#fff' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Server size={16} color="#06b6d4" />
                      {p.name}
                    </div>
                  </td>
                  <td style={{ padding: '12px 10px', color: '#94a3b8', fontFamily: 'monospace' }}>{p.host}</td>
                  <td style={{ padding: '12px 10px', color: '#38bdf8' }}>{p.priority}</td>
                  <td style={{ padding: '12px 10px', color: '#f59e0b' }}>{p.weight}%</td>
                  <td style={{ padding: '12px 10px', color: '#10b981' }}>{p.latency}</td>
                  <td style={{ padding: '12px 10px' }}>
                    <span className={`badge ${p.status === 'ACTIVE' ? 'badge-emerald' : 'badge-amber'}`}>
                      {p.status}
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
