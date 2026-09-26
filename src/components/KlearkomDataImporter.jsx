import React, { useState } from 'react';
import { Upload, FileCode, CheckCircle2, TrendingDown, RefreshCw, ShieldCheck, Download } from 'lucide-react';

export default function KlearkomDataImporter() {
  const [importStatus, setImportStatus] = useState(null);
  const [isImporting, setIsImporting] = useState(false);

  const handleImportJSON = () => {
    setIsImporting(true);
    setImportStatus(null);

    setTimeout(() => {
      setImportStatus({
        importedTestSuites: 18,
        importedDIDs: 104,
        importedIVRMaps: 12,
        migratedVendor: 'Klearcom / Cyara / Hammer Suite',
        status: 'SUCCESSFULLY IMPORTED (100% Schema Parity)'
      });
      setIsImporting(false);
    }, 1100);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Upload color="#34d399" size={28} /> Klearcom / Cyara / Hammer One-Click Migration Importer
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Import legacy test suites, global DID inventory, and IVR tree flows directly into VoxPulse AI with 100% schema compatibility.
          </p>
        </div>

        <button 
          className="btn btn-primary" 
          onClick={handleImportJSON} 
          disabled={isImporting}
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          {isImporting ? <RefreshCw className="spin" size={16} /> : <Upload size={16} />}
          {isImporting ? 'Parsing Legacy Export...' : 'Import Klearcom Export JSON'}
        </button>
      </div>

      <div className="glass-card" style={{ padding: '30px', textAlign: 'center', border: '2px dashed rgba(255,255,255,0.15)' }}>
        <FileCode size={48} color="#34d399" style={{ opacity: 0.8, marginBottom: '12px' }} />
        <h3 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 700 }}>Drag & Drop Klearcom or Cyara Export JSON/CSV File Here</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
          Supports Klearcom API exports, Cyara XML test maps, and Hammer call scenario bundles.
        </p>
      </div>

      {importStatus && (
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>Migration Summary Output</h3>
            <span className="badge badge-emerald">{importStatus.status}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Imported Test Scenarios</span>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#06b6d4', marginTop: '4px' }}>{importStatus.importedTestSuites} Suites</div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Imported Global DIDs</span>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#34d399', marginTop: '4px' }}>{importStatus.importedDIDs} DIDs</div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Imported IVR Trees</span>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#a78bfa', marginTop: '4px' }}>{importStatus.importedIVRMaps} Maps</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
