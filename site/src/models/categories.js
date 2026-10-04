import pool from '../database.js';

const getCategories = async () => {
  try {
    const result = await pool.query(
      'SELECT * FROM categories ORDER BY name'
    );
    return result.rows;
  } catch (err) {
    throw new Error(`Database error in getCategories: ${err.message}`);
  }
};

const getCategoryById = async (categoryId) => {
  try {
    const result = await pool.query(
      `SELECT *
             FROM categories
             WHERE category_id = $1`,
      [categoryId]
    );

    return result.rows.length ? result.rows[0] : null;
  } catch (err) {
    throw new Error(`Database error in getCategoryById: ${err.message}`);
  }
};

const createCategory = async (name) => {
  try {
    const result = await pool.query(
      `INSERT INTO categories (name)
             VALUES ($1)
             RETURNING *`,
      [name]
    );

    return result.rows[0];
  } catch (err) {
    throw new Error(`Database error in createCategory: ${err.message}`);
  }
};

const updateCategory = async (categoryId, name) => {
  try {
    const result = await pool.query(
      `UPDATE categories
             SET name = $1
             WHERE category_id = $2
             RETURNING *`,
      [name, categoryId]
    );

    return result.rows.length ? result.rows[0] : null;
  } catch (err) {
    throw new Error(`Database error in updateCategory: ${err.message}`);
  }
};

const getProjectsByCategory = async (categoryId) => {
  try {
    const result = await pool.query(
      `SELECT sp.*, o.name AS organization_name
             FROM service_project sp
             JOIN project_categories pc
               ON sp.project_id = pc.project_id
             JOIN organization o
               ON sp.organization_id = o.organization_id
             WHERE pc.category_id = $1
             ORDER BY sp.project_date`,
      [categoryId]
    );

    return result.rows;
  } catch (err) {
    throw new Error(`Database error in getProjectsByCategory: ${err.message}`);
  }
};

const getCategoriesByProject = async (projectId) => {
  try {
    const result = await pool.query(
      `SELECT c.*
             FROM categories c
             JOIN project_categories pc
               ON c.category_id = pc.category_id
             WHERE pc.project_id = $1
             ORDER BY c.name`,
      [projectId]
    );

    return result.rows;
  } catch (err) {
    throw new Error(`Database error in getCategoriesByProject: ${err.message}`);
  }
};

const updateProjectCategories = async (projectId, categoryIds) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    await client.query(
      `DELETE FROM project_categories
             WHERE project_id = $1`,
      [projectId]
    );

    for (const categoryId of categoryIds) {
      await client.query(
        `INSERT INTO project_categories (project_id, category_id)
                 VALUES ($1, $2)`,
        [projectId, categoryId]
      );
    }

    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw new Error(
      `Database error in updateProjectCategories: ${err.message}`
    );
  } finally {
    client.release();
  }
};

export {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  getProjectsByCategory,
  getCategoriesByProject,
  updateProjectCategories
};