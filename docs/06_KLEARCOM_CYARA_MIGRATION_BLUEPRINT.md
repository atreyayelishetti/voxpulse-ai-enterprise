# 🔄 VoxPulse AI - Klearcom / Cyara / Hammer Migration Blueprint
> **Document Version:** 1.0.0-enterprise  
> **Classification:** Migration & Product Strategy Specification  
> **Target Audience:** Product Managers, Enterprise Sales, Migration Engineers  

---

## 1. Feature Parity Matrix

| Capability | Klearcom | Cyara | Hammer | VoxPulse AI |
| :--- | :---: | :---: | :---: | :---: |
| **Global PSTN Call Testing** | ✅ | ✅ | ✅ | **✅ (100+ DIDs)** |
| **POLQA / PESQ MOS Audio Scoring** | ✅ | ✅ | ⚠️ Partial | **✅ (ITU-T P.863)** |
| **AI Prompt Intent Recognition** | ❌ Heuristic | ❌ Rule-Based | ❌ N/A | **✅ (Gemini 2.5 Flash)** |
| **1-Click Klearcom JSON Importer** | ❌ | ❌ | ❌ | **✅ Built-In** |
| **Voicebot Barge-In Benchmark** | ❌ | ⚠️ Extra Cost | ❌ | **✅ Included** |
| **24/7 Synthetic Cron Scheduler** | ✅ | ✅ | ✅ | **✅ Native Scheduler** |
| **Keycloak OIDC SSO & RBAC** | ⚠️ Add-on | ⚠️ Custom | ❌ | **✅ Built-In** |
| **Monthly Pricing Model** | $1,200 - $5,000+ | $2,500 - $10,000+ | Enterprise | **Direct Carrier Egress (~$45/mo)** |

---

## 2. One-Click Importer Workflow ([`KlearkomDataImporter.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/KlearkomDataImporter.jsx))

VoxPulse AI includes a built-in importer tool that parses exported Klearcom JSON schemas, mapping target phone numbers, DTMF prompt trees, and alert notification webhooks directly into the VoxPulse PostgreSQL database format.

### Supported Export Format Schema:
```json
{
  "klearcom_version": "2.4",
  "suite_name": "Enterprise Financial Services IVR Test",
  "target_phone": "+18005550199",
  "country": "US",
  "cron_expression": "*/15 * * * *",
  "steps": [
    { "order": 1, "action": "WAIT_FOR_PROMPT", "expected_text": "Welcome to Enterprise Financial Services" },
    { "order": 2, "action": "SEND_DTMF", "key": "1" },
    { "order": 3, "action": "VERIFY_PROMPT", "expected_text": "Please enter your security PIN" }
  ]
}
```
