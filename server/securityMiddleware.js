// VoxPulse AI - Enterprise Security & InfoSec Hardening Middleware
// Compliant with PCI-DSS v4.0 Requirement 6, OWASP Top 10, and SOC-2 Type II
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import crypto from 'crypto';

// ----------------------------------------------------------------------------
// 1. HTTP Security Headers (Helmet Configuration)
// ----------------------------------------------------------------------------
export const enterpriseSecurityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"], // Vite HMR support
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'blob:', 'https:'],
      mediaSrc: ["'self'", 'data:', 'blob:'],
      connectSrc: ["'self'", 'ws:', 'wss:', 'http:', 'https:'],
      fontSrc: ["'self'", 'data:', 'https:'],
      objectSrc: ["'none'"],
      frameAncestors: ["'none'"], // Prevent Clickjacking (PCI-DSS Req 6.5)
      upgradeInsecureRequests: process.env.NODE_ENV === 'production' ? [] : null
    }
  },
  crossOriginEmbedderPolicy: false, // Required for WebRTC & audio worklets
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  dnsPrefetchControl: { allow: false },
  frameguard: { action: 'deny' },
  hidePoweredBy: true,
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },
  ieNoOpen: true,
  noSniff: true, // X-Content-Type-Options: nosniff
  originAgentCluster: true,
  permittedCrossDomainPolicies: { permittedPolicies: 'none' },
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  xssFilter: true
});

// ----------------------------------------------------------------------------
// 2. Distributed Rate Limiters (DDoS & Brute-Force Prevention)
// ----------------------------------------------------------------------------

// Standard API Rate Limiter
export const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // 1000 requests per 15 min per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too Many Requests',
    message: 'API rate limit exceeded. Please retry after backoff interval.',
    code: 'RATE_LIMIT_EXCEEDED'
  }
});

// Sensitive Authentication Rate Limiter (Login, Keycloak, SSO)
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 60, // 60 attempts per 15 min per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too Many Authentication Attempts',
    message: 'Authentication rate limit reached. Please wait 15 minutes.',
    code: 'AUTH_RATE_LIMIT_EXCEEDED'
  }
});

// Telephony Outbound & Load Test Rate Limiter
export const telephonyRateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 120, // 120 dispatch operations per 5 min per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Telephony Dispatch Throttled',
    message: 'Telephony dispatch rate limit reached to protect downstream SBC capacity.',
    code: 'SBC_THROTTLED'
  }
});

// ----------------------------------------------------------------------------
// 3. Request Correlation & Distributed Tracing Middleware
// ----------------------------------------------------------------------------
export function correlationIdMiddleware(req, res, next) {
  const correlationId = req.headers['x-correlation-id'] ||
    req.headers['x-request-id'] ||
    `vxp_req_${Date.now().toString(36)}_${crypto.randomBytes(6).toString('hex')}`;

  req.correlationId = correlationId;
  res.setHeader('X-Correlation-ID', correlationId);
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');

  const startTime = process.hrtime.bigint();

  res.on('finish', () => {
    const endTime = process.hrtime.bigint();
    const durationMs = Number((endTime - startTime) / 1000000n);

    // Filter out high-frequency polling logs if needed
    if (!req.path.startsWith('/api/tests/history') && !req.path.startsWith('/api/dashboard/stats')) {
      const logEntry = {
        timestamp: new Date().toISOString(),
        correlationId,
        method: req.method,
        path: req.originalUrl || req.url,
        statusCode: res.statusCode,
        durationMs: Math.round(durationMs * 100) / 100,
        ip: req.ip || req.socket.remoteAddress,
        userAgent: req.headers['user-agent'] || 'unknown'
      };

      if (res.statusCode >= 500) {
        console.error('[HTTP-ERROR]', JSON.stringify(logEntry));
      } else if (res.statusCode >= 400) {
        console.warn('[HTTP-WARN]', JSON.stringify(logEntry));
      } else if (process.env.VERBOSE_LOGS === 'true') {
        console.log('[HTTP-ACCESS]', JSON.stringify(logEntry));
      }
    }
  });

  next();
}

// ----------------------------------------------------------------------------
// 4. Input Sanitization & Payload Protection
// ----------------------------------------------------------------------------
export function inputSanitizationMiddleware(req, res, next) {
  if (req.body && typeof req.body === 'object') {
    // Prevent Prototype Pollution
    const sanitizeObject = (obj) => {
      for (const key of Object.keys(obj)) {
        if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
          delete obj[key];
          continue;
        }
        if (obj[key] && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
          sanitizeObject(obj[key]);
        }
      }
    };
    sanitizeObject(req.body);
  }
  next();
}

// ----------------------------------------------------------------------------
// 5. ITU-T / E.164 Global Telephone Number Validator
// ----------------------------------------------------------------------------
export function validateE164PhoneNumber(number) {
  if (!number || typeof number !== 'string') return false;
  const cleanNumber = number.replace(/[\s\-\(\)\.]/g, '');
  // E.164 format: Optional leading '+' followed by 1 to 15 digits
  const e164Regex = /^\+?[1-9]\d{1,14}$/;
  return e164Regex.test(cleanNumber);
}
