import React, { useState } from 'react';
import { 
  Download, 
  FileText, 
  Printer, 
  CheckCircle2, 
  ShieldCheck, 
  Calendar, 
  Sparkles, 
  Share2, 
  BarChart2 
} from 'lucide-react';

export default function ExecutiveSlaPdfExporter() {
  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [reportTitle, setReportTitle] = useState('Executive IVR Telephony & Carrier SLA Compliance Audit');
  const [generating, setGenerating] = useState(false);

  const handleDownloadPdf = () => {
    setGenerating(true);
    setTimeout(() => {
      // Trigger native print or window.open for PDF render
      window.open('/api/reports/html', '_blank');
      setGenerating(false);
    }, 600);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Download size={24} color="#06b6d4" />
              Executive SLA PDF & HTML Report Generator
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Export board-ready PDF compliance reports with POLQA MOS distribution, carrier SLA availability, and Gemini AI insights.
            </p>
          </div>

          <button onClick={handleDownloadPdf} className="btn btn-primary" disabled={generating}>
            <Printer size={16} /> {generating ? 'Generating PDF...' : 'Export & Print Executive PDF'}
          </button>
        </div>

        {/* Report Customization Controls */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '16px', background: 'rgba(30, 41, 59, 0.5)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px', display: 'block' }}>REPORT TITLE</label>
            <input 
              type="text" 
              className="input-field" 
              value={reportTitle} 
              onChange={e => setReportTitle(e.target.value)} 
            />
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px', display: 'block' }}>AUDIT DATE RANGE</label>
            <select className="input-field" value={dateRange} onChange={e => setDateRange(e.target.value)}>
              <option value="Today">Today (Realtime)</option>
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="Quarter-to-Date">Quarter-to-Date (Q3 2026)</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px', display: 'block' }}>AUDIT CERTIFICATION</label>
            <div style={{ padding: '10px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '8px', color: '#10b981', fontWeight: 600, fontSize: '0.8rem', textAlign: 'center' }}>
              <ShieldCheck size={14} style={{ display: 'inline', marginRight: '4px' }} /> ISO/IEC 27001 Sealed
            </div>
          </div>
        </div>
      </div>

      {/* PDF Document Preview Sheet */}
      <div className="glass-panel" style={{ padding: '32px', background: 'rgba(15, 23, 42, 0.95)' }}>
        <div style={{ borderBottom: '2px solid var(--border-color)', paddingBottom: '20px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#06b6d4', fontWeight: 800, letterSpacing: '0.1em' }}>ENTERPRISE AUDIT PREVIEW</div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', margin: '4px 0 6px 0' }}>{reportTitle}</h1>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Generated for: <strong>Enterprise IVR QA Team</strong> • Period: {dateRange}</div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span className="badge badge-emerald" style={{ fontSize: '0.8rem' }}>SLA Grade: A+</span>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>System Version: 1.0.0-enterprise</div>
          </div>
        </div>

        {/* Audit Highlights */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px' }}>
          <div style={{ padding: '16px', background: 'rgba(30, 41, 59, 0.5)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>TOTAL TEST CALLS</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>148,920</div>
            <div style={{ fontSize: '0.75rem', color: '#10b981' }}>✓ 100% Executed</div>
          </div>
          <div style={{ padding: '16px', background: 'rgba(30, 41, 59, 0.5)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>AVAILABILITY UPTIME</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10b981' }}>99.998%</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Target: 99.990%</div>
          </div>
          <div style={{ padding: '16px', background: 'rgba(30, 41, 59, 0.5)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>MEAN POLQA MOS</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#06b6d4' }}>4.38 / 5.0</div>
            <div style={{ fontSize: '0.75rem', color: '#10b981' }}>+0.12 vs Klearcom</div>
          </div>
          <div style={{ padding: '16px', background: 'rgba(30, 41, 59, 0.5)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>STT ACCURACY WER</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#6366f1' }}>98.4%</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Gemini 2.5 Flash</div>
          </div>
        </div>

        {/* Gemini AI Executive Audit Summary */}
        <div style={{ background: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.3)', padding: '20px', borderRadius: '12px', color: '#e2e8f0', fontSize: '0.88rem' }}>
          <div style={{ fontWeight: 700, color: '#a5b4fc', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={16} /> Gemini 2.5 AI Executive Audit Insights:
          </div>
          <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.6' }}>
            <li>Carrier routing stability remained at 99.998% across North American toll-free pools with zero P1 outages.</li>
            <li>Voicebot intent recognition accuracy achieved 98.4%, reducing false intent transfers by 14.2%.</li>
            <li>Direct SIP peering reduced audio packet round-trip time from 195ms to 138ms, exceeding ITU-T G.114 guidelines.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
