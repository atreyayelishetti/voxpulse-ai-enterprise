-- VoxPulse AI - PostgreSQL Database Schema & Complete Seed Data
-- Full Klearcom, Cyara & Hammer Replacement Data Model

-- 1. Users & SSO Roles
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    keycloak_id VARCHAR(255) UNIQUE,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'qa_engineer',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Phone Numbers & Global DID Pool
CREATE TABLE IF NOT EXISTS phone_numbers (
    id SERIAL PRIMARY KEY,
    phone_number VARCHAR(50) NOT NULL UNIQUE,
    country_code VARCHAR(10) NOT NULL,
    country_name VARCHAR(100) NOT NULL,
    carrier_name VARCHAR(100) DEFAULT 'Tier 1 PSTN',
    status VARCHAR(50) DEFAULT 'ACTIVE',
    reachability_sla DECIMAL(5,2) DEFAULT 99.95,
    is_emergency BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE phone_numbers ADD COLUMN IF NOT EXISTS is_emergency BOOLEAN DEFAULT false;

-- 3. IVR Auto-Discovered Tree Maps
CREATE TABLE IF NOT EXISTS ivr_maps (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    target_number VARCHAR(50) NOT NULL,
    country_code VARCHAR(10) DEFAULT 'US',
    tree_data JSONB NOT NULL,
    depth INTEGER DEFAULT 3,
    total_prompts INTEGER DEFAULT 1,
    discovered_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Visual Canvas Flows (No-Code Drag-and-Drop)
CREATE TABLE IF NOT EXISTS canvas_flows (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    flow_nodes JSONB NOT NULL,
    flow_edges JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Test Suites
CREATE TABLE IF NOT EXISTS test_suites (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    target_number VARCHAR(50) NOT NULL,
    country_code VARCHAR(10) DEFAULT 'US',
    schedule_cron VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Test Steps
CREATE TABLE IF NOT EXISTS test_steps (
    id SERIAL PRIMARY KEY,
    suite_id INTEGER REFERENCES test_suites(id) ON DELETE CASCADE,
    step_order INTEGER NOT NULL,
    action_type VARCHAR(50) NOT NULL,
    description VARCHAR(255) NOT NULL,
    expected_pattern TEXT,
    dtmf_key VARCHAR(10),
    speak_text TEXT,
    expected_route VARCHAR(255)
);

-- 7. Test Runs
CREATE TABLE IF NOT EXISTS test_runs (
    id VARCHAR(100) PRIMARY KEY,
    suite_id INTEGER REFERENCES test_suites(id) ON DELETE SET NULL,
    test_name VARCHAR(255) NOT NULL,
    target_number VARCHAR(50) NOT NULL,
    country_code VARCHAR(10) DEFAULT 'US',
    status VARCHAR(50) NOT NULL,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMP WITH TIME ZONE,
    duration_ms INTEGER DEFAULT 0,
    mos_score DECIMAL(3,2) DEFAULT 4.35,
    latency_ms INTEGER DEFAULT 140,
    silence_ratio DECIMAL(4,3) DEFAULT 0.08,
    gemini_rca JSONB
);

-- 8. Call Audio Recordings
CREATE TABLE IF NOT EXISTS call_recordings (
    id VARCHAR(100) PRIMARY KEY,
    run_id VARCHAR(100) REFERENCES test_runs(id) ON DELETE CASCADE,
    audio_url VARCHAR(500) NOT NULL,
    file_size_bytes INTEGER DEFAULT 102400,
    sample_rate INTEGER DEFAULT 8000,
    transcript_text TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. Step Results
CREATE TABLE IF NOT EXISTS step_results (
    id SERIAL PRIMARY KEY,
    run_id VARCHAR(100) REFERENCES test_runs(id) ON DELETE CASCADE,
    step_order INTEGER NOT NULL,
    action_type VARCHAR(50) NOT NULL,
    description VARCHAR(255) NOT NULL,
    passed BOOLEAN NOT NULL,
    prompt_heard TEXT,
    duration_ms INTEGER DEFAULT 0,
    gemini_analysis JSONB
);

-- 10. Alert Logs & Integrations
CREATE TABLE IF NOT EXISTS alert_logs (
    id SERIAL PRIMARY KEY,
    run_id VARCHAR(100) REFERENCES test_runs(id) ON DELETE CASCADE,
    channel VARCHAR(50) NOT NULL,
    severity VARCHAR(50) DEFAULT 'CRITICAL',
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. Integrations Configuration
CREATE TABLE IF NOT EXISTS integrations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL,
    webhook_url TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- INITIAL SEED DATA FOR DB CONTAINERS & LOCAL DEVELOPMENT
-- ============================================================================

-- 1. Users
INSERT INTO users (keycloak_id, email, name, role)
VALUES 
  ('usr_admin_001', 'admin@voxpulse.internal', 'VoxPulse Super Admin', 'admin'),
  ('usr_lead_002', 'qa.lead@enterprise.com', 'Senior IVR QA Engineer', 'admin'),
  ('usr_ops_003', 'ops@telecom.internal', 'Carrier Telecom Operator', 'operator')
ON CONFLICT (keycloak_id) DO NOTHING;

-- 2. Phone Numbers (Global DID Pool)
INSERT INTO phone_numbers (phone_number, country_code, country_name, carrier_name, reachability_sla, is_emergency)
VALUES 
  ('+18005550100', 'US', 'United States', 'AT&T / Verizon Direct', 99.99, false),
  ('+18005550199', 'US', 'United States Toll-Free', 'Telnyx Global PSTN', 99.98, false),
  ('+442079460000', 'UK', 'United Kingdom', 'BT / Vodafone', 99.95, false),
  ('+496912345678', 'DE', 'Germany', 'Deutsche Telekom', 99.98, false),
  ('+81312345678', 'JP', 'Japan', 'NTT Docomo', 99.90, false),
  ('+33142685300', 'FR', 'France', 'Orange SA', 99.92, false),
  ('+61292518000', 'AU', 'Australia', 'Telstra Direct', 99.94, false),
  ('+6568383388', 'SG', 'Singapore', 'Singtel PSTN', 99.96, false),
  ('+912261852000', 'IN', 'India', 'Bharti Airtel', 99.85, false),
  ('+18005559110', 'US', 'United States Emergency 911', 'AT&T Priority E911', 100.00, true)
ON CONFLICT (phone_number) DO NOTHING;

-- 3. Test Suites
INSERT INTO test_suites (id, name, description, target_number, country_code, schedule_cron, is_active)
VALUES 
  (1, 'Enterprise Banking IVR (Account & PIN Auth)', 'Automated validation of main banking menu and 4-digit PIN authentication', '+18005550100', 'US', '*/5 * * * *', true),
  (2, 'Healthcare Patient Portal IVR', 'Multi-lingual doctor appointment scheduling & DOB verification', '+442079460000', 'UK', '*/15 * * * *', true),
  (3, 'Retail Customer Claims & Order Tracking', 'Validates order tracking DTMF input and live representative transfer', '+496912345678', 'DE', '0 * * * *', true),
  (4, 'SBC Trunk Failover & Latency Test', 'Stress test primary vs secondary SBC failover routing', '+18005550199', 'US', '0 0 * * *', true),
  (5, 'E911 Emergency PSAP Verification', 'Validates Kari Law compliance and PSAP location dispatch token', '+18005559110', 'US', '0 12 * * *', true)
ON CONFLICT (id) DO NOTHING;

-- 4. Test Steps
INSERT INTO test_steps (suite_id, step_order, action_type, description, expected_pattern, dtmf_key, expected_route)
VALUES 
  (1, 1, 'VERIFY_PROMPT', 'Listen for Main Banking Welcome Prompt', 'Welcome to Enterprise Financial Services', NULL, 'Greeting Node'),
  (1, 2, 'SEND_DTMF', 'Press 1 for Account Balance Inquiry', NULL, '1', 'Balance Sub-Menu'),
  (1, 3, 'VERIFY_PROMPT', 'Listen for PIN Prompt', 'Please enter your 4-digit security PIN', NULL, 'PIN Prompt'),
  (1, 4, 'SEND_DTMF', 'Enter PIN 1234', NULL, '1234#', 'Authenticated State'),
  (1, 5, 'VERIFY_PROMPT', 'Confirm Balance Spoken Audio', 'Your current balance is', NULL, 'Success Route')
ON CONFLICT DO NOTHING;

-- 5. Test Runs (Historical Analytics)
INSERT INTO test_runs (id, suite_id, test_name, target_number, country_code, status, started_at, duration_ms, mos_score, latency_ms, silence_ratio, gemini_rca)
VALUES 
  ('run_1001', 1, 'Enterprise Banking IVR (Account & PIN Auth)', '+18005550100', 'US', 'PASSED', CURRENT_TIMESTAMP - INTERVAL '1 hour', 4200, 4.38, 138, 0.08, '{"status": "PASSED", "summary": "All 5 test steps completed cleanly. Audio MOS 4.38 exceeds SLA."}'),
  ('run_1002', 2, 'Healthcare Patient Portal IVR', '+442079460000', 'UK', 'PASSED', CURRENT_TIMESTAMP - INTERVAL '2 hours', 5800, 4.32, 162, 0.06, '{"status": "PASSED", "summary": "Multi-lingual prompt matched Spanish & English rules."}'),
  ('run_1003', 3, 'Retail Customer Claims & Order Tracking', '+496912345678', 'DE', 'PASSED', CURRENT_TIMESTAMP - INTERVAL '3 hours', 3900, 4.41, 145, 0.05, '{"status": "PASSED", "summary": "Direct agent handoff confirmed within 180ms."}'),
  ('run_1004', 4, 'SBC Trunk Failover & Latency Test', '+18005550199', 'US', 'WARNING', CURRENT_TIMESTAMP - INTERVAL '4 hours', 7200, 3.85, 340, 0.18, '{"status": "WARNING", "summary": "Primary SBC failed; Secondary SBC failover succeeded in 340ms."}')
ON CONFLICT (id) DO NOTHING;

-- 6. Integrations Configuration
INSERT INTO integrations (id, name, type, webhook_url, is_active)
VALUES 
  (1, 'DevOps Slack Alerts', 'SLACK', 'https://hooks.slack.internal/services/example/webhook', true),
  (2, 'PagerDuty Incident Escalation', 'PAGERDUTY', 'https://events.pagerduty.com/v2/enqueue', true),
  (3, 'ServiceNow ITSM Tickets', 'SERVICENOW', 'https://enterprise.service-now.com/api/now/table/incident', true)
ON CONFLICT (id) DO NOTHING;

-- 12. Carrier Trunks & SBC Routing Nodes
CREATE TABLE IF NOT EXISTS carrier_trunks (
    id SERIAL PRIMARY KEY,
    carrier_name VARCHAR(100) NOT NULL UNIQUE,
    region VARCHAR(100) NOT NULL,
    as_number VARCHAR(50) NOT NULL,
    sbc_ip VARCHAR(50) NOT NULL,
    tls_cipher VARCHAR(100) DEFAULT 'TLS_AES_256_GCM_SHA384',
    p99_sla_ms INTEGER DEFAULT 120,
    contractual_uptime DECIMAL(5,3) DEFAULT 99.990,
    measured_uptime DECIMAL(5,3) DEFAULT 99.995,
    monthly_spend_usd INTEGER DEFAULT 35000,
    status VARCHAR(50) DEFAULT 'COMPLIANT',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO carrier_trunks (carrier_name, region, as_number, sbc_ip, p99_sla_ms, contractual_uptime, measured_uptime, monthly_spend_usd, status)
VALUES 
  ('AT&T Mobility', 'North America', 'AS7018', '198.51.100.10', 115, 99.990, 99.995, 42000, 'COMPLIANT'),
  ('Verizon Wireless', 'North America', 'AS701', '198.51.100.20', 124, 99.980, 99.982, 38000, 'COMPLIANT'),
  ('Lumen / Level 3', 'North America', 'AS3356', '203.0.113.15', 165, 99.950, 99.890, 29000, 'BREACH'),
  ('British Telecom', 'Europe', 'AS2856', '195.99.115.5', 190, 99.950, 99.960, 24000, 'COMPLIANT'),
  ('Deutsche Telekom', 'Europe', 'AS3320', '194.25.0.12', 210, 99.970, 99.975, 26000, 'COMPLIANT'),
  ('Tata Communications', 'Asia Pacific', 'AS4755', '180.149.52.2', 340, 99.850, 99.820, 16000, 'BREACH')
ON CONFLICT (carrier_name) DO NOTHING;

-- 13. Regulatory Compliance Audit Logs
CREATE TABLE IF NOT EXISTS audit_compliance_logs (
    id SERIAL PRIMARY KEY,
    audit_id VARCHAR(100) NOT NULL UNIQUE,
    framework VARCHAR(50) NOT NULL,
    specification VARCHAR(100) NOT NULL,
    control_objective TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'COMPLIANT',
    audited_by VARCHAR(100) DEFAULT 'VoxPulse Automated Compliance Daemon',
    sha256_hash VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO audit_compliance_logs (audit_id, framework, specification, control_objective, status, sha256_hash)
VALUES 
  ('AUD-PCI-401', 'PCI-DSS', 'Req 3.4 / 4.1', 'DTMF Credit Card Audio Redaction (160ms Mute Window)', 'COMPLIANT', 'sha256:7b92c4a89e1f827361a9bc30'),
  ('AUD-HIPAA-402', 'HIPAA', '45 CFR § 164.312(e)', 'SRTP End-to-End Media Stream Encryption (AES-128-ICM)', 'COMPLIANT', 'sha256:94a2b109e4f58c73d91283bb'),
  ('AUD-GDPR-403', 'GDPR', 'Article 17', 'Automated 30-Day Call Recording Purge Lifecycle', 'COMPLIANT', 'sha256:3910ca8b27fe991a0c874112')
ON CONFLICT (audit_id) DO NOTHING;

-- 14. Webhook Dispatch Queue & Dead-Letter Storage
CREATE TABLE IF NOT EXISTS webhook_dispatch_queue (
    id SERIAL PRIMARY KEY,
    dispatch_id VARCHAR(100) NOT NULL UNIQUE,
    endpoint_url TEXT NOT NULL,
    event_type VARCHAR(100) NOT NULL,
    attempts INTEGER DEFAULT 1,
    max_attempts INTEGER DEFAULT 5,
    http_status INTEGER DEFAULT 200,
    status VARCHAR(50) DEFAULT 'DELIVERED',
    hmac_sha256 VARCHAR(100) NOT NULL,
    payload JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO webhook_dispatch_queue (dispatch_id, endpoint_url, event_type, attempts, http_status, status, hmac_sha256, payload)
VALUES 
  ('wh_901', 'https://hooks.slack.com/services/T00/B00/VOXPULSE', 'ALERT_CALL_FAILED', 1, 200, 'DELIVERED', 'sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', '{"event": "ALERT_CALL_FAILED", "did": "+18005550100", "sipCode": 503}'),
  ('wh_902', 'https://events.pagerduty.com/v2/enqueue', 'OUTAGE_EMERGENCY_911', 1, 202, 'DELIVERED', 'sha256:ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb', '{"event": "OUTAGE_EMERGENCY_911", "severity": "CRITICAL", "affectedDIDs": 14}')
ON CONFLICT (dispatch_id) DO NOTHING;

-- 15. Least Cost Routing (LCR) Rate Cards
CREATE TABLE IF NOT EXISTS lcr_rate_cards (
    id SERIAL PRIMARY KEY,
    carrier_name VARCHAR(100) NOT NULL,
    rate_center VARCHAR(100) NOT NULL,
    country_code VARCHAR(10) DEFAULT 'US',
    wholesale_rate_per_min DECIMAL(6,4) NOT NULL,
    vendor_markup_rate DECIMAL(6,4) NOT NULL,
    min_mos_guarantee DECIMAL(3,2) DEFAULT 4.20,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO lcr_rate_cards (carrier_name, rate_center, wholesale_rate_per_min, vendor_markup_rate, min_mos_guarantee)
VALUES 
  ('Telnyx Wholesale', 'US Domestic Toll-Free', 0.0055, 0.0380, 4.42),
  ('Twilio Super Network', 'US Domestic Toll-Free', 0.0085, 0.0380, 4.38),
  ('Lumen Direct IP', 'US Domestic Toll-Free', 0.0045, 0.0380, 4.30),
  ('Arelion Global', 'UK & Europe International', 0.0090, 0.0520, 4.35)
ON CONFLICT DO NOTHING;

