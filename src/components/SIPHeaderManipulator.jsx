import React, { useState } from 'react';
import { Server, Plus, Trash2, CheckCircle2, Send, Code } from 'lucide-react';

export default function SIPHeaderManipulator() {
  const [headers, setHeaders] = useState([
    { key: 'P-Asserted-Identity', value: '<sip:+18005550199@voxpulse.io>' },
    { key: 'Diversion', value: '<sip:+12125550144@voxpulse.io>;reason=deflection' },
    { key: 'X-VoxPulse-Test-ID', value: 'suite_90184_prod' }
  ]);
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');

  const handleAddHeader = (e) => {
    e.preventDefault();
    if (!newKey.trim()) return;
    setHeaders([...headers, { key: newKey.trim(), value: newValue.trim() }]);
    setNewKey('');
    setNewValue('');
  };

  const handleDelete = (index) => {
    setHeaders(headers.filter((_, i) => i !== index));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Code color="#a78bfa" size={28} /> Custom SIP Header Injector & PBX Protocol Sandbox
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Inject custom P-Asserted-Identity, Diversion, and custom SIP headers into outbound INVITE requests.
          </p>
        </div>

        <span className="badge badge-emerald" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
          SIP Engine Active
        </span>
      </div>

      <div className="glass-card" style={{ padding: '20px' }}>
        <form onSubmit={handleAddHeader} style={{ display: 'flex', gap: '12px' }}>
          <input 
            type="text" 
            placeholder="Header Name (e.g. X-Custom-ID)" 
            value={newKey} 
            onChange={(e) => setNewKey(e.target.value)} 
            className="input-field" 
            style={{ width: '240px' }}
          />
          <input 
            type="text" 
            placeholder="Header Value" 
            value={newValue} 
            onChange={(e) => setNewValue(e.target.value)} 
            className="input-field" 
            style={{ flex: 1 }}
          />
          <button className="btn btn-primary" type="submit" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Plus size={16} /> Add SIP Header
          </button>
        </form>
      </div>

      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
          Configured SIP INVITE Header Overrides
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.72rem' }}>
                <th style={{ padding: '10px' }}>SIP Header Name</th>
                <th style={{ padding: '10px' }}>Header Value</th>
                <th style={{ padding: '10px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {headers.map((h, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '12px 10px', fontWeight: 700, color: '#06b6d4' }}>{h.key}</td>
                  <td style={{ padding: '12px 10px', color: '#fff', fontFamily: 'monospace' }}>{h.value}</td>
                  <td style={{ padding: '12px 10px' }}>
                    <button onClick={() => handleDelete(i)} style={{ background: 'transparent', border: 'none', color: '#f43f5e', cursor: 'pointer' }}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
