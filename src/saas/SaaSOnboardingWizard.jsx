import React, { useState } from 'react';
import { 
  Building, 
  Globe2, 
  PhoneCall, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Zap, 
  Radio, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export default function SaaSOnboardingWizard({ onComplete, onCancel }) {
  const [step, setStep] = useState(1);
  const [companyName, setCompanyName] = useState('Acme Telehealth Solutions');
  const [subdomain, setSubdomain] = useState('acme-telehealth');
  const [region, setRegion] = useState('US-East (Virginia)');
  const [telephonyMode, setTelephonyMode] = useState('MANAGED_POOL');
  const [firstDID, setFirstDID] = useState('+18005550199');
  const [testName, setTestName] = useState('Main Customer Support IVR Verification');
  const [selectedPlan, setSelectedPlan] = useState('GROWTH');
  const [isDeploying, setIsDeploying] = useState(false);

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else handleFinish();
  };

  const handleFinish = async () => {
    setIsDeploying(true);
    try {
      const res = await fetch('/api/saas/organizations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: companyName,
          subdomain: `${subdomain}.voxpulse.io`,
          region,
          planId: selectedPlan,
          billingEmail: `ops@${subdomain}.com`
        })
      });
      const data = await res.json();
      if (data.success && onComplete) {
        onComplete(data.organization);
      }
    } catch (err) {
      console.error('Onboarding failed:', err);
      if (onComplete) onComplete(null);
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      background: 'radial-gradient(circle at 50% 20%, #1e1b4b 0%, #0f172a 60%, #020617 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 99999
    }}>
      <div className="glass-card" style={{
        width: '680px',
        maxWidth: '95vw',
        padding: '36px',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: '0 25px 50px rgba(0,0,0,0.6)'
      }}>
        {/* Step Progress Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#06b6d4', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Step {step} of 4
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', marginTop: '2px' }}>
              {step === 1 && 'Set Up Your Organization Workspace'}
              {step === 2 && 'Configure Telephony Egress & Probes'}
              {step === 3 && 'Define Your First IVR Test Target'}
              {step === 4 && 'Select Plan & Activate 14-Day Free Trial'}
            </h2>
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                style={{
                  width: '28px',
                  height: '6px',
                  borderRadius: '3px',
                  background: s <= step ? '#6366f1' : 'rgba(255,255,255,0.1)'
                }}
              />
            ))}
          </div>
        </div>

        {/* Step 1: Workspace Profile */}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '6px' }}>
                Company or Organization Name
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => {
                  setCompanyName(e.target.value);
                  setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''));
                }}
                className="input-field"
                style={{ width: '100%', padding: '12px 14px' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '6px' }}>
                Custom Workspace Subdomain
              </label>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="text"
                  value={subdomain}
                  onChange={(e) => setSubdomain(e.target.value)}
                  className="input-field"
                  style={{ flex: 1, padding: '12px 14px', borderRadius: '10px 0 0 10px' }}
                />
                <span style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderLeft: 'none',
                  padding: '12px 16px',
                  borderRadius: '0 10px 10px 0',
                  color: '#94a3b8',
                  fontSize: '0.88rem'
                }}>
                  .voxpulse.io
                </span>
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '6px' }}>
                Primary Telecom Gateway Region
              </label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="input-field"
                style={{ width: '100%', padding: '12px 14px' }}
              >
                <option value="US-East (Virginia)">US-East (Virginia - Lowest Latency for NANPA)</option>
                <option value="EU-Central (Frankfurt)">EU-Central (Frankfurt - GDPR Dedicated)</option>
                <option value="APAC (Singapore)">APAC (Singapore - Asia Telecom Hub)</option>
                <option value="UK (London)">UK (London - BT & Vodafone Edge)</option>
              </select>
            </div>
          </div>
        )}

        {/* Step 2: Telephony Egress */}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
              Choose how VoxPulse triggers synthetic PSTN calls into your contact center:
            </p>

            <div
              onClick={() => setTelephonyMode('MANAGED_POOL')}
              style={{
                padding: '16px',
                borderRadius: '12px',
                border: telephonyMode === 'MANAGED_POOL' ? '2px solid #6366f1' : '1px solid rgba(255,255,255,0.1)',
                background: telephonyMode === 'MANAGED_POOL' ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255,255,255,0.03)',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>
                  VoxPulse Global Managed Carrier Pool (Turnkey)
                </span>
                <span className="badge badge-emerald">Recommended</span>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.8rem', lineHeight: 1.5 }}>
                Zero configuration required. Instant access to 100+ Tier-1 direct PSTN lines across 14 countries via Telnyx & Twilio Super Network.
              </p>
            </div>

            <div
              onClick={() => setTelephonyMode('GENESYS_CLOUD')}
              style={{
                padding: '16px',
                borderRadius: '12px',
                border: telephonyMode === 'GENESYS_CLOUD' ? '2px solid #ff4f00' : '1px solid rgba(255,255,255,0.1)',
                background: telephonyMode === 'GENESYS_CLOUD' ? 'rgba(255, 79, 0, 0.12)' : 'rgba(255,255,255,0.03)',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>
                  Genesys Cloud CX Integration (Native GCV / BYOC Trunk)
                </span>
                <span className="badge" style={{ background: 'rgba(255, 79, 0, 0.2)', color: '#ff6b35', border: '1px solid rgba(255, 79, 0, 0.4)' }}>
                  Genesys Native
                </span>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.8rem', lineHeight: 1.5 }}>
                Direct integration with your Genesys Cloud organization via OAuth2. Use your existing Genesys Cloud Voice (GCV) trunks or BYOC with zero external carrier setup needed.
              </p>
            </div>

            <div
              onClick={() => setTelephonyMode('BYOC')}
              style={{
                padding: '16px',
                borderRadius: '12px',
                border: telephonyMode === 'BYOC' ? '2px solid #6366f1' : '1px solid rgba(255,255,255,0.1)',
                background: telephonyMode === 'BYOC' ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255,255,255,0.03)',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>
                  Bring Your Own Carrier (BYOC) / Direct SIP SBC Trunk
                </span>
                <span className="badge badge-purple">Enterprise</span>
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.8rem', lineHeight: 1.5 }}>
                Connect your existing Session Border Controller (AudioCodes, Ribbon, Cisco) via SIP TLS/SRTP or Telnyx wholesale credentials.
              </p>
            </div>
          </div>
        )}

        {/* Step 3: First Test Target */}
        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '6px' }}>
                Target IVR Phone Number (E.164 Format)
              </label>
              <input
                type="text"
                value={firstDID}
                onChange={(e) => setFirstDID(e.target.value)}
                placeholder="+18005550100"
                className="input-field"
                style={{ width: '100%', padding: '12px 14px' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1', display: 'block', marginBottom: '6px' }}>
                Test Flow Description
              </label>
              <input
                type="text"
                value={testName}
                onChange={(e) => setTestName(e.target.value)}
                className="input-field"
                style={{ width: '100%', padding: '12px 14px' }}
              />
            </div>

            <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', padding: '14px', borderRadius: '10px' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#34d399', marginBottom: '4px' }}>
                Automated Discovery Ready:
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.78rem', margin: 0, lineHeight: 1.5 }}>
                VoxPulse will automatically dial this line upon activation, crawl the prompt options, and generate a visual interactive IVR tree graph.
              </p>
            </div>
          </div>
        )}

        {/* Step 4: Plan Selection */}
        {step === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div
                onClick={() => setSelectedPlan('GROWTH')}
                style={{
                  padding: '16px',
                  borderRadius: '14px',
                  border: selectedPlan === 'GROWTH' ? '2px solid #6366f1' : '1px solid rgba(255,255,255,0.1)',
                  background: selectedPlan === 'GROWTH' ? 'rgba(99, 102, 241, 0.12)' : 'rgba(255,255,255,0.03)',
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontWeight: 800, color: '#fff', fontSize: '1rem' }}>Growth Plan</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#38bdf8', margin: '8px 0' }}>$1,999/mo</div>
                <div style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>
                  • 25 Global DIDs<br />
                  • 15,000 Test Mins<br />
                  • Gemini 3.8 AI RCA<br />
                  • 14-Day Free Trial
                </div>
              </div>

              <div
                onClick={() => setSelectedPlan('ENTERPRISE')}
                style={{
                  padding: '16px',
                  borderRadius: '14px',
                  border: selectedPlan === 'ENTERPRISE' ? '2px solid #a855f7' : '1px solid rgba(255,255,255,0.1)',
                  background: selectedPlan === 'ENTERPRISE' ? 'rgba(168, 85, 247, 0.12)' : 'rgba(255,255,255,0.03)',
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontWeight: 800, color: '#fff', fontSize: '1rem' }}>Enterprise Scale</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#c084fc', margin: '8px 0' }}>$4,999/mo</div>
                <div style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>
                  • Unlimited DIDs<br />
                  • 100,000 Test Mins<br />
                  • Dedicated SBC Trunks<br />
                  • 99.99% Financial SLA
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <span style={{ fontSize: '0.8rem', color: '#10b981', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} /> 14-Day Trial Included • No credit card required upfront
              </span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '32px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="btn btn-secondary"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 18px' }}
            >
              <ArrowLeft size={16} /> Previous
            </button>
          ) : (
            <button
              onClick={onCancel}
              className="btn btn-secondary"
              style={{ padding: '10px 18px' }}
            >
              Cancel
            </button>
          )}

          <button
            onClick={handleNext}
            disabled={isDeploying}
            className="btn btn-primary"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 28px',
              fontSize: '0.95rem',
              fontWeight: 700,
              borderRadius: '10px'
            }}
          >
            {isDeploying ? (
              'Provisioning Workspace...'
            ) : step === 4 ? (
              <>Complete & Launch Workspace <Sparkles size={16} /></>
            ) : (
              <>Next Step <ArrowRight size={16} /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
