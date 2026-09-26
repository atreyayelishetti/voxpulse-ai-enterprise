// DTMF (Dual-Tone Multi-Frequency) Tone Synthesizer & Audio Metrics
// Used for generating precise PSTN keypad tones and calculating IVR Audio Quality (MOS / Latency / Silence)

const DTMF_FREQUENCIES = {
  '1': [697, 1209],
  '2': [697, 1336],
  '3': [697, 1477],
  'A': [697, 1633],
  '4': [770, 1209],
  '5': [770, 1336],
  '6': [770, 1477],
  'B': [770, 1633],
  '7': [852, 1209],
  '8': [852, 1336],
  '9': [852, 1477],
  'C': [852, 1633],
  '*': [941, 1209],
  '0': [941, 1336],
  '#': [941, 1477],
  'D': [941, 1633],
};

/**
 * Generate PCM WAV audio buffer for a DTMF key tone
 * @param {string} digit - Key digit ('0'-'9', '*', '#')
 * @param {number} durationMs - Duration in milliseconds (default 160ms standard PSTN)
 * @param {number} sampleRate - Sample rate (default 8000Hz PCM standard telecommunication)
 * @returns {Buffer} WAV audio Buffer
 */
export function generateDTMFWav(digit, durationMs = 160, sampleRate = 8000) {
  const freqs = DTMF_FREQUENCIES[digit.toUpperCase()] || DTMF_FREQUENCIES['0'];
  const numSamples = Math.floor((durationMs / 1000) * sampleRate);
  const dataSize = numSamples * 2; // 16-bit PCM (2 bytes per sample)
  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);

  // fmt chunk
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // subchunk size
  buffer.writeUInt16LE(1, 20); // PCM format
  buffer.writeUInt16LE(1, 22); // Mono channel
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * 2, 28); // Byte rate
  buffer.writeUInt16LE(2, 32); // Block align
  buffer.writeUInt16LE(16, 34); // Bits per sample

  // data chunk header
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  // Write samples
  const [f1, f2] = freqs;
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    // Normalized tone synthesis with 0.5 amplitude to prevent clipping
    const sample = 0.5 * (Math.sin(2 * Math.PI * f1 * t) + Math.sin(2 * Math.PI * f2 * t));
    const intSample = Math.floor(sample * 16383); // 16-bit signed int max is 32767
    buffer.writeInt16LE(intSample, 44 + i * 2);
  }

  return buffer;
}

/**
 * Calculates MOS (Mean Opinion Score) & Audio Quality Metrics from raw audio buffer
 * MOS scale: 1.0 (Bad) to 5.0 (Excellent)
 */
export function calculateAudioQualityMetrics(latencyMs, silenceRatio, clippingCount = 0, backgroundNoiseDb = -45) {
  // Base MOS estimation formula for PSTN & VoIP streams
  let mos = 4.4; // Ideal PSTN baseline

  // Latency penalty (RFC 3550 standard: <150ms is ideal, >400ms severe degradation)
  if (latencyMs > 150) {
    mos -= Math.min(1.5, ((latencyMs - 150) / 100) * 0.25);
  }

  // Silence penalty (Excessive unexpected silence indicates audio drop or delayed IVR response)
  if (silenceRatio > 0.3) {
    mos -= (silenceRatio - 0.3) * 1.8;
  }

  // Background noise penalty
  if (backgroundNoiseDb > -30) {
    mos -= Math.min(1.0, ((backgroundNoiseDb + 30) / 10) * 0.3);
  }

  // Audio clipping penalty
  if (clippingCount > 0) {
    mos -= Math.min(0.8, clippingCount * 0.1);
  }

  // Clamp MOS to range 1.0 - 4.5
  mos = Math.max(1.0, Math.min(4.5, Number(mos.toFixed(2))));

  return {
    mos,
    latencyMs,
    silenceRatioPercent: Math.round(silenceRatio * 100),
    clippingEvents: clippingCount,
    backgroundNoiseDb,
    pesqEquivalent: (mos * 0.95).toFixed(2), // PESQ scale correlation
    polqaEquivalent: (mos * 0.98).toFixed(2), // POLQA scale correlation
    qualityRating: mos >= 4.0 ? 'EXCELLENT' : mos >= 3.5 ? 'GOOD' : mos >= 2.5 ? 'FAIR' : 'POOR'
  };
}
