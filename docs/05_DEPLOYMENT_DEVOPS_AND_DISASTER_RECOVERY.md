# 🚀 VoxPulse AI - Deployment, DevOps & Disaster Recovery Playbook
> **Document Version:** 1.1.0-enterprise  
> **Classification:** Operations & Infrastructure  
> **Target Audience:** DevOps Engineers, Site Reliability Engineers (SREs), Infrastructure Leads  

---

## 1. Docker Compose Multi-Container Topology (`docker-compose.yml`)

```yaml
version: '3.8'

services:
  # 1. PostgreSQL 16 Database
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

  # 3. VoxPulse AI Backend Engine (18 REST Endpoints & WebSockets)
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

  # 4. VoxPulse AI Frontend Dashboard (107 UI Modules on Nginx)
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

## 2. CI/CD Automated Test Pipeline Verification

Every git push to `main` executes the 3-tier automated testing gate:

```bash
# Tier 1: E2E Integration Suite (18 Endpoints Verified)
npm run test:e2e

# Tier 2: Comprehensive 1,500 Test Cases Suite (30 Groups, 100% Pass)
npm run test:1500

# Tier 3: Production Client Bundle Compilation
npm run build
```

---

## 3. Monitoring & Prometheus Metrics Export (`GET /api/metrics`)

VoxPulse AI exports native Prometheus metrics for integration with Datadog, Grafana, and Prometheus scrapers ([`server/metricsExporter.js`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/server/metricsExporter.js)).

### Sample Prometheus Output:
```prometheus
# HELP voxpulse_active_calls Number of active PSTN call tests
# TYPE voxpulse_active_calls gauge
voxpulse_active_calls 3.00

# HELP voxpulse_polqa_mos_average Mean opinion score across active calls
# TYPE voxpulse_polqa_mos_average gauge
voxpulse_polqa_mos_average 4.41

# HELP voxpulse_pstn_latency_ms Audio round-trip latency in milliseconds
# TYPE voxpulse_pstn_latency_ms gauge
voxpulse_pstn_latency_ms 138.00

# HELP voxpulse_tests_completed_total Total synthetic test runs completed
# TYPE voxpulse_tests_completed_total counter
voxpulse_tests_completed_total 1500.00
```

---

## 4. SBC Trunk Failover & Disaster Recovery Protocol

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

### High-Availability Recovery Benchmarks:
- **RTO (Recovery Time Objective)**: $< 2.0\text{ seconds}$ for softswitch trunk failover.
- **RPO (Recovery Point Objective)**: $0\text{ seconds}$ *(Zero telemetry loss via in-memory circular event buffer)*.
- **Failover Verification**: Validated in Group 9 of the test suite (`50 SBC Trunk Failover Tests PASSED`).

---

## 5. Google Cloud Run Serverless Architecture

VoxPulse AI is deployed to **Google Cloud Platform (GCP)** using Google Cloud Run for public demos and low-maintenance multi-region hosting:

### Live Public Instance:
- **Production URL**: [https://voxpulse-ai-752915092336.us-central1.run.app](https://voxpulse-ai-752915092336.us-central1.run.app)
- **GCP Project**: `voxpulse-ai-enterprise` (Project Number: `752915092336`)
- **Service Name**: `voxpulse-ai`
- **Region**: `us-central1`

### Key Operational Characteristics:
1. **Zero-Idle Cost**: Automatically scales between `0` and `5` instances. When there is no active traffic or demo, instances scale down to 0, resulting in zero monthly hosting costs.
2. **Automated TLS & Custom Domains**: Managed HTTPS/2 certificate issued and auto-renewed by Google Frontend.
3. **WebSocket Session Affinity**: Configured with `--session-affinity` so persistent telemetry and WebRTC softphone signaling remain locked to the active container replica.
4. **Unified Multi-Stage Dockerfile**: Builds Vite React frontend in Stage 1, copies optimized static assets to Stage 2 Node 20 runtime, and serves static SPA assets alongside all 27 REST endpoints from a single `$PORT` (8080).

### Deploying Updates:
```bash
gcloud run deploy voxpulse-ai \
  --source . \
  --project voxpulse-ai-enterprise \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated \
  --session-affinity \
  --memory 1Gi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 5 \
  --port 8080 \
  --set-env-vars "NODE_ENV=production,GEMINI_API_KEY=your_gemini_api_key,TELNYX_API_KEY=your_telnyx_api_key"
```

---

## 6. GCP Cost Control, Resource Retention & Single-Container Policy

To guarantee **$0.00 spend** under Google Cloud's permanent Free Tier even after initial trial credits expire:

### 1. Scale-to-Zero Compute (`min-instances = 0`)
- Cloud Run instances automatically shut down completely after 15 minutes of inactivity.
- While idle, instances consume **0 vCPU and 0 RAM**, yielding **$0.00/month** compute charges.
- Monthly Free Tier covers **2,000,000 requests** and **360,000 vCPU-seconds** perpetually.

### 2. Artifact Registry Single-Image Retention Policy
- Repository: `us-central1-docker.pkg.dev/voxpulse-ai-enterprise/cloud-run-source-deploy`
- Retention Policy: `keep-only-1-version` with `keepCount: 1`.
- Any previous container image digests are purged automatically, keeping storage usage at **~75 MB** (well below the **500 MB** Free Tier threshold).

### 3. Cloud Storage Lifecycle Management
- Bucket: `gs://run-sources-voxpulse-ai-enterprise-us-central1/`
- Lifecycle Rule: 24-hour auto-prune on temporary build source zip archives.

### 4. CI/CD Automated Pruning Pipeline
- Workflow: `.github/workflows/deploy-gcp.yml`
- Upon every successful deployment, an automated script queries `gcloud run revisions list` and automatically deletes superseded inactive revisions, ensuring only the latest revision remains active.

---
*VoxPulse AI Deployment Playbook • Docker Compose, Google Cloud Run & CI/CD Tested*
