// PostgreSQL Database Seed Script
import pg from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const { Pool } = pg;
const connectionString = process.env.DATABASE_URL || 'postgresql://voxpulse:voxpulse123@localhost:5439/voxpulse_db';

async function seed() {
  console.log('🌱 Seeding VoxPulse AI PostgreSQL Database & Container...');
  const pool = new Pool({ connectionString });

  try {
    const client = await pool.connect();

    const schemaPath = path.join(process.cwd(), 'server', 'db', 'schema.sql');
    if (fs.existsSync(schemaPath)) {
      const sql = fs.readFileSync(schemaPath, 'utf-8');
      await client.query(sql);
      console.log('✓ Successfully Executed Schema & Seed Data (DIDs, Test Suites, Runs, Users, Integrations)!');
    }

    client.release();
  } catch (err) {
    console.error('Seed Execution Notice:', err.message);
  } finally {
    await pool.end();
  }
}

seed();
