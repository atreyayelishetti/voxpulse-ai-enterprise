import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingDown, 
  Calculator, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  BarChart3 
} from 'lucide-react';

export default function CarrierLCRSavingsCalc() {
  const [monthlyTestCalls, setMonthlyTestCalls] = useState(50000);
  const [avgCallDurationSec, setAvgCallDurationSec] = useState(45);
  const [klearcomRatePerMin, setKlearcomRatePerMin] = useState(0.085); // $0.085 per minute on Klearcom
  const [voxpulseRatePerMin, setVoxpulseRatePerMin] = useState(0.0045); // $0.0045 per minute on Telnyx/Direct Egress

  const totalMinutes = Math.round((monthlyTestCalls * avgCallDurationSec) / 60);
  const klearcomMonthlyCost = Math.round(totalMinutes * klearcomRatePerMin);
  const voxpulseMonthlyCost = Math.round(totalMinutes * voxpulseRatePerMin);
  const monthlySavings = klearcomMonthlyCost - voxpulseMonthlyCost;
  const annualSavings = monthlySavings * 12;
  const savingsPercent = klearcomMonthlyCost > 0 ? Math.round((monthlySavings / klearcomMonthlyCost) * 100) : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <TrendingDown size={24} color="#10b981" />
              Carrier LCR & Klearcom Replacement Cost Savings Calculator
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Calculate ROI and annual financial savings switching from third-party vendor SaaS pricing to VoxPulse AI direct carrier egress.
            </p>
          </div>

          <span className="badge badge-emerald" style={{ fontSize: '0.85rem', padding: '8px 14px' }}>
            <Sparkles size={16} /> {savingsPercent}% Projected Savings
          </span>
        </div>

        {/* Input Sliders */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', background: 'rgba(30, 41, 59, 0.5)', padding: '20px', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}>MONTHLY AUTOMATED TEST CALLS</label>
              <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#06b6d4' }}>{monthlyTestCalls.toLocaleString()} calls</span>
            </div>
            <input 
              type="range" 
              min="5000" 
              max="500000" 
              step="5000" 
              value={monthlyTestCalls} 
              onChange={e => setMonthlyTestCalls(parseInt(e.target.value, 10))}
              style={{ width: '100%', accentColor: '#06b6d4' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}>AVERAGE CALL DURATION (SECONDS)</label>
              <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#6366f1' }}>{avgCallDurationSec} seconds</span>
            </div>
            <input 
              type="range" 
              min="15" 
              max="180" 
              step="5" 
              value={avgCallDurationSec} 
              onChange={e => setAvgCallDurationSec(parseInt(e.target.value, 10))}
              style={{ width: '100%', accentColor: '#6366f1' }}
            />
          </div>
        </div>

        {/* Financial Comparison Summary Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '18px', marginTop: '24px' }}>
          <div style={{ background: 'rgba(239, 68, 68, 0.08)', padding: '20px', borderRadius: '14px', border: '1px solid rgba(239, 68, 68, 0.25)' }}>
            <div style={{ fontSize: '0.78rem', color: '#f87171', fontWeight: 700 }}>LEGACY VENDOR COST (KLEARCOM / CYARA)</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f87171', margin: '8px 0' }}>${klearcomMonthlyCost.toLocaleString()}<span style={{ fontSize: '0.9rem', fontWeight: 500 }}>/mo</span></div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Rate: ${klearcomRatePerMin}/min + Vendor Markup</div>
          </div>

          <div style={{ background: 'rgba(16, 185, 129, 0.08)', padding: '20px', borderRadius: '14px', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
            <div style={{ fontSize: '0.78rem', color: '#34d399', fontWeight: 700 }}>IN-HOUSE VOXPULSE AI COST</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#34d399', margin: '8px 0' }}>${voxpulseMonthlyCost.toLocaleString()}<span style={{ fontSize: '0.9rem', fontWeight: 500 }}>/mo</span></div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Rate: ${voxpulseRatePerMin}/min Direct Telnyx/PSTN</div>
          </div>

          <div style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)', padding: '20px', borderRadius: '14px', border: '1px solid rgba(99, 102, 241, 0.35)' }}>
            <div style={{ fontSize: '0.78rem', color: '#a5b4fc', fontWeight: 700 }}>ANNUAL NET FINANCIAL SAVINGS</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#67e8f9', margin: '8px 0' }}>${annualSavings.toLocaleString()}<span style={{ fontSize: '0.9rem', fontWeight: 500 }}>/yr</span></div>
            <div style={{ fontSize: '0.78rem', color: '#e2e8f0', fontWeight: 600 }}>{savingsPercent}% Direct ROI Cost Reduction</div>
          </div>
        </div>
      </div>
    </div>
  );
}
