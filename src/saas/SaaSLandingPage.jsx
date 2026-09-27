import React, { useState } from 'react';
import { 
  Sparkles, 
  PhoneCall, 
  ShieldCheck, 
  Activity, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Lock, 
  Globe2, 
  BarChart3, 
  TrendingDown, 
  Users, 
  Bot, 
  Server,
  Play,
  Star,
  Check
} from 'lucide-react';

export default function SaaSLandingPage({ onEnterApp, onStartTrial }) {
  const [billingAnnual, setBillingAnnual] = useState(true);
  const [calculatorDids, setCalculatorDids] = useState(25);
  const [calculatorCalls, setCalculatorCalls] = useState(5000);

  // ROI math
  const cyaraAnnualCost = Math.round(calculatorDids * 1800 + (calculatorCalls * 12 * 0.45));
  const klearcomAnnualCost = Math.round(calculatorDids * 1400 + (calculatorCalls * 12 * 0.38));
  const voxpulseAnnualCost = billingAnnual ? 19190 : 23988;
  const annualSavings = Math.max(0, cyaraAnnualCost - voxpulseAnnualCost);
  const savingsPercent = Math.round((annualSavings / cyaraAnnualCost) * 100);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(circle at 50% 0%, #1e1b4b 0%, #0b0f19 50%, #030712 100%)',
      color: '#f8fafc',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      overflowX: 'hidden'
    }}>
      {/* Top Navbar */}
      <nav style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '24px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)'
          }}>
            <PhoneCall size={20} color="#fff" />
          </div>
          <div>
            <span style={{ fontSize: '1.25rem', fontWeight: 900, letterSpacing: '-0.5px', color: '#fff' }}>
              VoxPulse <span style={{ color: '#06b6d4' }}>AI Cloud</span>
            </span>
            <span className="badge badge-purple" style={{ marginLeft: '8px', fontSize: '0.65rem', padding: '2px 6px' }}>
              B2B SaaS
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <a href="#roi" style={{ color: '#cbd5e1', fontSize: '0.88rem', textDecoration: 'none', fontWeight: 500 }}>
            ROI Calculator
          </a>
          <a href="#pricing" style={{ color: '#cbd5e1', fontSize: '0.88rem', textDecoration: 'none', fontWeight: 500 }}>
            Pricing
          </a>
          <a href="#features" style={{ color: '#cbd5e1', fontSize: '0.88rem', textDecoration: 'none', fontWeight: 500 }}>
            Features
          </a>
          <button
            onClick={onEnterApp}
            className="btn btn-secondary"
            style={{ padding: '8px 16px', fontSize: '0.86rem', borderRadius: '10px' }}
          >
            Sign In to Console
          </button>
          <button
            onClick={onStartTrial}
            className="btn btn-primary"
            style={{
              padding: '8px 20px',
              fontSize: '0.86rem',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)'
            }}
          >
            Start 14-Day Trial <ArrowRight size={15} />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '80px 24px 60px 24px', textAlign: 'center' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(99, 102, 241, 0.15)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          padding: '6px 16px',
          borderRadius: '24px',
          fontSize: '0.82rem',
          color: '#a5b4fc',
          fontWeight: 600,
          marginBottom: '28px'
        }}>
          <Sparkles size={15} color="#818cf8" />
          The Next-Generation Cyara & Klearcom Replacement Platform
        </div>

        <h1 style={{
          fontSize: '3.6rem',
          fontWeight: 900,
          letterSpacing: '-1.5px',
          lineHeight: 1.15,
          marginBottom: '24px',
          background: 'linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Autonomous Voicebot & IVR Testing.<br />
          <span style={{
            background: 'linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Zero Legacy Hardware. 80% Less Cost.
          </span>
        </h1>

        <p style={{
          fontSize: '1.2rem',
          color: '#94a3b8',
          maxWidth: '780px',
          margin: '0 auto 40px auto',
          lineHeight: 1.6
        }}>
          Automate global PSTN call testing, verify conversational voicebots with Google Gemini 3.8 AI, calculate sub-second POLQA MOS audio quality, and audit regulatory compliance in a modern multi-tenant SaaS cloud.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '40px' }}>
          <button
            onClick={onStartTrial}
            className="btn btn-primary"
            style={{
              padding: '14px 32px',
              fontSize: '1.05rem',
              fontWeight: 800,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 10px 30px rgba(99, 102, 241, 0.4)'
            }}
          >
            Start Free 14-Day Enterprise Trial <ArrowRight size={18} />
          </button>

          <button
            onClick={onEnterApp}
            className="btn btn-secondary"
            style={{
              padding: '14px 28px',
              fontSize: '1.05rem',
              fontWeight: 700,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Play size={16} /> Explore Live Interactive Sandbox
          </button>
        </div>

        {/* Trust Badges */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', alignItems: 'center', color: '#64748b', fontSize: '0.85rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><ShieldCheck size={16} color="#10b981" /> SOC 2 Type II Certified</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Lock size={16} color="#06b6d4" /> HIPAA & PCI-DSS Level 1</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Activity size={16} color="#a855f7" /> 99.99% Uptime Financial SLA</span>
        </div>
      </section>

      {/* Interactive ROI Comparison Calculator */}
      <section id="roi" style={{ maxWidth: '1100px', margin: '60px auto', padding: '0 24px' }}>
        <div className="glass-card" style={{ padding: '40px', borderRadius: '24px', border: '1px solid rgba(99, 102, 241, 0.25)' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span className="badge badge-cyan" style={{ marginBottom: '12px' }}>Interactive Cost Calculator</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff' }}>
              How Much Will You Save Switching from Cyara & Klearcom?
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '6px' }}>
              Legacy vendors lock enterprises into expensive proprietary hardware probes. VoxPulse delivers wholesale cloud pricing.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center' }}>
            {/* Sliders */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.88rem', fontWeight: 600, color: '#cbd5e1' }}>Total Global DIDs Monitored</label>
                  <span style={{ color: '#06b6d4', fontWeight: 800 }}>{calculatorDids} DIDs</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="150"
                  step="5"
                  value={calculatorDids}
                  onChange={(e) => setCalculatorDids(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#6366f1', cursor: 'pointer' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.88rem', fontWeight: 600, color: '#cbd5e1' }}>Automated Synthetic Calls / Month</label>
                  <span style={{ color: '#818cf8', fontWeight: 800 }}>{calculatorCalls.toLocaleString()} calls</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="50000"
                  step="1000"
                  value={calculatorCalls}
                  onChange={(e) => setCalculatorCalls(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#06b6d4', cursor: 'pointer' }}
                />
              </div>

              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '8px' }}>Estimated Annual Legacy Vendor Cost:</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#cbd5e1' }}>
                  <span>Cyara Enterprise Platform:</span>
                  <strong style={{ color: '#ef4444' }}>${cyaraAnnualCost.toLocaleString()}/yr</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#cbd5e1', marginTop: '6px' }}>
                  <span>Klearcom Voice Monitoring:</span>
                  <strong style={{ color: '#f59e0b' }}>${klearcomAnnualCost.toLocaleString()}/yr</strong>
                </div>
              </div>
            </div>

            {/* Savings Result Card */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)',
              border: '2px solid rgba(99, 102, 241, 0.4)',
              borderRadius: '20px',
              padding: '32px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#a5b4fc', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Your Estimated Annual Savings
              </div>
              <div style={{ fontSize: '3.4rem', fontWeight: 900, color: '#10b981', margin: '12px 0' }}>
                ${annualSavings.toLocaleString()}
              </div>
              <div style={{ fontSize: '1.1rem', color: '#f8fafc', fontWeight: 700, marginBottom: '8px' }}>
                {savingsPercent}% Lower Cost with VoxPulse AI
              </div>
              <p style={{ color: '#94a3b8', fontSize: '0.82rem', marginBottom: '24px' }}>
                VoxPulse Growth Plan (${voxpulseAnnualCost.toLocaleString()}/yr) replaces full-suite IVR crawler, POLQA scoring, and live SIP PCAP traces.
              </p>
              <button
                onClick={onStartTrial}
                className="btn btn-primary"
                style={{ width: '100%', padding: '12px', borderRadius: '10px', fontWeight: 700 }}
              >
                Claim Enterprise Discount Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" style={{ maxWidth: '1100px', margin: '80px auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="badge badge-purple" style={{ marginBottom: '12px' }}>Simple, Transparent SaaS Pricing</span>
          <h2 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#fff' }}>
            Predictable Pricing for High-Volume Contact Centers
          </h2>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '20px', background: 'rgba(255,255,255,0.06)', padding: '4px', borderRadius: '12px' }}>
            <button
              onClick={() => setBillingAnnual(false)}
              style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: !billingAnnual ? '#6366f1' : 'transparent', color: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingAnnual(true)}
              style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: billingAnnual ? '#6366f1' : 'transparent', color: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              Annual Billing <span style={{ background: '#10b981', color: '#022c22', fontSize: '0.65rem', padding: '2px 6px', borderRadius: '4px', fontWeight: 800 }}>SAVE 20%</span>
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {/* Starter Plan */}
          <div className="glass-card" style={{ padding: '32px', borderRadius: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff' }}>Starter Plan</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '4px' }}>For development teams & pilot contact centers</p>

              <div style={{ margin: '24px 0' }}>
                <span style={{ fontSize: '2.6rem', fontWeight: 900, color: '#fff' }}>${billingAnnual ? '399' : '499'}</span>
                <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}> / mo</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem', color: '#cbd5e1' }}>
                <div style={{ display: 'flex', gap: '8px' }}><Check size={16} color="#10b981" /> 5 Global DIDs Included</div>
                <div style={{ display: 'flex', gap: '8px' }}><Check size={16} color="#10b981" /> 2,500 Test Minutes / Month</div>
                <div style={{ display: 'flex', gap: '8px' }}><Check size={16} color="#10b981" /> 3 Concurrent PSTN Channels</div>
                <div style={{ display: 'flex', gap: '8px' }}><Check size={16} color="#10b981" /> POLQA / MOS Audio SLA</div>
                <div style={{ display: 'flex', gap: '8px' }}><Check size={16} color="#10b981" /> 30-Day PCAP & Audio Retention</div>
              </div>
            </div>

            <button onClick={onStartTrial} className="btn btn-secondary" style={{ marginTop: '30px', width: '100%', padding: '12px', borderRadius: '10px' }}>
              Start 14-Day Free Trial
            </button>
          </div>

          {/* Growth Plan */}
          <div className="glass-card" style={{ padding: '32px', borderRadius: '20px', border: '2px solid #6366f1', background: 'rgba(99, 102, 241, 0.08)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#6366f1', color: '#fff', fontSize: '0.72rem', fontWeight: 800, padding: '3px 14px', borderRadius: '20px', letterSpacing: '0.5px' }}>
              RECOMMENDED FOR CONTACT CENTERS
            </div>

            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff' }}>Growth Plan</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '4px' }}>Complete automated IVR testing suite</p>

              <div style={{ margin: '24px 0' }}>
                <span style={{ fontSize: '2.6rem', fontWeight: 900, color: '#fff' }}>${billingAnnual ? '1,599' : '1,999'}</span>
                <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}> / mo</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem', color: '#cbd5e1' }}>
                <div style={{ display: 'flex', gap: '8px' }}><Check size={16} color="#10b981" /> 25 Global DIDs Included</div>
                <div style={{ display: 'flex', gap: '8px' }}><Check size={16} color="#10b981" /> 15,000 Test Minutes / Month</div>
                <div style={{ display: 'flex', gap: '8px' }}><Check size={16} color="#10b981" /> 10 Concurrent PSTN Channels</div>
                <div style={{ display: 'flex', gap: '8px' }}><Check size={16} color="#10b981" /> Google Gemini 3.8 AI RCA</div>
                <div style={{ display: 'flex', gap: '8px' }}><Check size={16} color="#10b981" /> Outbound Webhooks & PagerDuty</div>
                <div style={{ display: 'flex', gap: '8px' }}><Check size={16} color="#10b981" /> 90-Day Retention & 99.9% SLA</div>
              </div>
            </div>

            <button onClick={onStartTrial} className="btn btn-primary" style={{ marginTop: '30px', width: '100%', padding: '12px', borderRadius: '10px' }}>
              Start 14-Day Free Trial
            </button>
          </div>

          {/* Enterprise Scale */}
          <div className="glass-card" style={{ padding: '32px', borderRadius: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff' }}>Enterprise Scale</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '4px' }}>Global telco & bank grade infrastructure</p>

              <div style={{ margin: '24px 0' }}>
                <span style={{ fontSize: '2.6rem', fontWeight: 900, color: '#fff' }}>${billingAnnual ? '3,999' : '4,999'}</span>
                <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}> / mo</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem', color: '#cbd5e1' }}>
                <div style={{ display: 'flex', gap: '8px' }}><Check size={16} color="#10b981" /> Unlimited Global DIDs</div>
                <div style={{ display: 'flex', gap: '8px' }}><Check size={16} color="#10b981" /> 100,000 Test Minutes / Month</div>
                <div style={{ display: 'flex', gap: '8px' }}><Check size={16} color="#10b981" /> 50 Concurrent PSTN Channels</div>
                <div style={{ display: 'flex', gap: '8px' }}><Check size={16} color="#10b981" /> Dedicated SBC Trunk Failover</div>
                <div style={{ display: 'flex', gap: '8px' }}><Check size={16} color="#10b981" /> 365-Day Retention & HIPAA BAA</div>
                <div style={{ display: 'flex', gap: '8px' }}><Check size={16} color="#10b981" /> 99.99% Financial Uptime SLA</div>
              </div>
            </div>

            <button onClick={onStartTrial} className="btn btn-secondary" style={{ marginTop: '30px', width: '100%', padding: '12px', borderRadius: '10px' }}>
              Contact Enterprise Sales
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ maxWidth: '1280px', margin: '80px auto 0 auto', padding: '40px 32px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#64748b', fontSize: '0.85rem' }}>
        <div>
          © 2026 VoxPulse AI Enterprise Inc. All rights reserved.
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Security & Compliance</span>
          <span>Status (99.99% Uptime)</span>
        </div>
      </footer>
    </div>
  );
}
