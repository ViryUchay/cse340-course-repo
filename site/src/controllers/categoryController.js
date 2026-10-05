import { validationResult } from 'express-validator';

import {
    getCategories,
    getCategoryById,
    getProjectsByCategory,
    createCategory,
    updateCategory
} from '../models/categories.js';

export async function showCategoriesPage(req, res, next) {
    try {
        const categories = await getCategories();

        res.render('categories', {
            title: 'Categories',
            categories
        });
    } catch (error) {
        next(error);
    }
}

export async function showCategoryDetailsPage(req, res, next) {
    try {
        const categoryId = Number.parseInt(req.params.id, 10);

        if (Number.isNaN(categoryId)) {
            return res.status(404).render('404', {
                title: 'Category Not Found'
            });
        }

        const category = await getCategoryById(categoryId);

        if (!category) {
            return res.status(404).render('404', {
                title: 'Category Not Found'
            });
        }

        const projects = await getProjectsByCategory(categoryId);

        res.render('category-detail', {
            title: category.name,
            category,
            projects
        });
    } catch (error) {
        next(error);
    }
}

export function showNewCategoryPage(req, res) {
    res.render('new-category', {
        title: 'Create New Category',
        errors: [],
        category: {
            name: ''
        }
    });
}

export async function createCategoryController(req, res, next) {
    try {
        const errors = validationResult(req).array();
        const name = req.body.name?.trim() || '';

        if (errors.length > 0) {
            return res.status(400).render('new-category', {
                title: 'Create New Category',
                errors: errors.map(error => error.msg),
                category: {
                    name
                }
            });
        }

        await createCategory(name);

        req.flash('success', 'Category created successfully.');

        res.redirect('/categories');
    } catch (error) {
        next(error);
    }
}

export async function showEditCategoryPage(req, res, next) {
    try {
        const categoryId = Number.parseInt(req.params.id, 10);

        if (Number.isNaN(categoryId)) {
            return res.status(404).render('404', {
                title: 'Category Not Found'
            });
        }

        const category = await getCategoryById(categoryId);

        if (!category) {
            return res.status(404).render('404', {
                title: 'Category Not Found'
            });
        }

        res.render('edit-category', {
            title: 'Edit Category',
            errors: [],
            category
        });
    } catch (error) {
        next(error);
    }
}

export async function updateCategoryController(req, res, next) {
    try {

        const categoryId = Number.parseInt(req.params.id, 10);
        const errors = validationResult(req).array();
        const name = req.body.name?.trim() || '';

        if (Number.isNaN(categoryId)) {
            return res.status(404).render('404', {
                title: 'Category Not Found'
            });
        }

        if (errors.length > 0) {
            return res.status(400).render('edit-category', {
                title: 'Edit Category',
                errors: errors.map(error => error.msg),
                category: {
                    category_id: categoryId,
                    name
                }
            });
        }

        const updatedCategory = await updateCategory(
            categoryId,
            name
        );

        if (!updatedCategory) {
            return res.status(404).render('404', {
                title: 'Category Not Found'
            });
        }

        req.flash('success', 'Category updated successfully.');

        res.redirect(`/category/${categoryId}`);
    } catch (error) {
        next(error);
    }
}