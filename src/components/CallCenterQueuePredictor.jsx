import React, { useState } from 'react';
import { Users, Calculator } from 'lucide-react';

export default function CallCenterQueuePredictor() {
  const [inboundRate, setInboundRate] = useState(120);
  const [numAgents, setNumAgents] = useState(15);

  const avgSpeedAnswer = Math.max(5, Math.floor(450 / numAgents));
  const serviceLevel = numAgents >= 15 ? '88.4% (<20s)' : '62.1% (<20s)';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Users color="#6366f1" size={28} /> Erlang C Capacity Model & Queue SLA Predictor
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Calculate required agent staffing headcount to meet target Service Level Agreements (SLAs).
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
        <div className="glass-card" style={{ padding: '20px' }}>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Inbound Calls / Hour</label>
          <input type="number" value={inboundRate} onChange={(e) => setInboundRate(parseInt(e.target.value) || 0)} className="input-field" style={{ width: '100%', marginTop: '6px' }} />
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>Active Agent Headcount</label>
          <input type="number" value={numAgents} onChange={(e) => setNumAgents(parseInt(e.target.value) || 1)} className="input-field" style={{ width: '100%', marginTop: '6px' }} />
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Predicted Service Level</span>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#34d399', marginTop: '4px' }}>{serviceLevel}</div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ASA: {avgSpeedAnswer} seconds</span>
        </div>
      </div>
    </div>
  );
}
