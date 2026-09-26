// High-Volume PSTN Load & Stress Testing Engine
import { testRunner } from './testRunner.js';

export class LoadTesterEngine {
  /**
   * Run concurrent test calls to stress test IVR capacity
   */
  async runLoadTest({ concurrencyCount = 10, targetNumber = '+18005550100', country = 'US' }) {
    console.log(`[Load Tester] Initiating ${concurrencyCount} concurrent PSTN calls to ${targetNumber}...`);

    const runPromises = [];
    for (let i = 0; i < concurrencyCount; i++) {
      const singleTest = {
        id: `load_test_${i + 1}`,
        name: `Concurrent Load Channel #${i + 1}`,
        targetNumber,
        country
      };
      runPromises.push(testRunner.executeTest(singleTest));
    }

    const results = await Promise.all(runPromises);

    const totalPassed = results.filter(r => r.status === 'PASSED').length;
    const avgLatency = Math.round(results.reduce((acc, r) => acc + (r.audioMetrics?.latencyMs || 0), 0) / results.length);
    const avgMos = (results.reduce((acc, r) => acc + (r.audioMetrics?.mos || 0), 0) / results.length).toFixed(2);

    return {
      totalCalls: concurrencyCount,
      passedCalls: totalPassed,
      failedCalls: concurrencyCount - totalPassed,
      successRate: `${Math.round((totalPassed / concurrencyCount) * 100)}%`,
      averageLatencyMs: avgLatency,
      averageMosScore: avgMos,
      executedAt: new Date().toISOString()
    };
  }
}

export const loadTester = new LoadTesterEngine();
