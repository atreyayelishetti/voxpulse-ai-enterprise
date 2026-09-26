import React, { useState } from 'react';
import { Layers, ArrowRight, Play, RotateCcw, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function SIPDialogStateTracker() {
  const [dialogStep, setDialogStep] = useState(0);

  const steps = [
    { name: '1. Outbound INVITE Sent', state: 'INITIAL', desc: 'Call-ID generated, From-tag: 99a1b2, To-tag: NONE. Dialog initiated.', color: '#06b6d4' },
    { name: '2. 183 Session Progress (Early Media)', state: 'EARLY', desc: 'Carrier returns To-tag: carrier_77f81. Early dialog established. Audio RTP ringing playing.', color: '#f59e0b' },
    { name: '3. 200 OK + ACK Handshake', state: 'CONFIRMED', desc: 'Call answered. 2-way RTP media active. Local CSeq: 101, Remote CSeq: 201.', color: '#10b981' },
    { name: '4. BYE Teardown', state: 'TERMINATED', desc: 'Call ended by remote agent or IVR timeout. Dialog state machine deallocated.', color: '#94a3b8' }
  ];

  const current = steps[dialogStep];

  const handleNext = () => {
    setDialogStep((prev) => (prev < steps.length - 1 ? prev + 1 : 0));
  };

  const handleReset = () => {
    setDialogStep(0);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Layers color="#06b6d4" size={28} /> RFC 3261 SIP Dialog Finite State Machine (FSM) Tracker
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Track SIP session dialog lifetimes, peer To/From tags, CSeq sequence monotonic increments, and route sets.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            className="btn btn-secondary"
            onClick={handleReset}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <RotateCcw size={16} /> Reset FSM
          </button>
          <button 
            className="btn btn-primary"
            onClick={handleNext}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Play size={16} /> Step Next Signal ({dialogStep + 1}/{steps.length})
          </button>
        </div>
      </div>

      {/* State Pipeline Visualizer */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
          SIP Dialog Lifecycle State Progression
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
          {steps.map((s, idx) => {
            const isActive = idx === dialogStep;
            const isCompleted = idx < dialogStep;
            return (
              <div 
                key={idx} 
                style={{ 
                  padding: '16px', 
                  borderRadius: '8px', 
                  border: `1px solid ${isActive ? s.color : isCompleted ? '#10b981' : 'var(--border-color)'}`,
                  background: isActive ? `${s.color}15` : isCompleted ? 'rgba(16, 185, 129, 0.05)' : 'rgba(0,0,0,0.2)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: isActive ? s.color : isCompleted ? '#10b981' : 'var(--text-muted)' }}>
                    PHASE {idx + 1}
                  </span>
                  {isCompleted && <CheckCircle2 size={16} color="#10b981" />}
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', marginTop: '6px' }}>{s.state}</div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '6px' }}>{s.name}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dialog Identifiers & Peer State */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
            Current Dialog State Details
          </h3>
          <div style={{ padding: '16px', background: `${current.color}15`, border: `1px solid ${current.color}`, borderRadius: '8px', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: current.color }}>ACTIVE STATE</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', marginTop: '2px' }}>{current.state}</div>
            <p style={{ fontSize: '0.85rem', color: '#cbd5e1', marginTop: '6px' }}>{current.desc}</p>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
            Dialog Tuple & Monotonic Headers
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Call-ID:</span>
              <span style={{ color: '#06b6d4', fontFamily: 'monospace' }}>call-88194a-3829@voxpulse.internal</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Local Tag (From):</span>
              <span style={{ color: '#fff', fontFamily: 'monospace' }}>99a1b2c3</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Remote Tag (To):</span>
              <span style={{ color: dialogStep > 0 ? '#10b981' : '#f43f5e', fontFamily: 'monospace' }}>
                {dialogStep > 0 ? 'carrier_77f81' : 'NONE (Early Pending)'}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px' }}>
              <span style={{ color: 'var(--text-muted)' }}>Local CSeq:</span>
              <span style={{ color: '#38bdf8', fontFamily: 'monospace' }}>{100 + dialogStep} INVITE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
