import React, { useState, useEffect } from 'react';
import { 
  Building, 
  ChevronDown, 
  Plus, 
  Check, 
  ShieldCheck, 
  Zap, 
  PhoneCall, 
  Globe2, 
  CreditCard, 
  BarChart3, 
  Users, 
  Key, 
  Crown, 
  ExternalLink,
  Sparkles,
  Server,
  BookOpen,
  Activity,
  Calendar
} from 'lucide-react';

import UserGuideModal from './UserGuideModal';

export default function SaaSHeader({ 
  currentOrg, 
  organizations, 
  onSwitchOrg, 
  onCreateOrg, 
  activeTab, 
  setActiveTab, 
  user, 
  onLogout,
  onOpenLandingPage
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [newOrgName, setNewOrgName] = useState('');
  const [newOrgRegion, setNewOrgRegion] = useState('US-East (Virginia)');
  const [newOrgPlan, setNewOrgPlan] = useState('GROWTH');
  const [newOrgEmail, setNewOrgEmail] = useState('');

  const planBadgeClass = {
    ENTERPRISE: 'badge-purple',
    GROWTH: 'badge-cyan',
    STARTER: 'badge-emerald',
    FREE_TRIAL: 'badge-amber'
  }[currentOrg?.planId || 'GROWTH'] || 'badge-cyan';

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!newOrgName.trim()) return;
    onCreateOrg({
      name: newOrgName.trim(),
      region: newOrgRegion,
      planId: newOrgPlan,
      billingEmail: newOrgEmail || `admin@${newOrgName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`
    });
    setNewOrgName('');
    setShowCreateModal(false);
  };

  return (
    <>
      <header style={{
        background: 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '16px',
        padding: '12px 18px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        position: 'relative',
        zIndex: 50,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.37)',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {/* Left Section: Active Tenant Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: '1 1 auto', minWidth: 0, maxWidth: '100%' }}>
          {/* Tenant Selector Button */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                padding: '8px 14px',
                borderRadius: '10px',
                color: '#fff',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              className="tenant-btn"
            >
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '0.85rem'
              }}>
                <Building size={16} color="#fff" />
              </div>

              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {currentOrg?.name || 'Acme Financial Services'}
                  <span className={`badge ${planBadgeClass}`} style={{ fontSize: '0.62rem', padding: '1px 6px' }}>
                    {currentOrg?.planId || 'ENTERPRISE'}
                  </span>
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  {currentOrg?.subdomain || 'acme.voxpulse.io'}
                </div>
              </div>

              <ChevronDown size={14} color="#94a3b8" style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                left: 0,
                width: '320px',
                background: '#0b1329',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '12px',
                padding: '8px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
                zIndex: 100
              }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#94a3b8', padding: '6px 10px', textTransform: 'uppercase' }}>
                  Organizations / Workspaces
                </div>

                {organizations?.map((org) => {
                  const isSelected = org.id === currentOrg?.id;
                  return (
                    <div
                      key={org.id}
                      onClick={() => {
                        onSwitchOrg(org.id);
                        setDropdownOpen(false);
                      }}
                      style={{
                        padding: '10px 12px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: isSelected ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                        border: isSelected ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid transparent',
                        transition: 'background 0.15s'
                      }}
                      onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'; }}
                      onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.background = 'transparent'; }}
                    >
                      <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          {org.name}
                          <span style={{ fontSize: '0.62rem', color: '#06b6d4' }}>({org.planTier || org.planId || 'GROWTH'})</span>
                        </div>
                        <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                          {org.subdomain}
                        </div>
                      </div>
                      {isSelected && <Check size={16} color="#6366f1" />}
                    </div>
                  );
                })}

                <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', margin: '6px 0', paddingTop: '6px' }}>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      setShowCreateModal(true);
                    }}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px dashed rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px',
                      color: '#38bdf8',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    <Plus size={14} /> Provision New Organization
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* SaaS Navigation Quick Tabs */}
          <nav 
            className="saas-nav-scroll"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '4px',
              overflowX: 'auto',
              flex: '1 1 auto',
              minWidth: 0,
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
              padding: '2px 0'
            }}
          >
            <button
              onClick={() => setActiveTab('saas-billing')}
              className={`nav-chip ${activeTab === 'saas-billing' ? 'nav-chip-active' : ''}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '0.78rem',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                flexShrink: 0,
                background: activeTab === 'saas-billing' ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
                color: activeTab === 'saas-billing' ? '#818cf8' : '#94a3b8',
                border: activeTab === 'saas-billing' ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid transparent',
                cursor: 'pointer'
              }}
            >
              <CreditCard size={14} /> Plans & Billing
            </button>

            <button
              onClick={() => setActiveTab('saas-usage')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '0.78rem',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                flexShrink: 0,
                background: activeTab === 'saas-usage' ? 'rgba(6, 182, 212, 0.2)' : 'transparent',
                color: activeTab === 'saas-usage' ? '#22d3ee' : '#94a3b8',
                border: activeTab === 'saas-usage' ? '1px solid rgba(6, 182, 212, 0.4)' : '1px solid transparent',
                cursor: 'pointer'
              }}
            >
              <BarChart3 size={14} /> Usage Metering
            </button>

            <button
              onClick={() => setActiveTab('saas-team')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '0.78rem',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                flexShrink: 0,
                background: activeTab === 'saas-team' ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
                color: activeTab === 'saas-team' ? '#34d399' : '#94a3b8',
                border: activeTab === 'saas-team' ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid transparent',
                cursor: 'pointer'
              }}
            >
              <Users size={14} /> Team & RBAC
            </button>

            <button
              onClick={() => setActiveTab('saas-developers')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '0.78rem',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                flexShrink: 0,
                background: activeTab === 'saas-developers' ? 'rgba(245, 158, 11, 0.2)' : 'transparent',
                color: activeTab === 'saas-developers' ? '#fbbf24' : '#94a3b8',
                border: activeTab === 'saas-developers' ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid transparent',
                cursor: 'pointer'
              }}
            >
              <Key size={14} /> API Keys & Webhooks
            </button>

            <button
              onClick={() => setActiveTab('saas-genesys')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '0.78rem',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                flexShrink: 0,
                background: activeTab === 'saas-genesys' ? 'rgba(255, 79, 0, 0.2)' : 'transparent',
                color: activeTab === 'saas-genesys' ? '#ff6b35' : '#94a3b8',
                border: activeTab === 'saas-genesys' ? '1px solid rgba(255, 79, 0, 0.4)' : '1px solid transparent',
                cursor: 'pointer'
              }}
            >
              <PhoneCall size={14} /> Genesys Cloud CX
            </button>

            <button
              onClick={() => setActiveTab('saas-audit')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '0.78rem',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                flexShrink: 0,
                background: activeTab === 'saas-audit' ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
                color: activeTab === 'saas-audit' ? '#10b981' : '#94a3b8',
                border: activeTab === 'saas-audit' ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid transparent',
                cursor: 'pointer'
              }}
            >
              <ShieldCheck size={14} /> Audit Vault
            </button>

            <button
              onClick={() => setActiveTab('saas-incidents')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '0.78rem',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                flexShrink: 0,
                background: activeTab === 'saas-incidents' ? 'rgba(239, 68, 68, 0.2)' : 'transparent',
                color: activeTab === 'saas-incidents' ? '#f87171' : '#94a3b8',
                border: activeTab === 'saas-incidents' ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid transparent',
                cursor: 'pointer'
              }}
            >
              <Activity size={14} /> Incident Center
            </button>

            <button
              onClick={() => setActiveTab('saas-maintenance')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '0.78rem',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                flexShrink: 0,
                background: activeTab === 'saas-maintenance' ? 'rgba(245, 158, 11, 0.2)' : 'transparent',
                color: activeTab === 'saas-maintenance' ? '#fbbf24' : '#94a3b8',
                border: activeTab === 'saas-maintenance' ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid transparent',
                cursor: 'pointer'
              }}
            >
              <Calendar size={14} /> Change Freezes
            </button>

            <button
              onClick={() => setActiveTab('saas-geolatency')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '0.78rem',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                flexShrink: 0,
                background: activeTab === 'saas-geolatency' ? 'rgba(6, 182, 212, 0.2)' : 'transparent',
                color: activeTab === 'saas-geolatency' ? '#22d3ee' : '#94a3b8',
                border: activeTab === 'saas-geolatency' ? '1px solid rgba(6, 182, 212, 0.4)' : '1px solid transparent',
                cursor: 'pointer'
              }}
            >
              <Globe2 size={14} /> PoP Radar
            </button>

            <button
              onClick={() => setActiveTab('saas-admin')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '0.78rem',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                flexShrink: 0,
                background: activeTab === 'saas-admin' ? 'rgba(236, 72, 153, 0.2)' : 'transparent',
                color: activeTab === 'saas-admin' ? '#f472b6' : '#94a3b8',
                border: activeTab === 'saas-admin' ? '1px solid rgba(236, 72, 153, 0.4)' : '1px solid transparent',
                cursor: 'pointer'
              }}
            >
              <Crown size={14} /> Operator God Mode
            </button>
          </nav>
        </div>


        {/* Right Section: Usage Meter Pills, Public Landing Button & Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0, flexWrap: 'wrap' }}>
          {/* Quick Meter Indicator: Test Minutes */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '10px',
            padding: '6px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flexShrink: 0
          }}>
            <Zap size={15} color="#818cf8" />
            <div>
              <div style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Test Minutes
              </div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f8fafc' }}>
                {currentOrg?.usage?.minutesUsed?.toLocaleString() || '42,380'} / {currentOrg?.usage?.minutesLimit ? (currentOrg.usage.minutesLimit >= 99999 ? '100k' : currentOrg.usage.minutesLimit.toLocaleString()) : '100k'}
              </div>
            </div>
          </div>

          {/* Quick Meter Indicator: DIDs */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '10px',
            padding: '6px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flexShrink: 0
          }}>
            <Globe2 size={15} color="#06b6d4" />
            <div>
              <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>DIDs Active</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#38bdf8' }}>
                {currentOrg?.usage?.didsUsed || '64'} / {currentOrg?.usage?.didsLimit >= 9999 ? '∞ Unlimited' : (currentOrg?.usage?.didsLimit || '25')}
              </div>
            </div>
          </div>

          {/* User Guide Button */}
          <button
            onClick={() => setShowGuideModal(true)}
            className="btn btn-secondary"
            style={{
              padding: '6px 12px',
              fontSize: '0.78rem',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: '1px solid rgba(99, 102, 241, 0.4)',
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(6, 182, 212, 0.1) 100%)',
              color: '#e0e7ff',
              flexShrink: 0,
              whiteSpace: 'nowrap'
            }}
            title="Open Platform User Guide & Screen Catalog"
          >
            <BookOpen size={14} color="#818cf8" /> User Guide
          </button>

          {/* Public Portal Switcher */}
          <button
            onClick={onOpenLandingPage}
            className="btn btn-secondary"
            style={{
              padding: '6px 12px',
              fontSize: '0.78rem',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              flexShrink: 0,
              whiteSpace: 'nowrap'
            }}
            title="View Public SaaS Landing Page & Pricing"
          >
            <Sparkles size={14} color="#a78bfa" /> Public Portal
          </button>
        </div>
      </header>

      {/* Modal: Provision New Organization */}
      {showCreateModal && (
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
          <div className="glass-card" style={{ width: '480px', padding: '28px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Building color="#6366f1" size={22} /> Provision New Organization
              </h3>
              <button 
                onClick={() => setShowCreateModal(false)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1.2rem' }}
              >
                ✕
              </button>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '20px' }}>
              Create an isolated multi-tenant organization with its own dedicated telephony pool, test flows, quotas, and team members.
            </p>

            <form onSubmit={handleCreateSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '6px' }}>
                  Organization / Company Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Stripe Telecom Global"
                  value={newOrgName}
                  onChange={(e) => setNewOrgName(e.target.value)}
                  className="input-field"
                  style={{ width: '100%', padding: '10px 14px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '6px' }}>
                  Billing Contact Email
                </label>
                <input
                  type="email"
                  placeholder="e.g. billing@company.com"
                  value={newOrgEmail}
                  onChange={(e) => setNewOrgEmail(e.target.value)}
                  className="input-field"
                  style={{ width: '100%', padding: '10px 14px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '6px' }}>
                    Primary Telecom Region
                  </label>
                  <select
                    value={newOrgRegion}
                    onChange={(e) => setNewOrgRegion(e.target.value)}
                    className="input-field"
                    style={{ width: '100%', padding: '10px 12px' }}
                  >
                    <option value="US-East (Virginia)">US-East (Virginia)</option>
                    <option value="EU-Central (Frankfurt)">EU-Central (Frankfurt)</option>
                    <option value="APAC (Singapore)">APAC (Singapore)</option>
                    <option value="UK (London)">UK (London)</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '6px' }}>
                    Subscription Tier
                  </label>
                  <select
                    value={newOrgPlan}
                    onChange={(e) => setNewOrgPlan(e.target.value)}
                    className="input-field"
                    style={{ width: '100%', padding: '10px 12px' }}
                  >
                    <option value="GROWTH">Growth Plan ($1,999/mo)</option>
                    <option value="ENTERPRISE">Enterprise Scale ($4,999/mo)</option>
                    <option value="STARTER">Starter ($499/mo)</option>
                    <option value="FREE_TRIAL">14-Day Free Trial</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="btn btn-secondary"
                  style={{ padding: '8px 16px' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ padding: '8px 18px', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Plus size={16} /> Create Workspace
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Interactive Platform User Guide Modal */}
      <UserGuideModal
        isOpen={showGuideModal}
        onClose={() => setShowGuideModal(false)}
        onNavigateTab={(tab) => setActiveTab(tab)}
      />
    </>
  );
}
