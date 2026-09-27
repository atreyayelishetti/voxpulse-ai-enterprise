import React, { useState, useEffect } from 'react';
import { 
  Crown, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Building, 
  ShieldCheck, 
  AlertTriangle, 
  Layers, 
  Search, 
  LogIn, 
  Edit3, 
  CheckCircle2, 
  Percent,
  Server
} from 'lucide-react';

export default function SaaSSuperAdminPortal({ onSwitchTenant }) {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [planFilter, setPlanFilter] = useState('ALL');
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [newPlan, setNewPlan] = useState('ENTERPRISE');
  const [newStatus, setNewStatus] = useState('ACTIVE');
  const [successMsg, setSuccessMsg] = useState(null);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      const res = await fetch('/api/saas/admin/metrics');
      const data = await res.json();
      if (data.success) setMetrics(data.metrics);
    } catch (e) {
      console.error('Failed to fetch platform metrics:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTenant = async (e) => {
    e.preventDefault();
    if (!selectedTenant) return;

    try {
      const res = await fetch(`/api/saas/admin/tenants/${selectedTenant.id}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, planId: newPlan })
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg(`Tenant ${selectedTenant.name} updated to ${newPlan} (${newStatus})!`);
        setSelectedTenant(null);
        setTimeout(() => setSuccessMsg(null), 4000);
        fetchMetrics();
      }
    } catch (err) {
      console.error('Update tenant error:', err);
    }
  };

  const filteredTenants = metrics?.tenantFleet?.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.subdomain.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = planFilter === 'ALL' || t.planId === planFilter;
    return matchesSearch && matchesPlan;
  }) || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Crown color="#f472b6" size={30} /> SaaS Platform Operator Control Plane ("God Mode")
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
            Executive multi-tenant overview, annual recurring revenue (ARR), PSTN wholesale gross margins, and fleet impersonation.
          </p>
        </div>

        <span className="badge badge-purple" style={{ padding: '6px 14px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ShieldCheck size={15} /> Platform Super-Admin Authorized
        </span>
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
          <CheckCircle2 size={18} /> {successMsg}
        </div>
      )}

      {/* Operator KPI Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '18px'
      }}>
        <div className="glass-card" style={{ padding: '20px', borderRadius: '14px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '8px' }}>
            Annual Run Rate (ARR)
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#10b981', marginBottom: '4px' }}>
            ${metrics?.summary?.arr ? (metrics.summary.arr / 1000000).toFixed(2) : '2.84'}M
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
            MRR: <strong>${metrics?.summary?.mrr?.toLocaleString() || '236,666'}/mo</strong>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '20px', borderRadius: '14px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '8px' }}>
            Active SaaS Tenants
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#38bdf8', marginBottom: '4px' }}>
            {metrics?.summary?.totalCustomers || 142}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
            {metrics?.summary?.activePaidTenants || 128} Paid • {metrics?.summary?.activeTrials || 14} Trials
          </div>
        </div>

        <div className="glass-card" style={{ padding: '20px', borderRadius: '14px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '8px' }}>
            Gross Profit Margin
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#c084fc', marginBottom: '4px' }}>
            {metrics?.summary?.grossMargin || '88.4%'}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
            Carrier Costs: <strong>${metrics?.summary?.wholesaleCarrierCosts?.toLocaleString() || '27,450'}/mo</strong>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '20px', borderRadius: '14px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '8px' }}>
            Net Revenue Retention
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fbbf24', marginBottom: '4px' }}>
            {metrics?.summary?.netRevenueRetention || '124%'}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
            Churn: <strong>{metrics?.summary?.churnRate || '0.8%'}</strong> • ARPU: ${metrics?.summary?.arpu || '1,848'}
          </div>
        </div>
      </div>

      {/* Wholesale Carrier Cost vs Subscription Revenue */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Server size={18} color="#06b6d4" /> Carrier Wholesale Egress Costs & Profitability
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.72rem' }}>
                <th style={{ padding: '10px' }}>Telephony Provider</th>
                <th style={{ padding: '10px' }}>Monthly Wholesale Spend</th>
                <th style={{ padding: '10px' }}>Total PSTN Minutes Handled</th>
                <th style={{ padding: '10px' }}>Net Gross Margin</th>
                <th style={{ padding: '10px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {metrics?.carrierCostBreakdown?.map((c, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '12px 10px', fontWeight: 700, color: '#fff' }}>{c.carrier}</td>
                  <td style={{ padding: '12px 10px', color: '#38bdf8' }}>${c.monthlyCost.toLocaleString()}</td>
                  <td style={{ padding: '12px 10px', color: '#cbd5e1' }}>{c.minutes.toLocaleString()} mins</td>
                  <td style={{ padding: '12px 10px', fontWeight: 700, color: '#10b981' }}>{c.margin}</td>
                  <td style={{ padding: '12px 10px' }}>
                    <span className="badge badge-emerald" style={{ fontSize: '0.66rem' }}>Optimal</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tenant Fleet Management & Impersonation Table */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Building size={18} color="#f472b6" /> Customer Tenant Fleet & Impersonation
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '2px' }}>
              One-click customer impersonation for enterprise troubleshooting, quota adjustments, and account management.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Search tenants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field"
                style={{ padding: '7px 12px 7px 30px', fontSize: '0.8rem', width: '200px' }}
              />
              <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: '10px', top: '10px' }} />
            </div>

            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
              className="input-field"
              style={{ padding: '7px 10px', fontSize: '0.8rem' }}
            >
              <option value="ALL">All Plans</option>
              <option value="ENTERPRISE">Enterprise Scale</option>
              <option value="GROWTH">Growth Plan</option>
              <option value="STARTER">Starter Plan</option>
            </select>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.72rem' }}>
                <th style={{ padding: '12px 10px' }}>Organization</th>
                <th style={{ padding: '12px 10px' }}>Subdomain</th>
                <th style={{ padding: '12px 10px' }}>Plan</th>
                <th style={{ padding: '12px 10px' }}>MRR Contribution</th>
                <th style={{ padding: '12px 10px' }}>Minutes Consumed</th>
                <th style={{ padding: '12px 10px' }}>Status</th>
                <th style={{ padding: '12px 10px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTenants.map((t) => (
                <tr key={t.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '12px 10px', fontWeight: 700, color: '#fff' }}>
                    {t.name}
                  </td>
                  <td style={{ padding: '12px 10px', color: '#06b6d4', fontSize: '0.8rem' }}>
                    {t.subdomain}
                  </td>
                  <td style={{ padding: '12px 10px' }}>
                    <span className={`badge ${t.planId === 'ENTERPRISE' ? 'badge-purple' : t.planId === 'GROWTH' ? 'badge-cyan' : 'badge-emerald'}`} style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                      {t.plan}
                    </span>
                  </td>
                  <td style={{ padding: '12px 10px', fontWeight: 600, color: '#10b981' }}>
                    ${t.mrr.toLocaleString()}/mo
                  </td>
                  <td style={{ padding: '12px 10px', color: '#cbd5e1' }}>
                    {t.minutesUsed.toLocaleString()} mins
                  </td>
                  <td style={{ padding: '12px 10px' }}>
                    <span className={`badge ${t.status === 'ACTIVE' ? 'badge-emerald' : 'badge-amber'}`} style={{ fontSize: '0.66rem' }}>
                      {t.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 10px', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '6px' }}>
                      <button
                        onClick={() => {
                          if (onSwitchTenant) onSwitchTenant(t.id);
                        }}
                        className="btn btn-secondary"
                        style={{ padding: '5px 10px', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                        title="Impersonate and view console as this customer"
                      >
                        <LogIn size={12} /> Impersonate
                      </button>

                      <button
                        onClick={() => {
                          setSelectedTenant(t);
                          setNewPlan(t.planId);
                          setNewStatus(t.status);
                        }}
                        className="btn btn-primary"
                        style={{ padding: '5px 10px', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                        title="Modify Plan & Status"
                      >
                        <Edit3 size={12} /> Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Edit Tenant */}
      {selectedTenant && (
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
              <Edit3 color="#f472b6" size={20} /> Modify Tenant: {selectedTenant.name}
            </h3>

            <form onSubmit={handleUpdateTenant} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Subscription Plan</label>
                <select
                  value={newPlan}
                  onChange={(e) => setNewPlan(e.target.value)}
                  className="input-field"
                  style={{ width: '100%', padding: '10px 12px' }}
                >
                  <option value="ENTERPRISE">Enterprise Scale ($4,999/mo)</option>
                  <option value="GROWTH">Growth Plan ($1,999/mo)</option>
                  <option value="STARTER">Starter Plan ($499/mo)</option>
                  <option value="FREE_TRIAL">14-Day Free Trial</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Account Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="input-field"
                  style={{ width: '100%', padding: '10px 12px' }}
                >
                  <option value="ACTIVE">Active (Full Service)</option>
                  <option value="TRIAL">Trial Period</option>
                  <option value="SUSPENDED">Suspended (Non-Payment / Investigation)</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button type="button" onClick={() => setSelectedTenant(null)} className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-primary">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
