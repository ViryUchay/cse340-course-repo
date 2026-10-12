
import pool from '../database.js';

// ============================================
// Retrieve Service Projects
// ============================================

const getAllProjects = async () => {
    const result = await pool.query(
        `SELECT sp.*, o.name AS organization_name
         FROM service_project sp
         JOIN organization o
           ON sp.organization_id = o.organization_id
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
         JOIN organization o
           ON sp.organization_id = o.organization_id
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
         JOIN organization o
           ON sp.organization_id = o.organization_id
         WHERE sp.project_id = $1`,
        [projectId]
    );

    return result.rows[0] || null;
};

// ============================================
// Create and Update Service Projects
// ============================================

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

// ============================================
// Volunteer Model Functions
// ============================================

// Add an account as a volunteer for a project.
// The composite primary key prevents duplicate signups.
const addVolunteer = async (projectId, accountId) => {
    const result = await pool.query(
        `INSERT INTO project_volunteers
            (project_id, account_id)
         VALUES ($1, $2)
         ON CONFLICT (project_id, account_id) DO NOTHING
         RETURNING project_id, account_id`,
        [projectId, accountId]
    );

    return result.rows[0] || null;
};

// Remove an account's volunteer signup for a project.
const removeVolunteer = async (projectId, accountId) => {
    const result = await pool.query(
        `DELETE FROM project_volunteers
         WHERE project_id = $1
           AND account_id = $2
         RETURNING project_id, account_id`,
        [projectId, accountId]
    );

    return result.rows[0] || null;
};

// Check whether an account has volunteered for a project.
const isAccountVolunteering = async (projectId, accountId) => {
    const result = await pool.query(
        `SELECT 1
         FROM project_volunteers
         WHERE project_id = $1
           AND account_id = $2
         LIMIT 1`,
        [projectId, accountId]
    );

    return result.rowCount > 0;
};

// Retrieve all projects for which an account has volunteered.
const getVolunteerProjectsByAccountId = async (accountId) => {
    const result = await pool.query(
        `SELECT
             sp.*,
             o.name AS organization_name
         FROM project_volunteers pv
         JOIN service_project sp
           ON pv.project_id = sp.project_id
         JOIN organization o
           ON sp.organization_id = o.organization_id
         WHERE pv.account_id = $1
         ORDER BY sp.project_date, sp.title`,
        [accountId]
    );

    return result.rows;
};

// ============================================
// Exports
// ============================================

export {
    getAllProjects,
    getProjectsByOrganizationId,
    getUpcomingProjects,
    getProjectDetails,
    createProject,
    updateProject,
    addVolunteer,
    removeVolunteer,
    isAccountVolunteering,
    getVolunteerProjectsByAccountId
};