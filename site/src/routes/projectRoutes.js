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

const router = Router();

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

router.get('/projects', showProjectsPage);

router.get('/project/:id', showProjectDetailsPage);

router.get('/new-project', showNewProjectPage);

router.post(
    '/new-project',
    projectValidation,
    createProjectController
);

router.get('/edit-project/:id', showEditProjectPage);

router.post(
    '/edit-project/:id',
    projectValidation,
    updateProjectController
);

router.post(
    '/project/:id/categories',
    updateProjectCategoriesController
);

export default router;