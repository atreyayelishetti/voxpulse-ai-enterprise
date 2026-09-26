import React from 'react';
import { 
  PhoneCall, 
  Workflow, 
  PlayCircle, 
  Sparkles, 
  TrendingDown, 
  BarChart3, 
  FolderTree,
  Flame,
  Globe2,
  GitFork,
  ShieldAlert,
  BarChart2,
  Bell,
  Radio,
  Server,
  Settings,
  ShieldCheck,
  Bot,
  Activity,
  Key,
  Sliders,
  Swords,
  Fingerprint,
  Users,
  DollarSign,
  HeartHandshake,
  Download,
  VolumeX,
  Lock,
  Building,
  FileCode,
  Volume2,
  MapPin,
  Code,
  Zap,
  Upload,
  Calculator,
  Cpu,
  Clock,
  Tag,
  GitBranch
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, systemConfig }) {
  const menuItems = [
    { id: 'console', label: 'Live Call Console', icon: PhoneCall, badge: 'Realtime' },
    { id: 'softphone', label: 'WebRTC Live Softphone', icon: Radio, badge: 'Browser Mic' },
    { id: 'voicebot', label: 'Voicebot AI Studio', icon: Bot, badge: 'Dialogflow/Gemini' },
    { id: 'canvas', label: 'No-Code Canvas Builder', icon: GitFork, badge: 'Visual' },
    { id: 'did', label: 'Global DID Pool', icon: Globe2, badge: '100+ DIDs' },
    { id: 'discovery', label: 'IVR Tree Discovery', icon: FolderTree, badge: 'AI Crawler' },
    { id: 'emergency', label: '24/7 Emergency Monitor', icon: ShieldAlert, badge: 'Outage' },
    { id: 'builder', label: 'Test Flow Builder', icon: Workflow },
    { id: 'runner', label: 'Automated Runner', icon: PlayCircle },
    { id: 'load', label: 'PSTN Load Testing', icon: Flame, badge: 'Stress' },
    { id: 'heatmap', label: 'Global Latency Heatmap', icon: Globe2 },
    { id: 'scorecard', label: 'Carrier SLA Scorecard', icon: BarChart2 },
    { id: 'sip', label: 'SIP Protocol Diagnostics', icon: Server },
    { id: 'compliance', label: 'Compliance & PCI Auditor', icon: ShieldCheck },
    { id: 'escalation', label: 'Escalation Policies', icon: ShieldCheck },
    { id: 'gemini', label: 'Gemini AI Studio', icon: Sparkles, badge: 'AI Live' },
    { id: 'integrations', label: 'Alert Integrations', icon: Bell },
    { id: 'settings', label: 'Workspace Settings', icon: Settings },
    { id: 'degradation', label: 'Audio Noise & Codec Studio', icon: Sliders, badge: 'PSTN Jitter' },
    { id: 'combat', label: 'AI Bot Combat Arena', icon: Swords, badge: 'Agent vs IVR' },
    { id: 'probes', label: 'Global Probe Orchestrator', icon: Server, badge: 'LRN Lookup' },
    { id: 'biometrics', label: 'Voice Biometrics Auditor', icon: Fingerprint, badge: 'Anti-Spoof' },
    { id: 'benchmarks', label: 'Multi-Engine STT Matrix', icon: BarChart3, badge: 'STT Accuracy' },
    { id: 'chaos', label: 'IVR Chaos Studio', icon: Flame, badge: 'Fault Inject' },
    { id: 'omnichannel', label: 'Omnichannel Agent Tester', icon: Users, badge: 'Callback' },
    { id: 'billing', label: 'Toll-Free Billing Auditor', icon: DollarSign, badge: 'Rate Audit' },
    { id: 'sentiment', label: 'Gemini Sentiment & Legal', icon: HeartHandshake, badge: 'AI Compliance' },
    { id: 'failover', label: 'SIP SBC Failover Tester', icon: GitFork, badge: 'Resilience' },
    { id: 'exporter', label: 'PDF Export Report Studio', icon: Download, badge: 'PDF & CSV' },
    { id: 'outages', label: 'Global Outage Map', icon: Radio, badge: 'Live Ticker' },
    { id: 'tuning', label: 'STT Custom Vocabulary', icon: Sliders, badge: 'Acoustic AI' },
    { id: 'redactor', label: 'Call Audio PII Redactor', icon: VolumeX, badge: 'GDPR & PCI' },
    { id: 'rbac', label: 'Keycloak RBAC Inspector', icon: Key, badge: 'OIDC Roles' },
    { id: 'polqa', label: 'POLQA & PESQ Analyzer', icon: Activity, badge: 'ITU-T P.863' },
    { id: 'tls', label: 'SIP TLS & SRTP Security', icon: Lock, badge: 'TLS 1.3' },
    { id: 'tenant', label: 'Multi-Tenant Workspaces', icon: Building, badge: 'Quotas' },
    { id: 'pcap', label: 'SIP PCAP Packet Trace', icon: FileCode, badge: 'Wireshark' },
    { id: 'confusion', label: 'STT Confusion Matrix', icon: BarChart2, badge: 'Phonemes' },
    { id: 'ssml', label: 'Neural SSML Voice Studio', icon: Volume2, badge: 'Neural TTS' },
    { id: 'branching', label: 'IVR Drop-off Graph', icon: GitFork, badge: 'Heatmap' },
    { id: 'webhooks', label: 'Webhook Retry Queue', icon: Bell, badge: 'DLQ Queue' },
    { id: 'lata', label: 'Telco LATA Exchange DB', icon: MapPin, badge: 'NANPA' },
    { id: 'sipheaders', label: 'SIP Header Overrides', icon: Code, badge: 'INVITE' },
    { id: 'silence', label: 'Dead Air Silence Marker', icon: VolumeX, badge: 'Gap Marker' },
    { id: 'mosalarms', label: 'Realtime MOS Alarms', icon: Bell, badge: 'SLA Alarms' },
    { id: 'ssoauditor', label: 'SAML & PKCE SSO Audit', icon: Key, badge: 'Auth Log' },
    { id: 'bargein', label: 'Voicebot Barge-In Test', icon: Zap, badge: 'Mute Latency' },
    { id: 'importer', label: 'Klearcom One-Click Importer', icon: Upload, badge: 'Migrate' },
    { id: 'jitterbuffer', label: 'RTP Jitter Buffer Sim', icon: Activity, badge: 'Adaptive' },
    { id: 'dtmfsniffer', label: 'RFC 4733 DTMF Sniffer', icon: Radio, badge: 'PT-101' },
    { id: 'registrar', label: 'SIP Registrar Monitor', icon: Server, badge: 'AOR Bind' },
    { id: 'bwcalc', label: 'VoIP Bandwidth Calc', icon: Calculator, badge: 'Mbps Calc' },
    { id: 'iceinspector', label: 'WebRTC STUN/TURN ICE', icon: Globe2, badge: 'STUN/TURN' },
    { id: 'amd', label: 'AMD Voicemail Detector', icon: Bot, badge: 'AMD Accuracy' },
    { id: 'erlang', label: 'Erlang C SLA Predictor', icon: Users, badge: 'Staffing' },
    { id: 'prack', label: 'SIP PRACK 100rel Tester', icon: Server, badge: 'RFC 3262' },
    { id: 'promptconverter', label: 'Voice Prompt Transcoder', icon: Upload, badge: 'G.711u' },
    { id: 'gdpr', label: 'GDPR Data Retention', icon: ShieldCheck, badge: '30-Day Auto' },
    { id: 'sttradar', label: 'Streaming STT Radar', icon: Activity, badge: 'TTFT Stream' },
    { id: 'sdp', label: 'SDP Codec Negotiator', icon: Server, badge: 'm=audio' },
    { id: 'bargerecovery', label: 'Barge-In Context Switch', icon: Bot, badge: 'Recovery' },
    { id: 'e911', label: 'E911 PSAP Address Check', icon: ShieldAlert, badge: 'Kari Law' },
    { id: 'dnis', label: 'DNIS Routing Lookup', icon: Globe2, badge: 'Trunk Map' },
    { id: 'mime', label: 'SIP MIME Body Parser', icon: Code, badge: 'MIME ISUP' },
    { id: 'mos3d', label: 'Spatial 3D MOS Map', icon: Activity, badge: 'Global MOS' },
    { id: 'aht', label: 'Gemini AHT Optimizer', icon: TrendingDown, badge: 'AHT Cut' },
    { id: 'aec', label: 'Echo Cancellation AEC', icon: Activity, badge: 'ERLE Loss' },
    { id: 'bursting', label: 'SIP Channel Bursting', icon: Flame, badge: 'Surge Trunk' },
    { id: 'promptab', label: 'Gemini Prompt A/B Test', icon: Sparkles, badge: 'System LLM' },
    { id: 'lnp', label: 'LNP Number Porting Tracker', icon: Globe2, badge: 'FOC Order' },
    { id: 'refer', label: 'SIP REFER Transfer Test', icon: Server, badge: 'RFC 3515' },
    { id: 'lufs', label: 'LUFS Volume Normalizer', icon: Volume2, badge: 'EBU R128' },
    { id: 'screenpop', label: 'Agent CTI Screen Pop', icon: Clock, badge: 'CAD Pop' },
    { id: 'digest', label: 'SIP 401 Digest Auth', icon: Lock, badge: 'SHA-256' },
    { id: 'fallbacks', label: 'Intent Fallback Strategy', icon: Bot, badge: 'Recovery' },
    { id: 'subnets', label: 'Carrier IP Subnets', icon: Server, badge: 'Iptables' },
    { id: 'fft', label: 'FFT Audio Spectrum', icon: Activity, badge: 'FFT 2048' },
    { id: 'replay', label: 'IVR Session Replay Path', icon: GitFork, badge: 'DTMF Path' },
    { id: 'lcr', label: 'PSTN LCR Route Optimizer', icon: TrendingDown, badge: 'Least Cost' },
    { id: 'siptimers', label: 'SIP RFC 3261 Timers', icon: Clock, badge: 'T1/T2/A/B' },
    { id: 'liveness', label: 'Voice Liveness Meter', icon: Fingerprint, badge: 'Spoof Check' },
    { id: 'datachannel', label: 'RTCDataChannel Stats', icon: Activity, badge: 'SCTP' },
    { id: 'tagger', label: 'Call Metadata Tagger', icon: Tag, badge: 'Tags' },
    { id: 'prispans', label: 'T1/E1 PRI Circuit Spans', icon: Server, badge: 'ISDN Slips' },
    { id: 'outboundproxy', label: 'Outbound Proxy Router', icon: GitBranch, badge: 'SBC Proxy' },
    { id: 'menuab', label: 'IVR Menu Prompt A/B', icon: Sparkles, badge: 'Containment' },
    { id: 'nluheatmap', label: 'NLU Intent Confidence', icon: Bot, badge: 'Confidence' },
    { id: 'percentiles', label: 'P50/P99 Latency Graph', icon: BarChart3, badge: 'P99 Latency' },
    { id: 'optionskeepalive', label: 'SIP OPTIONS Keepalive', icon: Server, badge: 'Probes 30s' },
    { id: 'usftax', label: 'USF Regulatory Tax Audit', icon: DollarSign, badge: 'FCC Tax' },
    { id: 'csat', label: 'Post-Call CSAT Predictor', icon: Sparkles, badge: 'CSAT AI' },
    { id: 'transcoder', label: 'G.711u to Opus Codec', icon: Cpu, badge: 'Wideband' },
    { id: 'dialogs', label: 'SIP Dialog State Machine', icon: Server, badge: 'Call-ID' },
    { id: 'langdetect', label: 'Language Auto-Detect', icon: Globe2, badge: 'Multi-Lang' },
    { id: 'peerstats', label: 'WebRTC PeerConnection', icon: Activity, badge: 'inbound-rtp' },
    { id: 'stirshaken', label: 'STIR/SHAKEN Attestation', icon: ShieldCheck, badge: 'Attest A' },
    { id: 'cronscheduler', label: '24/7 Synthetic Cron Scheduler', icon: Clock, badge: '24/7 Polling' },
    { id: 'carrierinterconnect', label: 'Carrier Interconnect Matrix', icon: Server, badge: 'Tier-1 POPs' },
    { id: 'lcrsavings', label: 'Carrier LCR Savings Calc', icon: DollarSign, badge: 'ROI Calc' },
    { id: 'execpdfexporter', label: 'Executive SLA PDF Exporter', icon: Download, badge: 'PDF Export' },
    { id: 'dashboard100', label: '104-Module Executive Dashboard', icon: Activity, highlight: true },
    { id: 'klearcom', label: 'Klearcom Migration & ROI', icon: TrendingDown, highlight: true },
    { id: 'analytics', label: 'Analytics & Reports', icon: BarChart3 }
  ];

  return (
    <aside style={{
      width: '270px',
      background: 'rgba(15, 23, 42, 0.95)',
      backdropFilter: 'blur(20px)',
      borderRight: '1px solid rgba(255, 255, 255, 0.08)',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 100
    }}>
      {/* Brand Header */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(99, 102, 241, 0.4)'
          }}>
            <Activity size={20} color="#fff" />
          </div>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 800, color: '#fff', lineHeight: 1.1 }}>
              VoxPulse <span style={{ color: '#06b6d4' }}>AI</span>
            </h1>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              Klearcom Enterprise Suite
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ padding: '6px 6px', flex: 1, display: 'flex', flexDirection: 'column', gap: '2px', overflowY: 'auto' }}>
        <div style={{ padding: '0 6px 4px 6px', fontSize: '0.62rem', fontWeight: 700, color: 'var(--text-dim)', letterSpacing: '1px', textTransform: 'uppercase' }}>
          Enterprise Core
        </div>

        {menuItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '6px 8px',
                borderRadius: '8px',
                border: 'none',
                background: isActive ? 'linear-gradient(90deg, rgba(99, 102, 241, 0.2) 0%, rgba(99, 102, 241, 0.05) 100%)' : 'transparent',
                borderLeft: isActive ? '3px solid #6366f1' : '3px solid transparent',
                color: isActive ? '#fff' : 'var(--text-muted)',
                fontWeight: isActive ? 600 : 500,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                textAlign: 'left',
                width: '100%'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Icon size={14} color={isActive ? '#6366f1' : item.highlight ? '#10b981' : '#9ca3af'} />
                <span style={{ fontSize: '0.78rem', color: item.highlight && !isActive ? '#34d399' : 'inherit' }}>
                  {item.label}
                </span>
              </div>

              {item.badge && (
                <span className={`badge ${item.badge === 'Realtime' ? 'badge-cyan' : item.badge === 'Stress' || item.badge === 'Outage' ? 'badge-rose' : 'badge-indigo'}`} style={{ fontSize: '0.52rem', padding: '1px 3px' }}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* SSO & Provider Footer */}
      <div style={{
        padding: '8px 10px',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        background: 'rgba(0, 0, 0, 0.2)',
        fontSize: '0.72rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
          <span style={{ color: 'var(--text-muted)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Key size={11} color="#a78bfa" /> Keycloak SSO:
          </span>
          <span style={{ color: '#a78bfa', fontWeight: 600, fontSize: '0.62rem' }}>
            OIDC Active
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Database:</span>
          <span style={{ color: '#34d399', fontWeight: 600, fontSize: '0.62rem' }}>
            PostgreSQL 16
          </span>
        </div>
      </div>
    </aside>
  );
}
