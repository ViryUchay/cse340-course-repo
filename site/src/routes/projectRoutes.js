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
        .isInt()
        .withMessage('Please select a valid organization.'),

    body('title')
        .trim()
        .notEmpty()
        .withMessage('Project title is required.')
        .isLength({ max: 150 })
        .withMessage('Project title must not exceed 150 characters.'),

    body('description')
        .trim()
        .notEmpty()
        .withMessage('Project description is required.'),

    body('location')
        .trim()
        .notEmpty()
        .withMessage('Project location is required.')
        .isLength({ max: 150 })
        .withMessage('Project location must not exceed 150 characters.'),

    body('project_date')
        .trim()
        .notEmpty()
        .withMessage('Project date is required.')
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