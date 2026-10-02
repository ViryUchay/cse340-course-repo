import { Router } from 'express';

import {
    showCategoriesPage,
    showCategoryDetailsPage,
    showNewCategoryPage,
    createCategoryController,
    showEditCategoryPage,
    updateCategoryController
} from '../controllers/categoryController.js';

const router = Router();

router.get('/categories', showCategoriesPage);

router.get('/category/:id', showCategoryDetailsPage);

router.get('/new-category', showNewCategoryPage);

router.post('/new-category', createCategoryController);

router.get('/edit-category/:id', showEditCategoryPage);

router.post('/edit-category/:id', updateCategoryController);

export default router;