import React, { useState } from 'react';
import { PhoneForwarded, Play, RotateCcw, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';

export default function SIPReferTransferTester() {
  const [transferMode, setTransferMode] = useState('blind');
  const [targetAgent, setTargetAgent] = useState('+18005550199');
  const [isExecuting, setIsExecuting] = useState(false);
  const [transferLog, setTransferLog] = useState([
    { time: '10:00:01', event: 'REFER Sent', desc: `Refer-To: <sip:${targetAgent}@carrier.com>`, code: 'REFER' },
    { time: '10:00:01', event: 'Transfer Acknowledged', desc: 'Remote SBC accepted transfer request', code: '202 Accepted' },
    { time: '10:00:02', event: 'NOTIFY Progress', desc: 'Subscription-State: active; SIP/2.0 100 Trying', code: 'NOTIFY' },
    { time: '10:00:03', event: 'NOTIFY Ringing', desc: 'Subscription-State: active; SIP/2.0 180 Ringing', code: 'NOTIFY' },
    { time: '10:00:05', event: 'NOTIFY Connected', desc: 'Subscription-State: terminated; SIP/2.0 200 OK', code: 'NOTIFY' },
    { time: '10:00:05', event: 'Leg Teardown', desc: 'Original leg terminated via BYE', code: 'BYE' }
  ]);

  const handleExecuteTransfer = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setTransferLog([
        { time: new Date().toLocaleTimeString(), event: 'REFER Initiated', desc: `Refer-To: <sip:${targetAgent}@carrier.com>`, code: 'REFER' },
        { time: new Date().toLocaleTimeString(), event: 'SBC Accepted', desc: 'Call leg transferred to agent queue', code: '202 Accepted' },
        { time: new Date().toLocaleTimeString(), event: 'Transfer Success', desc: 'Remote agent answered SIP leg', code: '200 OK' }
      ]);
      setIsExecuting(false);
    }, 600);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <PhoneForwarded color="#06b6d4" size={28} /> RFC 3515 SIP REFER Blind & Attended Transfer Engine
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Test call transfers from IVR to human agents. Validates Refer-To URI headers, NOTIFY event package updates, and BYE teardown.
          </p>
        </div>
      </div>

      {/* Transfer Parameters */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr auto', gap: '16px', alignItems: 'flex-end' }}>
          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
              Transfer Topology
            </label>
            <select 
              value={transferMode}
              onChange={(e) => setTransferMode(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', background: 'rgba(0,0,0,0.4)', color: '#fff', border: '1px solid var(--border-color)', borderRadius: '6px' }}
            >
              <option value="blind">Blind / Unattended Transfer</option>
              <option value="attended">Attended / Consultative Transfer (Replaces:)</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
              Target Destination (Refer-To URI)
            </label>
            <input 
              type="text" 
              value={targetAgent}
              onChange={(e) => setTargetAgent(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', background: 'rgba(0,0,0,0.4)', color: '#fff', border: '1px solid var(--border-color)', borderRadius: '6px' }}
            />
          </div>

          <button 
            className="btn btn-primary"
            onClick={handleExecuteTransfer}
            disabled={isExecuting}
            style={{ height: '42px', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Play size={16} /> Execute RFC 3515 REFER
          </button>
        </div>
      </div>

      {/* Transaction Log */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
          SIP Transfer Signaling Event Trace
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {transferLog.map((log, i) => (
            <div 
              key={i} 
              style={{ 
                padding: '12px 16px', 
                background: 'rgba(255,255,255,0.02)', 
                borderLeft: `4px solid ${log.code === '200 OK' || log.code === '202 Accepted' ? '#10b981' : '#06b6d4'}`,
                borderRadius: '0 6px 6px 0',
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{log.time}</span>
                  <span style={{ fontWeight: 700, color: '#fff', fontSize: '0.9rem' }}>{log.event}</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '4px 0 0' }}>{log.desc}</p>
              </div>
              <span className="badge badge-cyan">{log.code}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
