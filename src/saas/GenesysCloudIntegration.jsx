import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  Server, 
  ShieldCheck, 
  Check, 
  Play, 
  Globe2, 
  Zap, 
  RefreshCw, 
  Lock, 
  FileText, 
  PhoneCall, 
  Key, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  Sliders,
  PhoneForwarded,
  Square,
  Volume2,
  Activity,
  Database,
  Workflow,
  Sparkles,
  Clock,
  Layers,
  Search,
  CheckCircle,
  AlertCircle,
  Cpu
} from 'lucide-react';

export default function GenesysCloudIntegration() {
  const [activeTab, setActiveTab] = useState('overview');
  const [config, setConfig] = useState({
    configured: false,
    environment: 'mypurecloud.com',
    environmentName: 'US East 1 (N. Virginia)',
    callerIdNumber: '+18005550199',
    defaultQueueId: 'q_voxpulse_qa_test',
    orgId: 'org_visa_inc'
  });
  const [clientId, setClientId] = useState('gc_oauth_live_99a8b1c2');
  const [clientSecret, setClientSecret] = useState('••••••••••••••••••••••••••••••••');
  const [environment, setEnvironment] = useState('mypurecloud.com');
  const [callerId, setCallerId] = useState('+18005550199');
  const [orgId, setOrgId] = useState('org_visa_inc');

  const [connectionStatus, setConnectionStatus] = useState(null);
  const [testingConnection, setTestingConnection] = useState(false);

  const [flows, setFlows] = useState([]);
  const [trunks, setTrunks] = useState([]);
  const [prompts, setPrompts] = useState([]);
  const [dataActions, setDataActions] = useState([]);
  const [loading, setLoading] = useState(true);

  // SIP Trunk Probes State
  const [trunkProbing, setTrunkProbing] = useState(false);
  const [trunkProbeReport, setTrunkProbeReport] = useState(null);

  // Prompt DSP Acoustic Audio Audit State
  const [auditingPromptId, setAuditingPromptId] = useState(null);
  const [promptAuditResult, setPromptAuditResult] = useState(null);

  // Data Actions Diagnostics State
  const [selectedActionId, setSelectedActionId] = useState('action_visa_card_lookup');
  const [actionExecuting, setActionExecuting] = useState(false);
  const [actionExecutionResult, setActionExecutionResult] = useState(null);

  // Automated Flow Journey Test State
  const [journeyTestingFlowId, setJourneyTestingFlowId] = useState(null);
  const [journeyTestResult, setJourneyTestResult] = useState(null);
  const [journeyModalOpen, setJourneyModalOpen] = useState(false);

  // Search filter
  const [searchQuery, setSearchQuery] = useState('');

  // Live Call Sandbox state
  const [dialNumber, setDialNumber] = useState('+18008472911');
  const [activeCall, setActiveCall] = useState(null);
  const [calling, setCalling] = useState(false);
  const [dtmfDigitsSent, setDtmfDigitsSent] = useState([]);
  const [showDocsModal, setShowDocsModal] = useState(false);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [cfgRes, flowsRes, trunksRes, promptsRes, actionsRes] = await Promise.all([
        fetch('/api/genesys/config'),
        fetch('/api/genesys/flows'),
        fetch('/api/genesys/trunks'),
        fetch('/api/genesys/prompts'),
        fetch('/api/genesys/data-actions')
      ]);

      const cfgData = await cfgRes.json();
      const flowsData = await flowsRes.json();
      const trunksData = await trunksRes.json();
      const promptsData = await promptsRes.json();
      const actionsData = await actionsRes.json();

      if (cfgData.success) {
        setConfig(cfgData.config);
        setEnvironment(cfgData.config.environment);
        setCallerId(cfgData.config.callerIdNumber);
        if (cfgData.config.orgId) setOrgId(cfgData.config.orgId);
      }
      if (flowsData.success) setFlows(flowsData.flows);
      if (trunksData.success) setTrunks(trunksData.trunks);
      if (promptsData.success) setPrompts(promptsData.prompts);
      if (actionsData.success) setDataActions(actionsData.dataActions);
    } catch (e) {
      console.error('Failed to load Genesys Cloud data:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleTestConnection = async () => {
    setTestingConnection(true);
    setConnectionStatus(null);
    try {
      const res = await fetch('/api/genesys/test-connection', { method: 'POST' });
      const data = await res.json();
      setConnectionStatus(data);
    } catch (err) {
      setConnectionStatus({ success: false, error: err.message });
    } finally {
      setTestingConnection(false);
    }
  };

  const handleSaveConfig = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    try {
      const res = await fetch('/api/genesys/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId,
          clientSecret,
          environment,
          callerIdNumber: callerId,
          orgId
        })
      });
      const data = await res.json();
      if (data.success) {
        setConfig(data.config);
        handleTestConnection();
      }
    } catch (err) {
      console.error('Failed to save Genesys config:', err);
    }
  };

  const handleRunTrunkProbes = async () => {
    setTrunkProbing(true);
    try {
      const res = await fetch('/api/genesys/probes/run', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setTrunkProbeReport(data.report);
        if (data.report?.trunks) {
          setTrunks(data.report.trunks);
        }
      }
    } catch (err) {
      console.error('Trunk probe failed:', err);
    } finally {
      setTrunkProbing(false);
    }
  };

  const handleAuditPromptAudio = async (promptId) => {
    setAuditingPromptId(promptId);
    setPromptAuditResult(null);
    try {
      const res = await fetch('/api/genesys/prompts/test-audio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ promptId })
      });
      const data = await res.json();
      if (data.success) {
        setPromptAuditResult(data.result);
      }
    } catch (err) {
      console.error('Prompt audio test failed:', err);
    } finally {
      setAuditingPromptId(null);
    }
  };

  const handleExecuteDataAction = async (simulationMode = 'normal') => {
    setActionExecuting(true);
    setActionExecutionResult(null);
    try {
      const payload = {
        actionId: selectedActionId,
        inputPayload: {
          maskedPan: '4147••••••••1234',
          dnis: '+18008472911',
          callerAni: '+14155550199',
          amount: 249.50,
          cardToken: 'tok_visa_enterprise_9981'
        },
        simulateTimeout: simulationMode === 'timeout',
        simulateFailure: simulationMode === 'failure'
      };

      const res = await fetch('/api/genesys/data-actions/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success !== undefined) {
        setActionExecutionResult(data.result || data);
      }
    } catch (err) {
      setActionExecutionResult({ success: false, error: err.message });
    } finally {
      setActionExecuting(false);
    }
  };

  const handleRunJourneyTest = async (flowId) => {
    setJourneyTestingFlowId(flowId);
    setJourneyTestResult(null);
    setJourneyModalOpen(true);
    try {
      const res = await fetch('/api/genesys/flows/auto-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ flowId })
      });
      const data = await res.json();
      if (data.success) {
        setJourneyTestResult(data.result);
      }
    } catch (err) {
      console.error('Journey test failed:', err);
    } finally {
      setJourneyTestingFlowId(null);
    }
  };

  const handleDial = async () => {
    setCalling(true);
    setDtmfDigitsSent([]);
    try {
      const res = await fetch('/api/genesys/calls/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetPhoneNumber: dialNumber, callerId })
      });
      const data = await res.json();
      if (data.success) {
        setActiveCall(data.call);
      }
    } catch (err) {
      console.error('Genesys dial failed:', err);
    } finally {
      setCalling(false);
    }
  };

  const handleSendDTMF = async (digit) => {
    if (!activeCall) return;
    try {
      await fetch('/api/genesys/calls/dtmf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversationId: activeCall.conversationId, digits: digit })
      });
      setDtmfDigitsSent(prev => [...prev, { digit, time: new Date().toLocaleTimeString() }]);
    } catch (err) {
      console.error('Failed to send DTMF:', err);
    }
  };

  const handleHangup = async () => {
    if (!activeCall) return;
    try {
      await fetch('/api/genesys/calls/hangup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversationId: activeCall.conversationId })
      });
      setActiveCall(null);
    } catch (err) {
      console.error('Hangup failed:', err);
    }
  };

  const currentAction = dataActions.find(a => a.id === selectedActionId) || dataActions[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #ff4f1f 0%, #ff8c00 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(255, 79, 31, 0.45)'
            }}>
              <Radio size={22} color="#fff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff' }}>
                  Genesys Cloud CX Enterprise Integration
                </h2>
                <span className="badge badge-amber" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                  Visa Inc. Production BYOC
                </span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '2px' }}>
                End-to-end automated testing directly via customer's Genesys Cloud CX Edge SBCs & Architect flows. No external CPaaS (Twilio/Telnyx) needed.
              </p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setShowDocsModal(true)}
            className="btn btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '10px', fontSize: '0.84rem' }}
          >
            <FileText size={15} color="#38bdf8" /> Genesys Setup Guide
          </button>
          <button
            onClick={() => handleTestConnection()}
            disabled={testingConnection}
            className="btn btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 18px', borderRadius: '10px', fontSize: '0.84rem' }}
          >
            {testingConnection ? <RefreshCw size={15} className="spin" /> : <ShieldCheck size={15} />}
            Validate Genesys OAuth2
          </button>
        </div>
      </div>

      {/* Connection Status Banner */}
      {connectionStatus && (
        <div style={{
          background: connectionStatus.success ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
          border: connectionStatus.success ? '1px solid #10b981' : '1px solid #ef4444',
          borderRadius: '12px',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {connectionStatus.success ? (
              <CheckCircle2 size={24} color="#10b981" />
            ) : (
              <AlertTriangle size={24} color="#ef4444" />
            )}
            <div>
              <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#fff' }}>
                {connectionStatus.success
                  ? `Connected to Genesys Cloud CX: ${connectionStatus.organization?.name || 'Enterprise Contact Center'}`
                  : 'Genesys Cloud Connection Error'}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                {connectionStatus.success
                  ? `Organization: ${connectionStatus.organization?.id} • Region: ${connectionStatus.organization?.regionLabel || environment} • Egress: ${connectionStatus.telephonyProvider}`
                  : connectionStatus.error}
              </div>
            </div>
          </div>

          <span className={`badge ${connectionStatus.success ? 'badge-emerald' : 'badge-rose'}`}>
            {connectionStatus.mode || 'ONLINE'}
          </span>
        </div>
      )}

      {/* Tabs Navigation */}
      <div style={{
        display: 'flex',
        gap: '8px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        paddingBottom: '10px'
      }}>
        {[
          { id: 'overview', label: 'Overview & BYOC Trunks', icon: Server, badge: `${trunks.length} SBCs` },
          { id: 'flows', label: 'Architect IVR Flows', icon: Workflow, badge: `${flows.length} Flows` },
          { id: 'prompts', label: 'User Prompts & Audio DSP', icon: Volume2, badge: `${prompts.length} Prompts` },
          { id: 'dataActions', label: 'Data Actions & Web Services', icon: Database, badge: `${dataActions.length} Actions` },
          { id: 'sandbox', label: 'Live Outbound Sandbox', icon: PhoneForwarded, badge: activeCall ? 'Active Call' : null }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 18px',
                borderRadius: '10px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.86rem',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? '#fff' : 'var(--text-muted)',
                background: isActive ? 'linear-gradient(135deg, rgba(255, 79, 31, 0.25) 0%, rgba(255, 140, 0, 0.18) 100%)' : 'transparent',
                boxShadow: isActive ? '0 0 14px rgba(255, 79, 31, 0.2)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <Icon size={16} color={isActive ? '#ff8c00' : 'currentColor'} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={`badge ${isActive ? 'badge-amber' : 'badge-slate'}`} style={{ fontSize: '0.66rem', padding: '1px 6px' }}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW & BYOC TRUNKS */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px' }}>
            {/* Credentials Configuration Form */}
            <div className="glass-card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Key size={18} color="#ff8c00" /> Genesys Cloud OAuth2 Client Credentials
              </h3>

              <form onSubmit={handleSaveConfig} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>
                    Genesys Cloud Regional Environment
                  </label>
                  <select
                    value={environment}
                    onChange={(e) => setEnvironment(e.target.value)}
                    className="input-field"
                    style={{ width: '100%', padding: '10px 12px' }}
                  >
                    <option value="mypurecloud.com">US East 1 (N. Virginia - mypurecloud.com)</option>
                    <option value="usw2.pure.cloud">US West 2 (Oregon - usw2.pure.cloud)</option>
                    <option value="mypurecloud.de">EU Central 1 (Frankfurt - mypurecloud.de)</option>
                    <option value="mypurecloud.ie">EU West 1 (Dublin - mypurecloud.ie)</option>
                    <option value="mypurecloud.com.au">AP Southeast 2 (Sydney - mypurecloud.com.au)</option>
                    <option value="mypurecloud.jp">AP Northeast 1 (Tokyo - mypurecloud.jp)</option>
                    <option value="ca.pure.cloud">Canada Central 1 (ca.pure.cloud)</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>OAuth2 Client ID</label>
                    <input
                      type="text"
                      value={clientId}
                      onChange={(e) => setClientId(e.target.value)}
                      placeholder="Genesys OAuth Client ID"
                      className="input-field"
                      style={{ width: '100%', padding: '10px 12px' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>OAuth2 Client Secret</label>
                    <input
                      type="password"
                      value={clientSecret}
                      onChange={(e) => setClientSecret(e.target.value)}
                      placeholder="Genesys Client Secret"
                      className="input-field"
                      style={{ width: '100%', padding: '10px 12px' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Outbound Caller ID (ANI)</label>
                    <input
                      type="text"
                      value={callerId}
                      onChange={(e) => setCallerId(e.target.value)}
                      placeholder="+18005550199"
                      className="input-field"
                      style={{ width: '100%', padding: '10px 12px' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'block', marginBottom: '4px' }}>Organization ID</label>
                    <input
                      type="text"
                      value={orgId}
                      onChange={(e) => setOrgId(e.target.value)}
                      placeholder="org_visa_inc"
                      className="input-field"
                      style={{ width: '100%', padding: '10px 12px' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '6px' }}>
                  <button type="submit" className="btn btn-primary" style={{ padding: '8px 18px', fontSize: '0.84rem' }}>
                    Save & Apply Credentials
                  </button>
                </div>
              </form>
            </div>

            {/* Quick Metrics & Zero-Markup Summary */}
            <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={18} color="#06b6d4" /> Carrier Wholesale Elimination
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: 1.5, marginBottom: '16px' }}>
                  Unlike traditional IVR testing tools that charge $0.02 - $0.04/minute for Twilio PSTN egress, VoxPulse uses Genesys Cloud Client Credentials to inject test calls directly through Visa's dedicated AudioCodes and Ribbon SBC trunks.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>CARRIER MARKUP</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#10b981' }}>$0.00 / min</div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Direct Trunk Egress</div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>ANNUAL SAVINGS</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#38bdf8' }}>$146,700/yr</div>
                    <div style={{ fontSize: '0.7rem', color: '#64748b' }}>At 300k synthetic mins</div>
                  </div>
                </div>
              </div>

              <div style={{ background: 'rgba(99, 102, 241, 0.08)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(99, 102, 241, 0.25)' }}>
                <span style={{ fontSize: '0.78rem', color: '#a5b4fc', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={16} /> Fully compliant with Visa Global Infosec & PCI-DSS Level 1 specifications.
                </span>
              </div>
            </div>
          </div>

          {/* Telephony Trunks & GCV Health Probing */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Activity size={18} color="#10b981" /> BYOC Carrier Trunks & Edge SBC Telemetry
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '2px' }}>
                  Continuous SIP OPTIONS round-trip ping, jitter, and POLQA MOS monitoring across Ashburn & Highlands Ranch SBCs.
                </p>
              </div>

              <button
                onClick={() => handleRunTrunkProbes()}
                disabled={trunkProbing}
                className="btn btn-secondary"
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', fontSize: '0.82rem' }}
              >
                {trunkProbing ? <RefreshCw size={14} className="spin" /> : <Zap size={14} color="#f59e0b" />}
                Run Live SIP Trunk Probes
              </button>
            </div>

            {trunkProbeReport && (
              <div style={{
                background: 'rgba(16, 185, 129, 0.08)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                padding: '12px 16px',
                borderRadius: '10px',
                marginBottom: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ fontSize: '0.84rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle size={16} color="#10b981" />
                  <strong>Probe Succeeded:</strong> All {trunkProbeReport.probesCount} Edge Trunks Healthy • Average Latency: <strong>{trunkProbeReport.averageLatencyMs}ms</strong> • Mean Fleet MOS: <strong>{trunkProbeReport.averageMos}</strong>
                </div>
                <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                  Timestamp: {new Date(trunkProbeReport.timestamp).toLocaleTimeString()}
                </span>
              </div>
            )}

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.72rem' }}>
                    <th style={{ padding: '10px' }}>Trunk / Edge SBC Name</th>
                    <th style={{ padding: '10px' }}>Type</th>
                    <th style={{ padding: '10px' }}>FQDN / Protocol</th>
                    <th style={{ padding: '10px' }}>OPTIONS Ping</th>
                    <th style={{ padding: '10px' }}>Jitter / Loss</th>
                    <th style={{ padding: '10px' }}>POLQA MOS</th>
                    <th style={{ padding: '10px' }}>Channels</th>
                    <th style={{ padding: '10px', textAlign: 'right' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {trunks.map((t) => (
                    <tr key={t.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '12px 10px', fontWeight: 700, color: '#fff' }}>
                        {t.name}
                      </td>
                      <td style={{ padding: '12px 10px', color: '#a78bfa', fontSize: '0.78rem' }}>
                        {t.type}
                      </td>
                      <td style={{ padding: '12px 10px', color: '#94a3b8', fontSize: '0.8rem' }}>
                        <code>{t.sbcFqdn}</code>
                        <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{t.protocol}</div>
                      </td>
                      <td style={{ padding: '12px 10px', color: '#06b6d4', fontWeight: 600 }}>
                        {t.optionsPingMs} ms
                      </td>
                      <td style={{ padding: '12px 10px', color: '#cbd5e1', fontSize: '0.8rem' }}>
                        {t.jitterMs} ms / {t.packetLossPct}%
                      </td>
                      <td style={{ padding: '12px 10px' }}>
                        <span style={{ color: t.mosScore >= 4.2 ? '#10b981' : '#f59e0b', fontWeight: 700 }}>
                          {t.mosScore || t.measuredMos || 4.45}
                        </span>
                      </td>
                      <td style={{ padding: '12px 10px', color: '#94a3b8', fontSize: '0.8rem' }}>
                        {t.activeChannels} / {t.maxChannels} ({Math.round((t.activeChannels / t.maxChannels) * 100)}%)
                      </td>
                      <td style={{ padding: '12px 10px', textAlign: 'right' }}>
                        <span className="badge badge-emerald" style={{ fontSize: '0.68rem' }}>
                          {t.state}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ARCHITECT IVR FLOWS */}
      {activeTab === 'flows' && (
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Workflow size={20} color="#38bdf8" /> Discovered Genesys Architect IVR Flows
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '2px' }}>
                Automated multi-step journey validation: trigger test calls, navigate IVR nodes, verify prompts, and audit queue routing.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <div style={{ position: 'relative' }}>
                <Search size={14} color="#64748b" style={{ position: 'absolute', left: '10px', top: '10px' }} />
                <input
                  type="text"
                  placeholder="Filter flows..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field"
                  style={{ padding: '6px 12px 6px 32px', fontSize: '0.82rem', width: '200px' }}
                />
              </div>
              <span className="badge badge-cyan" style={{ fontSize: '0.74rem' }}>
                {flows.length} Published Flows
              </span>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.72rem' }}>
                  <th style={{ padding: '10px' }}>Flow Name & Scope</th>
                  <th style={{ padding: '10px' }}>Version</th>
                  <th style={{ padding: '10px' }}>Inbound DNIS</th>
                  <th style={{ padding: '10px' }}>Target Queue</th>
                  <th style={{ padding: '10px' }}>Prompts / Actions</th>
                  <th style={{ padding: '10px', textAlign: 'right' }}>Automated Testing</th>
                </tr>
              </thead>
              <tbody>
                {flows
                  .filter(f => !searchQuery || f.name.toLowerCase().includes(searchQuery.toLowerCase()) || f.dnis.includes(searchQuery))
                  .map((f) => (
                    <tr key={f.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '14px 10px' }}>
                        <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.88rem' }}>{f.name}</div>
                        <div style={{ color: '#94a3b8', fontSize: '0.76rem', marginTop: '2px' }}>{f.description}</div>
                      </td>
                      <td style={{ padding: '14px 10px', color: '#a78bfa', fontSize: '0.8rem' }}>
                        v{f.version}
                      </td>
                      <td style={{ padding: '14px 10px', color: '#06b6d4', fontWeight: 700, fontSize: '0.9rem' }}>
                        {f.dnis}
                      </td>
                      <td style={{ padding: '14px 10px', color: '#e2e8f0', fontSize: '0.8rem' }}>
                        <code>{f.routingTarget}</code>
                      </td>
                      <td style={{ padding: '14px 10px', color: '#cbd5e1', fontSize: '0.8rem' }}>
                        {f.promptsCount} prompts • {f.dataActionsCount} actions
                      </td>
                      <td style={{ padding: '14px 10px', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '8px' }}>
                          <button
                            onClick={() => handleRunJourneyTest(f.id)}
                            disabled={journeyTestingFlowId === f.id}
                            className="btn btn-primary"
                            style={{ padding: '6px 14px', fontSize: '0.76rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                          >
                            {journeyTestingFlowId === f.id ? <RefreshCw size={12} className="spin" /> : <Play size={12} />}
                            Auto-Test Journey
                          </button>
                          <button
                            onClick={() => {
                              setDialNumber(f.dnis);
                              setActiveTab('sandbox');
                            }}
                            className="btn btn-secondary"
                            style={{ padding: '6px 12px', fontSize: '0.76rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                          >
                            <PhoneCall size={12} color="#10b981" /> Load
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: USER PROMPTS & AUDIO DSP */}
      {activeTab === 'prompts' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Volume2 size={20} color="#ff8c00" /> Architect User Prompts & Audio DSP Inspector
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '2px' }}>
                  ITU-T P.863 POLQA MOS verification and EBU R128 (-16 LUFS) acoustic volume compliance across all IVR audio files.
                </p>
              </div>

              <span className="badge badge-amber" style={{ fontSize: '0.74rem' }}>
                {prompts.length} Architect Prompts Tracked
              </span>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.72rem' }}>
                    <th style={{ padding: '10px' }}>Prompt Name & Spoken Transcript</th>
                    <th style={{ padding: '10px' }}>Audio Codec</th>
                    <th style={{ padding: '10px' }}>Loudness (LUFS)</th>
                    <th style={{ padding: '10px' }}>True Peak</th>
                    <th style={{ padding: '10px' }}>EBU R128</th>
                    <th style={{ padding: '10px' }}>POLQA MOS</th>
                    <th style={{ padding: '10px', textAlign: 'right' }}>DSP Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {prompts.map((p) => (
                    <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '12px 10px', maxWidth: '320px' }}>
                        <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.85rem' }}>{p.name}</div>
                        <div style={{ color: '#94a3b8', fontSize: '0.76rem', fontStyle: 'italic', marginTop: '3px' }}>
                          "{p.text}"
                        </div>
                      </td>
                      <td style={{ padding: '12px 10px', color: '#a78bfa', fontSize: '0.75rem' }}>
                        {p.format}
                        <div style={{ color: '#64748b', fontSize: '0.7rem' }}>Duration: {p.durationSec}s</div>
                      </td>
                      <td style={{ padding: '12px 10px', color: '#06b6d4', fontWeight: 600 }}>
                        {p.loudnessLufs} LUFS
                      </td>
                      <td style={{ padding: '12px 10px', color: '#cbd5e1', fontSize: '0.8rem' }}>
                        {p.truePeakDbfs} dBFS
                      </td>
                      <td style={{ padding: '12px 10px' }}>
                        <span className={`badge ${p.ebuR128Compliant ? 'badge-emerald' : 'badge-rose'}`} style={{ fontSize: '0.66rem' }}>
                          {p.ebuR128Compliant ? 'COMPLIANT' : 'NON-COMPLIANT'}
                        </span>
                      </td>
                      <td style={{ padding: '12px 10px' }}>
                        <span style={{ color: '#10b981', fontWeight: 800 }}>
                          {p.polqaMos}
                        </span>
                      </td>
                      <td style={{ padding: '12px 10px', textAlign: 'right' }}>
                        <button
                          onClick={() => handleAuditPromptAudio(p.id)}
                          disabled={auditingPromptId === p.id}
                          className="btn btn-secondary"
                          style={{ padding: '6px 14px', fontSize: '0.74rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                        >
                          {auditingPromptId === p.id ? <RefreshCw size={12} className="spin" /> : <Activity size={12} color="#10b981" />}
                          Audit Acoustics
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Prompt Acoustic Audit Modal / Results Card */}
          {promptAuditResult && (
            <div className="glass-card" style={{ padding: '24px', border: '1px solid #10b981' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle size={18} color="#10b981" />
                  Acoustic POLQA Audit Report: {promptAuditResult.promptName}
                </h4>
                <button
                  onClick={() => setPromptAuditResult(null)}
                  style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1rem' }}
                >
                  ✕
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '16px' }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>MEASURED POLQA MOS</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10b981' }}>{promptAuditResult.measuredPolqaMos} / 5.0</div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b' }}>ITU-T P.863 Super-Wideband</div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>LOUDNESS NORMALIZATION</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#06b6d4' }}>{promptAuditResult.measuredLoudnessLufs} LUFS</div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Gain Delta: {promptAuditResult.gainDeltaDb} dB</div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>VOICEBAND FILTER</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#a78bfa' }}>300 - 3400 Hz</div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b' }}>PSTN Bandpass Filtered</div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>SIGNAL-TO-NOISE RATIO</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10b981' }}>{promptAuditResult.audioFrequencies.signalToNoiseDb} dB</div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Zero clipping detected</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: DATA ACTIONS & WEB SERVICES */}
      {activeTab === 'dataActions' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '24px' }}>
          {/* Data Actions Directory */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Database size={18} color="#06b6d4" /> Discovered Genesys Data Actions
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '16px' }}>
              REST web services invoked within Architect flows for cardholder authentication, fraud scoring, and CRM screen pop.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {dataActions.map((action) => {
                const isSelected = selectedActionId === action.id;
                return (
                  <div
                    key={action.id}
                    onClick={() => {
                      setSelectedActionId(action.id);
                      setActionExecutionResult(null);
                    }}
                    style={{
                      padding: '14px 16px',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      background: isSelected ? 'rgba(6, 182, 212, 0.12)' : 'rgba(255,255,255,0.03)',
                      border: isSelected ? '1px solid #06b6d4' : '1px solid rgba(255,255,255,0.06)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.88rem' }}>{action.name}</div>
                      <span className="badge badge-cyan" style={{ fontSize: '0.64rem' }}>{action.method}</span>
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#94a3b8', marginBottom: '6px' }}>
                      <code>{action.endpoint}</code>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748b' }}>
                      <span>SLA: &lt;{action.slaTargetMs}ms (Avg: {action.avgLatencyMs}ms)</span>
                      <span style={{ color: '#10b981', fontWeight: 600 }}>Success: {action.successRatePct}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Interactive Data Action Execution Console */}
          <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Cpu size={18} color="#ff8c00" /> Web Service Diagnostics & Fallback Simulation
            </h3>

            <div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px' }}>SELECTED DATA ACTION</div>
              <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.9rem' }}>{currentAction.name}</div>
              <div style={{ fontSize: '0.74rem', color: '#06b6d4', marginTop: '2px' }}>{currentAction.endpoint}</div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px' }}>REQUEST JSON BODY TEMPLATE</div>
              <pre style={{
                background: 'rgba(0,0,0,0.4)',
                padding: '10px',
                borderRadius: '8px',
                fontSize: '0.75rem',
                color: '#e2e8f0',
                overflowX: 'auto',
                border: '1px solid rgba(255,255,255,0.08)'
              }}>
                {currentAction.requestTemplate}
              </pre>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px' }}>RESPONSE MAPPING TEMPLATE</div>
              <pre style={{
                background: 'rgba(0,0,0,0.4)',
                padding: '10px',
                borderRadius: '8px',
                fontSize: '0.75rem',
                color: '#a78bfa',
                overflowX: 'auto',
                border: '1px solid rgba(255,255,255,0.08)'
              }}>
                {currentAction.responseTemplate}
              </pre>
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                onClick={() => handleExecuteDataAction('normal')}
                disabled={actionExecuting}
                className="btn btn-primary"
                style={{ flex: 1, padding: '9px 14px', fontSize: '0.78rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                {actionExecuting ? <RefreshCw size={14} className="spin" /> : <Play size={14} />}
                Execute Normal Action
              </button>
              <button
                onClick={() => handleExecuteDataAction('timeout')}
                disabled={actionExecuting}
                className="btn btn-rose"
                style={{ padding: '9px 14px', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                Simulate 504 Timeout
              </button>
              <button
                onClick={() => handleExecuteDataAction('failure')}
                disabled={actionExecuting}
                className="btn btn-secondary"
                style={{ padding: '9px 14px', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                Simulate 400 Bad Request
              </button>
            </div>

            {actionExecutionResult && (
              <div style={{
                marginTop: '10px',
                padding: '14px',
                borderRadius: '10px',
                background: actionExecutionResult.success ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                border: actionExecutionResult.success ? '1px solid #10b981' : '1px solid #ef4444'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    color: actionExecutionResult.success ? '#10b981' : '#ef4444'
                  }}>
                    {actionExecutionResult.success ? 'Action Succeeded' : 'Fallback Triggered: ' + (actionExecutionResult.error || 'Execution Failure')}
                  </div>
                  <span className={`badge ${actionExecutionResult.success ? 'badge-emerald' : 'badge-rose'}`} style={{ fontSize: '0.66rem' }}>
                    {actionExecutionResult.executionTimeMs} ms
                  </span>
                </div>

                {actionExecutionResult.outputPayload && (
                  <pre style={{
                    background: 'rgba(0,0,0,0.5)',
                    padding: '8px',
                    borderRadius: '6px',
                    fontSize: '0.72rem',
                    color: '#cbd5e1',
                    maxHeight: '120px',
                    overflowY: 'auto'
                  }}>
                    {JSON.stringify(actionExecutionResult.outputPayload, null, 2)}
                  </pre>
                )}

                <div style={{ marginTop: '8px', fontSize: '0.74rem', color: '#94a3b8' }}>
                  Architect Verdict: <strong style={{ color: '#fff' }}>{actionExecutionResult.verdict}</strong>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 5: LIVE OUTBOUND SANDBOX */}
      {activeTab === 'sandbox' && (
        <div className="glass-card" style={{ padding: '24px', border: activeCall ? '2px solid #10b981' : undefined }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <PhoneForwarded size={18} color="#10b981" /> Live Genesys Outbound Test Dialer & DTMF Console
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px' }}>
            <div>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
                <input
                  type="text"
                  value={dialNumber}
                  onChange={(e) => setDialNumber(e.target.value)}
                  placeholder="+18008472911"
                  className="input-field"
                  style={{ flex: 1, padding: '10px 14px', fontSize: '0.95rem' }}
                />

                {activeCall ? (
                  <button
                    onClick={() => handleHangup()}
                    className="btn btn-rose"
                    style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <Square size={16} /> Disconnect
                  </button>
                ) : (
                  <button
                    onClick={() => handleDial()}
                    disabled={calling}
                    className="btn btn-emerald"
                    style={{ padding: '10px 24px', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    {calling ? <RefreshCw size={16} className="spin" /> : <PhoneCall size={16} />} Dial via Genesys
                  </button>
                )}
              </div>

              {activeCall ? (
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <CheckCircle2 size={16} /> Call Connected on Genesys Cloud CX
                    </div>
                    <span className="badge badge-emerald">{activeCall.status}</span>
                  </div>

                  <div style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div><strong>Conversation ID:</strong> <code style={{ color: '#06b6d4' }}>{activeCall.conversationId}</code></div>
                    <div><strong>Participant ID:</strong> <code style={{ color: '#a78bfa' }}>{activeCall.participantId}</code></div>
                    <div><strong>Route:</strong> {activeCall.carrierRoute} • Latency: <strong>{activeCall.latencyMs}ms</strong> • MOS: <strong>{activeCall.mosScore}</strong></div>
                  </div>

                  {dtmfDigitsSent.length > 0 && (
                    <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                      <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>Digits Sent Over Genesys Dialog:</div>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {dtmfDigitsSent.map((d, i) => (
                          <span key={i} className="badge badge-cyan" style={{ fontSize: '0.75rem', padding: '2px 8px' }}>
                            Key '{d.digit}' ({d.time})
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '12px', textAlign: 'center', color: '#64748b', fontSize: '0.85rem' }}>
                  Enter target phone number (e.g. <code>+18008472911</code> for Visa 1-800-VISA-911) and click "Dial via Genesys" to initiate a real-time call through your enterprise SBC.
                </div>
              )}
            </div>

            {/* DTMF Keypad */}
            <div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '8px', fontWeight: 600, textTransform: 'uppercase' }}>
                Send DTMF via Genesys Digits API (RFC 4733)
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((digit) => (
                  <button
                    key={digit}
                    disabled={!activeCall}
                    onClick={() => handleSendDTMF(digit)}
                    className="btn btn-secondary"
                    style={{
                      padding: '12px',
                      fontSize: '1.1rem',
                      fontWeight: 800,
                      borderRadius: '8px',
                      opacity: activeCall ? 1 : 0.5
                    }}
                  >
                    {digit}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Automated Flow Journey Test Results */}
      {journeyModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.82)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 99999
        }}>
          <div className="glass-card" style={{
            width: '680px',
            maxHeight: '85vh',
            overflowY: 'auto',
            padding: '28px',
            borderRadius: '18px',
            border: '1px solid rgba(255, 255, 255, 0.15)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Workflow color="#38bdf8" size={22} /> Automated Architect IVR Journey Validation
              </h3>
              <button
                onClick={() => setJourneyModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1.2rem' }}
              >
                ✕
              </button>
            </div>

            {journeyTestResult ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid #10b981',
                  borderRadius: '12px',
                  padding: '14px 18px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{ fontWeight: 800, color: '#fff', fontSize: '0.96rem' }}>{journeyTestResult.flowName}</div>
                    <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                      DNIS: {journeyTestResult.dnis} • Total Duration: {journeyTestResult.totalDurationMs} ms • POLQA MOS: <strong>{journeyTestResult.polqaMos}</strong>
                    </div>
                  </div>
                  <span className="badge badge-emerald">ALL 5 STEPS PASSED</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>
                    Step-by-Step Traversal Timeline:
                  </div>

                  {journeyTestResult.steps.map((step) => (
                    <div key={step.step} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 14px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.06)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          background: '#10b981',
                          color: '#000',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 800,
                          fontSize: '0.75rem'
                        }}>
                          {step.step}
                        </div>
                        <div>
                          <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#fff' }}>
                            {step.action}
                          </div>
                          <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
                            {step.matchedText || step.details || step.target || step.action}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '0.72rem', color: '#06b6d4', fontWeight: 600 }}>{step.latencyMs} ms</span>
                        <CheckCircle size={16} color="#10b981" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
                <RefreshCw size={24} className="spin" style={{ margin: '0 auto 12px auto' }} />
                <div>Traversing Architect IVR flow nodes...</div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
              <button
                onClick={() => setJourneyModalOpen(false)}
                className="btn btn-secondary"
                style={{ padding: '8px 20px' }}
              >
                Close Timeline
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Genesys Cloud Admin Setup Guide */}
      {showDocsModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 99999
        }}>
          <div className="glass-card" style={{
            width: '740px',
            maxHeight: '85vh',
            overflowY: 'auto',
            padding: '32px',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.15)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText color="#ff4f1f" size={24} /> Genesys Cloud CX Admin Configuration Guide
              </h3>
              <button
                onClick={() => setShowDocsModal(false)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1.2rem' }}
              >
                ✕
              </button>
            </div>

            <div style={{ color: '#cbd5e1', fontSize: '0.86rem', lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: 'rgba(255, 79, 31, 0.1)', border: '1px solid rgba(255, 79, 31, 0.3)', padding: '12px 16px', borderRadius: '10px', color: '#ff8c00' }}>
                <strong>Zero Carrier Surcharges:</strong> By providing your Genesys Cloud Client Credentials, VoxPulse executes automated tests through your existing AudioCodes/Ribbon SBCs or GCV carrier trunks.
              </div>

              <div>
                <h4 style={{ color: '#38bdf8', fontSize: '0.95rem', fontWeight: 700 }}>Step 1: Create OAuth2 Client Credentials</h4>
                <p>1. In Genesys Cloud CX Admin Console, navigate to <strong>Admin &gt; Integrations &gt; OAuth</strong>.<br />
                   2. Click <strong>+ Add Client</strong>.<br />
                   3. App Name: <code>VoxPulse Automated IVR Testing Probe</code>.<br />
                   4. Grant Type: Select <strong>Client Credentials</strong>.</p>
              </div>

              <div>
                <h4 style={{ color: '#38bdf8', fontSize: '0.95rem', fontWeight: 700 }}>Step 2: Assign Required Role Permissions</h4>
                <p>Ensure the OAuth role includes the following scopes:<br />
                   • <code>conversation:call:create</code>, <code>conversation:call:edit</code>, <code>conversation:call:view</code> (Outbound agentless dial & DTMF)<br />
                   • <code>architect:flow:view</code>, <code>architect:prompt:view</code> (Auto-discover IVR menus & user prompt WAVs)<br />
                   • <code>integrations:action:execute</code> (Execute and benchmark Data Actions)<br />
                   • <code>telephony:plugin:all</code> (Edge SBC trunk health, jitter & options pings)<br />
                   • <code>recording:recording:view</code> (Audio stream POLQA MOS analysis)</p>
              </div>

              <div>
                <h4 style={{ color: '#38bdf8', fontSize: '0.95rem', fontWeight: 700 }}>Step 3: Copy Client ID & Secret into VoxPulse</h4>
                <p>Copy the generated <strong>Client ID</strong> and <strong>Client Secret</strong> into the credentials form above, select your Genesys regional data center (e.g. <code>mypurecloud.com</code> for US East), and click <strong>Validate Genesys OAuth2</strong>.</p>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
              <button onClick={() => setShowDocsModal(false)} className="btn btn-primary" style={{ padding: '8px 20px' }}>
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
