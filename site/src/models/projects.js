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

const createProject = async (
    organizationId,
    title,
    description,
    location,
    projectDate
) => {
    const result = await pool.query(
        `INSERT INTO service_project
            (organization_id, title, description, location, project_date)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [
            organizationId,
            title,
            description,
            location,
            projectDate
        ]
    );

    return result.rows[0];
};

const updateProject = async (
    projectId,
    organizationId,
    title,
    description,
    location,
    projectDate
) => {
    const result = await pool.query(
        `UPDATE service_project
         SET organization_id = $1,
             title = $2,
             description = $3,
             location = $4,
             project_date = $5
         WHERE project_id = $6
         RETURNING *`,
        [
            organizationId,
            title,
            description,
            location,
            projectDate,
            projectId
        ]
    );

    return result.rows[0] || null;
};

export {
    getAllProjects,
    getProjectsByOrganizationId,
    getUpcomingProjects,
    getProjectDetails,
    createProject,
    updateProject
};