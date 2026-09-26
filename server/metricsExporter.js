// Prometheus & Grafana Metrics Exporter for VoxPulse AI
import { testRunner } from './testRunner.js';

export function getPrometheusMetrics() {
  const history = testRunner.getHistory();
  const totalRuns = history.length || 1;
  const passedRuns = history.filter(h => h.status === 'PASSED').length;
  const slaRatio = (passedRuns / totalRuns).toFixed(4);

  const avgMos = (history.reduce((acc, h) => acc + (h.audioMetrics?.mos || 4.35), 0) / totalRuns).toFixed(2);
  const avgLatencyMs = Math.round(history.reduce((acc, h) => acc + (h.audioMetrics?.latencyMs || 140), 0) / totalRuns);

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
`;
}
