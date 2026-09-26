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
