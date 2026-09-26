# 📂 VoxPulse AI - 104 UI Module Directory & API Catalog
> **Document Version:** 1.0.0-enterprise  
> **Classification:** Component Sitemap & API Specification  
> **Target Audience:** Frontend Engineers, QA Leads, System Administrators  

---

## 1. Directory Catalog (104 Enterprise Components)

Below is the complete catalog of all 104 components in `src/components/`:

| Module # | Component File Name | Component ID | Purpose |
| :---: | :--- | :--- | :--- |
| **1** | [`LoginScreen.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/LoginScreen.jsx) | `login` | Keycloak OIDC SSO login modal (`admin` / `password`) |
| **2** | [`Sidebar.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/Sidebar.jsx) | `sidebar` | 104-tab glassmorphic navigation sidebar |
| **3** | [`LiveCallConsole.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/LiveCallConsole.jsx) | `console` | Live softphone & real-time audio waveform stream |
| **4** | [`WebRTCSoftphone.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/WebRTCSoftphone.jsx) | `softphone` | Browser mic WebRTC softphone dialer |
| **5** | [`VoicebotStudio.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/VoicebotStudio.jsx) | `voicebot` | Voicebot AI NLU studio (Dialogflow & Gemini) |
| **6** | [`VisualCanvasBuilder.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/VisualCanvasBuilder.jsx) | `canvas` | No-code drag-and-drop IVR test builder |
| **7** | [`DIDManager.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/DIDManager.jsx) | `did` | Global 100+ DID phone pool manager |
| **8** | [`IVRDiscoveryMap.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/IVRDiscoveryMap.jsx) | `discovery` | AI IVR auto-discovery tree crawler |
| **9** | [`EmergencyMonitor.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/EmergencyMonitor.jsx) | `emergency` | 24/7 E911 emergency outage monitor |
| **10** | [`SyntheticCronScheduler.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/SyntheticCronScheduler.jsx) | `cronscheduler` | 24/7 automated synthetic cron scheduler |
| **11** | [`CarrierInterconnectMatrix.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/CarrierInterconnectMatrix.jsx) | `carrierinterconnect` | Tier-1 carrier interconnect POP latency matrix |
| **12** | [`CarrierLCRSavingsCalc.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/CarrierLCRSavingsCalc.jsx) | `lcrsavings` | Klearcom ROI & LCR cost savings calculator |
| **13** | [`ExecutiveSlaPdfExporter.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/ExecutiveSlaPdfExporter.jsx) | `execpdfexporter` | Board-ready PDF report exporter |
| **14** | [`TestSuiteBuilder.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/TestSuiteBuilder.jsx) | `builder` | Test flow drag-and-drop step editor |
| **15** | [`AutomatedRunner.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/AutomatedRunner.jsx) | `runner` | Bulk test suite runner |
| **16** | [`LoadTestConsole.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/LoadTestConsole.jsx) | `load` | PSTN load & stress test generator |
| **17** | [`CarrierHeatmap.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/CarrierHeatmap.jsx) | `heatmap` | Global PSTN carrier latency heatmap |
| **18** | [`CarrierSLAScorecard.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/CarrierSLAScorecard.jsx) | `scorecard` | Carrier SLA availability scorecard |
| **19** | [`SIPDiagnostics.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/SIPDiagnostics.jsx) | `sip` | SIP 180/183/200 OK header analyzer |
| **20** | [`ComplianceAuditor.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/ComplianceAuditor.jsx) | `compliance` | PCI-DSS & HIPAA compliance auditor |
| **21** | [`EscalationPolicies.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/EscalationPolicies.jsx) | `escalation` | Incident escalation policy engine |
| **22** | [`GeminiAIStudio.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/GeminiAIStudio.jsx) | `gemini` | Google Gemini 2.5 Flash prompt playground |
| **23** | [`IntegrationsStudio.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/IntegrationsStudio.jsx) | `integrations` | Slack, PagerDuty, ServiceNow webhook manager |
| **24** | [`WorkspaceSettings.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/WorkspaceSettings.jsx) | `settings` | System environment settings |
| **25** | [`AudioDegradationStudio.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/AudioDegradationStudio.jsx) | `degradation` | Audio noise & codec jitter simulator |
| **26** | [`AIAgentCombatArena.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/AIAgentCombatArena.jsx) | `combat` | AI Bot combat arena (Voicebot vs IVR) |
| **27** | [`GlobalProbeOrchestrator.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/GlobalProbeOrchestrator.jsx) | `probes` | Global probe node orchestrator |
| **28** | [`VoiceBiometricsTester.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/VoiceBiometricsTester.jsx) | `biometrics` | Voice biometrics & anti-spoofing tester |
| **29** | [`AudioBenchmarkMatrix.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/AudioBenchmarkMatrix.jsx) | `benchmarks` | Multi-engine STT accuracy benchmark |
| **30** | [`ChaosEngineeringStudio.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/ChaosEngineeringStudio.jsx) | `chaos` | IVR chaos & fault injection engine |
| **31** | [`OmnichannelAgentTester.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/OmnichannelAgentTester.jsx) | `omnichannel` | Voice & SMS omnichannel agent tester |
| **32** | [`TollFreeBillingAuditor.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/TollFreeBillingAuditor.jsx) | `billing` | Toll-free rate card billing auditor |
| **33** | [`SentimentComplianceEngine.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/SentimentComplianceEngine.jsx) | `sentiment` | Gemini AI sentiment & legal compliance |
| **34** | [`SIPTrunkFailoverTester.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/SIPTrunkFailoverTester.jsx) | `failover` | Primary/Secondary SBC failover tester |
| **35** | [`ExportReportStudio.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/ExportReportStudio.jsx) | `exporter` | HTML & CSV export report studio |
| **36** | [`GlobalOutageTimeline.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/GlobalOutageTimeline.jsx) | `outages` | Realtime global outage ticker map |
| **37** | [`STTTuningStudio.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/STTTuningStudio.jsx) | `tuning` | Custom acoustic vocabulary tuner |
| **38** | [`AudioPIIRedactor.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/AudioPIIRedactor.jsx) | `redactor` | Spoken audio PII redactor |
| **39** | [`RBACAuditInspector.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/RBACAuditInspector.jsx) | `rbac` | Keycloak RBAC role inspector |
| **40** | [`POLQAAudioAnalyzer.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/POLQAAudioAnalyzer.jsx) | `polqa` | POLQA & PESQ audio analyzer |
| **41** | [`TLSCertificateAuditor.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/TLSCertificateAuditor.jsx) | `tls` | SIP TLS 1.3 certificate auditor |
| **42** | [`MultiTenantWorkspaceManager.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/MultiTenantWorkspaceManager.jsx) | `tenant` | Multi-tenant workspace quota manager |
| **43** | [`SIPRecordingPlayer.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/SIPRecordingPlayer.jsx) | `pcap` | SIP PCAP packet trace player |
| **44** | [`STTConfusionMatrix.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/STTConfusionMatrix.jsx) | `confusion` | Phoneme error confusion matrix |
| **45** | [`MultiLanguageTTSVoiceStudio.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/MultiLanguageTTSVoiceStudio.jsx) | `ssml` | Neural SSML voice studio |
| **46** | [`IVRBranchingAnalyticsGraph.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/IVRBranchingAnalyticsGraph.jsx) | `branching` | IVR menu drop-off analytics graph |
| **47** | [`WebHookRetryEngine.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/WebHookRetryEngine.jsx) | `webhooks` | Webhook retry & DLQ queue engine |
| **48** | [`CarrierLATAZoneLookup.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/CarrierLATAZoneLookup.jsx) | `lata` | NANPA LATA & OCN exchange database |
| **49** | [`SIPHeaderManipulator.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/SIPHeaderManipulator.jsx) | `sipheaders` | SIP INVITE custom header manipulator |
| **50** | [`CallRecordingSilenceMarker.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/CallRecordingSilenceMarker.jsx) | `silence` | Dead air silence gap marker |
| **51** | [`RealtimeMOSAlarmThresholds.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/RealtimeMOSAlarmThresholds.jsx) | `mosalarms` | Real-time MOS alarm threshold monitor |
| **52** | [`KeycloakSSOAuditor.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/KeycloakSSOAuditor.jsx) | `ssoauditor` | SAML & PKCE auth log auditor |
| **53** | [`VoiceBotBargeInBenchmark.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/VoiceBotBargeInBenchmark.jsx) | `bargein` | Voicebot barge-in mute latency benchmark |
| **54** | [`KlearkomDataImporter.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/KlearkomDataImporter.jsx) | `importer` | 1-Click Klearcom JSON data importer |
| **55** | [`RTPJitterBufferSimulator.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/RTPJitterBufferSimulator.jsx) | `jitterbuffer` | Adaptive RTP jitter buffer simulator |
| **56** | [`DTMFPayloadSniffer.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/DTMFPayloadSniffer.jsx) | `dtmfsniffer` | RFC 4733 PT-101 DTMF sniffer |
| **57** | [`SIPRegistrationMonitor.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/SIPRegistrationMonitor.jsx) | `registrar` | SIP AOR registrar monitor |
| **58** | [`VoIPBandwidthCalculator.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/VoIPBandwidthCalculator.jsx) | `bwcalc` | Mbps codec bandwidth calculator |
| **59** | [`WebRTCICECandidatesInspector.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/WebRTCICECandidatesInspector.jsx) | `iceinspector` | WebRTC STUN/TURN ICE candidate inspector |
| **60** | [`AnsweringMachineDetectionStudio.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/AnsweringMachineDetectionStudio.jsx) | `amd` | Answering machine detection (AMD) studio |
| **61** | [`CallCenterQueuePredictor.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/CallCenterQueuePredictor.jsx) | `erlang` | Erlang C queue SLA predictor |
| **62** | [`SIPPrackReliableProvisional.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/SIPPrackReliableProvisional.jsx) | `prack` | SIP RFC 3262 PRACK 100rel tester |
| **63** | [`IVRVoicePromptUploader.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/IVRVoicePromptUploader.jsx) | `promptconverter` | Voice prompt G.711u transcoder |
| **64** | [`TelecomComplianceGDPR.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/TelecomComplianceGDPR.jsx) | `gdpr` | GDPR 30-day data retention manager |
| **65** | [`SpeechToTextLatencyRadar.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/SpeechToTextLatencyRadar.jsx) | `sttradar` | Time-to-first-token (TTFT) STT radar |
| **66** | [`SIPSDPCodecNegotiation.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/SIPSDPCodecNegotiation.jsx) | `sdp` | SDP codec negotiator |
| **67** | [`AIVoicebotBargeInRecovery.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/AIVoicebotBargeInRecovery.jsx) | `bargerecovery` | Barge-in context recovery switcher |
| **68** | [`EmergencyE911AddressValidator.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/EmergencyE911AddressValidator.jsx) | `e911` | Kari Law E911 address validator |
| **69** | [`CarrierDNISLookup.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/CarrierDNISLookup.jsx) | `dnis` | DNIS trunk routing lookup |
| **70** | [`SIPMessageBodyParser.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/SIPMessageBodyParser.jsx) | `mime` | SIP MIME body & ISUP parser |
| **71** | [`VoIPMOSMap3D.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/VoIPMOSMap3D.jsx) | `mos3d` | Spatial 3D global MOS map |
| **72** | [`CallCenterAHTOptimizer.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/CallCenterAHTOptimizer.jsx) | `aht` | Gemini AI average handle time optimizer |
| **73** | [`RTPStreamEchoAnalyzer.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/RTPStreamEchoAnalyzer.jsx) | `aec` | Acoustic echo cancellation (AEC) analyzer |
| **74** | [`SIPTrunkBurstingEngine.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/SIPTrunkBurstingEngine.jsx) | `bursting` | SIP trunk bursting & surge engine |
| **75** | [`GeminiLLMPromptVersioning.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/GeminiLLMPromptVersioning.jsx) | `promptab` | Gemini system prompt A/B versioner |
| **76** | [`TelecomNumberPortingTracker.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/TelecomNumberPortingTracker.jsx) | `lnp` | LNP FOC number porting order tracker |
| **77** | [`SIPReferTransferTester.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/SIPReferTransferTester.jsx) | `refer` | SIP RFC 3515 REFER call transfer tester |
| **78** | [`IVRAudioVolumeNormalizer.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/IVRAudioVolumeNormalizer.jsx) | `lufs` | EBU R128 LUFS volume normalizer |
| **79** | [`AgentCTIScreenPopLatency.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/AgentCTIScreenPopLatency.jsx) | `screenpop` | CTI CAD screen pop latency meter |
| **80** | [`SIPAuthenticationDigest.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/SIPAuthenticationDigest.jsx) | `digest` | SIP 401 Digest Auth SHA-256 validator |
| **81** | [`VoicebotIntentFallbacks.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/VoicebotIntentFallbacks.jsx) | `fallbacks` | Voicebot intent fallback strategy manager |
| **82** | [`TelephonySubnetWhitelist.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/TelephonySubnetWhitelist.jsx) | `subnets` | Carrier IP subnet iptables manager |
| **83** | [`VoiceQualityPOLQASpectrum.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/VoiceQualityPOLQASpectrum.jsx) | `fft` | FFT 2048 audio spectrum analyzer |
| **84** | [`IVRNavigationPathRecorder.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/IVRNavigationPathRecorder.jsx) | `replay` | IVR session replay path inspector |
| **85** | [`CarrierRouteOptimizationEngine.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/CarrierRouteOptimizationEngine.jsx) | `lcr` | PSTN LCR route optimization engine |
| **86** | [`SIPTimerB3261Inspector.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/SIPTimerB3261Inspector.jsx) | `siptimers` | SIP RFC 3261 Timers (T1/T2/A/B) inspector |
| **87** | [`VoiceBiometricLivenessScore.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/VoiceBiometricLivenessScore.jsx) | `liveness` | Voice biometric liveness spoof checker |
| **88** | [`WebRTCDataChannelStats.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/WebRTCDataChannelStats.jsx) | `datachannel` | SCTP RTCDataChannel stats inspector |
| **89** | [`CallRecordingMetadataTagging.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/CallRecordingMetadataTagging.jsx) | `tagger` | Call metadata tagging studio |
| **90** | [`PSTNCIRCUITStatus.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/PSTNCIRCUITStatus.jsx) | `prispans` | T1/E1 PRI circuit span monitor |
| **91** | [`SIPOutboundProxyRouter.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/SIPOutboundProxyRouter.jsx) | `outboundproxy` | Outbound proxy router & SBC proxy |
| **92** | [`IVRMenuOptionABTester.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/IVRMenuOptionABTester.jsx) | `menuab` | IVR menu prompt A/B containment tester |
| **93** | [`VoicebotConfidenceScoreMap.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/VoicebotConfidenceScoreMap.jsx) | `nluheatmap` | NLU intent confidence score map |
| **94** | [`CarrierP50P99LatencyGraph.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/CarrierP50P99LatencyGraph.jsx) | `percentiles` | Carrier P50/P99 latency graph |
| **95** | [`SIPOptionPingKeepalive.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/SIPOptionPingKeepalive.jsx) | `optionskeepalive` | SIP OPTIONS ping 30s keepalive |
| **96** | [`TelecomTaxSurchargeCalculator.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/TelecomTaxSurchargeCalculator.jsx) | `usftax` | USF FCC regulatory tax calculator |
| **97** | [`CallCenterCSATPredictor.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/CallCenterCSATPredictor.jsx) | `csat` | Post-call CSAT AI predictor |
| **98** | [`VoIPCodecTranscoder.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/VoIPCodecTranscoder.jsx) | `transcoder` | G.711u to Opus wideband transcoder |
| **99** | [`SIPDialogStateTracker.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/SIPDialogStateTracker.jsx) | `dialogs` | SIP dialog state machine tracker |
| **100** | [`IVRMultilingualAutoDetect.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/IVRMultilingualAutoDetect.jsx) | `langdetect` | IVR multilingual language auto-detector |
| **101** | [`WebRTCPeerConnectionStats.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/WebRTCPeerConnectionStats.jsx) | `peerstats` | WebRTC PeerConnection stats inspector |
| **102** | [`TelecomRegulatorySTIRSHAKEN.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/TelecomRegulatorySTIRSHAKEN.jsx) | `stirshaken` | STIR/SHAKEN Attestation token inspector |
| **103** | [`EnterpriseRBACPermissionMatrix.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/EnterpriseRBACPermissionMatrix.jsx) | `permmatrix` | RBAC permission matrix inspector |
| **104** | [`KlearcomExecutiveDashboard.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/KlearcomExecutiveDashboard.jsx) | `dashboard100` | Executive summary dashboard |
