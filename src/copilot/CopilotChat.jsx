import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Sparkles, 
  Send, 
  X, 
  Minimize2, 
  Maximize2, 
  ChevronRight, 
  RotateCcw, 
  Copy, 
  Check, 
  HelpCircle, 
  ExternalLink,
  Layers,
  PhoneCall,
  Activity,
  ShieldCheck,
  Server,
  DollarSign
} from 'lucide-react';

export default function CopilotChat({ activeTab, setActiveTab, currentOrg, user }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState(null);

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: `### 👋 Welcome to VoxPulse Copilot!
I am your AI telephony architect and platform specialist. Ask me anything about:
- **Navigating the 103 screens** & 8 sidebar sections
- **Genesys Cloud CX** testing without Twilio or Telnyx
- **Visa Inc. Enterprise** PCI-DSS Level 1 zero-PAN redaction & SSO
- **ITU-T P.863 POLQA v3** audio scoring & PESQ degradation
- **Erlang C queue math**, Least Cost Routing (LCR), or SIP timers

How can I assist your testing today?`,
      actionNavTab: null,
      suggestedPrompts: [
        'How do I test Genesys Cloud flows without Twilio?',
        'Where is the POLQA MOS analyzer?',
        'How does Visa PCI-DSS redaction work?',
        'What are the 8 sidebar sections?'
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Global Keyboard Shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleSend = async (messageToSend) => {
    const text = (messageToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMessage = {
      role: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/copilot/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          context: {
            currentTab: activeTab,
            orgId: currentOrg?.id || 'org_visa_inc',
            userRole: user?.role || 'admin'
          }
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();
      const botMessage = {
        role: 'assistant',
        text: data.reply || "I couldn't process that question. Please try asking again.",
        actionNavTab: data.actionNavTab || null,
        navLabel: data.navLabel || (data.actionNavTab ? `Open ${data.actionNavTab.toUpperCase()}` : null),
        suggestedPrompts: data.suggestedPrompts || [],
        sources: data.sources || ['docs/10_COMPREHENSIVE_PLATFORM_USER_GUIDE_AND_SCREEN_CATALOG.md'],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      // Local graceful fallback if backend is momentarily unreachable
      const fallbackMessage = {
        role: 'assistant',
        text: `### Telecom Copilot Knowledge Base
I can help guide you through the platform. For immediate reference:
- **Full Documentation:** Check **docs/10_COMPREHENSIVE_PLATFORM_USER_GUIDE_AND_SCREEN_CATALOG.md** for all 103 screens.
- **Genesys Cloud CX:** Use \`saas-genesys\` for testing Architect flows without Twilio.
- **POLQA Voice Quality:** Use \`polqa\` for ITU-T P.863 MOS scoring.
- **PCI Compliance:** Use \`compliance\` and \`redactor\` for real-time PAN acoustic muting.`,
        actionNavTab: 'dashboard100',
        navLabel: 'Open Executive Dashboard',
        suggestedPrompts: [
          'How do I test Genesys Cloud flows without Twilio?',
          'Where is the POLQA MOS analyzer?'
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const handleClearHistory = () => {
    setMessages([
      {
        role: 'assistant',
        text: 'Chat history cleared. How can I assist you with your IVR and telephony testing?',
        actionNavTab: null,
        suggestedPrompts: [
          'How do I test Genesys Cloud flows without Twilio?',
          'Where is the POLQA MOS analyzer?',
          'What are the 8 sidebar sections?'
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Render markdown text formatting cleanly (bold, headers, bullets, code)
  const formatMarkdown = (content) => {
    if (!content) return null;
    const lines = content.split('\n');

    return lines.map((line, idx) => {
      // Headers
      if (line.startsWith('### ')) {
        return <h4 key={idx} style={{ fontSize: '0.92rem', fontWeight: 800, color: '#fff', margin: '8px 0 4px 0' }}>{line.replace('### ', '')}</h4>;
      }
      if (line.startsWith('## ')) {
        return <h3 key={idx} style={{ fontSize: '1rem', fontWeight: 800, color: '#fff', margin: '10px 0 6px 0' }}>{line.replace('## ', '')}</h3>;
      }
      if (line.startsWith('# ')) {
        return <h2 key={idx} style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', margin: '12px 0 6px 0' }}>{line.replace('# ', '')}</h2>;
      }

      // Bullet lists
      if (line.trim().startsWith('- ') || line.trim().startsWith('• ')) {
        const bulletText = line.trim().substring(2);
        return (
          <div key={idx} style={{ display: 'flex', gap: '6px', margin: '3px 0', fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.45 }}>
            <span style={{ color: '#818cf8', fontWeight: 700 }}>•</span>
            <span>{parseInlineStyles(bulletText)}</span>
          </div>
        );
      }

      // Numbered lists
      const numMatch = line.trim().match(/^(\d+)\.\s+(.*)/);
      if (numMatch) {
        return (
          <div key={idx} style={{ display: 'flex', gap: '6px', margin: '3px 0', fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.45 }}>
            <span style={{ color: '#06b6d4', fontWeight: 700 }}>{numMatch[1]}.</span>
            <span>{parseInlineStyles(numMatch[2])}</span>
          </div>
        );
      }

      // Normal paragraph
      if (!line.trim()) {
        return <div key={idx} style={{ height: '6px' }} />;
      }

      return (
        <p key={idx} style={{ margin: '3px 0', fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.45 }}>
          {parseInlineStyles(line)}
        </p>
      );
    });
  };

  const parseInlineStyles = (str) => {
    // Process inline bold **text** and inline code `code`
    const parts = [];
    const regex = /(\*\*[^*]+\*\*|`[^`]+`)/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(str)) !== null) {
      if (match.index > lastIndex) {
        parts.push(str.substring(lastIndex, match.index));
      }
      const token = match[0];
      if (token.startsWith('**') && token.endsWith('**')) {
        parts.push(
          <strong key={match.index} style={{ color: '#fff', fontWeight: 700 }}>
            {token.slice(2, -2)}
          </strong>
        );
      } else if (token.startsWith('`') && token.endsWith('`')) {
        parts.push(
          <code
            key={match.index}
            style={{
              background: 'rgba(99, 102, 241, 0.15)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              color: '#a5b4fc',
              padding: '1px 5px',
              borderRadius: '4px',
              fontSize: '0.72rem',
              fontFamily: 'monospace'
            }}
          >
            {token.slice(1, -1)}
          </code>
        );
      }
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < str.length) {
      parts.push(str.substring(lastIndex));
    }

    return parts.length ? parts : str;
  };

  return (
    <>
      {/* Floating Trigger Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 9990,
            background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
            border: 'none',
            borderRadius: '50px',
            padding: '10px 18px',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            boxShadow: '0 8px 30px rgba(99, 102, 241, 0.45), 0 0 15px rgba(6, 182, 212, 0.3)',
            transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            fontFamily: 'inherit'
          }}
          className="copilot-launcher"
        >
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Bot size={18} color="#fff" />
            <span style={{
              position: 'absolute',
              top: '-3px',
              right: '-3px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              boxShadow: '0 0 8px #10b981'
            }} />
          </div>

          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 800, lineHeight: 1.1 }}>
              VoxPulse Copilot
            </div>
            <div style={{ fontSize: '0.62rem', opacity: 0.85, fontWeight: 500 }}>
              AI Telecom Specialist
            </div>
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '6px',
            padding: '2px 6px',
            fontSize: '0.62rem',
            fontWeight: 700,
            letterSpacing: '0.5px'
          }}>
            ⌘K
          </div>
        </button>
      )}

      {/* Copilot Chat Window */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9995,
          width: isExpanded ? '640px' : '440px',
          height: '620px',
          maxHeight: '88vh',
          backgroundColor: '#0c1324',
          border: '1px solid rgba(255, 255, 255, 0.14)',
          borderRadius: '20px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), 0 0 35px rgba(99, 102, 241, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          transition: 'width 0.25s ease'
        }}>
          {/* Header */}
          <div style={{
            padding: '14px 16px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            background: 'linear-gradient(90deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.95) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 12px rgba(99, 102, 241, 0.4)'
              }}>
                <Bot size={17} color="#fff" />
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h3 style={{ fontSize: '0.9rem', fontWeight: 800, margin: 0, color: '#fff' }}>
                    VoxPulse Copilot
                  </h3>
                  <span className="badge badge-cyan" style={{ fontSize: '0.55rem', padding: '1px 5px' }}>
                    AI Live
                  </span>
                </div>
                <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>
                  {currentOrg?.name || 'Visa Inc.'} • Ask any question
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button
                onClick={() => handleClearHistory()}
                title="Clear Chat History"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  padding: '4px',
                  borderRadius: '6px'
                }}
              >
                <RotateCcw size={14} />
              </button>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? 'Shrink Window' : 'Expand Window'}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  padding: '4px',
                  borderRadius: '6px'
                }}
              >
                {isExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
              </button>

              <button
                onClick={() => setIsOpen(false)}
                title="Close Copilot (Esc)"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  padding: '4px',
                  borderRadius: '6px'
                }}
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Current Screen Context Pill */}
          <div style={{
            padding: '6px 14px',
            background: 'rgba(0, 0, 0, 0.25)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.68rem',
            color: '#94a3b8'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Layers size={11} color="#818cf8" />
              <span>Current Screen: <strong style={{ color: '#38bdf8' }}>{activeTab}</strong></span>
            </div>

            <button
              onClick={() => handleSend(`What is the purpose of the ${activeTab} screen and how do I use it?`)}
              style={{
                background: 'rgba(99, 102, 241, 0.15)',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                color: '#e0e7ff',
                borderRadius: '4px',
                padding: '1px 6px',
                cursor: 'pointer',
                fontSize: '0.62rem',
                fontWeight: 600
              }}
            >
              Explain This Screen ✨
            </button>
          </div>

          {/* Messages Stream */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {messages.map((msg, idx) => {
              const isUser = msg.role === 'user';

              return (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isUser ? 'flex-end' : 'flex-start',
                    gap: '4px'
                  }}
                >
                  <div style={{
                    maxWidth: '92%',
                    background: isUser
                      ? 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)'
                      : 'rgba(30, 41, 59, 0.6)',
                    border: isUser
                      ? '1px solid rgba(99, 102, 241, 0.4)'
                      : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: isUser ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                    padding: '10px 14px',
                    color: '#fff',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.25)',
                    position: 'relative'
                  }}>
                    {/* Message Body */}
                    {isUser ? (
                      <div style={{ fontSize: '0.8rem', lineHeight: 1.45, color: '#fff' }}>
                        {msg.text}
                      </div>
                    ) : (
                      formatMarkdown(msg.text)
                    )}

                    {/* Action Navigation Button (If Copilot recommends a tab) */}
                    {msg.actionNavTab && (
                      <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
                        <button
                          onClick={() => {
                            if (setActiveTab) setActiveTab(msg.actionNavTab);
                          }}
                          style={{
                            background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
                            border: 'none',
                            color: '#fff',
                            borderRadius: '8px',
                            padding: '6px 12px',
                            fontSize: '0.74rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            boxShadow: '0 2px 10px rgba(99, 102, 241, 0.3)'
                          }}
                        >
                          <span>🚀 {msg.navLabel || `Go to ${msg.actionNavTab}`}</span>
                          <ChevronRight size={13} />
                        </button>
                      </div>
                    )}

                    {/* Sources Citation */}
                    {msg.sources && msg.sources.length > 0 && (
                      <div style={{
                        marginTop: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.62rem',
                        color: '#64748b'
                      }}>
                        <span>Source:</span>
                        <span style={{ color: '#94a3b8' }}>{msg.sources[0]}</span>
                      </div>
                    )}

                    {/* Message Action Bar (Copy) */}
                    {!isUser && (
                      <div style={{
                        position: 'absolute',
                        top: '6px',
                        right: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        <button
                          onClick={() => handleCopy(msg.text, idx)}
                          title="Copy Message"
                          style={{
                            background: 'rgba(0, 0, 0, 0.25)',
                            border: 'none',
                            color: copiedIdx === idx ? '#34d399' : '#94a3b8',
                            borderRadius: '4px',
                            padding: '3px',
                            cursor: 'pointer'
                          }}
                        >
                          {copiedIdx === idx ? <Check size={11} /> : <Copy size={11} />}
                        </button>
                      </div>
                    )}
                  </div>

                  <div style={{ fontSize: '0.6rem', color: '#64748b', padding: '0 4px' }}>
                    {msg.timestamp}
                  </div>

                  {/* Suggested follow-up prompt chips */}
                  {msg.suggestedPrompts && msg.suggestedPrompts.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '4px' }}>
                      {msg.suggestedPrompts.map((prompt, pIdx) => (
                        <button
                          key={pIdx}
                          onClick={() => handleSend(prompt)}
                          style={{
                            background: 'rgba(255, 255, 255, 0.04)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '12px',
                            padding: '3px 8px',
                            color: '#cbd5e1',
                            fontSize: '0.68rem',
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'all 0.15s ease'
                          }}
                          className="prompt-chip"
                        >
                          💬 {prompt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing Loader Indicator */}
            {isLoading && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 10px', background: 'rgba(30, 41, 59, 0.4)', borderRadius: '10px', alignSelf: 'flex-start' }}>
                <Sparkles size={14} color="#818cf8" style={{ animation: 'spin 2s linear infinite' }} />
                <span style={{ fontSize: '0.74rem', color: '#94a3b8' }}>Copilot is thinking...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions Strip */}
          <div style={{
            padding: '6px 12px',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            background: 'rgba(0, 0, 0, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            overflowX: 'auto',
            whiteSpace: 'nowrap'
          }}>
            <button
              onClick={() => handleSend('How do I test Genesys Cloud flows without Twilio?')}
              style={{
                fontSize: '0.65rem',
                background: 'rgba(255, 79, 0, 0.15)',
                border: '1px solid rgba(255, 79, 0, 0.3)',
                color: '#ff8a50',
                borderRadius: '6px',
                padding: '2px 6px',
                cursor: 'pointer'
              }}
            >
              📞 Genesys BYOC
            </button>

            <button
              onClick={() => handleSend('Where is the POLQA MOS analyzer?')}
              style={{
                fontSize: '0.65rem',
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                color: '#34d399',
                borderRadius: '6px',
                padding: '2px 6px',
                cursor: 'pointer'
              }}
            >
              🎧 POLQA v3
            </button>

            <button
              onClick={() => handleSend('How does Visa PCI-DSS redaction work?')}
              style={{
                fontSize: '0.65rem',
                background: 'rgba(59, 130, 246, 0.15)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                color: '#60a5fa',
                borderRadius: '6px',
                padding: '2px 6px',
                cursor: 'pointer'
              }}
            >
              💳 Visa PCI Redactor
            </button>

            <button
              onClick={() => handleSend('Calculate Erlang C queue staffing')}
              style={{
                fontSize: '0.65rem',
                background: 'rgba(168, 85, 247, 0.15)',
                border: '1px solid rgba(168, 85, 247, 0.3)',
                color: '#c084fc',
                borderRadius: '6px',
                padding: '2px 6px',
                cursor: 'pointer'
              }}
            >
              👥 Erlang C Math
            </button>
          </div>

          {/* Input Bar */}
          <div style={{
            padding: '10px 14px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            background: 'rgba(15, 23, 42, 0.95)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask anything about IVR testing, 103 screens, SIP, or Visa..."
              style={{
                flex: 1,
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '10px',
                padding: '8px 12px',
                color: '#fff',
                fontSize: '0.78rem',
                outline: 'none'
              }}
            />

            <button
              onClick={() => handleSend()}
              disabled={!inputValue.trim() || isLoading}
              style={{
                background: inputValue.trim() && !isLoading
                  ? 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)'
                  : 'rgba(255, 255, 255, 0.05)',
                border: 'none',
                borderRadius: '10px',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                cursor: inputValue.trim() && !isLoading ? 'pointer' : 'default',
                transition: 'all 0.15s ease'
              }}
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
