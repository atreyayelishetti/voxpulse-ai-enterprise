# 🌐 VoxPulse AI - Genesys Cloud CX Integration & Configuration Guide

> **Document Version:** 1.0.0-enterprise  
> **Target Audience:** Genesys Cloud Administrators, Contact Center Architects, Telecom Engineers, QA Leads  
> **Compatibility:** Genesys Cloud CX 1, CX 2, CX 3 • Genesys Cloud Voice (GCV) • Bring Your Own Carrier (BYOC) Cloud/Premise  

---

## 📌 1. Executive Summary & Value Proposition

Enterprise contact centers operating on **Genesys Cloud CX** frequently face high friction when implementing synthetic IVR testing platforms like Cyara or Hammer:
1. **Redundant Carrier Subscriptions**: Traditional tools force enterprises to buy third-party CPaaS accounts (Twilio, Telnyx, Bandwidth), incurring duplicate carrier fees and maintenance overhead.
2. **Network Disconnect**: Calls originating from foreign CPaaS carriers do not traverse the enterprise's private Genesys Cloud Voice (GCV) routing profiles, Session Border Controllers (SBCs), or BYOC trunks under real production conditions.
3. **Complex Dial-Plan Configuration**: Maintaining disparate numbers across external carriers creates security holes and configuration drift.

### The VoxPulse AI Solution
VoxPulse AI integrates directly with your **Genesys Cloud CX Organization** via standard REST APIs and OAuth 2.0 Client Credentials:
- **Zero Third-Party Carrier Dependency**: VoxPulse dials outbound synthetic calls and tests inbound Architect IVRs using your existing Genesys Cloud Voice (GCV) or BYOC trunks.
- **Native Architect Flow Discovery**: VoxPulse automatically queries and maps your published Inbound Call Flows, Digital Bot Flows, and Secure IVR flows directly from the Genesys Architect API.
- **Real-Time DTMF & Conversation Control**: VoxPulse sends RFC 4733 DTMF tones, inspects conversation participant states, and analyzes audio stream quality in real time.
- **Agentless Outbound Testing**: Tests run cleanly through Genesys Cloud agentless call endpoints without tying up physical contact center agent licenses or distorting ACD queue reporting.

---

## 🏗️ 2. Architectural Overview

```
                                  ┌────────────────────────────────────────┐
                                  │           VoxPulse AI Cloud            │
                                  │      (SaaS Multi-Tenant Engine)        │
                                  └───────────────────┬────────────────────┘
                                                      │
                       HTTPS REST (OAuth2 Client Creds) │ POST /api/v2/conversations/calls
                       + In-Dialog DTMF Control        │ POST /api/v2/conversations/calls/{id}/digits
                                                      ▼
                       ┌────────────────────────────────────────────────────────┐
                       │                   Genesys Cloud CX                     │
                       │     (US East, US West, Frankfurt, Dublin, Tokyo, etc.) │
                       └───────────┬───────────────────────────────┬────────────┘
                                   │                               │
                       Inbound Call│                               │Agentless Outbound Call
                       via GCV/BYOC│                               │via Customer Trunk
                                   ▼                               ▼
                 ┌───────────────────────────────────┐   ┌───────────────────────────────────┐
                 │       Architect Inbound Flow      │   │     Enterprise SIP Trunk / SBC    │
                 │      (IVR / Bot / DTMF Menu)      │   │  (GCV, AudioCodes, Ribbon, Cisco) │
                 └─────────────────┬─────────────────┘   └─────────────────┬─────────────────┘
                                   │                                       │
                                   └───────────────────┬───────────────────┘
                                                       ▼
                                     ┌───────────────────────────────────┐
                                     │  VoxPulse Real-Time Telemetry     │
                                     │  • POLQA / MOS Audio Spectrum     │
                                     │  • Menu Drop-off & Intent Match   │
                                     │  • Disconnect Reason & Latency    │
                                     └───────────────────────────────────┘
```

---

## 🔑 3. Genesys Cloud Setup (Step-by-Step)

Configuring Genesys Cloud to communicate with VoxPulse requires three simple administrative steps within the Genesys Cloud Admin Console:
1. **Create an OAuth Role with Minimal Least-Privilege Scopes**
2. **Generate an OAuth 2.0 Client Credentials Grant**
3. **Verify Outbound Dialing Rules and ANI Assignments**

---

### Step 3.1: Create a Custom Role for VoxPulse

To adhere to enterprise SOC-2 and ISO 27001 zero-trust guidelines, create a custom role with only the exact permissions needed for synthetic testing.

1. Log in to your **Genesys Cloud Admin Console** (`https://login.{your-region}/admin`).
2. Navigate to **Admin** > **People & Permissions** > **Roles/Permissions**.
3. Click **Add Role**.
4. Set the **Name** to: `VoxPulse Synthetic Testing Service`.
5. In the **Permissions** tab, search and assign the following 6 permission scopes:

| Permission Scope | Required Actions | Technical Purpose |
| :--- | :--- | :--- |
| `conversation:call:create` | `Add`, `Create` | Allows VoxPulse to initiate agentless synthetic test calls. |
| `conversation:call:edit` | `Edit`, `Update` | Enables sending DTMF dual-tone multifrequency digits into running IVR flows. |
| `conversation:call:view` | `View` | Inspects real-time conversation state, duration, disconnect reasons, and participant metrics. |
| `architect:flow:view` | `View` | Allows VoxPulse to discover published Architect IVR flows and match test targets. |
| `telephony:plugin:all` | `View` | Queries Edge trunks, BYOC statuses, and outbound route health. |
| `recording:recording:view` | `View` *(Optional)* | Enables automated retrieval of call audio recordings for offline POLQA audio scoring. |

6. Click **Save** to create the role.

---

### Step 3.2: Create the OAuth2 Client Credentials Integration

VoxPulse uses server-to-server **OAuth 2.0 Client Credentials Grant** (machine-to-machine) to authenticate without user interaction.

1. Navigate to **Admin** > **Integrations** > **OAuth**.
2. Click **Add Client**.
3. Configure the integration fields:
   - **App Name**: `VoxPulse AI Synthetic IVR Tester`
   - **Description**: `Automated IVR regression testing, load testing, and audio quality monitoring`
   - **Token Duration**: `86400` seconds (24 hours - auto-refreshed by VoxPulse)
   - **Grant Types**: Select **Client Credentials**
4. Under **Roles**, select the custom role created in Step 3.1: `VoxPulse Synthetic Testing Service`.
5. Click **Save**.
6. **Immediately copy and securely store**:
   - **Client ID** (e.g., `8f9b2c14-52d3-4a11-b461-9c3f0b12e345`)
   - **Client Secret** (e.g., `zK9jP0...` — *this will only be displayed once*)

---

### Step 3.3: Identify Your Genesys Cloud Regional Domain

Genesys Cloud operates across distinct geographic AWS regions. You will provide your region when connecting VoxPulse:

| Geographic Region | Region Code | Genesys Cloud Login / API Domain |
| :--- | :--- | :--- |
| **US East 1 (N. Virginia)** | `us-east-1` | `mypurecloud.com` |
| **US East 2 (Ohio)** | `us-east-2` | `use2.us-east-2.aws.pure.cloud` |
| **US West 2 (Oregon)** | `us-west-2` | `usw2.pure.cloud` |
| **Canada Central (Montreal)** | `ca-central-1` | `cac1.pure.cloud` |
| **EU Central 1 (Frankfurt)** | `eu-central-1` | `mypurecloud.de` |
| **EU West 1 (Dublin)** | `eu-west-1` | `mypurecloud.ie` |
| **EU West 2 (London)** | `eu-west-2` | `euw2.pure.cloud` |
| **AP Northeast 1 (Tokyo)** | `ap-northeast-1` | `mypurecloud.jp` |
| **AP Southeast 2 (Sydney)** | `ap-southeast-2` | `mypurecloud.com.au` |

---

### Step 3.4: Configure Inbound Test DIDs & Architect Flow Routing

To ensure automated synthetic calls do not pollute production analytics or accidentally reach live human agents during load tests:

1. **Dedicated Test DID or Extension**: Assign a test DID (or an internal extension like `*8901`) directly to the target **Architect Inbound Call Flow**.
2. **Participant Data Tagging**: Within your Architect Flow, add a **Set Participant Data** block at the entry node:
   ```
   Attribute Name: voxpulse_test
   Attribute Value: "true"
   ```
3. **Safe Queue Bypass**: Before any **Transfer to ACD** block in Architect, evaluate `Get Participant Data(voxpulse_test)`.
   - If `voxpulse_test == "true"`: Route to a test confirmation prompt (e.g., *"Transfer step reached successfully. Ending test."*) followed by a **Disconnect** block.
   - If not a test: Proceed with standard ACD agent routing.

---

## ⚙️ 4. Connecting Genesys Cloud in VoxPulse AI

Once you have your **Client ID**, **Client Secret**, and **Region**:

1. In VoxPulse AI, click on the **Genesys Cloud CX** tab in the top navigation (or launch the **Onboarding Wizard**).
2. Enter your credentials:
   - **Genesys Cloud Region**: Select your region (e.g., `US East 1 (N. Virginia)`).
   - **OAuth Client ID**: Paste the Client ID from Step 3.2.
   - **OAuth Client Secret**: Paste the Client Secret from Step 3.2.
   - **Caller ID Number (ANI)**: Enter the verified outbound E.164 phone number configured in your Genesys Cloud trunk (e.g., `+18005550199`).
   - **Default Queue / Routing ID**: *(Optional)* Enter a fallback queue ID if testing agent transfers.
3. Click **Test API Connection & Save**:
   - VoxPulse calls `POST https://login.{region}/oauth/token` to verify token generation.
   - VoxPulse retrieves your organization metadata, active Architect Flows, and Edge Trunk statuses.
   - A green **"Connected & Authenticated"** badge will confirm active connectivity.

---

## 🧪 5. Executing Synthetic IVR Tests via Genesys Cloud

### Method A: Live Interactive Test Console (Visual Sandbox)
Under the **Live Call Sandbox** section in the **Genesys Cloud CX** tab:
1. Enter the target phone number (e.g., `+18005550100`).
2. Click **Start Genesys Outbound Call**.
3. VoxPulse invokes the Genesys Cloud Conversation API:
   ```http
   POST /api/v2/conversations/calls
   Content-Type: application/json
   Authorization: Bearer <access_token>

   {
     "phoneNumber": "+18005550100",
     "callerId": "+18005550199",
     "callType": "outbound"
   }
   ```
4. Once connected, use the on-screen **DTMF Keypad (0-9, *, #)** to navigate menus in real time. Each button press invokes:
   ```http
   POST /api/v2/conversations/calls/{conversationId}/digits
   {
     "digits": "1"
   }
   ```
5. Click **Terminate Call** when finished.

### Method B: Automated Regression Test Suites
All 100+ standard VoxPulse automated test suites (e.g., *Emergency E911*, *Spanish Bilingual Branching*, *Credit Card Payment Gateway*, *Voicebot Barge-In*) can run against Genesys Cloud:
- Select **Provider: Genesys Cloud CX** in the test runner configuration.
- VoxPulse orchestrates the full sequence of synthetic call creation, audio stream capture, DTMF menu traversal, and intent verification directly through your Genesys Cloud infrastructure.

---

## 📊 6. Genesys Cloud Trunks & BYOC Monitoring

VoxPulse continuously monitors the health of your telephony egress points:
- **Genesys Cloud Voice (GCV)**: Checks carrier trunk availability, registration state, and packet loss.
- **BYOC Cloud (AWS Direct Connect / SIP TLS)**: Monitors latency to your carrier SBCs (AudioCodes, Ribbon, Cisco, Metaswitch).
- **In-Dialog Codec Verification**: Confirms negotiation of G.711u / G.711a (PCMU/PCMA) or Opus audio codecs to ensure high-fidelity voicebot recognition.

---

## 🎙️ 6.1 Architect User Prompts & Audio DSP Acoustic Inspection

VoxPulse AI integrates directly with the Genesys Architect User Prompts API (`/api/v2/architect/prompts`) to download and analyze prompt audio assets:
1. **ITU-T P.863 POLQA MOS Audio Scoring**: Verifies that prompts have a Mean Opinion Score (MOS) $\ge 4.2$, eliminating muffled, garbled, or low-bitrate recordings.
2. **EBU R128 & ITU-R BS.1770-4 Loudness Normalization**: Measures integrated loudness against the enterprise standard of **-16.0 LUFS** ($\pm 0.5$ LUFS). Flags gain deltas to ensure consistent volume between system prompts and dynamic TTS variables.
3. **True Peak Ceiling Limiting**: Clamps audio peaks to **-1.0 dBFS** to prevent inter-sample clipping on PSTN DAC codecs.
4. **PSTN Voiceband Bandpass Filtering**: Analyzes audio frequencies between 300 Hz and 3400 Hz, computing signal-to-noise ratios (SNR $> 40$ dB) and detecting dead air gaps.

---

## ⚡ 6.2 Genesys Cloud Data Actions & Web Services Diagnostics

Architect IVR flows depend on **Data Actions** to fetch cardholder records, verify CVV/PINs, score transactions via Visa Advanced Authorization (VAA), and pop customer profiles in CRM:
- **Interactive REST Execution**: Dispatches live HTTP requests using the action's configured velocity request template and JSON response mapping.
- **Latency SLA Assertions**: Benchmarks round-trip execution time against SLA thresholds (e.g. $< 300$ms for VAA risk scoring).
- **Failure & Timeout Fallback Simulation**:
  - **504 Gateway Timeout**: Simulates backend timeouts to verify that Architect flows correctly trigger `Failure` or `Timeout` branches and gracefully route callers to emergency fallback ACD queues instead of abruptly disconnecting.
  - **400 Bad Request**: Simulates invalid card tokens or payload format errors to confirm that Architect prompts callers to re-enter input.

---

## 🚀 6.3 Automated Architect Flow Multi-Hop Journey Testing

Rather than manually dialing DNIS numbers, VoxPulse's **Automated Flow Journey Tester** executes simulated multi-node journeys through published Architect flows:
1. **DNIS Dial**: Originates call via customer's GCV or BYOC trunk.
2. **Prompt Expectation**: Listens for and transcribes the opening greeting using Google Gemini AI speech recognition, asserting that it matches the expected regex pattern.
3. **RFC 4733 DTMF Injection**: Sends dual-tone multi-frequency digits (e.g., '1' for English) in-dialog.
4. **Data Action Verification**: Confirms that backend card verification actions succeed within SLA bounds.
5. **ACD Queue Routing**: Validates that call is successfully placed into the intended priority queue (e.g., `q_visa_fraud_triage`) with appropriate skills tags.

---


## 🔒 7. Security, Compliance & Rate Limits

### Security Controls
- **Zero Inbound Network Exposure**: VoxPulse only requires outbound HTTPS access to `api.{region}`. You do not need to open inbound firewall ports or expose your internal telephony network.
- **Credential Encryption**: Client secrets are encrypted in the VoxPulse database using AES-256-GCM.
- **Automated Token Lifecycle**: OAuth access tokens are cached in memory and automatically refreshed prior to expiration without impacting in-flight tests.

### Genesys Cloud API Rate Limits
- Genesys Cloud enforces a default limit of **300 requests per minute** per OAuth client.
- VoxPulse includes an integrated **Exponential Backoff & Token Bucket Engine** that automatically batches requests and throttles high-volume load tests to stay safely within Genesys API limits.

---

## 🛠️ 8. Troubleshooting & Common Error Codes

| HTTP Status | Error Code | Root Cause | Solution |
| :--- | :--- | :--- | :--- |
| **`401 Unauthorized`** | `bad.credentials` | Client ID or Client Secret is incorrect, or region domain is mismatched. | Verify the Client ID and Secret in Genesys Cloud `Admin > OAuth`, and confirm the correct regional domain is selected. |
| **`403 Forbidden`** | `insufficient.permissions` | The OAuth role is missing one or more required permissions. | Check that the role has `conversation:call:create`, `conversation:call:edit`, and `conversation:call:view`. |
| **`400 Bad Request`** | `invalid.phone.number` | The target phone number or callerId is not in valid E.164 format. | Ensure numbers include country code prefix (e.g., `+1` for North America, `+44` for UK). |
| **`404 Not Found`** | `conversation.not.found` | The call was disconnected before the DTMF tone or status query was sent. | Check Architect flow logic for immediate hangup or invalid route. |
| **`429 Too Many Requests`**| `rate.limit.exceeded` | Burst API calls exceeded 300 req/min. | VoxPulse automatically backs off; reduce concurrency if running extreme load tests. |
| **`409 Conflict`** | `max.calls.exceeded` | Organization concurrent outbound call limit reached on GCV trunk. | Contact your Genesys account executive to increase trunk capacity. |

---

## 📞 9. Technical Support & Integration Verification

To verify your integration before going live with production regression tests:
1. Navigate to **Genesys Cloud CX** in the VoxPulse UI.
2. Click **Run Diagnostic Ping**.
3. Confirm that all three indicators display green:
   - `OAuth 2.0 Token Exchange: SUCCESS`
   - `Architect Flow API Listing: SUCCESS`
   - `Edge Trunk Telemetry: ACTIVE`

For enterprise deployment support, contact your dedicated VoxPulse Solutions Architect or email **enterprise-support@voxpulse.io**.
