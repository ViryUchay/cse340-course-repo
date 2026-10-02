import pool from '../database.js';

export async function getOrganizations() {
    const result = await pool.query(
        'SELECT * FROM organization ORDER BY name'
    );
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

// Create a new organization
export async function createOrganization(
    name,
    description,
    contactEmail,
    logoFilename
) {
    const result = await pool.query(
        `INSERT INTO organization
            (name, description, contact_email, logo_filename)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [name, description, contactEmail, logoFilename]
    );

    return result.rows[0];
}

// Update an existing organization
export async function updateOrganization(
    organizationId,
    name,
    description,
    contactEmail,
    logoFilename
) {
    const result = await pool.query(
        `UPDATE organization
         SET name = $1,
             description = $2,
             contact_email = $3,
             logo_filename = $4
         WHERE organization_id = $5
         RETURNING *`,
        [
            name,
            description,
            contactEmail,
            logoFilename,
            organizationId
        ]
    );

    return result.rows[0] || null;
}