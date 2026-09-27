import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Download, 
  Zap, 
  AlertCircle, 
  ArrowUpRight, 
  RefreshCw,
  Building,
  Calendar,
  Lock,
  FileText,
  DollarSign
} from 'lucide-react';

export default function SaaSSubscriptionBilling({ currentOrg, onRefreshOrg }) {
  const [plans, setPlans] = useState([]);
  const [billingCycle, setBillingCycle] = useState(currentOrg?.billingCycle || 'ANNUAL');
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingPlan, setUpdatingPlan] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [cardLast4, setCardLast4] = useState('4242');
  const [cardBrand, setCardBrand] = useState('Visa');
  const [successMsg, setSuccessMsg] = useState(null);

  useEffect(() => {
    fetchPlansAndInvoices();
  }, [currentOrg?.id]);

  const fetchPlansAndInvoices = async () => {
    try {
      const [plansRes, invRes] = await Promise.all([
        fetch('/api/saas/plans'),
        fetch('/api/saas/invoices')
      ]);
      const plansData = await plansRes.json();
      const invData = await invRes.json();
      if (plansData.success) setPlans(plansData.plans);
      if (invData.success) setInvoices(invData.invoices);
    } catch (err) {
      console.error('Failed to fetch billing data:', err);
    }
  };

  const handleSelectPlan = async (planId) => {
    setUpdatingPlan(planId);
    setLoading(true);
    try {
      const res = await fetch('/api/saas/subscription/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId, billingCycle })
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg(`Successfully upgraded to ${planId} (${billingCycle})!`);
        setTimeout(() => setSuccessMsg(null), 5000);
        if (onRefreshOrg) onRefreshOrg();
        fetchPlansAndInvoices();
      }
    } catch (err) {
      console.error('Upgrade failed:', err);
    } finally {
      setLoading(false);
      setUpdatingPlan(null);
    }
  };

  const currentPlanId = currentOrg?.planId || 'GROWTH';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <CreditCard color="#818cf8" size={30} /> Plans, Subscriptions & Metered Billing
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
            Manage your organization's subscription tier, metered usage limits, automated invoicing, and payment methods.
          </p>
        </div>

        {/* Billing Cycle Toggle */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '4px',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <button
            onClick={() => setBillingCycle('MONTHLY')}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: 600,
              background: billingCycle === 'MONTHLY' ? '#6366f1' : 'transparent',
              color: '#fff',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingCycle('ANNUAL')}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: 600,
              background: billingCycle === 'ANNUAL' ? '#6366f1' : 'transparent',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            Annual Billing <span style={{ background: '#10b981', color: '#022c22', fontSize: '0.65rem', padding: '2px 6px', borderRadius: '4px', fontWeight: 800 }}>SAVE 20%</span>
          </button>
        </div>
      </div>

      {successMsg && (
        <div style={{
          background: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid #10b981',
          padding: '12px 18px',
          borderRadius: '10px',
          color: '#34d399',
          fontSize: '0.9rem',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <ShieldCheck size={18} /> {successMsg}
        </div>
      )}

      {/* Subscription Tier Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px'
      }}>
        {plans.map((p) => {
          const isCurrent = p.id === currentPlanId;
          const price = billingCycle === 'ANNUAL' ? Math.round(p.priceAnnual / 12) : p.priceMonthly;
          const isPopular = p.id === 'GROWTH';

          return (
            <div
              key={p.id}
              className="glass-card"
              style={{
                padding: '24px',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                border: isCurrent 
                  ? '2px solid #6366f1' 
                  : isPopular 
                    ? '1px solid rgba(6, 182, 212, 0.4)' 
                    : '1px solid rgba(255, 255, 255, 0.08)',
                background: isCurrent ? 'rgba(99, 102, 241, 0.06)' : undefined
              }}
            >
              {isPopular && (
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'linear-gradient(90deg, #06b6d4, #6366f1)',
                  color: '#fff',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  padding: '3px 12px',
                  borderRadius: '20px',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase'
                }}>
                  Most Popular for Enterprises
                </div>
              )}

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>
                    {p.name}
                  </h3>
                  {isCurrent && (
                    <span className="badge badge-purple" style={{ fontSize: '0.7rem', padding: '3px 8px' }}>
                      Current Plan
                    </span>
                  )}
                </div>

                <div style={{ margin: '16px 0 20px 0' }}>
                  <span style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fff' }}>
                    ${price.toLocaleString()}
                  </span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}> / month</span>
                  {billingCycle === 'ANNUAL' && p.priceAnnual > 0 && (
                    <div style={{ fontSize: '0.75rem', color: '#10b981', marginTop: '4px' }}>
                      Billed annually (${p.priceAnnual.toLocaleString()}/yr)
                    </div>
                  )}
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {p.features?.map((feat, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#cbd5e1' }}>
                      <Check size={15} color="#10b981" /> {feat}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: '24px' }}>
                <button
                  disabled={isCurrent || loading}
                  onClick={() => handleSelectPlan(p.id)}
                  className={`btn ${isCurrent ? 'btn-secondary' : isPopular ? 'btn-primary' : 'btn-secondary'}`}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '10px',
                    fontWeight: 700,
                    fontSize: '0.86rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    opacity: isCurrent ? 0.7 : 1
                  }}
                >
                  {updatingPlan === p.id ? (
                    <><RefreshCw size={15} className="spin" /> Updating...</>
                  ) : isCurrent ? (
                    'Active Plan'
                  ) : (
                    <>Switch to {p.name} <ArrowUpRight size={15} /></>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Two Column Layout: Payment Method & Invoicing */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Payment Method & Billing Details */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Lock size={18} color="#6366f1" /> Stripe Secure Payment Method
          </h3>

          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '44px',
                height: '30px',
                background: '#1e293b',
                borderRadius: '6px',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                color: '#38bdf8',
                fontSize: '0.8rem'
              }}>
                VISA
              </div>
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff' }}>
                  {cardBrand} ending in •••• {cardLast4}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Expires 08/2028 • Default Payment Method
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowPaymentModal(true)}
              className="btn btn-secondary"
              style={{ padding: '6px 12px', fontSize: '0.76rem', borderRadius: '8px' }}
            >
              Update Card
            </button>
          </div>

          <div style={{ fontSize: '0.82rem', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div><strong>Billing Entity:</strong> {currentOrg?.name || 'Acme Financial Services'}</div>
            <div><strong>Billing Email:</strong> {currentOrg?.billingEmail || 'billing@acmefinance.com'}</div>
            <div><strong>Tax ID (VAT/EIN):</strong> US-EIN-94-2819201</div>
            <div><strong>Stripe Customer ID:</strong> <code style={{ color: '#06b6d4' }}>cus_voxpulse_live_891024</code></div>
          </div>
        </div>

        {/* Add-on Capacity Packs */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Zap size={18} color="#06b6d4" /> Enterprise Add-on Capacity Packs
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 14px',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.06)'
            }}>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>+10 Dedicated Global DIDs</div>
                <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Add 10 high-reputation Tier-1 PSTN lines</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#06b6d4' }}>+$150/mo</span>
                <button className="btn btn-secondary" style={{ padding: '5px 10px', fontSize: '0.74rem' }}>Add</button>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 14px',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.06)'
            }}>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>+5,000 Automated Test Minutes</div>
                <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Pre-purchased bulk PSTN synthetic testing</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#06b6d4' }}>+$175/mo</span>
                <button className="btn btn-secondary" style={{ padding: '5px 10px', fontSize: '0.74rem' }}>Add</button>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 14px',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.06)'
            }}>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>+10 Concurrent Stress Channels</div>
                <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Expand peak load testing capacity</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#06b6d4' }}>+$300/mo</span>
                <button className="btn btn-secondary" style={{ padding: '5px 10px', fontSize: '0.74rem' }}>Add</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Invoices & Billing History */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={18} color="#38bdf8" /> Invoice History & Payment Receipts
          </h3>
          <span className="badge badge-emerald" style={{ fontSize: '0.72rem', padding: '3px 8px' }}>
            All Invoices Settled
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.72rem' }}>
                <th style={{ padding: '12px 10px' }}>Invoice ID</th>
                <th style={{ padding: '12px 10px' }}>Plan / Description</th>
                <th style={{ padding: '12px 10px' }}>Billing Period</th>
                <th style={{ padding: '12px 10px' }}>Date</th>
                <th style={{ padding: '12px 10px' }}>Amount</th>
                <th style={{ padding: '12px 10px' }}>Status</th>
                <th style={{ padding: '12px 10px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '14px 10px', fontWeight: 700, color: '#fff' }}>
                    {inv.number}
                  </td>
                  <td style={{ padding: '14px 10px', color: '#cbd5e1' }}>
                    {inv.planName}
                  </td>
                  <td style={{ padding: '14px 10px', color: '#94a3b8' }}>
                    {inv.period}
                  </td>
                  <td style={{ padding: '14px 10px', color: '#94a3b8' }}>
                    {inv.date}
                  </td>
                  <td style={{ padding: '14px 10px', fontWeight: 700, color: '#38bdf8' }}>
                    ${inv.amount.toLocaleString()}.00
                  </td>
                  <td style={{ padding: '14px 10px' }}>
                    <span className="badge badge-emerald" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                      {inv.status}
                    </span>
                  </td>
                  <td style={{ padding: '14px 10px', textAlign: 'right' }}>
                    <a
                      href={`/api/saas/invoices/${inv.id}/download`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-secondary"
                      style={{ padding: '5px 10px', fontSize: '0.74rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Download size={13} /> View Invoice
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Update Payment Method */}
      {showPaymentModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}>
          <div className="glass-card" style={{ width: '440px', padding: '28px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CreditCard color="#6366f1" size={22} /> Update Credit Card
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '20px' }}>
              Secured with Stripe 256-bit PCI DSS Level 1 vault. Your card is automatically billed upon renewal.
            </p>

            <form onSubmit={(e) => {
              e.preventDefault();
              setShowPaymentModal(false);
              setSuccessMsg('Payment method updated successfully!');
              setTimeout(() => setSuccessMsg(null), 4000);
            }} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Name on Card</label>
                <input type="text" defaultValue="Sarah Jenkins" className="input-field" style={{ width: '100%', padding: '10px 12px' }} />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Card Number</label>
                <input 
                  type="text" 
                  defaultValue={`•••• •••• •••• ${cardLast4}`}
                  onChange={(e) => {
                    const clean = e.target.value.replace(/\D/g, '');
                    if (clean.length >= 4) setCardLast4(clean.slice(-4));
                  }} 
                  className="input-field" 
                  style={{ width: '100%', padding: '10px 12px' }} 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Expiry</label>
                  <input type="text" defaultValue="08/28" className="input-field" style={{ width: '100%', padding: '10px 12px' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>CVC</label>
                  <input type="text" defaultValue="•••" className="input-field" style={{ width: '100%', padding: '10px 12px' }} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button type="button" onClick={() => setShowPaymentModal(false)} className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-primary">Save Payment Method</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
