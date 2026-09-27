import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  X, 
  ChevronRight, 
  CheckCircle2, 
  Layers, 
  ShieldCheck, 
  Bot, 
  Activity, 
  PhoneCall, 
  DollarSign, 
  Workflow, 
  FileText, 
  Sparkles, 
  ExternalLink,
  Server,
  Zap,
  Flame,
  Radio,
  Building,
  Key,
  Download,
  Sliders,
  Scale
} from 'lucide-react';

export default function UserGuideModal({ isOpen, onClose, onNavigateTab }) {
  const [activeTab, setActiveTab] = useState('catalog'); // 'overview' | 'personas' | 'catalog' | 'visa'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState('ALL');

  // Screen Catalog definition (103 screens + 6 SaaS modules)
  const screens = useMemo(() => [
    // Section 1: Core Voice & Testing Studio
    {
      id: 'console',
      section: 'Core Voice & Testing Studio',
      sectionKey: 'core',
      name: 'Live Call Console',
      badge: 'Realtime',
      summary: 'Real-time telemetry and call monitoring dashboard for active synthetic & inbound voice calls.',
      whenToUse: 'When inspecting live audio streams, observing DTMF tones as they are emitted, and verifying real-time call states.',
      keyMetrics: ['Call Duration', 'Real-Time Packet Loss', 'Jitter (ms)', 'Current MOS Score'],
      typicalAction: 'Select a phone number, click "Initiate Test Call", and watch real-time DTMF tones and audio waveform telemetry.'
    },
    {
      id: 'softphone',
      section: 'Core Voice & Testing Studio',
      sectionKey: 'core',
      name: 'WebRTC Live Softphone',
      badge: 'Browser Mic',
      summary: 'In-browser WebRTC softphone permitting engineers to speak directly to the IVR or listen in real-time.',
      whenToUse: 'When manually verifying IVR audio prompts, testing microphone input, or interacting with conversational voicebots without physical desk phones.',
      keyMetrics: ['WebRTC RTT', 'Opus Audio Codec Bitrate', 'Audio Input Level (dB)'],
      typicalAction: 'Dial any enterprise DID (e.g. +1-800-VISA-911), unmute your browser mic, and speak voice commands directly to the bot.'
    },
    {
      id: 'voicebot',
      section: 'Core Voice & Testing Studio',
      sectionKey: 'core',
      name: 'Voicebot AI Studio',
      badge: 'Dialogflow/Gemini',
      summary: 'Interactive AI voicebot sandbox evaluating conversational turns, barge-in latencies, and intent recognition.',
      whenToUse: 'When tuning conversational IVR agents, testing natural language customer queries, and evaluating intent fallbacks.',
      keyMetrics: ['Barge-In Latency (<400ms target)', 'Intent Match Confidence (%)', 'Turn Latency (ms)'],
      typicalAction: 'Simulate user speech such as "I want to report card fraud", view intent extraction, and check LLM prompt response latency.'
    },
    {
      id: 'canvas',
      section: 'Core Voice & Testing Studio',
      sectionKey: 'core',
      name: 'No-Code Canvas Builder',
      badge: 'Visual',
      summary: 'Drag-and-drop node graph builder for constructing multi-step automated IVR traversal journeys.',
      whenToUse: 'When creating end-to-end regression test scenarios without writing code (e.g., dial -> wait for prompt -> press 1 -> verify speech -> transfer).',
      keyMetrics: ['Node Count', 'Branch Coverage (%)', 'Validation Status'],
      typicalAction: 'Drag a "Dial Number" node, connect it to "Expect Prompt", add a "Send DTMF" branch, and click "Export to Test Suite".'
    },
    {
      id: 'did',
      section: 'Core Voice & Testing Studio',
      sectionKey: 'core',
      name: 'Global DID Pool',
      badge: '100+ DIDs',
      summary: 'Centralized registry of toll-free, local, and international test telephone numbers across 25+ countries.',
      whenToUse: 'When managing enterprise phone inventories, configuring Genesys Cloud BYOC trunks, or verifying inbound carrier routing.',
      keyMetrics: ['Active DIDs Count', 'Carrier Allocation (Telnyx, Twilio, Genesys BYOC)', 'SLA Status'],
      typicalAction: 'Filter numbers by organization (e.g., Visa Inc.), inspect assigned carriers, and trigger instant health pings.'
    },
    {
      id: 'discovery',
      section: 'Core Voice & Testing Studio',
      sectionKey: 'core',
      name: 'IVR Tree Discovery',
      badge: 'AI Crawler',
      summary: 'Autonomous AI crawler that calls any phone number, listens to audio prompts, and dynamically maps the entire IVR tree.',
      whenToUse: 'When onboarding legacy IVRs with missing architecture diagrams or auditing undocumented menus.',
      keyMetrics: ['Nodes Discovered', 'Max Depth Reached', 'Audio Prompts Transcribed'],
      typicalAction: 'Input a customer service DID, configure max crawl depth (e.g. 3 levels), and let the AI crawler map every menu option.'
    },
    {
      id: 'branching',
      section: 'Core Voice & Testing Studio',
      sectionKey: 'core',
      name: 'IVR Drop-off Graph',
      badge: 'Heatmap',
      summary: 'Visual flow diagram showing customer drop-offs and test failure bottlenecks across IVR menu branches.',
      whenToUse: 'When diagnosing why callers abandon specific queues or identifying broken menu options.',
      keyMetrics: ['Drop-off Rate (%)', 'Average Queue Dwell Time', 'Abandonment Count'],
      typicalAction: 'Review high-drop nodes highlighted in red, inspect user utterance failures, and trigger targeted regression tests.'
    },
    {
      id: 'replay',
      section: 'Core Voice & Testing Studio',
      sectionKey: 'core',
      name: 'IVR Session Replay Path',
      badge: 'DTMF Path',
      summary: 'Interactive breadcrumb timeline replaying the exact path, DTMF tones, and audio prompts of any historic call.',
      whenToUse: 'When investigating customer escalation tickets or debugging a failed automated test run.',
      keyMetrics: ['Step-by-Step Dwell Times', 'DTMF Digit Timing (ms)', 'Prompt Match Accuracy'],
      typicalAction: 'Click a historical call session, click "Play Path", and step through each menu decision made during the call.'
    },

    // Section 2: Automation, Load & Stress Engine
    {
      id: 'builder',
      section: 'Automation, Load & Stress Engine',
      sectionKey: 'automation',
      name: 'Test Flow Builder',
      badge: 'YAML / JSON',
      summary: 'Structured test suite authoring interface for defining test assertions, regex audio checks, and SLA thresholds.',
      whenToUse: 'When creating repeatable QA test cases for CI/CD pipelines (e.g., card activation, emergency routing, PIN reset).',
      keyMetrics: ['Total Test Suites', 'Assertion Rules', 'Expected Audio Matches'],
      typicalAction: 'Select a Visa test preset (e.g. "Visa Card Activation Flow"), customize expected prompts, and save to active suites.'
    },
    {
      id: 'runner',
      section: 'Automation, Load & Stress Engine',
      sectionKey: 'automation',
      name: 'Automated Runner',
      badge: 'Continuous',
      summary: 'Batch execution engine running automated test suites sequentially or concurrently with instant pass/fail telemetry.',
      whenToUse: 'During scheduled smoke tests, post-deployment sanity checks, or on-demand regression runs.',
      keyMetrics: ['Pass Rate (%)', 'Execution Duration (s)', 'Failed Step Log'],
      typicalAction: 'Select suites to execute, click "Run All Automated Tests", and monitor real-time test progress and root-cause logs.'
    },
    {
      id: 'cronscheduler',
      section: 'Automation, Load & Stress Engine',
      sectionKey: 'automation',
      name: '24/7 Synthetic Cron Scheduler',
      badge: '24/7 Polling',
      summary: 'Enterprise cron scheduler that continuously dials IVR numbers at periodic intervals (e.g., every 5 mins) to verify uptime.',
      whenToUse: 'To detect silent outages, carrier trunk drops, and voicebot failures before end-users notice.',
      keyMetrics: ['Schedule Frequency (Cron)', 'Next Run Countdown', 'Consecutive Failure Count'],
      typicalAction: 'Set schedule "*/15 * * * *" for Visa Cardholder Support (+18008472911), link PagerDuty escalation, and toggle active.'
    },
    {
      id: 'load',
      section: 'Automation, Load & Stress Engine',
      sectionKey: 'automation',
      name: 'PSTN Load Testing',
      badge: 'Stress',
      summary: 'High-concurrency PSTN stress testing engine initiating 5 to 500+ simultaneous phone calls to evaluate carrier trunk capacity.',
      whenToUse: 'Before major peak volume events (e.g. Black Friday, card reissue campaigns, marketing pushes) to test edge SBC limits.',
      keyMetrics: ['Concurrent Channels', 'Call Completion Rate (%)', 'SIP 503 Service Unavailable Rate'],
      typicalAction: 'Slide concurrency to 25 channels, target Genesys Cloud Edge SBC, run a 60-second stress test, and inspect trunk saturation.'
    },
    {
      id: 'bursting',
      section: 'Automation, Load & Stress Engine',
      sectionKey: 'automation',
      name: 'SIP Channel Bursting',
      badge: 'Surge Trunk',
      summary: 'Surge traffic simulator testing automatic trunk burst elasticity and carrier overflow routing.',
      whenToUse: 'When evaluating whether your carrier contract or SBC automatically allocates overflow channels during unexpected traffic spikes.',
      keyMetrics: ['Burst Capacity Utilization (%)', 'Overflow Trunk Latency', 'Call Rejection Ratio'],
      typicalAction: 'Simulate a 300% traffic surge within a 10-second window to verify carrier failover to secondary SBCs.'
    },
    {
      id: 'chaos',
      section: 'Automation, Load & Stress Engine',
      sectionKey: 'automation',
      name: 'IVR Chaos Studio',
      badge: 'Fault Inject',
      summary: 'Chaos engineering tool injecting deliberate network faults (packet drop, jitter spikes, silent audio, DTMF bounce).',
      whenToUse: 'When validating system resilience and ensuring agents gracefully recover from degraded network conditions.',
      keyMetrics: ['Fault Injection Type', 'Call Recovery Rate (%)', 'Agent Timeout Handling'],
      typicalAction: 'Inject 250ms simulated RTP jitter and 15% packet loss on active calls to verify adaptive jitter buffer resilience.'
    },
    {
      id: 'emergency',
      section: 'Automation, Load & Stress Engine',
      sectionKey: 'automation',
      name: '24/7 Emergency Monitor',
      badge: 'Outage',
      summary: 'Mission-critical outage dashboard monitoring Tier-1 emergency lines with instant PagerDuty and Slack alerts.',
      whenToUse: 'For 24/7 NOC monitoring of high-priority hotlines (e.g. Visa Fraud Emergency, E911 dispatch lines).',
      keyMetrics: ['Service Uptime (%)', 'Average Answer Delay (s)', 'Emergency Status (GREEN/YELLOW/RED)'],
      typicalAction: 'Review active alerts, trigger emergency health probes, and configure automated failover policies.'
    },
    {
      id: 'probes',
      section: 'Automation, Load & Stress Engine',
      sectionKey: 'automation',
      name: 'Global Probe Orchestrator',
      badge: 'LRN Lookup',
      summary: 'Distributed telecom probe management distributing synthetic calls across multi-region edge servers worldwide.',
      whenToUse: 'When testing local dial-in quality from specific geographic regions (North America, Europe, APAC, Latin America).',
      keyMetrics: ['Probe Geographic POPs', 'Regional Round-Trip Latency', 'Local Routing Number (LRN) Accuracy'],
      typicalAction: 'Select probes in Ashburn, London, Frankfurt, and Tokyo to run simultaneous inbound calls to global support numbers.'
    },
    {
      id: 'omnichannel',
      section: 'Automation, Load & Stress Engine',
      sectionKey: 'automation',
      name: 'Omnichannel Agent Tester',
      badge: 'Callback',
      summary: 'End-to-end testing of customer journeys across Voice, SMS verification, Web Chat, and Scheduled Callbacks.',
      whenToUse: 'When verifying that voice calls properly trigger SMS OTPs, email confirmations, or queue scheduled callbacks.',
      keyMetrics: ['Cross-Channel Hand-off Time (s)', 'SMS Delivery Rate (%)', 'Callback Queue Precision'],
      typicalAction: 'Trigger a simulated voice call requesting an SMS transaction link and verify the incoming SMS payload.'
    },

    // Section 3: Audio Quality, DSP & POLQA Analysis
    {
      id: 'polqa',
      section: 'Audio Quality, DSP & POLQA Analysis',
      sectionKey: 'audio',
      name: 'POLQA & PESQ Analyzer',
      badge: 'ITU-T P.863',
      summary: 'Industry standard ITU-T P.863 POLQA v3 and PESQ P.862 acoustic analysis engine calculating objective Mean Opinion Scores (MOS).',
      whenToUse: 'When measuring acoustic speech fidelity, detecting codec degradation, and enforcing carrier audio quality SLAs.',
      keyMetrics: ['POLQA MOS (1.0 - 5.0)', 'PESQ MOS', 'Attenuation (dB)', 'Delay Warp (ms)'],
      typicalAction: 'Upload a reference audio prompt and degraded sample to generate ITU-T P.863 MOS and perceptual degradation breakdown.'
    },
    {
      id: 'mos3d',
      section: 'Audio Quality, DSP & POLQA Analysis',
      sectionKey: 'audio',
      name: 'Spatial 3D MOS Map',
      badge: 'Global MOS',
      summary: 'Three-dimensional geospatial globe visualizing voice quality MOS scores across worldwide carrier termination points.',
      whenToUse: 'To detect regional telecom degradations (e.g. low MOS in EMEA vs high MOS in US East).',
      keyMetrics: ['Global Average MOS', 'Regional Outlier Density', 'PSTN vs VoIP Quality Divergence'],
      typicalAction: 'Rotate the 3D globe to inspect Ashburn, London, and Tokyo carrier termination nodes.'
    },
    {
      id: 'mosalarms',
      section: 'Audio Quality, DSP & POLQA Analysis',
      sectionKey: 'audio',
      name: 'Realtime MOS Alarms',
      badge: 'SLA Alarms',
      summary: 'Configurable alerting threshold system alerting engineers when voice quality drops below SLA criteria (e.g. MOS < 3.8).',
      whenToUse: 'To enforce strict quality guarantees with telecom providers and trigger automatic carrier rerouting.',
      keyMetrics: ['Alarm Threshold (MOS)', 'Trigger Count', 'Incident Auto-Resolution Time'],
      typicalAction: 'Set MOS warning threshold to 4.0 and critical threshold to 3.5, and bind webhook alerts.'
    },
    {
      id: 'degradation',
      section: 'Audio Quality, DSP & POLQA Analysis',
      sectionKey: 'audio',
      name: 'Audio Noise & Codec Studio',
      badge: 'PSTN Jitter',
      summary: 'Acoustic DSP laboratory simulating PSTN background noise (street, cafeteria, car, wind) and codec re-compression.',
      whenToUse: 'When testing voicebot speech recognition accuracy in noisy real-world mobile environments.',
      keyMetrics: ['Signal-to-Noise Ratio (SNR dB)', 'Codec Type (G.711u, G.729, Opus, AMR-WB)', 'Simulated Packet Loss (%)'],
      typicalAction: 'Select "Highway Traffic Noise (15dB SNR)" and test whether Gemini Voicebot correctly parses credit card digits.'
    },
    {
      id: 'jitterbuffer',
      section: 'Audio Quality, DSP & POLQA Analysis',
      sectionKey: 'audio',
      name: 'RTP Jitter Buffer Sim',
      badge: 'Adaptive',
      summary: 'RTP packet simulator evaluating fixed vs adaptive jitter buffer sizing, packet concealment, and buffer underruns.',
      whenToUse: 'When debugging choppy audio, robotic voice artifacts, or excessive buffering delay in SIP trunks.',
      keyMetrics: ['Buffer Size (ms)', 'Buffer Underruns / Overruns', 'Concealment Events'],
      typicalAction: 'Adjust the jitter buffer slider from 20ms to 120ms and listen to the real-time synthesized audio result.'
    },
    {
      id: 'aec',
      section: 'Audio Quality, DSP & POLQA Analysis',
      sectionKey: 'audio',
      name: 'Echo Cancellation AEC',
      badge: 'ERLE Loss',
      summary: 'Acoustic Echo Cancellation (AEC) diagnostic analyzing Echo Return Loss Enhancement (ERLE) and double-talk attenuation.',
      whenToUse: 'When callers complain about hearing their own voice echoed or when voicebots falsely trigger on their own speech.',
      keyMetrics: ['ERLE (dB)', 'Double-Talk Convergence Time (ms)', 'Residual Echo Level'],
      typicalAction: 'Run echo analysis on a test call and verify that ERLE exceeds the recommended 35dB threshold.'
    },
    {
      id: 'lufs',
      section: 'Audio Quality, DSP & POLQA Analysis',
      sectionKey: 'audio',
      name: 'LUFS Volume Normalizer',
      badge: 'EBU R128',
      summary: 'Broadcast-standard EBU R128 audio loudness analyzer calculating integrated LUFS, loudness range (LRA), and true-peak levels.',
      whenToUse: 'To prevent volume jumps between different IVR prompts, third-party announcements, and live human transfers.',
      keyMetrics: ['Integrated Loudness (-16 to -23 LUFS)', 'True-Peak (dBFS)', 'Loudness Range (LU)'],
      typicalAction: 'Upload IVR prompt files and click "Auto-Normalize to EBU R128 (-16 LUFS)" for consistent volume.'
    },
    {
      id: 'fft',
      section: 'Audio Quality, DSP & POLQA Analysis',
      sectionKey: 'audio',
      name: 'FFT Audio Spectrum',
      badge: 'FFT 2048',
      summary: 'Real-time 2048-point Fast Fourier Transform (FFT) spectrogram visualizing audio frequency distribution in real-time.',
      whenToUse: 'To identify 60Hz electrical hums, high-frequency clipping, DTMF leakage, and codec bandpass cutoffs (e.g. 3.4kHz PSTN cut).',
      keyMetrics: ['Peak Frequency (Hz)', 'Spectral Flatness', 'PSTN Bandpass Cutoff (300Hz - 3400Hz)'],
      typicalAction: 'Inspect the live FFT spectrum during call playback to detect unwanted background noise.'
    },
    {
      id: 'silence',
      section: 'Audio Quality, DSP & POLQA Analysis',
      sectionKey: 'audio',
      name: 'Dead Air Silence Marker',
      badge: 'Gap Marker',
      summary: 'Audio forensic analyzer scanning recordings for prolonged dead air or frozen IVR application states.',
      whenToUse: 'To identify slow database queries causing IVR delays or customer hesitation during payment prompts.',
      keyMetrics: ['Dead Air Duration (s)', 'Silence Threshold (-45 dBFS)', 'Dead Air Frequency (%)'],
      typicalAction: 'Scan recent call logs for silence intervals > 4.0 seconds and map them to underlying backend API calls.'
    },
    {
      id: 'transcoder',
      section: 'Audio Quality, DSP & POLQA Analysis',
      sectionKey: 'audio',
      name: 'G.711u to Opus Codec',
      badge: 'Wideband',
      summary: 'Real-time VoIP codec transcoder converting narrowband G.711u (8kHz) to wideband Opus (48kHz) with audio upsampling.',
      whenToUse: 'When bridging legacy PSTN phone calls into modern AI speech models that require high-fidelity audio.',
      keyMetrics: ['Transcoding Latency (ms)', 'CPU Utilization (%)', 'Resampling Harmonic Distortion (THD)'],
      typicalAction: 'Toggle transcoding on a test stream and observe the improved STT transcription accuracy.'
    },
    {
      id: 'promptconverter',
      section: 'Audio Quality, DSP & POLQA Analysis',
      sectionKey: 'audio',
      name: 'Voice Prompt Transcoder',
      badge: 'G.711u',
      summary: 'Batch audio format utility formatting studio recordings to telco-compliant G.711u / G.711a 8000Hz 8-bit mono WAV files.',
      whenToUse: 'Before uploading audio prompts to Genesys Cloud Architect, Asterisk, or Cisco IVRs to prevent distortion.',
      keyMetrics: ['Output Format (CCITT u-law)', 'Sample Rate (8000 Hz)', 'Header Alignment (RIFF/WAVE)'],
      typicalAction: 'Drop any MP3 or 44.1kHz WAV file to instantly transcode it into Genesys-certified telco format.'
    },
    {
      id: 'ssml',
      section: 'Audio Quality, DSP & POLQA Analysis',
      sectionKey: 'audio',
      name: 'Neural SSML Voice Studio',
      badge: 'Neural TTS',
      summary: 'Advanced Speech Synthesis Markup Language (SSML) editor with real-time audio auditioning across 50+ neural voices.',
      whenToUse: 'When authoring natural-sounding synthetic prompts, adding pauses, emphasis, or pronunciation tags for brand names.',
      keyMetrics: ['SSML Syntax Validity', 'Audio Duration (ms)', 'Phoneme Accuracy'],
      typicalAction: 'Type SSML tags like `<say-as interpret-as="digits">1234</say-as>`, click "Audition Voice", and export audio.'
    },
    {
      id: 'dtmfsniffer',
      section: 'Audio Quality, DSP & POLQA Analysis',
      sectionKey: 'audio',
      name: 'RFC 4733 DTMF Sniffer',
      badge: 'PT-101',
      summary: 'Deep packet inspection tool capturing out-of-band RFC 4733 / RFC 2833 telephone-event packets and in-band dual tones.',
      whenToUse: 'When debugging IVR menu navigation failures where DTMF presses are ignored or double-counted.',
      keyMetrics: ['RTP Payload Type (PT-101)', 'Tone Duration (ms)', 'Inter-Digit Pause (ms)', 'End-of-Event Bit Verification'],
      typicalAction: 'Verify that DTMF tones sent by VoxPulse match RFC 4733 specs with minimum 100ms duration.'
    },
    {
      id: 'bargein',
      section: 'Audio Quality, DSP & POLQA Analysis',
      sectionKey: 'audio',
      name: 'Voicebot Barge-In Test',
      badge: 'Mute Latency',
      summary: 'Specialized testing rig measuring how quickly a voicebot mutes its prompt when a user starts speaking over it.',
      whenToUse: 'When optimizing conversational flow to ensure bots stop talking promptly (< 400ms) upon user interruption.',
      keyMetrics: ['Barge-In Mute Delay (ms)', 'False Cut-off Rate (%)', 'Voice Activity Detection (VAD) Sensitivity'],
      typicalAction: 'Simulate speech interruption at t=2.4s and verify that prompt audio drops to zero within 320ms.'
    },
    {
      id: 'sttradar',
      section: 'Audio Quality, DSP & POLQA Analysis',
      sectionKey: 'audio',
      name: 'Streaming STT Radar',
      badge: 'TTFT Stream',
      summary: 'Real-time telemetry monitor tracking Time to First Transcript (TTFT) and partial vs final speech recognition tokens.',
      whenToUse: 'When tuning streaming WebSocket STT engines for conversational responsiveness.',
      keyMetrics: ['TTFT (Time to First Token ms)', 'Partial Transcript Frequency', 'Final Transcript Confidence'],
      typicalAction: 'Stream audio into STT and monitor real-time token arrival latency on the radar graph.'
    },
    {
      id: 'benchmarks',
      section: 'Audio Quality, DSP & POLQA Analysis',
      sectionKey: 'audio',
      name: 'Multi-Engine STT Matrix',
      badge: 'STT Accuracy',
      summary: 'Side-by-side benchmarking matrix comparing Word Error Rate (WER) across Google Cloud STT, Whisper, Deepgram, and Azure.',
      whenToUse: 'When choosing the most cost-effective and accurate speech engine for enterprise telephony.',
      keyMetrics: ['Word Error Rate (WER %)', 'Cost per Minute ($)', 'Processing Speed (Real-Time Factor RTF)'],
      typicalAction: 'Play a standard audio corpus through all engines simultaneously and compare transcription diffs.'
    },
    {
      id: 'confusion',
      section: 'Audio Quality, DSP & POLQA Analysis',
      sectionKey: 'audio',
      name: 'STT Confusion Matrix',
      badge: 'Phonemes',
      summary: 'Phonetic confusion matrix identifying frequently misrecognized words and phonemes (e.g. "Visa" vs "Vicer", "card" vs "hard").',
      whenToUse: 'When curating custom speech vocabulary and phrase hints for high-frequency domain terms.',
      keyMetrics: ['Phonetic Distance', 'Top Substitution Pairs', 'Acoustic Model Bias'],
      typicalAction: 'Identify confused financial terminology and click "Add to Custom Acoustic Vocabulary".'
    },

    // Section 4: SIP Signaling & Carrier Protocols
    {
      id: 'sip',
      section: 'SIP Signaling & Carrier Protocols',
      sectionKey: 'sip',
      name: 'SIP Protocol Diagnostics',
      badge: 'Server',
      summary: 'Comprehensive SIP signaling ladder diagram displaying all SIP messages (INVITE, 100 Trying, 180 Ringing, 200 OK, ACK, BYE).',
      whenToUse: 'When troubleshooting failed call setups, 4xx/5xx SIP error responses, or session establishment timeouts.',
      keyMetrics: ['Call-ID', 'Session Setup Time (ms)', 'Final SIP Response Code (200 OK vs 486 Busy vs 503 Out of Service)'],
      typicalAction: 'Select a call to render its chronological SIP ladder diagram with full packet headers.'
    },
    {
      id: 'failover',
      section: 'SIP Signaling & Carrier Protocols',
      sectionKey: 'sip',
      name: 'SIP SBC Failover Tester',
      badge: 'Resilience',
      summary: 'High-availability test harness verifying primary-to-secondary SBC failover when an Edge SBC becomes unreachable.',
      whenToUse: 'When verifying redundant Session Border Controller failover (e.g. Ashburn Primary SBC to Dallas Secondary SBC).',
      keyMetrics: ['Failover Latency (ms)', 'Call Drop Ratio during Switchover (%)', 'DNS SRV Priority Resolution'],
      typicalAction: 'Simulate primary SBC outage and verify that SIP traffic seamlessly redirects to backup trunks within 850ms.'
    },
    {
      id: 'pcap',
      section: 'SIP Signaling & Carrier Protocols',
      sectionKey: 'sip',
      name: 'SIP PCAP Packet Trace',
      badge: 'Wireshark',
      summary: 'Deep-packet Wireshark-compatible PCAP viewer and exporter capturing raw Ethernet, IP, UDP, SIP, and RTP frames.',
      whenToUse: 'When submitting technical escalation tickets to carrier NOCs or debugging microsecond-level packet jitter.',
      keyMetrics: ['Total Frames', 'RTP Stream SSRC', 'DiffServ QoS Marking (DSCP EF/46)'],
      typicalAction: 'Inspect full hex dumps of SIP INVITE packets or click "Download .PCAP" to open in Wireshark.'
    },
    {
      id: 'tls',
      section: 'SIP Signaling & Carrier Protocols',
      sectionKey: 'sip',
      name: 'SIP TLS & SRTP Security',
      badge: 'TLS 1.3',
      summary: 'Cryptographic auditor inspecting TLS 1.2/1.3 handshakes, mutual TLS (mTLS) x509 certs, and SRTP AES-128/256 media encryption.',
      whenToUse: 'To verify compliance with PCI-DSS and banking security mandates requiring end-to-end encrypted signaling and media.',
      keyMetrics: ['Cipher Suite (e.g. ECDHE-RSA-AES256-GCM-SHA384)', 'Certificate Expiration Days', 'SRTP Master Key Exchange'],
      typicalAction: 'Audit carrier SIP trunk certificates and verify that SRTP encryption is strictly enforced.'
    },
    {
      id: 'sipheaders',
      section: 'SIP Signaling & Carrier Protocols',
      sectionKey: 'sip',
      name: 'SIP Header Overrides',
      badge: 'INVITE',
      summary: 'Custom SIP header manipulation engine enabling injection of X-Headers, User-to-User Info (UUI), and P-Asserted-Identity.',
      whenToUse: 'When testing CRM CTI screen pops, Genesys UUI data passing, or carrier caller ID manipulation.',
      keyMetrics: ['Custom Header Count', 'SIP URI Format', 'UUI Hex Encoding'],
      typicalAction: 'Add `User-to-User: 04C102A123;encoding=hex` to an outbound call and verify IVR receipt.'
    },
    {
      id: 'sdp',
      section: 'SIP Signaling & Carrier Protocols',
      sectionKey: 'sip',
      name: 'SDP Codec Negotiator',
      badge: 'm=audio',
      summary: 'Session Description Protocol (SDP) parser inspecting offer/answer codec negotiation, RTP ports, and RTCP attributes.',
      whenToUse: 'When resolving one-way audio issues caused by asymmetric codec negotiation or firewall port blocks.',
      keyMetrics: ['Negotiated Audio Codec', 'RTP Media Port Range', 'rtpmap Attributes'],
      typicalAction: 'Verify that SDP offer matches Genesys Cloud Edge SBC preferences (G.711u / PCMU).'
    },
    {
      id: 'prack',
      section: 'SIP Signaling & Carrier Protocols',
      sectionKey: 'sip',
      name: 'SIP PRACK 100rel Tester',
      badge: 'RFC 3262',
      summary: 'RFC 3262 reliability tester for provisional SIP responses (180/183) requiring PRACK acknowledgement.',
      whenToUse: 'When testing inter-carrier PSTN trunks that mandate reliable provisional signaling to prevent early media clipping.',
      keyMetrics: ['RSeq / CSeq Numbering', 'PRACK Round-Trip Time', '183 Session Progress Reliability'],
      typicalAction: 'Simulate early media ringback with `Require: 100rel` and verify PRACK 200 OK handshake.'
    },
    {
      id: 'refer',
      section: 'SIP Signaling & Carrier Protocols',
      sectionKey: 'sip',
      name: 'SIP REFER Transfer Test',
      badge: 'RFC 3515',
      summary: 'RFC 3515 call transfer testing suite validating blind and attended transfers to internal queues or external PSTN numbers.',
      whenToUse: 'When testing IVR-to-agent warm transfers or deflection to partner call centers.',
      keyMetrics: ['Refer-To Target URI', 'NOTIFY Status Progression (100 Trying -> 200 OK)', 'Transfer Completion Time (s)'],
      typicalAction: 'Send a SIP REFER to transfer an active synthetic call to a supervisor extension and verify seamless handoff.'
    },
    {
      id: 'digest',
      section: 'SIP Signaling & Carrier Protocols',
      sectionKey: 'sip',
      name: 'SIP 401 Digest Auth',
      badge: 'SHA-256',
      summary: 'RFC 2617 / RFC 8760 SIP digest authentication validator testing MD5 and SHA-256 challenge-response handshakes.',
      whenToUse: 'When debugging authentication rejections on SIP endpoints, PBXs, or carrier registrars.',
      keyMetrics: ['Algorithm (MD5 vs SHA-256)', 'Nonce Freshness', 'Auth Response Calculation'],
      typicalAction: 'Test SIP endpoint credentials against carrier digest auth challenges.'
    },
    {
      id: 'optionskeepalive',
      section: 'SIP Signaling & Carrier Protocols',
      sectionKey: 'sip',
      name: 'SIP OPTIONS Keepalive',
      badge: 'Probes 30s',
      summary: 'Periodic SIP OPTIONS heartbeat probe tracking carrier trunk availability and firewall NAT pinhole persistence.',
      whenToUse: 'To maintain open firewall states on carrier SBCs and detect dropped trunks within 30 seconds.',
      keyMetrics: ['Ping Interval (default 30s)', 'RTT Latency (ms)', 'Trunk Availability (100%)'],
      typicalAction: 'Configure 30-second OPTIONS ping against Ashburn and Frankfurt SBC endpoints.'
    },
    {
      id: 'dialogs',
      section: 'SIP Signaling & Carrier Protocols',
      sectionKey: 'sip',
      name: 'SIP Dialog State Machine',
      badge: 'Call-ID',
      summary: 'Formal state machine inspector tracking active SIP dialogs across Early, Confirmed, and Terminated states.',
      whenToUse: 'When diagnosing ghost calls or stuck channels in PBX session tables.',
      keyMetrics: ['Active Dialogs', 'Dialog Duration', 'Tag Mismatch Errors'],
      typicalAction: 'Inspect the list of active dialogs and purge orphaned sessions.'
    },
    {
      id: 'siptimers',
      section: 'SIP Signaling & Carrier Protocols',
      sectionKey: 'sip',
      name: 'SIP RFC 3261 Timers',
      badge: 'T1/T2/A/B',
      summary: 'Interactive inspector and tuner for RFC 3261 protocol timers (Timer T1, T2, Timer A, Timer B, Timer F).',
      whenToUse: 'When tuning transaction timeout windows for high-latency inter-continental satellite or cellular trunks.',
      keyMetrics: ['Timer T1 (default 500ms)', 'Timer B (64*T1 = 32s)', 'Retransmission Count'],
      typicalAction: 'Calibrate Timer T1 to 750ms for international satellite routes to avoid premature timeouts.'
    },
    {
      id: 'registrar',
      section: 'SIP Signaling & Carrier Protocols',
      sectionKey: 'sip',
      name: 'SIP Registrar Monitor',
      badge: 'AOR Bind',
      summary: 'Real-time registry tracking Address-of-Record (AOR) bindings, Contact header expires headers, and NAT public endpoints.',
      whenToUse: 'When monitoring registered SIP softphones, hardphones, or SBC gateways.',
      keyMetrics: ['Registered Endpoints', 'Lease Expiration Countdown', 'Public NAT IP:Port'],
      typicalAction: 'Search registered agents by username or extension to verify active registrations.'
    },
    {
      id: 'outboundproxy',
      section: 'SIP Signaling & Carrier Protocols',
      sectionKey: 'sip',
      name: 'Outbound Proxy Router',
      badge: 'SBC Proxy',
      summary: 'Routing policy configuration directing outbound synthetic SIP traffic through designated carrier SBC proxies.',
      whenToUse: 'When routing test calls through specific regional egress points or corporate DMZ firewalls.',
      keyMetrics: ['Selected Proxy Route', 'Proxy Round-Trip Time', 'Failover Secondary Proxy'],
      typicalAction: 'Set outbound proxy to `sbc-ashburn.visa.com:5061;transport=tls` for all North American test suites.'
    },
    {
      id: 'subnets',
      section: 'SIP Signaling & Carrier Protocols',
      sectionKey: 'sip',
      name: 'Carrier IP Subnets',
      badge: 'Iptables',
      summary: 'Firewall whitelist manager generating iptables, AWS security groups, and GCP VPC firewall rules for carrier IPs.',
      whenToUse: 'When configuring network security perimeters to permit SIP and RTP traffic from trusted telco providers.',
      keyMetrics: ['Whitelisted CIDR Blocks', 'Signaling Ports (5060/5061)', 'RTP Port Range (10000-20000)'],
      typicalAction: 'Click "Export AWS Security Group Rules" or "Export GCP VPC Rules" for one-click firewall provisioning.'
    },
    {
      id: 'mime',
      section: 'SIP Signaling & Carrier Protocols',
      sectionKey: 'sip',
      name: 'SIP MIME Body Parser',
      badge: 'MIME ISUP',
      summary: 'Multipart MIME parser extracting ISUP (SS7) encapsulations, billing records, and QSIG headers from SIP payloads.',
      whenToUse: 'When inspecting PSTN interconnection trunks that carry legacy SS7 ISUP IAM messages inside SIP.',
      keyMetrics: ['MIME Boundary Count', 'ISUP Message Type (IAM, ACM, ANM)', 'Charge Number (ANI)'],
      typicalAction: 'Parse complex ISUP binary payloads to verify caller category and calling party parameters.'
    },
    {
      id: 'bwcalc',
      section: 'SIP Signaling & Carrier Protocols',
      sectionKey: 'sip',
      name: 'VoIP Bandwidth Calc',
      badge: 'Mbps Calc',
      summary: 'Network capacity planning calculator computing aggregate bandwidth requirements across audio codecs with IP/UDP/RTP headers.',
      whenToUse: 'When sizing MPLS, SD-WAN, or internet transit pipes for contact centers before scaling concurrent agent capacity.',
      keyMetrics: ['Codec Overhead (G.711u: 87.2 kbps, G.729: 31.2 kbps, Opus: ~40 kbps)', 'Total Concurrent Channels', 'Required Bandwidth (Mbps)'],
      typicalAction: 'Enter 150 concurrent calls with G.711u to calculate necessary WAN capacity (13.08 Mbps).'
    },
    {
      id: 'prispans',
      section: 'SIP Signaling & Carrier Protocols',
      sectionKey: 'sip',
      name: 'T1/E1 PRI Circuit Spans',
      badge: 'ISDN Slips',
      summary: 'Legacy TDM circuit health monitor tracking T1 (24ch) / E1 (30ch) PRI framing, clock slips, and D-channel LAPD states.',
      whenToUse: 'When monitoring hybrid telephony environments with legacy TDM PBXs or PRI gateway hardware.',
      keyMetrics: ['B-Channel Utilization', 'Clock Sync Slips', 'Alarm State (Red, Yellow, Blue)'],
      typicalAction: 'Verify that primary T1 span clock synchronization is locked with zero slips over 24 hours.'
    },
    {
      id: 'iceinspector',
      section: 'SIP Signaling & Carrier Protocols',
      sectionKey: 'sip',
      name: 'WebRTC STUN/TURN ICE',
      badge: 'STUN/TURN',
      summary: 'Interactive WebRTC ICE candidate diagnostic inspecting Host, Server Reflexive (srflx), and Relay (TURN) connectivity.',
      whenToUse: 'When resolving WebRTC connection drops or firewall traversal problems in remote agent softphones.',
      keyMetrics: ['Selected Candidate Pair', 'STUN RTT (ms)', 'TURN Relay Bandwidth'],
      typicalAction: 'Execute an ICE candidate harvest to ensure remote agents bypass restrictive symmetric NATs via TURN.'
    },
    {
      id: 'peerstats',
      section: 'SIP Signaling & Carrier Protocols',
      sectionKey: 'sip',
      name: 'WebRTC PeerConnection',
      badge: 'inbound-rtp',
      summary: 'Low-level WebRTC getStats() telemetry viewer tracking inbound/outbound audio packet rate, jitter, and bytes received.',
      whenToUse: 'When diagnosing browser-level audio degradation or CPU throttling in agent softphone sessions.',
      keyMetrics: ['Packets Lost', 'Fraction Lost', 'Audio Energy Level', 'Concealed Samples'],
      typicalAction: 'Inspect real-time WebRTC stats during an active browser call session.'
    },

    // Section 5: Carrier Routing, LCR & Telecom Billing
    {
      id: 'lcr',
      section: 'Carrier Routing, LCR & Telecom Billing',
      sectionKey: 'carrier',
      name: 'PSTN LCR Route Optimizer',
      badge: 'Least Cost',
      summary: 'Algorithmic Least Cost Routing (LCR) engine calculating optimal carrier egress paths based on rates and SLA scores.',
      whenToUse: 'When optimizing outbound call routing across carriers (e.g. Telnyx vs Twilio vs Bandwidth) to cut toll costs.',
      keyMetrics: ['Cost per Minute ($)', 'Carrier Reliability Rank', 'Selected Least-Cost Route'],
      typicalAction: 'Enter a destination NPA-NXX to compare carrier termination rates and route via the most cost-effective path.'
    },
    {
      id: 'lcrsavings',
      section: 'Carrier Routing, LCR & Telecom Billing',
      sectionKey: 'carrier',
      name: 'Carrier LCR Savings Calc',
      badge: 'ROI Calc',
      summary: 'Executive financial calculator computing annualized telecom savings achieved by migrating to optimized LCR routing.',
      whenToUse: 'When building business cases for leadership or demonstrating immediate ROI on platform deployment.',
      keyMetrics: ['Monthly Minutes Volume', 'Blended Legacy Rate vs Optimized Rate', 'Annualized Enterprise Savings ($)'],
      typicalAction: 'Input 500,000 monthly minutes to visualize $146,700/year in direct carrier expense reduction.'
    },
    {
      id: 'carrierinterconnect',
      section: 'Carrier Routing, LCR & Telecom Billing',
      sectionKey: 'carrier',
      name: 'Carrier Interconnect Matrix',
      badge: 'Tier-1 POPs',
      summary: 'Interconnect topology map showing direct fiber cross-connects and SIP peering points with Tier-1 carriers.',
      whenToUse: 'When planning direct SIP peering, BYOC edge interconnects, or cross-connect provisioning at Equinix facilities.',
      keyMetrics: ['Direct Interconnect Status', 'Interconnect Capacity (10G / 100G)', 'Latency to Carrier POP'],
      typicalAction: 'Verify active cross-connects to Lumen, AT&T, Verizon, and Telnyx in Ashburn and Chicago.'
    },
    {
      id: 'scorecard',
      section: 'Carrier Routing, LCR & Telecom Billing',
      sectionKey: 'carrier',
      name: 'Carrier SLA Scorecard',
      badge: 'Scorecard',
      summary: 'Automated carrier scorecard grading providers (A+ to F) on call completion, audio MOS, and P99 latency.',
      whenToUse: 'During quarterly carrier business reviews (QBRs) to demand SLA violation credits and rate discounts.',
      keyMetrics: ['SLA Grade (A+ to F)', 'Call Completion Rate (%)', 'Mean MOS Score', 'SLA Penalty Credits Earned ($)'],
      typicalAction: 'Export a quarterly PDF scorecard to hold carriers accountable for missed 99.99% uptime commitments.'
    },
    {
      id: 'heatmap',
      section: 'Carrier Routing, LCR & Telecom Billing',
      sectionKey: 'carrier',
      name: 'Global Latency Heatmap',
      badge: 'Heatmap',
      summary: 'Worldwide geographical heatmap mapping SIP signaling and RTP media latency across carrier routes.',
      whenToUse: 'To identify underperforming international telecom corridors causing delayed audio or high post-dial delay (PDD).',
      keyMetrics: ['Average PDD (Post-Dial Delay s)', 'Media Round-Trip Time (ms)', 'Regional Heat Index'],
      typicalAction: 'Hover over transatlantic routes to verify that round-trip audio latency remains below 150ms.'
    },
    {
      id: 'billing',
      section: 'Carrier Routing, LCR & Telecom Billing',
      sectionKey: 'carrier',
      name: 'Toll-Free Billing Auditor',
      badge: 'Rate Audit',
      summary: 'Automated billing reconciliation engine matching carrier call detail records (CDRs) against actual synthetic durations.',
      whenToUse: 'To detect carrier overbilling, incorrect 60/60 rounding, payphone surcharge errors, and phantom minutes.',
      keyMetrics: ['Billing Discrepancy Rate (%)', 'Overbilled Amount Identified ($)', 'Unmatched CDR Count'],
      typicalAction: 'Upload carrier monthly invoice CDRs to automatically highlight duplicate billing records.'
    },
    {
      id: 'lata',
      section: 'Carrier Routing, LCR & Telecom Billing',
      sectionKey: 'carrier',
      name: 'Telco LATA Exchange DB',
      badge: 'NANPA',
      summary: 'North American Numbering Plan (NANPA) Local Access and Transport Area (LATA) exchange database lookups.',
      whenToUse: 'When categorizing calls as intra-LATA vs inter-LATA to determine applicable regulatory tariff rates.',
      keyMetrics: ['LATA Number', 'Operating Company Number (OCN)', 'Rate Center Name', 'State Jurisdiction'],
      typicalAction: 'Query area code and prefix (e.g. 800-847) to inspect LATA jurisdiction and terminating rate centers.'
    },
    {
      id: 'dnis',
      section: 'Carrier Routing, LCR & Telecom Billing',
      sectionKey: 'carrier',
      name: 'DNIS Routing Lookup',
      badge: 'Trunk Map',
      summary: 'Dialed Number Identification Service (DNIS) lookup table mapping dialed numbers to specific contact center application queues.',
      whenToUse: 'When verifying that customer calls to specific toll-free numbers land on the correct IVR application.',
      keyMetrics: ['DNIS Number', 'Target Genesys Architect Flow', 'Language Default', 'Business Unit'],
      typicalAction: 'Search DNIS `+18008472911` to confirm routing to "Visa Cardholder Support Inbound Flow".'
    },
    {
      id: 'lnp',
      section: 'Carrier Routing, LCR & Telecom Billing',
      sectionKey: 'carrier',
      name: 'LNP Number Porting Tracker',
      badge: 'FOC Order',
      summary: 'Local Number Portability (LNP) tracker monitoring carrier porting orders, FOC dates, and NPAC database broadcast status.',
      whenToUse: 'When migrating enterprise phone numbers between telecom providers (e.g. migrating 100 DIDs to Genesys BYOC).',
      keyMetrics: ['Firm Order Commitment (FOC) Date', 'NPAC Broadcast Status', 'Porting State (Pending/Active)'],
      typicalAction: 'Track porting progress of newly acquired customer support numbers.'
    },

    // Section 6: Security, Compliance & Regulatory
    {
      id: 'compliance',
      section: 'Security, Compliance & Regulatory',
      sectionKey: 'security',
      name: 'Compliance & PCI Auditor',
      badge: 'PCI-DSS v4.0',
      summary: 'Continuous compliance auditor scanning call recordings, transcripts, and logs for PCI-DSS, HIPAA, and TCPA violations.',
      whenToUse: 'Before formal regulatory compliance audits to prove that no unredacted cardholder data (PAN, CVV) is stored.',
      keyMetrics: ['PCI Compliance Score (100%)', 'Unredacted PAN Detections (0)', 'Encrypted Storage Verification'],
      typicalAction: 'Run a full workspace audit to generate a signed PCI-DSS Attestation of Compliance (AoC) report.'
    },
    {
      id: 'redactor',
      section: 'Security, Compliance & Regulatory',
      sectionKey: 'security',
      name: 'Call Audio PII Redactor',
      badge: 'GDPR & PCI',
      summary: 'AI-powered acoustic and transcript redactor muting sensitive 16-digit credit card numbers, CVVs, and SSNs with silence tones.',
      whenToUse: 'When storing call recordings for agent quality monitoring while complying with strict data privacy laws.',
      keyMetrics: ['Redaction Precision (%)', 'Acoustic Mute Precision (ms)', 'Zero-Storage Guarantee'],
      typicalAction: 'Review a sample recording where the caller speaks their 16-digit card number and verify complete acoustic muting.'
    },
    {
      id: 'stirshaken',
      section: 'Security, Compliance & Regulatory',
      sectionKey: 'security',
      name: 'STIR/SHAKEN Attestation',
      badge: 'Attest A',
      summary: 'FCC STIR/SHAKEN cryptographic caller ID verification verifying SIP Identity headers and attestation levels (A, B, C).',
      whenToUse: 'To prevent outbound business calls from being flagged as "Spam Likely" or "Scam" on consumer mobile devices.',
      keyMetrics: ['Attestation Level (Full A, Partial B, Gateway C)', 'X.509 Certificate Thumbprint', 'Identity Header Signature'],
      typicalAction: 'Verify that all Visa outbound verification calls receive Level A attestation from certified carrier signers.'
    },
    {
      id: 'e911',
      section: 'Security, Compliance & Regulatory',
      sectionKey: 'security',
      name: 'E911 PSAP Address Check',
      badge: 'Kari Law',
      summary: 'Emergency services validator verifying dispatchable location data, Kari’s Law, and RAY BAUM’S Act compliance.',
      whenToUse: 'When provisioning phone numbers for enterprise employees or contact centers to ensure 911 dispatch accuracy.',
      keyMetrics: ['Master Street Address Guide (MSAG) Validation', 'Public Safety Answering Point (PSAP) ID', 'Dispatchable Room Info'],
      typicalAction: 'Validate physical address formatting for corporate office DIDs against MSAG databases.'
    },
    {
      id: 'gdpr',
      section: 'Security, Compliance & Regulatory',
      sectionKey: 'security',
      name: 'GDPR Data Retention',
      badge: '30-Day Auto',
      summary: 'Automated data retention and "Right to be Forgotten" lifecycle manager enforcing scheduled audio and transcript purging.',
      whenToUse: 'To satisfy European GDPR and California CCPA mandates requiring automated deletion after retention windows.',
      keyMetrics: ['Retention Policy (e.g. 30/90 Days)', 'Automated Purge Schedule', 'Cryptographic Shred Confirmation'],
      typicalAction: 'Set automated data retention to 30 days and verify automated cryptographic shredding logs.'
    },
    {
      id: 'usftax',
      section: 'Security, Compliance & Regulatory',
      sectionKey: 'security',
      name: 'USF Regulatory Tax Audit',
      badge: 'FCC Tax',
      summary: 'Telecom regulatory tax calculator verifying Federal Universal Service Fund (USF), TRS, and state 911 surcharges.',
      whenToUse: 'When auditing carrier invoices for unauthorized fee markups or incorrect interstate telecom tax percentages.',
      keyMetrics: ['Current Quarterly USF Rate (%)', 'Applicable Interstate Revenue Basis', 'Calculated vs Invoiced Tax'],
      typicalAction: 'Verify that carrier invoices apply the exact FCC-mandated USF quarterly contribution rate without hidden markup.'
    },
    {
      id: 'biometrics',
      section: 'Security, Compliance & Regulatory',
      sectionKey: 'security',
      name: 'Voice Biometrics Auditor',
      badge: 'Anti-Spoof',
      summary: 'Voice biometric security tester evaluating speaker verification algorithms against synthetic voice cloning and deepfakes.',
      whenToUse: 'When testing biometric voice authentication systems used for customer phone banking and high-value transactions.',
      keyMetrics: ['Equal Error Rate (EER %)', 'False Accept Rate (FAR)', 'False Reject Rate (FRR)'],
      typicalAction: 'Test voice biometric models against generated deepfake audio samples to verify anti-spoof rejection.'
    },
    {
      id: 'liveness',
      section: 'Security, Compliance & Regulatory',
      sectionKey: 'security',
      name: 'Voice Liveness Meter',
      badge: 'Spoof Check',
      summary: 'Acoustic liveness detector identifying generative AI speech, replay attacks, and physical room reverberation artifacts.',
      whenToUse: 'To ensure that caller voices are authentic live humans rather than pre-recorded tapes or AI voice clones.',
      keyMetrics: ['Liveness Score (0.00 - 1.00)', 'Replay Attack Probability', 'Phase Consistency Index'],
      typicalAction: 'Run liveness analysis on incoming audio to verify human vocal tract micro-tremors.'
    },
    {
      id: 'rbac',
      section: 'Security, Compliance & Regulatory',
      sectionKey: 'security',
      name: 'Keycloak RBAC Inspector',
      badge: 'OIDC Roles',
      summary: 'Enterprise identity and role-based access control (RBAC) inspector auditing token scopes, claims, and permissions.',
      whenToUse: 'When verifying that enterprise users have appropriate least-privilege permissions across workspaces.',
      keyMetrics: ['Assigned Role (Super Admin, Telecom Lead, QA Engineer, Auditor, Billing Admin)', 'Active Token Expiry', 'OIDC Realm'],
      typicalAction: 'Inspect current user roles, verify token signature validity, and simulate privilege escalation boundaries.'
    },
    {
      id: 'ssoauditor',
      section: 'Security, Compliance & Regulatory',
      sectionKey: 'security',
      name: 'SAML & PKCE SSO Audit',
      badge: 'Auth Log',
      summary: 'Single Sign-On (SSO) security log auditor tracking SAML 2.0 assertions, Okta / PingFederate authentication events, and PKCE handshakes.',
      whenToUse: 'When troubleshooting login issues or providing audit logs to enterprise security compliance teams.',
      keyMetrics: ['SSO Provider (Visa Okta, PingFederate, Keycloak)', 'IdP Response Status', 'Certificate Fingerprint'],
      typicalAction: 'Review real-time SSO authentication events for Visa Inc. employees (@visa.com).'
    },
    {
      id: 'escalation',
      section: 'Security, Compliance & Regulatory',
      sectionKey: 'security',
      name: 'Escalation Policies',
      badge: 'PagerDuty',
      summary: 'Multi-tiered incident escalation engine routing critical voice outages to on-call engineers via phone, SMS, and PagerDuty.',
      whenToUse: 'When configuring on-call rotations and escalation matrices for mission-critical IVR outages.',
      keyMetrics: ['Escalation Steps (Tier 1 -> Tier 2 -> Executive)', 'Acknowledge Timeout (mins)', 'Active On-Call Schedule'],
      typicalAction: 'Define a policy: if an emergency DID fails 2 consecutive synthetic runs, immediately dial the Telecom NOC lead.'
    },

    // Section 7: AI Studio, NLU & Agent Intelligence
    {
      id: 'gemini',
      section: 'AI Studio, NLU & Agent Intelligence',
      sectionKey: 'ai',
      name: 'Gemini AI Studio',
      badge: 'AI Live',
      summary: 'Direct playground for Google Gemini 1.5 Pro & Flash models performing real-time speech prompt analysis and response generation.',
      whenToUse: 'When designing AI voice prompts, testing conversational context windows, or generating automated test scenarios.',
      keyMetrics: ['Tokens Processed', 'Inference Latency (ms)', 'Temperature & Top-P Settings'],
      typicalAction: 'Prompt Gemini to analyze an IVR prompt and generate all possible customer utterance variations.'
    },
    {
      id: 'combat',
      section: 'AI Studio, NLU & Agent Intelligence',
      sectionKey: 'ai',
      name: 'AI Bot Combat Arena',
      badge: 'Agent vs IVR',
      summary: 'Autonomous simulation arena where an AI Customer Bot calls an enterprise IVR Bot to test unpredictable human conversations.',
      whenToUse: 'To uncover edge cases, conversational dead-ends, and unhandled customer responses in production IVRs.',
      keyMetrics: ['Conversational Turns', 'Goal Completion Rate (%)', 'Uncaught Exception Count'],
      typicalAction: 'Deploy an "Angry Customer with Card Fraud" AI persona and watch it navigate the Visa automated fraud menu.'
    },
    {
      id: 'sentiment',
      section: 'AI Studio, NLU & Agent Intelligence',
      sectionKey: 'ai',
      name: 'Gemini Sentiment & Legal',
      badge: 'AI Compliance',
      summary: 'Post-call sentiment and regulatory auditor scanning conversations for customer frustration, legal threats, and mandatory disclosures.',
      whenToUse: 'To ensure customer service agents read mandatory legal disclosures (e.g. "This call is recorded", mini-Miranda).',
      keyMetrics: ['Sentiment Score (-1.0 to +1.0)', 'Mandatory Disclosure Compliance (%)', 'Escalation Risk Index'],
      typicalAction: 'Analyze call transcripts for keywords like "lawyer", "attorney general", or "CFPB complaint".'
    },
    {
      id: 'tuning',
      section: 'AI Studio, NLU & Agent Intelligence',
      sectionKey: 'ai',
      name: 'STT Custom Vocabulary',
      badge: 'Acoustic AI',
      summary: 'Acoustic model custom vocabulary manager injecting domain-specific terminology (e.g. Visa Direct, Visa B2B Connect, EMV chip).',
      whenToUse: 'When default speech recognition models mishear specialized enterprise brand names and acronyms.',
      keyMetrics: ['Custom Phrase Count', 'Phrase Boost Factor (1 - 20)', 'Recognition Accuracy Gain (%)'],
      typicalAction: 'Add terms like "Cardholder", "CVV2", "Tokenization" with boost weight 15.0 to eliminate transcription errors.'
    },
    {
      id: 'amd',
      section: 'AI Studio, NLU & Agent Intelligence',
      sectionKey: 'ai',
      name: 'AMD Voicemail Detector',
      badge: 'AMD Accuracy',
      summary: 'Answering Machine Detection (AMD) evaluator classifying connected calls as Human, Voicemail Beep, or Automated Greeting within 1.2s.',
      whenToUse: 'When optimizing outbound campaign dialing to avoid leaving voicemails or speaking before the beep.',
      keyMetrics: ['Classification Latency (<1200ms)', 'AMD Accuracy (%)', 'False Positive Rate'],
      typicalAction: 'Test AMD engine on various cellular voicemail greetings to ensure rapid detection and proper handling.'
    },
    {
      id: 'bargerecovery',
      section: 'AI Studio, NLU & Agent Intelligence',
      sectionKey: 'ai',
      name: 'Barge-In Context Switch',
      badge: 'Recovery',
      summary: 'Conversational state recovery tester ensuring voicebots correctly pivot when a user changes their mind mid-sentence.',
      whenToUse: 'When testing voicebot intelligence during abrupt customer interruptions (e.g. "Actually, cancel my card instead!").',
      keyMetrics: ['Context Switch Latency (ms)', 'Intent Override Accuracy (%)', 'State Consistency Score'],
      typicalAction: 'Simulate user interruption switching topic from account balance to stolen card, verifying smooth dialog transition.'
    },
    {
      id: 'fallbacks',
      section: 'AI Studio, NLU & Agent Intelligence',
      sectionKey: 'ai',
      name: 'Intent Fallback Strategy',
      badge: 'Recovery',
      summary: 'Fallback strategy configurator defining multi-tiered recovery paths when customer intent cannot be determined.',
      whenToUse: 'To prevent frustrating infinite repetition loops when callers speak outside known vocabulary.',
      keyMetrics: ['Fallback Attempt Limit (default: 2)', 'Reprompt Strategy', 'Escalation Destination'],
      typicalAction: 'Configure the fallback policy to automatically transfer to a human specialist after 2 unrecognized utterances.'
    },
    {
      id: 'promptab',
      section: 'AI Studio, NLU & Agent Intelligence',
      sectionKey: 'ai',
      name: 'Gemini Prompt A/B Test',
      badge: 'System LLM',
      summary: 'A/B testing studio comparing different system instructions and prompt formulations for conversational voice agents.',
      whenToUse: 'When optimizing prompt engineering to maximize call containment, reduce verbosity, or improve caller satisfaction.',
      keyMetrics: ['Prompt A vs B Containment Rate', 'Average Handle Time (s)', 'Token Efficiency'],
      typicalAction: 'Compare a concise prompt versus a conversational prompt to determine which yields higher completion rates.'
    },
    {
      id: 'menuab',
      section: 'AI Studio, NLU & Agent Intelligence',
      sectionKey: 'ai',
      name: 'IVR Menu Prompt A/B',
      badge: 'Containment',
      summary: 'Split-testing engine comparing different IVR menu prompt wording, voice actors, and option ordering.',
      whenToUse: 'When determining whether callers prefer "Press 1 for Billing" or conversational speech prompts.',
      keyMetrics: ['Self-Service Containment (%)', 'Zero-Out (Transfer to Agent) Rate (%)', 'Caller Task Completion Time'],
      typicalAction: 'Run 50 synthetic test calls against Variant A and 50 against Variant B to evaluate navigation speed.'
    },
    {
      id: 'nluheatmap',
      section: 'AI Studio, NLU & Agent Intelligence',
      sectionKey: 'ai',
      name: 'NLU Intent Confidence',
      badge: 'Confidence',
      summary: 'Heatmap visualization displaying intent classification confidence across diverse customer phrasing and regional accents.',
      whenToUse: 'To identify weak or overlapping NLU intents that cause misrouting or customer confusion.',
      keyMetrics: ['Average Intent Confidence (0.0 - 1.0)', 'Low Confidence Utterance Count', 'Intent Overlap Matrix'],
      typicalAction: 'Inspect low-confidence utterances (< 0.75) and assign them to correct training intents.'
    },
    {
      id: 'csat',
      section: 'AI Studio, NLU & Agent Intelligence',
      sectionKey: 'ai',
      name: 'Post-Call CSAT Predictor',
      badge: 'CSAT AI',
      summary: 'Predictive machine learning model estimating Customer Satisfaction (CSAT) scores from call audio features and sentiment.',
      whenToUse: 'To predict CSAT scores on 100% of calls without relying on low post-call survey response rates (typically < 3%).',
      keyMetrics: ['Predicted CSAT (1 to 5 Stars)', 'Sentiment Trajectory', 'Customer Effort Score (CES)'],
      typicalAction: 'Review CSAT predictions for calls with long hold times or multiple transfers.'
    },
    {
      id: 'langdetect',
      section: 'AI Studio, NLU & Agent Intelligence',
      sectionKey: 'ai',
      name: 'Language Auto-Detect',
      badge: 'Multi-Lang',
      summary: 'Automatic spoken language identifier detecting English, Spanish, French, Mandarin, and 40+ other languages in the first 3 seconds.',
      whenToUse: 'When supporting global multilingual customers without forcing them through tedious "Press 1 for English" menus.',
      keyMetrics: ['Language Identification Latency (<2.0s)', 'Detection Confidence (%)', 'Supported Language Count (45)'],
      typicalAction: 'Play a Spanish greeting and verify the IVR immediately pivots to Spanish prompts.'
    },

    // Section 8: Executive Dashboards, Ops & Migrations
    {
      id: 'dashboard100',
      section: 'Executive Dashboards, Ops & Migrations',
      sectionKey: 'ops',
      name: '104-Module Executive Dashboard',
      badge: 'Executive',
      summary: 'Single-pane-of-glass executive command center aggregating health, SLA metrics, and active incidents across all 104 platform modules.',
      whenToUse: 'For VP/Director level status reviews, NOC wall monitors, and cross-functional telecom health checks.',
      keyMetrics: ['Overall Platform SLA (99.99%)', 'Active Enterprise Tenants', 'Total Tests Run Today', 'Cost Savings Achieved'],
      typicalAction: 'Review high-level system indicators and drill down into any underperforming subsystem.'
    },
    {
      id: 'klearcom',
      section: 'Executive Dashboards, Ops & Migrations',
      sectionKey: 'ops',
      name: 'Klearcom Migration & ROI',
      badge: 'ROI / Parity',
      summary: 'Side-by-side migration comparison dashboard proving 100% feature parity and 65%+ cost reduction over Klearcom, Cyara, and Hammer.',
      whenToUse: 'When demonstrating to procurement why switching to VoxPulse AI saves $200k+/year with superior AI-native testing.',
      keyMetrics: ['Annual Cost Comparison ($288k Klearcom vs $60k VoxPulse)', 'Feature Parity Score (100%)', 'TCO Reduction (%)'],
      typicalAction: 'Export the executive ROI comparison deck for telecom procurement and finance teams.'
    },
    {
      id: 'execpdfexporter',
      section: 'Executive Dashboards, Ops & Migrations',
      sectionKey: 'ops',
      name: 'Executive SLA PDF Exporter',
      badge: 'PDF Export',
      summary: 'One-click executive report generator compiling multi-page branded PDF reports summarizing uptime, MOS, and compliance.',
      whenToUse: 'For monthly client deliverables, regulatory filings, or C-suite executive briefings.',
      keyMetrics: ['Report Date Range', 'Branded Template (Visa Inc.)', 'Executive Summary Metrics'],
      typicalAction: 'Select Visa Inc., choose date range, and click "Generate Executive PDF Report" to download a publication-ready document.'
    },
    {
      id: 'analytics',
      section: 'Executive Dashboards, Ops & Migrations',
      sectionKey: 'ops',
      name: 'Analytics & Reports',
      badge: 'BI / Trends',
      summary: 'Historical business intelligence charts displaying call volume trends, failure distributions, and carrier performance over time.',
      whenToUse: 'When analyzing long-term telecom trends, identifying recurring failure patterns, or capacity planning.',
      keyMetrics: ['Historical Call Volumes', 'Failure Categories Breakdown', 'Mean Time to Detect (MTTD)'],
      typicalAction: 'Filter by last 30 days to observe the steady improvement in overall test pass rates.'
    },
    {
      id: 'exporter',
      section: 'Executive Dashboards, Ops & Migrations',
      sectionKey: 'ops',
      name: 'PDF Export Report Studio',
      badge: 'PDF & CSV',
      summary: 'Data extraction and report configuration tool exporting raw telemetry to CSV, JSON, and customized PDF formats.',
      whenToUse: 'When feeding synthetic testing data into enterprise data warehouses (Snowflake, BigQuery) or BI tools (Tableau, PowerBI).',
      keyMetrics: ['Export Record Count', 'Format (CSV, JSON, PDF)', 'Export Duration'],
      typicalAction: 'Select test results from the last 7 days and export a CSV file for internal analytics.'
    },
    {
      id: 'outages',
      section: 'Executive Dashboards, Ops & Migrations',
      sectionKey: 'ops',
      name: 'Global Outage Map',
      badge: 'Live Ticker',
      summary: 'Real-time global carrier outage tracker aggregating telecom carrier BGP anomalies, fiber cuts, and trunk degradations.',
      whenToUse: 'To quickly determine whether an IVR failure is caused by an internal bug or a widespread carrier PSTN outage.',
      keyMetrics: ['Active Carrier Incidents', 'Impacted Regions', 'Estimated Time to Restoration (ETR)'],
      typicalAction: 'Check the live ticker when test failure rates spike to see if a carrier fiber cut occurred.'
    },
    {
      id: 'screenpop',
      section: 'Executive Dashboards, Ops & Migrations',
      sectionKey: 'ops',
      name: 'Agent CTI Screen Pop',
      badge: 'CAD Pop',
      summary: 'Computer Telephony Integration (CTI) latency validator measuring the delay between customer call arrival and CRM screen pop.',
      whenToUse: 'When ensuring contact center agents receive customer account data on their screens before answering the call.',
      keyMetrics: ['Screen Pop Latency (target <800ms)', 'CAD Data Integrity', 'CRM Connection Status (Salesforce/Zendesk)'],
      typicalAction: 'Verify that customer details and IVR selections populate on the mock agent screen within 620ms.'
    },
    {
      id: 'aht',
      section: 'Executive Dashboards, Ops & Migrations',
      sectionKey: 'ops',
      name: 'Gemini AHT Optimizer',
      badge: 'AHT Cut',
      summary: 'AI diagnostic identifying friction points, verbose IVR prompts, and slow agent transfers that inflate Average Handle Time (AHT).',
      whenToUse: 'When targeting contact center cost reductions by streamlining call flow and shortening prompt durations.',
      keyMetrics: ['Current AHT (s)', 'Identified AHT Waste (s)', 'Projected Operational Savings ($)'],
      typicalAction: 'Review AI recommendations to shorten the initial disclaimer prompt to save 4.2 seconds per call.'
    },
    {
      id: 'erlang',
      section: 'Executive Dashboards, Ops & Migrations',
      sectionKey: 'ops',
      name: 'Erlang C SLA Predictor',
      badge: 'Staffing',
      summary: 'Mathematical Erlang C queuing calculator predicting required agent staffing levels to achieve target Service Level Agreements.',
      whenToUse: 'When workforce managers need to determine how many agents must be scheduled to answer 80% of calls within 20 seconds.',
      keyMetrics: ['Traffic Intensity (Erlangs)', 'Predicted Service Level (%)', 'Average Speed of Answer (ASA s)', 'Agent Occupancy (%)'],
      typicalAction: 'Input 600 calls/hr with 180s AHT to calculate that 35 agents achieve an 83.7% service level.'
    },
    {
      id: 'percentiles',
      section: 'Executive Dashboards, Ops & Migrations',
      sectionKey: 'ops',
      name: 'P50/P99 Latency Graph',
      badge: 'P99 Latency',
      summary: 'Detailed statistical latency distribution chart plotting P50 median, P95, and P99 tail latencies across telephony operations.',
      whenToUse: 'When optimizing for tail latencies to ensure that 99% of callers experience rapid menu responses.',
      keyMetrics: ['P50 Latency (ms)', 'P95 Latency (ms)', 'P99 Tail Latency (ms)'],
      typicalAction: 'Inspect tail latency spikes caused by database connection pool exhaustion.'
    },
    {
      id: 'tagger',
      section: 'Executive Dashboards, Ops & Migrations',
      sectionKey: 'ops',
      name: 'Call Metadata Tagger',
      badge: 'Tags',
      summary: 'Automated and manual tagging utility attaching business metadata (campaign ID, VIP status, language) to call records.',
      whenToUse: 'When categorizing test runs by software release, business unit, or marketing campaign.',
      keyMetrics: ['Assigned Tags', 'Search Filter by Tag', 'Tag Rules'],
      typicalAction: 'Apply tag `visa-release-v4.2` to automated test runs for release tracking.'
    },
    {
      id: 'datachannel',
      section: 'Executive Dashboards, Ops & Migrations',
      sectionKey: 'ops',
      name: 'RTCDataChannel Stats',
      badge: 'SCTP',
      summary: 'Telemetry viewer for WebRTC out-of-band SCTP DataChannels used for low-latency binary and text transmission.',
      whenToUse: 'When passing real-time transcriptions or agent interaction commands alongside WebRTC voice streams.',
      keyMetrics: ['Messages Sent / Received', 'Bytes Transferred', 'Channel State (Open/Closed)'],
      typicalAction: 'Monitor SCTP DataChannel throughput during live agent softphone calls.'
    },
    {
      id: 'webhooks',
      section: 'Executive Dashboards, Ops & Migrations',
      sectionKey: 'ops',
      name: 'Webhook Retry Queue',
      badge: 'DLQ Queue',
      summary: 'Resilient Dead Letter Queue (DLQ) managing webhook delivery with exponential backoff for third-party integrations.',
      whenToUse: 'To verify that alert webhooks to Slack, PagerDuty, or ServiceNow are never lost during third-party outages.',
      keyMetrics: ['Queued Webhooks', 'Retry Attempts (max 5)', 'Dead Letter Count'],
      typicalAction: 'Inspect failed webhook deliveries and trigger manual retries with one click.'
    },
    {
      id: 'importer',
      section: 'Executive Dashboards, Ops & Migrations',
      sectionKey: 'ops',
      name: 'Klearcom One-Click Importer',
      badge: 'Migrate',
      summary: 'Migration utility importing test cases, DID lists, and IVR flows from Klearcom, Cyara, or Hammer exports.',
      whenToUse: 'When onboarding enterprise customers switching from legacy vendors without having to re-author test cases manually.',
      keyMetrics: ['Imported Test Cases', 'Imported DIDs', 'Mapping Success Rate (100%)'],
      typicalAction: 'Upload a Klearcom CSV export file to instantly generate identical VoxPulse test suites.'
    },
    {
      id: 'tenant',
      section: 'Executive Dashboards, Ops & Migrations',
      sectionKey: 'ops',
      name: 'Multi-Tenant Workspaces',
      badge: 'Quotas',
      summary: 'Multi-tenant workspace isolation manager configuring dedicated tenant boundaries, resource quotas, and custom domains.',
      whenToUse: 'When provisioning distinct business units (e.g. Visa North America vs Visa Europe) with isolated data.',
      keyMetrics: ['Active Tenants', 'Monthly Minute Quotas', 'Provisioned DID Limits'],
      typicalAction: 'Adjust monthly minute quotas for specific enterprise organizations.'
    },
    {
      id: 'integrations',
      section: 'Executive Dashboards, Ops & Migrations',
      sectionKey: 'ops',
      name: 'Alert Integrations',
      badge: 'Webhooks',
      summary: 'Integration hub connecting platform alerts to PagerDuty, Slack, Microsoft Teams, Datadog, and custom webhooks.',
      whenToUse: 'When setting up real-time notification channels for telecom NOCs and incident response teams.',
      keyMetrics: ['Connected Integrations', 'Alert Routing Rules', 'Webhook Health Status'],
      typicalAction: 'Enter a Slack webhook URL or PagerDuty integration key to receive real-time failure alerts.'
    },
    {
      id: 'settings',
      section: 'Executive Dashboards, Ops & Migrations',
      sectionKey: 'ops',
      name: 'Workspace Settings',
      badge: 'Config',
      summary: 'Global configuration panel managing default audio codecs, API keys, telephony providers, and regional endpoints.',
      whenToUse: 'When configuring platform credentials, selecting default carriers, or toggling developer debug mode.',
      keyMetrics: ['Environment Config', 'Carrier Adapter Selected', 'Debug Logging Level'],
      typicalAction: 'Select primary carrier (Genesys Cloud BYOC vs Telnyx) and configure global timeouts.'
    }
  ], []);

  // Section categories for easy filtering
  const sectionList = useMemo(() => [
    { key: 'ALL', label: 'All 103 Screens', count: screens.length, icon: Layers },
    { key: 'core', label: '1. Core Voice & Studio', count: screens.filter(s => s.sectionKey === 'core').length, icon: PhoneCall },
    { key: 'automation', label: '2. Automation & Load', count: screens.filter(s => s.sectionKey === 'automation').length, icon: Workflow },
    { key: 'audio', label: '3. Audio DSP & POLQA', count: screens.filter(s => s.sectionKey === 'audio').length, icon: Activity },
    { key: 'sip', label: '4. SIP & Protocols', count: screens.filter(s => s.sectionKey === 'sip').length, icon: Server },
    { key: 'carrier', label: '5. Carrier & LCR', count: screens.filter(s => s.sectionKey === 'carrier').length, icon: DollarSign },
    { key: 'security', label: '6. Security & PCI', count: screens.filter(s => s.sectionKey === 'security').length, icon: ShieldCheck },
    { key: 'ai', label: '7. AI Studio & NLU', count: screens.filter(s => s.sectionKey === 'ai').length, icon: Bot },
    { key: 'ops', label: '8. Executive & Ops', count: screens.filter(s => s.sectionKey === 'ops').length, icon: Flame }
  ], [screens]);

  // Filtered screens
  const filteredScreens = useMemo(() => {
    return screens.filter(screen => {
      const matchesSection = selectedSection === 'ALL' || screen.sectionKey === selectedSection;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery = !q || 
        screen.name.toLowerCase().includes(q) ||
        screen.id.toLowerCase().includes(q) ||
        screen.summary.toLowerCase().includes(q) ||
        screen.section.toLowerCase().includes(q) ||
        (screen.keyMetrics && screen.keyMetrics.some(m => m.toLowerCase().includes(q)));
      return matchesSection && matchesQuery;
    });
  }, [screens, selectedSection, searchQuery]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(5, 10, 25, 0.85)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1280px',
        height: '92vh',
        backgroundColor: '#0d1527',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '20px',
        boxShadow: '0 25px 70px rgba(0, 0, 0, 0.7), 0 0 40px rgba(99, 102, 241, 0.25)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        color: '#f1f5f9'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 28px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'linear-gradient(90deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.9) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)'
            }}>
              <BookOpen size={22} color="#fff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em', color: '#fff' }}>
                  VoxPulse AI Enterprise User Guide & Screen Catalog
                </h2>
                <span className="badge badge-purple" style={{ fontSize: '0.65rem', padding: '3px 8px' }}>
                  v2.5 Enterprise
                </span>
                <span className="badge badge-cyan" style={{ fontSize: '0.65rem', padding: '3px 8px' }}>
                  Visa Inc. Ready
                </span>
              </div>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: '#94a3b8' }}>
                Exhaustive platform manual, mental model, user workflows, and directory of all 103 screens + 6 SaaS modules.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => onClose()}
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#cbd5e1',
                borderRadius: '10px',
                padding: '8px 12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.8rem',
                fontWeight: 600,
                transition: 'all 0.15s ease'
              }}
            >
              <X size={16} /> Close Guide
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div style={{
          padding: '10px 28px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(15, 23, 42, 0.6)',
          display: 'flex',
          gap: '8px'
        }}>
          <button
            onClick={() => setActiveTab('catalog')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'catalog' ? 'rgba(99, 102, 241, 0.25)' : 'transparent',
              color: activeTab === 'catalog' ? '#818cf8' : '#94a3b8',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              borderBottom: activeTab === 'catalog' ? '2px solid #818cf8' : '2px solid transparent'
            }}
          >
            <Layers size={15} /> 103-Screen Directory & Catalog
          </button>

          <button
            onClick={() => setActiveTab('overview')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'overview' ? 'rgba(99, 102, 241, 0.25)' : 'transparent',
              color: activeTab === 'overview' ? '#818cf8' : '#94a3b8',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              borderBottom: activeTab === 'overview' ? '2px solid #818cf8' : '2px solid transparent'
            }}
          >
            <Sparkles size={15} /> Mental Model & Architecture
          </button>

          <button
            onClick={() => setActiveTab('personas')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'personas' ? 'rgba(99, 102, 241, 0.25)' : 'transparent',
              color: activeTab === 'personas' ? '#818cf8' : '#94a3b8',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              borderBottom: activeTab === 'personas' ? '2px solid #818cf8' : '2px solid transparent'
            }}
          >
            <Workflow size={15} /> Role-Based Workflows
          </button>

          <button
            onClick={() => setActiveTab('visa')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              background: activeTab === 'visa' ? 'rgba(99, 102, 241, 0.25)' : 'transparent',
              color: activeTab === 'visa' ? '#818cf8' : '#94a3b8',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              borderBottom: activeTab === 'visa' ? '2px solid #818cf8' : '2px solid transparent'
            }}
          >
            <Building size={15} /> Visa Inc. Enterprise Guide
          </button>
        </div>

        {/* Tab 1: Screen Catalog View */}
        {activeTab === 'catalog' && (
          <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
            {/* Left Category Filter Rail */}
            <div style={{
              width: '260px',
              borderRight: '1px solid rgba(255, 255, 255, 0.08)',
              background: 'rgba(10, 16, 30, 0.8)',
              padding: '16px 12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              overflowY: 'auto'
            }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px', paddingLeft: '8px' }}>
                Filter By Section
              </div>
              {sectionList.map(sec => {
                const Icon = sec.icon;
                const isSelected = selectedSection === sec.key;
                return (
                  <button
                    key={sec.key}
                    onClick={() => setSelectedSection(sec.key)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 10px',
                      borderRadius: '8px',
                      border: 'none',
                      background: isSelected ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
                      borderLeft: isSelected ? '3px solid #6366f1' : '3px solid transparent',
                      color: isSelected ? '#fff' : '#94a3b8',
                      cursor: 'pointer',
                      fontSize: '0.78rem',
                      fontWeight: isSelected ? 700 : 500,
                      textAlign: 'left',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Icon size={14} color={isSelected ? '#818cf8' : '#64748b'} />
                      <span>{sec.label}</span>
                    </div>
                    <span style={{
                      fontSize: '0.65rem',
                      padding: '1px 6px',
                      borderRadius: '10px',
                      background: isSelected ? '#6366f1' : 'rgba(255, 255, 255, 0.06)',
                      color: isSelected ? '#fff' : '#64748b',
                      fontWeight: 700
                    }}>
                      {sec.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right Screen Catalog List */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              {/* Search bar inside Catalog */}
              <div style={{
                padding: '14px 24px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                background: 'rgba(15, 23, 42, 0.4)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{ position: 'relative', flex: 1 }}>
                  <Search size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '10px' }} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search 103 screens by name, RFC standard, metrics, or description (e.g. POLQA, SIP, LCR, Visa, Barge, PII)..."
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '10px',
                      padding: '8px 12px 8px 38px',
                      color: '#fff',
                      fontSize: '0.85rem',
                      outline: 'none',
                      transition: 'border 0.2s ease'
                    }}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '8px',
                        background: 'transparent',
                        border: 'none',
                        color: '#94a3b8',
                        cursor: 'pointer'
                      }}
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8', whiteSpace: 'nowrap' }}>
                  Showing <strong style={{ color: '#fff' }}>{filteredScreens.length}</strong> of 103 tools
                </div>
              </div>

              {/* Cards Grid */}
              <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '20px 24px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(440px, 1fr))',
                gap: '16px',
                alignContent: 'start'
              }}>
                {filteredScreens.map(scr => (
                  <div
                    key={scr.id}
                    style={{
                      background: 'rgba(30, 41, 59, 0.4)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '12px',
                      padding: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      transition: 'all 0.2s ease',
                      position: 'relative'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
                      <div>
                        <div style={{ fontSize: '0.68rem', fontWeight: 600, color: '#818cf8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          {scr.section}
                        </div>
                        <h3 style={{ margin: '2px 0 0 0', fontSize: '0.98rem', fontWeight: 700, color: '#fff' }}>
                          {scr.name}
                        </h3>
                        <code style={{ fontSize: '0.68rem', color: '#64748b' }}>tab: {scr.id}</code>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                        <span className="badge badge-indigo" style={{ fontSize: '0.62rem', padding: '2px 6px' }}>
                          {scr.badge}
                        </span>
                        <button
                          onClick={() => {
                            if (onNavigateTab) onNavigateTab(scr.id);
                            onClose();
                          }}
                          style={{
                            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.3) 0%, rgba(6, 182, 212, 0.3) 100%)',
                            border: '1px solid rgba(99, 102, 241, 0.5)',
                            color: '#e0e7ff',
                            padding: '4px 10px',
                            borderRadius: '6px',
                            fontSize: '0.72rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          Jump to Tool <ChevronRight size={12} />
                        </button>
                      </div>
                    </div>

                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.4 }}>
                      {scr.summary}
                    </p>

                    <div style={{ background: 'rgba(0, 0, 0, 0.25)', padding: '8px 10px', borderRadius: '8px', fontSize: '0.74rem' }}>
                      <div style={{ color: '#94a3b8', marginBottom: '2px' }}>
                        <strong style={{ color: '#38bdf8' }}>When to Use:</strong> {scr.whenToUse}
                      </div>
                      <div style={{ color: '#94a3b8' }}>
                        <strong style={{ color: '#34d399' }}>Typical Action:</strong> {scr.typicalAction}
                      </div>
                    </div>

                    {scr.keyMetrics && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: 'auto' }}>
                        {scr.keyMetrics.map((met, idx) => (
                          <span
                            key={idx}
                            style={{
                              fontSize: '0.65rem',
                              padding: '2px 6px',
                              borderRadius: '4px',
                              background: 'rgba(255, 255, 255, 0.05)',
                              color: '#94a3b8',
                              border: '1px solid rgba(255, 255, 255, 0.05)'
                            }}
                          >
                            • {met}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Mental Model & Architecture */}
        {activeTab === 'overview' && (
          <div style={{ flex: 1, overflowY: 'auto', padding: '28px 36px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(6, 182, 212, 0.08) 100%)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              borderRadius: '16px',
              padding: '24px'
            }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 8px 0', color: '#fff' }}>
                The VoxPulse AI Mental Model: Why We Replace Cyara & Klearcom
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.6, margin: '0 0 16px 0' }}>
                Legacy IVR testing tools (Cyara Velocity, Klearcom, Empirix Hammer) were built 15 years ago for static DTMF tone menus and physical T1/E1 telephony lines.
                Modern enterprise contact centers have migrated to <strong>Genesys Cloud CX, Amazon Connect, Twilio, and LLM-powered conversational voicebots (Google Dialogflow CX & Gemini)</strong>.
                VoxPulse AI was built from the ground up to test modern conversational architectures with sub-millisecond precision.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '14px', borderRadius: '10px' }}>
                  <div style={{ color: '#38bdf8', fontWeight: 700, fontSize: '0.85rem', marginBottom: '4px' }}>
                    1. Telephony Agnostic
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.5 }}>
                    Connects directly to <strong>Genesys Cloud CX Edge SBCs (BYOC)</strong>, carrier SIP trunks, or public PSTN providers (Telnyx, Twilio, Bandwidth) without requiring third-party carrier subscriptions.
                  </div>
                </div>

                <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '14px', borderRadius: '10px' }}>
                  <div style={{ color: '#a78bfa', fontWeight: 700, fontSize: '0.85rem', marginBottom: '4px' }}>
                    2. Perceptual Audio DSP
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.5 }}>
                    Real-time ITU-T P.863 POLQA v3 acoustic scoring, LUFS loudness compliance (EBU R128), and RFC 4733 packet inspection identify audio degradation before customers hear it.
                  </div>
                </div>

                <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '14px', borderRadius: '10px' }}>
                  <div style={{ color: '#34d399', fontWeight: 700, fontSize: '0.85rem', marginBottom: '4px' }}>
                    3. AI-Native Simulation
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.5 }}>
                    Gemini 1.5 Pro and Flash act as autonomous caller agents who speak naturally, interrupt bots (barge-in testing), simulate diverse accents, and audit legal disclosures.
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ background: 'rgba(30, 41, 59, 0.4)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '14px', padding: '20px' }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '0.95rem', fontWeight: 700, color: '#38bdf8' }}>
                  Enterprise Telephony Routing Paths
                </h4>
                <ol style={{ paddingLeft: '20px', margin: 0, fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.6 }}>
                  <li><strong>Outbound Synthetic Probe:</strong> VoxPulse initiates an outbound SIP INVITE via Genesys BYOC Edge SBC or PSTN carrier.</li>
                  <li><strong>Carrier Interconnect:</strong> The call traverses Tier-1 fiber trunks to the terminating carrier rate center (NANPA LATA).</li>
                  <li><strong>IVR Prompt Ingestion:</strong> Inbound prompt audio is captured, decoded to 8kHz PCM, and evaluated via ITU-T P.863 POLQA.</li>
                  <li><strong>Acoustic & NLU Turn:</strong> Speech is transcribed via streaming STT, and DTMF tones or synthetic voice responses are injected.</li>
                  <li><strong>SLA & Metrics Logging:</strong> Latency percentiles (P50/P99), MOS, and SIP response codes are committed to PostgreSQL and Prometheus.</li>
                </ol>
              </div>

              <div style={{ background: 'rgba(30, 41, 59, 0.4)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '14px', padding: '20px' }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '0.95rem', fontWeight: 700, color: '#34d399' }}>
                  Security & Compliance Guarantees
                </h4>
                <ul style={{ paddingLeft: '20px', margin: 0, fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.6 }}>
                  <li><strong>Zero PAN/CVV Retention:</strong> Real-time acoustic silence muting eliminates credit card numbers from stored media.</li>
                  <li><strong>PCI-DSS Level 1 & SOC 2 Type II:</strong> End-to-end TLS 1.3 SIP signaling and SRTP media encryption.</li>
                  <li><strong>Keycloak & Visa Okta SSO:</strong> OpenID Connect (OIDC) PKCE and SAML 2.0 federation with granular RBAC permissions.</li>
                  <li><strong>Automated GDPR Shredding:</strong> Audio and transcript data is cryptographically deleted per retention rules.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Role-Based Workflows */}
        {activeTab === 'personas' && (
          <div style={{ flex: 1, overflowY: 'auto', padding: '28px 36px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: '#fff' }}>
              Persona-Based Operating Workflows
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', margin: 0 }}>
              Depending on your enterprise role, here are the primary workflows and recommended tools to use every day:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              {/* Persona 1 */}
              <div style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <Workflow size={18} color="#6366f1" />
                  <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>
                    1. Voice QA & Automation Engineer
                  </h4>
                </div>
                <p style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.5, margin: '0 0 10px 0' }}>
                  Responsible for creating, running, and maintaining automated IVR regression tests before software releases.
                </p>
                <div style={{ fontSize: '0.74rem', color: '#94a3b8', background: 'rgba(0, 0, 0, 0.25)', padding: '10px', borderRadius: '8px' }}>
                  <strong style={{ color: '#818cf8' }}>Recommended Daily Screens:</strong>
                  <div style={{ marginTop: '4px' }}>
                    • <strong>Test Flow Builder</strong> (tab: builder) - Author new test suites with regex audio assertions.<br />
                    • <strong>Automated Runner</strong> (tab: runner) - Execute batch runs across DIDs.<br />
                    • <strong>Visual Canvas Builder</strong> (tab: canvas) - Visually map complex multi-branch call trees.<br />
                    • <strong>WebRTC Live Softphone</strong> (tab: softphone) - Manually verify prompts when tests fail.
                  </div>
                </div>
              </div>

              {/* Persona 2 */}
              <div style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <Server size={18} color="#06b6d4" />
                  <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>
                    2. Telecom & Network SRE
                  </h4>
                </div>
                <p style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.5, margin: '0 0 10px 0' }}>
                  Responsible for trunk availability, SBC health, SIP packet timing, and round-the-clock voice quality SLAs.
                </p>
                <div style={{ fontSize: '0.74rem', color: '#94a3b8', background: 'rgba(0, 0, 0, 0.25)', padding: '10px', borderRadius: '8px' }}>
                  <strong style={{ color: '#06b6d4' }}>Recommended Daily Screens:</strong>
                  <div style={{ marginTop: '4px' }}>
                    • <strong>24/7 Synthetic Cron Scheduler</strong> (tab: cronscheduler) - Continuous polling every 5 minutes.<br />
                    • <strong>SIP Protocol Diagnostics</strong> (tab: sip) - Inspect SIP ladder diagrams and INVITE/BYE traces.<br />
                    • <strong>SIP SBC Failover Tester</strong> (tab: failover) - Verify Ashburn/Dallas high availability.<br />
                    • <strong>SIP PCAP Packet Trace</strong> (tab: pcap) - Wireshark-compatible packet forensics.
                  </div>
                </div>
              </div>

              {/* Persona 3 */}
              <div style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <Bot size={18} color="#10b981" />
                  <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>
                    3. Contact Center Architect (Genesys Cloud CX)
                  </h4>
                </div>
                <p style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.5, margin: '0 0 10px 0' }}>
                  Responsible for customer journey optimization, voicebot containment, queue staffing, and NLU accuracy.
                </p>
                <div style={{ fontSize: '0.74rem', color: '#94a3b8', background: 'rgba(0, 0, 0, 0.25)', padding: '10px', borderRadius: '8px' }}>
                  <strong style={{ color: '#34d399' }}>Recommended Daily Screens:</strong>
                  <div style={{ marginTop: '4px' }}>
                    • <strong>Voicebot AI Studio</strong> (tab: voicebot) - Test conversational turns with Gemini & Dialogflow.<br />
                    • <strong>Voicebot Barge-In Test</strong> (tab: bargein) - Measure interruption mute responsiveness (&lt;400ms).<br />
                    • <strong>Erlang C SLA Predictor</strong> (tab: erlang) - Forecast required agent headcount for 80/20 SLA.<br />
                    • <strong>Agent CTI Screen Pop</strong> (tab: screenpop) - Ensure customer data reaches CRM in &lt;800ms.
                  </div>
                </div>
              </div>

              {/* Persona 4 */}
              <div style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <DollarSign size={18} color="#f59e0b" />
                  <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>
                    4. Telecom Finance & Procurement
                  </h4>
                </div>
                <p style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.5, margin: '0 0 10px 0' }}>
                  Responsible for telecom budget optimization, Least Cost Routing (LCR), carrier overbilling audits, and vendor ROI.
                </p>
                <div style={{ fontSize: '0.74rem', color: '#94a3b8', background: 'rgba(0, 0, 0, 0.25)', padding: '10px', borderRadius: '8px' }}>
                  <strong style={{ color: '#fbbf24' }}>Recommended Daily Screens:</strong>
                  <div style={{ marginTop: '4px' }}>
                    • <strong>Carrier LCR Savings Calc</strong> (tab: lcrsavings) - Quantify $146k+/year carrier cost reduction.<br />
                    • <strong>Toll-Free Billing Auditor</strong> (tab: billing) - Match carrier invoices against actual test minutes.<br />
                    • <strong>Klearcom Migration & ROI</strong> (tab: klearcom) - Prove 65% cost savings vs Klearcom/Cyara.<br />
                    • <strong>Executive SLA PDF Exporter</strong> (tab: execpdfexporter) - Download boardroom-ready reports.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Visa Inc. Enterprise Guide */}
        {activeTab === 'visa' && (
          <div style={{ flex: 1, overflowY: 'auto', padding: '28px 36px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.3) 0%, rgba(15, 23, 42, 0.8) 100%)',
              border: '1px solid rgba(59, 130, 246, 0.4)',
              borderRadius: '16px',
              padding: '24px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                <Building size={24} color="#60a5fa" />
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>
                  Visa Inc. Global Telephony Architecture & Test Configuration
                </h3>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
                This workspace is pre-configured for <strong>Visa Inc. (org_visa_inc)</strong> with custom enterprise SSO, Genesys Cloud CX BYOC integration, Ashburn Edge SBC trunks, and pre-seeded test suites for Visa's primary global hotlines.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              <div style={{ background: 'rgba(30, 41, 59, 0.4)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '16px' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#60a5fa', textTransform: 'uppercase' }}>
                  1. Pre-Provisioned DIDs
                </div>
                <div style={{ marginTop: '8px', fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                  • <strong>+1-800-847-2911</strong>: Global Cardholder Support<br />
                  • <strong>+1-800-252-4370</strong>: Card Activation Hotline<br />
                  • <strong>+1-800-523-4116</strong>: Fraud & Dispute Resolution<br />
                  • <strong>+44-20-7946-0199</strong>: London Visa Direct Peering
                </div>
              </div>

              <div style={{ background: 'rgba(30, 41, 59, 0.4)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '16px' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#34d399', textTransform: 'uppercase' }}>
                  2. Genesys BYOC Edge SBCs
                </div>
                <div style={{ marginTop: '8px', fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                  • <strong>Primary Trunk:</strong> `sbc-ashburn-01.visa.com` (US-East-4)<br />
                  • <strong>Secondary Trunk:</strong> `sbc-frankfurt-01.visa.com` (EU-West-3)<br />
                  • <strong>Signaling:</strong> TLS 1.3 / Port 5061<br />
                  • <strong>Media:</strong> SRTP AES-256 GCM
                </div>
              </div>

              <div style={{ background: 'rgba(30, 41, 59, 0.4)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '16px' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#a78bfa', textTransform: 'uppercase' }}>
                  3. Enterprise SSO & RBAC
                </div>
                <div style={{ marginTop: '8px', fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                  • <strong>IdP:</strong> Visa Okta / PingFederate SAML 2.0<br />
                  • <strong>Domain Detection:</strong> `@visa.com`<br />
                  • <strong>Enforced Roles:</strong> VP Telecom, Contact Center Director, Lead SRE, Security Auditor
                </div>
              </div>
            </div>

            <div style={{ background: 'rgba(30, 41, 59, 0.4)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '18px' }}>
              <h4 style={{ margin: '0 0 10px 0', fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>
                PCI-DSS Level 1 Verification Protocol for Visa
              </h4>
              <p style={{ fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
                When running automated test suites on Visa customer DIDs, VoxPulse activates the <strong>Call Audio PII Redactor</strong> (tab: redactor).
                Whenever a test script injects a test PAN (e.g. `4111 1111 1111 1111`) or 3-digit CVV, the audio engine automatically substitutes the waveform with a 400Hz privacy tone.
                Transcripts are sanitized in-flight, ensuring 100% compliance with Visa Global Security Standards.
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{
          padding: '14px 28px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'rgba(15, 23, 42, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.75rem',
          color: '#94a3b8'
        }}>
          <div>
            Need offline reference? Check <strong style={{ color: '#fff' }}>docs/10_COMPREHENSIVE_PLATFORM_USER_GUIDE_AND_SCREEN_CATALOG.md</strong>
          </div>
          <div>
            VoxPulse AI Enterprise Edition • 103 Navigation Screens • 100% Test Coverage
          </div>
        </div>
      </div>
    </div>
  );
}
