import 'dotenv/config';
import pg from 'pg';
const { Pool } = pg;

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    throw new Error('DATABASE_URL is required. Add it to your .env file or hosting environment variables.');
}

const isLocalDatabase = databaseUrl.includes('localhost') || databaseUrl.includes('127.0.0.1');
const useSsl = process.env.DATABASE_SSL === 'false' ? false : !isLocalDatabase;

const pool = new Pool({
    connectionString: databaseUrl,
    ssl: useSsl ? { rejectUnauthorized: false } : false
});

export default pool;
