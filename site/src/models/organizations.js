import pool from '../database.js';

export async function getOrganizations() {
    const result = await pool.query('SELECT * FROM organization ORDER BY name');
    return result.rows;
}