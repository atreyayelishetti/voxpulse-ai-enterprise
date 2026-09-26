import React, { useState } from 'react';
import { FolderTree, Users, Globe2, Plus, CheckCircle2, ShieldCheck, Building } from 'lucide-react';

export default function MultiTenantWorkspaceManager() {
  const [workspaces, setWorkspaces] = useState([
    { id: 'ws-1', name: 'North America Banking QA', region: 'US-East', activeDIDs: 45, maxCalls: 500, status: 'ACTIVE' },
    { id: 'ws-2', name: 'EMEA Healthcare Operations', region: 'EU-Central (Frankfurt)', activeDIDs: 28, maxCalls: 250, status: 'ACTIVE' },
    { id: 'ws-3', name: 'APAC Retail Telecom', region: 'APAC (Sydney)', activeDIDs: 12, maxCalls: 100, status: 'ACTIVE' }
  ]);
  const [newWsName, setNewWsName] = useState('');
  const [newRegion, setNewRegion] = useState('US-East');

  const handleAddWorkspace = (e) => {
    e.preventDefault();
    if (!newWsName.trim()) return;
    setWorkspaces([
      ...workspaces,
      { id: `ws-${Date.now()}`, name: newWsName.trim(), region: newRegion, activeDIDs: 1, maxCalls: 50, status: 'ACTIVE' }
    ]);
    setNewWsName('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Building color="#a78bfa" size={28} /> Multi-Tenant Workspace & Quotas Manager
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Provision isolated tenant workspaces, allocate global DID pools, and manage concurrent call load quotas.
          </p>
        </div>

        <span className="badge badge-emerald" style={{ padding: '6px 12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ShieldCheck size={14} /> 3 Active Workspaces
        </span>
      </div>

      {/* Add Workspace Form */}
      <div className="glass-card" style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={18} color="#06b6d4" /> Provision New Organization Workspace
        </h3>
        <form onSubmit={handleAddWorkspace} style={{ display: 'flex', gap: '12px' }}>
          <input 
            type="text" 
            placeholder="Workspace Name (e.g. LATAM Telecom Ops)" 
            value={newWsName} 
            onChange={(e) => setNewWsName(e.target.value)} 
            className="input-field" 
            style={{ flex: 1, padding: '10px 14px' }}
          />
          <select 
            value={newRegion} 
            onChange={(e) => setNewRegion(e.target.value)} 
            className="input-field" 
            style={{ width: '220px' }}
          >
            <option value="US-East">US-East (Virginia)</option>
            <option value="EU-Central (Frankfurt)">EU-Central (Frankfurt)</option>
            <option value="APAC (Sydney)">APAC (Sydney)</option>
            <option value="SA-East (São Paulo)">SA-East (São Paulo)</option>
          </select>
          <button className="btn btn-primary" type="submit" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Plus size={16} /> Create Workspace
          </button>
        </form>
      </div>

      {/* Workspaces Table */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
          Tenant Organization Workspaces
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.72rem' }}>
                <th style={{ padding: '10px' }}>Workspace Name</th>
                <th style={{ padding: '10px' }}>Primary Region</th>
                <th style={{ padding: '10px' }}>Assigned DIDs</th>
                <th style={{ padding: '10px' }}>Concurrent Call Limit</th>
                <th style={{ padding: '10px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {workspaces.map((ws) => (
                <tr key={ws.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '12px 10px', fontWeight: 700, color: '#fff' }}>{ws.name}</td>
                  <td style={{ padding: '12px 10px', color: '#06b6d4' }}>{ws.region}</td>
                  <td style={{ padding: '12px 10px', color: '#38bdf8', fontWeight: 600 }}>{ws.activeDIDs} DIDs</td>
                  <td style={{ padding: '12px 10px', color: '#a78bfa', fontWeight: 600 }}>{ws.maxCalls} Calls / sec</td>
                  <td style={{ padding: '12px 10px' }}>
                    <span className="badge badge-emerald">{ws.status}</span>
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
