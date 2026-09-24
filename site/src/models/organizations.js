import pool from '../database.js';

export async function getOrganizations() {
    const result = await pool.query('SELECT * FROM organization ORDER BY name');
    return result.rows;
}

export async function getOrganizationById(organizationId) {
    const result = await pool.query(
        'SELECT * FROM organization WHERE organization_id = $1',
        [organizationId]
    );
    return result.rows[0];
}

export async function getProjectsByOrganization(organizationId) {
    const result = await pool.query(
        `SELECT *
         FROM service_project
         WHERE organization_id = $1
         ORDER BY project_date`,
        [organizationId]
    );
    return result.rows;
}
