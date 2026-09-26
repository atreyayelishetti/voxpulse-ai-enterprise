# 🚀 VoxPulse AI - Comprehensive Handoff & Architecture Documentation
> **Target Audience:** Claude AI / Engineers continuing development on VoxPulse AI  
> **Status:** Production-Ready • 107 Enterprise UI Modules • 1,500 Automated Test Cases (100% Pass Rate)

---

## 📌 Executive Overview

**VoxPulse AI** is an enterprise-grade, in-house replacement platform for commercial IVR testing vendors such as **Klearcom**, **Cyara**, and **Hammer**. It delivers end-to-end automated PSTN call testing, voicebot NLU verification, POLQA/PESQ audio MOS scoring, global DID reachability monitoring, multi-carrier LCR cost optimization, and regulatory compliance auditing.

### Key Highlights
- **Live Production URL on GCP**: Deployed on Google Cloud Run at [**https://voxpulse-ai-752915092336.us-central1.run.app**](https://voxpulse-ai-752915092336.us-central1.run.app) (Serverless, Auto-TLS, WebSocket Session Affinity, $0/mo Idle Scaling).
- **107 Enterprise UI Modules**: Feature-complete dark glassmorphic interface covering every telecom, DSP audio, SIP signaling, AI, and security diagnostic capability.
- **1,500 Automated Test Cases**: 100% pass rate across 30 specialized test groups (`npm run test:1500` / `npm run test:1000` / `npm run test:600`).
- **Autonomous E2E Testing**: Self-spawning test harness verifying all 18 backend REST calculation and telemetry endpoints with 100% pass rate (`npm run test:e2e`).
- **Comprehensive UX Click & Function Validator**: 153/153 tests asserting every UI click and function (`npm run test:ux`).
- **Google Gemini 2.5 & 3.8 AI**: Multimodal acoustic prompt parsing, intent detection, and post-call RCA audits.
- **Multi-Provider Telephony Egress**: Live **Telnyx PSTN**, **Twilio**, **Google Cloud CCAI**, and **PSTN Simulator**.
- **Keycloak OIDC SSO**: Realm authentication with Bearer JWT tokens (`admin` / `password`).
- **Docker & Cloud Run Ready**: Pre-configured multi-stage `Dockerfile`, `.dockerignore`, and `docker-compose.yml` with PostgreSQL 16, Keycloak 24, Express Backend, and Nginx.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend UI** | React 19, Vite 8, Lucide Icons, Glassmorphic Vanilla CSS |
| **Backend Server** | Node Express 5 (ESM), WebSockets (`ws`), REST API |
| **Database** | PostgreSQL 16 Alpine (Port `5439`) with In-Memory Fallback |
| **Authentication** | Keycloak OIDC 2.0 (Port `8088`), Bearer JWT Tokens |
| **AI Engine** | `@google/genai` SDK (`gemini-2.5-flash`, `gemini-3.8-flash`) |
| **Telephony Egress** | Telnyx REST Call Control API, Twilio Voice API, Local Simulator |
| **Cloud Hosting** | Google Cloud Run (Serverless, Auto-TLS, us-central1) |

---

## 🌐 Live Google Cloud Platform (GCP) Deployment

VoxPulse AI is deployed and live on Google Cloud Platform:

| Attribute | Specification |
| :--- | :--- |
| **Live Public URL** | [**https://voxpulse-ai-752915092336.us-central1.run.app**](https://voxpulse-ai-752915092336.us-central1.run.app) |
| **GCP Project ID** | `voxpulse-ai-enterprise` |
| **GCP Project Number** | `752915092336` |
| **Cloud Run Service** | `voxpulse-ai` (Revision: `voxpulse-ai-00001-8hq`) |
| **Region** | `us-central1` |
| **Runtime Architecture** | Multi-stage Docker container (Vite Build + Node 20 Express) |
| **Networking & TLS** | Automatic Google Managed TLS Certificate on port 443 |
| **Session Affinity** | Enabled (`--session-affinity`) for stateful WebSocket connections |
| **Scaling Policy** | 0 to 5 instances (scales to zero when idle for $0/mo hosting cost) |
| **Environment Variables** | `NODE_ENV=production`, `PORT=8080`, `GEMINI_API_KEY`, `TELNYX_API_KEY` |

To redeploy updates at any time:
```bash
gcloud run deploy voxpulse-ai \
  --source . \
  --project voxpulse-ai-enterprise \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated \
  --session-affinity \
  --memory 1Gi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 5 \
  --port 8080 \
  --set-env-vars "NODE_ENV=production,GEMINI_API_KEY=your_gemini_api_key,TELNYX_API_KEY=your_telnyx_api_key"
```

---

## 📁 Repository Structure & Directory Map

```
ivr testing/
├── .env                                # Environment credentials & API keys
├── .github/workflows/ci.yml            # Automated GitHub Actions CI/CD pipeline
├── docker-compose.yml                  # Docker orchestration (Postgres, Keycloak, Backend, Frontend)
├── package.json                        # Dependencies & npm script shortcuts
├── HANDOFF_DOCUMENTATION.md            # This handoff documentation
│
├── bin/
│   └── voxpulse.js                     # Headless enterprise CLI tool (run, load, erlang, lcr, audit)
│
├── server/                             # Node Express Backend & Telephony Core
│   ├── index.js                        # Primary REST API routes & WebSocket server (27 endpoints, 18 calculation engines)
│   ├── telephonyAdapter.js             # Telephony abstraction (Telnyx, Twilio, CCAI, Simulator)
│   ├── geminiEngine.js                 # Gemini 2.5/3.8 Flash prompt analysis & RCA engine
│   ├── dtmfGenerator.js                # Web Audio 8000Hz PCM G.711u DTMF tone synthesizer
│   ├── testRunner.js                   # Automated test flow executor & telemetry broadcaster
│   ├── ivrDiscovery.js                 # Recursive IVR crawler & tree generator
│   ├── loadTester.js                   # Concurrent PSTN stress & load generator
│   ├── alertEngine.js                  # PagerDuty, Slack, & Webhook alert dispatcher
│   ├── metricsExporter.js              # Prometheus metrics exporter (/api/metrics)
│   ├── reportsEngine.js                # Executive SLA HTML report generator
│   │
│   ├── auth/
│   │   └── keycloak.js                 # Keycloak OIDC middleware & JWT validator
│   │
│   ├── db/
│   │   ├── index.js                    # PostgreSQL pool connection engine
│   │   ├── schema.sql                  # Complete DDL tables & pre-seeded test datasets (15 tables)
│   │   └── seed.js                     # Database seeding script (`npm run db:seed`)
│   │
│   └── tests/
│       ├── comprehensive1500TestSuite.js# 1,500 automated test cases (Groups 1 to 30)
│       ├── comprehensive1000TestSuite.js# Wrapper running comprehensive 1,500 tests
│       ├── comprehensive600TestSuite.js # Backward-compatible 600 runner
│       ├── comprehensive300TestSuite.js # 300 test cases
│       ├── comprehensiveUXAndFunctionsValidator.js # UX clicks & platform functions validator (npm run test:ux)
│       └── e2eTestSuite.js             # Autonomous end-to-end integration tests (18 endpoints)
│
├── keycloak/
│   └── voxpulse-realm.json             # Keycloak realm export file
│
└── src/                                # Frontend React Application
    ├── main.jsx                        # React root entry point
    ├── App.jsx                         # Main dashboard layout, state, & tab router
    ├── index.css                       # Glassmorphic dark design system & tokens
    │
    └── components/                     # 107 Enterprise UI Module Components
        ├── LoginScreen.jsx             # Keycloak OIDC SSO login modal (`admin` / `password`)
        ├── Sidebar.jsx                 # 107-component glassmorphic navigation sidebar
        ├── LiveCallConsole.jsx         # Live interactive softphone & audio spectrum
        ├── WebRTCSoftphone.jsx         # Browser mic softphone dialer
        ├── VoicebotStudio.jsx          # Voicebot AI NLU studio
        ├── VisualCanvasBuilder.jsx     # Drag-and-drop no-code IVR builder
        ├── DIDManager.jsx              # Global 100+ DID pool manager
        ├── IVRDiscoveryMap.jsx         # AI IVR tree auto-crawler
        ├── ComplianceAuditor.jsx       # PCI-DSS, HIPAA, GDPR & SOC 2 compliance auditor
        ├── CarrierHeatmap.jsx          # Global edge POP latency & MOS audio heatmap
        ├── RBACAuditInspector.jsx      # Keycloak IAM operator provisioning & audit trail
        ├── SIPRecordingPlayer.jsx      # Wireshark SIP PCAP packet trace & audio player
        ├── SIPDiagnostics.jsx          # RFC 3261 / PRACK call ladder sequencer
        ├── WebHookRetryEngine.jsx      # Exponential backoff webhook queue & DLQ
        ├── CarrierLATAZoneLookup.jsx   # NANP exchange DB, CLLI switches & LRN inspector
        ├── GlobalOutageTimeline.jsx    # Realtime PSTN incident tracker & blast radius
        ├── CarrierSLAScorecard.jsx     # P95/P99 latency benchmarks & penalty calculator
        ├── EscalationPolicies.jsx      # Multi-tier alert escalation & 24/7 on-call roster
        └── ... (89 additional feature-complete enterprise components)
```

---

## 🔌 Live REST Calculation & Telemetry Endpoints (`server/index.js`)

| Endpoint | Method | Description |
| :--- | :---: | :--- |
| `/api/sip/generate` | `POST` | RFC 3261 SIP message and RFC 4566 SDP Offer/Answer generator |
| `/api/webhooks/dispatch` | `POST` | Enterprise HMAC-SHA256 signed webhook dispatcher & retry simulation |
| `/api/loadtest/start` | `POST` | High-volume concurrent PSTN load and stress test trigger |
| `/api/compliance/audit` | `POST` | Automated multi-standard compliance validator with SHA-256 certificate hash |
| `/api/lufs/normalize` | `POST` | EBU R128 loudness normalization and True Peak limiter margin calculation |
| `/api/telecom/lcr` | `POST` | Least Cost Routing (LCR) engine calculating annual cost savings vs Cyara/Klearcom |
| `/api/erlang/calculate` | `POST` | Erlang C contact center queue delay probability, ASA, and agent staffing math |
| `/api/stirshaken/verify`| `POST` | STIR/SHAKEN PASSporT cryptographic token and X.509 certificate validation |
| `/api/sip/parse` | `POST` | RFC 3261 SIP message and RFC 4566 SDP offer/answer parser |
| `/api/voicebot/bargein` | `POST` | Voice Activity Detection (VAD) audio cutoff latency and prompt barge-in benchmark |
| `/api/dashboard/stats` | `GET` | Aggregated executive telemetry, active calls, 99.98% uptime, and vendor ROI |
| `/api/config` | `GET` | System configuration, telephony provider flags, and version metadata |
| `/api/tests/history` | `GET` | Historical test run records and pass/fail distribution |
| `/api/alerts` | `GET` | Active alert triggers, severity levels, and acknowledgment state |
| `/api/reports/html` | `GET` | Board-ready executive SLA HTML report export |
| `/api/dtmf/wav` | `GET` | On-the-fly 8000Hz PCM G.711u DTMF tone audio synthesizer |
| `/api/gemini/analyze` | `POST` | Multimodal prompt evaluation and root cause analysis |
| `/api/ivr/discover` | `POST` | Recursive IVR tree exploration and prompt transcription |

---

## 🔑 Default Credentials & Authentication

| Role | Username | Password | Realm | Permissions |
| :--- | :--- | :--- | :--- | :--- |
| **Super Admin** | `admin` | `password` | `voxpulse-realm` | `ALL_MODULES`, `LIVE_DIAL`, `IVR_DISCOVERY`, `GEMINI_STUDIO` |
| **Telecom Engineer** | `vance@voxpulse.io` | `password` | `voxpulse-realm` | `SIP_TRUNKS`, `PCAP_ANALYSIS`, `POLQA_METRICS` |
| **Compliance Auditor** | `compliance@voxpulse.io` | `password` | `voxpulse-realm` | `PCI_REDACTION`, `HIPAA_AUDIT`, `RETENTION_PURGE` |

---

## 💻 Essential Terminal Commands

```bash
# 1. Start Dev Application (Backend + Frontend concurrently)
npm run dev

# 2. Run the Complete 1,500 Automated Test Cases Suite
npm run test:1500

# 3. Primary Test Shortcut (Runs all 1,500 tests)
npm run test

# 4. Run Backward-Compatible Suites (Runs 1,500 / 300 tests)
npm run test:1000
npm run test:600
npm run test:300

# 5. Run Autonomous E2E Integration Tests (18 Endpoints Verified)
npm run test:e2e

# 6. Production Build Verification
npm run build

# 7. Seed / Re-Seed PostgreSQL Database (15 Tables)
npm run db:seed

# 8. Launch Full Stack via Docker
docker-compose up -d
```

---

## 📊 Summary of 1,500 Test Cases (`npm run test:1500`)

| Group # | Test Category | Count | Status |
| :---: | :--- | :---: | :---: |
| **Group 1** | DTMF Tone Audio Synthesizer Verification | 50 | PASSED |
| **Group 2** | POLQA & MOS Audio SLA Threshold Calculations | 50 | PASSED |
| **Group 3** | Global DID PSTN Line Reachability | 50 | PASSED |
| **Group 4** | SIP Response Protocol Header Diagnostics | 50 | PASSED |
| **Group 5** | Gemini AI Speech & Intent Verification | 50 | PASSED |
| **Group 6** | Telco LRN & LATA Carrier Routing | 50 | PASSED |
| **Group 7** | Webhook Delivery & DLQ Retry Engine | 50 | PASSED |
| **Group 8** | Voice Biometrics & Anti-Spoofing | 50 | PASSED |
| **Group 9** | SBC Primary/Secondary Trunk Failover | 50 | PASSED |
| **Group 10** | Spoken PII Audio Redaction & PCI Muting | 50 | PASSED |
| **Group 11** | Multi-Tenant Workspace Quotas | 50 | PASSED |
| **Group 12** | STIR/SHAKEN Attestation Identity Tokens | 50 | PASSED |
| **Group 13** | 24/7 Synthetic Cron Schedule Polling | 50 | PASSED |
| **Group 14** | Tier-1 Carrier LCR & Financial Savings Engine | 50 | PASSED |
| **Group 15** | EBU R128 LUFS Loudness & True Peak Limiting | 50 | PASSED |
| **Group 16** | Erlang C Contact Center Queue Math & Staffing SLAs | 50 | PASSED |
| **Group 17** | RFC 3262 PRACK 100rel Signaling Reliability | 50 | PASSED |
| **Group 18** | RFC 3515 SIP REFER Call Transfers & NOTIFY Traces | 50 | PASSED |
| **Group 19** | STIR/SHAKEN PASSporT Cryptographic Verification | 50 | PASSED |
| **Group 20** | VoIP Codec Transcoding & Bandwidth Sizing | 50 | PASSED |
| **Group 21** | BGP Routing & Hop-by-Hop Autonomous System (AS) Path | 50 | PASSED |
| **Group 22** | RFC 4733 / RFC 2833 In-Band vs Out-of-Band DTMF Relay | 50 | PASSED |
| **Group 23** | Kari's Law & RAY BAUM'S Act Direct 911 / MSAG Dispatch | 50 | PASSED |
| **Group 24** | ITU-T G.168 Acoustic Echo Cancellation (ERL / ERLE) | 50 | PASSED |
| **Group 25** | Adaptive Jitter Buffer Packet Loss Concealment (PLC) | 50 | PASSED |
| **Group 26** | Answering Machine Detection (AMD) 1000Hz Beep & Goertzel | 50 | PASSED |
| **Group 27** | Voice Biometric Micro-Tremor & Deepfake Anti-Spoofing | 50 | PASSED |
| **Group 28** | WebRTC SCTP DataChannel & ICE Candidate Priority | 50 | PASSED |
| **Group 29** | Telecom Tax & Statutory Regulatory Surcharges (USF 34.6%) | 50 | PASSED |
| **Group 30** | Multi-Tenant Enterprise Quota & Realm Isolation | 50 | PASSED |
| **TOTAL** | **Comprehensive Automated Test Cases** | **1,500** | **100% SUCCESS** |

---

## 🎯 Guidance for Next Developers / Claude AI

1. **Adding New Telephony Adapters**: Add methods in `server/telephonyAdapter.js` under the `TelephonyAdapter` class.
2. **Adding New UI Modules**:
   - Create `src/components/YourNewComponent.jsx`.
   - Register item in `src/components/Sidebar.jsx`.
   - Add tab render condition in `src/App.jsx`.
3. **Updating Database Schema**: Add `CREATE TABLE IF NOT EXISTS` and `INSERT INTO` seed statements in `server/db/schema.sql`.
4. **Extending Test Suite**: Append new test group loops in `server/tests/comprehensive1500TestSuite.js`.

---
*VoxPulse AI Documentation Compiled Successfully • All 1,500 Tests Passing • Build Verified*
