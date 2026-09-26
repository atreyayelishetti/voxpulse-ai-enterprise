import React, { useState } from 'react';
import { BarChart2, Sparkles, Activity, CheckCircle2, Search } from 'lucide-react';

export default function STTConfusionMatrix() {
  const confusionData = [
    { targetPhoneme: 'Four [fɔːr]', misheardAs: 'For [fər]', occurrenceCount: 42, errorRate: '1.2%', acousticSimilarity: '94%' },
    { targetPhoneme: 'B [biː]', misheardAs: 'D [diː]', occurrenceCount: 28, errorRate: '0.8%', acousticSimilarity: '91%' },
    { targetPhoneme: 'Nine [naɪn]', misheardAs: 'Five [faɪv]', occurrenceCount: 14, errorRate: '0.4%', acousticSimilarity: '86%' },
    { targetPhoneme: 'Two [tuː]', misheardAs: 'To [tuː]', occurrenceCount: 52, errorRate: '1.5%', acousticSimilarity: '99%' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <BarChart2 color="#a78bfa" size={28} /> Speech Phoneme Confusion Matrix Visualizer
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Pinpoint exact phonetic ambiguity in caller speech input to tune STT acoustic grammar models.
          </p>
        </div>

        <span className="badge badge-indigo" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
          Gemini 2.0 Acoustic Parser Active
        </span>
      </div>

      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
          Top Phonetic Confusion Pairings
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.72rem' }}>
                <th style={{ padding: '10px' }}>Target Spoken Phoneme</th>
                <th style={{ padding: '10px' }}>Misheard Output</th>
                <th style={{ padding: '10px' }}>Occurrences</th>
                <th style={{ padding: '10px' }}>Impact Error Rate</th>
                <th style={{ padding: '10px' }}>Acoustic Similarity</th>
              </tr>
            </thead>
            <tbody>
              {confusionData.map((row, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '12px 10px', fontWeight: 700, color: '#fff' }}>{row.targetPhoneme}</td>
                  <td style={{ padding: '12px 10px', color: '#f43f5e', fontWeight: 600 }}>{row.misheardAs}</td>
                  <td style={{ padding: '12px 10px', color: '#06b6d4' }}>{row.occurrenceCount} Times</td>
                  <td style={{ padding: '12px 10px', color: '#38bdf8' }}>{row.errorRate}</td>
                  <td style={{ padding: '12px 10px', color: '#34d399', fontWeight: 600 }}>{row.acousticSimilarity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
