
import { Router } from 'express';
import { body } from 'express-validator';

import {
    showProjectsPage,
    showProjectDetailsPage,
    showNewProjectPage,
    createProjectController,
    showEditProjectPage,
    updateProjectController,
    updateProjectCategoriesController,
    volunteerForProjectController,
    removeVolunteerController
} from '../controllers/projectController.js';

import {
    requireLogin,
    requireRole
} from '../middleware/auth.js';

const router = Router();

// ============================================
// Validation Rules for Project Forms
// ============================================

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
        .withMessage(
            'Project title must be between 3 and 150 characters.'
        ),

    body('description')
        .trim()
        .notEmpty()
        .withMessage('Project description is required.')
        .isLength({ min: 3, max: 1000 })
        .withMessage(
            'Project description must be between 3 and 1000 characters.'
        ),

    body('location')
        .trim()
        .notEmpty()
        .withMessage('Project location is required.')
        .isLength({ min: 2, max: 150 })
        .withMessage(
            'Project location must be between 2 and 150 characters.'
        ),

    body('project_date')
        .trim()
        .notEmpty()
        .withMessage('Project date is required.')
        .isISO8601({ strict: true })
        .withMessage('Please enter a valid project date.')
];

// ============================================
// Public Project Viewing Routes
// ============================================

router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);

// ============================================
// Authenticated Volunteer Routes
// ============================================

// Sign up to volunteer for a project.
router.post(
    '/project/:id/volunteer',
    requireLogin,
    volunteerForProjectController
);

// Cancel a volunteer signup.
router.post(
    '/project/:id/volunteer/remove',
    requireLogin,
    removeVolunteerController
);

// ============================================
// Administrator-Only Creation Routes
// ============================================

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

// ============================================
// Administrator-Only Editing Routes
// ============================================

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

// ============================================
// Administrator-Only Category Reassignment
// ============================================

router.post(
    '/project/:id/categories',
    requireRole('Admin'),
    updateProjectCategoriesController
);

export default router;