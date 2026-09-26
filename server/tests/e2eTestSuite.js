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

