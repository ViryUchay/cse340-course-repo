import pool from '../database.js';

const getAllProjects = async () => {
    const result = await pool.query(
        `SELECT sp.*, o.name AS organization_name
         FROM service_project sp
         JOIN organization o ON sp.organization_id = o.organization_id
         ORDER BY sp.project_date`
    );
    return result.rows;
};

const getProjectsByOrganizationId = async (organizationId) => {
    const result = await pool.query(
        `SELECT *
         FROM service_project
         WHERE organization_id = $1
         ORDER BY project_date`,
        [organizationId]
    );
    return result.rows;
};

const getUpcomingProjects = async (limit = 5) => {
    const result = await pool.query(
        `SELECT sp.*, o.name AS organization_name
         FROM service_project sp
         JOIN organization o ON sp.organization_id = o.organization_id
         WHERE sp.project_date >= CURRENT_DATE
         ORDER BY sp.project_date
         LIMIT $1`,
        [limit]
    );
    return result.rows;
};

const getProjectDetails = async (projectId) => {
    const result = await pool.query(
        `SELECT sp.*, o.name AS organization_name
         FROM service_project sp
         JOIN organization o ON sp.organization_id = o.organization_id
         WHERE sp.project_id = $1`,
        [projectId]
    );
    return result.rows[0];
};

export { getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails };