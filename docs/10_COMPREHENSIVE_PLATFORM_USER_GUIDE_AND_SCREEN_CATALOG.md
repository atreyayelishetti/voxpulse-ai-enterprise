# VoxPulse AI Enterprise Platform User Guide & 103-Screen Catalog
**Document ID:** `DOC-10-VOXPULSE-USER-GUIDE-AND-SCREEN-CATALOG`  
**Version:** `2.5.0-Enterprise`  
**Classification:** `Enterprise Customer Facing & Technical Manual`  
**Target Enterprise Client:** `Visa Inc. & Tier-1 Global Financial Services`  
**Compliance Standards:** `PCI-DSS v4.0 Level 1, SOC 2 Type II, ISO 27001, ITU-T P.863 POLQA v3, RFC 3261 SIP, RFC 4733 DTMF, Kari's Law / RAY BAUM'S Act`

---

## 1. Executive Summary & Mental Model

### 1.1 Why VoxPulse AI Replaces Cyara, Klearcom, and Empirix Hammer
For over a decade, enterprise contact centers running on legacy telephony relied on first-generation IVR testing tools: **Cyara Velocity, Klearcom, and Empirix Hammer**. While these legacy platforms pioneered automated dialing, they were engineered for an obsolete era of static Dual-Tone Multi-Frequency (DTMF) menus, rigid T1/E1 circuit lines, and on-premises PBXs.

Modern enterprises—led by global financial giants like **Visa Inc.**—have transformed their contact centers into dynamic, conversational environments powered by **Genesys Cloud CX, Google Dialogflow CX, and LLM-driven voicebots (Gemini 1.5 Pro/Flash)**.

| Capability / Benchmark | Legacy Tools (Cyara / Klearcom / Hammer) | VoxPulse AI Enterprise Suite |
| :--- | :--- | :--- |
| **Acoustic Audio Scoring** | PESQ (P.862) legacy only (narrowband 8kHz) | **ITU-T P.863 POLQA v3** wideband/fullband with sub-packet DSP |
| **Conversational Voicebot Testing** | Rigid DTMF timers; cannot test natural speech interruption | **Sub-400ms Barge-In Latency & Context Pivot Testing** |
| **Telephony Integration** | Mandates buying expensive proprietary carrier minutes | **Genesys Cloud BYOC, Edge SBCs, Direct SIP, or Twilio/Telnyx** |
| **AI Root Cause Analysis** | Generic "Call Dropped" or "Prompt Mismatch" logs | **Gemini 1.5 Automated RCA with corrective telecom advice** |
| **PCI-DSS Level 1 Compliance** | Manual audio masking or risky raw audio storage | **Real-Time Acoustic Muting & In-Flight PAN/CVV Redaction** |
| **Enterprise Total Cost of Ownership (TCO)** | $250,000 – $450,000 / year with per-port licensing | **$48,000 – $72,000 / year (65% to 80% Cost Reduction)** |

### 1.2 The Platform Mental Model
VoxPulse AI operates on a clean, tripartite architectural foundation:

```
+-----------------------------------------------------------------------------------+
|                           VOXPULSE AI ENTERPRISE SUITE                           |
+-----------------------------------------------------------------------------------+
|  1. TELEPHONY & SIGNALING INGESTION                                               |
|     - Genesys Cloud CX BYOC Edge SBCs (Ashburn, VA & Frankfurt, DE)               |
|     - RFC 3261 SIP Signaling (TLS 1.3 / SRTP AES-256 Media Encryption)            |
|     - WebRTC Browser Softphone (Opus Codec, SCTP DataChannels)                    |
|     - Public Carrier Interconnect (Telnyx, Twilio, Bandwidth, Lumen, AT&T)        |
+-----------------------------------------------------------------------------------+
                                         │
                                         ▼
+-----------------------------------------------------------------------------------+
|  2. PERCEPTUAL ACOUSTIC DSP & QUALITY ENGINE                                      |
|     - ITU-T P.863 POLQA v3 Acoustic Modeling (1.0 to 5.0 MOS)                     |
|     - RFC 4733 / RFC 2833 Out-of-Band DTMF Telephony Event Sniffing (PT-101)      |
|     - EBU R128 LUFS Loudness Normalization & 2048-Point Real-Time FFT Spectrogram  |
|     - Adaptive RTP Jitter Buffer Simulator & Acoustic Echo Cancellation (ERLE)    |
+-----------------------------------------------------------------------------------+
                                         │
                                         ▼
+-----------------------------------------------------------------------------------+
|  3. AI-NATIVE SIMULATION, NLU & COMPLIANCE INTELLIGENCE                          |
|     - Google Gemini 1.5 Pro & Flash Autonomous Caller Simulation                  |
|     - Multi-Engine Streaming STT Benchmark Matrix (Google, Whisper, Deepgram)     |
|     - PCI-DSS Zero-Storage PAN/CVV Real-Time Audio Silence Redactor               |
|     - Least Cost Routing (LCR) Engine ($146,700/year validated savings)           |
+-----------------------------------------------------------------------------------+
```

---

## 2. Navigating the Platform: 8 Organized Sidebar Sections

To provide immediate clarity across the **103 specialized tools**, the VoxPulse AI navigation sidebar is organized into **8 intuitive functional domains**:

1. **🎙️ Core Voice & Testing Studio (8 tools):** Day-to-day testing console, WebRTC softphone, voicebot sandbox, visual canvas builder, and global DID directory.
2. **⚡ Automation, Load & Stress Engine (9 tools):** Repeatable regression test suites, batch automated runner, 24/7 cron polling, high-concurrency PSTN load tests, and chaos injection.
3. **🎧 Audio Quality, DSP & POLQA Analysis (17 tools):** Industry-standard ITU-T P.863 POLQA scores, 3D MOS mapping, jitter buffers, loudness normalization, and STT phoneme benchmarking.
4. **🌐 SIP Signaling & Carrier Protocols (20 tools):** Deep SIP ladder diagrams, Edge SBC failover verification, Wireshark-compatible PCAP traces, TLS 1.3/SRTP audits, and RFC 3261 timers.
5. **💰 Carrier Routing, LCR & Telecom Billing (9 tools):** Least Cost Routing (LCR) engine, annualized telecom ROI calculators, carrier SLA scorecards, and toll-free billing reconciliation.
6. **🛡️ Regulatory, PCI & Security (11 tools):** PCI-DSS Level 1 compliance audits, real-time PII audio redactor, STIR/SHAKEN caller ID attestation, E911 Kari's Law validation, and voice biometrics.
7. **🤖 AI Studio & NLU Intelligence (12 tools):** Gemini 1.5 Pro prompt engineering, AI Agent Combat Arena, barge-in recovery, NLU confidence heatmaps, and post-call CSAT prediction.
8. **📊 Executive Dashboards & ROI (17 tools):** Single-pane-of-glass 104-module status, Klearcom/Cyara migration comparison, boardroom PDF export, CTI screen pops, and Erlang C queue sizing.

---

## 3. End-to-End Practitioner Workflows

### Workflow A: Onboarding Genesys Cloud CX Telephony (Visa Target)
1. **Navigate to Genesys Cloud Integration (`tab: genesys`):** Open the Genesys configuration portal from the top navigation bar.
2. **Input Client Credentials:** Enter the OAuth Client ID and Secret generated in Genesys Cloud Admin (`Admin > Integrations > OAuth`).
3. **Select Genesys AWS Region:** Pick `US East (N. Virginia) (mypurecloud.com)` for primary North American traffic.
4. **Discover Architect Flows:** Click **"Test Connection & Discover Flows"**. VoxPulse automatically queries the Genesys REST API and populates inbound Architect flows (e.g. `Visa_Cardholder_Support_Inbound_v4`, `Visa_Lost_Stolen_Fraud_Escalation`).
5. **Map Edge SBC Trunks:** Select BYOC Cloud Trunks linking to Visa Ashburn SBC (`sbc-ashburn-01.visa.com:5061;transport=tls`).
6. **Verify Audio Path:** Launch the **WebRTC Live Softphone (`tab: softphone`)** and dial `+18008472911` to audition prompt audio directly through the browser.

### Workflow B: Authoring & Scheduling 24/7 Automated Regression Tests
1. **Open Test Flow Builder (`tab: builder`):** Choose an existing preset (e.g., *"Visa Card Activation Flow"*) or create a new test suite from scratch.
2. **Define Test Steps:**
   - Step 1: `DIAL` destination number `+18002524370`.
   - Step 2: `EXPECT_PROMPT` regex `.*welcome to visa card activation.*`.
   - Step 3: `SEND_DTMF` digits `1` (English).
   - Step 4: `EXPECT_PROMPT` regex `.*enter your 16-digit card number.*`.
   - Step 5: `SEND_DTMF` digits `4111111111111111` (Test PAN).
   - Step 6: `VERIFY_POLQA` minimum MOS >= `4.0`.
3. **Execute Immediate Run (`tab: runner`):** Click **"Run Selected Suite"** to verify that the flow passes cleanly with zero errors.
4. **Schedule 24/7 Monitoring (`tab: cronscheduler`):**
   - Click **"Add Schedule"**.
   - Set Cron Expression to `*/10 * * * *` (polls every 10 minutes, 24/7).
   - Select Target DID `+18002524370`.
   - Bind Escalation Policy to notify PagerDuty and Slack if 2 consecutive runs fail.

### Workflow C: Diagnosing Carrier Audio Quality Degradation & Outages
1. **Alert Received:** A webhook or Slack alert notifies the NOC of a MOS drop on transatlantic calls.
2. **Inspect Global Latency Heatmap (`tab: heatmap`):** View worldwide round-trip latency to identify regional bottlenecks (e.g. Frankfurt POP showing 280ms PDD).
3. **Examine POLQA & PESQ Analyzer (`tab: polqa`):** Inspect ITU-T P.863 degradation factors: attenuation, delay warp, and packet loss jitter penalties.
4. **Trigger SIP SBC Failover (`tab: failover`):** Test shifting traffic from primary Edge SBC (`sbc-ashburn-01`) to backup Edge SBC (`sbc-frankfurt-01`) with zero dropped calls.
5. **Verify Carrier SLA Scorecard (`tab: scorecard`):** Review carrier grades (Telnyx A+, Twilio B, Carrier X C-) and claim contractual SLA outage credits.

---

## 4. Role-Based Operating Playbooks

### 4.1 Voice QA Automation Engineer
- **Mission:** Guarantee 100% IVR feature coverage and prevent audio prompt regressions before software deployments.
- **Daily Screens:**
  - [`Test Flow Builder` (tab: builder)](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/TestSuiteBuilder.jsx): Define multi-step audio and DTMF test suites.
  - [`Automated Runner` (tab: runner)](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/AutomatedRunner.jsx): Batch execute regression suites across hundreds of DIDs.
  - [`No-Code Canvas Builder` (tab: canvas)](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/VisualCanvasBuilder.jsx): Visually diagram complex tree logic for product managers.
  - [`WebRTC Live Softphone` (tab: softphone)](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/WebRTCSoftphone.jsx): Audition audio prompts and verify microphone input in-browser.

### 4.2 Telecom & Network SRE
- **Mission:** Uphold 99.999% telephony availability, eliminate trunk jitter, and ensure instantaneous SBC failover.
- **Daily Screens:**
  - [`24/7 Synthetic Cron Scheduler` (tab: cronscheduler)](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/SyntheticCronScheduler.jsx): Maintain continuous heartbeat polling on all toll-free lines.
  - [`SIP Protocol Diagnostics` (tab: sip)](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/SIPDiagnostics.jsx): Inspect full SIP signaling ladders (INVITE, 180 Ringing, 200 OK, BYE).
  - [`SIP SBC Failover Tester` (tab: failover)](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/SIPTrunkFailoverTester.jsx): Validate high-availability SBC switchovers under load.
  - [`SIP PCAP Packet Trace` (tab: pcap)](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/SIPRecordingPlayer.jsx): Analyze Wireshark-compatible packet captures and RTP streams.

### 4.3 Contact Center Architect (Genesys Cloud CX)
- **Mission:** Maximize voicebot self-service containment, optimize queue wait times, and perfect barge-in timing.
- **Daily Screens:**
  - [`Voicebot AI Studio` (tab: voicebot)](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/VoicebotStudio.jsx): Test conversational turn-taking with Gemini and Dialogflow CX.
  - [`Voicebot Barge-In Test` (tab: bargein)](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/VoiceBotBargeInBenchmark.jsx): Enforce sub-400ms prompt muting when users speak.
  - [`Erlang C SLA Predictor` (tab: erlang)](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/CallCenterQueuePredictor.jsx): Model agent headcount required to meet 80/20 service level goals.
  - [`Agent CTI Screen Pop` (tab: screenpop)](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/AgentCTIScreenPopLatency.jsx): Ensure customer account CAD data lands in CRM before call answer.

### 4.4 Regulatory, Security & PCI Auditor
- **Mission:** Enforce zero-PAN storage, verify TLS 1.3 / SRTP media encryption, and validate Kari's Law E911 compliance.
- **Daily Screens:**
  - [`Compliance & PCI Auditor` (tab: compliance)](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/ComplianceAuditor.jsx): Generate signed PCI-DSS Attestation of Compliance (AoC) reports.
  - [`Call Audio PII Redactor` (tab: redactor)](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/AudioPIIRedactor.jsx): Ensure real-time silence tones replace cardholder data.
  - [`STIR/SHAKEN Attestation` (tab: stirshaken)](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/TelecomRegulatorySTIRSHAKEN.jsx): Verify Level A caller ID cryptographic certificates.
  - [`E911 PSAP Address Check` (tab: e911)](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/EmergencyE911AddressValidator.jsx): Validate dispatchable building and room data against MSAG databases.

### 4.5 Telecom Finance & Procurement Executive
- **Mission:** Eliminate carrier overbilling, optimize Least Cost Routing (LCR), and prove 65%+ ROI over Klearcom.
- **Daily Screens:**
  - [`Carrier LCR Savings Calc` (tab: lcrsavings)](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/CarrierLCRSavingsCalc.jsx): Calculate annualized enterprise savings ($146k+/year).
  - [`Toll-Free Billing Auditor` (tab: billing)](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/TollFreeBillingAuditor.jsx): Audit carrier invoices against synthetic CDR durations.
  - [`Klearcom Migration & ROI` (tab: klearcom)](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/KlearcomROI.jsx): Present migration savings and feature parity decks to leadership.
  - [`Executive SLA PDF Exporter` (tab: execpdfexporter)](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/ExecutiveSlaPdfExporter.jsx): Produce boardroom-ready compliance and SLA reports.

---

## 5. Comprehensive 103-Screen Directory & Catalog

Below is the definitive catalog detailing all 103 screens within the VoxPulse AI platform, organized by section:

### SECTION 1: Core Voice & Testing Studio (8 screens)
| Tab ID | Screen Name | Badge | Purpose & Value | When to Use It | Key Metrics & Indicators | Typical User Action |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `console` | **Live Call Console** | `Realtime` | Live telemetry dashboard for active synthetic & inbound voice calls. | Observing active calls in flight, watching DTMF tones emit, and inspecting audio packet flow. | Call Duration, Real-Time Packet Loss, Jitter (ms), Current MOS Score. | Select a phone number, click "Initiate Test Call", and watch real-time DTMF tones and audio waveform telemetry. |
| `softphone` | **WebRTC Live Softphone** | `Browser Mic` | In-browser WebRTC softphone permitting engineers to speak directly to the IVR or listen in real-time. | Manually verifying IVR audio prompts, testing microphone input, or interacting with voicebots without physical desk phones. | WebRTC RTT, Opus Audio Codec Bitrate, Audio Input Level (dB). | Dial any enterprise DID (e.g. +1-800-VISA-911), unmute your browser mic, and speak voice commands directly to the bot. |
| `voicebot` | **Voicebot AI Studio** | `Dialogflow/Gemini` | Interactive AI voicebot sandbox evaluating conversational turns, barge-in latencies, and intent recognition. | Tuning conversational IVR agents, testing natural language customer queries, and evaluating intent fallbacks. | Barge-In Latency (<400ms target), Intent Match Confidence (%), Turn Latency (ms). | Simulate user speech such as "I want to report card fraud", view intent extraction, and check LLM prompt response latency. |
| `canvas` | **No-Code Canvas Builder** | `Visual` | Drag-and-drop node graph builder for constructing multi-step automated IVR traversal journeys. | Creating end-to-end regression test scenarios without writing code (dial -> wait for prompt -> press 1 -> verify speech -> transfer). | Node Count, Branch Coverage (%), Validation Status. | Drag a "Dial Number" node, connect it to "Expect Prompt", add a "Send DTMF" branch, and click "Export to Test Suite". |
| `did` | **Global DID Pool** | `100+ DIDs` | Centralized registry of toll-free, local, and international test telephone numbers across 25+ countries. | Managing enterprise phone inventories, configuring Genesys Cloud BYOC trunks, or verifying inbound carrier routing. | Active DIDs Count, Carrier Allocation (Telnyx, Twilio, Genesys BYOC), SLA Status. | Filter numbers by organization (e.g., Visa Inc.), inspect assigned carriers, and trigger instant health pings. |
| `discovery` | **IVR Tree Discovery** | `AI Crawler` | Autonomous AI crawler that calls any phone number, listens to audio prompts, and dynamically maps the entire IVR tree. | Onboarding legacy IVRs with missing architecture diagrams or auditing undocumented menus. | Nodes Discovered, Max Depth Reached, Audio Prompts Transcribed. | Input a customer service DID, configure max crawl depth (e.g. 3 levels), and let the AI crawler map every menu option. |
| `branching` | **IVR Drop-off Graph** | `Heatmap` | Visual flow diagram showing customer drop-offs and test failure bottlenecks across IVR menu branches. | Diagnosing why callers abandon specific queues or identifying broken menu options. | Drop-off Rate (%), Average Queue Dwell Time, Abandonment Count. | Review high-drop nodes highlighted in red, inspect user utterance failures, and trigger targeted regression tests. |
| `replay` | **IVR Session Replay Path** | `DTMF Path` | Interactive breadcrumb timeline replaying the exact path, DTMF tones, and audio prompts of any historic call. | Investigating customer escalation tickets or debugging a failed automated test run. | Step-by-Step Dwell Times, DTMF Digit Timing (ms), Prompt Match Accuracy. | Click a historical call session, click "Play Path", and step through each menu decision made during the call. |

### SECTION 2: Automation & Load Probes (9 screens)
| Tab ID | Screen Name | Badge | Purpose & Value | When to Use It | Key Metrics & Indicators | Typical User Action |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `builder` | **Test Flow Builder** | `YAML / JSON` | Structured test suite authoring interface for defining test assertions, regex audio checks, and SLA thresholds. | Creating repeatable QA test cases for CI/CD pipelines (card activation, emergency routing, PIN reset). | Total Test Suites, Assertion Rules, Expected Audio Matches. | Select a Visa test preset (e.g. "Visa Card Activation Flow"), customize expected prompts, and save to active suites. |
| `runner` | **Automated Runner** | `Continuous` | Batch execution engine running automated test suites sequentially or concurrently with instant pass/fail telemetry. | Scheduled smoke tests, post-deployment sanity checks, or on-demand regression runs. | Pass Rate (%), Execution Duration (s), Failed Step Log. | Select suites to execute, click "Run All Automated Tests", and monitor real-time test progress and root-cause logs. |
| `cronscheduler` | **24/7 Synthetic Cron Scheduler** | `24/7 Polling` | Enterprise cron scheduler continuously dialing IVR numbers at periodic intervals (e.g. every 5 mins) to verify uptime. | Detecting silent outages, carrier trunk drops, and voicebot failures before end-users notice. | Schedule Frequency (Cron), Next Run Countdown, Consecutive Failure Count. | Set schedule "*/15 * * * *" for Visa Cardholder Support (+18008472911), link PagerDuty escalation, and toggle active. |
| `load` | **PSTN Load Testing** | `Stress` | High-concurrency PSTN stress testing engine initiating 5 to 500+ simultaneous phone calls to evaluate trunk capacity. | Before major peak volume events (Black Friday, card reissue campaigns) to test edge SBC limits. | Concurrent Channels, Call Completion Rate (%), SIP 503 Rate. | Slide concurrency to 25 channels, target Genesys Edge SBC, run a 60-second stress test, and inspect trunk saturation. |
| `bursting` | **SIP Channel Bursting** | `Surge Trunk` | Surge traffic simulator testing automatic trunk burst elasticity and carrier overflow routing. | Evaluating whether your carrier contract or SBC automatically allocates overflow channels during unexpected traffic spikes. | Burst Capacity Utilization (%), Overflow Trunk Latency, Call Rejection Ratio. | Simulate a 300% traffic surge within a 10-second window to verify carrier failover to secondary SBCs. |
| `chaos` | **IVR Chaos Studio** | `Fault Inject` | Chaos engineering tool injecting deliberate network faults (packet drop, jitter spikes, silent audio, DTMF bounce). | Validating system resilience and ensuring agents gracefully recover from degraded network conditions. | Fault Injection Type, Call Recovery Rate (%), Agent Timeout Handling. | Inject 250ms simulated RTP jitter and 15% packet loss on active calls to verify adaptive jitter buffer resilience. |
| `emergency` | **24/7 Emergency Monitor** | `Outage` | Mission-critical outage dashboard monitoring Tier-1 emergency lines with instant PagerDuty and Slack alerts. | 24/7 NOC monitoring of high-priority hotlines (Visa Fraud Emergency, E911 dispatch lines). | Service Uptime (%), Average Answer Delay (s), Emergency Status (GREEN/YELLOW/RED). | Review active alerts, trigger emergency health probes, and configure automated failover policies. |
| `probes` | **Global Probe Orchestrator** | `LRN Lookup` | Distributed telecom probe management distributing synthetic calls across multi-region edge servers worldwide. | Testing local dial-in quality from specific geographic regions (North America, Europe, APAC, Latin America). | Probe Geographic POPs, Regional Round-Trip Latency, Local Routing Number (LRN) Accuracy. | Select probes in Ashburn, London, Frankfurt, and Tokyo to run simultaneous inbound calls to global support numbers. |
| `omnichannel` | **Omnichannel Agent Tester** | `Callback` | End-to-end testing of customer journeys across Voice, SMS verification, Web Chat, and Scheduled Callbacks. | Verifying that voice calls properly trigger SMS OTPs, email confirmations, or queue scheduled callbacks. | Cross-Channel Hand-off Time (s), SMS Delivery Rate (%), Callback Queue Precision. | Trigger a simulated voice call requesting an SMS transaction link and verify the incoming SMS payload. |

### SECTION 3: Audio Quality & POLQA DSP (17 screens)
| Tab ID | Screen Name | Badge | Purpose & Value | When to Use It | Key Metrics & Indicators | Typical User Action |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `polqa` | **POLQA & PESQ Analyzer** | `ITU-T P.863` | Industry standard ITU-T P.863 POLQA v3 acoustic analysis engine calculating objective Mean Opinion Scores (MOS). | Measuring acoustic speech fidelity, detecting codec degradation, and enforcing carrier audio quality SLAs. | POLQA MOS (1.0 - 5.0), PESQ MOS, Attenuation (dB), Delay Warp (ms). | Upload a reference audio prompt and degraded sample to generate ITU-T P.863 MOS and perceptual degradation breakdown. |
| `mos3d` | **Spatial 3D MOS Map** | `Global MOS` | Three-dimensional geospatial globe visualizing voice quality MOS scores across worldwide carrier termination points. | Detecting regional telecom degradations (e.g. low MOS in EMEA vs high MOS in US East). | Global Average MOS, Regional Outlier Density, PSTN vs VoIP Quality Divergence. | Rotate the 3D globe to inspect Ashburn, London, and Tokyo carrier termination nodes. |
| `mosalarms` | **Realtime MOS Alarms** | `SLA Alarms` | Configurable alerting threshold system alerting engineers when voice quality drops below SLA criteria (MOS < 3.8). | Enforcing strict quality guarantees with telecom providers and triggering automatic carrier rerouting. | Alarm Threshold (MOS), Trigger Count, Incident Auto-Resolution Time. | Set MOS warning threshold to 4.0 and critical threshold to 3.5, and bind webhook alerts. |
| `degradation` | **Audio Noise & Codec Studio** | `PSTN Jitter` | Acoustic DSP laboratory simulating PSTN background noise (street, cafeteria, car, wind) and codec re-compression. | Testing voicebot speech recognition accuracy in noisy real-world mobile environments. | Signal-to-Noise Ratio (SNR dB), Codec Type (G.711u, G.729, Opus), Simulated Packet Loss (%). | Select "Highway Traffic Noise (15dB SNR)" and test whether Gemini Voicebot correctly parses credit card digits. |
| `jitterbuffer` | **RTP Jitter Buffer Sim** | `Adaptive` | RTP packet simulator evaluating fixed vs adaptive jitter buffer sizing, packet concealment, and buffer underruns. | Debugging choppy audio, robotic voice artifacts, or excessive buffering delay in SIP trunks. | Buffer Size (ms), Buffer Underruns / Overruns, Concealment Events. | Adjust the jitter buffer slider from 20ms to 120ms and listen to the real-time synthesized audio result. |
| `aec` | **Echo Cancellation AEC** | `ERLE Loss` | Acoustic Echo Cancellation (AEC) diagnostic analyzing Echo Return Loss Enhancement (ERLE) and double-talk attenuation. | Callers complaining about hearing their own voice echoed or voicebots falsely triggering on their own speech. | ERLE (dB), Double-Talk Convergence Time (ms), Residual Echo Level. | Run echo analysis on a test call and verify that ERLE exceeds the recommended 35dB threshold. |
| `lufs` | **LUFS Volume Normalizer** | `EBU R128` | Broadcast-standard EBU R128 audio loudness analyzer calculating integrated LUFS, loudness range, and true-peak. | Preventing volume jumps between different IVR prompts, third-party announcements, and live human transfers. | Integrated Loudness (-16 to -23 LUFS), True-Peak (dBFS), Loudness Range (LU). | Upload IVR prompt files and click "Auto-Normalize to EBU R128 (-16 LUFS)" for consistent volume. |
| `fft` | **FFT Audio Spectrum** | `FFT 2048` | Real-time 2048-point Fast Fourier Transform (FFT) spectrogram visualizing audio frequency distribution. | Identifying 60Hz electrical hums, high-frequency clipping, DTMF leakage, and codec bandpass cutoffs. | Peak Frequency (Hz), Spectral Flatness, PSTN Bandpass Cutoff (300Hz - 3400Hz). | Inspect the live FFT spectrum during call playback to detect unwanted background noise. |
| `silence` | **Dead Air Silence Marker** | `Gap Marker` | Audio forensic analyzer scanning recordings for prolonged dead air or frozen IVR application states. | Identifying slow database queries causing IVR delays or customer hesitation during payment prompts. | Dead Air Duration (s), Silence Threshold (-45 dBFS), Dead Air Frequency (%). | Scan recent call logs for silence intervals > 4.0 seconds and map them to underlying backend API calls. |
| `transcoder` | **G.711u to Opus Codec** | `Wideband` | Real-time VoIP codec transcoder converting narrowband G.711u (8kHz) to wideband Opus (48kHz) with audio upsampling. | Bridging legacy PSTN phone calls into modern AI speech models that require high-fidelity audio. | Transcoding Latency (ms), CPU Utilization (%), Resampling Harmonic Distortion (THD). | Toggle transcoding on a test stream and observe the improved STT transcription accuracy. |
| `promptconverter` | **Voice Prompt Transcoder** | `G.711u` | Batch audio utility formatting studio recordings to telco-compliant G.711u / G.711a 8000Hz 8-bit mono WAV files. | Before uploading audio prompts to Genesys Cloud Architect, Asterisk, or Cisco IVRs to prevent distortion. | Output Format (CCITT u-law), Sample Rate (8000 Hz), Header Alignment (RIFF/WAVE). | Drop any MP3 or 44.1kHz WAV file to instantly transcode it into Genesys-certified telco format. |
| `ssml` | **Neural SSML Voice Studio** | `Neural TTS` | Advanced Speech Synthesis Markup Language (SSML) editor with real-time audio auditioning across 50+ neural voices. | Authoring natural-sounding synthetic prompts, adding pauses, emphasis, or pronunciation tags for brand names. | SSML Syntax Validity, Audio Duration (ms), Phoneme Accuracy. | Type SSML tags like `<say-as interpret-as="digits">1234</say-as>`, click "Audition Voice", and export audio. |
| `dtmfsniffer` | **RFC 4733 DTMF Sniffer** | `PT-101` | Deep packet inspection capturing out-of-band RFC 4733 / RFC 2833 telephone-event packets and in-band dual tones. | Debugging IVR menu navigation failures where DTMF presses are ignored or double-counted. | RTP Payload Type (PT-101), Tone Duration (ms), Inter-Digit Pause (ms), End-of-Event Bit Verification. | Verify that DTMF tones sent by VoxPulse match RFC 4733 specs with minimum 100ms duration. |
| `bargein` | **Voicebot Barge-In Test** | `Mute Latency` | Specialized testing rig measuring how quickly a voicebot mutes its prompt when a user starts speaking over it. | Optimizing conversational flow to ensure bots stop talking promptly (< 400ms) upon user interruption. | Barge-In Mute Delay (ms), False Cut-off Rate (%), Voice Activity Detection (VAD) Sensitivity. | Simulate speech interruption at t=2.4s and verify that prompt audio drops to zero within 320ms. |
| `sttradar` | **Streaming STT Radar** | `TTFT Stream` | Real-time telemetry monitor tracking Time to First Transcript (TTFT) and partial vs final speech recognition tokens. | Tuning streaming WebSocket STT engines for conversational responsiveness. | TTFT (Time to First Token ms), Partial Transcript Frequency, Final Transcript Confidence. | Stream audio into STT and monitor real-time token arrival latency on the radar graph. |
| `benchmarks` | **Multi-Engine STT Matrix** | `STT Accuracy` | Side-by-side benchmarking matrix comparing Word Error Rate (WER) across Google Cloud STT, Whisper, and Deepgram. | Choosing the most cost-effective and accurate speech engine for enterprise telephony. | Word Error Rate (WER %), Cost per Minute ($), Processing Speed (Real-Time Factor RTF). | Play a standard audio corpus through all engines simultaneously and compare transcription diffs. |
| `confusion` | **STT Confusion Matrix** | `Phonemes` | Phonetic confusion matrix identifying frequently misrecognized words and phonemes ("Visa" vs "Vicer"). | Curating custom speech vocabulary and phrase hints for high-frequency domain terms. | Phonetic Distance, Top Substitution Pairs, Acoustic Model Bias. | Identify confused financial terminology and click "Add to Custom Acoustic Vocabulary". |

### SECTION 4: SIP Signaling & Protocols (20 screens)
| Tab ID | Screen Name | Badge | Purpose & Value | When to Use It | Key Metrics & Indicators | Typical User Action |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `sip` | **SIP Protocol Diagnostics** | `Server` | Comprehensive SIP signaling ladder diagram displaying all SIP messages (INVITE, 100, 180, 200 OK, ACK, BYE). | Troubleshooting failed call setups, 4xx/5xx SIP error responses, or session establishment timeouts. | Call-ID, Session Setup Time (ms), Final SIP Response Code (200 OK vs 486 Busy vs 503). | Select a call to render its chronological SIP ladder diagram with full packet headers. |
| `failover` | **SIP SBC Failover Tester** | `Resilience` | High-availability test harness verifying primary-to-secondary SBC failover when an Edge SBC becomes unreachable. | Verifying redundant Session Border Controller failover (Ashburn Primary SBC to Dallas Secondary SBC). | Failover Latency (ms), Call Drop Ratio during Switchover (%), DNS SRV Priority Resolution. | Simulate primary SBC outage and verify that SIP traffic seamlessly redirects to backup trunks within 850ms. |
| `pcap` | **SIP PCAP Packet Trace** | `Wireshark` | Deep-packet Wireshark-compatible PCAP viewer and exporter capturing raw Ethernet, IP, UDP, SIP, and RTP frames. | Submitting technical escalation tickets to carrier NOCs or debugging microsecond-level packet jitter. | Total Frames, RTP Stream SSRC, DiffServ QoS Marking (DSCP EF/46). | Inspect full hex dumps of SIP INVITE packets or click "Download .PCAP" to open in Wireshark. |
| `tls` | **SIP TLS & SRTP Security** | `TLS 1.3` | Cryptographic auditor inspecting TLS 1.2/1.3 handshakes, mutual TLS (mTLS) certs, and SRTP media encryption. | Verifying compliance with PCI-DSS and banking security mandates requiring end-to-end encrypted signaling. | Cipher Suite, Certificate Expiration Days, SRTP Master Key Exchange. | Audit carrier SIP trunk certificates and verify that SRTP encryption is strictly enforced. |
| `sipheaders` | **SIP Header Overrides** | `INVITE` | Custom SIP header manipulation engine enabling injection of X-Headers, User-to-User Info (UUI), and PAI. | Testing CRM CTI screen pops, Genesys UUI data passing, or carrier caller ID manipulation. | Custom Header Count, SIP URI Format, UUI Hex Encoding. | Add `User-to-User: 04C102A123;encoding=hex` to an outbound call and verify IVR receipt. |
| `sdp` | **SDP Codec Negotiator** | `m=audio` | Session Description Protocol (SDP) parser inspecting offer/answer codec negotiation, RTP ports, and RTCP. | Resolving one-way audio issues caused by asymmetric codec negotiation or firewall port blocks. | Negotiated Audio Codec, RTP Media Port Range, rtpmap Attributes. | Verify that SDP offer matches Genesys Cloud Edge SBC preferences (G.711u / PCMU). |
| `prack` | **SIP PRACK 100rel Tester** | `RFC 3262` | RFC 3262 reliability tester for provisional SIP responses (180/183) requiring PRACK acknowledgement. | Testing inter-carrier PSTN trunks that mandate reliable provisional signaling to prevent early media clipping. | RSeq / CSeq Numbering, PRACK Round-Trip Time, 183 Session Progress Reliability. | Simulate early media ringback with `Require: 100rel` and verify PRACK 200 OK handshake. |
| `refer` | **SIP REFER Transfer Test** | `RFC 3515` | RFC 3515 call transfer testing suite validating blind and attended transfers to queues or PSTN numbers. | Testing IVR-to-agent warm transfers or deflection to partner call centers. | Refer-To Target URI, NOTIFY Status Progression (100 -> 200 OK), Transfer Completion Time (s). | Send a SIP REFER to transfer an active synthetic call to a supervisor extension and verify seamless handoff. |
| `digest` | **SIP 401 Digest Auth** | `SHA-256` | RFC 2617 / RFC 8760 SIP digest authentication validator testing MD5 and SHA-256 challenge-response handshakes. | Debugging authentication rejections on SIP endpoints, PBXs, or carrier registrars. | Algorithm (MD5 vs SHA-256), Nonce Freshness, Auth Response Calculation. | Test SIP endpoint credentials against carrier digest auth challenges. |
| `optionskeepalive` | **SIP OPTIONS Keepalive** | `Probes 30s` | Periodic SIP OPTIONS heartbeat probe tracking carrier trunk availability and firewall NAT pinhole persistence. | Maintaining open firewall states on carrier SBCs and detecting dropped trunks within 30 seconds. | Ping Interval (default 30s), RTT Latency (ms), Trunk Availability (100%). | Configure 30-second OPTIONS ping against Ashburn and Frankfurt SBC endpoints. |
| `dialogs` | **SIP Dialog State Machine** | `Call-ID` | Formal state machine inspector tracking active SIP dialogs across Early, Confirmed, and Terminated states. | Diagnosing ghost calls or stuck channels in PBX session tables. | Active Dialogs, Dialog Duration, Tag Mismatch Errors. | Inspect the list of active dialogs and purge orphaned sessions. |
| `siptimers` | **SIP RFC 3261 Timers** | `T1/T2/A/B` | Interactive inspector and tuner for RFC 3261 protocol timers (Timer T1, T2, Timer A, Timer B, Timer F). | Tuning transaction timeout windows for high-latency inter-continental satellite or cellular trunks. | Timer T1 (default 500ms), Timer B (64*T1 = 32s), Retransmission Count. | Calibrate Timer T1 to 750ms for international satellite routes to avoid premature timeouts. |
| `registrar` | **SIP Registrar Monitor** | `AOR Bind` | Real-time registry tracking Address-of-Record (AOR) bindings, Contact header expires, and NAT public endpoints. | Monitoring registered SIP softphones, hardphones, or SBC gateways. | Registered Endpoints, Lease Expiration Countdown, Public NAT IP:Port. | Search registered agents by username or extension to verify active registrations. |
| `outboundproxy` | **Outbound Proxy Router** | `SBC Proxy` | Routing policy configuration directing outbound synthetic SIP traffic through designated carrier SBC proxies. | Routing test calls through specific regional egress points or corporate DMZ firewalls. | Selected Proxy Route, Proxy Round-Trip Time, Failover Secondary Proxy. | Set outbound proxy to `sbc-ashburn.visa.com:5061;transport=tls` for all North American test suites. |
| `subnets` | **Carrier IP Subnets** | `Iptables` | Firewall whitelist manager generating iptables, AWS security groups, and GCP VPC firewall rules for carrier IPs. | Configuring network security perimeters to permit SIP and RTP traffic from trusted telco providers. | Whitelisted CIDR Blocks, Signaling Ports (5060/5061), RTP Port Range (10000-20000). | Click "Export AWS Security Group Rules" or "Export GCP VPC Rules" for one-click firewall provisioning. |
| `mime` | **SIP MIME Body Parser** | `MIME ISUP` | Multipart MIME parser extracting ISUP (SS7) encapsulations, billing records, and QSIG headers from SIP payloads. | Inspecting PSTN interconnection trunks that carry legacy SS7 ISUP IAM messages inside SIP. | MIME Boundary Count, ISUP Message Type (IAM, ACM, ANM), Charge Number (ANI). | Parse complex ISUP binary payloads to verify caller category and calling party parameters. |
| `bwcalc` | **VoIP Bandwidth Calc** | `Mbps Calc` | Network capacity planning calculator computing aggregate bandwidth requirements across audio codecs with IP/UDP/RTP headers. | Sizing MPLS, SD-WAN, or internet transit pipes for contact centers before scaling concurrent agent capacity. | Codec Overhead (G.711u: 87.2 kbps, G.729: 31.2 kbps), Total Channels, Required Bandwidth (Mbps). | Enter 150 concurrent calls with G.711u to calculate necessary WAN capacity (13.08 Mbps). |
| `prispans` | **T1/E1 PRI Circuit Spans** | `ISDN Slips` | Legacy TDM circuit health monitor tracking T1 (24ch) / E1 (30ch) PRI framing, clock slips, and D-channel LAPD states. | Monitoring hybrid telephony environments with legacy TDM PBXs or PRI gateway hardware. | B-Channel Utilization, Clock Sync Slips, Alarm State (Red, Yellow, Blue). | Verify that primary T1 span clock synchronization is locked with zero slips over 24 hours. |
| `iceinspector` | **WebRTC STUN/TURN ICE** | `STUN/TURN` | Interactive WebRTC ICE candidate diagnostic inspecting Host, Server Reflexive (srflx), and Relay (TURN) connectivity. | Resolving WebRTC connection drops or firewall traversal problems in remote agent softphones. | Selected Candidate Pair, STUN RTT (ms), TURN Relay Bandwidth. | Execute an ICE candidate harvest to ensure remote agents bypass restrictive symmetric NATs via TURN. |
| `peerstats` | **WebRTC PeerConnection** | `inbound-rtp` | Low-level WebRTC getStats() telemetry viewer tracking inbound/outbound audio packet rate, jitter, and bytes received. | Diagnosing browser-level audio degradation or CPU throttling in agent softphone sessions. | Packets Lost, Fraction Lost, Audio Energy Level, Concealed Samples. | Inspect real-time WebRTC stats during an active browser call session. |

### SECTION 5: Carrier Routing & LCR Savings (9 screens)
| Tab ID | Screen Name | Badge | Purpose & Value | When to Use It | Key Metrics & Indicators | Typical User Action |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `lcr` | **PSTN LCR Route Optimizer** | `Least Cost` | Algorithmic Least Cost Routing (LCR) engine calculating optimal carrier egress paths based on rates and SLA scores. | Optimizing outbound call routing across carriers (Telnyx vs Twilio vs Bandwidth) to cut toll costs. | Cost per Minute ($), Carrier Reliability Rank, Selected Least-Cost Route. | Enter a destination NPA-NXX to compare carrier termination rates and route via the most cost-effective path. |
| `lcrsavings` | **Carrier LCR Savings Calc** | `ROI Calc` | Executive financial calculator computing annualized telecom savings achieved by migrating to optimized LCR routing. | Building business cases for leadership or demonstrating immediate ROI on platform deployment. | Monthly Minutes Volume, Blended Legacy Rate vs Optimized Rate, Annualized Enterprise Savings ($). | Input 500,000 monthly minutes to visualize $146,700/year in direct carrier expense reduction. |
| `carrierinterconnect` | **Carrier Interconnect Matrix** | `Tier-1 POPs` | Interconnect topology map showing direct fiber cross-connects and SIP peering points with Tier-1 carriers. | Planning direct SIP peering, BYOC edge interconnects, or cross-connect provisioning at Equinix facilities. | Direct Interconnect Status, Interconnect Capacity (10G / 100G), Latency to Carrier POP. | Verify active cross-connects to Lumen, AT&T, Verizon, and Telnyx in Ashburn and Chicago. |
| `scorecard` | **Carrier SLA Scorecard** | `Scorecard` | Automated carrier scorecard grading providers (A+ to F) on call completion, audio MOS, and P99 latency. | During quarterly carrier business reviews (QBRs) to demand SLA violation credits and rate discounts. | SLA Grade (A+ to F), Call Completion Rate (%), Mean MOS Score, SLA Penalty Credits Earned ($). | Export a quarterly PDF scorecard to hold carriers accountable for missed 99.99% uptime commitments. |
| `heatmap` | **Global Latency Heatmap** | `Heatmap` | Worldwide geographical heatmap mapping SIP signaling and RTP media latency across carrier routes. | Identifying underperforming international telecom corridors causing delayed audio or high post-dial delay (PDD). | Average PDD (Post-Dial Delay s), Media Round-Trip Time (ms), Regional Heat Index. | Hover over transatlantic routes to verify that round-trip audio latency remains below 150ms. |
| `billing` | **Toll-Free Billing Auditor** | `Rate Audit` | Automated billing reconciliation engine matching carrier call detail records (CDRs) against actual synthetic durations. | Detecting carrier overbilling, incorrect 60/60 rounding, payphone surcharge errors, and phantom minutes. | Billing Discrepancy Rate (%), Overbilled Amount Identified ($), Unmatched CDR Count. | Upload carrier monthly invoice CDRs to automatically highlight duplicate billing records. |
| `lata` | **Telco LATA Exchange DB** | `NANPA` | North American Numbering Plan (NANPA) Local Access and Transport Area (LATA) exchange database lookups. | Categorizing calls as intra-LATA vs inter-LATA to determine applicable regulatory tariff rates. | LATA Number, Operating Company Number (OCN), Rate Center Name, State Jurisdiction. | Query area code and prefix (e.g. 800-847) to inspect LATA jurisdiction and terminating rate centers. |
| `dnis` | **DNIS Routing Lookup** | `Trunk Map` | Dialed Number Identification Service (DNIS) lookup table mapping dialed numbers to specific contact center application queues. | Verifying that customer calls to specific toll-free numbers land on the correct IVR application. | DNIS Number, Target Genesys Architect Flow, Language Default, Business Unit. | Search DNIS `+18008472911` to confirm routing to "Visa Cardholder Support Inbound Flow". |
| `lnp` | **LNP Number Porting Tracker** | `FOC Order` | Local Number Portability (LNP) tracker monitoring carrier porting orders, FOC dates, and NPAC database broadcast status. | Migrating enterprise phone numbers between telecom providers (migrating 100 DIDs to Genesys BYOC). | Firm Order Commitment (FOC) Date, NPAC Broadcast Status, Porting State (Pending/Active). | Track porting progress of newly acquired customer support numbers. |

### SECTION 6: Regulatory Compliance & Security (11 screens)
| Tab ID | Screen Name | Badge | Purpose & Value | When to Use It | Key Metrics & Indicators | Typical User Action |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `compliance` | **Compliance & PCI Auditor** | `PCI-DSS v4.0` | Continuous compliance auditor scanning call recordings, transcripts, and logs for PCI-DSS, HIPAA, and TCPA violations. | Before formal regulatory compliance audits to prove that no unredacted cardholder data (PAN, CVV) is stored. | PCI Compliance Score (100%), Unredacted PAN Detections (0), Encrypted Storage Verification. | Run a full workspace audit to generate a signed PCI-DSS Attestation of Compliance (AoC) report. |
| `redactor` | **Call Audio PII Redactor** | `GDPR & PCI` | AI-powered acoustic and transcript redactor muting sensitive 16-digit credit card numbers, CVVs, and SSNs with silence tones. | Storing call recordings for agent quality monitoring while complying with strict data privacy laws. | Redaction Precision (%), Acoustic Mute Precision (ms), Zero-Storage Guarantee. | Review a sample recording where the caller speaks their 16-digit card number and verify complete acoustic muting. |
| `stirshaken` | **STIR/SHAKEN Attestation** | `Attest A` | FCC STIR/SHAKEN cryptographic caller ID verification verifying SIP Identity headers and attestation levels (A, B, C). | Preventing outbound business calls from being flagged as "Spam Likely" or "Scam" on consumer mobile devices. | Attestation Level (Full A, Partial B, Gateway C), X.509 Thumbprint, Identity Signature. | Verify that all Visa outbound verification calls receive Level A attestation from certified carrier signers. |
| `e911` | **E911 PSAP Address Check** | `Kari Law` | Emergency services validator verifying dispatchable location data, Kari’s Law, and RAY BAUM’S Act compliance. | Provisioning phone numbers for enterprise employees or contact centers to ensure 911 dispatch accuracy. | Master Street Address Guide (MSAG) Validation, PSAP ID, Dispatchable Room Info. | Validate physical address formatting for corporate office DIDs against MSAG databases. |
| `gdpr` | **GDPR Data Retention** | `30-Day Auto` | Automated data retention and "Right to be Forgotten" lifecycle manager enforcing scheduled audio and transcript purging. | Satisfying European GDPR and California CCPA mandates requiring automated deletion after retention windows. | Retention Policy (30/90 Days), Automated Purge Schedule, Cryptographic Shred Confirmation. | Set automated data retention to 30 days and verify automated cryptographic shredding logs. |
| `usftax` | **USF Regulatory Tax Audit** | `FCC Tax` | Telecom regulatory tax calculator verifying Federal Universal Service Fund (USF), TRS, and state 911 surcharges. | Auditing carrier invoices for unauthorized fee markups or incorrect interstate telecom tax percentages. | Current Quarterly USF Rate (%), Applicable Interstate Revenue Basis, Invoiced vs Calculated Tax. | Verify that carrier invoices apply the exact FCC-mandated USF quarterly contribution rate without hidden markup. |
| `biometrics` | **Voice Biometrics Auditor** | `Anti-Spoof` | Voice biometric security tester evaluating speaker verification algorithms against synthetic voice cloning and deepfakes. | Testing biometric voice authentication systems used for customer phone banking and high-value transactions. | Equal Error Rate (EER %), False Accept Rate (FAR), False Reject Rate (FRR). | Test voice biometric models against generated deepfake audio samples to verify anti-spoof rejection. |
| `liveness` | **Voice Liveness Meter** | `Spoof Check` | Acoustic liveness detector identifying generative AI speech, replay attacks, and physical room reverberation artifacts. | Ensuring that caller voices are authentic live humans rather than pre-recorded tapes or AI voice clones. | Liveness Score (0.00 - 1.00), Replay Attack Probability, Phase Consistency Index. | Run liveness analysis on incoming audio to verify human vocal tract micro-tremors. |
| `rbac` | **Keycloak RBAC Inspector** | `OIDC Roles` | Enterprise identity and role-based access control (RBAC) inspector auditing token scopes, claims, and permissions. | Verifying that enterprise users have appropriate least-privilege permissions across workspaces. | Assigned Role, Active Token Expiry, OIDC Realm. | Inspect current user roles, verify token signature validity, and simulate privilege escalation boundaries. |
| `ssoauditor` | **SAML & PKCE SSO Audit** | `Auth Log` | Single Sign-On (SSO) security log auditor tracking SAML 2.0 assertions, Okta / PingFederate authentication events, and PKCE. | Troubleshooting login issues or providing audit logs to enterprise security compliance teams. | SSO Provider (Visa Okta, PingFederate, Keycloak), IdP Response Status, Certificate Fingerprint. | Review real-time SSO authentication events for Visa Inc. employees (@visa.com). |
| `escalation` | **Escalation Policies** | `PagerDuty` | Multi-tiered incident escalation engine routing critical voice outages to on-call engineers via phone, SMS, and PagerDuty. | Configuring on-call rotations and escalation matrices for mission-critical IVR outages. | Escalation Steps, Acknowledge Timeout (mins), Active On-Call Schedule. | Define a policy: if an emergency DID fails 2 consecutive synthetic runs, immediately dial the Telecom NOC lead. |

### SECTION 7: AI Studio & NLU Intelligence (12 screens)
| Tab ID | Screen Name | Badge | Purpose & Value | When to Use It | Key Metrics & Indicators | Typical User Action |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `gemini` | **Gemini AI Studio** | `AI Live` | Direct playground for Google Gemini 1.5 Pro & Flash models performing real-time speech prompt analysis and response generation. | Designing AI voice prompts, testing conversational context windows, or generating automated test scenarios. | Tokens Processed, Inference Latency (ms), Temperature & Top-P Settings. | Prompt Gemini to analyze an IVR prompt and generate all possible customer utterance variations. |
| `combat` | **AI Bot Combat Arena** | `Agent vs IVR` | Autonomous simulation arena where an AI Customer Bot calls an enterprise IVR Bot to test unpredictable human conversations. | Uncovering edge cases, conversational dead-ends, and unhandled customer responses in production IVRs. | Conversational Turns, Goal Completion Rate (%), Uncaught Exception Count. | Deploy an "Angry Customer with Card Fraud" AI persona and watch it navigate the Visa automated fraud menu. |
| `sentiment` | **Gemini Sentiment & Legal** | `AI Compliance` | Post-call sentiment and regulatory auditor scanning conversations for customer frustration, legal threats, and disclosures. | Ensuring customer service agents read mandatory legal disclosures ("This call is recorded", mini-Miranda). | Sentiment Score (-1.0 to +1.0), Mandatory Disclosure Compliance (%), Escalation Risk Index. | Analyze call transcripts for keywords like "lawyer", "attorney general", or "CFPB complaint". |
| `tuning` | **STT Custom Vocabulary** | `Acoustic AI` | Acoustic model custom vocabulary manager injecting domain-specific terminology (Visa Direct, Visa B2B Connect, EMV chip). | Default speech recognition models mishearing specialized enterprise brand names and acronyms. | Custom Phrase Count, Phrase Boost Factor (1 - 20), Recognition Accuracy Gain (%). | Add terms like "Cardholder", "CVV2", "Tokenization" with boost weight 15.0 to eliminate transcription errors. |
| `amd` | **AMD Voicemail Detector** | `AMD Accuracy` | Answering Machine Detection (AMD) evaluator classifying connected calls as Human, Voicemail Beep, or Greeting within 1.2s. | Optimizing outbound campaign dialing to avoid leaving voicemails or speaking before the beep. | Classification Latency (<1200ms), AMD Accuracy (%), False Positive Rate. | Test AMD engine on various cellular voicemail greetings to ensure rapid detection and proper handling. |
| `bargerecovery` | **Barge-In Context Switch** | `Recovery` | Conversational state recovery tester ensuring voicebots correctly pivot when a user changes their mind mid-sentence. | Testing voicebot intelligence during abrupt customer interruptions ("Actually, cancel my card instead!"). | Context Switch Latency (ms), Intent Override Accuracy (%), State Consistency Score. | Simulate user interruption switching topic from account balance to stolen card, verifying smooth dialog transition. |
| `fallbacks` | **Intent Fallback Strategy** | `Recovery` | Fallback strategy configurator defining multi-tiered recovery paths when customer intent cannot be determined. | Preventing frustrating infinite repetition loops when callers speak outside known vocabulary. | Fallback Attempt Limit (default: 2), Reprompt Strategy, Escalation Destination. | Configure the fallback policy to automatically transfer to a human specialist after 2 unrecognized utterances. |
| `promptab` | **Gemini Prompt A/B Test** | `System LLM` | A/B testing studio comparing different system instructions and prompt formulations for conversational voice agents. | Optimizing prompt engineering to maximize call containment, reduce verbosity, or improve caller satisfaction. | Prompt A vs B Containment Rate, Average Handle Time (s), Token Efficiency. | Compare a concise prompt versus a conversational prompt to determine which yields higher completion rates. |
| `menuab` | **IVR Menu Prompt A/B** | `Containment` | Split-testing engine comparing different IVR menu prompt wording, voice actors, and option ordering. | Determining whether callers prefer "Press 1 for Billing" or conversational speech prompts. | Self-Service Containment (%), Zero-Out Rate (%), Caller Task Completion Time. | Run 50 synthetic test calls against Variant A and 50 against Variant B to evaluate navigation speed. |
| `nluheatmap` | **NLU Intent Confidence** | `Confidence` | Heatmap visualization displaying intent classification confidence across diverse customer phrasing and regional accents. | Identifying weak or overlapping NLU intents that cause misrouting or customer confusion. | Average Intent Confidence (0.0 - 1.0), Low Confidence Utterance Count, Intent Overlap Matrix. | Inspect low-confidence utterances (< 0.75) and assign them to correct training intents. |
| `csat` | **Post-Call CSAT Predictor** | `CSAT AI` | Predictive machine learning model estimating Customer Satisfaction (CSAT) scores from call audio features and sentiment. | Predicting CSAT scores on 100% of calls without relying on low post-call survey response rates (< 3%). | Predicted CSAT (1 to 5 Stars), Sentiment Trajectory, Customer Effort Score (CES). | Review CSAT predictions for calls with long hold times or multiple transfers. |
| `langdetect` | **Language Auto-Detect** | `Multi-Lang` | Automatic spoken language identifier detecting English, Spanish, French, Mandarin, and 40+ other languages in 3 seconds. | Supporting global multilingual customers without forcing them through tedious "Press 1 for English" menus. | Language Identification Latency (<2.0s), Detection Confidence (%), Supported Language Count (45). | Play a Spanish greeting and verify the IVR immediately pivots to Spanish prompts. |

### SECTION 8: Executive Dashboards, Ops & Migrations (17 screens)
| Tab ID | Screen Name | Badge | Purpose & Value | When to Use It | Key Metrics & Indicators | Typical User Action |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `dashboard100` | **104-Module Executive Dashboard** | `Executive` | Single-pane-of-glass executive command center aggregating health and SLA metrics across all 104 platform modules. | VP/Director level status reviews, NOC wall monitors, and cross-functional telecom health checks. | Overall Platform SLA (99.99%), Active Tenants, Total Tests Run Today, Cost Savings Achieved. | Review high-level system indicators and drill down into any underperforming subsystem. |
| `klearcom` | **Klearcom Migration & ROI** | `ROI / Parity` | Side-by-side migration comparison dashboard proving 100% feature parity and 65%+ cost reduction over Klearcom & Cyara. | Demonstrating to procurement why switching to VoxPulse AI saves $200k+/year with superior AI-native testing. | Annual Cost Comparison ($288k Klearcom vs $60k VoxPulse), Feature Parity (100%), TCO Reduction (%). | Export the executive ROI comparison deck for telecom procurement and finance teams. |
| `execpdfexporter` | **Executive SLA PDF Exporter** | `PDF Export` | One-click executive report generator compiling multi-page branded PDF reports summarizing uptime, MOS, and compliance. | Monthly client deliverables, regulatory filings, or C-suite executive briefings. | Report Date Range, Branded Template (Visa Inc.), Executive Summary Metrics. | Select Visa Inc., choose date range, and click "Generate Executive PDF Report" to download a publication-ready document. |
| `analytics` | **Analytics & Reports** | `BI / Trends` | Historical business intelligence charts displaying call volume trends, failure distributions, and carrier performance over time. | Analyzing long-term telecom trends, identifying recurring failure patterns, or capacity planning. | Historical Call Volumes, Failure Categories Breakdown, Mean Time to Detect (MTTD). | Filter by last 30 days to observe the steady improvement in overall test pass rates. |
| `exporter` | **PDF Export Report Studio** | `PDF & CSV` | Data extraction and report configuration tool exporting raw telemetry to CSV, JSON, and customized PDF formats. | Feeding synthetic testing data into enterprise data warehouses (Snowflake, BigQuery) or BI tools (Tableau, PowerBI). | Export Record Count, Format (CSV, JSON, PDF), Export Duration. | Select test results from the last 7 days and export a CSV file for internal analytics. |
| `outages` | **Global Outage Map** | `Live Ticker` | Real-time global carrier outage tracker aggregating telecom carrier BGP anomalies, fiber cuts, and trunk degradations. | Determining whether an IVR failure is caused by an internal bug or a widespread carrier PSTN outage. | Active Carrier Incidents, Impacted Regions, Estimated Time to Restoration (ETR). | Check the live ticker when test failure rates spike to see if a carrier fiber cut occurred. |
| `screenpop` | **Agent CTI Screen Pop** | `CAD Pop` | Computer Telephony Integration (CTI) latency validator measuring the delay between call arrival and CRM screen pop. | Ensuring contact center agents receive customer account data on their screens before answering the call. | Screen Pop Latency (target <800ms), CAD Data Integrity, CRM Connection Status (Salesforce/Zendesk). | Verify that customer details and IVR selections populate on the mock agent screen within 620ms. |
| `aht` | **Gemini AHT Optimizer** | `AHT Cut` | AI diagnostic identifying friction points, verbose IVR prompts, and slow agent transfers that inflate Average Handle Time. | Targeting contact center cost reductions by streamlining call flow and shortening prompt durations. | Current AHT (s), Identified AHT Waste (s), Projected Operational Savings ($). | Review AI recommendations to shorten the initial disclaimer prompt to save 4.2 seconds per call. |
| `erlang` | **Erlang C SLA Predictor** | `Staffing` | Mathematical Erlang C queuing calculator predicting required agent staffing levels to achieve target Service Levels. | Workforce managers determining how many agents must be scheduled to answer 80% of calls within 20 seconds. | Traffic Intensity (Erlangs), Service Level (%), Average Speed of Answer (ASA s), Occupancy (%). | Input 600 calls/hr with 180s AHT to calculate that 35 agents achieve an 83.7% service level. |
| `percentiles` | **P50/P99 Latency Graph** | `P99 Latency` | Statistical latency distribution chart plotting P50 median, P95, and P99 tail latencies across telephony operations. | Optimizing for tail latencies to ensure that 99% of callers experience rapid menu responses. | P50 Latency (ms), P95 Latency (ms), P99 Tail Latency (ms). | Inspect tail latency spikes caused by database connection pool exhaustion. |
| `tagger` | **Call Metadata Tagger** | `Tags` | Automated and manual tagging utility attaching business metadata (campaign ID, VIP status, language) to call records. | Categorizing test runs by software release, business unit, or marketing campaign. | Assigned Tags, Search Filter by Tag, Tag Rules. | Apply tag `visa-release-v4.2` to automated test runs for release tracking. |
| `datachannel` | **RTCDataChannel Stats** | `SCTP` | Telemetry viewer for WebRTC out-of-band SCTP DataChannels used for low-latency binary and text transmission. | Passing real-time transcriptions or agent interaction commands alongside WebRTC voice streams. | Messages Sent / Received, Bytes Transferred, Channel State (Open/Closed). | Monitor SCTP DataChannel throughput during live agent softphone calls. |
| `webhooks` | **Webhook Retry Queue** | `DLQ Queue` | Resilient Dead Letter Queue (DLQ) managing webhook delivery with exponential backoff for third-party integrations. | Verifying that alert webhooks to Slack, PagerDuty, or ServiceNow are never lost during third-party outages. | Queued Webhooks, Retry Attempts (max 5), Dead Letter Count. | Inspect failed webhook deliveries and trigger manual retries with one click. |
| `importer` | **Klearcom One-Click Importer** | `Migrate` | Migration utility importing test cases, DID lists, and IVR flows from Klearcom, Cyara, or Hammer exports. | Onboarding enterprise customers switching from legacy vendors without having to re-author test cases manually. | Imported Test Cases, Imported DIDs, Mapping Success Rate (100%). | Upload a Klearcom CSV export file to instantly generate identical VoxPulse test suites. |
| `tenant` | **Multi-Tenant Workspaces** | `Quotas` | Multi-tenant workspace isolation manager configuring dedicated tenant boundaries, resource quotas, and custom domains. | Provisioning distinct business units (Visa North America vs Visa Europe) with isolated data. | Active Tenants, Monthly Minute Quotas, Provisioned DID Limits. | Adjust monthly minute quotas for specific enterprise organizations. |
| `integrations` | **Alert Integrations** | `Webhooks` | Integration hub connecting platform alerts to PagerDuty, Slack, Microsoft Teams, Datadog, and custom webhooks. | Setting up real-time notification channels for telecom NOCs and incident response teams. | Connected Integrations, Alert Routing Rules, Webhook Health Status. | Enter a Slack webhook URL or PagerDuty integration key to receive real-time failure alerts. |
| `settings` | **Workspace Settings** | `Config` | Global configuration panel managing default audio codecs, API keys, telephony providers, and regional endpoints. | Configuring platform credentials, selecting default carriers, or toggling developer debug mode. | Environment Config, Carrier Adapter Selected, Debug Logging Level. | Select primary carrier (Genesys Cloud BYOC vs Telnyx) and configure global timeouts. |

---

## 6. Enterprise SaaS Modules (Header Navigation)

In addition to the 103 sidebar tools, VoxPulse AI includes 10 enterprise SaaS management modules accessible from the persistent top navigation header:

1. **Active Organization Switcher & Creation Modal:** Enables instant multi-tenant context switching between enterprise accounts (e.g. switching between `Visa Inc. (org_visa_inc)` and other enterprise subsidiaries).
2. **Subscription & Billing (`tab: billing_sub`):** Real-time subscription tier management (`ENTERPRISE`, `GROWTH`, `STARTER`), automated invoice generation, cardholder payment gateways, and annual license renewals.
3. **Usage Metering (`tab: usage_metering`):** Granular telemetry tracking synthetic minutes consumed, concurrent PSTN channels saturated, DIDs provisioned, and POLQA DSP compute units.
4. **Team & RBAC Management (`tab: team_mgmt`):** User invitation and role assignments across `Super Admin`, `Telecom Lead`, `QA Engineer`, `Security Auditor`, and `Billing Admin`.
5. **Genesys Cloud Integration (`tab: genesys`):** Full-stack enterprise configuration suite connecting Genesys Cloud CX Architect Inbound/Outbound flows and Edge SBC SIP Trunks directly without third-party carrier subscriptions. Includes 5 dedicated tabs:
   - **Overview & BYOC Trunks:** Real-time SIP OPTIONS trunk probes across Ashburn & Highlands Ranch SBCs, ping latency, jitter, packet loss, and OAuth2 client credentials.
   - **Architect IVR Flows:** Directory of discovered inbound call flows (e.g. Visa Global Cardholder Services, VAA Fraud Dispute Voicebot, VIP POS Authorization) with one-click **Automated Multi-Hop Journey Testing**.
   - **User Prompts & Audio DSP:** Acoustic analysis of Architect audio assets, measuring ITU-T P.863 POLQA MOS scores, EBU R128 (-16 LUFS) loudness compliance, true peak ceiling limiters (-1.0 dBFS), and voiceband frequency filters.
   - **Data Actions & Web Services:** Interactive diagnostics tester for REST data actions (Visa Card Lookup, VAA Risk Authorization, PIN HSM, Salesforce CRM match), with latency SLA benchmarking and 504 Gateway Timeout / 400 Bad Request fallback simulations.
   - **Live Outbound Sandbox:** Interactive dialer with real-time waveform display, RFC 4733 DTMF in-dialog tone injector keypad, and call telemetry logs.
6. **Enterprise Immutable Audit Vault (`tab: saas-audit`):**
   - **Cryptographic SHA-256 Hash Chaining:** Every administrative mutation, test execution, DID modification, and SSO authentication is chained to its predecessor block hash (`prevHash` $\to$ `blockHash`).
   - **Tamper Verification Banner:** Real-time one-click cryptographic validator recalculates mathematical hashes across all blocks in the ledger, proving 0% byte manipulation.
   - **SIEM Streaming & Export:** Instant streaming export into ArcSight Common Event Format (CEF) and ndjson (JSONL) for Splunk, Datadog, and corporate SOC ingestion.
   - **Regulatory Compliance:** Satisfies SOC-2 Type II Trust Services Criteria and PCI-DSS 4.0 Requirement 10.
7. **Enterprise Incident Center & ITSM (`tab: saas-incidents`):**
   - **ServiceNow & PagerDuty Synchronization:** Real-time bi-directional incident tracking associating test failures directly with `INCxxxx` ticket numbers and Sev-1 PagerDuty incidents.
   - **Active Voice Incident KPIs:** Real-time monitoring of open Sev-1/Sev-2 incidents, Mean Time to Remediation (MTTR: 48s), and affected caller percentage (0.00%).
   - **Autonomous SBC Remediation:** One-click failover button executes autonomous carrier failover from degraded edge SBCs (e.g. Ashburn AudioCodes SBC) to backup routes (Frankfurt Ribbon SBC), instantly restoring voice POLQA MOS from 3.65 to 4.46.
8. **Maintenance Windows & Change Freezes (`tab: saas-maintenance`):**
   - **Production Protection:** Enforces synthetic test suppression during peak transaction periods such as the **Visa Q4 Black Friday & Cyber Monday Settlement Freeze**.
   - **Suppression Enforcement Modes:** `HARD_FREEZE_ALL_TESTS` (all synthetic calls halted), `PASSIVE_PROBES_ONLY` (non-intrusive SIP OPTIONS keepalives only), and `LOW_CONCURRENCY` (< 5 simultaneous channels).
   - **Pre-Flight Freeze Evaluation:** Before dispatching any test or load burst, the runner queries the freeze status engine; if an active freeze applies to the targeted flow, tests are safely suppressed with ticket references.
9. **Multi-Region Carrier Egress & Geo-Latency Radar (`tab: saas-geolatency`):**
   - **8 Worldwide Edge PoPs:** Real-time latency tracking across Ashburn (US-East), Oregon (US-West), Frankfurt (EU-Central), Dublin (EU-West), Tokyo (AP-Northeast), Sydney (AP-Southeast), Montreal (CA-Central), and São Paulo (SA-East).
   - **Carrier Route Benchmark Comparison:** Directly benchmarks **Direct BYOC Edge SBC** vs **Genesys Cloud Voice (GCV)** vs **Wholesale PSTN Aggregators**.
   - **Telecom KPIs:** Post-Dial Delay (PDD, SLA < 800ms), DNS SRV Resolve Time (< 25ms), SIP 180 Ringing RTT, and Jitter.
10. **SaaS Operator Control Plane ("God Mode") (`tab: saas-admin`):**
    - Platform-wide executive ARR ($2.84M), MRR ($236.6k), tenant fleet directory, wholesale telco margin breakdown (88.4% gross margin), and one-click customer workspace impersonation.

---

## 7. Visa Inc. Enterprise Architecture Blueprint

### 7.1 Pre-Seeded Production Hotlines
The `org_visa_inc` workspace is pre-loaded with Visa's high-priority global contact center numbers:

| Destination Phone | Description | Routing Path | Target Architect Flow |
| :--- | :--- | :--- | :--- |
| `+1-800-847-2911` | **Global Cardholder Support** | Primary Ashburn BYOC Edge SBC | `Visa_Cardholder_Support_Inbound_v4` |
| `+1-800-252-4370` | **Card Activation Hotline** | Primary Ashburn BYOC Edge SBC | `Visa_Card_Activation_Automated_v2` |
| `+1-800-523-4116` | **Fraud & Dispute Resolution** | Redundant Frankfurt Edge SBC | `Visa_Lost_Stolen_Fraud_Escalation` |
| `+44-20-7946-0199` | **London Direct Peering** | Equinix LD4 Direct Cross-Connect | `Visa_Direct_B2B_Settlement_v1` |

### 7.2 Zero-Storage PCI-DSS Level 1 Audio Redaction
When testing payment and card verification menus, VoxPulse AI guarantees absolute compliance with Visa Global Security Requirements:
- Whenever synthetic caller audio or IVR prompts transmit a Primary Account Number (PAN) or Card Verification Value (CVV), the **Acoustic Redactor (`tab: redactor`)** immediately replaces the waveform with a 400Hz privacy tone.
- In-flight transcripts are regex sanitized using Luhn-algorithm validators, preventing sensitive financial numbers from ever touching persistent disk storage or database logs.

---

## 8. Summary & Technical Contacts
For custom integration support, Genesys Cloud BYOC SIP trunk provisioning, or on-premises edge appliances, contact the VoxPulse Enterprise Architecture Team:
- **Lead Architect:** Atreya Yelishetti
- **Security & Compliance:** `compliance@voxpulse.ai`
- **Enterprise Telephony NOC:** `telecom-sre@voxpulse.ai`
- **Repository Reference:** `voxpulse-ai-enterprise`
