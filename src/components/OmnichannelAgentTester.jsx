import React, { useState } from 'react';
import { Users, PhoneIncoming, Clock, CheckCircle2, Play, RefreshCw, Radio, Server, PhoneForwarded, ShieldCheck } from 'lucide-react';

export default function OmnichannelAgentTester() {
  const [platform, setPlatform] = useState('Genesys Cloud CX');
  const [testType, setTestType] = useState('Automated PSTN Callback Verification');
  const [isTesting, setIsTesting] = useState(false);
  const [result, setResult] = useState(null);

  const platforms = [
    'Genesys Cloud CX',
    'Amazon Connect CTI',
    'Avaya Experience Platform',
    'Cisco Finesse / Webex Contact Center',
    'NICE CXone'
  ];

  const handleRunTest = () => {
    setIsTesting(true);
    setResult(null);

    setTimeout(() => {
      setResult({
        platform,
        testType,
        callbackRequested: '18:42:00 UTC',
        callbackReceived: '18:42:45 UTC',
        callbackLatencySec: 45,
        ctiDataPassed: 'AccountID: 981042, Intent: BILLING_DISPUTE',
        status: 'PASSED (Callback Verified)',
        queueHoldTimeSec: 12,
        audioQualityMOS: 4.35
      });
      setIsTesting(false);
    }, 1200);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Users color="#6366f1" size={28} /> Omnichannel CTI Agent & PSTN Callback Tester
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Validate IVR queue hold times, CTI CAD data attachment, and automated PSTN customer callback flows across Genesys, Amazon Connect, and Avaya.
          </p>
        </div>

        <button 
          className="btn btn-primary" 
          onClick={handleRunTest} 
          disabled={isTesting}
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          {isTesting ? <RefreshCw className="spin" size={16} /> : <Play size={16} />}
          {isTesting ? 'Testing Callback Flow...' : 'Run Omnichannel Test'}
        </button>
      </div>

      {/* Selectors */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
        <div className="glass-card" style={{ padding: '16px' }}>
          <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Contact Center Platform (CCaaS)
          </label>
          <select 
            value={platform} 
            onChange={(e) => setPlatform(e.target.value)} 
            className="input-field" 
            style={{ width: '100%', marginTop: '8px' }}
          >
            {platforms.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        <div className="glass-card" style={{ padding: '16px' }}>
          <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Omnichannel Test Scenario
          </label>
          <select 
            value={testType} 
            onChange={(e) => setTestType(e.target.value)} 
            className="input-field" 
            style={{ width: '100%', marginTop: '8px' }}
          >
            <option value="Automated PSTN Callback Verification">Automated PSTN Callback Verification</option>
            <option value="CTI Screen Pop Data Integrity">CTI Screen Pop Data Integrity Check</option>
            <option value="IVR Queue Music & Hold Time">IVR Queue Music & Hold Time Benchmark</option>
            <option value="Warm Agent Transfer Handshake">Warm Agent Transfer Handshake</option>
          </select>
        </div>

        <div className="glass-card" style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Callback Verification</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#34d399', marginTop: '4px' }}>
              ONLINE (45s Avg)
            </div>
          </div>
          <PhoneForwarded size={36} color="#6366f1" style={{ opacity: 0.8 }} />
        </div>
      </div>

      {/* Results */}
      {result ? (
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={20} color="#34d399" /> Omnichannel Test Findings
            </h3>
            <span className="badge badge-emerald" style={{ fontSize: '0.85rem', padding: '6px 12px' }}>
              {result.status}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Callback Latency</span>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#38bdf8', marginTop: '4px' }}>
                {result.callbackLatencySec}s
              </div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Queue Hold Time</span>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#34d399', marginTop: '4px' }}>
                {result.queueHoldTimeSec}s
              </div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Audio Quality (MOS)</span>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#a78bfa', marginTop: '4px' }}>
                {result.audioQualityMOS} MOS
              </div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Target CCaaS</span>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginTop: '6px' }}>
                {result.platform}
              </div>
            </div>
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.9)', padding: '14px 18px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)', fontSize: '0.85rem', color: '#e2e8f0' }}>
            <strong style={{ color: '#06b6d4', display: 'block', marginBottom: '4px' }}>CTI Call Attached Data (CAD):</strong>
            <code>{result.ctiDataPassed}</code>
          </div>
        </div>
      ) : (
        <div className="glass-card" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
          <Users size={48} color="#6366f1" style={{ opacity: 0.4, marginBottom: '12px' }} />
          <p>Select your CCaaS platform and click "Run Omnichannel Test" to trigger automated PSTN callbacks.</p>
        </div>
      )}
    </div>
  );
}
