import React, { useState } from 'react';
import { Flame, AlertTriangle, ShieldCheck, Zap, Play, RefreshCw, Cpu, Activity, RefreshCcw } from 'lucide-react';

export default function ChaosEngineeringStudio() {
  const [faultType, setFaultType] = useState('DTMF Glitch (Double Tone)');
  const [targetDID, setTargetDID] = useState('+1 (800) 555-0199');
  const [isSimulating, setIsSimulating] = useState(false);
  const [chaosLog, setChaosLog] = useState(null);

  const faultTypes = [
    { id: 'DTMF Glitch (Double Tone)', name: 'DTMF Glitch (Double Keypress Bounce)', severity: 'Medium' },
    { id: 'Mid-Call Carrier Disconnect', name: 'Mid-Call SIP Carrier Drop (RTP Timeout)', severity: 'High' },
    { id: 'Dead Air Silence (20s)', name: 'Dead Air Silence Injection (20 Seconds)', severity: 'Medium' },
    { id: 'Audio Clipping & Distortion', name: 'Audio Clipping & 30% Distortion', severity: 'High' }
  ];

  const handleInjectFault = () => {
    setIsSimulating(true);
    setChaosLog(null);

    setTimeout(() => {
      setChaosLog({
        targetDID,
        faultType,
        resilienceScore: '98.5%',
        recoveryTimeMs: '180ms',
        outcome: 'HANDLED (IVR Re-prompted User Cleanly)',
        details: 'IVR detected double DTMF digit 11, cleared buffer, played "Invalid entry, please press 1 again" and successfully recovered.'
      });
      setIsSimulating(false);
    }, 1100);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Flame color="#f43f5e" size={28} /> IVR Telephony Chaos Engineering Studio
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Inject unexpected PSTN carrier failures, DTMF bounces, dead air silences, and audio clipping to verify IVR fallback resilience.
          </p>
        </div>

        <button 
          className="btn btn-danger" 
          onClick={handleInjectFault} 
          disabled={isSimulating}
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          {isSimulating ? <RefreshCw className="spin" size={16} /> : <Zap size={16} />}
          {isSimulating ? 'Injecting Chaos Fault...' : 'Inject Chaos Fault'}
        </button>
      </div>

      {/* Selectors */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
        <div className="glass-card" style={{ padding: '16px' }}>
          <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Fault Scenario Type
          </label>
          <select 
            value={faultType} 
            onChange={(e) => setFaultType(e.target.value)} 
            className="input-field" 
            style={{ width: '100%', marginTop: '8px' }}
          >
            {faultTypes.map(f => (
              <option key={f.id} value={f.id}>{f.name}</option>
            ))}
          </select>
        </div>

        <div className="glass-card" style={{ padding: '16px' }}>
          <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Target Telephony Line (DID)
          </label>
          <input 
            type="text" 
            value={targetDID} 
            onChange={(e) => setTargetDID(e.target.value)} 
            className="input-field" 
            style={{ width: '100%', marginTop: '8px' }}
          />
        </div>

        <div className="glass-card" style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>System Resilience Rating</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#34d399', marginTop: '4px' }}>
              GRADE A+ (99.1%)
            </div>
          </div>
          <ShieldCheck size={36} color="#34d399" style={{ opacity: 0.8 }} />
        </div>
      </div>

      {/* Chaos Execution Findings */}
      {chaosLog ? (
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertTriangle size={20} color="#f43f5e" /> Chaos Injection Test Results
            </h3>
            <span className="badge badge-emerald" style={{ fontSize: '0.85rem', padding: '6px 12px' }}>
              {chaosLog.outcome}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Resilience Score</span>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#34d399', marginTop: '4px' }}>
                {chaosLog.resilienceScore}
              </div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Recovery Latency</span>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#38bdf8', marginTop: '4px' }}>
                {chaosLog.recoveryTimeMs}
              </div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Target Endpoint</span>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginTop: '6px' }}>
                {chaosLog.targetDID}
              </div>
            </div>
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.9)', padding: '14px 18px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)', fontSize: '0.85rem', color: '#e2e8f0' }}>
            <strong style={{ color: '#06b6d4', display: 'block', marginBottom: '4px' }}>Detailed Diagnosis:</strong>
            {chaosLog.details}
          </div>
        </div>
      ) : (
        <div className="glass-card" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
          <Flame size={48} color="#f43f5e" style={{ opacity: 0.4, marginBottom: '12px' }} />
          <p>Select a chaos fault scenario and target DID, then click "Inject Chaos Fault".</p>
        </div>
      )}
    </div>
  );
}
