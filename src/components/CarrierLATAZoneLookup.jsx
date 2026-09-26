import React, { useState } from 'react';
import { 
  Search, 
  Globe2, 
  RefreshCw, 
  CheckCircle2, 
  ShieldCheck, 
  MapPin,
  Building2,
  Server,
  Zap,
  PhoneCall,
  Download
} from 'lucide-react';

const NANP_EXCHANGE_DB = {
  '212-555': { npa: '212', nxx: '555', lata: '132 - New York City LATA', ocn: '9104 (AT&T Communications)', type: 'ILEC', rateCenter: 'NEWYORK CITY ZONE 01', state: 'New York, US', clli: 'NYCMNY01DS0', switchType: 'Lucent 5ESS', intraLataRate: '$0.0028/min', lrn: '212-555-0001' },
  '415-555': { npa: '415', nxx: '555', lata: '722 - San Francisco LATA', ocn: '9740 (Pacific Bell / AT&T)', type: 'ILEC', rateCenter: 'SAN FRANCISCO', state: 'California, US', clli: 'SNFCCA01DS0', switchType: 'Nortel DMS-100', intraLataRate: '$0.0031/min', lrn: '415-555-0001' },
  '312-555': { npa: '312', nxx: '555', lata: '358 - Chicago LATA', ocn: '9321 (Illinois Bell / Ameritech)', type: 'ILEC', rateCenter: 'CHICAGO ZONE 01', state: 'Illinois, US', clli: 'CHCGIL01DS0', switchType: 'Ribbon C20 Softswitch', intraLataRate: '$0.0025/min', lrn: '312-555-0001' },
  '214-555': { npa: '214', nxx: '555', lata: '552 - Dallas LATA', ocn: '9533 (Southwestern Bell)', type: 'ILEC', rateCenter: 'DALLAS', state: 'Texas, US', clli: 'DLLSTX01DS0', switchType: 'Lucent 5ESS', intraLataRate: '$0.0024/min', lrn: '214-555-0001' },
  '305-555': { npa: '305', nxx: '555', lata: '460 - Miami LATA', ocn: '9417 (BellSouth)', type: 'ILEC', rateCenter: 'MIAMI', state: 'Florida, US', clli: 'MIAMFL01DS0', switchType: 'Nortel DMS-100', intraLataRate: '$0.0029/min', lrn: '305-555-0001' },
  '206-555': { npa: '206', nxx: '555', lata: '674 - Seattle LATA', ocn: '9636 (Qwest / CenturyLink)', type: 'ILEC', rateCenter: 'SEATTLE', state: 'Washington, US', clli: 'STTLWA01DS0', switchType: 'Metaswitch VP3510', intraLataRate: '$0.0027/min', lrn: '206-555-0001' },
  '416-555': { npa: '416', nxx: '555', lata: '888 - Toronto Zone', ocn: '8090 (Bell Canada)', type: 'ILEC', rateCenter: 'TORONTO', state: 'Ontario, Canada', clli: 'TRNTCA01DS0', switchType: 'Nortel DMS-250', intraLataRate: '$0.0042/min', lrn: '416-555-0001' }
};

export default function CarrierLATAZoneLookup() {
  const [npaNxx, setNpaNxx] = useState('212-555');
  const [result, setResult] = useState(NANP_EXCHANGE_DB['212-555']);
  const [isSearching, setIsSearching] = useState(false);

  const handleLookup = (exchangeKey) => {
    setIsSearching(true);
    setTimeout(() => {
      const cleanKey = (exchangeKey || npaNxx).trim().replace(/[^\d]/g, '');
      const formatted = cleanKey.length >= 6 ? `${cleanKey.slice(0,3)}-${cleanKey.slice(3,6)}` : npaNxx;
      
      const found = NANP_EXCHANGE_DB[formatted] || {
        npa: formatted.split('-')[0] || 'Unknown',
        nxx: formatted.split('-')[1] || 'Unknown',
        lata: 'Generic LATA (NANPA Zone)',
        ocn: '9999 (National CLEC / Wireline)',
        type: 'CLEC',
        rateCenter: 'METROPOLITAN EXCHANGE',
        state: 'United States',
        clli: 'GENRIC01DS0',
        switchType: 'SIP Softswitch Tandem',
        intraLataRate: '$0.0035/min',
        lrn: `${formatted}-0000`
      };
      setResult(found);
      setIsSearching(false);
    }, 250);
  };

  const handlePreset = (preset) => {
    setNpaNxx(preset);
    handleLookup(preset);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="glass-panel glass-panel-glow" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <MapPin color="#34d399" size={24} /> PSTN LATA Zone & NPA-NXX Exchange Inspector
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
              Query North American Numbering Plan (NANP) exchange database for LATA codes, OCN carrier identities, and CLLI switches.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <span className="badge badge-emerald" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
              NANPA Database Synced
            </span>
          </div>
        </div>

        {/* Search Bar & Quick Picks */}
        <div style={{ marginTop: '20px' }}>
          <form onSubmit={(e) => { e.preventDefault(); handleLookup(); }} style={{ display: 'flex', gap: '12px' }}>
            <input 
              type="text" 
              placeholder="Enter NPA-NXX Exchange (e.g. 212-555 or 415-555)" 
              value={npaNxx} 
              onChange={(e) => setNpaNxx(e.target.value)} 
              className="input-field" 
              style={{ flex: 1, padding: '10px 14px', fontSize: '0.95rem' }}
            />
            <button className="btn btn-primary" type="submit" disabled={isSearching} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Search size={16} /> {isSearching ? 'Querying...' : 'Query Exchange DB'}
            </button>
          </form>

          {/* Preset Buttons */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Quick Metro Exchanges:</span>
            {['212-555 (NYC)', '415-555 (SF)', '312-555 (CHI)', '214-555 (DFW)', '305-555 (MIA)', '416-555 (TOR)'].map(p => {
              const code = p.split(' ')[0];
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => handlePreset(code)}
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#38bdf8',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '0.72rem',
                    cursor: 'pointer'
                  }}
                >
                  {p}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lookup Result Detail Cards */}
      {result && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#34d399', fontWeight: 800, textTransform: 'uppercase' }}>EXCHANGE RECORD</span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>
                  {result.npa}-{result.nxx} • {result.rateCenter}, {result.state}
                </h3>
              </div>
              <span className="badge badge-cyan" style={{ fontSize: '0.8rem', padding: '6px 12px' }}>
                {result.type} Carrier Classification
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div style={{ background: 'rgba(0,0,0,0.25)', padding: '14px', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem', textTransform: 'uppercase', display: 'block' }}>LATA Code & Zone</span>
                <strong style={{ color: '#06b6d4', fontSize: '1.1rem', display: 'block', marginTop: '4px' }}>{result.lata}</strong>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.25)', padding: '14px', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem', textTransform: 'uppercase', display: 'block' }}>Operating Company (OCN)</span>
                <strong style={{ color: '#fff', fontSize: '1rem', display: 'block', marginTop: '4px' }}>{result.ocn}</strong>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.25)', padding: '14px', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem', textTransform: 'uppercase', display: 'block' }}>Central Office Switch CLLI</span>
                <strong style={{ color: '#a78bfa', fontFamily: 'var(--font-mono)', fontSize: '1rem', display: 'block', marginTop: '4px' }}>{result.clli}</strong>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.25)', padding: '14px', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem', textTransform: 'uppercase', display: 'block' }}>Switch Hardware Platform</span>
                <strong style={{ color: '#38bdf8', fontSize: '1rem', display: 'block', marginTop: '4px' }}>{result.switchType}</strong>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.25)', padding: '14px', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem', textTransform: 'uppercase', display: 'block' }}>Local Routing Number (LRN)</span>
                <strong style={{ color: '#34d399', fontFamily: 'var(--font-mono)', fontSize: '1rem', display: 'block', marginTop: '4px' }}>{result.lrn}</strong>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.25)', padding: '14px', borderRadius: '8px' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem', textTransform: 'uppercase', display: 'block' }}>IntraLATA Tariff Estimate</span>
                <strong style={{ color: '#f59e0b', fontSize: '1.1rem', display: 'block', marginTop: '4px' }}>{result.intraLataRate}</strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
