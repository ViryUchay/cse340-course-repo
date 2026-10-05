import { Router } from 'express';
import { body } from 'express-validator';

import {
    showCategoriesPage,
    showCategoryDetailsPage,
    showNewCategoryPage,
    createCategoryController,
    showEditCategoryPage,
    updateCategoryController
} from '../controllers/categoryController.js';

const router = Router();

const categoryValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Category name is required.')
        .isLength({ min: 3, max: 100 })
        .withMessage('Category name must be between 3 and 100 characters.')
];

router.get('/categories', showCategoriesPage);

router.get('/category/:id', showCategoryDetailsPage);

router.get('/new-category', showNewCategoryPage);

router.post(
    '/new-category',
    categoryValidation,
    createCategoryController
);

router.get('/edit-category/:id', showEditCategoryPage);

router.post(
    '/edit-category/:id',
    categoryValidation,
    updateCategoryController
);

export default router;