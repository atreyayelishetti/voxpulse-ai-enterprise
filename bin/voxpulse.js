#!/usr/bin/env node
// VoxPulse AI - Command Line Interface (CLI)
// Allows DevOps & QA engineers to execute IVR tests directly from terminal pipelines

import http from 'http';

const BASE_URL = process.env.VOXPULSE_URL || 'http://localhost:3001';

const args = process.argv.slice(2);
const command = args[0] || 'help';

console.log('=======================================================');
console.log('🚀 VoxPulse AI CLI — Enterprise IVR Automation Tool');
console.log('=======================================================');

async function main() {
  if (command === 'status') {
    await request('GET', '/api/config');
  } else if (command === 'run') {
    const targetNumber = args[1] || '+18005550100';
    console.log(`Executing IVR Test Run on target ${targetNumber}...`);
    await request('POST', '/api/tests/run', {
      name: `CLI Test Run on ${targetNumber}`,
      targetNumber,
      country: 'US'
    });
  } else if (command === 'discover') {
    const targetNumber = args[1] || '+18005550100';
    console.log(`Crawling IVR Menu Tree for ${targetNumber}...`);
    await request('POST', '/api/ivr/discover', { targetNumber, countryCode: 'US' });
  } else if (command === 'load') {
    const concurrencyCount = parseInt(args[1] || '10', 10);
    console.log(`Launching Stress Test with ${concurrencyCount} concurrent calls...`);
    await request('POST', '/api/loadtest', { concurrencyCount, targetNumber: '+18005550100' });
  } else {
    console.log(`
Usage:
  voxpulse status                  Check server status & config
  voxpulse run <phone_number>      Trigger single IVR test run
  voxpulse discover <phone_number> Crawl & map IVR tree hierarchy
  voxpulse load <concurrency>      Run high-volume stress test
    `);
  }
}

function request(method, path, body = null) {
  return new Promise((resolve) => {
    const u = new URL(BASE_URL + path);
    const req = http.request({
      hostname: u.hostname,
      port: u.port,
      path: u.pathname + u.search,
      method,
      headers: { 'Content-Type': 'application/json' }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          console.log(JSON.stringify(json, null, 2));
        } catch (e) {
          console.log(data);
        }
        resolve();
      });
    });

    req.on('error', err => {
      console.error(`CLI Request Error: ${err.message}`);
      resolve();
    });

    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

main();
