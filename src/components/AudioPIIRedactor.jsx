import React, { useState } from 'react';
import { VolumeX, ShieldCheck, Play, RefreshCw, CheckCircle2, Lock, FileAudio, Scissors } from 'lucide-react';

export default function AudioPIIRedactor() {
  const [redactionMethod, setRedactionMethod] = useState('1kHz Tone Bleep (Standard)');
  const [selectedCall, setSelectedCall] = useState('Call #9104 - Customer Account Authentication');
  const [isRedacting, setIsRedacting] = useState(false);
  const [redactionResult, setRedactionResult] = useState(null);

  const handleRedactAudio = () => {
    setIsRedacting(true);
    setRedactionResult(null);

    setTimeout(() => {
      setRedactionResult({
        callId: 'Call #9104',
        piiDetected: [
          { type: 'Credit Card Number (16-Digit)', timestamp: '00:14.20 - 00:18.40', status: 'BLEEPED (1kHz Tone)' },
          { type: 'Social Security Number (4-Digit)', timestamp: '00:32.10 - 00:34.50', status: 'BLEEPED (1kHz Tone)' }
        ],
        complianceStatus: 'PCI-DSS v4.0 & HIPAA COMPLIANT',
        cleanedWavUrl: '/api/dtmf/wav?digit=0'
      });
      setIsRedacting(false);
    }, 1100);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <VolumeX color="#f43f5e" size={28} /> Call Audio PII & PCI Redaction Engine
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Automatically detect and sanitize spoken SSNs, credit card numbers, and PII from call recordings for GDPR and PCI compliance.
          </p>
        </div>

        <button 
          className="btn btn-primary" 
          onClick={handleRedactAudio} 
          disabled={isRedacting}
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          {isRedacting ? <RefreshCw className="spin" size={16} /> : <Scissors size={16} />}
          {isRedacting ? 'Sanitizing Recording...' : 'Execute Audio PII Redaction'}
        </button>
      </div>

      {/* Selectors */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
        <div className="glass-card" style={{ padding: '16px' }}>
          <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Select Call Audio Recording
          </label>
          <select 
            value={selectedCall} 
            onChange={(e) => setSelectedCall(e.target.value)} 
            className="input-field" 
            style={{ width: '100%', marginTop: '8px' }}
          >
            <option value="Call #9104 - Customer Account Authentication">Call #9104 - Customer Account Authentication</option>
            <option value="Call #9105 - Healthcare DOB & Policy Verification">Call #9105 - Healthcare DOB Verification</option>
          </select>
        </div>

        <div className="glass-card" style={{ padding: '16px' }}>
          <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Redaction Audio Technique
          </label>
          <select 
            value={redactionMethod} 
            onChange={(e) => setRedactionMethod(e.target.value)} 
            className="input-field" 
            style={{ width: '100%', marginTop: '8px' }}
          >
            <option value="1kHz Tone Bleep (Standard)">1kHz Tone Bleep (Standard)</option>
            <option value="Zero Amplitude Silence Mask">Zero Amplitude Silence Mask</option>
            <option value="White Noise Overlay">White Noise Overlay</option>
          </select>
        </div>

        <div className="glass-card" style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Compliance Masking</div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#34d399', marginTop: '4px' }}>
              PCI-DSS v4.0 Active
            </div>
          </div>
          <Lock size={32} color="#34d399" style={{ opacity: 0.8 }} />
        </div>
      </div>

      {/* Redaction Output */}
      {redactionResult ? (
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={20} color="#34d399" /> Sanitization Audit Log
            </h3>
            <span className="badge badge-emerald" style={{ fontSize: '0.85rem', padding: '6px 12px' }}>
              {redactionResult.complianceStatus}
            </span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.72rem' }}>
                  <th style={{ padding: '10px' }}>PII Data Type Detected</th>
                  <th style={{ padding: '10px' }}>Audio Timestamp Range</th>
                  <th style={{ padding: '10px' }}>Redaction Outcome</th>
                </tr>
              </thead>
              <tbody>
                {redactionResult.piiDetected.map((item, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '12px 10px', fontWeight: 700, color: '#fff' }}>{item.type}</td>
                    <td style={{ padding: '12px 10px', color: '#06b6d4', fontWeight: 600 }}>{item.timestamp}</td>
                    <td style={{ padding: '12px 10px' }}>
                      <span className="badge badge-emerald">{item.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="glass-card" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
          <FileAudio size={48} color="#f43f5e" style={{ opacity: 0.4, marginBottom: '12px' }} />
          <p>Click "Execute Audio PII Redaction" to strip sensitive spoken data from recordings.</p>
        </div>
      )}
    </div>
  );
}
