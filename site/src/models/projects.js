import pool from '../database.js';

export async function getProjects() {
    const result = await pool.query('SELECT * FROM service_project ORDER BY project_date');
    return result.rows;
}