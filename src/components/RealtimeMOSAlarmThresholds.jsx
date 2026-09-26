import React, { useState } from 'react';
import { Bell, Sliders, AlertTriangle, ShieldCheck, CheckCircle2, Zap } from 'lucide-react';

export default function RealtimeMOSAlarmThresholds() {
  const [criticalMos, setCriticalMos] = useState(3.5);
  const [warningMos, setWarningMos] = useState(4.0);
  const [maxJitter, setMaxJitter] = useState(30);
  const [maxPacketLoss, setMaxPacketLoss] = useState(2.0);
  const [maxPdd, setMaxPdd] = useState(3.0);
  const [testTriggered, setTestTriggered] = useState(false);

  const activeAlerts = [
    { id: 1, trunk: 'Tata Comm London-Transit', metric: 'MOS 3.42', threshold: '< 3.5 MOS', severity: 'CRITICAL', status: 'REROUTED_TO_TELNYX', time: '10:14:22' },
    { id: 2, trunk: 'Twilio Chicago-POP', metric: 'Jitter 34ms', threshold: '> 30ms', severity: 'WARNING', status: 'MONITORING', time: '09:48:10' }
  ];

  const handleTestAlarm = () => {
    setTestTriggered(true);
    setTimeout(() => setTestTriggered(false), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Bell color="#f59e0b" size={28} /> Real-time MOS & Telephony Alarm Threshold Policies
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            SLA alert trigger engine. Dispatches PagerDuty incidents and initiates automatic carrier SBC trunk diversions upon audio degradation.
          </p>
        </div>
        <button 
          className="btn btn-secondary"
          onClick={handleTestAlarm}
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Zap size={16} color="#f59e0b" /> Test Webhook Trigger
        </button>
      </div>

      {testTriggered && (
        <div style={{ padding: '16px', background: 'rgba(245, 158, 11, 0.15)', border: '1px solid #f59e0b', borderRadius: '8px', color: '#f59e0b', fontWeight: 700, fontSize: '0.9rem' }}>
          ✓ Synthetic Critical Alarm Dispatched to PagerDuty & Slack #telecom-noc (Incident #INC-94812)
        </div>
      )}

      {/* Threshold Configuration Sliders */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sliders size={20} color="#06b6d4" /> SLA Threshold Calibration
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Critical MOS Floor</label>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f43f5e' }}>{criticalMos.toFixed(2)} MOS</span>
            </div>
            <input 
              type="range" 
              min="2.5" 
              max="3.9" 
              step="0.05"
              value={criticalMos} 
              onChange={(e) => setCriticalMos(parseFloat(e.target.value))} 
              style={{ width: '100%', accentColor: '#f43f5e' }} 
            />
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Auto-reroutes trunk to secondary carrier</span>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Warning MOS Threshold</label>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f59e0b' }}>{warningMos.toFixed(2)} MOS</span>
            </div>
            <input 
              type="range" 
              min="3.6" 
              max="4.3" 
              step="0.05"
              value={warningMos} 
              onChange={(e) => setWarningMos(parseFloat(e.target.value))} 
              style={{ width: '100%', accentColor: '#f59e0b' }} 
            />
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Sends Slack notification to NOC</span>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Maximum Network Jitter</label>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#06b6d4' }}>{maxJitter} ms</span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="80" 
              value={maxJitter} 
              onChange={(e) => setMaxJitter(parseInt(e.target.value, 10))} 
              style={{ width: '100%', accentColor: '#06b6d4' }} 
            />
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Packet arrival variance limit</span>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Max Packet Loss</label>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ef4444' }}>{maxPacketLoss.toFixed(1)}%</span>
            </div>
            <input 
              type="range" 
              min="0.5" 
              max="10.0" 
              step="0.5"
              value={maxPacketLoss} 
              onChange={(e) => setMaxPacketLoss(parseFloat(e.target.value))} 
              style={{ width: '100%', accentColor: '#ef4444' }} 
            />
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Dropped packet percentage</span>
          </div>
        </div>
      </div>

      {/* Active Threshold Alarm Events */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
          Recent Threshold Incident Log
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', textAlign: 'left' }}>
                <th style={{ padding: '10px' }}>Timestamp</th>
                <th style={{ padding: '10px' }}>Trunk Target</th>
                <th style={{ padding: '10px' }}>Violated Value</th>
                <th style={{ padding: '10px' }}>Configured Rule</th>
                <th style={{ padding: '10px' }}>Automated Remediation</th>
                <th style={{ padding: '10px' }}>Severity</th>
              </tr>
            </thead>
            <tbody>
              {activeAlerts.map((a) => (
                <tr key={a.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 10px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{a.time}</td>
                  <td style={{ padding: '12px 10px', fontWeight: 700, color: '#fff' }}>{a.trunk}</td>
                  <td style={{ padding: '12px 10px', color: '#f43f5e', fontWeight: 700 }}>{a.metric}</td>
                  <td style={{ padding: '12px 10px', color: '#38bdf8' }}>{a.threshold}</td>
                  <td style={{ padding: '12px 10px', color: '#10b981', fontWeight: 600 }}>{a.status}</td>
                  <td style={{ padding: '12px 10px' }}>
                    <span className={`badge ${a.severity === 'CRITICAL' ? 'badge-rose' : 'badge-amber'}`}>
                      {a.severity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
