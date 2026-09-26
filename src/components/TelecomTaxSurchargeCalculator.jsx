import React from 'react';
import { DollarSign, ShieldCheck } from 'lucide-react';

export default function TelecomTaxSurchargeCalculator() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <DollarSign color="#34d399" size={28} /> Federal US Universal Service Fund (USF) & Regulatory Tax Auditor
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Audit FCC USF surcharges, state 911 fees, and regulatory recovery fees on carrier invoices.
          </p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '24px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>FCC Federal USF Rate</span>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#38bdf8', marginTop: '4px' }}>34.6%</div>
        </div>
        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>State 911 Emergency Fee</span>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#34d399', marginTop: '4px' }}>$1.25 / Line</div>
        </div>
        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Audit Verdict</span>
          <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#a78bfa', marginTop: '6px' }}>PASSED (ACCURATE TAX)</div>
        </div>
      </div>
    </div>
  );
}
