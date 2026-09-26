import React, { useState, useEffect } from 'react';
import { Swords, Bot, UserCheck, Play, RotateCcw, CheckCircle2, AlertTriangle, MessageSquare, Zap, Mic, Sparkles } from 'lucide-react';

export default function AIAgentCombatArena() {
  const [persona, setPersona] = useState('frustrated-refund');
  const [targetNumber, setTargetNumber] = useState('+1 (800) 555-0199 (Banking IVR)');
  const [isSimulating, setIsSimulating] = useState(false);
  const [turnIndex, setTurnIndex] = useState(0);

  const personas = [
    { id: 'frustrated-refund', name: 'Frustrated Customer (Refund Demand)', emotion: 'Angry', rate: '1.2x', difficulty: 'High' },
    { id: 'non-native-billing', name: 'Non-Native English (Billing Inquiry)', emotion: 'Confused', rate: '0.9x', difficulty: 'Medium' },
    { id: 'spanish-balance', name: 'Spanish Speaker (Balance Check)', emotion: 'Neutral', rate: '1.0x', difficulty: 'Medium' },
    { id: 'fast-talker', name: 'Fast Talker (Repeated Agent Override)', emotion: 'Impatient', rate: '1.5x', difficulty: 'Extreme' },
  ];

  const sampleConversations = {
    'frustrated-refund': [
      { speaker: 'IVR', text: 'Thank you for calling Apex Bank. For account balances press 1, for billing press 2, or state your reason for calling.', latency: '120ms', intent: 'GREETING' },
      { speaker: 'AI Caller (Gemini)', text: 'I need a refund immediately! I was charged $45 twice on my card yesterday and nobody is helping me!', emotion: 'Angry', intent: 'CLAIM_REFUND' },
      { speaker: 'IVR', text: 'I understand you are asking about a recent charge refund. Can you please state or speak your 16-digit debit card number?', latency: '340ms', intent: 'COLLECT_CARD' },
      { speaker: 'AI Caller (Gemini)', text: 'No, I don\'t want to give my card to a robot! Transfer me to a live supervisor right now!', emotion: 'Demanding', intent: 'AGENT_TRANSFER' },
      { speaker: 'IVR', text: 'Connecting you to a supervisor. Current estimated wait time is 2 minutes. Please stay on the line.', latency: '210ms', intent: 'ROUTED_HUMAN' }
    ],
    'non-native-billing': [
      { speaker: 'IVR', text: 'Welcome to TeleCloud Mobile support. Please tell me how I can help you today.', latency: '150ms', intent: 'GREETING' },
      { speaker: 'AI Caller (Gemini)', text: 'Hello yes, my bill is very high this month... why $120? Last month was only $60.', emotion: 'Confused', intent: 'QUERY_BILL' },
      { speaker: 'IVR', text: 'Let me look up your invoice breakdown. Did you travel internationally or add extra data roaming?', latency: '420ms', intent: 'DIAGNOSE_OVERAGE' },
      { speaker: 'AI Caller (Gemini)', text: 'No travel, just normal home use. Can you check line ending in 4092?', emotion: 'Polite', intent: 'PROVIDE_LINE_NUM' },
      { speaker: 'IVR', text: 'Thank you. I see a one-time activation fee of $60 on line 4092. I have credited this back to your account balance.', latency: '310ms', intent: 'RESOLVED_CREDIT' }
    ]
  };

  const currentTranscript = sampleConversations[persona] || sampleConversations['frustrated-refund'];

  useEffect(() => {
    let timer;
    if (isSimulating && turnIndex < currentTranscript.length) {
      timer = setTimeout(() => {
        setTurnIndex(prev => prev + 1);
      }, 1600);
    } else if (turnIndex >= currentTranscript.length) {
      setIsSimulating(false);
    }
    return () => clearTimeout(timer);
  }, [isSimulating, turnIndex, currentTranscript]);

  const handleStartCombat = () => {
    setTurnIndex(0);
    setIsSimulating(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Swords color="#f43f5e" size={28} /> AI Agent Combat Arena (Bot vs IVR Simulator)
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Unleash Gemini 2.0 autonomous AI caller personas against IVR speech trees to benchmark dialog accuracy, turn latency, and fallback paths.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            className="btn btn-secondary" 
            onClick={() => { setTurnIndex(0); setIsSimulating(false); }}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <RotateCcw size={16} /> Reset State
          </button>
          <button 
            className={`btn ${isSimulating ? 'btn-danger' : 'btn-primary'}`} 
            onClick={handleStartCombat}
            disabled={isSimulating}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            {isSimulating ? <Zap className="spin" size={16} /> : <Play size={16} />}
            {isSimulating ? 'Call in Progress...' : 'Launch Combat Simulation'}
          </button>
        </div>
      </div>

      {/* Top Config Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
        {/* Persona Chooser */}
        <div className="glass-card" style={{ padding: '16px' }}>
          <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Select AI Caller Persona
          </label>
          <select 
            value={persona} 
            onChange={(e) => { setPersona(e.target.value); setTurnIndex(0); }} 
            className="input-field" 
            style={{ width: '100%', marginTop: '8px' }}
          >
            {personas.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        {/* Target IVR Phone Line */}
        <div className="glass-card" style={{ padding: '16px' }}>
          <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Target Telephony IVR Endpoint
          </label>
          <input 
            type="text" 
            value={targetNumber} 
            onChange={(e) => setTargetNumber(e.target.value)} 
            className="input-field" 
            style={{ width: '100%', marginTop: '8px' }}
          />
        </div>

        {/* Simulation Stats */}
        <div className="glass-card" style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Combat Result</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: turnIndex >= currentTranscript.length ? '#34d399' : '#38bdf8', marginTop: '4px' }}>
              {turnIndex >= currentTranscript.length ? 'PASSED (Escalated)' : isSimulating ? 'Executing Turn ' + turnIndex : 'Ready'}
            </div>
          </div>
          <Bot size={36} color="#6366f1" style={{ opacity: 0.8 }} />
        </div>
      </div>

      {/* Transcript & Turn-by-Turn Visualizer */}
      <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MessageSquare size={18} color="#06b6d4" /> Dynamic Dialogue Turn Execution
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '420px', overflowY: 'auto', paddingRight: '8px' }}>
          {currentTranscript.slice(0, isSimulating || turnIndex > 0 ? turnIndex + 1 : currentTranscript.length).map((turn, i) => {
            const isIVR = turn.speaker === 'IVR';
            return (
              <div 
                key={i} 
                style={{
                  display: 'flex',
                  gap: '14px',
                  alignSelf: isIVR ? 'flex-start' : 'flex-end',
                  maxWidth: '82%',
                  flexDirection: isIVR ? 'row' : 'row-reverse'
                }}
              >
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: isIVR ? 'linear-gradient(135deg, #6366f1, #06b6d4)' : 'linear-gradient(135deg, #f43f5e, #e11d48)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {isIVR ? <Bot size={18} color="#fff" /> : <Mic size={18} color="#fff" />}
                </div>

                <div style={{
                  background: isIVR ? 'rgba(30, 41, 59, 0.9)' : 'rgba(15, 23, 42, 0.95)',
                  border: isIVR ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid rgba(244, 63, 94, 0.4)',
                  borderRadius: '12px',
                  padding: '14px 18px',
                  fontSize: '0.88rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', gap: '16px' }}>
                    <span style={{ fontWeight: 700, color: isIVR ? '#818cf8' : '#fb7185', fontSize: '0.8rem' }}>
                      {turn.speaker}
                    </span>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                      {isIVR ? `TTFT: ${turn.latency}` : `Intent: ${turn.intent}`}
                    </span>
                  </div>
                  <p style={{ color: '#e2e8f0', margin: 0, lineHeight: 1.4 }}>
                    "{turn.text}"
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
