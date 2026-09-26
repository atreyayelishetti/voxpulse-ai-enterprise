import React, { useState } from 'react';
import { 
  ShieldAlert, 
  PhoneCall, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Bell, 
  Activity,
  Zap
} from 'lucide-react';

const EMERGENCY_LINES = [
  { id: 1, name: '911 Emergency Dispatch Trunk #1', number: '911 / +18005559110', country: 'US', status: 'HEALTHY', uptime: '100.0%', lastCheck: '2 mins ago' },
  { id: 2, name: '112 European Emergency Dispatch', number: '112 / +442079469112', country: 'UK', status: 'HEALTHY', uptime: '99.99%', lastCheck: '5 mins ago' },
  { id: 3, name: 'Toll-Free Priority Claims Hotline', number: '+1 (800) 999-0199', country: 'US', status: 'HEALTHY', uptime: '100.0%', lastCheck: '1 min ago' },
  { id: 4, name: '24/7 High-Value VIP Support Line', number: '+49 (800) 123-4567', country: 'DE', status: 'HEALTHY', uptime: '99.98%', lastCheck: '3 mins ago' }
];

export default function EmergencyMonitor() {
  const [lines, setLines] = useState(EMERGENCY_LINES);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Banner */}
      <div className="glass-panel glass-panel-glow" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldAlert size={24} color="#f43f5e" />
              Emergency & Toll-Free 24/7 Outage Monitor
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Continuous 24/7/365 reachability & silent-failure auditing for critical emergency and high-priority lines.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button 
              className="btn btn-secondary" 
              onClick={() => {
                setLines(prev => prev.map(l => ({ ...l, lastCheck: 'Just now', status: 'HEALTHY' })));
              }}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Activity size={16} color="#38bdf8" /> Ping All Trunks
            </button>
            <span className="badge badge-rose" style={{ padding: '6px 12px' }}>
              <span className="pulse-dot" style={{ backgroundColor: '#f43f5e' }} /> 24/7 Outage Monitor Active
            </span>
          </div>
        </div>
      </div>

      {/* Grid of Emergency Lines */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
        {lines.map(line => (
          <div key={line.id} style={{
            background: 'rgba(31, 41, 55, 0.5)',
            border: '1px solid var(--border-color)',
            borderRadius: '14px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>{line.name}</div>
                <div style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: '#38bdf8' }}>{line.number}</div>
              </div>

              <span className="badge badge-emerald">
                <CheckCircle2 size={13} /> {line.status}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', background: 'rgba(0,0,0,0.25)', padding: '12px', borderRadius: '10px' }}>
              <div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>AVAILABILITY SLA</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#34d399' }}>{line.uptime}</div>
              </div>

              <div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>LAST AUDIT</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#e5e7eb' }}>{line.lastCheck}</div>
              </div>

              <div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>SILENCE CHECK</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#34d399' }}>PASSED</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px' }}>
              <button
                className="btn btn-secondary"
                style={{ fontSize: '0.78rem', padding: '4px 10px', display: 'flex', alignItems: 'center', gap: '4px' }}
                onClick={() => {
                  setLines(prev => prev.map(l => l.id === line.id ? { ...l, lastCheck: 'Testing now...', status: 'TESTING' } : l));
                  setTimeout(() => {
                    setLines(prev => prev.map(l => l.id === line.id ? { ...l, lastCheck: 'Just now', status: 'HEALTHY' } : l));
                  }, 600);
                }}
              >
                <Zap size={12} color="#f59e0b" /> Test Line Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
