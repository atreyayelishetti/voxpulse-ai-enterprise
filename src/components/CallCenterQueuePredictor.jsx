import React, { useState } from 'react';
import { Users, Clock, Sliders, CheckCircle2, ShieldCheck, Zap, RefreshCw, BarChart2 } from 'lucide-react';

export default function CallCenterQueuePredictor() {
  const [callsPerHour, setCallsPerHour] = useState(600);
  const [ahtSeconds, setAhtSeconds] = useState(180);
  const [targetAnswerSec, setTargetAnswerSec] = useState(20);
  const [agents, setAgents] = useState(36);
  const [isCalculating, setIsCalculating] = useState(false);

  // Erlang C math calculations
  const trafficIntensity = (callsPerHour * ahtSeconds) / 3600;
  const m = Math.max(Math.ceil(trafficIntensity) + 1, agents);

  // Erlang C formula implementation
  const calculateErlangC = () => {
    function factorial(n) {
      let r = 1;
      for (let i = 2; i <= n; i++) r *= i;
      return r;
    }
    let sumA = 0;
    for (let k = 0; k < m; k++) {
      sumA += Math.pow(trafficIntensity, k) / factorial(k);
    }
    const numerator = Math.pow(trafficIntensity, m) / (factorial(m) * (1 - trafficIntensity / m));
    const pw = numerator / (sumA + numerator);
    const serviceLevel = (1 - pw * Math.exp(-(m - trafficIntensity) * (targetAnswerSec / ahtSeconds))) * 100;
    const asa = (pw * ahtSeconds) / (m - trafficIntensity);
    const occupancy = (trafficIntensity / m) * 100;

    let rec = Math.ceil(trafficIntensity) + 1;
    while (rec < 150) {
      let sA = 0;
      for (let k = 0; k < rec; k++) sA += Math.pow(trafficIntensity, k) / factorial(k);
      const num = Math.pow(trafficIntensity, rec) / (factorial(rec) * (1 - trafficIntensity / rec));
      const p = num / (sA + num);
      const sl = (1 - p * Math.exp(-(rec - trafficIntensity) * (targetAnswerSec / ahtSeconds))) * 100;
      if (sl >= 80) break;
      rec++;
    }

    return {
      serviceLevel: Math.min(100, Math.max(0, serviceLevel)).toFixed(1),
      probabilityOfWait: (pw * 100).toFixed(1),
      asa: Math.max(0, asa).toFixed(1),
      occupancy: occupancy.toFixed(1),
      recAgents: rec
    };
  };

  const results = calculateErlangC();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Users color="#06b6d4" size={28} /> Erlang C Contact Center Queue & Staffing Capacity Predictor
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            A.K. Erlang telephony queue modeling. Computes Service Level Agreement (SLA 80/20), Average Speed of Answer (ASA), and agent occupancy.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Service Level (80/20 Target)</span>
          <div style={{ fontSize: '2.4rem', fontWeight: 800, color: results.serviceLevel >= 80 ? '#10b981' : '#ef4444', marginTop: '4px' }}>
            {results.serviceLevel}%
          </div>
          <span className={`badge ${results.serviceLevel >= 80 ? 'badge-emerald' : 'badge-rose'}`} style={{ marginTop: '8px', display: 'inline-block' }}>
            {results.serviceLevel >= 80 ? 'SLA Met' : 'SLA Breach'}
          </span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Average Speed of Answer (ASA)</span>
          <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#06b6d4', marginTop: '4px' }}>
            {results.asa}s
          </div>
          <span className="badge badge-cyan" style={{ marginTop: '8px', display: 'inline-block' }}>Caller Hold Time</span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Agent Occupancy Rate</span>
          <div style={{ fontSize: '2.4rem', fontWeight: 800, color: results.occupancy > 88 ? '#f59e0b' : '#10b981', marginTop: '4px' }}>
            {results.occupancy}%
          </div>
          <span className="badge badge-purple" style={{ marginTop: '8px', display: 'inline-block' }}>
            {results.occupancy > 88 ? 'Burnout Risk (>88%)' : 'Optimal Efficiency'}
          </span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Recommended Staffing</span>
          <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#f59e0b', marginTop: '4px' }}>
            {results.recAgents} Agents
          </div>
          <span className="badge badge-amber" style={{ marginTop: '8px', display: 'inline-block' }}>Required for 80/20</span>
        </div>
      </div>

      {/* Sliders Grid */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sliders size={20} color="#06b6d4" /> Call Arrival & Queue Parameters
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Call Arrival Volume (Calls / Hour)</label>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#06b6d4' }}>{callsPerHour} calls/hr</span>
            </div>
            <input 
              type="range" 
              min="100" 
              max="2000" 
              step="50"
              value={callsPerHour} 
              onChange={(e) => setCallsPerHour(parseInt(e.target.value, 10))} 
              style={{ width: '100%', accentColor: '#06b6d4' }} 
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Average Handle Time (AHT)</label>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f59e0b' }}>{ahtSeconds} seconds</span>
            </div>
            <input 
              type="range" 
              min="60" 
              max="420" 
              step="10"
              value={ahtSeconds} 
              onChange={(e) => setAhtSeconds(parseInt(e.target.value, 10))} 
              style={{ width: '100%', accentColor: '#f59e0b' }} 
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Staffed Available Agents</label>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#10b981' }}>{agents} Agents</span>
            </div>
            <input 
              type="range" 
              min="15" 
              max="120" 
              value={agents} 
              onChange={(e) => setAgents(parseInt(e.target.value, 10))} 
              style={{ width: '100%', accentColor: '#10b981' }} 
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Target Service Level Time</label>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#a855f7' }}>{targetAnswerSec} seconds</span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="60" 
              step="5"
              value={targetAnswerSec} 
              onChange={(e) => setTargetAnswerSec(parseInt(e.target.value, 10))} 
              style={{ width: '100%', accentColor: '#a855f7' }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
