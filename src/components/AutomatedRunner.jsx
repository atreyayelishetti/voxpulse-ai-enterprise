import React, { useState } from 'react';
import { 
  PlayCircle, 
  Globe2, 
  Server, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw,
  Zap,
  Activity,
  ShieldCheck
} from 'lucide-react';

const MULTI_COUNTRY_NODES = [
  { id: 'us-east', name: 'US East (Virginia)', flag: '🇺🇸', number: '+18005550100', latency: '42ms', mos: '4.45', status: 'ONLINE' },
  { id: 'us-west', name: 'US West (Oregon)', flag: '🇺🇸', number: '+18005550199', latency: '65ms', mos: '4.40', status: 'ONLINE' },
  { id: 'eu-uk', name: 'Europe (London)', flag: '🇬🇧', number: '+442079460000', latency: '112ms', mos: '4.32', status: 'ONLINE' },
  { id: 'eu-de', name: 'Europe (Frankfurt)', flag: '🇩🇪', number: '+496912345678', latency: '128ms', mos: '4.35', status: 'ONLINE' },
  { id: 'ap-jp', name: 'Asia Pacific (Tokyo)', flag: '🇯🇵', number: '+81312345678', latency: '185ms', mos: '4.20', status: 'ONLINE' },
  { id: 'ap-in', name: 'Asia Pacific (Mumbai)', flag: '🇮🇳', number: '+912212345678', latency: '210ms', mos: '4.15', status: 'ONLINE' },
];

export default function AutomatedRunner({ onRunTest }) {
  const [isRunningAll, setIsRunningAll] = useState(false);
  const [scheduledJobs, setScheduledJobs] = useState([
    { id: 'job_1', name: 'Hourly IVR Health Check', interval: 'Every 60 min', status: 'ACTIVE', lastRun: '12 mins ago', successRate: '100%' },
    { id: 'job_2', name: 'Multi-Country Carriers Audit', interval: 'Daily at 02:00 UTC', status: 'ACTIVE', lastRun: '4 hours ago', successRate: '98.5%' },
    { id: 'job_3', name: 'PCI-DSS Compliance Audio Audit', interval: 'Weekly', status: 'ACTIVE', lastRun: '2 days ago', successRate: '100%' }
  ]);

  const handleRunAllCountries = () => {
    setIsRunningAll(true);
    setTimeout(() => {
      setIsRunningAll(false);
    }, 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Banner */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <PlayCircle size={22} color="#10b981" />
              Automated Global IVR Test Runner
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Orchestrate concurrent PSTN test calls across multi-country carrier nodes replacing Klearcom global testing.
            </p>
          </div>

          <button 
            onClick={handleRunAllCountries} 
            className="btn btn-emerald"
            disabled={isRunningAll}
          >
            {isRunningAll ? (
              <>
                <RefreshCw size={18} style={{ animation: 'spin 1s linear infinite' }} />
                Testing Global Nodes...
              </>
            ) : (
              <>
                <Zap size={18} /> Run All Multi-Country Nodes
              </>
            )}
          </button>
        </div>

        {/* Global Carrier Nodes Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {MULTI_COUNTRY_NODES.map(node => (
            <div key={node.id} style={{
              background: 'rgba(31, 41, 55, 0.5)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '1.4rem' }}>{node.flag}</span>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>{node.name}</div>
                    <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{node.number}</div>
                  </div>
                </div>

                <span className="badge badge-emerald" style={{ fontSize: '0.65rem' }}>
                  {node.status}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', background: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '8px' }}>
                <div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>ROUNDTRIP LATENCY</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#38bdf8' }}>{node.latency}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>MOS CLARITY</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#34d399' }}>{node.mos} / 5.0</div>
                </div>
              </div>

              <button 
                onClick={() => onRunTest({ name: `Test from ${node.name}`, targetNumber: node.number, country: node.id.split('-')[1].toUpperCase() })}
                className="btn btn-secondary" 
                style={{ fontSize: '0.8rem', padding: '6px' }}
              >
                Run Test on Node
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Scheduled Test Jobs & CI/CD Integrations */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Clock size={18} color="#06b6d4" /> Scheduled Continuous Testing & CI/CD Triggers
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {scheduledJobs.map(job => (
            <div key={job.id} style={{
              background: 'rgba(31, 41, 55, 0.4)',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>{job.name}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Schedule: {job.interval} • Last execution: {job.lastRun}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>SUCCESS SLA</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#34d399' }}>{job.successRate}</div>
                </div>

                <span className="badge badge-emerald">ACTIVE</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
