import React, { useState } from 'react';
import { 
  GitFork, 
  Plus, 
  Play, 
  Save, 
  Sparkles, 
  Hash, 
  Volume2, 
  CheckCircle2, 
  ArrowRight,
  Layers,
  PhoneCall,
  Sliders
} from 'lucide-react';

const DEFAULT_NODES = [
  { id: 'n1', type: 'DIAL', title: '1. Dial Target Number', subtitle: '+1 (800) 555-0100', color: '#6366f1' },
  { id: 'n2', type: 'EXPECT_PROMPT', title: '2. Gemini Prompt Verify', subtitle: 'Pattern: "Welcome to Acme"', color: '#06b6d4' },
  { id: 'n3', type: 'DTMF', title: '3. Transmit DTMF Key 1', subtitle: '697Hz / 1209Hz Tone', color: '#8b5cf6' },
  { id: 'n4', type: 'EXPECT_PROMPT', title: '4. Verify PIN Prompt', subtitle: 'Pattern: "Enter 4-Digit PIN"', color: '#06b6d4' },
  { id: 'n5', type: 'DTMF', title: '5. Transmit Security PIN', subtitle: 'Key: 1234#', color: '#8b5cf6' },
  { id: 'n6', type: 'ASSERT', title: '6. Assert Queue Handoff', subtitle: 'Queue: balance_auth_v2', color: '#10b981' }
];

export default function VisualCanvasBuilder({ onRunTest }) {
  const [nodes, setNodes] = useState(DEFAULT_NODES);
  const [flowName, setFlowName] = useState('Enterprise Banking IVR Journey');
  const [selectedNode, setSelectedNode] = useState(null);

  const addNode = (type) => {
    const newNode = {
      id: `n_${Date.now()}`,
      type,
      title: type === 'DTMF' ? 'Send DTMF Key' : type === 'EXPECT_PROMPT' ? 'Gemini Prompt Check' : 'Assert Queue Route',
      subtitle: type === 'DTMF' ? 'Key: 1' : 'Verify Audio Intent',
      color: type === 'DTMF' ? '#8b5cf6' : type === 'EXPECT_PROMPT' ? '#06b6d4' : '#10b981'
    };
    setNodes([...nodes, newNode]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Banner */}
      <div className="glass-panel glass-panel-glow" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <GitFork size={24} color="#8b5cf6" />
              No-Code Visual IVR Journey Canvas
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Drag, drop, and configure IVR call flow nodes with conditional branching and Gemini AI intent validation.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={() => onRunTest({ name: flowName, steps: [] })} className="btn btn-emerald">
              <Play size={18} /> Run Canvas Flow
            </button>
          </div>
        </div>
      </div>

      {/* Canvas Workspace */}
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr 300px', gap: '20px', minHeight: '520px' }}>
        {/* Left Palette */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff', marginBottom: '14px' }}>Node Palette</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button onClick={() => addNode('EXPECT_PROMPT')} className="btn btn-secondary" style={{ justifyContent: 'flex-start', fontSize: '0.82rem' }}>
              <Sparkles size={16} color="#06b6d4" /> + Gemini Prompt Check
            </button>

            <button onClick={() => addNode('DTMF')} className="btn btn-secondary" style={{ justifyContent: 'flex-start', fontSize: '0.82rem' }}>
              <Hash size={16} color="#8b5cf6" /> + Send DTMF Tone
            </button>

            <button onClick={() => addNode('ASSERT')} className="btn btn-secondary" style={{ justifyContent: 'flex-start', fontSize: '0.82rem' }}>
              <CheckCircle2 size={16} color="#10b981" /> + Assert Queue Route
            </button>
          </div>
        </div>

        {/* Middle Node Flow View */}
        <div className="glass-panel" style={{ padding: '24px', background: '#080d1a', position: 'relative', overflowY: 'auto' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '16px' }}>
            VISUAL FLOW DIAGRAM
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            {nodes.map((node, index) => (
              <React.Fragment key={node.id}>
                <div 
                  onClick={() => setSelectedNode(node)}
                  style={{
                    width: '320px',
                    padding: '16px',
                    borderRadius: '12px',
                    background: selectedNode?.id === node.id ? 'rgba(99, 102, 241, 0.25)' : 'rgba(31, 41, 55, 0.7)',
                    border: `1.5px solid ${node.color}`,
                    boxShadow: selectedNode?.id === node.id ? '0 0 15px rgba(99, 102, 241, 0.4)' : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: node.color, textTransform: 'uppercase', marginBottom: '4px' }}>
                    {node.type}
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>
                    {node.title}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {node.subtitle}
                  </div>
                </div>

                {index < nodes.length - 1 && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#6366f1' }}>
                    <ArrowRight size={20} style={{ transform: 'rotate(90deg)' }} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Right Inspector */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff', marginBottom: '14px' }}>Node Inspector</h3>

          {selectedNode ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>NODE TITLE</label>
                <input type="text" className="input-field" value={selectedNode.title} onChange={e => {
                  const updated = nodes.map(n => n.id === selectedNode.id ? { ...n, title: e.target.value } : n);
                  setNodes(updated);
                  setSelectedNode({ ...selectedNode, title: e.target.value });
                }} />
              </div>

              <div>
                <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>SUBTITLE / VALUE</label>
                <input type="text" className="input-field" value={selectedNode.subtitle} onChange={e => {
                  const updated = nodes.map(n => n.id === selectedNode.id ? { ...n, subtitle: e.target.value } : n);
                  setNodes(updated);
                  setSelectedNode({ ...selectedNode, subtitle: e.target.value });
                }} />
              </div>
            </div>
          ) : (
            <div style={{ color: 'var(--text-dim)', fontSize: '0.82rem', textAlign: 'center', padding: '30px 0' }}>
              Click any node in the flow canvas to inspect and modify settings.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
