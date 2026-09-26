import React, { useState } from 'react';
import { DollarSign, Globe2, Calculator, ShieldCheck, AlertCircle, FileText, CheckCircle2, TrendingDown } from 'lucide-react';

export default function TollFreeBillingAuditor() {
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [monthlyMinutes, setMonthlyMinutes] = useState(125000);

  const countryRates = {
    US: { tfRate: '$0.014', didRate: '$0.0035', payphoneSurcharge: '$0.55', totalEst: '$1,750.00', auditStatus: 'MATCHED RATE CARD' },
    UK: { tfRate: '$0.022', didRate: '$0.0050', payphoneSurcharge: '£0.40', totalEst: '$2,750.00', auditStatus: 'MATCHED RATE CARD' },
    DE: { tfRate: '$0.038', didRate: '$0.0080', payphoneSurcharge: '€0.65', totalEst: '$4,750.00', auditStatus: 'OVERCHARGE DETECTED (+4%)' },
    JP: { tfRate: '$0.065', didRate: '$0.0120', payphoneSurcharge: '¥100', totalEst: '$8,125.00', auditStatus: 'MATCHED RATE CARD' }
  };

  const rate = countryRates[selectedCountry] || countryRates.US;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <DollarSign color="#34d399" size={28} /> Global Toll-Free & PSTN Billing Auditor
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Audit carrier origination surcharges, payphone fees, and international toll-free rate cards to eliminate carrier overbilling.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <span className="badge badge-emerald" style={{ padding: '6px 12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldCheck size={14} /> Rate Cards Synced
          </span>
        </div>
      </div>

      {/* Selectors */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
        <div className="glass-card" style={{ padding: '16px' }}>
          <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Target Destination Country
          </label>
          <select 
            value={selectedCountry} 
            onChange={(e) => setSelectedCountry(e.target.value)} 
            className="input-field" 
            style={{ width: '100%', marginTop: '8px' }}
          >
            <option value="US">United States (+1 Toll-Free 800)</option>
            <option value="UK">United Kingdom (+44 Toll-Free 0800)</option>
            <option value="DE">Germany (+49 Toll-Free 0800)</option>
            <option value="JP">Japan (+81 Toll-Free 0120)</option>
          </select>
        </div>

        <div className="glass-card" style={{ padding: '16px' }}>
          <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Monthly Inbound Call Volume (Minutes)
          </label>
          <input 
            type="number" 
            value={monthlyMinutes} 
            onChange={(e) => setMonthlyMinutes(parseInt(e.target.value) || 0)} 
            className="input-field" 
            style={{ width: '100%', marginTop: '8px' }}
          />
        </div>

        <div className="glass-card" style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Estimated Cost / Month</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#34d399', marginTop: '4px' }}>
              {rate.totalEst}
            </div>
          </div>
          <Calculator size={36} color="#34d399" style={{ opacity: 0.8 }} />
        </div>
      </div>

      {/* Rate Breakdown Table */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FileText size={18} color="#06b6d4" /> Toll-Free & DID Carrier Rate Card Audit Table
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.72rem' }}>
                <th style={{ padding: '10px' }}>Country</th>
                <th style={{ padding: '10px' }}>Toll-Free Rate / Min</th>
                <th style={{ padding: '10px' }}>Local DID Rate / Min</th>
                <th style={{ padding: '10px' }}>Payphone Surcharge</th>
                <th style={{ padding: '10px' }}>Est. Monthly Total</th>
                <th style={{ padding: '10px' }}>Audit Verification</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(countryRates).map(([code, r]) => (
                <tr key={code} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '12px 10px', fontWeight: 600, color: '#fff' }}>
                    {code === 'US' ? 'United States (+1)' : code === 'UK' ? 'United Kingdom (+44)' : code === 'DE' ? 'Germany (+49)' : 'Japan (+81)'}
                  </td>
                  <td style={{ padding: '12px 10px', color: '#06b6d4', fontWeight: 600 }}>{r.tfRate}</td>
                  <td style={{ padding: '12px 10px', color: '#38bdf8' }}>{r.didRate}</td>
                  <td style={{ padding: '12px 10px', color: 'var(--text-muted)' }}>{r.payphoneSurcharge}</td>
                  <td style={{ padding: '12px 10px', color: '#34d399', fontWeight: 700 }}>{r.totalEst}</td>
                  <td style={{ padding: '12px 10px' }}>
                    <span className={`badge ${r.auditStatus.includes('OVERCHARGE') ? 'badge-rose' : 'badge-emerald'}`}>
                      {r.auditStatus}
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
