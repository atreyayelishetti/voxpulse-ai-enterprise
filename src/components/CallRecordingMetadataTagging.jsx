import React, { useState } from 'react';
import { Tag, Plus, CheckCircle2, Search, FileText, Trash2 } from 'lucide-react';

export default function CallRecordingMetadataTagging() {
  const [recordings, setRecordings] = useState([
    { id: 'rec_9941a8', caller: '+12125550100', target: '+18005550199', campaign: 'Q3_CARD_ACTIVATION', agent: 'agent_sarah_102', tags: ['VIP_TIER', 'PCI_PASS', 'POLQA_4.42'], retention: '90_DAYS' },
    { id: 'rec_9941a9', caller: '+14155550188', target: '+18005550199', campaign: 'MORTGAGE_INQUIRY', agent: 'agent_david_204', tags: ['ESCALATED', 'SPANISH_LANGUAGE'], retention: '365_DAYS' }
  ]);

  const [newTag, setNewTag] = useState('');
  const [selectedRecId, setSelectedRecId] = useState('rec_9941a8');

  const handleAddTag = (e) => {
    e.preventDefault();
    if (!newTag) return;
    setRecordings(recordings.map(r => r.id === selectedRecId ? { ...r, tags: [...r.tags, newTag.toUpperCase()] } : r));
    setNewTag('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Tag color="#06b6d4" size={28} /> Call Recording Enterprise Metadata Indexer & Tagging Studio
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Multi-dimensional acoustic metadata catalog. Enriches test recordings with campaign tags, agent IDs, and compliance retention windows.
          </p>
        </div>
      </div>

      {/* Add Tag Form */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
          Assign Custom Metadata Tag
        </h3>
        <form onSubmit={handleAddTag} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr auto', gap: '16px', alignItems: 'flex-end' }}>
          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Target Recording</label>
            <select 
              value={selectedRecId}
              onChange={(e) => setSelectedRecId(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', background: 'rgba(0,0,0,0.4)', color: '#fff', border: '1px solid var(--border-color)', borderRadius: '6px' }}
            >
              {recordings.map(r => (
                <option key={r.id} value={r.id}>{r.id} ({r.caller})</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>New Tag Value</label>
            <input 
              type="text" 
              placeholder="e.g. HIGH_CHURN_RISK, LATENCY_SPIKE, FRAUD_SUSPECT"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', background: 'rgba(0,0,0,0.4)', color: '#fff', border: '1px solid var(--border-color)', borderRadius: '6px' }}
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-primary"
            style={{ height: '42px', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Plus size={16} /> Attach Tag
          </button>
        </form>
      </div>

      {/* Recordings Catalog Table */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
          Indexed Call Recording Archive
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', textAlign: 'left' }}>
                <th style={{ padding: '10px' }}>Recording ID</th>
                <th style={{ padding: '10px' }}>Endpoints (ANI ➔ DNIS)</th>
                <th style={{ padding: '10px' }}>Campaign</th>
                <th style={{ padding: '10px' }}>Agent ID</th>
                <th style={{ padding: '10px' }}>Metadata Tags</th>
                <th style={{ padding: '10px' }}>Retention Window</th>
              </tr>
            </thead>
            <tbody>
              {recordings.map((r) => (
                <tr key={r.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 10px', fontWeight: 700, color: '#fff', fontFamily: 'monospace' }}>{r.id}</td>
                  <td style={{ padding: '12px 10px', color: '#06b6d4' }}>{r.caller} ➔ {r.target}</td>
                  <td style={{ padding: '12px 10px', color: '#cbd5e1' }}>{r.campaign}</td>
                  <td style={{ padding: '12px 10px', color: '#38bdf8' }}>{r.agent}</td>
                  <td style={{ padding: '12px 10px' }}>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {r.tags.map((t, i) => (
                        <span key={i} className="badge badge-purple" style={{ fontSize: '0.72rem' }}>{t}</span>
                      ))}
                    </div>
                  </td>
                  <td style={{ padding: '12px 10px', color: '#10b981', fontWeight: 600 }}>{r.retention}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
