import React, { useState } from 'react';
import { ShieldAlert, Mic, UserCheck, Lock, AlertTriangle, CheckCircle2, Play, RefreshCw, Cpu, Activity, Fingerprint } from 'lucide-react';

export default function VoiceBiometricsTester() {
  const [targetEngine, setTargetEngine] = useState('Nuance Gatekeeper / NICE');
  const [attackVector, setAttackVector] = useState('Synthetic Gemini Voice Clone');
  const [isSimulating, setIsSimulating] = useState(false);
  const [testResult, setTestResult] = useState(null);

  const attackVectors = [
    { id: 'Synthetic Gemini Voice Clone', name: 'AI Voice Clone (Zero-Shot Synthesis)', risk: 'High' },
    { id: 'Replay Attack (Recorded Audio)', name: 'Replay Attack (High-Fidelity PSTN Record)', risk: 'Medium' },
    { id: 'Formant & Pitch Shifted Audio', name: 'Formant & Pitch Shift Manipulation', risk: 'Low' },
    { id: 'Noise Injection Masking', name: 'Background Noise Anti-Biometrics Masking', risk: 'Medium' }
  ];

  const handleRunBiometricsTest = () => {
    setIsSimulating(true);
    setTestResult(null);

    setTimeout(() => {
      const isCloneAttack = attackVector.includes('Voice Clone');
      setTestResult({
        engine: targetEngine,
        attackVector,
        verificationStatus: isCloneAttack ? 'REJECTED (Biometric Spoof Detected)' : 'PASSED (Legitimate Speaker)',
        spoofScore: isCloneAttack ? 98.4 : 12.1, // % chance of spoof
        spectralSimilarity: isCloneAttack ? 94.2 : 99.8,
        livenessDetected: !isCloneAttack,
        decisionLatency: '310ms',
        securityCompliance: 'PASSED - Anti-Spoofing Active'
      });
      setIsSimulating(false);
    }, 1200);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Fingerprint color="#a78bfa" size={28} /> Voice Biometrics & Anti-Spoofing Auditor
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Benchmark enterprise voice authentication security (Nuance, NICE, Pindrop) against synthetic Gemini voice clones and replay spoofing.
          </p>
        </div>

        <button 
          className="btn btn-primary" 
          onClick={handleRunBiometricsTest} 
          disabled={isSimulating}
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          {isSimulating ? <RefreshCw className="spin" size={16} /> : <Play size={16} />}
          {isSimulating ? 'Simulating Biometric Attack...' : 'Execute Spoofing Audit'}
        </button>
      </div>

      {/* Top Parameter Selector Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
        <div className="glass-card" style={{ padding: '16px' }}>
          <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Target IVR Biometrics System
          </label>
          <select 
            value={targetEngine} 
            onChange={(e) => setTargetEngine(e.target.value)} 
            className="input-field" 
            style={{ width: '100%', marginTop: '8px' }}
          >
            <option value="Nuance Gatekeeper / NICE">Nuance Gatekeeper / NICE Voice Vault</option>
            <option value="Pindrop Passport">Pindrop Passport Anti-Fraud Engine</option>
            <option value="Verint Voice Biometrics">Verint Enterprise Voice ID</option>
            <option value="Amazon Connect Voice ID">Amazon Connect Voice ID</option>
          </select>
        </div>

        <div className="glass-card" style={{ padding: '16px' }}>
          <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Synthetic Audio Attack Vector
          </label>
          <select 
            value={attackVector} 
            onChange={(e) => setAttackVector(e.target.value)} 
            className="input-field" 
            style={{ width: '100%', marginTop: '8px' }}
          >
            {attackVectors.map(a => (
              <option key={a.id} value={a.id}>{a.name}</option>
            ))}
          </select>
        </div>

        <div className="glass-card" style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Security Status</div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#34d399', marginTop: '4px' }}>
              Anti-Spoofing Active
            </div>
          </div>
          <Lock size={32} color="#a78bfa" style={{ opacity: 0.8 }} />
        </div>
      </div>

      {/* Results Section */}
      {testResult ? (
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldAlert size={20} color="#06b6d4" /> Biometric Security Audit Findings
            </h3>
            <span className={`badge ${testResult.verificationStatus.includes('REJECTED') ? 'badge-emerald' : 'badge-amber'}`} style={{ fontSize: '0.85rem', padding: '6px 12px' }}>
              {testResult.verificationStatus}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Synthetic Spoof Probability</span>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: testResult.spoofScore > 80 ? '#f43f5e' : '#34d399', marginTop: '4px' }}>
                {testResult.spoofScore}%
              </div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Spectral Similarity Match</span>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#38bdf8', marginTop: '4px' }}>
                {testResult.spectralSimilarity}%
              </div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Voice Liveness Check</span>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: testResult.livenessDetected ? '#34d399' : '#f43f5e', marginTop: '4px' }}>
                {testResult.livenessDetected ? 'LIVENESS CONFIRMED' : 'SYNTHETIC / REPLAY'}
              </div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Decision Latency</span>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#a78bfa', marginTop: '4px' }}>
                {testResult.decisionLatency}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="glass-card" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
          <Fingerprint size={48} color="#6366f1" style={{ opacity: 0.4, marginBottom: '12px' }} />
          <p>Select an IVR Voice Biometrics engine and synthetic attack vector, then click "Execute Spoofing Audit".</p>
        </div>
      )}
    </div>
  );
}
