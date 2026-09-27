// PostgreSQL Database Connection & Query Engine
import pg from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL || 'postgresql://voxpulse:voxpulse123@localhost:5432/voxpulse_db';

let pool = null;
let isConnected = false;

try {
  pool = new Pool({
    connectionString,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 3000
  });

  pool.on('error', (err) => {
    console.warn('[PostgreSQL Pool Error]:', err.message);
  });
} catch (e) {
  console.warn('[PostgreSQL Init]: Running in memory mode');
}

export async function initDatabase() {
  if (!pool) return false;
  try {
    const client = await pool.connect();
    console.log('✓ Connected to PostgreSQL Database');
    client.release();
    isConnected = true;

    // Load schema
    const schemaPath = path.join(process.cwd(), 'server', 'db', 'schema.sql');
    if (fs.existsSync(schemaPath)) {
      const sql = fs.readFileSync(schemaPath, 'utf-8');
      await pool.query(sql);
      console.log('✓ PostgreSQL Schema Initialized');
    }
    return true;
  } catch (err) {
    console.warn('⚠️ PostgreSQL unavailable on localhost:5432. Falling back to High-Performance In-Memory DB Mode.');
    console.warn('   (Note: Docker container will automatically use real Postgres)');
    return false;
  }
}

export async function query(text, params) {
  if (pool && isConnected) {
    return pool.query(text, params);
  }
  return { rows: [] };
}

export async function checkDbHealth() {
  if (!pool) return { status: 'DISCONNECTED', connected: false, mode: 'IN_MEMORY' };
  try {
    const start = Date.now();
    const client = await pool.connect();
    await client.query('SELECT 1');
    client.release();
    return {
      status: 'HEALTHY',
      connected: true,
      mode: 'POSTGRESQL',
      rttMs: Date.now() - start,
      poolSize: pool.totalCount || 0,
      idleClients: pool.idleCount || 0,
      waitingClients: pool.waitingCount || 0
    };
  } catch (err) {
    return {
      status: 'FALLBACK_IN_MEMORY',
      connected: false,
      mode: 'IN_MEMORY',
      error: err.message
    };
  }
}

export { pool as dbPool };
