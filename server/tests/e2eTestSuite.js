// VoxPulse AI - End-to-End Automated Backend & Integration Test Suite
import http from 'http';
import { spawn } from 'child_process';
import path from 'path';

const BASE_URL = 'http://localhost:3001';

function checkServerReady() {
  return new Promise((resolve) => {
    const req = http.get(`${BASE_URL}/api/config`, (res) => {
      resolve(res.statusCode === 200);
    });
    req.on('error', () => resolve(false));
    req.setTimeout(500, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function ensureServerRunning() {
  const isUp = await checkServerReady();
  if (isUp) return null;

  console.log('📡 Starting background server process for E2E test verification...');
  const serverProc = spawn('node', ['server/index.js'], {
    cwd: path.resolve(process.cwd()),
    stdio: 'ignore'
  });

  for (let i = 0; i < 30; i++) {
    await new Promise((r) => setTimeout(r, 200));
    if (await checkServerReady()) {
      console.log('✓ Test server is ready on port 3001\n');
      return serverProc;
    }
  }

  serverProc.kill();
  throw new Error('Failed to start VoxPulse backend server within 6 seconds.');
}

async function runE2ETests() {
  console.log('=======================================================');
  console.log('🧪 Starting VoxPulse AI End-to-End Automated Verification');
  console.log('=======================================================');

  let serverProc = null;
  try {
    serverProc = await ensureServerRunning();
  } catch (err) {
    console.error(`❌ Server startup failed: ${err.message}`);
    process.exit(1);
  }

  let passed = 0;
  let failed = 0;

  const assertEndpoint = (name, url, method = 'GET', body = null) => {
    return new Promise((resolve) => {
      const u = new URL(url);
      const req = http.request({
        hostname: u.hostname,
        port: u.port,
        path: u.pathname + u.search,
        method,
        headers: { 'Content-Type': 'application/json' }
      }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            console.log(`✓ [PASS] ${name} (HTTP ${res.statusCode})`);
            passed++;
          } else {
            console.error(`✗ [FAIL] ${name} (HTTP ${res.statusCode})`);
            failed++;
          }
          resolve();
        });
      });

      req.on('error', (err) => {
        console.error(`✗ [FAIL] ${name} (${err.message})`);
        failed++;
        resolve();
      });

      if (body) req.write(JSON.stringify(body));
      req.end();
    });
  };

  try {
    // SRE Observability Probes
    await assertEndpoint('GET /healthz', `${BASE_URL}/healthz`);
    await assertEndpoint('GET /readyz', `${BASE_URL}/readyz`);
    await assertEndpoint('GET /metrics', `${BASE_URL}/metrics`);

    // Run assertions
    await assertEndpoint('GET /api/config', `${BASE_URL}/api/config`);
    await assertEndpoint('GET /api/tests/history', `${BASE_URL}/api/tests/history`);
    await assertEndpoint('GET /api/alerts', `${BASE_URL}/api/alerts`);
    await assertEndpoint('GET /api/reports/html', `${BASE_URL}/api/reports/html`);
    await assertEndpoint('GET /api/dtmf/wav?digit=1', `${BASE_URL}/api/dtmf/wav?digit=1`);

    await assertEndpoint('POST /api/gemini/analyze', `${BASE_URL}/api/gemini/analyze`, 'POST', {
      promptTranscript: 'Welcome to Acme Bank. Press 1 for Balance.'
    });

    await assertEndpoint('POST /api/ivr/discover', `${BASE_URL}/api/ivr/discover`, 'POST', {
      targetNumber: '+18005550100',
      countryCode: 'US'
    });

    await assertEndpoint('GET /api/dashboard/stats', `${BASE_URL}/api/dashboard/stats`);

    await assertEndpoint('POST /api/lufs/normalize', `${BASE_URL}/api/lufs/normalize`, 'POST', {
      targetLUFS: -16,
      truePeakLimit: -1.0
    });

    await assertEndpoint('POST /api/telecom/lcr', `${BASE_URL}/api/telecom/lcr`, 'POST', {
      targetNumber: '+18005550199',
      minMOS: 4.0
    });

    await assertEndpoint('POST /api/erlang/calculate', `${BASE_URL}/api/erlang/calculate`, 'POST', {
      callsPerHour: 600,
      ahtSeconds: 180,
      agents: 35
    });

    await assertEndpoint('POST /api/stirshaken/verify', `${BASE_URL}/api/stirshaken/verify`, 'POST', {
      callerId: '+12125550100',
      targetNumber: '+18005550199',
      attestation: 'A'
    });

    await assertEndpoint('POST /api/sip/parse', `${BASE_URL}/api/sip/parse`, 'POST', {
      rawSip: 'INVITE sip:test@voxpulse.internal SIP/2.0\r\nCall-ID: c123\r\nCSeq: 1 INVITE\r\n'
    });

    await assertEndpoint('POST /api/voicebot/bargein', `${BASE_URL}/api/voicebot/bargein`, 'POST', {
      promptDurationMs: 3500,
      interruptAtMs: 1200
    });

    await assertEndpoint('POST /api/sip/generate', `${BASE_URL}/api/sip/generate`, 'POST', {
      method: 'INVITE',
      toUri: 'sip:support@voxpulse.io',
      fromUri: 'sip:+18005550100@pstn.carrier.net',
      includeSDP: true
    });

    await assertEndpoint('POST /api/webhooks/dispatch', `${BASE_URL}/api/webhooks/dispatch`, 'POST', {
      endpoint: 'https://webhook.site/voxpulse-test',
      event: 'ALERT_CALL_FAILED',
      payload: { callId: 'test_call_901' }
    });

    await assertEndpoint('POST /api/loadtest/start', `${BASE_URL}/api/loadtest/start`, 'POST', {
      concurrencyCount: 2,
      targetNumber: '+18005550100',
      country: 'US'
    });

    await assertEndpoint('POST /api/compliance/audit', `${BASE_URL}/api/compliance/audit`, 'POST', {
      framework: 'ALL'
    });

    // SaaS B2B Multi-Tenant Endpoints
    await assertEndpoint('GET /api/saas/organizations', `${BASE_URL}/api/saas/organizations`);
    await assertEndpoint('GET /api/saas/organizations/current', `${BASE_URL}/api/saas/organizations/current`);
    await assertEndpoint('GET /api/saas/plans', `${BASE_URL}/api/saas/plans`);
    await assertEndpoint('GET /api/saas/subscription', `${BASE_URL}/api/saas/subscription`);
    await assertEndpoint('GET /api/saas/usage', `${BASE_URL}/api/saas/usage`);
    await assertEndpoint('POST /api/saas/usage/record', `${BASE_URL}/api/saas/usage/record`, 'POST', { minutes: 100 });
    await assertEndpoint('GET /api/saas/team', `${BASE_URL}/api/saas/team`);
    await assertEndpoint('GET /api/saas/apikeys', `${BASE_URL}/api/saas/apikeys`);
    await assertEndpoint('GET /api/saas/webhooks', `${BASE_URL}/api/saas/webhooks`);
    await assertEndpoint('GET /api/saas/invoices', `${BASE_URL}/api/saas/invoices`);
    await assertEndpoint('GET /api/saas/admin/metrics', `${BASE_URL}/api/saas/admin/metrics`);
    await assertEndpoint('POST /api/saas/subscription/update', `${BASE_URL}/api/saas/subscription/update`, 'POST', { planId: 'GROWTH', billingCycle: 'ANNUAL' });

    // Enterprise Audit Vault, Incident Center, Maintenance & Latency Radar
    await assertEndpoint('GET /api/saas/audit/logs', `${BASE_URL}/api/saas/audit/logs`);
    await assertEndpoint('POST /api/saas/audit/verify', `${BASE_URL}/api/saas/audit/verify`, 'POST', { tenantId: 'org_visa_inc' });
    await assertEndpoint('GET /api/saas/audit/export?format=CEF', `${BASE_URL}/api/saas/audit/export?format=CEF`);
    await assertEndpoint('GET /api/saas/incidents', `${BASE_URL}/api/saas/incidents`);
    await assertEndpoint('GET /api/saas/maintenance/windows', `${BASE_URL}/api/saas/maintenance/windows`);
    await assertEndpoint('GET /api/saas/maintenance/freeze-status', `${BASE_URL}/api/saas/maintenance/freeze-status?tenantId=org_visa_inc`);
    await assertEndpoint('GET /api/saas/latency/global-pops', `${BASE_URL}/api/saas/latency/global-pops`);
    await assertEndpoint('POST /api/saas/latency/benchmark', `${BASE_URL}/api/saas/latency/benchmark`, 'POST', { popId: 'pop_us_east_ashburn', routeType: 'DIRECT_BYOC_SBC' });

    // Genesys Cloud CX Integration Endpoints
    await assertEndpoint('GET /api/genesys/config', `${BASE_URL}/api/genesys/config`);
    await assertEndpoint('POST /api/genesys/test-connection', `${BASE_URL}/api/genesys/test-connection`, 'POST', {});
    await assertEndpoint('GET /api/genesys/flows', `${BASE_URL}/api/genesys/flows`);
    await assertEndpoint('GET /api/genesys/trunks', `${BASE_URL}/api/genesys/trunks`);
    await assertEndpoint('GET /api/genesys/queues', `${BASE_URL}/api/genesys/queues`);
    await assertEndpoint('POST /api/genesys/calls/initiate', `${BASE_URL}/api/genesys/calls/initiate`, 'POST', {
      targetPhoneNumber: '+18005550100',
      callerId: '+18005550199'
    });
    await assertEndpoint('GET /api/genesys/prompts', `${BASE_URL}/api/genesys/prompts`);
    await assertEndpoint('POST /api/genesys/prompts/test-audio', `${BASE_URL}/api/genesys/prompts/test-audio`, 'POST', {
      promptId: 'prompt_visa_welcome'
    });
    await assertEndpoint('GET /api/genesys/data-actions', `${BASE_URL}/api/genesys/data-actions`);
    await assertEndpoint('POST /api/genesys/data-actions/execute', `${BASE_URL}/api/genesys/data-actions/execute`, 'POST', {
      actionId: 'action_visa_card_lookup',
      inputPayload: {}
    });
    await assertEndpoint('POST /api/genesys/probes/run', `${BASE_URL}/api/genesys/probes/run`, 'POST', {});
    await assertEndpoint('POST /api/genesys/flows/auto-test', `${BASE_URL}/api/genesys/flows/auto-test`, 'POST', {
      flowId: 'flow_visa_cardholder_main'
    });


    // Visa Enterprise SSO Endpoint
    await assertEndpoint('POST /api/auth/visa-sso', `${BASE_URL}/api/auth/visa-sso`, 'POST', {
      email: 'elena.rostova@visa.com',
      ssoProvider: 'VISA_OKTA_FEDERATION'
    });

    // Copilot AI Assistant Endpoint
    await assertEndpoint('POST /api/copilot/chat', `${BASE_URL}/api/copilot/chat`, 'POST', {
      message: 'How do I test Genesys Cloud flows without Twilio?',
      context: { currentTab: 'console' }
    });

    console.log('=======================================================');
    console.log(`📊 E2E Test Suite Summary: ${passed} PASSED, ${failed} FAILED`);
    console.log('=======================================================');
  } finally {
    if (serverProc) {
      serverProc.kill();
    }
  }

  process.exit(failed > 0 ? 1 : 0);
}

runE2ETests();

