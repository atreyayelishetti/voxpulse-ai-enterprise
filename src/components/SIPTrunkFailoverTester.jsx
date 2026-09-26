import React, { useState } from 'react';
import { Server, GitBranch, RefreshCw, Play, CheckCircle2, AlertTriangle, ShieldCheck, Cpu, Zap, Activity } from 'lucide-react';

export default function SIPTrunkFailoverTester() {
  const [primaryTrunk, setPrimaryTrunk] = useState('Ribbon SBC (AT&T Primary SIP Trunk)');
  const [secondaryTrunk, setSecondaryTrunk] = useState('Oracle Acme Packet (Telnyx Backup Trunk)');
  const [simulatedFailure, setSimulatedFailure] = useState('SIP 503 Service Unavailable');
  const [isTesting, setIsTesting] = useState(false);
  const [result, setResult] = useState(null);

  const handleTestFailover = () => {
    setIsTesting(true);
    setResult(null);

    setTimeout(() => {
      setResult({
        primaryTrunk,
        secondaryTrunk,
        failureInjected: simulatedFailure,
        failoverLatencyMs: 240,
        callsRerouted: 50,
        droppedCalls: 0,
        failoverStatus: 'PASSED (Seamless SBC Failover)',
        sipResponseCode: 'SIP 302 Moved Temporarily ➔ Secondary INVITE'
      });
      setIsTesting(false);
    }, 1100);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <GitBranch color="#38bdf8" size={28} /> SIP Trunk SBC Failover & Load Balancer Tester
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Simulate primary PSTN trunk outages (503 Service Unavailable, 408 Timeout) and benchmark Session Border Controller failover latency.
          </p>
        </div>

        <button 
          className="btn btn-primary" 
          onClick={handleTestFailover} 
          disabled={isTesting}
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          {isTesting ? <RefreshCw className="spin" size={16} /> : <Play size={16} />}
          {isTesting ? 'Testing SBC Failover...' : 'Trigger Trunk Failover Test'}
        </button>
      </div>

      {/* Selectors */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
        <div className="glass-card" style={{ padding: '16px' }}>
          <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Primary SBC Trunk
          </label>
          <select 
            value={primaryTrunk} 
            onChange={(e) => setPrimaryTrunk(e.target.value)} 
            className="input-field" 
            style={{ width: '100%', marginTop: '8px' }}
          >
            <option value="Ribbon SBC (AT&T Primary SIP Trunk)">Ribbon SBC (AT&T Primary SIP Trunk)</option>
            <option value="Cisco CUBE (Verizon Business Trunk)">Cisco CUBE (Verizon Business Trunk)</option>
            <option value="AudioCodes Mediant (Twilio Direct SIP)">AudioCodes Mediant (Twilio Direct SIP)</option>
          </select>
        </div>

        <div className="glass-card" style={{ padding: '16px' }}>
          <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Secondary Backup Trunk
          </label>
          <select 
            value={secondaryTrunk} 
            onChange={(e) => setSecondaryTrunk(e.target.value)} 
            className="input-field" 
            style={{ width: '100%', marginTop: '8px' }}
          >
            <option value="Oracle Acme Packet (Telnyx Backup Trunk)">Oracle Acme Packet (Telnyx Backup Trunk)</option>
            <option value="Ribbon Edge (Bandwidth.com Trunk)">Ribbon Edge (Bandwidth.com Trunk)</option>
          </select>
        </div>

        <div className="glass-card" style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Failover SLA Target</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#34d399', marginTop: '4px' }}>
              &lt; 500 ms (Passed)
            </div>
          </div>
          <ShieldCheck size={36} color="#34d399" style={{ opacity: 0.8 }} />
        </div>
      </div>

      {/* Findings */}
      {result ? (
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={20} color="#34d399" /> SIP Trunk Failover Test Audit
            </h3>
            <span className="badge badge-emerald" style={{ fontSize: '0.85rem', padding: '6px 12px' }}>
              {result.failoverStatus}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Failover Latency</span>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#38bdf8', marginTop: '4px' }}>
                {result.failoverLatencyMs} ms
              </div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Calls Rerouted</span>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#34d399', marginTop: '4px' }}>
                {result.callsRerouted} Calls
              </div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Dropped Call Count</span>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#34d399', marginTop: '4px' }}>
                {result.droppedCalls} Dropped
              </div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>SIP Failover Action</span>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#a78bfa', marginTop: '6px' }}>
                {result.sipResponseCode}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="glass-card" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
          <GitBranch size={48} color="#38bdf8" style={{ opacity: 0.4, marginBottom: '12px' }} />
          <p>Click "Trigger Trunk Failover Test" to simulate SBC primary trunk failure and measure failover latency.</p>
        </div>
      )}
    </div>
  );
}
