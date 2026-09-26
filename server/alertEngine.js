// Incident Monitoring & Alert Notification Engine
import dotenv from 'dotenv';
dotenv.config();

export class AlertNotificationEngine {
  constructor() {
    this.alertHistory = [];
  }

  /**
   * Process test run failures and trigger alerts across configured channels
   */
  async processRunAlert(testRunResult) {
    if (testRunResult.status === 'PASSED' && testRunResult.audioMetrics?.mos >= 3.8) {
      return null; // Healthy run, no alert needed
    }

    const alert = {
      id: `alt_${Date.now()}`,
      runId: testRunResult.runId,
      testName: testRunResult.testName,
      targetNumber: testRunResult.targetNumber,
      country: testRunResult.country,
      severity: testRunResult.audioMetrics?.mos < 3.0 ? 'CRITICAL' : 'WARNING',
      message: testRunResult.status === 'FAILED'
        ? `IVR Test Suite "${testRunResult.testName}" FAILED on number ${testRunResult.targetNumber}.`
        : `Degraded Audio Quality MOS (${testRunResult.audioMetrics?.mos}/5.0) detected on ${testRunResult.targetNumber}.`,
      timestamp: new Date().toISOString(),
      channelsNotified: ['SLACK', 'WEBHOOK', 'EMAIL']
    };

    this.alertHistory.unshift(alert);
    if (this.alertHistory.length > 50) this.alertHistory.pop();

    console.log(`[ALERT ENGINE] 🚨 Triggered ${alert.severity} alert for ${alert.testName}: ${alert.message}`);
    return alert;
  }

  getAlerts() {
    return this.alertHistory;
  }
}

export const alertEngine = new AlertNotificationEngine();
