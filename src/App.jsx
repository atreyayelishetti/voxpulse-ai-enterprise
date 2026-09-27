import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import LiveCallConsole from './components/LiveCallConsole';
import WebRTCSoftphone from './components/WebRTCSoftphone';
import VoicebotStudio from './components/VoicebotStudio';
import VisualCanvasBuilder from './components/VisualCanvasBuilder';
import DIDManager from './components/DIDManager';
import IVRDiscoveryMap from './components/IVRDiscoveryMap';
import EmergencyMonitor from './components/EmergencyMonitor';
import TestSuiteBuilder from './components/TestSuiteBuilder';
import AutomatedRunner from './components/AutomatedRunner';
import LoadTestConsole from './components/LoadTestConsole';
import CarrierHeatmap from './components/CarrierHeatmap';
import CarrierSLAScorecard from './components/CarrierSLAScorecard';
import SIPDiagnostics from './components/SIPDiagnostics';
import ComplianceAuditor from './components/ComplianceAuditor';
import EscalationPolicies from './components/EscalationPolicies';
import GeminiAIStudio from './components/GeminiAIStudio';
import IntegrationsStudio from './components/IntegrationsStudio';
import WorkspaceSettings from './components/WorkspaceSettings';
import KlearcomROI from './components/KlearcomROI';
import AnalyticsReports from './components/AnalyticsReports';
import AudioDegradationStudio from './components/AudioDegradationStudio';
import AIAgentCombatArena from './components/AIAgentCombatArena';
import GlobalProbeOrchestrator from './components/GlobalProbeOrchestrator';
import VoiceBiometricsTester from './components/VoiceBiometricsTester';
import AudioBenchmarkMatrix from './components/AudioBenchmarkMatrix';
import ChaosEngineeringStudio from './components/ChaosEngineeringStudio';
import OmnichannelAgentTester from './components/OmnichannelAgentTester';
import TollFreeBillingAuditor from './components/TollFreeBillingAuditor';
import SentimentComplianceEngine from './components/SentimentComplianceEngine';
import SIPTrunkFailoverTester from './components/SIPTrunkFailoverTester';
import ExportReportStudio from './components/ExportReportStudio';
import GlobalOutageTimeline from './components/GlobalOutageTimeline';
import STTTuningStudio from './components/STTTuningStudio';
import AudioPIIRedactor from './components/AudioPIIRedactor';
import RBACAuditInspector from './components/RBACAuditInspector';
import POLQAAudioAnalyzer from './components/POLQAAudioAnalyzer';
import TLSCertificateAuditor from './components/TLSCertificateAuditor';
import MultiTenantWorkspaceManager from './components/MultiTenantWorkspaceManager';
import SIPRecordingPlayer from './components/SIPRecordingPlayer';
import STTConfusionMatrix from './components/STTConfusionMatrix';
import MultiLanguageTTSVoiceStudio from './components/MultiLanguageTTSVoiceStudio';
import IVRBranchingAnalyticsGraph from './components/IVRBranchingAnalyticsGraph';
import WebHookRetryEngine from './components/WebHookRetryEngine';
import CarrierLATAZoneLookup from './components/CarrierLATAZoneLookup';
import SIPHeaderManipulator from './components/SIPHeaderManipulator';
import CallRecordingSilenceMarker from './components/CallRecordingSilenceMarker';
import RealtimeMOSAlarmThresholds from './components/RealtimeMOSAlarmThresholds';
import KeycloakSSOAuditor from './components/KeycloakSSOAuditor';
import VoiceBotBargeInBenchmark from './components/VoiceBotBargeInBenchmark';
import KlearkomDataImporter from './components/KlearkomDataImporter';
import RTPJitterBufferSimulator from './components/RTPJitterBufferSimulator';
import DTMFPayloadSniffer from './components/DTMFPayloadSniffer';
import SIPRegistrationMonitor from './components/SIPRegistrationMonitor';
import VoIPBandwidthCalculator from './components/VoIPBandwidthCalculator';
import WebRTCICECandidatesInspector from './components/WebRTCICECandidatesInspector';
import AnsweringMachineDetectionStudio from './components/AnsweringMachineDetectionStudio';
import CallCenterQueuePredictor from './components/CallCenterQueuePredictor';
import SIPPrackReliableProvisional from './components/SIPPrackReliableProvisional';
import IVRVoicePromptUploader from './components/IVRVoicePromptUploader';
import TelecomComplianceGDPR from './components/TelecomComplianceGDPR';
import SpeechToTextLatencyRadar from './components/SpeechToTextLatencyRadar';
import SIPSDPCodecNegotiation from './components/SIPSDPCodecNegotiation';
import AIVoicebotBargeInRecovery from './components/AIVoicebotBargeInRecovery';
import EmergencyE911AddressValidator from './components/EmergencyE911AddressValidator';
import CarrierDNISLookup from './components/CarrierDNISLookup';
import SIPMessageBodyParser from './components/SIPMessageBodyParser';
import VoIPMOSMap3D from './components/VoIPMOSMap3D';
import CallCenterAHTOptimizer from './components/CallCenterAHTOptimizer';
import RTPStreamEchoAnalyzer from './components/RTPStreamEchoAnalyzer';
import SIPTrunkBurstingEngine from './components/SIPTrunkBurstingEngine';
import GeminiLLMPromptVersioning from './components/GeminiLLMPromptVersioning';
import TelecomNumberPortingTracker from './components/TelecomNumberPortingTracker';
import SIPReferTransferTester from './components/SIPReferTransferTester';
import IVRAudioVolumeNormalizer from './components/IVRAudioVolumeNormalizer';
import AgentCTIScreenPopLatency from './components/AgentCTIScreenPopLatency';
import SIPAuthenticationDigest from './components/SIPAuthenticationDigest';
import VoicebotIntentFallbacks from './components/VoicebotIntentFallbacks';
import TelephonySubnetWhitelist from './components/TelephonySubnetWhitelist';
import VoiceQualityPOLQASpectrum from './components/VoiceQualityPOLQASpectrum';
import IVRNavigationPathRecorder from './components/IVRNavigationPathRecorder';
import CarrierRouteOptimizationEngine from './components/CarrierRouteOptimizationEngine';
import SIPTimerB3261Inspector from './components/SIPTimerB3261Inspector';
import VoiceBiometricLivenessScore from './components/VoiceBiometricLivenessScore';
import WebRTCDataChannelStats from './components/WebRTCDataChannelStats';
import CallRecordingMetadataTagging from './components/CallRecordingMetadataTagging';
import PSTNCIRCUITStatus from './components/PSTNCIRCUITStatus';
import SIPOutboundProxyRouter from './components/SIPOutboundProxyRouter';
import IVRMenuOptionABTester from './components/IVRMenuOptionABTester';
import VoicebotConfidenceScoreMap from './components/VoicebotConfidenceScoreMap';
import CarrierP50P99LatencyGraph from './components/CarrierP50P99LatencyGraph';
import SIPOptionPingKeepalive from './components/SIPOptionPingKeepalive';
import TelecomTaxSurchargeCalculator from './components/TelecomTaxSurchargeCalculator';
import CallCenterCSATPredictor from './components/CallCenterCSATPredictor';
import VoIPCodecTranscoder from './components/VoIPCodecTranscoder';
import SIPDialogStateTracker from './components/SIPDialogStateTracker';
import IVRMultilingualAutoDetect from './components/IVRMultilingualAutoDetect';
import WebRTCPeerConnectionStats from './components/WebRTCPeerConnectionStats';
import TelecomRegulatorySTIRSHAKEN from './components/TelecomRegulatorySTIRSHAKEN';
import EnterpriseRBACPermissionMatrix from './components/EnterpriseRBACPermissionMatrix';
import KlearcomExecutiveDashboard from './components/KlearcomExecutiveDashboard';
import SyntheticCronScheduler from './components/SyntheticCronScheduler';
import CarrierInterconnectMatrix from './components/CarrierInterconnectMatrix';
import CarrierLCRSavingsCalc from './components/CarrierLCRSavingsCalc';
import ExecutiveSlaPdfExporter from './components/ExecutiveSlaPdfExporter';
import LoginScreen from './components/LoginScreen';
import { LogOut, UserCheck, Shield } from 'lucide-react';

import SaaSHeader from './saas/SaaSHeader';
import SaaSSubscriptionBilling from './saas/SaaSSubscriptionBilling';
import SaaSUsageMetering from './saas/SaaSUsageMetering';
import SaaSTeamManagement from './saas/SaaSTeamManagement';
import SaaSApiKeysWebhooks from './saas/SaaSApiKeysWebhooks';
import SaaSSuperAdminPortal from './saas/SaaSSuperAdminPortal';
import SaaSLandingPage from './saas/SaaSLandingPage';
import SaaSOnboardingWizard from './saas/SaaSOnboardingWizard';
import GenesysCloudIntegration from './saas/GenesysCloudIntegration';
import EnterpriseAuditVault from './saas/EnterpriseAuditVault';
import EnterpriseIncidentCenter from './saas/EnterpriseIncidentCenter';
import MaintenanceWindows from './saas/MaintenanceWindows';
import MultiRegionLatencyRadar from './saas/MultiRegionLatencyRadar';
import CopilotChat from './copilot/CopilotChat';

export default function App({ initialTab } = {}) {

  const [activeTab, setActiveTab] = useState(initialTab || 'console');
  const [systemConfig, setSystemConfig] = useState(null);
  const [currentOrg, setCurrentOrg] = useState(null);
  const [organizations, setOrganizations] = useState([]);
  const [showLandingPage, setShowLandingPage] = useState(false);
  const [showOnboardingWizard, setShowOnboardingWizard] = useState(false);

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('voxpulse_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('voxpulse_token');
  });

  useEffect(() => {
    fetchConfig();
    fetchSaasContext();
  }, []);

  const fetchSaasContext = async () => {
    try {
      const [currRes, listRes] = await Promise.all([
        fetch('/api/saas/organizations/current'),
        fetch('/api/saas/organizations')
      ]);
      const currData = await currRes.json();
      const listData = await listRes.json();
      if (currData.success) setCurrentOrg(currData.organization);
      if (listData.success) setOrganizations(listData.organizations);
    } catch (e) {
      console.warn('Could not fetch SaaS context:', e);
    }
  };

  const handleSwitchOrg = async (orgId) => {
    try {
      const res = await fetch('/api/saas/organizations/switch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orgId })
      });
      const data = await res.json();
      if (data.success) {
        setCurrentOrg(data.organization);
        fetchSaasContext();
      }
    } catch (err) {
      console.error('Failed to switch organization:', err);
    }
  };

  const handleCreateOrg = async (orgPayload) => {
    try {
      const res = await fetch('/api/saas/organizations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orgPayload)
      });
      const data = await res.json();
      if (data.success) {
        setCurrentOrg(data.organization);
        fetchSaasContext();
      }
    } catch (err) {
      console.error('Failed to create organization:', err);
    }
  };

  const fetchConfig = async () => {
    try {
      const res = await fetch('/api/config');
      const data = await res.json();
      setSystemConfig(data);
    } catch (e) {
      console.warn('Could not fetch server config:', e);
      setSystemConfig({
        geminiConfigured: false,
        geminiModel: 'gemini-2.0-flash',
        activeProvider: 'PSTN Simulator (Local)'
      });
    }
  };

  const handleLoginSuccess = (userObj, tokenStr) => {
    setUser(userObj);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('voxpulse_token');
    localStorage.removeItem('voxpulse_user');
    setUser(null);
    setIsAuthenticated(false);
  };

  const handleRunTest = async (testCase) => {
    setActiveTab('console');
    try {
      await fetch('/api/tests/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testCase)
      });
    } catch (err) {
      console.error('Failed to trigger test run:', err);
    }
  };

  if (showLandingPage) {
    return (
      <SaaSLandingPage 
        onEnterApp={() => setShowLandingPage(false)} 
        onStartTrial={() => {
          setShowLandingPage(false);
          setShowOnboardingWizard(true);
        }} 
      />
    );
  }

  if (showOnboardingWizard) {
    return (
      <SaaSOnboardingWizard 
        onComplete={(newOrg) => {
          setShowOnboardingWizard(false);
          if (newOrg) fetchSaasContext();
        }}
        onCancel={() => setShowOnboardingWizard(false)}
      />
    );
  }

  if (!isAuthenticated) {
    return (
      <LoginScreen 
        onLoginSuccess={handleLoginSuccess} 
        systemConfig={systemConfig} 
        onOpenLandingPage={() => setShowLandingPage(true)}
      />
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)', overflowX: 'hidden', width: '100%' }}>
      {/* Sidebar with User Profile & Session Controls */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        systemConfig={systemConfig} 
        user={user}
        onLogout={handleLogout}
        currentOrg={currentOrg}
      />

      {/* Main Content Area */}
      <main style={{
        marginLeft: '270px',
        flex: 1,
        minWidth: 0,
        padding: '32px 40px',
        maxWidth: '1500px',
        width: 'calc(100% - 270px)',
        boxSizing: 'border-box'
      }}>
        {/* Top Header: Enterprise SaaS Organization & Quota Switcher */}
        <SaaSHeader 
          currentOrg={currentOrg} 
          organizations={organizations} 
          onSwitchOrg={handleSwitchOrg} 
          onCreateOrg={handleCreateOrg} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          user={user} 
          onLogout={handleLogout} 
          onOpenLandingPage={() => setShowLandingPage(true)} 
        />

        {/* Dedicated SaaS Management Modules */}
        {activeTab === 'saas-billing' && (
          <SaaSSubscriptionBilling currentOrg={currentOrg} onRefreshOrg={fetchSaasContext} />
        )}

        {activeTab === 'saas-usage' && (
          <SaaSUsageMetering currentOrg={currentOrg} />
        )}

        {activeTab === 'saas-team' && (
          <SaaSTeamManagement currentOrg={currentOrg} />
        )}

        {activeTab === 'saas-developers' && (
          <SaaSApiKeysWebhooks currentOrg={currentOrg} />
        )}

        {activeTab === 'saas-admin' && (
          <SaaSSuperAdminPortal onSwitchTenant={handleSwitchOrg} />
        )}

        {activeTab === 'saas-genesys' && (
          <GenesysCloudIntegration />
        )}

        {activeTab === 'saas-audit' && (
          <EnterpriseAuditVault currentOrg={currentOrg} />
        )}

        {activeTab === 'saas-incidents' && (
          <EnterpriseIncidentCenter currentOrg={currentOrg} />
        )}

        {activeTab === 'saas-maintenance' && (
          <MaintenanceWindows currentOrg={currentOrg} />
        )}

        {activeTab === 'saas-geolatency' && (
          <MultiRegionLatencyRadar currentOrg={currentOrg} />
        )}


        {activeTab === 'console' && (
          <LiveCallConsole 
            systemConfig={systemConfig} 
            triggerTestRun={handleRunTest} 
          />
        )}

        {activeTab === 'softphone' && (
          <WebRTCSoftphone />
        )}

        {activeTab === 'voicebot' && (
          <VoicebotStudio />
        )}

        {activeTab === 'canvas' && (
          <VisualCanvasBuilder 
            onRunTest={handleRunTest} 
          />
        )}

        {activeTab === 'did' && (
          <DIDManager 
            onRunTest={handleRunTest} 
          />
        )}

        {activeTab === 'discovery' && (
          <IVRDiscoveryMap />
        )}

        {activeTab === 'emergency' && (
          <EmergencyMonitor />
        )}

        {activeTab === 'builder' && (
          <TestSuiteBuilder 
            onRunTest={handleRunTest} 
          />
        )}

        {activeTab === 'runner' && (
          <AutomatedRunner 
            onRunTest={handleRunTest} 
          />
        )}

        {activeTab === 'load' && (
          <LoadTestConsole />
        )}

        {activeTab === 'heatmap' && (
          <CarrierHeatmap />
        )}

        {activeTab === 'scorecard' && (
          <CarrierSLAScorecard />
        )}

        {activeTab === 'sip' && (
          <SIPDiagnostics />
        )}

        {activeTab === 'compliance' && (
          <ComplianceAuditor />
        )}

        {activeTab === 'escalation' && (
          <EscalationPolicies />
        )}

        {activeTab === 'gemini' && (
          <GeminiAIStudio 
            systemConfig={systemConfig} 
          />
        )}

        {activeTab === 'integrations' && (
          <IntegrationsStudio />
        )}

        {activeTab === 'settings' && (
          <WorkspaceSettings 
            systemConfig={systemConfig} 
          />
        )}

        {activeTab === 'degradation' && (
          <AudioDegradationStudio />
        )}

        {activeTab === 'combat' && (
          <AIAgentCombatArena />
        )}

        {activeTab === 'probes' && (
          <GlobalProbeOrchestrator />
        )}

        {activeTab === 'biometrics' && (
          <VoiceBiometricsTester />
        )}

        {activeTab === 'benchmarks' && (
          <AudioBenchmarkMatrix />
        )}

        {activeTab === 'chaos' && (
          <ChaosEngineeringStudio />
        )}

        {activeTab === 'omnichannel' && (
          <OmnichannelAgentTester />
        )}

        {activeTab === 'billing' && (
          <TollFreeBillingAuditor />
        )}

        {activeTab === 'sentiment' && (
          <SentimentComplianceEngine />
        )}

        {activeTab === 'failover' && (
          <SIPTrunkFailoverTester />
        )}

        {activeTab === 'exporter' && (
          <ExportReportStudio />
        )}

        {activeTab === 'outages' && (
          <GlobalOutageTimeline />
        )}

        {activeTab === 'tuning' && (
          <STTTuningStudio />
        )}

        {activeTab === 'redactor' && (
          <AudioPIIRedactor />
        )}

        {activeTab === 'rbac' && (
          <RBACAuditInspector />
        )}

        {activeTab === 'polqa' && (
          <POLQAAudioAnalyzer />
        )}

        {activeTab === 'tls' && (
          <TLSCertificateAuditor />
        )}

        {activeTab === 'tenant' && (
          <MultiTenantWorkspaceManager />
        )}

        {activeTab === 'pcap' && (
          <SIPRecordingPlayer />
        )}

        {activeTab === 'confusion' && (
          <STTConfusionMatrix />
        )}

        {activeTab === 'ssml' && (
          <MultiLanguageTTSVoiceStudio />
        )}

        {activeTab === 'branching' && (
          <IVRBranchingAnalyticsGraph />
        )}

        {activeTab === 'webhooks' && (
          <WebHookRetryEngine />
        )}

        {activeTab === 'lata' && (
          <CarrierLATAZoneLookup />
        )}

        {activeTab === 'sipheaders' && (
          <SIPHeaderManipulator />
        )}

        {activeTab === 'silence' && (
          <CallRecordingSilenceMarker />
        )}

        {activeTab === 'mosalarms' && (
          <RealtimeMOSAlarmThresholds />
        )}

        {activeTab === 'ssoauditor' && (
          <KeycloakSSOAuditor />
        )}

        {activeTab === 'bargein' && (
          <VoiceBotBargeInBenchmark />
        )}

        {activeTab === 'importer' && (
          <KlearkomDataImporter />
        )}

        {activeTab === 'jitterbuffer' && (
          <RTPJitterBufferSimulator />
        )}

        {activeTab === 'dtmfsniffer' && (
          <DTMFPayloadSniffer />
        )}

        {activeTab === 'registrar' && (
          <SIPRegistrationMonitor />
        )}

        {activeTab === 'bwcalc' && (
          <VoIPBandwidthCalculator />
        )}

        {activeTab === 'iceinspector' && (
          <WebRTCICECandidatesInspector />
        )}

        {activeTab === 'amd' && (
          <AnsweringMachineDetectionStudio />
        )}

        {activeTab === 'erlang' && (
          <CallCenterQueuePredictor />
        )}

        {activeTab === 'prack' && (
          <SIPPrackReliableProvisional />
        )}

        {activeTab === 'promptconverter' && (
          <IVRVoicePromptUploader />
        )}

        {activeTab === 'gdpr' && (
          <TelecomComplianceGDPR />
        )}

        {activeTab === 'sttradar' && (
          <SpeechToTextLatencyRadar />
        )}

        {activeTab === 'sdp' && (
          <SIPSDPCodecNegotiation />
        )}

        {activeTab === 'bargerecovery' && (
          <AIVoicebotBargeInRecovery />
        )}

        {activeTab === 'e911' && (
          <EmergencyE911AddressValidator />
        )}

        {activeTab === 'dnis' && (
          <CarrierDNISLookup />
        )}

        {activeTab === 'mime' && (
          <SIPMessageBodyParser />
        )}

        {activeTab === 'mos3d' && (
          <VoIPMOSMap3D />
        )}

        {activeTab === 'aht' && (
          <CallCenterAHTOptimizer />
        )}

        {activeTab === 'aec' && (
          <RTPStreamEchoAnalyzer />
        )}

        {activeTab === 'bursting' && (
          <SIPTrunkBurstingEngine />
        )}

        {activeTab === 'promptab' && (
          <GeminiLLMPromptVersioning />
        )}

        {activeTab === 'lnp' && (
          <TelecomNumberPortingTracker />
        )}

        {activeTab === 'refer' && (
          <SIPReferTransferTester />
        )}

        {activeTab === 'lufs' && (
          <IVRAudioVolumeNormalizer />
        )}

        {activeTab === 'screenpop' && (
          <AgentCTIScreenPopLatency />
        )}

        {activeTab === 'digest' && (
          <SIPAuthenticationDigest />
        )}

        {activeTab === 'fallbacks' && (
          <VoicebotIntentFallbacks />
        )}

        {activeTab === 'subnets' && (
          <TelephonySubnetWhitelist />
        )}

        {activeTab === 'fft' && (
          <VoiceQualityPOLQASpectrum />
        )}

        {activeTab === 'replay' && (
          <IVRNavigationPathRecorder />
        )}

        {activeTab === 'lcr' && (
          <CarrierRouteOptimizationEngine />
        )}

        {activeTab === 'siptimers' && (
          <SIPTimerB3261Inspector />
        )}

        {activeTab === 'liveness' && (
          <VoiceBiometricLivenessScore />
        )}

        {activeTab === 'datachannel' && (
          <WebRTCDataChannelStats />
        )}

        {activeTab === 'tagger' && (
          <CallRecordingMetadataTagging />
        )}

        {activeTab === 'prispans' && (
          <PSTNCIRCUITStatus />
        )}

        {activeTab === 'outboundproxy' && (
          <SIPOutboundProxyRouter />
        )}

        {activeTab === 'menuab' && (
          <IVRMenuOptionABTester />
        )}

        {activeTab === 'nluheatmap' && (
          <VoicebotConfidenceScoreMap />
        )}

        {activeTab === 'percentiles' && (
          <CarrierP50P99LatencyGraph />
        )}

        {activeTab === 'optionskeepalive' && (
          <SIPOptionPingKeepalive />
        )}

        {activeTab === 'usftax' && (
          <TelecomTaxSurchargeCalculator />
        )}

        {activeTab === 'csat' && (
          <CallCenterCSATPredictor />
        )}

        {activeTab === 'transcoder' && (
          <VoIPCodecTranscoder />
        )}

        {activeTab === 'dialogs' && (
          <SIPDialogStateTracker />
        )}

        {activeTab === 'langdetect' && (
          <IVRMultilingualAutoDetect />
        )}

        {activeTab === 'peerstats' && (
          <WebRTCPeerConnectionStats />
        )}

        {activeTab === 'stirshaken' && (
          <TelecomRegulatorySTIRSHAKEN />
        )}

        {activeTab === 'permmatrix' && (
          <EnterpriseRBACPermissionMatrix />
        )}

        {activeTab === 'cronscheduler' && (
          <SyntheticCronScheduler />
        )}

        {activeTab === 'carrierinterconnect' && (
          <CarrierInterconnectMatrix />
        )}

        {activeTab === 'lcrsavings' && (
          <CarrierLCRSavingsCalc />
        )}

        {activeTab === 'execpdfexporter' && (
          <ExecutiveSlaPdfExporter />
        )}

        {activeTab === 'dashboard100' && (
          <KlearcomExecutiveDashboard />
        )}

        {activeTab === 'klearcom' && (
          <KlearcomROI />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsReports />
        )}
      </main>

      {/* Floating Copilot AI Telephony Assistant */}
      <CopilotChat
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentOrg={currentOrg}
        user={user}
      />
    </div>
  );
}
