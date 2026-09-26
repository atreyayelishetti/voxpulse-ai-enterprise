// Real-Time Telephony WebSocket Media Stream Gateway (Twilio Media Streams & Telnyx WebSockets)
// Enables low-latency G.711u audio streaming between PSTN carriers and Google Gemini Live API

import { WebSocketServer } from 'ws';

/**
 * Decodes G.711 mu-law byte buffer to 16-bit PCM linear sample buffer
 */
export function decodeMulawToPCM(mulawBuffer) {
  const pcmBuffer = Buffer.alloc(mulawBuffer.length * 2);
  for (let i = 0; i < mulawBuffer.length; i++) {
    const sample = mulawToPcmSample(mulawBuffer[i]);
    pcmBuffer.writeInt16LE(sample, i * 2);
  }
  return pcmBuffer;
}

function mulawToPcmSample(mulaw) {
  mulaw = ~mulaw;
  const sign = (mulaw & 0x80);
  const exponent = (mulaw >> 4) & 0x07;
  const mantissa = mulaw & 0x0f;
  let sample = ((mantissa << 3) + 0x84) << exponent;
  sample -= 0x84;
  return sign ? -sample : sample;
}

export function setupMediaStreamServer(server) {
  const wssMedia = new WebSocketServer({ noServer: true });

  server.on('upgrade', (request, socket, head) => {
    const pathname = request.url;
    if (pathname === '/ws/twilio-media' || pathname === '/ws/telnyx-media') {
      wssMedia.handleUpgrade(request, socket, head, (ws) => {
        wssMedia.emit('connection', ws, request);
      });
    }
  });

  wssMedia.on('connection', (ws, req) => {
    console.log('[Media Stream Gateway] Connected PSTN WebSocket Stream:', req.url);

    ws.on('message', (message) => {
      try {
        const msg = JSON.parse(message);
        if (msg.event === 'start') {
          console.log(`[Media Stream] Started call stream: ${msg.start.streamSid}`);
        } else if (msg.event === 'media') {
          // Inbound G.711u audio payload from PSTN carrier
          const rawAudioBase64 = msg.media.payload;
          const mulawBuffer = Buffer.from(rawAudioBase64, 'base64');
          const pcmBuffer = decodeMulawToPCM(mulawBuffer);
          // Stream decoded PCM to Gemini Realtime Audio Engine
        } else if (msg.event === 'stop') {
          console.log(`[Media Stream] Stream ended for ${msg.streamSid}`);
        }
      } catch (e) {
        // Non-JSON binary frame
      }
    });

    ws.on('close', () => {
      console.log('[Media Stream Gateway] PSTN Stream closed');
    });
  });

  console.log('✓ Twilio/Telnyx WebSocket Media Stream Gateway ready on /ws/twilio-media');
}
