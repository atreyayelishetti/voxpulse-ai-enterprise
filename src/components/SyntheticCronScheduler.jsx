import React, { useState } from 'react';
import { 
  Clock, 
  Play, 
  Pause, 
  CheckCircle2, 
  AlertTriangle, 
  Bell, 
  Plus, 
  Trash2, 
  ShieldCheck, 
  Globe2, 
  Zap, 
  RefreshCw 
} from 'lucide-react';

export default function SyntheticCronScheduler() {
  const [schedules, setSchedules] = useState([
    {
      id: 'sch_1',
      name: 'US Toll-Free Main IVR Health Check',
      targetNumber: '+1 (800) 555-0199',
      cron: '*/5 * * * *',
      interval: 'Every 5 minutes',
      status: 'ACTIVE',
      lastRun: '1 min ago',
      lastResult: 'PASSED (MOS 4.41)',
      uptime: '99.998%'
    },
    {
      id: 'sch_2',
      name: 'UK International Inbound Route Verification',
      targetNumber: '+44 800 123 4567',
      cron: '*/15 * * * *',
      interval: 'Every 15 minutes',
      status: 'ACTIVE',
      lastRun: '8 mins ago',
      lastResult: 'PASSED (MOS 4.35)',
      uptime: '99.992%'
    },
    {
      id: 'sch_3',
      name: 'APAC Region Emergency Overflow Test',
      targetNumber: '+81 3 5555 0100',
      cron: '0 * * * *',
      interval: 'Hourly',
      status: 'PAUSED',
      lastRun: '2 hours ago',
      lastResult: 'WARNING (MOS 3.85)',
      uptime: '99.850%'
    }
  ]);

  const [newTestName, setNewTestName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newCron, setNewCron] = useState('*/10 * * * *');

  const handleAddSchedule = (e) => {
    e.preventDefault();
    if (!newTestName || !newNumber) return;

    const newObj = {
      id: `sch_${Date.now()}`,
      name: newTestName,
      targetNumber: newNumber,
      cron: newCron,
      interval: newCron === '*/5 * * * *' ? 'Every 5 minutes' : newCron === '*/10 * * * *' ? 'Every 10 minutes' : 'Hourly',
      status: 'ACTIVE',
      lastRun: 'Just now',
      lastResult: 'PENDING INITIAL RUN',
      uptime: '100.000%'
    };

    setSchedules([newObj, ...schedules]);
    setNewTestName('');
    setNewNumber('');
  };

  const toggleStatus = (id) => {
    setSchedules(schedules.map(s => s.id === id ? { ...s, status: s.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE' } : s));
  };

  const deleteSchedule = (id) => {
    setSchedules(schedules.filter(s => s.id !== id));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Clock size={24} color="#06b6d4" />
              Automated 24/7 Synthetic Cron Scheduler
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Configure continuous background IVR synthetic test polling with instant PagerDuty, Slack, and Webhook alerting.
            </p>
          </div>

          <span className="badge badge-emerald">
            <ShieldCheck size={14} /> 99.995% Global Synthetic Uptime SLA
          </span>
        </div>

        {/* Add Schedule Form */}
        <form onSubmit={handleAddSchedule} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1.2fr 1fr auto', gap: '14px', alignItems: 'flex-end', background: 'rgba(30, 41, 59, 0.5)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px', display: 'block' }}>SYNTHETIC TEST NAME</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="e.g. VIP Customer Care IVR Check" 
              value={newTestName} 
              onChange={e => setNewTestName(e.target.value)} 
            />
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px', display: 'block' }}>TARGET PHONE NUMBER</label>
            <input 
              type="text" 
              className="input-field" 
              placeholder="+1 (800) 555-0199" 
              value={newNumber} 
              onChange={e => setNewNumber(e.target.value)} 
            />
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px', display: 'block' }}>SCHEDULE INTERVAL</label>
            <select className="input-field" value={newCron} onChange={e => setNewCron(e.target.value)}>
              <option value="*/5 * * * *">Every 5 Minutes (High Priority)</option>
              <option value="*/10 * * * *">Every 10 Minutes</option>
              <option value="*/15 * * * *">Every 15 Minutes</option>
              <option value="0 * * * *">Hourly</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary" style={{ padding: '10px 18px' }}>
            <Plus size={16} /> Create Cron Schedule
          </button>
        </form>
      </div>

      {/* Active Schedules Table */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Zap size={18} color="#6366f1" /> Active Background Cron Schedules ({schedules.length})
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left', color: 'var(--text-muted)' }}>
                <th style={{ padding: '12px' }}>TEST NAME</th>
                <th style={{ padding: '12px' }}>TARGET NUMBER</th>
                <th style={{ padding: '12px' }}>INTERVAL</th>
                <th style={{ padding: '12px' }}>STATUS</th>
                <th style={{ padding: '12px' }}>LAST RESULT</th>
                <th style={{ padding: '12px' }}>UPTIME</th>
                <th style={{ padding: '12px', textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map(sch => (
                <tr key={sch.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <td style={{ padding: '14px 12px', fontWeight: 600, color: '#fff' }}>{sch.name}</td>
                  <td style={{ padding: '14px 12px', color: '#06b6d4', fontFamily: 'monospace' }}>{sch.targetNumber}</td>
                  <td style={{ padding: '14px 12px', color: 'var(--text-muted)' }}>{sch.interval}</td>
                  <td style={{ padding: '14px 12px' }}>
                    <span className={`badge ${sch.status === 'ACTIVE' ? 'badge-emerald' : 'badge-amber'}`}>
                      {sch.status}
                    </span>
                  </td>
                  <td style={{ padding: '14px 12px' }}>
                    <span style={{ color: sch.lastResult.includes('PASSED') ? '#10b981' : '#f59e0b', fontWeight: 600 }}>
                      {sch.lastResult}
                    </span>
                  </td>
                  <td style={{ padding: '14px 12px', color: '#6366f1', fontWeight: 700 }}>{sch.uptime}</td>
                  <td style={{ padding: '14px 12px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      <button onClick={() => toggleStatus(sch.id)} className="btn btn-secondary" style={{ padding: '6px 10px', fontSize: '0.75rem' }}>
                        {sch.status === 'ACTIVE' ? <Pause size={14} /> : <Play size={14} />}
                      </button>
                      <button onClick={() => deleteSchedule(sch.id)} className="btn btn-rose" style={{ padding: '6px 10px', fontSize: '0.75rem' }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
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
