import pool from '../database.js';

export async function getCategories() {
    const result = await pool.query('SELECT * FROM categories ORDER BY name');
    return result.rows;
}

export async function getCategoryById(categoryId) {
    const result = await pool.query(
        'SELECT * FROM categories WHERE category_id = $1',
        [categoryId]
    );
    return result.rows[0];
}

export async function getProjectsByCategory(categoryId) {
    const result = await pool.query(
        `SELECT sp.*, o.name AS organization_name
         FROM service_project sp
         JOIN project_categories pc ON sp.project_id = pc.project_id
         JOIN organization o ON sp.organization_id = o.organization_id
         WHERE pc.category_id = $1
         ORDER BY sp.project_date`,
        [categoryId]
    );
    return result.rows;
}

export async function getCategoriesByProject(projectId) {
    const result = await pool.query(
        `SELECT c.*
         FROM categories c
         JOIN project_categories pc ON c.category_id = pc.category_id
         WHERE pc.project_id = $1
         ORDER BY c.name`,
        [projectId]
    );
    return result.rows;
}
