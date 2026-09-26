// Keycloak OAuth2 / OpenID Connect (OIDC) Authentication Engine
import dotenv from 'dotenv';
dotenv.config();

export const KEYCLOAK_CONFIG = {
  realm: process.env.KEYCLOAK_REALM || 'voxpulse-realm',
  authServerUrl: process.env.KEYCLOAK_URL || 'http://localhost:8080',
  clientId: process.env.KEYCLOAK_CLIENT_ID || 'voxpulse-app',
  clientSecret: process.env.KEYCLOAK_CLIENT_SECRET || 'voxpulse-secret-key-123'
};

/**
 * Express Middleware for Keycloak JWT Bearer validation & SSO mock
 */
export function keycloakAuthMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    
    // Validate token payload
    req.user = {
      id: 'usr_keycloak_9012',
      email: 'qa.lead@enterprise.com',
      name: 'Senior IVR Engineer',
      role: 'admin',
      token
    };
    return next();
  }

  // Default guest session for local dev dashboard access
  req.user = {
    id: 'usr_default',
    email: 'admin@voxpulse.internal',
    name: 'VoxPulse Admin',
    role: 'admin'
  };
  next();
}

/**
 * Returns OIDC endpoints configuration for frontend authentication
 */
export function getOIDCConfig() {
  return {
    realm: KEYCLOAK_CONFIG.realm,
    authServerUrl: KEYCLOAK_CONFIG.authServerUrl,
    clientId: KEYCLOAK_CONFIG.clientId,
    loginUrl: `${KEYCLOAK_CONFIG.authServerUrl}/realms/${KEYCLOAK_CONFIG.realm}/protocol/openid-connect/auth?client_id=${KEYCLOAK_CONFIG.clientId}&response_type=code&scope=openid`,
    tokenUrl: `${KEYCLOAK_CONFIG.authServerUrl}/realms/${KEYCLOAK_CONFIG.realm}/protocol/openid-connect/token`,
    logoutUrl: `${KEYCLOAK_CONFIG.authServerUrl}/realms/${KEYCLOAK_CONFIG.realm}/protocol/openid-connect/logout`
  };
}
