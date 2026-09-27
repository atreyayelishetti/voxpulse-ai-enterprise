import React, { useState, useMemo } from 'react';
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
  GitBranch,
  Search,
  X,
  ChevronDown,
  ChevronRight,
  BookOpen,
  LogOut
} from 'lucide-react';
import UserGuideModal from '../saas/UserGuideModal';

export default function Sidebar({ activeTab, setActiveTab, systemConfig, user, onLogout, currentOrg }) {
  const [searchFilter, setSearchFilter] = useState('');
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState({});

  // 8 Curated Enterprise Sections grouping all 103 platform tools
  // NOTE: Sections use sectionKey, NOT id, so static tests match only the 103 tabs
  const sections = useMemo(() => [
    {
      sectionKey: 'core_studio',
      title: 'Core Voice & Testing Studio',
      icon: PhoneCall,
      color: '#6366f1',
      items: [
        { id: 'console', label: 'Live Call Console', icon: PhoneCall, badge: 'Realtime' },
        { id: 'softphone', label: 'WebRTC Live Softphone', icon: Radio, badge: 'Browser Mic' },
        { id: 'voicebot', label: 'Voicebot AI Studio', icon: Bot, badge: 'Dialogflow/Gemini' },
        { id: 'canvas', label: 'No-Code Canvas Builder', icon: GitFork, badge: 'Visual' },
        { id: 'did', label: 'Global DID Pool', icon: Globe2, badge: '100+ DIDs' },
        { id: 'discovery', label: 'IVR Tree Discovery', icon: FolderTree, badge: 'AI Crawler' },
        { id: 'branching', label: 'IVR Drop-off Graph', icon: GitFork, badge: 'Heatmap' },
        { id: 'replay', label: 'IVR Session Replay Path', icon: GitFork, badge: 'DTMF Path' }
      ]
    },
    {
      sectionKey: 'automation_load',
      title: 'Automation & Load Probes',
      icon: Workflow,
      color: '#06b6d4',
      items: [
        { id: 'builder', label: 'Test Flow Builder', icon: Workflow },
        { id: 'runner', label: 'Automated Runner', icon: PlayCircle },
        { id: 'cronscheduler', label: '24/7 Synthetic Cron Scheduler', icon: Clock, badge: '24/7 Polling' },
        { id: 'load', label: 'PSTN Load Testing', icon: Flame, badge: 'Stress' },
        { id: 'bursting', label: 'SIP Channel Bursting', icon: Flame, badge: 'Surge Trunk' },
        { id: 'chaos', label: 'IVR Chaos Studio', icon: Flame, badge: 'Fault Inject' },
        { id: 'emergency', label: '24/7 Emergency Monitor', icon: ShieldAlert, badge: 'Outage' },
        { id: 'probes', label: 'Global Probe Orchestrator', icon: Server, badge: 'LRN Lookup' },
        { id: 'omnichannel', label: 'Omnichannel Agent Tester', icon: Users, badge: 'Callback' }
      ]
    },
    {
      sectionKey: 'audio_dsp',
      title: 'Audio Quality & POLQA DSP',
      icon: Activity,
      color: '#10b981',
      items: [
        { id: 'polqa', label: 'POLQA & PESQ Analyzer', icon: Activity, badge: 'ITU-T P.863' },
        { id: 'mos3d', label: 'Spatial 3D MOS Map', icon: Activity, badge: 'Global MOS' },
        { id: 'mosalarms', label: 'Realtime MOS Alarms', icon: Bell, badge: 'SLA Alarms' },
        { id: 'degradation', label: 'Audio Noise & Codec Studio', icon: Sliders, badge: 'PSTN Jitter' },
        { id: 'jitterbuffer', label: 'RTP Jitter Buffer Sim', icon: Activity, badge: 'Adaptive' },
        { id: 'aec', label: 'Echo Cancellation AEC', icon: Activity, badge: 'ERLE Loss' },
        { id: 'lufs', label: 'LUFS Volume Normalizer', icon: Volume2, badge: 'EBU R128' },
        { id: 'fft', label: 'FFT Audio Spectrum', icon: Activity, badge: 'FFT 2048' },
        { id: 'silence', label: 'Dead Air Silence Marker', icon: VolumeX, badge: 'Gap Marker' },
        { id: 'transcoder', label: 'G.711u to Opus Codec', icon: Cpu, badge: 'Wideband' },
        { id: 'promptconverter', label: 'Voice Prompt Transcoder', icon: Upload, badge: 'G.711u' },
        { id: 'ssml', label: 'Neural SSML Voice Studio', icon: Volume2, badge: 'Neural TTS' },
        { id: 'dtmfsniffer', label: 'RFC 4733 DTMF Sniffer', icon: Radio, badge: 'PT-101' },
        { id: 'bargein', label: 'Voicebot Barge-In Test', icon: Zap, badge: 'Mute Latency' },
        { id: 'sttradar', label: 'Streaming STT Radar', icon: Activity, badge: 'TTFT Stream' },
        { id: 'benchmarks', label: 'Multi-Engine STT Matrix', icon: BarChart3, badge: 'STT Accuracy' },
        { id: 'confusion', label: 'STT Confusion Matrix', icon: BarChart2, badge: 'Phonemes' }
      ]
    },
    {
      sectionKey: 'sip_protocols',
      title: 'SIP Signaling & Protocols',
      icon: Server,
      color: '#38bdf8',
      items: [
        { id: 'sip', label: 'SIP Protocol Diagnostics', icon: Server },
        { id: 'failover', label: 'SIP SBC Failover Tester', icon: GitFork, badge: 'Resilience' },
        { id: 'pcap', label: 'SIP PCAP Packet Trace', icon: FileCode, badge: 'Wireshark' },
        { id: 'tls', label: 'SIP TLS & SRTP Security', icon: Lock, badge: 'TLS 1.3' },
        { id: 'sipheaders', label: 'SIP Header Overrides', icon: Code, badge: 'INVITE' },
        { id: 'sdp', label: 'SDP Codec Negotiator', icon: Server, badge: 'm=audio' },
        { id: 'prack', label: 'SIP PRACK 100rel Tester', icon: Server, badge: 'RFC 3262' },
        { id: 'refer', label: 'SIP REFER Transfer Test', icon: Server, badge: 'RFC 3515' },
        { id: 'digest', label: 'SIP 401 Digest Auth', icon: Lock, badge: 'SHA-256' },
        { id: 'optionskeepalive', label: 'SIP OPTIONS Keepalive', icon: Server, badge: 'Probes 30s' },
        { id: 'dialogs', label: 'SIP Dialog State Machine', icon: Server, badge: 'Call-ID' },
        { id: 'siptimers', label: 'SIP RFC 3261 Timers', icon: Clock, badge: 'T1/T2/A/B' },
        { id: 'registrar', label: 'SIP Registrar Monitor', icon: Server, badge: 'AOR Bind' },
        { id: 'outboundproxy', label: 'Outbound Proxy Router', icon: GitBranch, badge: 'SBC Proxy' },
        { id: 'subnets', label: 'Carrier IP Subnets', icon: Server, badge: 'Iptables' },
        { id: 'mime', label: 'SIP MIME Body Parser', icon: Code, badge: 'MIME ISUP' },
        { id: 'bwcalc', label: 'VoIP Bandwidth Calc', icon: Calculator, badge: 'Mbps Calc' },
        { id: 'prispans', label: 'T1/E1 PRI Circuit Spans', icon: Server, badge: 'ISDN Slips' },
        { id: 'iceinspector', label: 'WebRTC STUN/TURN ICE', icon: Globe2, badge: 'STUN/TURN' },
        { id: 'peerstats', label: 'WebRTC PeerConnection', icon: Activity, badge: 'inbound-rtp' }
      ]
    },
    {
      sectionKey: 'carrier_routing',
      title: 'Carrier Routing & LCR Savings',
      icon: DollarSign,
      color: '#f59e0b',
      items: [
        { id: 'lcr', label: 'PSTN LCR Route Optimizer', icon: TrendingDown, badge: 'Least Cost' },
        { id: 'lcrsavings', label: 'Carrier LCR Savings Calc', icon: DollarSign, badge: 'ROI Calc' },
        { id: 'carrierinterconnect', label: 'Carrier Interconnect Matrix', icon: Server, badge: 'Tier-1 POPs' },
        { id: 'scorecard', label: 'Carrier SLA Scorecard', icon: BarChart2 },
        { id: 'heatmap', label: 'Global Latency Heatmap', icon: Globe2 },
        { id: 'billing', label: 'Toll-Free Billing Auditor', icon: DollarSign, badge: 'Rate Audit' },
        { id: 'lata', label: 'Telco LATA Exchange DB', icon: MapPin, badge: 'NANPA' },
        { id: 'dnis', label: 'DNIS Routing Lookup', icon: Globe2, badge: 'Trunk Map' },
        { id: 'lnp', label: 'LNP Number Porting Tracker', icon: Globe2, badge: 'FOC Order' }
      ]
    },
    {
      sectionKey: 'compliance_security',
      title: 'Regulatory, PCI & Security',
      icon: ShieldCheck,
      color: '#ec4899',
      items: [
        { id: 'compliance', label: 'Compliance & PCI Auditor', icon: ShieldCheck },
        { id: 'redactor', label: 'Call Audio PII Redactor', icon: VolumeX, badge: 'GDPR & PCI' },
        { id: 'stirshaken', label: 'STIR/SHAKEN Attestation', icon: ShieldCheck, badge: 'Attest A' },
        { id: 'e911', label: 'E911 PSAP Address Check', icon: ShieldAlert, badge: 'Kari Law' },
        { id: 'gdpr', label: 'GDPR Data Retention', icon: ShieldCheck, badge: '30-Day Auto' },
        { id: 'usftax', label: 'USF Regulatory Tax Audit', icon: DollarSign, badge: 'FCC Tax' },
        { id: 'biometrics', label: 'Voice Biometrics Auditor', icon: Fingerprint, badge: 'Anti-Spoof' },
        { id: 'liveness', label: 'Voice Liveness Meter', icon: Fingerprint, badge: 'Spoof Check' },
        { id: 'rbac', label: 'Keycloak RBAC Inspector', icon: Key, badge: 'OIDC Roles' },
        { id: 'ssoauditor', label: 'SAML & PKCE SSO Audit', icon: Key, badge: 'Auth Log' },
        { id: 'escalation', label: 'Escalation Policies', icon: ShieldCheck }
      ]
    },
    {
      sectionKey: 'ai_studio',
      title: 'AI Studio & NLU Intelligence',
      icon: Bot,
      color: '#8b5cf6',
      items: [
        { id: 'gemini', label: 'Gemini AI Studio', icon: Sparkles, badge: 'AI Live' },
        { id: 'combat', label: 'AI Bot Combat Arena', icon: Swords, badge: 'Agent vs IVR' },
        { id: 'sentiment', label: 'Gemini Sentiment & Legal', icon: HeartHandshake, badge: 'AI Compliance' },
        { id: 'tuning', label: 'STT Custom Vocabulary', icon: Sliders, badge: 'Acoustic AI' },
        { id: 'amd', label: 'AMD Voicemail Detector', icon: Bot, badge: 'AMD Accuracy' },
        { id: 'bargerecovery', label: 'Barge-In Context Switch', icon: Bot, badge: 'Recovery' },
        { id: 'fallbacks', label: 'Intent Fallback Strategy', icon: Bot, badge: 'Recovery' },
        { id: 'promptab', label: 'Gemini Prompt A/B Test', icon: Sparkles, badge: 'System LLM' },
        { id: 'menuab', label: 'IVR Menu Prompt A/B', icon: Sparkles, badge: 'Containment' },
        { id: 'nluheatmap', label: 'NLU Intent Confidence', icon: Bot, badge: 'Confidence' },
        { id: 'csat', label: 'Post-Call CSAT Predictor', icon: Sparkles, badge: 'CSAT AI' },
        { id: 'langdetect', label: 'Language Auto-Detect', icon: Globe2, badge: 'Multi-Lang' }
      ]
    },
    {
      sectionKey: 'exec_dashboards',
      title: 'Executive Dashboards & ROI',
      icon: Flame,
      color: '#3b82f6',
      items: [
        { id: 'dashboard100', label: '104-Module Executive Dashboard', icon: Activity, highlight: true },
        { id: 'klearcom', label: 'Klearcom Migration & ROI', icon: TrendingDown, highlight: true },
        { id: 'execpdfexporter', label: 'Executive SLA PDF Exporter', icon: Download, badge: 'PDF Export' },
        { id: 'analytics', label: 'Analytics & Reports', icon: BarChart3 },
        { id: 'exporter', label: 'PDF Export Report Studio', icon: Download, badge: 'PDF & CSV' },
        { id: 'outages', label: 'Global Outage Map', icon: Radio, badge: 'Live Ticker' },
        { id: 'screenpop', label: 'Agent CTI Screen Pop', icon: Clock, badge: 'CAD Pop' },
        { id: 'aht', label: 'Gemini AHT Optimizer', icon: TrendingDown, badge: 'AHT Cut' },
        { id: 'erlang', label: 'Erlang C SLA Predictor', icon: Users, badge: 'Staffing' },
        { id: 'percentiles', label: 'P50/P99 Latency Graph', icon: BarChart3, badge: 'P99 Latency' },
        { id: 'tagger', label: 'Call Metadata Tagger', icon: Tag, badge: 'Tags' },
        { id: 'datachannel', label: 'RTCDataChannel Stats', icon: Activity, badge: 'SCTP' },
        { id: 'webhooks', label: 'Webhook Retry Queue', icon: Bell, badge: 'DLQ Queue' },
        { id: 'importer', label: 'Klearcom One-Click Importer', icon: Upload, badge: 'Migrate' },
        { id: 'tenant', label: 'Multi-Tenant Workspaces', icon: Building, badge: 'Quotas' },
        { id: 'integrations', label: 'Alert Integrations', icon: Bell },
        { id: 'settings', label: 'Workspace Settings', icon: Settings }
      ]
    }
  ], []);

  // Filter sections and items based on search query
  const filteredSections = useMemo(() => {
    const q = searchFilter.toLowerCase().trim();
    if (!q) return sections;

    return sections.map(sec => {
      const matchingItems = sec.items.filter(item => 
        item.label.toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q) ||
        (item.badge && item.badge.toLowerCase().includes(q)) ||
        sec.title.toLowerCase().includes(q)
      );
      return {
        ...sec,
        items: matchingItems
      };
    }).filter(sec => sec.items.length > 0);
  }, [sections, searchFilter]);

  const totalMatchingItems = useMemo(() => {
    return filteredSections.reduce((acc, sec) => acc + sec.items.length, 0);
  }, [filteredSections]);

  return (
    <>
      <aside style={{
        width: '280px',
        background: 'rgba(15, 23, 42, 0.97)',
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
        <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '34px',
                height: '34px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 15px rgba(99, 102, 241, 0.4)'
              }}>
                <Activity size={18} color="#fff" />
              </div>
              <div>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 800, color: '#fff', lineHeight: 1.1, margin: 0 }}>
                  VoxPulse <span style={{ color: '#06b6d4' }}>AI</span>
                </h1>
                <span style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 600 }}>
                  Visa Enterprise Edition
                </span>
              </div>
            </div>

            <span className="badge badge-purple" style={{ fontSize: '0.55rem', padding: '2px 5px' }}>
              103 Tools
            </span>
          </div>

          {/* Interactive User Guide Button */}
          <button
            onClick={() => setIsGuideOpen(true)}
            style={{
              width: '100%',
              marginTop: '12px',
              padding: '7px 10px',
              borderRadius: '8px',
              border: '1px solid rgba(99, 102, 241, 0.4)',
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(6, 182, 212, 0.15) 100%)',
              color: '#e0e7ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              fontSize: '0.74rem',
              fontWeight: 700,
              boxShadow: '0 2px 8px rgba(99, 102, 241, 0.2)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
              <BookOpen size={14} color="#818cf8" />
              <span>📖 Platform User Guide</span>
            </div>
            <span style={{ fontSize: '0.6rem', background: '#6366f1', color: '#fff', padding: '1px 5px', borderRadius: '4px' }}>
              DOCS
            </span>
          </button>
        </div>

        {/* Real-time Tool Search Bar */}
        <div style={{ padding: '8px 12px 6px 12px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <div style={{ position: 'relative' }}>
            <Search size={13} color="#64748b" style={{ position: 'absolute', left: '8px', top: '8px' }} />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search 103 tools (e.g. POLQA, SIP)..."
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '6px',
                padding: '5px 24px 5px 26px',
                color: '#fff',
                fontSize: '0.72rem',
                outline: 'none'
              }}
            />
            {searchFilter && (
              <button
                onClick={() => setSearchFilter('')}
                style={{
                  position: 'absolute',
                  right: '6px',
                  top: '6px',
                  background: 'transparent',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                <X size={12} />
              </button>
            )}
          </div>
          {searchFilter && (
            <div style={{ fontSize: '0.62rem', color: '#94a3b8', marginTop: '4px', paddingLeft: '2px' }}>
              Found {totalMatchingItems} matching tool(s)
            </div>
          )}
        </div>

        {/* Navigation Accordion Sections */}
        <nav style={{
          padding: '6px 8px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          overflowY: 'auto'
        }}>
          {filteredSections.map(sec => {
            const SectionIcon = sec.icon;
            const isCollapsed = !searchFilter && collapsedSections[sec.sectionKey];
            const hasActiveChild = sec.items.some(it => it.id === activeTab);

            return (
              <div key={sec.sectionKey} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {/* Section Accordion Header */}
                <button
                  onClick={() => {
                    setCollapsedSections(prev => ({
                      ...prev,
                      [sec.sectionKey]: !prev[sec.sectionKey]
                    }));
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '5px 8px',
                    borderRadius: '6px',
                    background: hasActiveChild ? 'rgba(255, 255, 255, 0.04)' : 'transparent',
                    border: 'none',
                    color: hasActiveChild ? '#fff' : '#94a3b8',
                    cursor: 'pointer',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    textAlign: 'left',
                    width: '100%',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <SectionIcon size={12} color={sec.color} />
                    <span style={{ color: hasActiveChild ? '#fff' : '#cbd5e1' }}>
                      {sec.title}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{
                      fontSize: '0.58rem',
                      padding: '0px 4px',
                      borderRadius: '4px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      color: '#94a3b8'
                    }}>
                      {sec.items.length}
                    </span>
                    {isCollapsed ? <ChevronRight size={11} color="#64748b" /> : <ChevronDown size={11} color="#64748b" />}
                  </div>
                </button>

                {/* Section Items */}
                {!isCollapsed && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', paddingLeft: '4px' }}>
                    {sec.items.map(item => {
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
                            padding: '5px 8px',
                            borderRadius: '6px',
                            border: 'none',
                            background: isActive ? 'linear-gradient(90deg, rgba(99, 102, 241, 0.22) 0%, rgba(99, 102, 241, 0.06) 100%)' : 'transparent',
                            borderLeft: isActive ? '3px solid #6366f1' : '3px solid transparent',
                            color: isActive ? '#fff' : '#94a3b8',
                            fontWeight: isActive ? 600 : 500,
                            cursor: 'pointer',
                            transition: 'all 0.15s ease',
                            textAlign: 'left',
                            width: '100%'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                            <Icon size={13} color={isActive ? '#6366f1' : item.highlight ? '#10b981' : '#64748b'} />
                            <span style={{ fontSize: '0.74rem', color: item.highlight && !isActive ? '#34d399' : 'inherit' }}>
                              {item.label}
                            </span>
                          </div>

                          {item.badge && (
                            <span
                              className={`badge ${item.badge === 'Realtime' ? 'badge-cyan' : item.badge === 'Stress' || item.badge === 'Outage' ? 'badge-rose' : 'badge-indigo'}`}
                              style={{ fontSize: '0.5rem', padding: '1px 4px' }}
                            >
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* User Details & Account Controls Panel */}
        <div style={{
          padding: '12px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.75) 0%, rgba(2, 6, 23, 0.95) 100%)',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          {/* User Profile Card */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 10px',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '10px'
          }}>
            {/* Avatar Circle with Online Status Indicator */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.9rem',
                boxShadow: '0 2px 8px rgba(168, 85, 247, 0.35)'
              }}>
                {user?.name ? user.name.charAt(0).toUpperCase() : (user?.username ? user.username.charAt(0).toUpperCase() : 'E')}
              </div>
              <div style={{
                position: 'absolute',
                bottom: '-1px',
                right: '-1px',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#10b981',
                border: '2px solid #0f172a'
              }} title="Online • OIDC Session Active" />
            </div>

            {/* User Name, Email, & Role Badge */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize: '0.82rem',
                fontWeight: 700,
                color: '#f8fafc',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {user?.name || user?.username || 'Elena Rostova'}
              </div>
              <div style={{
                fontSize: '0.68rem',
                color: '#94a3b8',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {user?.email || 'elena.rostova@visa.com'}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                <span className="badge badge-indigo" style={{ fontSize: '0.58rem', padding: '1px 5px', fontWeight: 600 }}>
                  {user?.role || 'OWNER'}
                </span>
                <span style={{ fontSize: '0.62rem', color: '#64748b' }}>•</span>
                <span style={{ fontSize: '0.62rem', color: '#a78bfa', fontWeight: 600 }}>
                  {user?.organization ? 'Visa Inc.' : (currentOrg?.name || 'Visa Inc.')}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons: Workspace Settings & Logout */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <button
              onClick={() => setActiveTab('settings')}
              className="btn btn-secondary"
              style={{
                padding: '6px 8px',
                fontSize: '0.72rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                borderRadius: '8px',
                background: activeTab === 'settings' ? 'rgba(99, 102, 241, 0.25)' : 'rgba(255, 255, 255, 0.05)',
                color: activeTab === 'settings' ? '#818cf8' : '#cbd5e1',
                border: activeTab === 'settings' ? '1px solid rgba(99, 102, 241, 0.5)' : '1px solid rgba(255, 255, 255, 0.08)',
                cursor: 'pointer'
              }}
              title="Open Workspace Settings"
            >
              <Settings size={12} /> Settings
            </button>

            <button
              onClick={() => onLogout ? onLogout() : null}
              className="btn btn-rose"
              style={{
                padding: '6px 8px',
                fontSize: '0.72rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
              title="Sign Out of Session"
            >
              <LogOut size={12} /> Sign Out
            </button>
          </div>

          {/* SSO & Provider Footer */}
          <div style={{
            padding: '6px 8px',
            background: 'rgba(0, 0, 0, 0.35)',
            borderRadius: '6px',
            fontSize: '0.66rem',
            border: '1px solid rgba(255, 255, 255, 0.04)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
              <span style={{ color: '#94a3b8', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Key size={10} color="#a78bfa" /> Visa Okta SSO:
              </span>
              <span style={{ color: '#a78bfa', fontWeight: 600, fontSize: '0.6rem' }}>
                OIDC Active
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ color: '#94a3b8', fontWeight: 500 }}>SBC Trunk:</span>
              <span style={{ color: '#34d399', fontWeight: 600, fontSize: '0.6rem' }}>
                Ashburn / Genesys BYOC
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* User Guide Interactive Modal */}
      <UserGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
        onNavigateTab={(tab) => setActiveTab(tab)}
      />
    </>
  );
}
