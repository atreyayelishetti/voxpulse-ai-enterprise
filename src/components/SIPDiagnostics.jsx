import React, { useState } from 'react';
import { 
  Server, 
  Activity, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2, 
  Play, 
  RefreshCw, 
  Layers,
  AlertTriangle,
  Clock,
  Code
} from 'lucide-react';

const SCENARIOS = {
  success: {
    title: 'RFC 3261 Standard Two-Way Audio Call (200 OK)',
    description: 'Clean INVITE, 100 Trying, 180 Ringing, 200 OK with SDP offer/answer, and clean BYE teardown.',
    pdd: '148ms',
    setupTime: '210ms',
    messages: [
      { step: 1, dir: 'out', method: 'INVITE', uri: 'sip:+18005550100@sbc.carrier.net', latency: '0ms', code: 'INVITE', sdp: 'Offer: PCMU/8000, telephone-event' },
      { step: 2, dir: 'in', method: 'SIP/2.0 100 Trying', uri: 'Softswitch -> Carrier', latency: '12ms', code: '100 Trying', sdp: 'None' },
      { step: 3, dir: 'in', method: 'SIP/2.0 180 Ringing', uri: 'Far-end alerting', latency: '48ms', code: '180 Ringing', sdp: 'None' },
      { step: 4, dir: 'in', method: 'SIP/2.0 200 OK', uri: 'Call answered by remote agent', latency: '138ms', code: '200 OK', sdp: 'Answer: PCMU/8000 accepted' },
      { step: 5, dir: 'out', method: 'ACK', uri: 'Confirm 3-way handshake', latency: '140ms', code: 'ACK', sdp: 'None' },
      { step: 6, dir: 'both', method: '2-Way RTP Media', uri: '8000Hz PCM G.711u voice stream', latency: '142ms - 15.2s', code: 'RTP Active', sdp: 'SRTP AES-128' },
      { step: 7, dir: 'out', method: 'BYE', uri: 'Caller terminates session', latency: '15.2s', code: 'BYE', sdp: 'None' },
      { step: 8, dir: 'in', method: 'SIP/2.0 200 OK (BYE)', uri: 'Carrier acknowledges termination', latency: '15.24s', code: '200 OK', sdp: 'Session Closed' }
    ]
  },
  earlyMedia: {
    title: 'RFC 3960 Early Media (183 Session Progress + PRACK)',
    description: 'Ringback audio & IVR announcements played before 200 OK answer state via 100rel PRACK exchange.',
    pdd: '34ms',
    setupTime: '180ms',
    messages: [
      { step: 1, dir: 'out', method: 'INVITE', uri: 'sip:+18005550188@sbc.carrier.net (Require: 100rel)', latency: '0ms', code: 'INVITE', sdp: 'Offer: G.711u / Opus' },
      { step: 2, dir: 'in', method: 'SIP/2.0 183 Session Progress', uri: 'Carrier IVR Early Media (RSeq: 401)', latency: '34ms', code: '183 Progress', sdp: 'Early SDP: Inband Ringtone' },
      { step: 3, dir: 'out', method: 'PRACK', uri: 'Provisional ACK (RAck: 401 101 INVITE)', latency: '42ms', code: 'PRACK', sdp: 'None' },
      { step: 4, dir: 'in', method: 'SIP/2.0 200 OK (PRACK)', uri: 'Carrier acknowledges PRACK', latency: '55ms', code: '200 OK', sdp: 'None' },
      { step: 5, dir: 'in', method: 'SIP/2.0 200 OK (INVITE)', uri: 'Remote answers call', latency: '180ms', code: '200 OK', sdp: 'Answer: G.711u confirmed' },
      { step: 6, dir: 'out', method: 'ACK', uri: 'Final ACK', latency: '182ms', code: 'ACK', sdp: 'None' }
    ]
  },
  busy: {
    title: 'SIP 486 Busy Here / Rejected Call Flow',
    description: 'Far-end PBX or subscriber line is busy; proper graceful release without dangling dialogs.',
    pdd: '88ms',
    setupTime: 'Failed (Busy)',
    messages: [
      { step: 1, dir: 'out', method: 'INVITE', uri: 'sip:+18005550144@pstn.carrier.net', latency: '0ms', code: 'INVITE', sdp: 'Offer: G.711u' },
      { step: 2, dir: 'in', method: 'SIP/2.0 100 Trying', uri: 'Gateway routing call', latency: '15ms', code: '100 Trying', sdp: 'None' },
      { step: 3, dir: 'in', method: 'SIP/2.0 486 Busy Here', uri: 'Subscriber line engaged on other call', latency: '88ms', code: '486 Busy', sdp: 'None' },
      { step: 4, dir: 'out', method: 'ACK', uri: 'Acknowledge 486 negative response', latency: '90ms', code: 'ACK', sdp: 'None' }
    ]
  },
  auth: {
    title: 'RFC 2617 / 8760 SIP Digest Authentication Challenge (407)',
    description: 'Softswitch receives 407 Proxy Authentication Required and resends INVITE with MD5/SHA-256 credentials.',
    pdd: '195ms',
    setupTime: '265ms',
    messages: [
      { step: 1, dir: 'out', method: 'INVITE', uri: 'Initial unauthenticated INVITE', latency: '0ms', code: 'INVITE', sdp: 'Offer: G.711u' },
      { step: 2, dir: 'in', method: 'SIP/2.0 407 Proxy Authentication Required', uri: 'Carrier challenge nonce', latency: '24ms', code: '407 Auth', sdp: 'Proxy-Authenticate: Digest' },
      { step: 3, dir: 'out', method: 'ACK', uri: 'Acknowledge 407', latency: '26ms', code: 'ACK', sdp: 'None' },
      { step: 4, dir: 'out', method: 'INVITE (with Proxy-Authorization)', uri: 'Resend INVITE with SHA-256 hash', latency: '35ms', code: 'INVITE (Auth)', sdp: 'Offer: G.711u' },
      { step: 5, dir: 'in', method: 'SIP/2.0 180 Ringing', uri: 'Credentials accepted; ringing', latency: '95ms', code: '180 Ringing', sdp: 'None' },
      { step: 6, dir: 'in', method: 'SIP/2.0 200 OK', uri: 'Answered', latency: '265ms', code: '200 OK', sdp: 'Answer accepted' }
    ]
  }
};

export default function SIPDiagnostics() {
  const [selectedScenarioKey, setSelectedScenarioKey] = useState('success');
  const [activeStep, setActiveStep] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  const scenario = SCENARIOS[selectedScenarioKey];

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setActiveStep(1);
    let step = 1;
    const interval = setInterval(() => {
      step++;
      if (step > scenario.messages.length) {
        clearInterval(interval);
        setIsSimulating(false);
      } else {
        setActiveStep(step);
      }
    }, 600);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="glass-panel glass-panel-glow" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Server size={24} color="#8b5cf6" />
              SIP Protocol & Softswitch Ladder Diagnostics
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Interactive call ladder sequencer tracking RFC 3261 handshakes, SDP offer/answers, PRACK provisional state, and post-dial delay.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button 
              className="btn btn-primary"
              onClick={handleRunSimulation}
              disabled={isSimulating}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}
            >
              <Play size={16} />
              {isSimulating ? 'Simulating Call Signaling...' : 'Simulate Call Flow'}
            </button>
          </div>
        </div>

        {/* Scenario Switcher Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '20px', flexWrap: 'wrap' }}>
          {[
            { key: 'success', label: 'Standard 200 OK Call' },
            { key: 'earlyMedia', label: '183 Early Media & PRACK' },
            { key: 'busy', label: '486 Busy Here' },
            { key: 'auth', label: '407 Auth Challenge' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => { setSelectedScenarioKey(tab.key); setActiveStep(0); }}
              style={{
                background: selectedScenarioKey === tab.key ? 'rgba(139, 92, 246, 0.25)' : 'rgba(255,255,255,0.05)',
                border: selectedScenarioKey === tab.key ? '1px solid #8b5cf6' : '1px solid rgba(255,255,255,0.1)',
                color: selectedScenarioKey === tab.key ? '#c4b5fd' : 'var(--text-muted)',
                borderRadius: '6px',
                padding: '7px 14px',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Scenario Details & Timing Card */}
      <div className="glass-panel" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>{scenario.title}</div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>{scenario.description}</p>
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '10px 14px', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>POST-DIAL DELAY (PDD)</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#38bdf8' }}>{scenario.pdd}</div>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '10px 14px', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>CALL SETUP DURATION</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#34d399' }}>{scenario.setupTime}</div>
          </div>
        </div>
      </div>

      {/* Visual SIP Ladder Diagram */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: '#818cf8', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#38bdf8', display: 'inline-block' }} />
            VOXPULSE SOFTSWITCH (ORIGIN)
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            CARRIER PSTN GATEWAY (TERMINATION)
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#34d399', display: 'inline-block' }} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {scenario.messages.map(msg => {
            const isHighlighted = activeStep === msg.step || activeStep === 0;
            return (
              <div 
                key={msg.step} 
                onClick={() => setActiveStep(msg.step)}
                style={{
                  background: isHighlighted ? 'rgba(31, 41, 55, 0.6)' : 'rgba(31, 41, 55, 0.2)',
                  border: activeStep === msg.step ? '1px solid #8b5cf6' : '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '10px',
                  padding: '12px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {/* Step & Latency */}
                <div style={{ width: '90px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#a78bfa', display: 'block' }}>
                    STEP {msg.step}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    {msg.latency}
                  </span>
                </div>

                {/* Arrow & Message Body */}
                <div style={{ flex: 1, margin: '0 20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {msg.dir === 'out' && (
                    <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: '10px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, color: '#38bdf8' }}>{msg.code}</span>
                      <div style={{ flex: 1, height: '2px', background: 'linear-gradient(90deg, #38bdf8, #8b5cf6)' }} />
                      <ArrowRight size={16} color="#8b5cf6" />
                    </div>
                  )}

                  {msg.dir === 'in' && (
                    <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: '10px' }}>
                      <ArrowLeft size={16} color="#34d399" />
                      <div style={{ flex: 1, height: '2px', background: 'linear-gradient(90deg, #34d399, #38bdf8)' }} />
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, color: '#34d399' }}>{msg.code}</span>
                    </div>
                  )}

                  {msg.dir === 'both' && (
                    <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: '10px' }}>
                      <ArrowLeft size={16} color="#f59e0b" />
                      <div style={{ flex: 1, height: '3px', background: 'repeating-linear-gradient(90deg, #f59e0b, #f59e0b 6px, transparent 6px, transparent 12px)' }} />
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 700, color: '#f59e0b' }}>{msg.code}</span>
                      <ArrowRight size={16} color="#f59e0b" />
                    </div>
                  )}
                </div>

                {/* Description & SDP */}
                <div style={{ width: '240px', textAlign: 'right', fontSize: '0.78rem' }}>
                  <div style={{ color: '#fff', fontWeight: 600 }}>{msg.uri}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>{msg.sdp}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
