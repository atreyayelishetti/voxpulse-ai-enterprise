// VoxPulse AI - Copilot AI Assistant Engine
// Comprehensive Telecom, Genesys Cloud CX, Visa Enterprise, and 103-Screen Platform Knowledge Base
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
dotenv.config();

class CopilotEngine {
  constructor() {
    this.geminiClient = null;
    if (process.env.GEMINI_API_KEY) {
      try {
        this.geminiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      } catch (err) {
        console.warn('[Copilot Engine] Gemini client init error, falling back to local knowledge base:', err.message);
      }
    }

    // Curated Intent & Knowledge Base for Instant Answers
    this.knowledgeBase = [
      {
        keywords: ['genesys', 'genesys cloud', 'byoc', 'twilio', 'without twilio', 'telnyx', 'contact center', 'prompt', 'data action', 'journey test', 'trunk probe'],
        actionNavTab: 'saas-genesys',
        navLabel: 'Open Genesys Cloud CX Hub',
        summary: `### Testing Genesys Cloud CX Without Twilio or Telnyx
VoxPulse AI connects directly to your existing **Genesys Cloud CX** organization with **zero third-party carrier subscriptions**:

1. **Direct BYOC & GCV Telephony:** Test calls egress through your enterprise's **Genesys Cloud Voice (GCV)** or **BYOC Edge SIP Trunks** (AudioCodes Mediant 9000 & Ribbon SBC 7000), eliminating carrier markups ($0.00/min).
2. **Architect User Prompts & Audio DSP:** Audits prompt audio files for ITU-T P.863 POLQA MOS (target $\ge 4.2$), EBU R128 loudness normalization (-16.0 LUFS), True Peak dBFS ceiling (-1.0 dBFS), and PSTN bandpass frequencies (300–3400 Hz).
3. **Data Actions & Web Services Diagnostics:** Interactively test REST Data Actions (e.g. *Visa Card Verification*, *VAA Authorization Score*, *Debit PIN HSM*), assert latency SLAs, and simulate **504 Gateway Timeouts** or **400 Bad Requests** to verify Architect fallback routing.
4. **Automated Flow Journey Tester:** Simulates multi-node IVR journeys (DNIS Dial $\to$ Prompt Match $\to$ DTMF Tone Injection $\to$ Data Action $\to$ ACD Queue Transfer) with per-step latency telemetry.
5. **Continuous SIP OPTIONS Trunk Probes:** Dispatches SIP OPTIONS keepalives across all Edge SBCs to measure real-time latency, jitter, packet loss, and channel saturation.
6. **Agentless Outbound Calling & RFC 4733 DTMF:** Originates calls via \`POST /api/v2/conversations/calls\` and injects DTMF tones in-dialog without physical agent licenses.`
      },

      {
        keywords: ['visa', 'visa inc', 'pci', 'pci-dss', 'credit card', 'pan', 'cvv', 'sso', 'okta', 'ashburn'],
        actionNavTab: 'compliance',
        navLabel: 'Open PCI & Compliance Auditor',
        summary: `### Visa Inc. Enterprise Architecture & PCI-DSS Level 1 Setup
Your workspace is pre-seeded for **Visa Inc. (\`org_visa_inc\`)**:

- **SSO Federation:** Integrated with Visa Okta / PingFederate SAML 2.0 & OIDC PKCE. Domain auto-detection recognizes \`@visa.com\` corporate logins.
- **Pre-Provisioned DIDs:**
  - \`+1-800-847-2911\`: Global Cardholder Support (Ashburn BYOC Trunk)
  - \`+1-800-252-4370\`: Card Activation Hotline
  - \`+1-800-523-4116\`: Fraud & Dispute Resolution (Frankfurt Backup SBC)
- **Zero-Storage Audio Redaction (\`tab: redactor\`):** When card numbers (PANs) or CVVs are spoken or keyed via DTMF, a 400Hz acoustic silence tone replaces the audio waveform in real time. Luhn-algorithm sanitization scrubs transcripts in-flight before database storage.
- **High-Availability SBCs:** Primary Ashburn (\`sbc-ashburn-01.visa.com:5061;transport=tls\`) with sub-second failover to Frankfurt.`
      },
      {
        keywords: ['polqa', 'pesq', 'mos', 'audio quality', 'itu-t', 'p.863', 'voice quality'],
        actionNavTab: 'polqa',
        navLabel: 'Open POLQA & PESQ Analyzer',
        summary: `### ITU-T P.863 POLQA v3 vs Legacy PESQ
VoxPulse provides full perceptual acoustic analysis:

- **POLQA v3 (ITU-T P.863):** The modern telecommunications standard for fullband (up to 48kHz Opus) and wideband (AMR-WB, G.722) voice scoring. It accurately accounts for acoustic time-warping, packet loss concealment (PLC), and complex neural codecs.
- **Score Range:** 1.0 (unusable) to 5.0 (crystal clear). Telecom SLA thresholds typically mandate MOS >= 4.0.
- **Real-Time Degradation Factors:** The analyzer breaks down score penalties by attenuation (dB), packet loss jitter, and delay warp (ms).
- **Related Audio DSP Tools:** Check out **Spatial 3D MOS Map** (\`tab: mos3d\`), **Realtime MOS Alarms** (\`tab: mosalarms\`), and **LUFS Normalizer** (\`tab: lufs\`).`
      },
      {
        keywords: ['barge', 'barge-in', 'bargein', 'interrupt', 'mute', 'vad', '400ms'],
        actionNavTab: 'bargein',
        navLabel: 'Open Voicebot Barge-In Test',
        summary: `### Voicebot Barge-In Latency Benchmark
In conversational IVRs, **barge-in** measures how rapidly a voicebot stops speaking when a customer interrupts:

- **Target Enterprise SLA:** Prompt audio must drop to zero in **< 400 milliseconds**.
- **How to Test (\`tab: bargein\`):** The rig plays an IVR greeting and injects synthetic human interruption audio at a precise millisecond timestamp (e.g. t=2.40s). It tracks the exact Voice Activity Detection (VAD) trigger and mute cutoff latency.
- **Context Recovery (\`tab: bargerecovery\`):** Tests whether the LLM dialog state machine correctly pivots topic when a user changes their mind mid-sentence.`
      },
      {
        keywords: ['erlang', 'erlang c', 'staffing', 'queue', 'agents', 'headcount', 'asa', 'sla'],
        actionNavTab: 'erlang',
        navLabel: 'Open Erlang C SLA Predictor',
        summary: `### Erlang C Contact Center Queue & Staffing Math
The **Erlang C SLA Predictor** (\`tab: erlang\`) models queuing probabilities and agent requirements:

- **Formula:** Calculates traffic intensity $A = (\\lambda \\times \\text{AHT}) / 3600$, probability of wait $P_w$, Average Speed of Answer (ASA), and occupancy.
- **Example Calculation:** 600 calls/hr with 180s AHT yields 30 Erlangs. Schedulng 35 agents delivers an **83.7% Service Level** (answered in <20s) with 85.7% agent occupancy and 10.2s ASA.
- **Workforce Optimization:** Helps contact center directors balance labor expense against customer wait abandonment.`
      },
      {
        keywords: ['lcr', 'least cost routing', 'savings', 'cost', 'roi', 'billing', 'klearcom'],
        actionNavTab: 'lcrsavings',
        navLabel: 'Open Carrier LCR Savings Calc',
        summary: `### Least Cost Routing (LCR) & Klearcom Migration ROI
VoxPulse AI dramatically lowers telecom operating costs:

- **PSTN LCR Route Optimizer (\`tab: lcr\`):** Dynamically benchmarks termination rates across Telnyx ($0.0035/min), Twilio ($0.0130/min), Bandwidth, and direct peering to route calls via the cheapest compliant carrier.
- **Validated Enterprise Savings:** Saves **96% on toll costs**, generating **$146,700/year in direct savings** on 500,000 monthly test minutes.
- **Klearcom / Cyara Migration (\`tab: klearcom\`):** Replaces legacy per-port licenses ($250k–$450k/year) with VoxPulse AI Cloud ($48k–$72k/year) for a **65% to 80% TCO reduction** with 100% feature parity.`
      },
      {
        keywords: ['sections', 'sidebar', 'categories', 'how to navigate', 'all tools', 'menu'],
        actionNavTab: 'dashboard100',
        navLabel: 'Open 104-Module Executive Dashboard',
        summary: `### 8 Organized Sidebar Sections
The platform's 103 tools are grouped into 8 logical domains:

1. **🎙️ Core Voice & Testing Studio (8 tools):** Console, Softphone, Voicebot Studio, Canvas Builder, DIDs, Tree Discovery, Drop-off Graph, Session Replay.
2. **⚡ Automation & Load Probes (9 tools):** Flow Builder, Automated Runner, 24/7 Cron Scheduler, PSTN Load Tester, SIP Bursting, Chaos Studio, Emergency Monitor, Global Probes, Omnichannel.
3. **🎧 Audio Quality & POLQA DSP (17 tools):** POLQA/PESQ, 3D MOS Map, MOS Alarms, Noise & Codecs, Jitter Buffer, Echo AEC, LUFS, FFT, Silence Marker, Codec Transcoder, SSML, DTMF Sniffer, Barge-In, STT Matrix.
4. **🌐 SIP Signaling & Protocols (20 tools):** SIP Diagnostics, SBC Failover, PCAP Trace, TLS/SRTP, SIP Headers, SDP, PRACK, REFER, 401 Digest, OPTIONS Ping, Dialog Tracker, RFC 3261 Timers, WebRTC ICE.
5. **💰 Carrier Routing & LCR Savings (9 tools):** LCR Optimizer, LCR Savings Calc, Carrier Interconnect, Carrier Scorecard, Latency Heatmap, Toll-Free Billing, LATA DB, DNIS Map.
6. **🛡️ Regulatory, PCI & Security (11 tools):** PCI Compliance Auditor, Audio PII Redactor, STIR/SHAKEN, E911 Address Check, GDPR Retention, USF Tax Audit, Voice Biometrics, Keycloak RBAC.
7. **🤖 AI Studio & NLU Intelligence (12 tools):** Gemini AI Studio, Bot Combat Arena, Sentiment & Legal, STT Vocabulary, AMD Voicemail, Prompt A/B Test, NLU Heatmap, CSAT Predictor.
8. **📊 Executive Dashboards & ROI (17 tools):** 104-Module Executive Dashboard, Klearcom ROI, Executive PDF Exporter, Analytics, Outages Map, Screen Pop CTI, Erlang C Staffing.`
      },
      {
        keywords: ['sip', 'pcap', 'ladder', 'invite', 'signaling', 'wireshark', 'headers'],
        actionNavTab: 'sip',
        navLabel: 'Open SIP Protocol Diagnostics',
        summary: `### SIP Signaling & Packet Forensics
VoxPulse provides carrier-grade RFC 3261 inspection:

- **SIP Protocol Diagnostics (\`tab: sip\`):** Chronological call flow ladder diagram rendering INVITE, 100 Trying, 180 Ringing, 200 OK, ACK, and BYE messages with microsecond timestamps.
- **PCAP Packet Trace (\`tab: pcap\`):** Full Wireshark-compatible packet captures including Ethernet, IP, UDP, SIP, and RTP frames. Downloadable as \`.pcap\` for carrier NOC escalations.
- **SIP Header Overrides (\`tab: sipheaders\`):** Inject custom X-Headers, User-to-User Information (UUI), or P-Asserted-Identity for CTI screen pop testing.
- **High Availability (\`tab: failover\`):** Tests primary and secondary Session Border Controller failover.`
      },
      {
        keywords: ['cron', 'schedule', 'monitoring', '24/7', 'continuous', 'outage'],
        actionNavTab: 'cronscheduler',
        navLabel: 'Open 24/7 Synthetic Cron Scheduler',
        summary: `### 24/7 Synthetic Cron Scheduling
To catch silent carrier outages before end-users notice:

- **Cron Syntax:** Configure standard 5-part cron expressions (e.g. \`*/5 * * * *\` for every 5 minutes, \`0 * * * *\` hourly).
- **Target DIDs:** Select from your Global DID Pool or Genesys Architect flow numbers.
- **Automated Alert Escalation:** If consecutive test failures occur, the engine triggers PagerDuty, Slack webhooks, and SMS alerts via your **Escalation Policies** (\`tab: escalation\`).`
      },
      {
        keywords: ['audit', 'audit vault', 'soc-2', 'soc2', 'pci audit', 'tamper', 'immutable', 'hash chain', 'cef', 'siem', 'arcsight', 'splunk'],
        actionNavTab: 'saas-audit',
        navLabel: 'Open Immutable Audit Vault',
        summary: `### Enterprise Immutable Audit Vault (SOC-2 Type II & PCI-DSS 4.0)
The **Enterprise Audit Vault** (\`tab: saas-audit\`) maintains a tamper-evident cryptographic log:

- **SHA-256 Hash Chaining:** Every administrative action, SSO login, DID modification, and test dispatch is cryptographically chained to its previous block hash (\`prevHash\` $\to$ \`blockHash\`).
- **Cryptographic Verification:** One-click automated chain validation detects any unauthorized byte-level tampering or log truncation.
- **SIEM Streaming & Export:** Real-time export in ArcSight Common Event Format (CEF) and ndjson (JSONL) for Splunk, Datadog, and corporate SIEM ingestion.
- **Target Persona:** Meets strict SOC-2 Type II Trust Services Criteria and PCI-DSS 4.0 Requirement 10 (Audit Trail Security).`
      },
      {
        keywords: ['incident', 'incidents', 'servicenow', 'pagerduty', 'sev-1', 'sev 1', 'outage', 'itsm', 'remediate', 'remediation', 'failover'],
        actionNavTab: 'saas-incidents',
        navLabel: 'Open Enterprise Incident Center',
        summary: `### Enterprise Incident Center & ITSM Orchestration
The **Enterprise Incident Center** (\`tab: saas-incidents\`) links synthetic test failures directly to corporate ITSM:

- **Bi-Directional ServiceNow Sync:** Automatically opens \`INCxxxx\` tickets with diagnostic call IDs, SIP ladders, and failure reasons when SLA probes fail.
- **PagerDuty Events v2 Escalation:** Pushes High-Urgency triggers with dedicated escalation policies for Sev-1 carrier outages.
- **Autonomous Remediation:** Execute automated SBC failover (e.g., rerouting traffic from degraded Ashburn SBC to Frankfurt Secondary) with sub-second MTTR and automatic voice stream POLQA recovery (MOS: 4.46).`
      },
      {
        keywords: ['maintenance', 'freeze', 'change freeze', 'black friday', 'freeze window', 'suppress', 'scheduled maintenance'],
        actionNavTab: 'saas-maintenance',
        navLabel: 'Open Maintenance & Change Freezes',
        summary: `### Enterprise Change Freezes & Scheduled Maintenance Windows
The **Maintenance Windows Center** (\`tab: saas-maintenance\`) safeguards production contact centers during critical business events:

- **Synthetic Test Suppression Modes:** Supports \`HARD_FREEZE_ALL_TESTS\`, \`PASSIVE_PROBES_ONLY\` (SIP OPTIONS keepalives only), and \`LOW_CONCURRENCY\` (< 5 channels).
- **Pre-Configured Policies:** Pre-seeded with the **Visa Q4 Black Friday & Cyber Monday Settlement Freeze** and **Genesys Architect v4 Migration Window**.
- **Pre-Flight Freeze Evaluation:** Dispatched tests automatically check the active freeze matrix; if a freeze is active, synthetic calls are gracefully suppressed with ticket references.`
      },
      {
        keywords: ['latency', 'geo-latency', 'pop', 'carrier radar', 'pdd', 'post-dial delay', 'ashburn', 'frankfurt', 'tokyo', 'sydney', 'dublin'],
        actionNavTab: 'saas-geolatency',
        navLabel: 'Open Multi-Region Latency Radar',
        summary: `### Multi-Region Carrier Egress & Geo-Latency Radar
The **Geo-Latency Radar** (\`tab: saas-geolatency\`) continuously monitors telephony edge egress across 8 worldwide PoPs:

- **Global PoP Coverage:** Ashburn (US-East), Oregon (US-West), Frankfurt (EU-Central), Dublin (EU-West), Tokyo (AP-Northeast), Sydney (AP-Southeast), Montreal (CA-Central), and São Paulo (SA-East).
- **Carrier Route Benchmarking:** Compares **Direct BYOC Edge SBC** vs **Genesys Cloud Voice (GCV)** vs **Wholesale PSTN Aggregators**.
- **Telecom Metrics:** Measures Post-Dial Delay (PDD, target < 800ms), DNS SRV Resolve Time (< 25ms), SIP 180 Ringing RTT, and Jitter to guarantee voice SLA compliance.`
      }
    ];
  }

  // Process User Query
  async generateResponse(userMessage, context = {}) {
    const query = (userMessage || '').toLowerCase().trim();

    // 1. Check offline curated knowledge base for immediate high-accuracy match
    for (const kb of this.knowledgeBase) {
      const match = kb.keywords.some(k => query.includes(k));
      if (match) {
        return {
          reply: kb.summary,
          actionNavTab: kb.actionNavTab,
          navLabel: kb.navLabel,
          suggestedPrompts: this.getSuggestedPrompts(kb.actionNavTab),
          sources: ['docs/10_COMPREHENSIVE_PLATFORM_USER_GUIDE_AND_SCREEN_CATALOG.md', 'ITU-T / RFC Standards']
        };
      }
    }

    // 2. If Gemini API is configured, use Gemini 2.5 Flash for conversational responses
    if (this.geminiClient) {
      try {
        const systemPrompt = `You are VoxPulse Copilot, the expert AI assistant for VoxPulse AI Enterprise Platform.
VoxPulse AI is the autonomous replacement for legacy telecom test tools (Klearcom, Cyara, Empirix Hammer).
It features 103 screens across 8 sections:
1. Core Voice & Studio (console, softphone, voicebot, canvas, did, discovery, branching, replay)
2. Automation & Load (builder, runner, cronscheduler, load, bursting, chaos, emergency, probes, omnichannel)
3. Audio Quality & POLQA (polqa, mos3d, mosalarms, degradation, jitterbuffer, aec, lufs, fft, silence, transcoder, promptconverter, ssml, dtmfsniffer, bargein, sttradar, benchmarks, confusion)
4. SIP Signaling (sip, failover, pcap, tls, sipheaders, sdp, prack, refer, digest, optionskeepalive, dialogs, siptimers, registrar, outboundproxy, subnets, mime, bwcalc, prispans, iceinspector, peerstats)
5. Carrier Routing & LCR (lcr, lcrsavings, carrierinterconnect, scorecard, heatmap, billing, lata, dnis, lnp)
6. Regulatory & Security (compliance, redactor, stirshaken, e911, gdpr, usftax, biometrics, liveness, rbac, ssoauditor, escalation)
7. AI Studio & NLU (gemini, combat, sentiment, tuning, amd, bargerecovery, fallbacks, promptab, menuab, nluheatmap, csat, langdetect)
8. Executive & Ops (dashboard100, klearcom, execpdfexporter, analytics, exporter, outages, screenpop, aht, erlang, percentiles, tagger, datachannel, webhooks, importer, tenant, integrations, settings)
Genesys Cloud CX Integration: allows direct testing without Twilio/Telnyx via BYOC Edge trunks and Architect Inbound Flows.
Visa Enterprise Configuration: pre-seeded DIDs (+18008472911, +18002524370), Okta/PingFederate SSO (@visa.com), PCI-DSS Level 1 zero-storage audio redaction.
Answer clearly in Markdown with technical accuracy and suggest which tab ID to visit.`;

        const response = await this.geminiClient.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: [
            { role: 'user', parts: [{ text: `${systemPrompt}\n\nUser Question: ${userMessage}\nCurrent Screen: ${context.currentTab || 'console'}` }] }
          ]
        });

        const replyText = response.text || '';
        // Extract any tab mentioned in the text
        const tabMatch = replyText.match(/tab:\s*([a-z0-9_-]+)/i) || replyText.match(/\`([a-z0-9_-]+)\`\s*tab/i);
        const actionNavTab = tabMatch ? tabMatch[1].toLowerCase() : null;

        return {
          reply: replyText,
          actionNavTab: actionNavTab,
          navLabel: actionNavTab ? `Open ${actionNavTab.toUpperCase()}` : null,
          suggestedPrompts: this.getSuggestedPrompts(actionNavTab),
          sources: ['Google Gemini 2.5 Flash', 'VoxPulse Knowledge Base']
        };
      } catch (err) {
        console.warn('[Copilot Engine] Gemini inference error, using intelligent fallback:', err.message);
      }
    }

    // 3. Intelligent fallback for general queries
    return {
      reply: `### VoxPulse Copilot Assistance
I'm here to help you navigate and test across all **103 tools** on the platform.

Here are helpful resources based on your inquiry:
- **Platform User Guide:** Open [docs/10_COMPREHENSIVE_PLATFORM_USER_GUIDE_AND_SCREEN_CATALOG.md](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/docs/10_COMPREHENSIVE_PLATFORM_USER_GUIDE_AND_SCREEN_CATALOG.md) for full screen-by-screen references.
- **Genesys Cloud CX:** If you need to test Genesys Architect flows without Twilio, navigate to \`saas-genesys\`.
- **Audio Quality:** To test ITU-T P.863 MOS speech fidelity, visit \`polqa\`.
- **Visa Security & PCI:** For zero-PAN storage audio masking, visit \`redactor\` or \`compliance\`.
- **Cost Reduction:** For carrier Least Cost Routing, visit \`lcrsavings\`.

What specific workflow would you like to explore?`,
      suggestedPrompts: [
        'How do I test Genesys Cloud flows without Twilio?',
        'Where is the POLQA MOS analyzer?',
        'How does Visa PCI-DSS redaction work?',
        'Calculate Erlang C queue staffing'
      ],
      sources: ['VoxPulse Knowledge Base', 'docs/10']
    };
  }

  getSuggestedPrompts(currentTab) {
    if (currentTab === 'polqa') {
      return ['What is POLQA v3 vs PESQ?', 'How to set up Realtime MOS Alarms?', 'Check FFT audio spectrum'];
    }
    if (currentTab === 'saas-genesys' || currentTab === 'genesys') {
      return ['How to configure BYOC Edge SBC?', 'Test Architect flow without Twilio', 'Verify RFC 4733 DTMF in Genesys'];
    }
    if (currentTab === 'compliance' || currentTab === 'redactor') {
      return ['How does real-time PAN muting work?', 'Verify PCI-DSS Level 1 compliance', 'Inspect Visa Okta SSO audit log'];
    }
    return [
      'How do I test Genesys Cloud flows without Twilio?',
      'Where is the POLQA MOS analyzer?',
      'How to test sub-400ms barge-in latency?',
      'Explain Least Cost Routing (LCR) savings'
    ];
  }
}

export const copilotEngine = new CopilotEngine();
