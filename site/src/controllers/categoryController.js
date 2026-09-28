import {
    getCategories,
    getCategoryById,
    getProjectsByCategory
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
