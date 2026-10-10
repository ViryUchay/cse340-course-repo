
import { Router } from 'express';
import { body } from 'express-validator';

import {
    showProjectsPage,
    showProjectDetailsPage,
    showNewProjectPage,
    createProjectController,
    showEditProjectPage,
    updateProjectController,
    updateProjectCategoriesController
} from '../controllers/projectController.js';

import { requireRole } from '../middleware/auth.js';

const router = Router();

// Validation rules for project forms
const projectValidation = [
    body('organization_id')
        .trim()
        .notEmpty()
        .withMessage('Organization is required.')
        .isInt({ min: 1 })
        .withMessage('Please select a valid organization.'),

    body('title')
        .trim()
        .notEmpty()
        .withMessage('Project title is required.')
        .isLength({ min: 3, max: 150 })
        .withMessage('Project title must be between 3 and 150 characters.'),

    body('description')
        .trim()
        .notEmpty()
        .withMessage('Project description is required.')
        .isLength({ min: 3, max: 1000 })
        .withMessage('Project description must be between 3 and 1000 characters.'),

    body('location')
        .trim()
        .notEmpty()
        .withMessage('Project location is required.')
        .isLength({ min: 2, max: 150 })
        .withMessage('Project location must be between 2 and 150 characters.'),

    body('project_date')
        .trim()
        .notEmpty()
        .withMessage('Project date is required.')
        .isISO8601({ strict: true })
        .withMessage('Please enter a valid project date.')
];

// Public viewing routes
router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);

// Administrator-only creation routes
router.get(
    '/new-project',
    requireRole('Admin'),
    showNewProjectPage
);

router.post(
    '/new-project',
    requireRole('Admin'),
    projectValidation,
    createProjectController
);

// Administrator-only editing routes
router.get(
    '/edit-project/:id',
    requireRole('Admin'),
    showEditProjectPage
);

router.post(
    '/edit-project/:id',
    requireRole('Admin'),
    projectValidation,
    updateProjectController
);

// Administrator-only category reassignment
router.post(
    '/project/:id/categories',
    requireRole('Admin'),
    updateProjectCategoriesController
);

export default router;