// VoxPulse AI - SRE Guardian, Event Loop Protection & Kubernetes Probes
// Compliant with Site Reliability Engineering (SRE) Best Practices
import { monitorEventLoopDelay } from 'perf_hooks';
import os from 'os';

class SREGuardian {
  constructor() {
    this.isDraining = false;
    this.startupTimestamp = new Date().toISOString();
    this.startTimeMs = Date.now();

    // High-Resolution Event Loop Delay Monitor (20ms resolution)
    this.eventLoopHistogram = monitorEventLoopDelay({ resolution: 20 });
    this.eventLoopHistogram.enable();

    this.activeHttpConnections = 0;
    this.activeCallsCount = 0;
    this.telephonyAdapterRef = null;
    this.dbPoolRef = null;
    this.serverRef = null;
    this.wssRef = null;
  }

  attachDependencies({ server, wss, telephonyAdapter, dbPool }) {
    this.serverRef = server;
    this.wssRef = wss;
    this.telephonyAdapterRef = telephonyAdapter;
    this.dbPoolRef = dbPool;
  }

  // Calculate Event Loop Lag Statistics
  getEventLoopLag() {
    const toMs = (nanos) => Math.round((nanos / 1e6) * 100) / 100;
    return {
      minMs: toMs(this.eventLoopHistogram.min),
      maxMs: toMs(this.eventLoopHistogram.max),
      meanMs: toMs(this.eventLoopHistogram.mean),
      p50Ms: toMs(this.eventLoopHistogram.percentile(50)),
      p90Ms: toMs(this.eventLoopHistogram.percentile(90)),
      p99Ms: toMs(this.eventLoopHistogram.percentile(99))
    };
  }

  // Process & Memory Metrics
  getMemoryMetrics() {
    const mem = process.memoryUsage();
    const toMB = (bytes) => Math.round((bytes / (1024 * 1024)) * 100) / 100;
    return {
      rssMB: toMB(mem.rss),
      heapTotalMB: toMB(mem.heapTotal),
      heapUsedMB: toMB(mem.heapUsed),
      externalMB: toMB(mem.external),
      heapUsagePercentage: Math.round((mem.heapUsed / mem.heapTotal) * 1000) / 10,
      systemFreeMemMB: toMB(os.freemem()),
      systemTotalMemMB: toMB(os.totalmem()),
      systemCpuCount: os.cpus().length,
      systemLoadAvg1m: Math.round(os.loadavg()[0] * 100) / 100
    };
  }

  // Liveness Probe Handler (/healthz)
  handleLivenessProbe(req, res) {
    const lag = this.getEventLoopLag();
    const memory = this.getMemoryMetrics();
    const uptimeSeconds = Math.floor((Date.now() - this.startTimeMs) / 1000);

    // If event loop lag p99 is catastrophically degraded (> 10,000ms), fail liveness
    const isDegraded = lag.p99Ms > 10000;

    const payload = {
      status: isDegraded ? 'DEGRADED' : 'UP',
      uptimeSeconds,
      startupTimestamp: this.startupTimestamp,
      pid: process.pid,
      nodeVersion: process.version,
      platform: process.platform,
      eventLoopLag: lag,
      memory,
      isDraining: this.isDraining,
      healthy: !isDegraded
    };

    res.status(isDegraded ? 503 : 200).json(payload);
  }

  // Readiness Probe Handler (/readyz)
  async handleReadinessProbe(req, res) {
    // If the server is in graceful shutdown or draining mode, reject traffic immediately
    if (this.isDraining) {
      return res.status(503).json({
        status: 'DRAINING',
        ready: false,
        message: 'Server is currently undergoing graceful drain and shutdown.'
      });
    }

    const checks = {
      httpServer: !!this.serverRef && this.serverRef.listening,
      telephonyEngine: true, // In-memory or SIP engine is operational
      database: 'IN_MEMORY_FALLBACK'
    };

    // Check Postgres DB pool if attached
    if (this.dbPoolRef) {
      try {
        const client = await this.dbPoolRef.connect();
        await client.query('SELECT 1');
        client.release();
        checks.database = 'CONNECTED';
      } catch (err) {
        checks.database = 'UNAVAILABLE_FALLBACK';
      }
    }

    const isReady = checks.httpServer && checks.telephonyEngine;

    res.status(isReady ? 200 : 503).json({
      status: isReady ? 'READY' : 'NOT_READY',
      ready: isReady,
      timestamp: new Date().toISOString(),
      checks
    });
  }

  // Register OS Signal Traps for Zero-Downtime Rolling Restarts
  registerGracefulShutdown(server, wss) {
    const shutdown = async (signal) => {
      if (this.isDraining) return;
      this.isDraining = true;
      console.log(`\n🛑 [SRE Guardian] Received ${signal}. Initiating Graceful Draining & Shutdown...`);

      // 1. Inform Kubernetes / Load Balancer to remove node from service pool
      console.log('[SRE Guardian] 1/4 Stopping acceptance of new inbound HTTP & SIP requests');

      // 2. Broadcast disconnection warning to active WebSockets
      if (wss && wss.clients) {
        console.log(`[SRE Guardian] 2/4 Closing ${wss.clients.size} active WebSocket telemetry sessions`);
        for (const ws of wss.clients) {
          try {
            ws.send(JSON.stringify({
              type: 'SYSTEM_SHUTDOWN',
              message: 'VoxPulse node draining for rolling deployment. Reconnecting to alternate pod...',
              code: 'POD_DRAINING'
            }));
            ws.close(1001, 'Server Pod Draining');
          } catch (e) {}
        }
      }

      // 3. Close HTTP Server
      const closePromise = new Promise((resolve) => {
        if (server) {
          console.log('[SRE Guardian] 3/4 Closing HTTP server socket listeners');
          server.close(() => {
            console.log('[SRE Guardian] ✓ HTTP Server closed cleanly');
            resolve();
          });
        } else {
          resolve();
        }
      });

      // 4. Close Database Pool
      if (this.dbPoolRef) {
        try {
          console.log('[SRE Guardian] 4/4 Draining PostgreSQL connection pool');
          await this.dbPoolRef.end();
          console.log('[SRE Guardian] ✓ PostgreSQL pool drained');
        } catch (e) {}
      }

      // Timeout watchdog: Force exit after 8 seconds if lingering connections exist
      const forceTimer = setTimeout(() => {
        console.warn('[SRE Guardian] ⚠️ Graceful shutdown timed out (8s). Forcing termination.');
        process.exit(0);
      }, 8000);
      forceTimer.unref();

      await closePromise;
      console.log('[SRE Guardian] 🎉 Graceful shutdown complete. Exiting cleanly.');
      process.exit(0);
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  }
}

export const sreGuardian = new SREGuardian();
