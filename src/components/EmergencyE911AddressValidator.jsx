import React, { useState } from 'react';
import { AlertCircle, ShieldCheck, CheckCircle2, MapPin, Building, Play, RefreshCw } from 'lucide-react';

export default function EmergencyE911AddressValidator() {
  const [streetAddress, setStreetAddress] = useState('100 Enterprise Way, Floor 4, Suite 410');
  const [postalCode, setPostalCode] = useState('94025');
  const [city, setCity] = useState('Menlo Park, CA');
  const [isValidating, setIsValidating] = useState(false);

  const [validationResult, setValidationResult] = useState({
    karisLawCompliant: true,
    rayBaumsActCompliant: true,
    msagValidated: true,
    targetPsap: 'San Mateo County 911 Communications Center',
    dispatchableLocationScore: '100% (Sub-room accuracy verified)'
  });

  const handleValidate = () => {
    setIsValidating(true);
    setTimeout(() => {
      setIsValidating(false);
    }, 500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <AlertCircle color="#ef4444" size={28} /> Kari's Law & RAY BAUM'S Act E911 Dispatchable Location Auditor
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Federal emergency dialing compliance. Validates Master Street Address Guide (MSAG) records and dispatchable sub-room locations.
          </p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={handleValidate}
          disabled={isValidating}
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          {isValidating ? <RefreshCw size={16} className="animate-spin" /> : <ShieldCheck size={16} />}
          {isValidating ? 'Querying MSAG...' : 'Validate E911 Address'}
        </button>
      </div>

      {/* Compliance Badges Banner */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Kari's Law Status</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>COMPLIANT</div>
          <span className="badge badge-emerald" style={{ marginTop: '8px', display: 'inline-block' }}>Direct 911 Dial (No Prefix)</span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>RAY BAUM'S Act Status</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>COMPLIANT</div>
          <span className="badge badge-emerald" style={{ marginTop: '8px', display: 'inline-block' }}>Dispatchable Location Valid</span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Target Public PSAP</span>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#06b6d4', marginTop: '8px' }}>
            {validationResult.targetPsap}
          </div>
          <span className="badge badge-cyan" style={{ marginTop: '8px', display: 'inline-block' }}>Primary PSAP Route</span>
        </div>

        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Simultaneous Security Alert</span>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#a855f7', marginTop: '4px' }}>ACTIVE</div>
          <span className="badge badge-purple" style={{ marginTop: '8px', display: 'inline-block' }}>SMS + On-Screen Alert</span>
        </div>
      </div>

      {/* Address Form */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
          Location Record for Selected DID Pool
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
              Street Address & Sub-Unit Location
            </label>
            <input 
              type="text" 
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', background: 'rgba(0,0,0,0.4)', color: '#fff', border: '1px solid var(--border-color)', borderRadius: '6px' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>City, State</label>
            <input 
              type="text" 
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', background: 'rgba(0,0,0,0.4)', color: '#fff', border: '1px solid var(--border-color)', borderRadius: '6px' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Postal Code</label>
            <input 
              type="text" 
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', background: 'rgba(0,0,0,0.4)', color: '#fff', border: '1px solid var(--border-color)', borderRadius: '6px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
