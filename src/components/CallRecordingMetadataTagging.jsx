import React from 'react';
import { Tag } from 'lucide-react';

export default function CallRecordingMetadataTagging() {
  const tags = [
    { callId: 'call-901', tag: 'VIP Customer', category: 'Priority', assignedBy: 'System Auto-Tag' },
    { callId: 'call-902', tag: 'Billing Dispute', category: 'Intent', assignedBy: 'Gemini AI' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Tag color="#34d399" size={28} /> Call Recording Custom Metadata & Tagging Manager
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Attach custom key-value metadata tags to call recordings for automated filtering.
          </p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.72rem' }}>
              <th style={{ padding: '10px' }}>Call ID</th>
              <th style={{ padding: '10px' }}>Metadata Tag</th>
              <th style={{ padding: '10px' }}>Category</th>
              <th style={{ padding: '10px' }}>Assigned By</th>
            </tr>
          </thead>
          <tbody>
            {tags.map((t, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px 10px', color: '#fff', fontWeight: 700 }}>{t.callId}</td>
                <td style={{ padding: '12px 10px' }}><span className="badge badge-cyan">{t.tag}</span></td>
                <td style={{ padding: '12px 10px', color: '#06b6d4' }}>{t.category}</td>
                <td style={{ padding: '12px 10px', color: 'var(--text-muted)' }}>{t.assignedBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
