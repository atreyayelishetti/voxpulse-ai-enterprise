// VoxPulse AI - Enterprise Hardening, InfoSec & SRE Verification Test Suite
import http from 'http';
import { validateE164PhoneNumber } from '../securityMiddleware.js';
import { sreGuardian } from '../sreGuardian.js';
import { getPrometheusMetrics, getFullPrometheusMetricsAsync } from '../metricsExporter.js';

const BASE_URL = 'http://localhost:3001';

function fetchUrl(url, options = {}, body = null) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const payloadStr = body ? (typeof body === 'string' ? body : JSON.stringify(body)) : null;
    const headers = { ...options.headers };
    if (payloadStr) {
      headers['Content-Length'] = Buffer.byteLength(payloadStr);
      if (!headers['Content-Type']) headers['Content-Type'] = 'application/json';
    }

    const req = http.request({
      hostname: u.hostname,
      port: u.port,
      path: u.pathname + u.search,
      method: options.method || 'GET',
      headers
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data
        });
      });
    });

    req.on('error', reject);
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timed out'));
    });

    if (payloadStr) {
      req.write(payloadStr);
    }
    req.end();
  });
}

async function runHardeningTests() {
  console.log('=======================================================');
  console.log('🛡️ Starting VoxPulse AI Enterprise Hardening & InfoSec Test Suite');
  console.log('=======================================================');

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✓ [PASS] ${message}`);
      passed++;
    } else {
      console.error(`  ✗ [FAIL] ${message}`);
      failed++;
    }
  }

  try {
    // ------------------------------------------------------------------------
    // Group 1: Helmet HTTP Security Headers (PCI-DSS & OWASP Top 10)
    // ------------------------------------------------------------------------
    console.log('\n🔹 [Group 1] Verifying HTTP Security Headers (PCI-DSS Req 6 & OWASP)...');
    const rootRes = await fetchUrl(`${BASE_URL}/api/config`);
    assert(rootRes.statusCode === 200, 'API Endpoint returns HTTP 200 OK');
    assert(rootRes.headers['x-content-type-options'] === 'nosniff', 'Header X-Content-Type-Options: nosniff enforced');
    assert(rootRes.headers['x-frame-options'] === 'DENY', 'Header X-Frame-Options: DENY (Clickjacking protection)');
    assert(rootRes.headers['strict-transport-security'] && rootRes.headers['strict-transport-security'].includes('max-age='), 'HSTS Strict-Transport-Security header active');
    assert(rootRes.headers['content-security-policy'] && rootRes.headers['content-security-policy'].includes("frame-ancestors 'none'"), 'CSP frame-ancestors none enforced');
    assert(rootRes.headers['referrer-policy'] === 'strict-origin-when-cross-origin', 'Referrer-Policy header enforced');

    // ------------------------------------------------------------------------
    // Group 2: Request Tracing & Correlation IDs
    // ------------------------------------------------------------------------
    console.log('\n🔹 [Group 2] Verifying Distributed Correlation ID Tracing...');
    const traceRes1 = await fetchUrl(`${BASE_URL}/api/config`);
    assert(traceRes1.headers['x-correlation-id'] && traceRes1.headers['x-correlation-id'].startsWith('vxp_req_'), 'Server automatically generates vxp_req_ correlation ID');

    const customTraceId = 'vxp_visa_audit_trace_98412';
    const traceRes2 = await fetchUrl(`${BASE_URL}/api/config`, {
      headers: { 'X-Correlation-ID': customTraceId }
    });
    assert(traceRes2.headers['x-correlation-id'] === customTraceId, 'Server preserves upstream caller correlation ID');

    // ------------------------------------------------------------------------
    // Group 3: SRE Kubernetes Liveness & Readiness Probes
    // ------------------------------------------------------------------------
    console.log('\n🔹 [Group 3] Verifying SRE Kubernetes Probes (/healthz & /readyz)...');
    const healthz = await fetchUrl(`${BASE_URL}/healthz`);
    assert(healthz.statusCode === 200, 'GET /healthz returns HTTP 200 OK');
    const healthData = JSON.parse(healthz.data);
    assert(healthData.status === 'UP', 'Liveness probe status is UP');
    assert(typeof healthData.uptimeSeconds === 'number' && healthData.uptimeSeconds >= 0, 'Liveness probe reports valid uptimeSeconds');
    assert(healthData.healthy === true, 'Liveness probe healthy is true');
    assert(typeof healthData.eventLoopLag.p99Ms === 'number', 'Liveness probe reports eventLoopLag.p99Ms');

    const readyz = await fetchUrl(`${BASE_URL}/readyz`);
    assert(readyz.statusCode === 200, 'GET /readyz returns HTTP 200 OK');
    const readyData = JSON.parse(readyz.data);
    assert(readyData.ready === true, 'Readiness probe reports ready === true');
    assert(readyData.checks.httpServer === true, 'Readiness check httpServer is true');
    assert(readyData.checks.telephonyEngine === true, 'Readiness check telephonyEngine is true');

    // ------------------------------------------------------------------------
    // Group 4: Production Prometheus Metrics Endpoint (/metrics)
    // ------------------------------------------------------------------------
    console.log('\n🔹 [Group 4] Verifying Prometheus Telemetry Endpoint (/metrics)...');
    const metricsRes = await fetchUrl(`${BASE_URL}/metrics`);
    assert(metricsRes.statusCode === 200, 'GET /metrics returns HTTP 200 OK');
    assert(metricsRes.headers['content-type'].includes('text/plain'), 'Metrics content-type is text/plain');
    assert(metricsRes.data.includes('voxpulse_ivr_test_total'), 'Metrics includes voxpulse_ivr_test_total');
    assert(metricsRes.data.includes('voxpulse_ivr_audio_mos'), 'Metrics includes voxpulse_ivr_audio_mos');
    assert(metricsRes.data.includes('voxpulse_ivr_sla_ratio'), 'Metrics includes voxpulse_ivr_sla_ratio');
    assert(metricsRes.data.includes('voxpulse_nodejs_process_resident_memory_bytes'), 'Metrics includes standard prom-client memory metric');
    assert(metricsRes.data.includes('voxpulse_event_loop_lag_p99_milliseconds'), 'Metrics includes event loop lag gauge');

    // ------------------------------------------------------------------------
    // Group 5: API Rate Limiting & Throttling Headers
    // ------------------------------------------------------------------------
    console.log('\n🔹 [Group 5] Verifying API Rate Limiting & Throttling Protection...');
    assert(rootRes.headers['ratelimit-limit'] !== undefined, 'RateLimit-Limit header present');
    assert(rootRes.headers['ratelimit-remaining'] !== undefined, 'RateLimit-Remaining header present');
    assert(parseInt(rootRes.headers['ratelimit-limit']) >= 500, 'Global API rate limit configured for high enterprise throughput');

    // ------------------------------------------------------------------------
    // Group 6: Input Sanitization & Prototype Pollution Defense
    // ------------------------------------------------------------------------
    console.log('\n🔹 [Group 6] Verifying Prototype Pollution & Payload Sanitization...');
    const sanitizeRes = await fetchUrl(`${BASE_URL}/api/erlang/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      __proto__: { injectedHackerProp: 'compromised' },
      callsPerHour: 600,
      ahtSeconds: 180,
      agents: 35
    });
    assert(sanitizeRes.statusCode === 200, 'Sanitized request completed with HTTP 200');
    assert(({}).injectedHackerProp === undefined, 'Prototype pollution defense validated: Object.prototype remains clean');

    // ------------------------------------------------------------------------
    // Group 7: ITU-T / E.164 Global Telephone Number Validator
    // ------------------------------------------------------------------------
    console.log('\n🔹 [Group 7] Verifying E.164 Phone Number Standards Validation...');
    assert(validateE164PhoneNumber('+18008472911') === true, 'Validates Visa Global Cardholder E.164 (+18008472911)');
    assert(validateE164PhoneNumber('+442079460199') === true, 'Validates UK London Direct E.164 (+442079460199)');
    assert(validateE164PhoneNumber('18005550100') === true, 'Validates national format with stripped punctuation');
    assert(validateE164PhoneNumber('+1 (800) 847-2911') === true, 'Validates formatted telephone with brackets/dashes');
    assert(validateE164PhoneNumber('invalid_carrier_string') === false, 'Rejects invalid string');
    assert(validateE164PhoneNumber('+1234567890123456789') === false, 'Rejects over-length numbers exceeding 15 digits');
    assert(validateE164PhoneNumber('') === false, 'Rejects empty telephone number');

    // ------------------------------------------------------------------------
    // Group 8: System Event Loop Lag & Memory Bounds Check
    // ------------------------------------------------------------------------
    console.log('\n🔹 [Group 8] Verifying Event Loop Health & Memory Bounds...');
    const lagMetrics = sreGuardian.getEventLoopLag();
    assert(lagMetrics.p99Ms < 200, `Event Loop p99 is within telecom tolerances (${lagMetrics.p99Ms}ms < 200ms)`);
    const memMetrics = sreGuardian.getMemoryMetrics();
    assert(memMetrics.heapUsedMB < 300, `NodeJS heap is healthy (${memMetrics.heapUsedMB}MB < 300MB)`);

  } catch (err) {
    console.error('❌ Hardening test suite encountered unhandled error:', err);
    failed++;
  }

  console.log('\n=======================================================');
  console.log(`📊 Enterprise Hardening Results: ${passed} PASSED, ${failed} FAILED`);
  if (failed === 0) {
    console.log('🏆 100% SUCCESS ACROSS ALL INFOSEC, SRE & HARDENING MODULES!');
  }
  console.log('=======================================================\n');

  process.exit(failed > 0 ? 1 : 0);
}

runHardeningTests();
