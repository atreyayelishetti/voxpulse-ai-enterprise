import React, { useState } from 'react';
import { 
  Network, 
  Search, 
  Sparkles, 
  GitBranch, 
  Play, 
  CheckCircle2, 
  RefreshCw,
  FolderTree
} from 'lucide-react';

export default function IVRDiscoveryMap() {
  const [targetNumber, setTargetNumber] = useState('+1 (800) 555-0100');
  const [country, setCountry] = useState('US');
  const [isCrawling, setIsCrawling] = useState(false);
  const [treeData, setTreeData] = useState(null);

  const handleStartCrawl = async () => {
    setIsCrawling(true);
    try {
      const res = await fetch('/api/ivr/discover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetNumber, countryCode: country })
      });
      const data = await res.json();
      setTreeData(data.tree);
    } catch (e) {
      console.error(e);
    } finally {
      setIsCrawling(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="glass-panel glass-panel-glow" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FolderTree size={24} color="#06b6d4" />
              IVR Auto-Discovery & Visual Tree Crawler
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Automated in-country IVR journey mapper replacing Klearcom IVR Discovery.
            </p>
          </div>

          <span className="badge badge-cyan" style={{ padding: '6px 12px' }}>
            Gemini 2.0 Tree Crawler
          </span>
        </div>

        {/* Input Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '14px', marginTop: '20px', alignItems: 'center' }}>
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>TARGET PHONE TO CRAWL</label>
            <input type="text" className="input-field" value={targetNumber} onChange={e => setTargetNumber(e.target.value)} />
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>COUNTRY</label>
            <select className="input-field" value={country} onChange={e => setCountry(e.target.value)}>
              <option value="US">🇺🇸 United States (+1)</option>
              <option value="UK">🇬🇧 United Kingdom (+44)</option>
              <option value="DE">🇩🇪 Germany (+49)</option>
              <option value="JP">🇯🇵 Japan (+81)</option>
            </select>
          </div>

          <button onClick={handleStartCrawl} className="btn btn-primary" style={{ marginTop: '18px' }} disabled={isCrawling}>
            {isCrawling ? <RefreshCw size={18} style={{ animation: 'spin 1s linear infinite' }} /> : <Search size={18} />}
            {isCrawling ? 'Crawling IVR...' : 'Start IVR Discovery'}
          </button>
        </div>
      </div>

      {/* Discovered Tree Diagram */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
          Discovered IVR Hierarchy Map
        </h3>

        {treeData ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {treeData.nodes.map(node => (
              <div key={node.id} style={{
                background: 'rgba(31, 41, 55, 0.6)',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                padding: '16px',
                marginLeft: `${node.depth * 30}px`
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#06b6d4', textTransform: 'uppercase' }}>
                    DEPTH LEVEL {node.depth} (NODE {node.id})
                  </span>
                  <span className="badge badge-emerald">Gemini Verified</span>
                </div>

                <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#fff', marginBottom: '10px' }}>
                  "{node.prompt}"
                </div>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {node.options.map((opt, idx) => (
                    <div key={idx} style={{ background: 'rgba(99, 102, 241, 0.15)', border: '1px solid rgba(99, 102, 241, 0.3)', padding: '6px 12px', borderRadius: '8px', fontSize: '0.8rem', color: '#c7d2fe' }}>
                      Key <strong>'{opt.key}'</strong> → {opt.intent}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.9rem' }}>
            Click "Start IVR Discovery" to crawl and map out an IVR tree hierarchy automatically.
          </div>
        )}
      </div>
    </div>
  );
}
