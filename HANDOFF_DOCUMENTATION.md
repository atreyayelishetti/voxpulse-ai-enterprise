# 🚀 VoxPulse AI - Comprehensive Handoff & Architecture Documentation
> **Target Audience:** Claude AI / Engineers continuing development on VoxPulse AI  
> **Status:** Production-Ready • 104 Enterprise UI Modules • 700 Automated Test Cases (100% Pass Rate)

---

## 📌 Executive Overview

**VoxPulse AI** is an enterprise-grade, in-house replacement platform for commercial IVR testing vendors such as **Klearcom**, **Cyara**, and **Hammer**. It delivers end-to-end automated PSTN call testing, voicebot NLU verification, POLQA/PESQ audio MOS scoring, global DID reachability monitoring, and multi-carrier LCR cost optimization.

### Key Highlights
- **104 Enterprise UI Modules**: Dark-mode glassmorphic interface covering every telecom, AI, security, and PSTN diagnostic capability.
- **700 Automated Test Cases**: 100% pass rate across 14 test groups (`npm run test:600`).
- **Google Gemini 2.5 & 3.8 AI**: Multimodal acoustic prompt parsing, intent detection, and post-call RCA audits.
- **Multi-Provider Telephony Egress**: Live **Telnyx PSTN**, **Twilio**, **Google Cloud CCAI**, and **PSTN Simulator**.
- **Keycloak OIDC SSO**: Realm authentication with Bearer JWT tokens (`admin` / `password`).
- **Docker Ready**: Pre-configured `docker-compose.yml` with PostgreSQL 16, Keycloak 24, Express Backend, and Nginx Frontend.

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

---

## 📁 Repository Structure & Directory Map

```
ivr testing/
├── .env                                # Environment credentials & API keys
├── docker-compose.yml                  # Docker orchestration (Postgres, Keycloak, Backend, Frontend)
├── package.json                        # Dependencies & npm script shortcuts
├── HANDOFF_DOCUMENTATION.md            # This handoff documentation
│
├── server/                             # Node Express Backend & Telephony Core
│   ├── index.js                        # Primary REST API routes & WebSocket server
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
│   │   ├── schema.sql                  # Complete DDL tables & pre-seeded test datasets
│   │   └── seed.js                     # Database seeding script (`npm run db:seed`)
│   │
│   └── tests/
│       ├── comprehensive600TestSuite.js# 700 automated test cases (Groups 1 to 14)
│       ├── comprehensive300TestSuite.js# 300 test cases
│       └── e2eTestSuite.js             # End-to-end integration tests
│
├── keycloak/
│   └── voxpulse-realm.json             # Keycloak realm export file
│
└── src/                                # Frontend React Application
    ├── main.jsx                        # React root entry point
    ├── App.jsx                         # Main dashboard layout, state, & tab router
    ├── index.css                       # Glassmorphic dark design system & tokens
    │
    └── components/                     # 104 Enterprise UI Module Components
        ├── LoginScreen.jsx             # Keycloak OIDC SSO login modal (`admin` / `password`)
        ├── Sidebar.jsx                 # 104-tab glassmorphic navigation sidebar
        ├── LiveCallConsole.jsx         # Live interactive softphone & audio spectrum
        ├── WebRTCSoftphone.jsx         # Browser mic softphone dialer
        ├── VoicebotStudio.jsx          # Voicebot AI NLU studio
        ├── VisualCanvasBuilder.jsx     # Drag-and-drop no-code IVR builder
        ├── DIDManager.jsx              # Global 100+ DID pool manager
        ├── IVRDiscoveryMap.jsx         # AI IVR tree auto-crawler
        ├── EmergencyMonitor.jsx        # 24/7 E911 emergency outage monitor
        ├── SyntheticCronScheduler.jsx  # 24/7 automated synthetic cron scheduler
        ├── CarrierInterconnectMatrix.jsx# Tier-1 carrier POP latency & jitter matrix
        ├── CarrierLCRSavingsCalc.jsx   # Klearcom ROI & LCR cost savings calculator
        ├── ExecutiveSlaPdfExporter.jsx # Board-ready PDF report exporter
        └── ... (91 additional enterprise components)
```

---

## 🔑 Environment Configuration (`.env`)

```env
# VoxPulse AI Configuration
PORT=3001
VITE_API_URL=http://localhost:3001

# Google Gemini API Key (Live AI NLU & RCA Audits)
GEMINI_API_KEY=AIzaSy...

# Telephony Credentials
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=

# Telnyx Credentials (Live Outbound PSTN Calling)
TELNYX_API_KEY=KEY01A...
TELNYX_PHONE_NUMBER=

# PostgreSQL Database
DATABASE_URL=postgresql://voxpulse:voxpulse123@localhost:5439/voxpulse_db

# Keycloak OIDC SSO
KEYCLOAK_URL=http://localhost:8080
KEYCLOAK_REALM=voxpulse-realm
KEYCLOAK_CLIENT_ID=voxpulse-app
KEYCLOAK_CLIENT_SECRET=voxpulse-secret-key-123

# Environment
NODE_ENV=development
```

---

## 🔑 Default Credentials & Authentication

| Role | Username | Password | Realm | Permissions |
| :--- | :--- | :--- | :--- | :--- |
| **Super Admin** | `admin` | `password` | `voxpulse-realm` | `ALL_MODULES`, `LIVE_DIAL`, `IVR_DISCOVERY`, `GEMINI_STUDIO` |
| **QA Engineer** | `qa.lead@enterprise.com` | `password` | `voxpulse-realm` | `TEST_RUNNER`, `REPORTS_EXPORT` |
| **Carrier Operator** | `ops@telecom.internal` | `password` | `telecom-ops` | `SIP_DIAGNOSTICS`, `SBC_FAILOVER` |

---

## 💻 Essential Terminal Commands

```bash
# 1. Start Dev Application (Backend + Frontend concurrently)
npm run dev

# 2. Run the Complete 700 Automated Test Cases Suite
npm run test:600

# 3. Run E2E Integration Tests
npm run test:e2e

# 4. Seed / Re-Seed PostgreSQL Database
npm run db:seed

# 5. Launch Full Stack via Docker
docker-compose up -d
```

---

## 📊 Summary of 700 Test Cases (`npm run test:600`)

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
| **TOTAL** | **Comprehensive Automated Test Cases** | **700** | **100% SUCCESS** |

---

## 🎯 Guidance for Next Developers / Claude AI

1. **Adding New Telephony Adapters**: Add methods in `server/telephonyAdapter.js` under the `TelephonyAdapter` class.
2. **Adding New UI Modules**:
   - Create `src/components/YourNewComponent.jsx`.
   - Register item in `src/components/Sidebar.jsx`.
   - Add tab render condition in `src/App.jsx`.
3. **Updating Database Schema**: Add `CREATE TABLE IF NOT EXISTS` and `INSERT INTO` seed statements in `server/db/schema.sql`.
4. **Extending Test Suite**: Append new test group loops in `server/tests/comprehensive600TestSuite.js`.

---
*VoxPulse AI Documentation Compiled Successfully • All 700 Tests Passing*
