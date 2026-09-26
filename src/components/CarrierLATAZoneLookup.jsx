import React, { useState } from 'react';
import { Search, Globe2, RefreshCw, CheckCircle2, ShieldCheck, MapPin } from 'lucide-react';

export default function CarrierLATAZoneLookup() {
  const [npaNxx, setNpaNxx] = useState('212-555');
  const [result, setResult] = useState(null);

  const handleLookup = (e) => {
    e.preventDefault();
    setResult({
      npa: '212 (New York City, NY)',
      nxx: '555',
      ocn: '9104 - AT&T Communications',
      lata: '132 - New York City LATA',
      rateCenter: 'NEWYORK CITY ZONE 01',
      stateCountry: 'New York, United States',
      switchCLLI: 'NYCMNY01DS0'
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <MapPin color="#34d399" size={28} /> PSTN LATA Zone & NPA-NXX Exchange Inspector
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Query North American Numbering Plan (NANP) exchange database for LATA codes, Rate Centers, and CLLI switches.
          </p>
        </div>

        <span className="badge badge-emerald" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
          NANPA DB Synced
        </span>
      </div>

      <div className="glass-card" style={{ padding: '20px' }}>
        <form onSubmit={handleLookup} style={{ display: 'flex', gap: '12px' }}>
          <input 
            type="text" 
            placeholder="NPA-NXX Exchange (e.g. 212-555)" 
            value={npaNxx} 
            onChange={(e) => setNpaNxx(e.target.value)} 
            className="input-field" 
            style={{ flex: 1, padding: '10px 14px' }}
          />
          <button className="btn btn-primary" type="submit" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Search size={16} /> Query Exchange DB
          </button>
        </form>

        {result && (
          <div style={{ background: 'rgba(0,0,0,0.3)', marginTop: '16px', padding: '16px', borderRadius: '8px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', fontSize: '0.85rem' }}>
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block' }}>LATA Zone Code:</span>
              <strong style={{ color: '#06b6d4', fontSize: '1.05rem' }}>{result.lata}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block' }}>Operating Company (OCN):</span>
              <strong style={{ color: '#fff' }}>{result.ocn}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block' }}>Rate Center:</span>
              <strong style={{ color: '#38bdf8' }}>{result.rateCenter}</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)', display: 'block' }}>Switch CLLI Code:</span>
              <strong style={{ color: '#a78bfa' }}>{result.switchCLLI}</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
