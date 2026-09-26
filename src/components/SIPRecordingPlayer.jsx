import React, { useState } from 'react';
import { Server, Activity, Play, Download, Search, CheckCircle2, ShieldCheck, FileCode } from 'lucide-react';

export default function SIPRecordingPlayer() {
  const [selectedCallId, setSelectedCallId] = useState('call_901824_sip.pcap');
  const [filterSIP, setFilterSIP] = useState('ALL');

  const sipPackets = [
    { seq: 1, time: '0.000s', src: '192.168.1.10:5060 (Client)', dst: '10.0.4.1:5060 (SBC)', method: 'INVITE', status: '100 Trying', rtpCodec: 'G.711u' },
    { seq: 2, time: '0.045s', src: '10.0.4.1:5060 (SBC)', dst: '192.168.1.10:5060 (Client)', method: 'SIP/2.0 180 Ringing', status: 'Ringing', rtpCodec: 'G.711u' },
    { seq: 3, time: '0.310s', src: '10.0.4.1:5060 (SBC)', dst: '192.168.1.10:5060 (Client)', method: 'SIP/2.0 200 OK', status: '200 OK', rtpCodec: 'G.711u' },
    { seq: 4, time: '0.312s', src: '192.168.1.10:5060 (Client)', dst: '10.0.4.1:5060 (SBC)', method: 'ACK', status: 'Session Established', rtpCodec: 'G.711u' },
    { seq: 5, time: '14.20s', src: '192.168.1.10:5060 (Client)', dst: '10.0.4.1:5060 (SBC)', method: 'BYE', status: 'Call Terminated', rtpCodec: 'G.711u' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Server color="#38bdf8" size={28} /> SIP PCAP Packet Trace & RTP Ladder Viewer
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '4px' }}>
            Inspect Wireshark-style raw SIP signaling packets, SDP negotiations, and RTP media stream payloads.
          </p>
        </div>

        <button className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Download size={16} /> Export PCAP Trace File
        </button>
      </div>

      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FileCode size={18} color="#06b6d4" /> Wireshark SIP Telephony Packet Stream
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.72rem' }}>
                <th style={{ padding: '10px' }}>Frame #</th>
                <th style={{ padding: '10px' }}>Timestamp</th>
                <th style={{ padding: '10px' }}>Source Endpoint</th>
                <th style={{ padding: '10px' }}>Destination Endpoint</th>
                <th style={{ padding: '10px' }}>SIP Method / Status</th>
                <th style={{ padding: '10px' }}>Codec Payload</th>
              </tr>
            </thead>
            <tbody>
              {sipPackets.map((pkt) => (
                <tr key={pkt.seq} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '12px 10px', color: 'var(--text-muted)' }}>#{pkt.seq}</td>
                  <td style={{ padding: '12px 10px', color: '#06b6d4', fontWeight: 600 }}>{pkt.time}</td>
                  <td style={{ padding: '12px 10px', color: '#fff' }}>{pkt.src}</td>
                  <td style={{ padding: '12px 10px', color: '#fff' }}>{pkt.dst}</td>
                  <td style={{ padding: '12px 10px' }}>
                    <span className={`badge ${pkt.method.includes('200') ? 'badge-emerald' : pkt.method.includes('BYE') ? 'badge-rose' : 'badge-cyan'}`}>
                      {pkt.method}
                    </span>
                  </td>
                  <td style={{ padding: '12px 10px', color: '#a78bfa' }}>{pkt.rtpCodec}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
