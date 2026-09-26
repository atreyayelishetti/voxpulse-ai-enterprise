# 📞 VoxPulse AI - Telecom, PSTN & SIP Protocol Guide
> **Document Version:** 1.0.0-enterprise  
> **Classification:** Technical Protocol Specification  
> **Target Audience:** Telecom Engineers, SBC Administrators, Carrier Routing Operations  

---

## 1. SIP Protocol Architecture (RFC 3261)

VoxPulse AI integrates directly with Session Border Controllers (SBCs) and carrier softswitches.

### 1.1 SIP Dialog Lifecycle

```
VoxPulse Softphone              SBC / Proxy                     PSTN Carrier
      |                              |                               |
      |--------- INVITE ------------>|                               |
      |<-------- 100 Trying ---------|                               |
      |                              |--------- INVITE ------------>|
      |                              |<-------- 180 Ringing ---------|
      |<-------- 180 Ringing --------|                               |
      |                              |<-------- 200 OK --------------|
      |<-------- 200 OK -------------|                               |
      |--------- ACK --------------->|                               |
      |                              |--------- ACK ---------------->|
      |========== 2-WAY RTP AUDIO / DTMF STREAM (G.711u) ============|
      |                              |                               |
      |--------- BYE --------------->|                               |
      |                              |--------- BYE ---------------->|
      |                              |<-------- 200 OK --------------|
      |<-------- 200 OK -------------|                               |
```

### 1.2 Essential SIP Header Specifications

```sip
INVITE sip:+18005550199@sbc1.voxpulse.internal:5060 SIP/2.0
Via: SIP/2.0/UDP 192.168.1.100:5060;branch=z9hG4bK-vox-987654
Max-Forwards: 70
From: "VoxPulse Tester" <sip:+18005550198@voxpulse.internal>;tag=vox-tag-001
To: <sip:+18005550199@sbc1.voxpulse.internal>
Call-ID: call-uuid-889900-1122-3344@192.168.1.100
CSeq: 1 INVITE
Contact: <sip:voxpulse@192.168.1.100:5060>
Supported: 100rel, timer, replaces
Identity: eyJhbGciOiJFUzI1NiIsInR5cCI6InBhc3Nwb3J0In0...;info=<https://cert.voxpulse.net/cert.pem>;alg=ES256;ppt=shaken
Content-Type: application/sdp
Content-Length: 242

v=0
o=VoxPulse 1704067200 1704067200 IN IP4 192.168.1.100
s=VoxPulse PSTN Stream
c=IN IP4 192.168.1.100
t=0 0
m=audio 10004 RTP/AVP 0 101
a=rtpmap:0 PCMU/8000
a=rtpmap:101 telephone-event/8000
a=fmtp:101 0-16
a=sendrecv
```

---

## 2. RFC 4733 / RFC 2833 In-Band DTMF Payload Format

In-band DTMF events are transmitted via RTP payload type `101` (`telephone-event`).

```
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|     Event     |E|R| volume    |          duration             |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

### Event Codes Map:
- `0-9`: Digits `0` through `9`
- `10`: `*`
- `11`: `#`
- `12-15`: `A`, `B`, `C`, `D`
- `16`: Flash

---

## 3. STIR/SHAKEN Attestation & Identity Tokens

To prevent caller ID spoofing and ensure high call completion rates across North American PSTN networks, VoxPulse AI signs outbound SIP requests using STIR/SHAKEN PASSporT tokens.

### 3.1 Attestation Level Classification

| Level | Name | Requirement | Carrier Handling |
| :---: | :--- | :--- | :--- |
| **A** | **Full Attestation** | Originator is fully authenticated and owns the calling number. | Delivered cleanly without spam warning. |
| **B** | **Partial Attestation** | Originator is authenticated, but number ownership is unverified. | Allowed; may flag conditionally. |
| **C** | **Gateway Attestation** | Call originated from an unauthenticated PSTN gateway. | High risk of being marked as **"Spam Likely"**. |

### 3.2 PASSporT JWT Header & Claims
```json
{
  "alg": "ES256",
  "ppt": "shaken",
  "typ": "passport",
  "x5u": "https://cert.voxpulse.net/cert.pem"
}
{
  "attest": "A",
  "dest": { "tn": ["+18005550199"] },
  "iat": 1704067200,
  "orig": { "tn": "+18005550198" },
  "origid": "vox-orig-uuid-12345"
}
```

---

## 4. E911 Emergency Compliance (Kari's Law & RAY BAUM'S Act)

VoxPulse AI includes automated E911 address validation and emergency call path testing ([`src/components/EmergencyE911AddressValidator.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/EmergencyE911AddressValidator.jsx)).

### Compliance Requirements Enforced:
1. **Direct 911 Dialing (Kari's Law)**: No prefix (e.g. `9` or `8`) required to reach 911.
2. **On-Site Notification**: Instant WebSocket broadcast and SMS alert sent to security officers whenever 911 is dialed.
3. **Dispatchable Location (RAY BAUM'S Act)**: Validates street address, building number, floor level, and room number sent via PIDF-LO XML in SIP body.

```xml
<presence xmlns="urn:ietf:params:xml:ns:pidf" entity="pres:911@voxpulse.internal">
  <tuple id="loc1">
    <status><geopriv xmlns="urn:ietf:params:xml:ns:pidf:geopriv10">
      <location-info><civicAddress xmlns="urn:ietf:params:xml:ns:pidf:geopriv10:civicAddr">
        <country>US</country>
        <A1>NY</A1>
        <A3>New York</A3>
        <RD>Broadway</RD>
        <HNO>500</HNO>
        <FL>12</FL>
        <ROOM>1204</ROOM>
      </civicAddress></location-info>
    </geopriv></status>
  </tuple>
</presence>
```
