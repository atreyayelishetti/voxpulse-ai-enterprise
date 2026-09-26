import React, { useState } from 'react';
import { ArrowLeftRight, CheckCircle2, AlertTriangle, ShieldCheck, Play, RotateCcw } from 'lucide-react';

export default function SIPPrackReliableProvisional() {
  const [prackStage, setPrackStage] = useState(0);
  const [simulateLoss, setSimulateLoss] = useState(false);

  const handshakeSteps = [
    { step: 1, sender: 'UAC (VoxPulse)', receiver: 'UAS (Carrier SBC)', message: 'INVITE (Supported: 100rel)', desc: 'Client advertises RFC 3262 reliable provisional response support.', status: 'OK' },
    { step: 2, sender: 'UAS (Carrier SBC)', receiver: 'UAC (VoxPulse)', message: '183 Session Progress (Require: 100rel, RSeq: 1001)', desc: 'Provisional response demanding reliable delivery with sequence number RSeq 1001.', status: 'OK' },
    { step: 3, sender: 'UAC (VoxPulse)', receiver: 'UAS (Carrier SBC)', message: simulateLoss ? '[LOST ON WIRE] PRACK (RAck: 1001 1 INVITE)' : 'PRACK (RAck: 1001 1 INVITE)', desc: simulateLoss ? 'Packet dropped. Carrier SBC begins RFC 3262 retransmission timer.' : 'Client sends PRACK acknowledging RSeq 1001 for CSeq 1 INVITE.', status: simulateLoss ? 'DROPPED' : 'OK' },
    { step: 4, sender: 'UAS (Carrier SBC)', receiver: 'UAC (VoxPulse)', message: simulateLoss ? '183 RETRANSMIT (RSeq: 1001)' : '200 OK (PRACK Answer)', desc: simulateLoss ? 'SBC retransmits 183 after Timer T1 expiry.' : 'Provisional response handshake successfully concluded.', status: 'OK' }
  ];

  const handleNext = () => {
    setPrackStage((prev) => (prev < handshakeSteps.length - 1 ? prev + 1 : 0));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ArrowLeftRight color="#06b6d4" size={28} /> RFC 3262 SIP PRACK & 100rel Reliable Provisional Diagnostics
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Verify end-to-end reliability of 180 Ringing and 183 Session Progress early media across telecom carrier interconnects.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            className={`btn ${simulateLoss ? 'btn-danger' : 'btn-secondary'}`}
            onClick={() => setSimulateLoss(!simulateLoss)}
          >
            {simulateLoss ? 'Packet Loss Injected' : 'Simulate Dropped PRACK'}
          </button>
          <button 
            className="btn btn-primary"
            onClick={handleNext}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Play size={16} /> Step Transaction ({prackStage + 1}/{handshakeSteps.length})
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>RFC 3262 Protocol Status</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>100rel ACTIVE</div>
          <span className="badge badge-emerald" style={{ marginTop: '8px', display: 'inline-block' }}>Reliable Early Media</span>
        </div>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Provisional Sequence</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#06b6d4', marginTop: '4px' }}>RSeq: 1001</div>
          <span className="badge badge-cyan" style={{ marginTop: '8px', display: 'inline-block' }}>Monotonic Increment</span>
        </div>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>PRACK Acknowledgment</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#a855f7', marginTop: '4px' }}>RAck Verified</div>
          <span className="badge badge-purple" style={{ marginTop: '8px', display: 'inline-block' }}>Matched CSeq 1 INVITE</span>
        </div>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Retransmit Timer</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f59e0b', marginTop: '4px' }}>Timer T1 (500ms)</div>
          <span className="badge badge-amber" style={{ marginTop: '8px', display: 'inline-block' }}>Exponential Backoff</span>
        </div>
      </div>

      {/* Handshake Flow Sequence */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
          RFC 3262 PRACK Transaction Handshake Sequence
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {handshakeSteps.map((h, i) => {
            const isCurrent = i === prackStage;
            const isPassed = i < prackStage;
            return (
              <div 
                key={i}
                style={{ 
                  padding: '16px', 
                  borderRadius: '8px', 
                  border: `1px solid ${isCurrent ? '#06b6d4' : isPassed ? '#10b981' : 'var(--border-color)'}`,
                  background: isCurrent ? 'rgba(6, 182, 212, 0.08)' : isPassed ? 'rgba(16, 185, 129, 0.04)' : 'rgba(0,0,0,0.2)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '16px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: isPassed ? '#10b981' : isCurrent ? '#06b6d4' : 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#fff', fontSize: '0.85rem' }}>
                    {h.step}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#fff' }}>
                      {h.sender} ➔ {h.receiver}: <span style={{ color: h.status === 'DROPPED' ? '#ef4444' : '#38bdf8', fontFamily: 'monospace' }}>{h.message}</span>
                    </div>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>{h.desc}</p>
                  </div>
                </div>
                <span className={`badge ${h.status === 'DROPPED' ? 'badge-rose' : 'badge-emerald'}`}>
                  {h.status}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
