import { Router } from 'express';
import { showCategoriesPage, showCategoryDetailsPage } from '../controllers/categoryController.js';

const router = Router();

router.get('/categories', showCategoriesPage);
router.get('/category/:id', showCategoryDetailsPage);

export default router;
