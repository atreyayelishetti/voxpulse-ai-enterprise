import React from 'react';
import { Globe2, Sparkles } from 'lucide-react';

export default function IVRMultilingualAutoDetect() {
  const detections = [
    { callId: 'call-901', spokenGreeting: '"Hola, quiero consultar el saldo de mi cuenta"', detectedLang: 'Spanish (es-ES)', confidence: '99.4%', status: 'ROUTED TO SPANISH IVR' },
    { callId: 'call-902', spokenGreeting: '"Bonjour, je voudrais vérifier mon solde"', detectedLang: 'French (fr-FR)', confidence: '98.9%', status: 'ROUTED TO FRENCH IVR' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Globe2 color="#06b6d4" size={28} /> Spoken Language Auto-Detection & Dynamic IVR Routing Engine
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Automatically detect caller language in real-time and dynamically switch IVR prompt languages.
          </p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.72rem' }}>
              <th style={{ padding: '10px' }}>Call ID</th>
              <th style={{ padding: '10px' }}>Caller Spoken Greeting</th>
              <th style={{ padding: '10px' }}>Detected Language</th>
              <th style={{ padding: '10px' }}>NLU Confidence</th>
              <th style={{ padding: '10px' }}>Routing Outcome</th>
            </tr>
          </thead>
          <tbody>
            {detections.map((d, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px 10px', color: '#fff', fontWeight: 700 }}>{d.callId}</td>
                <td style={{ padding: '12px 10px', color: 'var(--text-muted)', fontStyle: 'italic' }}>{d.spokenGreeting}</td>
                <td style={{ padding: '12px 10px', color: '#06b6d4', fontWeight: 700 }}>{d.detectedLang}</td>
                <td style={{ padding: '12px 10px', color: '#34d399', fontWeight: 700 }}>{d.confidence}</td>
                <td style={{ padding: '12px 10px' }}><span className="badge badge-emerald">{d.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
