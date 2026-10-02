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

// Show the create category form
export function showNewCategoryPage(req, res) {
    res.render('new-category', {
        title: 'Create New Category',
        errors: [],
        category: {
            name: ''
        }
    });
}

// Create a new category
export async function createCategoryController(req, res, next) {
    try {
        const name = req.body.name?.trim() || '';
        const errors = [];

        // Server-side validation
        if (!name) {
            errors.push('Category name is required.');
        } else if (name.length < 3) {
            errors.push('Category name must be at least 3 characters.');
        } else if (name.length > 100) {
            errors.push('Category name must not exceed 100 characters.');
        }

        if (errors.length > 0) {
            return res.status(400).render('new-category', {
                title: 'Create New Category',
                errors,
                category: { name }
            });
        }

        await createCategory(name);

        res.redirect('/categories');
    } catch (error) {
        next(error);
    }
}

// Show the edit category form
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

// Update an existing category
export async function updateCategoryController(req, res, next) {
    try {
        const categoryId = Number.parseInt(req.params.id, 10);
        const name = req.body.name?.trim() || '';
        const errors = [];

        if (Number.isNaN(categoryId)) {
            return res.status(404).render('404', {
                title: 'Category Not Found'
            });
        }

        // Server-side validation
        if (!name) {
            errors.push('Category name is required.');
        } else if (name.length < 3) {
            errors.push('Category name must be at least 3 characters.');
        } else if (name.length > 100) {
            errors.push('Category name must not exceed 100 characters.');
        }

        if (errors.length > 0) {
            return res.status(400).render('edit-category', {
                title: 'Edit Category',
                errors,
                category: {
                    category_id: categoryId,
                    name
                }
            });
        }

        const updatedCategory = await updateCategory(categoryId, name);

        if (!updatedCategory) {
            return res.status(404).render('404', {
                title: 'Category Not Found'
            });
        }

        res.redirect(`/category/${categoryId}`);
    } catch (error) {
        next(error);
    }
}