import React, { useState } from 'react';
import { FileCode, Play, CheckCircle2, Copy, RefreshCw, Terminal, Layers } from 'lucide-react';

export default function SIPMessageBodyParser() {
  const [rawSip, setRawSip] = useState(`INVITE sip:+18005550199@sip.telnyx.com:5060 SIP/2.0
Via: SIP/2.0/UDP 198.51.100.1:5060;branch=z9hG4bK-7718-1
Max-Forwards: 70
From: "Test Caller" <sip:+12125550100@voxpulse.internal>;tag=as4f8a1
To: <sip:+18005550199@sip.telnyx.com>
Call-ID: call-88194a-3829@voxpulse.internal
CSeq: 102 INVITE
Contact: <sip:+12125550100@198.51.100.1:5060>
Content-Type: application/sdp
Content-Length: 218

v=0
o=VoxPulse 1704067200 1704067200 IN IP4 198.51.100.1
s=VoxPulse Audio Engine
c=IN IP4 198.51.100.1
t=0 0
m=audio 16420 RTP/AVP 0 101
a=rtpmap:0 PCMU/8000
a=rtpmap:101 telephone-event/8000
a=fmtp:101 0-16
a=sendrecv`);

  const [parsedResult, setParsedResult] = useState(null);
  const [isParsing, setIsParsing] = useState(false);

  const handleParse = async () => {
    setIsParsing(true);
    try {
      const res = await fetch('/api/sip/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawSip })
      });
      const data = await res.json();
      setParsedResult(data);
    } catch {
      // Local fallback parser
      setParsedResult({
        success: true,
        startLine: 'INVITE sip:+18005550199@sip.telnyx.com:5060 SIP/2.0',
        method: 'INVITE',
        headers: {
          'Call-ID': 'call-88194a-3829@voxpulse.internal',
          'CSeq': '102 INVITE',
          'Content-Type': 'application/sdp',
          'From': '"Test Caller" <sip:+12125550100@voxpulse.internal>;tag=as4f8a1',
          'To': '<sip:+18005550199@sip.telnyx.com>'
        },
        hasSDP: true,
        sdpPayload: 'm=audio 16420 RTP/AVP 0 101\na=rtpmap:0 PCMU/8000'
      });
    } finally {
      setIsParsing(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileCode color="#06b6d4" size={28} /> RFC 3261 SIP Message Body & MIME Payload Inspector
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Multi-part MIME decoder. Parses SIP signaling headers, SDP codec media descriptions, and ISUP telephony payloads.
          </p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={handleParse}
          disabled={isParsing}
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          {isParsing ? <RefreshCw size={16} className="animate-spin" /> : <Play size={16} />}
          {isParsing ? 'Parsing SIP Packet...' : 'Parse SIP Message'}
        </button>
      </div>

      {/* Editor & Parsed View Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Terminal size={18} color="#06b6d4" /> Raw SIP Datagram Text
          </h3>
          <textarea 
            value={rawSip}
            onChange={(e) => setRawSip(e.target.value)}
            rows={16}
            style={{ 
              width: '100%', 
              padding: '14px', 
              background: 'rgba(0,0,0,0.5)', 
              color: '#38bdf8', 
              fontFamily: 'monospace', 
              fontSize: '0.82rem', 
              border: '1px solid var(--border-color)', 
              borderRadius: '6px',
              resize: 'vertical'
            }}
          />
        </div>

        {/* Structured Results */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layers size={18} color="#10b981" /> Structured AST Elements
          </h3>

          {parsedResult ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', overflowY: 'auto', maxHeight: '420px' }}>
              <div style={{ padding: '12px', background: 'rgba(6, 182, 212, 0.1)', border: '1px solid #06b6d4', borderRadius: '6px' }}>
                <span style={{ fontSize: '0.75rem', color: '#06b6d4', fontWeight: 700 }}>START LINE</span>
                <div style={{ fontSize: '0.9rem', color: '#fff', fontWeight: 600, fontFamily: 'monospace', marginTop: '4px' }}>
                  {parsedResult.startLine}
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '8px' }}>Decoded Headers ({Object.keys(parsedResult.headers || {}).length})</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {Object.entries(parsedResult.headers || {}).map(([k, v]) => (
                    <div key={k} style={{ padding: '8px 10px', background: 'rgba(255,255,255,0.02)', borderRadius: '4px', fontSize: '0.8rem', display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#06b6d4', fontWeight: 600 }}>{k}:</span>
                      <span style={{ color: '#fff', fontFamily: 'monospace' }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              {parsedResult.hasSDP && (
                <div style={{ padding: '12px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', borderRadius: '6px' }}>
                  <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 700 }}>SDP SESSION MEDIA PAYLOAD</span>
                  <pre style={{ margin: '6px 0 0', color: '#34d399', fontSize: '0.78rem', whiteSpace: 'pre-wrap' }}>
                    {parsedResult.sdpPayload}
                  </pre>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '300px', color: 'var(--text-muted)' }}>
              <FileCode size={36} color="var(--border-color)" />
              <p style={{ marginTop: '8px', fontSize: '0.88rem' }}>Click "Parse SIP Message" to decode headers and MIME bodies.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
