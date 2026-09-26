import React, { useState } from 'react';
import { ArrowLeftRight, CheckCircle2, Clock, Phone, AlertCircle, Play, RefreshCw, ShieldCheck } from 'lucide-react';

export default function TelecomNumberPortingTracker() {
  const [orders, setOrders] = useState([
    { id: 'LNP-9921', dids: '+1 (800) 555-0199 (1 DID)', losing: 'Lumen / CenturyLink', winning: 'Telnyx Wholesale', focDate: '2026-09-28 14:00 UTC', status: 'FOC_CONFIRMED', preTest: 'PASSED', postTest: 'PENDING_CUTOVER' },
    { id: 'LNP-9922', dids: 'New York DIDs Pool (25 DIDs)', losing: 'Verizon Business', winning: 'Telnyx Wholesale', focDate: '2026-09-29 16:30 UTC', status: 'LSR_SUBMITTED', preTest: 'PASSED', postTest: 'PENDING_CUTOVER' },
    { id: 'LNP-9918', dids: 'London Support DIDs (5 DIDs)', losing: 'BT British Telecom', winning: 'Twilio Voice', focDate: '2026-09-24 10:00 UTC', status: 'COMPLETED', preTest: 'PASSED', postTest: 'PASSED (100% INGRESS)' }
  ]);

  const [testingId, setTestingId] = useState(null);

  const handleRunVerification = (id) => {
    setTestingId(id);
    setTimeout(() => {
      setOrders(orders.map(o => o.id === id ? { ...o, preTest: 'PASSED (4.45 MOS Verified)' } : o));
      setTestingId(null);
    }, 700);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ArrowLeftRight color="#06b6d4" size={28} /> Telecom Local Number Portability (LNP) & FOC Order Tracker
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Automated LNP migration tracker. Synchronizes NPAC database broadcasts, Firm Order Commitment (FOC) dates, and pre/post-cutover PSTN call tests.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Active Porting Orders</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#06b6d4', marginTop: '4px' }}>2 Orders</div>
          <span className="badge badge-cyan" style={{ marginTop: '8px', display: 'inline-block' }}>26 DIDs Migrating</span>
        </div>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Next FOC Cutover Window</span>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10b981', marginTop: '8px' }}>Sep 28, 14:00 UTC</div>
          <span className="badge badge-emerald" style={{ marginTop: '8px', display: 'inline-block' }}>Firm Order Locked</span>
        </div>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Losing Carrier Rejection Rate</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981', marginTop: '4px' }}>0.0%</div>
          <span className="badge badge-emerald" style={{ marginTop: '8px', display: 'inline-block' }}>Clean CSR Validation</span>
        </div>
        <div className="glass-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>NPAC Database Status</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#a855f7', marginTop: '4px' }}>SYNCHRONIZED</div>
          <span className="badge badge-purple" style={{ marginTop: '8px', display: 'inline-block' }}>North America LRN</span>
        </div>
      </div>

      {/* Orders Table */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
          Active & Completed LNP Porting Requests
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', textAlign: 'left' }}>
                <th style={{ padding: '10px' }}>Order ID</th>
                <th style={{ padding: '10px' }}>DIDs in Batch</th>
                <th style={{ padding: '10px' }}>Losing Carrier</th>
                <th style={{ padding: '10px' }}>Winning Carrier</th>
                <th style={{ padding: '10px' }}>Target FOC Cutover</th>
                <th style={{ padding: '10px' }}>LNP Status</th>
                <th style={{ padding: '10px' }}>Pre-Port Verification</th>
                <th style={{ padding: '10px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 10px', fontWeight: 700, color: '#fff' }}>{o.id}</td>
                  <td style={{ padding: '12px 10px', color: '#06b6d4', fontWeight: 600 }}>{o.dids}</td>
                  <td style={{ padding: '12px 10px', color: '#ef4444' }}>{o.losing}</td>
                  <td style={{ padding: '12px 10px', color: '#10b981' }}>{o.winning}</td>
                  <td style={{ padding: '12px 10px', color: '#cbd5e1' }}>{o.focDate}</td>
                  <td style={{ padding: '12px 10px' }}>
                    <span className={`badge ${o.status === 'COMPLETED' ? 'badge-emerald' : o.status === 'FOC_CONFIRMED' ? 'badge-cyan' : 'badge-amber'}`}>
                      {o.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 10px', color: '#34d399', fontWeight: 600 }}>{o.preTest}</td>
                  <td style={{ padding: '12px 10px', textAlign: 'right' }}>
                    {o.status !== 'COMPLETED' && (
                      <button 
                        className="btn btn-secondary"
                        onClick={() => handleRunVerification(o.id)}
                        disabled={testingId === o.id}
                        style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                      >
                        {testingId === o.id ? 'Dialing Test...' : 'Run Pre-Test'}
                      </button>
                    )}
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
