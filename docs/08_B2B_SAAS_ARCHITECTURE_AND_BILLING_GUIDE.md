# 🏢 VoxPulse AI - B2B Multi-Tenant SaaS Architecture & Billing Guide

> **Document Version:** 1.0.0-enterprise  
> **Status:** Production-Ready • Multi-Tenant Enabled • Metered Billing Active

---

## 📌 Executive Summary

This document specifies the Software-as-a-Service (SaaS) architecture of **VoxPulse AI Cloud**, transforming the platform from an internal single-tenant tool into a commercial, multi-tenant B2B platform competing directly with Cyara and Klearcom.

Key business & architectural capabilities:
- **Logical Multi-Tenancy**: Organization workspace isolation, custom subdomains (`acme.voxpulse.io`), regional gateway binding, and dedicated telephony pools.
- **Tiered Packaging & Self-Serve Billing**: Starter ($499/mo), Growth ($1,999/mo), and Enterprise ($4,999/mo) plans with 20% annual prepurchase discounts, Stripe customer vaults, and downloadable tax invoices.
- **Real-Time Metered Usage Telemetry**: Live minute burndown meters, overage calculations ($0.035/min), DID capacity tracking, and Gemini AI inference token consumption.
- **Developer API & Outbound Webhooks**: Scoped Bearer API keys (`vxp_live_...`), HMAC-SHA256 signature verification, and automated event dispatching.
- **SaaS Operator Control Plane ("God Mode")**: Platform-wide ARR ($2.84M), MRR ($236.6k), 88.4% gross profit margins, tenant fleet management, and customer impersonation for troubleshooting.

---

## 🏗️ Multi-Tenant Architecture & Data Model

```
                    ┌────────────────────────────────────────┐
                    │          VoxPulse SaaS Gateway         │
                    │   (Tenant Context: X-Tenant-Id Header) │
                    └───────────────────┬────────────────────┘
                                        │
           ┌────────────────────────────┼──────────────────────────┐
           │                            │                          │
           ▼                            ▼                          ▼
┌─────────────────────┐      ┌─────────────────────┐    ┌─────────────────────┐
│  Acme Financial     │      │  HealthFirst Ops    │    │  DevRel Sandbox     │
│  Plan: Enterprise   │      │  Plan: Growth       │    │  Plan: Starter      │
│  Region: US-East    │      │  Region: EU-Central │    │  Region: US-East    │
│  DIDs: 64 (Unlim)   │      │  DIDs: 18 (25 max)  │    │  DIDs: 4 (5 max)    │
│  Mins: 42.3k/100k   │      │  Mins: 9.8k/15k     │    │  Mins: 1.4k/2.5k    │
└─────────────────────┘      └─────────────────────┘    └─────────────────────┘
```

### Relational Schema (`server/db/schema.sql`)
1. **`saas_organizations`**: Workspace identity, subdomain, billing cycle, region, custom branding.
2. **`saas_team_members`**: Organization users, roles (`OWNER`, `ADMIN`, `TELECOM_ENGINEER`, `COMPLIANCE_AUDITOR`, `BILLING_MANAGER`, `VIEWER`), 2FA status.
3. **`saas_api_keys`**: Cryptographic developer API keys with scoped permission arrays.
4. **`saas_invoices`**: Settled billing history, PDF/HTML download records, tax breakdowns.
5. **`saas_usage_quotas`**: Monthly usage period tracking for minutes, DIDs, and concurrent channels.

---

## 💳 Subscription Tiers & Feature Matrix

| Feature | Starter Plan | Growth Plan (Popular) | Enterprise Scale |
| :--- | :---: | :---: | :---: |
| **Monthly Pricing** | **$499 / mo** | **$1,999 / mo** | **$4,999 / mo** |
| **Annual Pricing (20% Off)**| **$4,790 / yr** | **$19,190 / yr** | **$47,990 / yr** |
| **Global DIDs Included** | 5 DIDs | 25 DIDs | **Unlimited** |
| **Monthly Test Minutes** | 2,500 mins | 15,000 mins | **100,000 mins** |
| **Concurrent Test Channels** | 3 channels | 10 channels | **50 channels** |
| **POLQA / MOS Audio SLA** | Yes | Yes | Yes |
| **Gemini 3.8 AI RCA Engine** | Basic | Advanced Flash 3.8 | Dedicated Multimodal |
| **Outbound Webhooks & Slack**| Email only | Slack, PagerDuty, Webhooks | Custom ITSM / ServiceNow |
| **Data & Audio Retention** | 30 Days | 90 Days | **365 Days (WORM Vault)**|
| **Dedicated SBC Trunk Testing**| No | No | **Yes (AudioCodes / Ribbon)**|
| **Financial Uptime SLA** | Best Effort | 99.9% Uptime | **99.99% Financial SLA** |
| **Support SLA** | Standard Email | Priority (4h response) | **24/7 Dedicated Architect** |

---

## ⏱️ Metered Billing & Overage Calculations

- **Included Minute Allowance**: Every plan includes an allocation of automated PSTN test minutes.
- **Overage Rate**: Once the monthly quota is exhausted, additional calls are billed at **$0.035 per minute**.
- **Automated Threshold Warnings**:
  - `80% Quota Consumed`: Early warning banner in dashboard and Slack notification.
  - `95% Quota Consumed`: High-priority escalation to organization Billing Manager.
  - `100% Quota Exceeded`: Automatic transition to metered overage or optional hard cap.
- **Add-on Packs**:
  - **+10 Global DIDs**: +$150/month
  - **+5,000 Test Minutes**: +$175/month
  - **+10 Concurrent Channels**: +$300/month

---

## 🔑 Developer Platform & Scoped API Keys

### Key Formats
- Production: `vxp_live_xxxxxxxxxxxxxxxxxxxxxxxx`
- Staging / Sandbox: `vxp_test_xxxxxxxxxxxxxxxxxxxxxxxx`

### Available Permission Scopes
- `tests:trigger`: Execute synthetic IVR automated test flows.
- `telemetry:read`: Query POLQA, MOS, packet loss, and latency metrics.
- `dids:read`: Query active and available global phone number pools.
- `reports:generate`: Trigger automated PDF and HTML executive SLA reports.
- `compliance:read`: Access PCI-DSS, HIPAA, and GDPR immutable audit records.
- `admin`: Full organization configuration and key provisioning.

### Outbound Webhook Verification
Dispatched webhooks include an HMAC-SHA256 signature in the `X-VoxPulse-Signature` header:
```javascript
const signature = crypto.createHmac('sha256', webhookSecret)
  .update(JSON.stringify(payload))
  .digest('hex');
// Header: X-VoxPulse-Signature: sha256=<signature>
```

---

## 👑 Platform Operator Control Plane ("God Mode")

Accessible to VoxPulse platform administrators:
- **Real-Time SaaS KPIs**:
  - Total ARR: **$2,840,000**
  - Total MRR: **$236,667**
  - Customer Fleet: **142 B2B Tenants** (128 Paid, 14 Free Trials)
  - Gross Profit Margin: **88.4%**
  - Wholesale Carrier Costs: **$27,450/month** (Telnyx + Twilio wholesale)
- **One-Click Tenant Impersonation**: Operators can instantly switch context to any customer workspace to diagnose IVR test failures, review call audio traces, or configure emergency numbers.
- **Fleet Management**: Modify customer plans, suspend accounts, and adjust quota limits on the fly.

---

## 🏛️ Enterprise Tier Mission-Critical Modules

For Fortune 500 financial networks (such as **Visa Inc.**, `org_visa_inc`) and Tier-1 contact centers, the Enterprise Scale tier includes 4 mission-critical SaaS control planes:

### 1. Enterprise Immutable Audit Vault (`tab: saas-audit`)
- **SOC-2 Type II & PCI-DSS 4.0 Compliance:** Cryptographic SHA-256 block hash chaining (`prevHash` $\to$ `blockHash`) guarantees tamper-evident logging across every actor, IP address, DID change, and SSO login.
- **One-Click Vault Verification:** The server re-computes hashes across all historical blocks in real-time, verifying 0% byte tampering.
- **SIEM Streaming:** Real-time log export in ArcSight Common Event Format (CEF) and ndjson (JSONL) for Splunk, Datadog, and QRadar ingestion.

### 2. Enterprise Incident Management & ITSM (`tab: saas-incidents`)
- **ServiceNow & PagerDuty Events v2 Orchestration:** Automatically provisions `INCxxxx` tickets and Sev-1 PagerDuty incidents with full call ID diagnostics, SIP ladders, and failure reasons when SLA probes fail.
- **Autonomous SBC Remediation:** One-click automated failover reroutes traffic from degraded edge SBCs to hot backup SBCs (e.g., Ashburn $\to$ Frankfurt), restoring voice stream POLQA MOS from 3.65 to 4.46 in under 500ms.

### 3. Enterprise Change Freezes & Maintenance Windows (`tab: saas-maintenance`)
- **Synthetic Test Suppression Modes:** Supports `HARD_FREEZE_ALL_TESTS`, `PASSIVE_PROBES_ONLY` (SIP OPTIONS keepalives only), and `LOW_CONCURRENCY` (< 5 channels).
- **Pre-Configured Policies:** Pre-seeded with the **Visa Q4 Black Friday & Cyber Monday Settlement Freeze** and **Genesys Architect v4 Migration Window**.
- **Pre-Flight Freeze Evaluation:** Dispatched tests automatically check the active freeze matrix; if a freeze is active, synthetic calls are gracefully suppressed with ticket references.

### 4. Multi-Region Carrier Egress & Geo-Latency Radar (`tab: saas-geolatency`)
- **8 Worldwide Edge PoPs:** Ashburn, Oregon, Frankfurt, Dublin, Tokyo, Sydney, Montreal, and São Paulo.
- **Carrier Route Benchmarking:** Compares **Direct BYOC Edge SBC** vs **Genesys Cloud Voice (GCV)** vs **Wholesale PSTN Aggregators**.
- **Telecom Metrics:** Measures Post-Dial Delay (PDD, target < 800ms), DNS SRV Resolve Time (< 25ms), SIP 180 Ringing RTT, and Jitter to guarantee voice SLA compliance.

---

## 🧪 Verification Commands

```bash
# Run the 100-case SaaS multi-tenant test suite
npm run test:saas

# Run the 52-endpoint E2E integration verification
npm run test:e2e

# Run the complete 1,500 telecom test suite
npm run test:1500

# Run the 153 UX click & function validator
npm run test:ux

# Production Vite build verification
npm run build
```
