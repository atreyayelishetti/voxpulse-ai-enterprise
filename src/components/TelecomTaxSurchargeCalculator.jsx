import React, { useState } from 'react';
import { Calculator, DollarSign, ShieldCheck, Sliders, AlertCircle, FileText } from 'lucide-react';

export default function TelecomTaxSurchargeCalculator() {
  const [wholesaleSpend, setWholesaleSpend] = useState(3500);
  const [didCount, setDidCount] = useState(120);

  // Regulatory formulas
  const usfFactor = 0.346; // 34.6% FCC USF Contribution Factor
  const trsFactor = 0.018; // 1.8% Telecommunications Relay Service
  const e911PerDid = 0.95; // $0.95 per active DID monthly
  const stateExciseTax = 0.045; // 4.5% State communications tax

  const usfCost = Math.round(wholesaleSpend * usfFactor);
  const trsCost = Math.round(wholesaleSpend * trsFactor);
  const e911Cost = Math.round(didCount * e911PerDid);
  const stateTaxCost = Math.round(wholesaleSpend * stateExciseTax);
  const totalTaxes = usfCost + trsCost + e911Cost + stateTaxCost;
  const grandTotal = wholesaleSpend + totalTaxes;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Calculator color="#06b6d4" size={28} /> FCC Universal Service Fund (USF) & Telecom Regulatory Tax Auditor
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Calculates FCC Form 499-A regulatory fee liabilities, Federal USF contribution ratios, and state E911 surcharges.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Monthly Regulatory Surcharges</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f59e0b', marginTop: '4px' }}>${totalTaxes.toLocaleString()}</div>
          <span className="badge badge-amber" style={{ marginTop: '8px', display: 'inline-block' }}>+{((totalTaxes / wholesaleSpend) * 100).toFixed(1)}% Tax Ratio</span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Federal USF (34.6%)</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f43f5e', marginTop: '4px' }}>${usfCost.toLocaleString()}</div>
          <span className="badge badge-rose" style={{ marginTop: '8px', display: 'inline-block' }}>FCC Universal Service</span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Line E911 Fees</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#06b6d4', marginTop: '4px' }}>${e911Cost.toLocaleString()}</div>
          <span className="badge badge-cyan" style={{ marginTop: '8px', display: 'inline-block' }}>{didCount} DIDs @ $0.95/mo</span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Combined Invoice Total</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>${grandTotal.toLocaleString()}</div>
          <span className="badge badge-emerald" style={{ marginTop: '8px', display: 'inline-block' }}>All Taxes Included</span>
        </div>
      </div>

      {/* Input Sliders */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sliders size={20} color="#06b6d4" /> Telecom Billing Base Parameters
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Monthly Wholesale Egress Spend</label>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#10b981' }}>${wholesaleSpend.toLocaleString()}</span>
            </div>
            <input 
              type="range" 
              min="500" 
              max="25000" 
              step="250"
              value={wholesaleSpend} 
              onChange={(e) => setWholesaleSpend(parseInt(e.target.value, 10))} 
              style={{ width: '100%', accentColor: '#10b981' }} 
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Monitored Global DID Count</label>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#06b6d4' }}>{didCount} DIDs</span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="1000" 
              step="10"
              value={didCount} 
              onChange={(e) => setDidCount(parseInt(e.target.value, 10))} 
              style={{ width: '100%', accentColor: '#06b6d4' }} 
            />
          </div>
        </div>
      </div>

      {/* Surcharge Breakdown Table */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
          Line-Item Regulatory Surcharge Breakdown
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', textAlign: 'left' }}>
                <th style={{ padding: '10px' }}>Fee Category</th>
                <th style={{ padding: '10px' }}>Regulatory Agency</th>
                <th style={{ padding: '10px' }}>Calculation Basis</th>
                <th style={{ padding: '10px' }}>Statutory Rate</th>
                <th style={{ padding: '10px', textAlign: 'right' }}>Monthly Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <td style={{ padding: '12px 10px', fontWeight: 700, color: '#fff' }}>Federal Universal Service Fund (USF)</td>
                <td style={{ padding: '12px 10px', color: '#94a3b8' }}>FCC (Universal Service Admin Co)</td>
                <td style={{ padding: '12px 10px', color: '#cbd5e1' }}>Interstate & International Telecom Revenue</td>
                <td style={{ padding: '12px 10px', color: '#f43f5e' }}>34.6%</td>
                <td style={{ padding: '12px 10px', textAlign: 'right', fontWeight: 700, color: '#fff' }}>${usfCost.toLocaleString()}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <td style={{ padding: '12px 10px', fontWeight: 700, color: '#fff' }}>Telecommunications Relay Service (TRS)</td>
                <td style={{ padding: '12px 10px', color: '#94a3b8' }}>FCC Disability Rights Fund</td>
                <td style={{ padding: '12px 10px', color: '#cbd5e1' }}>Gross Telecom End-User Revenue</td>
                <td style={{ padding: '12px 10px', color: '#f59e0b' }}>1.8%</td>
                <td style={{ padding: '12px 10px', textAlign: 'right', fontWeight: 700, color: '#fff' }}>${trsCost.toLocaleString()}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <td style={{ padding: '12px 10px', fontWeight: 700, color: '#fff' }}>State & Municipal E911 Emergency Access</td>
                <td style={{ padding: '12px 10px', color: '#94a3b8' }}>State Public Utility Commissions (PUC)</td>
                <td style={{ padding: '12px 10px', color: '#cbd5e1' }}>Per Access Line / DID per month</td>
                <td style={{ padding: '12px 10px', color: '#06b6d4' }}>$0.95 / line</td>
                <td style={{ padding: '12px 10px', textAlign: 'right', fontWeight: 700, color: '#fff' }}>${e911Cost.toLocaleString()}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <td style={{ padding: '12px 10px', fontWeight: 700, color: '#fff' }}>State Telecom Gross Receipts & Excise Tax</td>
                <td style={{ padding: '12px 10px', color: '#94a3b8' }}>State Department of Revenue</td>
                <td style={{ padding: '12px 10px', color: '#cbd5e1' }}>Intrastate Call Origination Minutes</td>
                <td style={{ padding: '12px 10px', color: '#a855f7' }}>4.5%</td>
                <td style={{ padding: '12px 10px', textAlign: 'right', fontWeight: 700, color: '#fff' }}>${stateTaxCost.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
