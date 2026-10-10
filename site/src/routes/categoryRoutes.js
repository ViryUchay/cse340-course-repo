
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

import { requireRole } from '../middleware/auth.js';

const router = Router();

// Validation rules for category forms
const categoryValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Category name is required.')
        .isLength({ min: 3, max: 100 })
        .withMessage('Category name must be between 3 and 100 characters.')
];

// Public viewing routes
router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage);

// Administrator-only creation routes
router.get(
    '/new-category',
    requireRole('Admin'),
    showNewCategoryPage
);

router.post(
    '/new-category',
    requireRole('Admin'),
    categoryValidation,
    createCategoryController
);

// Administrator-only editing routes
router.get(
    '/edit-category/:id',
    requireRole('Admin'),
    showEditCategoryPage
);

router.post(
    '/edit-category/:id',
    requireRole('Admin'),
    categoryValidation,
    updateCategoryController
);

export default router;