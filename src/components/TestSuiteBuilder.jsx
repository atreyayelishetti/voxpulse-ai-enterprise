import React, { useState } from 'react';
import { 
  Workflow, 
  Plus, 
  Trash2, 
  Play, 
  FileText, 
  Save, 
  Sparkles, 
  Hash, 
  CheckCircle, 
  Sliders,
  Layers
} from 'lucide-react';

const PRESET_TEMPLATES = [
  {
    id: 'visa_fraud_dispute',
    name: 'Visa Advanced Authorization (VAA) & Fraud Triage',
    description: 'Autonomous synthetic testing of Visa Cardholder hotline (1-800-VISA-911), DTMF card dispute routing, biometric voice verification, and PCI-DSS v4.0 tokenization.',
    targetNumber: '+18008472911',
    country: 'US',
    steps: [
      { action: 'EXPECT_PROMPT', description: 'Assert Visa Global Welcome Prompt', expectedText: 'Thank you for calling Visa Global Cardholder Services' },
      { action: 'SEND_DTMF', description: 'Press 1 for Lost, Stolen, or Suspicious Card Activity', dtmfKey: '1' },
      { action: 'EXPECT_PROMPT', description: 'Verify PCI Redacted 16-Digit PAN Input Prompt', expectedText: 'Please enter your 16-digit Visa card number followed by pound' },
      { action: 'SEND_DTMF', description: 'Enter Test Tokenized PAN (4111...)', dtmfKey: '4' },
      { action: 'ASSERT_ROUTING', description: 'Assert Priority Routing to Visa Fraud Triage Queue', expectedRoute: 'q_visa_fraud_triage' }
    ]
  },
  {
    id: 'banking_auth',
    name: 'Enterprise Banking IVR (Account & PIN Auth)',
    description: 'Tests main welcome prompt, option 1 selection, PIN entry prompt, and automated queue handoff.',
    targetNumber: '+18005550100',
    country: 'US',
    steps: [
      { action: 'EXPECT_PROMPT', description: 'Verify Main Banking Welcome Prompt', expectedText: 'Welcome to Acme Enterprise Bank' },
      { action: 'SEND_DTMF', description: 'Press 1 for Account Balance', dtmfKey: '1' },
      { action: 'EXPECT_PROMPT', description: 'Verify 4-Digit Security PIN Prompt', expectedText: 'Please enter your security PIN' },
      { action: 'SEND_DTMF', description: 'Enter Security PIN (1234#)', dtmfKey: '1' },
      { action: 'ASSERT_ROUTING', description: 'Assert Handoff to Queue balance_auth_v2', expectedRoute: 'queue_balance_auth_v2' }
    ]
  },
  {
    id: 'healthcare_portal',
    name: 'Healthcare Patient Appointment IVR',
    description: 'Verifies multi-lingual speech prompt, doctor appointment selection, and latency SLA.',
    targetNumber: '+18005550200',
    country: 'US',
    steps: [
      { action: 'EXPECT_PROMPT', description: 'Verify Healthcare Portal Greeting', expectedText: 'Thank you for calling CarePulse Health' },
      { action: 'SEND_DTMF', description: 'Press 2 for Appointments', dtmfKey: '2' },
      { action: 'SPEAK_RESPONSE', description: 'Speak Patient DOB', speakText: 'October 14th 1988' },
      { action: 'ASSERT_ROUTING', description: 'Verify Routing to Cardiology Dept', expectedRoute: 'dept_cardiology' }
    ]
  },
  {
    id: 'ecommerce_multilingual',
    name: 'E-Commerce Order Tracking (Spanish & English)',
    description: 'Tests Spanish language selection, order number validation, and audio MOS quality score.',
    targetNumber: '+34910000000',
    country: 'ES',
    steps: [
      { action: 'EXPECT_PROMPT', description: 'Spanish Language Greeting', expectedText: 'Bienvenido a ShopWorld España' },
      { action: 'SEND_DTMF', description: 'Press 9 for Spanish Menu', dtmfKey: '9' },
      { action: 'EXPECT_PROMPT', description: 'Order Status Prompt', expectedText: 'Ingrese su número de pedido' },
      { action: 'ASSERT_ROUTING', description: 'Assert Route to Spanish Claims Queue', expectedRoute: 'queue_es_orders' }
    ]
  }
];

export default function TestSuiteBuilder({ onRunTest }) {
  const [selectedPreset, setSelectedPreset] = useState('banking_auth');
  const [testName, setTestName] = useState(PRESET_TEMPLATES[0].name);
  const [targetNumber, setTargetNumber] = useState(PRESET_TEMPLATES[0].targetNumber);
  const [country, setCountry] = useState(PRESET_TEMPLATES[0].country);
  const [steps, setSteps] = useState(PRESET_TEMPLATES[0].steps);

  const loadTemplate = (templateId) => {
    const tmpl = PRESET_TEMPLATES.find(t => t.id === templateId);
    if (!tmpl) return;
    setSelectedPreset(templateId);
    setTestName(tmpl.name);
    setTargetNumber(tmpl.targetNumber);
    setCountry(tmpl.country);
    setSteps([...tmpl.steps]);
  };

  const addStep = () => {
    setSteps([
      ...steps,
      {
        action: 'EXPECT_PROMPT',
        description: `New Step ${steps.length + 1}`,
        expectedText: 'Welcome'
      }
    ]);
  };

  const removeStep = (index) => {
    setSteps(steps.filter((_, idx) => idx !== index));
  };

  const updateStep = (index, field, value) => {
    const updated = [...steps];
    updated[index][field] = value;
    setSteps(updated);
  };

  const handleExecute = () => {
    const testPayload = {
      id: selectedPreset,
      name: testName,
      targetNumber,
      country,
      steps
    };
    onRunTest(testPayload);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Template Selector & Action Bar */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Workflow size={22} color="#8b5cf6" />
              Visual IVR Test Suite Builder
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Construct multi-step IVR test scenarios with Gemini prompt pattern verification and PSTN DTMF injection.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={handleExecute} className="btn btn-emerald">
              <Play size={18} /> Execute Test Suite
            </button>
          </div>
        </div>

        {/* Preset Selector */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
          {PRESET_TEMPLATES.map(tmpl => (
            <div
              key={tmpl.id}
              onClick={() => loadTemplate(tmpl.id)}
              style={{
                padding: '16px',
                borderRadius: '12px',
                background: selectedPreset === tmpl.id ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                border: selectedPreset === tmpl.id ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: selectedPreset === tmpl.id ? '#818cf8' : '#9ca3af', marginBottom: '4px' }}>
                TEMPLATE PRESET
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>
                {tmpl.name}
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.3 }}>
                {tmpl.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Metadata Form */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
          Test Scenario Settings
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px', display: 'block' }}>
              SCENARIO NAME
            </label>
            <input 
              type="text" 
              className="input-field" 
              value={testName} 
              onChange={e => setTestName(e.target.value)} 
            />
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px', display: 'block' }}>
              DIAL TARGET PHONE
            </label>
            <input 
              type="text" 
              className="input-field" 
              value={targetNumber} 
              onChange={e => setTargetNumber(e.target.value)} 
            />
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px', display: 'block' }}>
              ORIGINATING REGION
            </label>
            <select className="input-field" value={country} onChange={e => setCountry(e.target.value)}>
              <option value="US">🇺🇸 United States (+1)</option>
              <option value="UK">🇬🇧 United Kingdom (+44)</option>
              <option value="DE">🇩🇪 Germany (+49)</option>
              <option value="ES">🇪🇸 Spain (+34)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Step Pipeline Flow */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
          <span style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>
            Test Step Execution Sequence ({steps.length} Steps)
          </span>

          <button onClick={addStep} className="btn btn-secondary" style={{ fontSize: '0.8rem', padding: '6px 12px' }}>
            <Plus size={16} /> Add Step
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {steps.map((step, idx) => (
            <div key={idx} style={{
              background: 'rgba(31, 41, 55, 0.5)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              {/* Step Index Badge */}
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(99, 102, 241, 0.2)',
                color: '#818cf8',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.85rem'
              }}>
                {idx + 1}
              </div>

              {/* Step Config Inputs */}
              <div style={{ gridTemplateColumns: '1.2fr 1.5fr 2fr', display: 'grid', gap: '12px', flex: 1 }}>
                <div>
                  <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>ACTION TYPE</label>
                  <select 
                    className="input-field" 
                    style={{ fontSize: '0.82rem', padding: '6px 10px' }}
                    value={step.action}
                    onChange={e => updateStep(idx, 'action', e.target.value)}
                  >
                    <option value="EXPECT_PROMPT">EXPECT_PROMPT (Gemini AI)</option>
                    <option value="SEND_DTMF">SEND_DTMF (PSTN Keypad)</option>
                    <option value="SPEAK_RESPONSE">SPEAK_RESPONSE (Speech AI)</option>
                    <option value="ASSERT_ROUTING">ASSERT_ROUTING (SIP Queue)</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>DESCRIPTION</label>
                  <input 
                    type="text" 
                    className="input-field" 
                    style={{ fontSize: '0.82rem', padding: '6px 10px' }}
                    value={step.description}
                    onChange={e => updateStep(idx, 'description', e.target.value)}
                  />
                </div>

                <div>
                  {step.action === 'EXPECT_PROMPT' && (
                    <>
                      <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>EXPECTED PROMPT TEXT / PATTERN</label>
                      <input 
                        type="text" 
                        className="input-field" 
                        style={{ fontSize: '0.82rem', padding: '6px 10px' }}
                        value={step.expectedText || ''}
                        onChange={e => updateStep(idx, 'expectedText', e.target.value)}
                      />
                    </>
                  )}
                  {step.action === 'SEND_DTMF' && (
                    <>
                      <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>DTMF KEY DIGIT</label>
                      <input 
                        type="text" 
                        className="input-field" 
                        style={{ fontSize: '0.82rem', padding: '6px 10px' }}
                        value={step.dtmfKey || ''}
                        onChange={e => updateStep(idx, 'dtmfKey', e.target.value)}
                      />
                    </>
                  )}
                  {step.action === 'SPEAK_RESPONSE' && (
                    <>
                      <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>SPOKEN TEXT</label>
                      <input 
                        type="text" 
                        className="input-field" 
                        style={{ fontSize: '0.82rem', padding: '6px 10px' }}
                        value={step.speakText || ''}
                        onChange={e => updateStep(idx, 'speakText', e.target.value)}
                      />
                    </>
                  )}
                  {step.action === 'ASSERT_ROUTING' && (
                    <>
                      <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>EXPECTED QUEUE ROUTE</label>
                      <input 
                        type="text" 
                        className="input-field" 
                        style={{ fontSize: '0.82rem', padding: '6px 10px' }}
                        value={step.expectedRoute || ''}
                        onChange={e => updateStep(idx, 'expectedRoute', e.target.value)}
                      />
                    </>
                  )}
                </div>
              </div>

              {/* Action Delete */}
              <button 
                onClick={() => removeStep(idx)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#f87171',
                  cursor: 'pointer',
                  padding: '6px'
                }}
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
