// VoxPulse AI - End-to-End Automated Backend & Integration Test Suite
import http from 'http';

const BASE_URL = 'http://localhost:3001';

async function runE2ETests() {
  console.log('=======================================================');
  console.log('🧪 Starting VoxPulse AI End-to-End Automated Verification');
  console.log('=======================================================');

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

  console.log('=======================================================');
  console.log(`📊 E2E Test Suite Summary: ${passed} PASSED, ${failed} FAILED`);
  console.log('=======================================================');

  process.exit(failed > 0 ? 1 : 0);
}

runE2ETests();
