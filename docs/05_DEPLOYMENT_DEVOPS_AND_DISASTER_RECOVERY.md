# 🚀 VoxPulse AI - Deployment, DevOps & Disaster Recovery Playbook
> **Document Version:** 1.0.0-enterprise  
> **Classification:** Operations & Infrastructure  
> **Target Audience:** DevOps Engineers, Site Reliability Engineers (SREs), Infrastructure Lead  

---

## 1. Docker Compose Multi-Container Topology (`docker-compose.yml`)

```yaml
version: '3.8'

services:
  # 1. PostgreSQL Database
  postgres:
    image: postgres:16-alpine
    container_name: voxpulse_postgres
    restart: always
    environment:
      POSTGRES_USER: voxpulse
      POSTGRES_PASSWORD: voxpulse123
      POSTGRES_DB: voxpulse_db
    ports:
      - "5439:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./server/db/schema.sql:/docker-entrypoint-initdb.d/init.sql
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U voxpulse -d voxpulse_db"]
      interval: 5s
      timeout: 5s
      retries: 5

  # 2. Keycloak SSO Server (OAuth2 / OIDC)
  keycloak:
    image: quay.io/keycloak/keycloak:24.0
    container_name: voxpulse_keycloak
    command: start-dev --import-realm
    environment:
      KEYCLOAK_ADMIN: admin
      KEYCLOAK_ADMIN_PASSWORD: admin
      KC_DB: dev-mem
    ports:
      - "8088:8080"
    volumes:
      - ./keycloak/voxpulse-realm.json:/opt/keycloak/data/import/voxpulse-realm.json
    depends_on:
      - postgres

  # 3. VoxPulse AI Backend Engine
  backend:
    build:
      context: .
      dockerfile: Dockerfile.backend
    container_name: voxpulse_backend
    restart: always
    environment:
      PORT: 3001
      DATABASE_URL: postgresql://voxpulse:voxpulse123@postgres:5432/voxpulse_db
      KEYCLOAK_URL: http://keycloak:8080
      KEYCLOAK_REALM: voxpulse-realm
      TELNYX_API_KEY: ${TELNYX_API_KEY:-}
      GEMINI_API_KEY: ${GEMINI_API_KEY:-}
    ports:
      - "3002:3001"
    depends_on:
      postgres:
        condition: service_healthy

  # 4. VoxPulse AI Frontend Dashboard (Nginx)
  frontend:
    build:
      context: .
      dockerfile: Dockerfile.frontend
    container_name: voxpulse_frontend
    restart: always
    ports:
      - "5174:80"
      - "8090:80"
    depends_on:
      - backend

volumes:
  postgres_data:
```

---

## 2. Monitoring & Metrics Export (`GET /api/metrics`)

VoxPulse AI exports native Prometheus metrics for integration with Datadog, Grafana, and Prometheus scrapers ([`server/metricsExporter.js`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/server/metricsExporter.js)).

### Sample Prometheus Output:
```prometheus
# HELP voxpulse_active_calls Number of active PSTN call tests
# TYPE voxpulse_active_calls gauge
voxpulse_active_calls 3.00

# HELP voxpulse_polqa_mos_average Mean opinion score across active calls
# TYPE voxpulse_polqa_mos_average gauge
voxpulse_polqa_mos_average 4.38

# HELP voxpulse_pstn_latency_ms Audio round-trip latency in milliseconds
# TYPE voxpulse_pstn_latency_ms gauge
voxpulse_pstn_latency_ms 142.00

# HELP voxpulse_tests_completed_total Total synthetic test runs completed
# TYPE voxpulse_tests_completed_total counter
voxpulse_tests_completed_total 700.00
```

---

## 3. SBC Trunk Failover & Disaster Recovery Protocol

```mermaid
graph TD
    Call[Outbound Synthetic Test Call] --> Primary[Primary SBC - Ashburn, VA]
    Primary -->|SIP 180 / 200 OK| Success[Test Execution Passed]
    Primary -.->|Timeout / 503 Service Unavailable| Failover[Failover Triggered < 200ms]
    Failover --> Secondary[Secondary SBC - Chicago, IL]
    Secondary -->|SIP 200 OK| Success
    Secondary -.->|Failure| Terrestrial[Telnyx Direct PSTN Bypass]
    Terrestrial -->|PSTN Route| Success
```

### SLA Recovery Objectives:
- **RTO (Recovery Time Objective)**: $< 2.0\text{ seconds}$
- **RPO (Recovery Point Objective)**: $0\text{ seconds}$ *(Zero telemetry loss via in-memory event buffer)*
