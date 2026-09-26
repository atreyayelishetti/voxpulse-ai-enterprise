import React, { useState } from 'react';
import { Server, Globe2, Activity, ShieldCheck, Search, Radio, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

export default function GlobalProbeOrchestrator() {
  const [lrnInput, setLrnInput] = useState('+1 (212) 555-0144');
  const [lrnResult, setLrnResult] = useState(null);
  const [isSearchingLRN, setIsSearchingLRN] = useState(false);

  const probeNodes = [
    { id: 'fra-1', city: 'Frankfurt', country: 'Germany', provider: 'Deutsche Telekom / Vodafone', ping: '12ms', sipStatus: 'OK (200)', tls: 'TLS 1.3 Valid', load: '14%' },
    { id: 'lnd-1', city: 'London', country: 'United Kingdom', provider: 'BT / Virgin Media', ping: '18ms', sipStatus: 'OK (200)', tls: 'TLS 1.3 Valid', load: '22%' },
    { id: 'nyc-1', city: 'New York', country: 'United States', provider: 'AT&T / Verizon PSTN', ping: '24ms', sipStatus: 'OK (200)', tls: 'TLS 1.3 Valid', load: '31%' },
    { id: 'sfo-1', city: 'San Francisco', country: 'United States', provider: 'T-Mobile / Lumen', ping: '28ms', sipStatus: 'OK (200)', tls: 'TLS 1.3 Valid', load: '19%' },
    { id: 'tky-1', city: 'Tokyo', country: 'Japan', provider: 'NTT Docomo / Softbank', ping: '84ms', sipStatus: 'OK (200)', tls: 'TLS 1.3 Valid', load: '8%' },
    { id: 'syd-1', city: 'Sydney', country: 'Australia', provider: 'Telstra / Optus', ping: '142ms', sipStatus: 'OK (200)', tls: 'TLS 1.3 Valid', load: '11%' },
    { id: 'sgp-1', city: 'Singapore', country: 'Singapore', provider: 'Singtel / StarHub', ping: '115ms', sipStatus: 'OK (200)', tls: 'TLS 1.3 Valid', load: '15%' },
    { id: 'sao-1', city: 'São Paulo', country: 'Brazil', provider: 'Claro / Vivo', ping: '168ms', sipStatus: 'OK (200)', tls: 'TLS 1.3 Valid', load: '5%' }
  ];

  const handleLookupLRN = (e) => {
    e.preventDefault();
    setIsSearchingLRN(true);
    setTimeout(() => {
      setLrnResult({
        number: lrnInput,
        lrn: '2125559900',
        currentCarrier: 'AT&T Communications (OCN 9104)',
        originalCarrier: 'Verizon New York (OCN 9132)',
        isPorted: true,
        jurisdiction: 'Indeterminate / InterLATA',
        lata: '132 (New York City)',
        cityState: 'New York, NY'
      });
      setIsSearchingLRN(false);
    }, 600);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Server color="#6366f1" size={28} /> Global Probe Orchestrator & LRN Carrier Inspector
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Monitor real-time SIP telemetry across distributed global test nodes and inspect Location Routing Number (LRN) carrier porting.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <span className="badge badge-emerald" style={{ padding: '6px 12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle2 size={14} /> 12 / 12 Nodes Online
          </span>
        </div>
      </div>

      {/* LRN Routing Inspector Section */}
      <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Search size={18} color="#06b6d4" /> LRN (Location Routing Number) Carrier Lookup
        </h3>

        <form onSubmit={handleLookupLRN} style={{ display: 'flex', gap: '12px' }}>
          <input 
            type="text" 
            value={lrnInput} 
            onChange={(e) => setLrnInput(e.target.value)} 
            placeholder="+1 (xxx) xxx-xxxx"
            className="input-field" 
            style={{ flex: 1, padding: '10px 14px' }}
          />
          <button className="btn btn-primary" type="submit" disabled={isSearchingLRN} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {isSearchingLRN ? <RefreshCw className="spin" size={16} /> : <Search size={16} />}
            Query Telco LRN DB
          </button>
        </form>

        {lrnResult && (
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', fontSize: '0.85rem' }}>
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block' }}>LRN Routing Code:</span>
              <strong style={{ color: '#06b6d4', fontSize: '1.05rem' }}>{lrnResult.lrn}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block' }}>Current SP (Carrier):</span>
              <strong style={{ color: '#fff' }}>{lrnResult.currentCarrier}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block' }}>Original SP:</span>
              <span style={{ color: 'var(--text-muted)' }}>{lrnResult.originalCarrier}</span>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block' }}>Number Ported Status:</span>
              <span className={`badge ${lrnResult.isPorted ? 'badge-amber' : 'badge-emerald'}`}>
                {lrnResult.isPorted ? 'PORTED (AT&T)' : 'ORIGINAL'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Global Probe Nodes Table */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Globe2 size={18} color="#34d399" /> Edge Telephony Testing Nodes (POPs)
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.72rem' }}>
                <th style={{ padding: '10px' }}>Location</th>
                <th style={{ padding: '10px' }}>Local PSTN Carrier</th>
                <th style={{ padding: '10px' }}>SIP Latency</th>
                <th style={{ padding: '10px' }}>SIP OPTIONS</th>
                <th style={{ padding: '10px' }}>SRTP Security</th>
                <th style={{ padding: '10px' }}>Node Load</th>
                <th style={{ padding: '10px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {probeNodes.map((node) => (
                <tr key={node.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '12px 10px', fontWeight: 600, color: '#fff' }}>
                    {node.city}, <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>{node.country}</span>
                  </td>
                  <td style={{ padding: '12px 10px', color: 'var(--text-muted)' }}>{node.provider}</td>
                  <td style={{ padding: '12px 10px', color: '#38bdf8', fontWeight: 600 }}>{node.ping}</td>
                  <td style={{ padding: '12px 10px', color: '#34d399', fontWeight: 600 }}>{node.sipStatus}</td>
                  <td style={{ padding: '12px 10px', color: '#a78bfa' }}>{node.tls}</td>
                  <td style={{ padding: '12px 10px', color: 'var(--text-muted)' }}>{node.load}</td>
                  <td style={{ padding: '12px 10px' }}>
                    <span className="badge badge-emerald">HEALTHY</span>
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
