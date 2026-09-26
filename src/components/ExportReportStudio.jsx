import React, { useState } from 'react';
import { Download, FileText, FileSpreadsheet, CheckCircle2, RefreshCw, FileCode, Printer, ShieldCheck } from 'lucide-react';

export default function ExportReportStudio() {
  const [reportType, setReportType] = useState('Executive SLA Compliance (PDF)');
  const [dateRange, setDateRange] = useState('Last 30 Days (Sept 2026)');
  const [isExporting, setIsExporting] = useState(false);
  const [downloadLink, setDownloadLink] = useState(null);

  const handleGenerateReport = () => {
    setIsExporting(true);
    setDownloadLink(null);

    setTimeout(() => {
      setDownloadLink({
        fileName: `VoxPulse_Executive_SLA_Report_${Date.now()}.pdf`,
        url: '/api/reports/html',
        fileSize: '2.4 MB',
        generatedAt: new Date().toLocaleString()
      });
      setIsExporting(false);
    }, 900);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Download color="#06b6d4" size={28} /> Enterprise Export & PDF Report Studio
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Generate executive SLA compliance PDF documents, carrier invoice audit CSVs, and complete JSON telemetry exports.
          </p>
        </div>

        <button 
          className="btn btn-primary" 
          onClick={handleGenerateReport} 
          disabled={isExporting}
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          {isExporting ? <RefreshCw className="spin" size={16} /> : <Download size={16} />}
          {isExporting ? 'Generating Report...' : 'Generate Executive PDF'}
        </button>
      </div>

      {/* Options */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
        <div className="glass-card" style={{ padding: '16px' }}>
          <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Report Template
          </label>
          <select 
            value={reportType} 
            onChange={(e) => setReportType(e.target.value)} 
            className="input-field" 
            style={{ width: '100%', marginTop: '8px' }}
          >
            <option value="Executive SLA Compliance (PDF)">Executive SLA Compliance (PDF)</option>
            <option value="Carrier Network Performance (Excel)">Carrier Network Performance (Excel)</option>
            <option value="Full Raw Telemetry (JSON)">Full Raw Telemetry (JSON)</option>
            <option value="PCI & HIPAA Compliance Audit">PCI & HIPAA Compliance Audit</option>
          </select>
        </div>

        <div className="glass-card" style={{ padding: '16px' }}>
          <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Audit Date Window
          </label>
          <select 
            value={dateRange} 
            onChange={(e) => setDateRange(e.target.value)} 
            className="input-field" 
            style={{ width: '100%', marginTop: '8px' }}
          >
            <option value="Last 30 Days (Sept 2026)">Last 30 Days (Sept 2026)</option>
            <option value="Last 7 Days">Last 7 Days</option>
            <option value="Year to Date 2026">Year to Date 2026</option>
          </select>
        </div>

        <div className="glass-card" style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>PDF Branding</div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#38bdf8', marginTop: '4px' }}>
              Custom Enterprise Logo
            </div>
          </div>
          <Printer size={32} color="#06b6d4" style={{ opacity: 0.8 }} />
        </div>
      </div>

      {/* Generated Report Link */}
      {downloadLink ? (
        <div className="glass-card" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span className="badge badge-cyan" style={{ marginBottom: '8px' }}>REPORT GENERATED CLEANLY</span>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>{downloadLink.fileName}</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Size: {downloadLink.fileSize} • Created at {downloadLink.generatedAt}
            </span>
          </div>

          <a 
            href={downloadLink.url} 
            target="_blank" 
            rel="noreferrer"
            className="btn btn-primary"
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px' }}
          >
            <Download size={18} /> Download Executive Report PDF
          </a>
        </div>
      ) : (
        <div className="glass-card" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
          <FileText size={48} color="#06b6d4" style={{ opacity: 0.4, marginBottom: '12px' }} />
          <p>Select report template and click "Generate Executive PDF" to render custom PDF reports.</p>
        </div>
      )}
    </div>
  );
}
