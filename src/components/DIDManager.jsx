import React, { useState } from 'react';
import { 
  Globe2, 
  Plus, 
  Phone, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Trash2,
  Activity,
  ShieldCheck
} from 'lucide-react';

const INITIAL_DIDS = [
  { id: 1, phone: '+1 (800) 555-0100', country: 'US', countryName: 'United States', carrier: 'AT&T / Verizon', status: 'ACTIVE', sla: 99.99, latency: '42ms' },
  { id: 2, phone: '+44 (20) 7946-0000', country: 'UK', countryName: 'United Kingdom', carrier: 'BT / Vodafone', status: 'ACTIVE', sla: 99.95, latency: '112ms' },
  { id: 3, phone: '+49 (69) 1234-5678', country: 'DE', countryName: 'Germany', carrier: 'Deutsche Telekom', status: 'ACTIVE', sla: 99.98, latency: '128ms' },
  { id: 4, phone: '+81 (3) 1234-5678', country: 'JP', countryName: 'Japan', carrier: 'NTT Docomo', status: 'ACTIVE', sla: 99.90, latency: '185ms' },
  { id: 5, phone: '+91 (22) 1234-5678', country: 'IN', countryName: 'India', carrier: 'Bharti Airtel', status: 'ACTIVE', sla: 99.85, latency: '210ms' },
  { id: 6, phone: '+55 (11) 91234-5678', country: 'BR', countryName: 'Brazil', carrier: 'Telefónica Vivo', status: 'ACTIVE', sla: 99.80, latency: '195ms' },
];

export default function DIDManager({ onRunTest }) {
  const [dids, setDids] = useState(INITIAL_DIDS);
  const [newPhone, setNewPhone] = useState('');
  const [newCountry, setNewCountry] = useState('US');
  const [newCarrier, setNewCarrier] = useState('Tier 1 Carrier');
  const [testingId, setTestingId] = useState(null);

  const handleAddDID = () => {
    if (!newPhone) return;
    const item = {
      id: Date.now(),
      phone: newPhone,
      country: newCountry,
      countryName: newCountry === 'US' ? 'United States' : newCountry === 'UK' ? 'United Kingdom' : 'International',
      carrier: newCarrier,
      status: 'ACTIVE',
      sla: 99.95,
      latency: `${Math.floor(40 + Math.random() * 120)}ms`
    };
    setDids([...dids, item]);
    setNewPhone('');
  };

  const handleTestDID = (did) => {
    setTestingId(did.id);
    setTimeout(() => {
      setTestingId(null);
      if (onRunTest) {
        onRunTest({
          name: `Reachability Diagnostics on ${did.phone}`,
          targetNumber: did.phone,
          country: did.country
        });
      }
    }, 1200);
  };

  const handleDelete = (id) => {
    setDids(dids.filter(d => d.id !== id));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="glass-panel glass-panel-glow" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Globe2 size={24} color="#34d399" />
              Global Phone Number Pool & Carrier DID Manager
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              Manage local/toll-free test numbers across 100+ countries with carrier reachability tracking.
            </p>
          </div>

          <span className="badge badge-emerald" style={{ padding: '6px 12px' }}>
            {dids.length} Global DIDs Active
          </span>
        </div>

        {/* Add DID Form */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1.5fr 1fr', gap: '12px', marginTop: '20px', alignItems: 'center' }}>
          <div>
            <label style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>PHONE NUMBER (E.164)</label>
            <input type="text" className="input-field" placeholder="+1 (800) 000-0000" value={newPhone} onChange={e => setNewPhone(e.target.value)} />
          </div>

          <div>
            <label style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>COUNTRY</label>
            <select className="input-field" value={newCountry} onChange={e => setNewCountry(e.target.value)}>
              <option value="US">🇺🇸 United States</option>
              <option value="UK">🇬🇧 United Kingdom</option>
              <option value="DE">🇩🇪 Germany</option>
              <option value="JP">🇯🇵 Japan</option>
              <option value="IN">🇮🇳 India</option>
              <option value="BR">🇧🇷 Brazil</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>CARRIER NAME</label>
            <input type="text" className="input-field" value={newCarrier} onChange={e => setNewCarrier(e.target.value)} />
          </div>

          <button onClick={handleAddDID} className="btn btn-emerald" style={{ marginTop: '18px' }}>
            <Plus size={18} /> Add DID Number
          </button>
        </div>
      </div>

      {/* DID Pool Table */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
          Configured Test DIDs & Reachability SLA Status
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '12px 14px' }}>COUNTRY</th>
                <th style={{ padding: '12px 14px' }}>PHONE NUMBER</th>
                <th style={{ padding: '12px 14px' }}>CARRIER TRUNK</th>
                <th style={{ padding: '12px 14px' }}>REACHABILITY SLA</th>
                <th style={{ padding: '12px 14px' }}>CARRIER LATENCY</th>
                <th style={{ padding: '12px 14px' }}>STATUS</th>
                <th style={{ padding: '12px 14px', textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {dids.map(did => (
                <tr key={did.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', color: '#fff' }}>
                  <td style={{ padding: '14px', fontWeight: 600 }}>
                    {did.countryName} ({did.country})
                  </td>
                  <td style={{ padding: '14px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#38bdf8' }}>
                    {did.phone}
                  </td>
                  <td style={{ padding: '14px', color: 'var(--text-muted)' }}>
                    {did.carrier}
                  </td>
                  <td style={{ padding: '14px', fontWeight: 700, color: '#34d399' }}>
                    {did.sla}%
                  </td>
                  <td style={{ padding: '14px', color: 'var(--text-muted)' }}>
                    {did.latency}
                  </td>
                  <td style={{ padding: '14px' }}>
                    <span className="badge badge-emerald">
                      <CheckCircle2 size={12} /> {did.status}
                    </span>
                  </td>
                  <td style={{ padding: '14px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      <button 
                        onClick={() => handleTestDID(did)} 
                        className="btn btn-secondary" 
                        style={{ fontSize: '0.75rem', padding: '4px 10px' }}
                        disabled={testingId === did.id}
                      >
                        {testingId === did.id ? <RefreshCw size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Phone size={14} />}
                        {testingId === did.id ? 'Testing...' : 'Test DID'}
                      </button>

                      <button 
                        onClick={() => handleDelete(did.id)} 
                        style={{ background: 'transparent', border: 'none', color: '#f87171', cursor: 'pointer', padding: '4px' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
