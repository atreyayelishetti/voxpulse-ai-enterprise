// VoxPulse AI - Enterprise Prometheus & Grafana Metrics Exporter
// Incorporates prom-client for OS, GC, Event Loop & Custom Telecom Metrics
import promClient from 'prom-client';
import { testRunner } from './testRunner.js';
import { sreGuardian } from './sreGuardian.js';

// Initialize prom-client Registry
const register = new promClient.Registry();

// Enable standard NodeJS & OS metrics (CPU, Memory, Event Loop, GC)
promClient.collectDefaultMetrics({
  register,
  prefix: 'voxpulse_nodejs_',
  labels: { app: 'voxpulse-enterprise-telephony' }
});

// Custom Prometheus Telecom & HTTP Gauges / Counters
export const httpRequestsTotal = new promClient.Counter({
  name: 'voxpulse_http_requests_total',
  help: 'Total number of HTTP requests processed by VoxPulse API',
  labelNames: ['method', 'route', 'status_code'],
  registers: [register]
});

export const httpRequestDurationSeconds = new promClient.Histogram({
  name: 'voxpulse_http_request_duration_seconds',
  help: 'Histogram of HTTP request latency in seconds',
  labelNames: ['method', 'route'],
  buckets: [0.01, 0.05, 0.1, 0.3, 0.5, 1, 2, 5],
  registers: [register]
});

export const activeCallsGauge = new promClient.Gauge({
  name: 'voxpulse_telephony_active_calls',
  help: 'Currently active concurrent PSTN / WebRTC / SIP test calls',
  labelNames: ['carrier', 'route_type'],
  registers: [register]
});

export const websocketClientsGauge = new promClient.Gauge({
  name: 'voxpulse_websocket_clients_active',
  help: 'Active real-time WebSocket telemetry subscriber connections',
  registers: [register]
});

export const eventLoopLagGauge = new promClient.Gauge({
  name: 'voxpulse_event_loop_lag_p99_milliseconds',
  help: 'Event loop delay p99 percentile in milliseconds',
  registers: [register]
});

// Synchronous formatter for backwards compatibility with tests
export function getPrometheusMetrics() {
  const history = testRunner.getHistory();
  const totalRuns = history.length || 1;
  const passedRuns = history.filter(h => h.status === 'PASSED').length;
  const slaRatio = (passedRuns / totalRuns).toFixed(4);

  const avgMos = (history.reduce((acc, h) => acc + (h.audioMetrics?.mos || 4.35), 0) / totalRuns).toFixed(2);
  const avgLatencyMs = Math.round(history.reduce((acc, h) => acc + (h.audioMetrics?.latencyMs || 140), 0) / totalRuns);

  const lag = sreGuardian.getEventLoopLag();
  const mem = sreGuardian.getMemoryMetrics();

  return `# HELP voxpulse_ivr_test_total Total number of IVR test runs executed
# TYPE voxpulse_ivr_test_total counter
voxpulse_ivr_test_total ${totalRuns}

# HELP voxpulse_ivr_sla_ratio Operational reachability SLA ratio (0.0 to 1.0)
# TYPE voxpulse_ivr_sla_ratio gauge
voxpulse_ivr_sla_ratio ${slaRatio}

# HELP voxpulse_ivr_audio_mos Mean Opinion Score (1.0 to 5.0)
# TYPE voxpulse_ivr_audio_mos gauge
voxpulse_ivr_audio_mos ${avgMos}

# HELP voxpulse_ivr_latency_milliseconds PSTN Carrier roundtrip latency in ms
# TYPE voxpulse_ivr_latency_milliseconds gauge
voxpulse_ivr_latency_milliseconds ${avgLatencyMs}

# HELP voxpulse_event_loop_lag_p99_ms Event loop lag p99 percentile
# TYPE voxpulse_event_loop_lag_p99_ms gauge
voxpulse_event_loop_lag_p99_ms ${lag.p99Ms}

# HELP voxpulse_memory_heap_used_bytes Heap memory in bytes
# TYPE voxpulse_memory_heap_used_bytes gauge
voxpulse_memory_heap_used_bytes ${mem.heapUsedMB * 1024 * 1024}
`;
}

// Asynchronous full metrics exporter combining prom-client + telecom metrics
export async function getFullPrometheusMetricsAsync() {
  const lag = sreGuardian.getEventLoopLag();
  eventLoopLagGauge.set(lag.p99Ms);

  const promMetrics = await register.metrics();
  const telecomMetrics = getPrometheusMetrics();

  return `${promMetrics}\n\n# --- VoxPulse Domain Telemetry ---\n${telecomMetrics}`;
}

export { register as promRegistry };
