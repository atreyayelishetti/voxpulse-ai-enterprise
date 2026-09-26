import React, { useState } from 'react';
import { 
  TrendingDown, 
  DollarSign, 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  Server, 
  Zap, 
  ArrowRight,
  Info,
  Layers,
  PhoneCall
} from 'lucide-react';

export default function KlearcomROI() {
  const [testCallsPerMonth, setTestCallsPerMonth] = useState(5000);
  const [numCountries, setNumCountries] = useState(4);

  // Cost calculation logic
  const klearcomBaseCost = 3000 * 12; // $36,000 base annual subscription
  const klearcomPortCost = numCountries * 1500; // $1,500/year per additional country port
  const totalKlearcomAnnual = klearcomBaseCost + klearcomPortCost;

  // In-House VoxPulse AI Cost
  const twilioPerMinCost = 0.013; // $0.013/min average PSTN cost
  const callDurationMinutes = 2; // 2 min average test call
  const totalCarrierAnnual = testCallsPerMonth * 12 * callDurationMinutes * twilioPerMinCost;
  const geminiApiAnnual = testCallsPerMonth * 12 * 0.002; // $0.002 per Gemini 2.0 prompt request
  const hostingAnnual = 600; // VPS / AWS App server $50/mo
  const totalVoxPulseAnnual = Math.round(totalCarrierAnnual + geminiApiAnnual + hostingAnnual);

  const annualSavings = totalKlearcomAnnual - totalVoxPulseAnnual;
  const savingsPercent = Math.round((annualSavings / totalKlearcomAnnual) * 100);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Banner */}
      <div className="glass-panel glass-panel-glow" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <TrendingDown size={24} color="#10b981" />
              Klearcom Migration & ROI Cost Calculator
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Compare commercial Klearcom costs with your in-house VoxPulse AI + Gemini + Twilio stack.
            </p>
          </div>

          <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '10px 18px', borderRadius: '12px', textAlign: 'right' }}>
            <div style={{ fontSize: '0.7rem', color: '#a7f3d0', fontWeight: 700 }}>ESTIMATED ANNUAL SAVINGS</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#34d399', fontFamily: 'var(--font-display)' }}>
              ${annualSavings.toLocaleString()} / yr ({savingsPercent}%)
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Calculator Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Left Input Sliders */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
            Testing Volume Parameters
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>TEST CALLS PER MONTH</label>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#38bdf8' }}>{testCallsPerMonth.toLocaleString()} calls</span>
              </div>
              <input 
                type="range" 
                min="500" 
                max="50000" 
                step="500" 
                value={testCallsPerMonth} 
                onChange={e => setTestCallsPerMonth(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#6366f1' }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>TARGET TESTING COUNTRIES</label>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#a78bfa' }}>{numCountries} Countries</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="25" 
                value={numCountries} 
                onChange={e => setNumCountries(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#8b5cf6' }}
              />
            </div>
          </div>
        </div>

        {/* Right Financial Breakdown */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
            Annual Cost Comparison
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.3)', padding: '14px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>Commercial Klearcom Platform</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Fixed SaaS subscription + port fees</div>
              </div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#f87171', fontFamily: 'var(--font-display)' }}>
                ${totalKlearcomAnnual.toLocaleString()} / yr
              </div>
            </div>

            <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '14px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>In-House VoxPulse AI + Gemini</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Usage-based Twilio PSTN + Gemini 2.0 API</div>
              </div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#34d399', fontFamily: 'var(--font-display)' }}>
                ${totalVoxPulseAnnual.toLocaleString()} / yr
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What Else Is Required Section */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Layers size={22} color="#06b6d4" />
          What Else Is Required to Complete In-House Klearcom Replacement
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          <div style={{ background: 'rgba(31, 41, 55, 0.5)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '16px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#06b6d4', textTransform: 'uppercase', marginBottom: '4px' }}>1. TELEPHONY CARRIER</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>Twilio / Telnyx API Account</div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
              Register for Twilio or Telnyx to buy local/toll-free phone numbers in target test countries and receive SIP / PSTN trunking WebHooks.
            </p>
          </div>

          <div style={{ background: 'rgba(31, 41, 55, 0.5)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '16px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#818cf8', textTransform: 'uppercase', marginBottom: '4px' }}>2. AI MODEL ENGINE</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>Google Gemini 2.0 API Key</div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
              Obtain a Gemini API key to enable low-latency multimodal voice prompt verification, intent classification, and multi-lingual auditing.
            </p>
          </div>

          <div style={{ background: 'rgba(31, 41, 55, 0.5)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '16px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#34d399', textTransform: 'uppercase', marginBottom: '4px' }}>3. INFRASTRUCTURE & HOSTING</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>Docker / Cloud Gateway</div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
              Deploy this VoxPulse Node.js server on AWS ECS, GCP Cloud Run, or your internal Kubernetes cluster with WebSocket port access.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
