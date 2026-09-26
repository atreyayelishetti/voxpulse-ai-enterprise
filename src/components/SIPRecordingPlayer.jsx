import React, { useState } from 'react';
import { 
  Server, 
  Activity, 
  Play, 
  Pause, 
  Download, 
  Search, 
  CheckCircle2, 
  ShieldCheck, 
  FileCode,
  Volume2,
  VolumeX,
  Layers,
  ArrowRight,
  Filter
} from 'lucide-react';

const RECORDINGS = [
  { id: 'call_901824_sip.pcap', duration: '14.2s', caller: '+1 (800) 555-0100', callee: 'VoxPulse IVR Core', codec: 'G.711u (64kbps)', packets: 712, mos: 4.45 },
  { id: 'call_901825_g729.pcap', duration: '28.6s', caller: '+1 (415) 555-0199', callee: 'Tier-1 SBC Gateway', codec: 'G.729 (8kbps)', packets: 1430, mos: 4.12 },
  { id: 'call_901826_refer.pcap', duration: '45.1s', caller: '+1 (212) 555-0144', callee: 'Agent Transfer Queue', codec: 'Opus Wideband', packets: 2255, mos: 4.48 }
];

const PACKET_STREAM = [
  { 
    seq: 1, 
    time: '0.000s', 
    src: '192.168.1.10:5060 (Client)', 
    dst: '10.0.4.1:5060 (SBC)', 
    method: 'INVITE', 
    status: '100 Trying (Pending)', 
    proto: 'SIP',
    rawPayload: `INVITE sip:support@voxpulse.io SIP/2.0\r\nVia: SIP/2.0/UDP 192.168.1.10:5060;branch=z9hG4bK-72a8\r\nFrom: <sip:+18005550100@pstn.carrier.net>;tag=10928a\r\nTo: <sip:support@voxpulse.io>\r\nCall-ID: c84920-a892-4112@192.168.1.10\r\nCSeq: 101 INVITE\r\nContact: <sip:caller@192.168.1.10:5060>\r\nContent-Type: application/sdp\r\nContent-Length: 178\r\n\r\nv=0\r\no=VoxPulse 82910 82910 IN IP4 192.168.1.10\r\ns=Session SDP\r\nc=IN IP4 192.168.1.10\r\nt=0 0\r\nm=audio 16402 RTP/AVP 0 101\r\na=rtpmap:0 PCMU/8000\r\na=rtpmap:101 telephone-event/8000`
  },
  { 
    seq: 2, 
    time: '0.045s', 
    src: '10.0.4.1:5060 (SBC)', 
    dst: '192.168.1.10:5060 (Client)', 
    method: 'SIP/2.0 180 Ringing', 
    status: 'Ringing (Early)', 
    proto: 'SIP',
    rawPayload: `SIP/2.0 180 Ringing\r\nVia: SIP/2.0/UDP 192.168.1.10:5060;branch=z9hG4bK-72a8;received=192.168.1.10\r\nFrom: <sip:+18005550100@pstn.carrier.net>;tag=10928a\r\nTo: <sip:support@voxpulse.io>;tag=sbc-tag-991\r\nCall-ID: c84920-a892-4112@192.168.1.10\r\nCSeq: 101 INVITE\r\nContent-Length: 0`
  },
  { 
    seq: 3, 
    time: '0.310s', 
    src: '10.0.4.1:5060 (SBC)', 
    dst: '192.168.1.10:5060 (Client)', 
    method: 'SIP/2.0 200 OK', 
    status: '200 OK (Connected)', 
    proto: 'SIP',
    rawPayload: `SIP/2.0 200 OK\r\nVia: SIP/2.0/UDP 192.168.1.10:5060;branch=z9hG4bK-72a8\r\nFrom: <sip:+18005550100@pstn.carrier.net>;tag=10928a\r\nTo: <sip:support@voxpulse.io>;tag=sbc-tag-991\r\nCall-ID: c84920-a892-4112@192.168.1.10\r\nCSeq: 101 INVITE\r\nContact: <sip:sbc@10.0.4.1:5060>\r\nContent-Type: application/sdp\r\nContent-Length: 174\r\n\r\nv=0\r\no=VoxPulse-SBC 99281 99281 IN IP4 10.0.4.1\r\ns=SBC Answer\r\nc=IN IP4 10.0.4.1\r\nt=0 0\r\nm=audio 28440 RTP/AVP 0 101\r\na=rtpmap:0 PCMU/8000\r\na=sendrecv`
  },
  { 
    seq: 4, 
    time: '0.312s', 
    src: '192.168.1.10:5060 (Client)', 
    dst: '10.0.4.1:5060 (SBC)', 
    method: 'ACK', 
    status: 'Dialog Confirmed', 
    proto: 'SIP',
    rawPayload: `ACK sip:sbc@10.0.4.1:5060 SIP/2.0\r\nVia: SIP/2.0/UDP 192.168.1.10:5060;branch=z9hG4bK-ack88\r\nFrom: <sip:+18005550100@pstn.carrier.net>;tag=10928a\r\nTo: <sip:support@voxpulse.io>;tag=sbc-tag-991\r\nCall-ID: c84920-a892-4112@192.168.1.10\r\nCSeq: 101 ACK\r\nContent-Length: 0`
  },
  { 
    seq: 5, 
    time: '0.320s - 14.18s', 
    src: '192.168.1.10:16402 (RTP)', 
    dst: '10.0.4.1:28440 (RTP)', 
    method: 'RTP Media Stream (708 Pkts)', 
    status: 'Active 2-Way PCM Voice', 
    proto: 'RTP',
    rawPayload: `[RFC 3550 RTP Payload Header]\r\nVersion: 2\r\nPadding: 0\r\nExtension: 0\r\nCSRC Count: 0\r\nMarker: 1 (Talkspurt start)\r\nPayload Type: 0 (PCMU - G.711 u-Law)\r\nSequence Number: 2841\r\nTimestamp: 160000\r\nSSRC: 0x4B92C10F\r\nPayload Size: 160 bytes (20ms audio frame)`
  },
  { 
    seq: 6, 
    time: '14.20s', 
    src: '192.168.1.10:5060 (Client)', 
    dst: '10.0.4.1:5060 (SBC)', 
    method: 'BYE', 
    status: 'Call Terminated', 
    proto: 'SIP',
    rawPayload: `BYE sip:sbc@10.0.4.1:5060 SIP/2.0\r\nVia: SIP/2.0/UDP 192.168.1.10:5060;branch=z9hG4bK-bye11\r\nFrom: <sip:+18005550100@pstn.carrier.net>;tag=10928a\r\nTo: <sip:support@voxpulse.io>;tag=sbc-tag-991\r\nCall-ID: c84920-a892-4112@192.168.1.10\r\nCSeq: 102 BYE\r\nContent-Length: 0`
  }
];

export default function SIPRecordingPlayer() {
  const [selectedCallId, setSelectedCallId] = useState(RECORDINGS[0].id);
  const [filterSIP, setFilterSIP] = useState('ALL');
  const [selectedPacket, setSelectedPacket] = useState(PACKET_STREAM[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(0);

  const activeRec = RECORDINGS.find(r => r.id === selectedCallId) || RECORDINGS[0];

  const handleTogglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      let p = playbackProgress >= 100 ? 0 : playbackProgress;
      const interval = setInterval(() => {
        p += 5;
        if (p > 100) {
          clearInterval(interval);
          setIsPlaying(false);
          setPlaybackProgress(100);
        } else {
          setPlaybackProgress(p);
        }
      }, 200);
    }
  };

  const handleExportPCAP = () => {
    const pcapMeta = {
      filename: selectedCallId,
      callMetadata: activeRec,
      frames: PACKET_STREAM
    };
    const blob = new Blob([JSON.stringify(pcapMeta, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = selectedCallId.replace('.pcap', '_trace.json');
    a.click();
  };

  const filteredPackets = filterSIP === 'ALL'
    ? PACKET_STREAM
    : filterSIP === 'SIP' 
      ? PACKET_STREAM.filter(p => p.proto === 'SIP')
      : PACKET_STREAM.filter(p => p.proto === 'RTP');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div className="glass-panel glass-panel-glow" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Server color="#38bdf8" size={24} /> SIP PCAP Packet Trace & RTP Ladder Viewer
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
              Inspect Wireshark-grade raw SIP signaling packets, RFC 3264 SDP negotiations, and synchronized 2-way RTP media streams.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button 
              className="btn btn-secondary" 
              onClick={handleExportPCAP}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}
            >
              <Download size={16} /> Export PCAP Trace
            </button>
          </div>
        </div>

        {/* Audio Replay Console */}
        <div style={{ marginTop: '20px', background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <button 
                onClick={handleTogglePlay}
                style={{ 
                  width: '42px', 
                  height: '42px', 
                  borderRadius: '50%', 
                  background: 'linear-gradient(135deg, #0284c7, #38bdf8)', 
                  border: 'none', 
                  color: '#fff', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} style={{ marginLeft: '2px' }} />}
              </button>
              <div>
                <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>{selectedCallId}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {activeRec.codec} • Duration: {activeRec.duration} • MOS: <span style={{ color: '#34d399', fontWeight: 700 }}>{activeRec.mos}</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              {RECORDINGS.map(r => (
                <button
                  key={r.id}
                  onClick={() => { setSelectedCallId(r.id); setPlaybackProgress(0); setIsPlaying(false); }}
                  style={{
                    background: selectedCallId === r.id ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255,255,255,0.05)',
                    border: selectedCallId === r.id ? '1px solid #38bdf8' : '1px solid rgba(255,255,255,0.1)',
                    color: selectedCallId === r.id ? '#38bdf8' : 'var(--text-muted)',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    cursor: 'pointer'
                  }}
                >
                  {r.id.split('_')[1]}
                </button>
              ))}
            </div>
          </div>

          {/* Waveform Scrub Bar */}
          <div style={{ position: 'relative', height: '36px', background: 'rgba(0,0,0,0.4)', borderRadius: '6px', overflow: 'hidden', display: 'flex', alignItems: 'center', padding: '0 8px' }}>
            {/* Visual waveform bars */}
            <div style={{ display: 'flex', gap: '3px', alignItems: 'center', width: '100%', height: '100%' }}>
              {Array.from({ length: 48 }).map((_, i) => {
                const height = Math.sin(i * 0.4) * 12 + 16;
                const isPlayed = (i / 48) * 100 <= playbackProgress;
                return (
                  <div 
                    key={i} 
                    style={{ 
                      flex: 1, 
                      height: `${height}px`, 
                      background: isPlayed ? '#38bdf8' : 'rgba(255,255,255,0.2)', 
                      borderRadius: '2px' 
                    }} 
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Packet Table + Detail Inspector */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '20px' }}>
        {/* Packet Stream */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileCode size={16} color="#06b6d4" />
              Signaling Stream ({filteredPackets.length} Packets)
            </h3>
            <div style={{ display: 'flex', gap: '6px' }}>
              {['ALL', 'SIP', 'RTP'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilterSIP(f)}
                  style={{
                    background: filterSIP === f ? 'rgba(6, 182, 212, 0.2)' : 'rgba(255,255,255,0.05)',
                    border: filterSIP === f ? '1px solid #06b6d4' : '1px solid rgba(255,255,255,0.1)',
                    color: filterSIP === f ? '#38bdf8' : 'var(--text-muted)',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    fontSize: '0.72rem',
                    cursor: 'pointer'
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.68rem' }}>
                  <th style={{ padding: '8px 6px' }}>#</th>
                  <th style={{ padding: '8px 6px' }}>Time</th>
                  <th style={{ padding: '8px 6px' }}>Method / Status</th>
                  <th style={{ padding: '8px 6px' }}>Proto</th>
                </tr>
              </thead>
              <tbody>
                {filteredPackets.map(pkt => (
                  <tr 
                    key={pkt.seq}
                    onClick={() => setSelectedPacket(pkt)}
                    style={{ 
                      borderBottom: '1px solid rgba(255,255,255,0.04)',
                      background: selectedPacket?.seq === pkt.seq ? 'rgba(56, 189, 248, 0.12)' : undefined,
                      cursor: 'pointer'
                    }}
                  >
                    <td style={{ padding: '10px 6px', color: 'var(--text-muted)' }}>{pkt.seq}</td>
                    <td style={{ padding: '10px 6px', color: '#06b6d4', fontFamily: 'var(--font-mono)' }}>{pkt.time}</td>
                    <td style={{ padding: '10px 6px' }}>
                      <span className={`badge ${pkt.method.includes('200') ? 'badge-emerald' : pkt.method.includes('BYE') ? 'badge-rose' : pkt.proto === 'RTP' ? 'badge-amber' : 'badge-cyan'}`} style={{ fontSize: '0.7rem' }}>
                        {pkt.method}
                      </span>
                    </td>
                    <td style={{ padding: '10px 6px', fontFamily: 'var(--font-mono)', color: '#a78bfa' }}>{pkt.proto}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Packet Raw Inspector */}
        {selectedPacket && (
          <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>
                Frame #{selectedPacket.seq}: {selectedPacket.method}
              </div>
              <span className="badge badge-indigo" style={{ fontSize: '0.7rem' }}>{selectedPacket.proto}</span>
            </div>

            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '4px', background: 'rgba(0,0,0,0.25)', padding: '10px', borderRadius: '6px' }}>
              <div><span>Src:</span> <strong style={{ color: '#fff' }}>{selectedPacket.src}</strong></div>
              <div><span>Dst:</span> <strong style={{ color: '#fff' }}>{selectedPacket.dst}</strong></div>
              <div><span>Status:</span> <strong style={{ color: '#34d399' }}>{selectedPacket.status}</strong></div>
            </div>

            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '6px' }}>
                Decoded Protocol Payload
              </div>
              <pre style={{ 
                background: 'rgba(0,0,0,0.5)', 
                padding: '12px', 
                borderRadius: '8px', 
                fontFamily: 'var(--font-mono)', 
                fontSize: '0.72rem', 
                color: '#38bdf8', 
                whiteSpace: 'pre-wrap', 
                maxHeight: '260px', 
                overflowY: 'auto',
                lineHeight: 1.4
              }}>
                {selectedPacket.rawPayload}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
