import pool from '../database.js';

export async function getCategories() {
    const result = await pool.query('SELECT * FROM categories ORDER BY name');
    return result.rows;
}