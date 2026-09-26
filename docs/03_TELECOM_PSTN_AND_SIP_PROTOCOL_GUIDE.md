# 📞 VoxPulse AI - Telecom, PSTN & SIP Protocol Guide
> **Document Version:** 1.1.0-enterprise  
> **Classification:** Technical Protocol Specification  
> **Target Audience:** Telecom Engineers, SBC Administrators, Carrier Routing Operations  

---

## 1. SIP Protocol Architecture (RFC 3261, RFC 3262, RFC 3515)

VoxPulse AI integrates directly with Session Border Controllers (SBCs) and carrier softswitches.

### 1.1 SIP Dialog Lifecycle & 100rel PRACK Sequence (RFC 3262)

```
VoxPulse Softswitch             SBC / Proxy                     PSTN Carrier
      |                              |                               |
      |--------- INVITE (100rel) --->|                               |
      |<-------- 100 Trying ---------|                               |
      |                              |--------- INVITE ------------->|
      |                              |<-------- 183 Session Progress |
      |<-------- 183 (RSeq: 101) ----|                               |
      |--------- PRACK (RAck: 101) ->|                               |
      |                              |--------- PRACK -------------->|
      |                              |<-------- 200 OK (PRACK) ------|
      |<-------- 200 OK (PRACK) -----|                               |
      |                              |<-------- 200 OK (INVITE) -----|
      |<-------- 200 OK (INVITE) ----|                               |
      |--------- ACK --------------->|                               |
      |                              |--------- ACK ---------------->|
      |========== 2-WAY RTP AUDIO / DTMF STREAM (G.711u / Opus) ======|
      |                              |                               |
      |--------- BYE --------------->|                               |
      |                              |--------- BYE ---------------->|
      |                              |<-------- 200 OK --------------|
      |<-------- 200 OK -------------|                               |
```

### 1.2 RFC 3515 SIP REFER Call Transfer Call Flow
VoxPulse supports both **Blind Transfers** and **Attended Transfers** (`Replaces` parameter):
```sip
REFER sip:caller@voxpulse.internal SIP/2.0
Via: SIP/2.0/UDP 10.0.0.1:5060;branch=z9hG4bK-refer-101
To: <sip:caller@voxpulse.internal>;tag=caller-tag-01
From: <sip:ivr@voxpulse.internal>;tag=ivr-tag-02
Call-ID: call-882910-xyz
CSeq: 201 REFER
Refer-To: <sip:agent301@pbx.corp.net?Replaces=callid-992%3Bto-tag%3D123>
Referred-By: <sip:ivr@voxpulse.internal>
Content-Length: 0
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
- `0–9`: Digits `0` through `9`
- `10`: `*`
- `11`: `#`
- `12–15`: `A`, `B`, `C`, `D`
- `16`: Flash Hook

---

## 3. STIR/SHAKEN Attestation & PASSporT Cryptographic Tokens

To prevent caller ID spoofing and ensure high call completion rates, VoxPulse AI verifies and generates RFC 8224 / RFC 8588 STIR/SHAKEN PASSporT tokens.

### 3.1 Attestation Levels

| Level | Classification | Ownership Verification | Call Delivery Result |
| :---: | :--- | :--- | :--- |
| **A** | **Full Attestation** | Caller is authenticated and authorized to use the TN. | Clean display, green checkmark on mobile handsets. |
| **B** | **Partial Attestation** | Caller is authenticated; TN ownership is unverified. | Normal delivery, no spam badge. |
| **C** | **Gateway Attestation** | Origin is unverified (international / untrusted gateway). | High risk of **"Fraud Alert"** or **"Spam Likely"**. |

### 3.2 PASSporT Header & Payload Format
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
  "origid": "urn:uuid:vox-orig-uuid-12345"
}
```

---

## 4. E911 Emergency Compliance (Kari's Law & RAY BAUM'S Act)

Enforced via [`EmergencyE911AddressValidator.jsx`](file:///Users/atreyayelishetti/Desktop/work/ivr%20testing/src/components/EmergencyE911AddressValidator.jsx):
1. **Direct 911 Dialing (Kari's Law)**: Zero dial prefix requirement.
2. **On-Site Notification**: Instant emergency broadcast to facility security personnel.
3. **Dispatchable Location (RAY BAUM'S Act)**: Validates street, building, floor, and suite/room PIDF-LO XML.

---

## 5. ITU-T G.168 Acoustic Echo Cancellation (AEC)

Acoustic reflection attenuation thresholds:
- **Echo Return Loss (ERL)**: $\ge 14\text{ dB}$ (physical handset coupling loss).
- **Echo Return Loss Enhancement (ERLE)**: $\ge 30\text{ dB}$ (active DSP filter cancellation).
- **Acoustic Combined Loss (ACOM)**: $\text{ACOM} = \text{ERL} + \text{ERLE} \ge 44\text{ dB}$.
- **Convergence Time**: $< 250\text{ ms}$ to suppress echo talkspurt.

---

## 6. WebRTC RFC 8445 ICE Candidate Priority Calculation

Candidate priority formula:
$$\text{Priority} = (2^{24} \cdot \text{type\_pref}) + (2^8 \cdot \text{local\_pref}) + (256 - \text{component})$$
- `host` type preference: $126$
- `srflx` (STUN reflexive) type preference: $100$
- `relay` (TURN relay) type preference: $0$

---
*VoxPulse AI Telecom Protocol Specification • RFC 3261, 3262, 3515, 4733, 8445 Verified*
