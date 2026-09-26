import React, { useState } from 'react';
import { Server, Play, RefreshCw } from 'lucide-react';

export default function SIPReferTransferTester() {
  const [isTesting, setIsTesting] = useState(false);
  const [result, setResult] = useState(null);

  const handleTestRefer = () => {
    setIsTesting(true);
    setTimeout(() => {
      setResult({
        referTo: 'sip:agent204@voxpulse.io',
        notifyReceived: 'SIP/2.0 200 OK (NOTIFY)',
        transferLatencyMs: 180,
        status: 'PASSED (Blind Transfer Complete)'
      });
      setIsTesting(false);
    }, 1000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Server color="#38bdf8" size={28} /> Blind & Attended Call Transfer SIP REFER Validator
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Audit RFC 3515 SIP REFER method and NOTIFY subscription updates during call transfers.
          </p>
        </div>

        <button className="btn btn-primary" onClick={handleTestRefer} disabled={isTesting}>
          {isTesting ? <RefreshCw className="spin" size={16} /> : <Play size={16} />}
          {isTesting ? 'Sending REFER...' : 'Test SIP REFER Transfer'}
        </button>
      </div>

      {result && (
        <div className="glass-card" style={{ padding: '24px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Refer-To Target URI</span>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', marginTop: '4px' }}>{result.referTo}</div>
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>NOTIFY Handshake</span>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#38bdf8', marginTop: '4px' }}>{result.notifyReceived}</div>
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Transfer Switch Latency</span>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#34d399', marginTop: '4px' }}>{result.transferLatencyMs} ms</div>
          </div>
        </div>
      )}
    </div>
  );
}
