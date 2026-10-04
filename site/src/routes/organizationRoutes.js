import { Router } from 'express';
import { body, validationResult } from 'express-validator';

import {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationPage,
    createOrganizationController,
    showEditOrganizationPage,
    updateOrganizationController
} from '../controllers/organizationController.js';

const router = Router();

const organizationValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Organization name is required.')
        .isLength({ max: 150 })
        .withMessage('Organization name must not exceed 150 characters.'),

    body('description')
        .trim()
        .notEmpty()
        .withMessage('Organization description is required.'),

    body('contact_email')
        .trim()
        .notEmpty()
        .withMessage('Contact email is required.')
        .isLength({ max: 255 })
        .withMessage('Contact email must not exceed 255 characters.'),

    body('logo_filename')
        .trim()
        .notEmpty()
        .withMessage('Logo filename is required.')
        .isLength({ max: 255 })
        .withMessage('Logo filename must not exceed 255 characters.')
];

router.get('/organizations', showOrganizationsPage);

router.get('/organization/:id', showOrganizationDetailsPage);

router.get('/new-organization', showNewOrganizationPage);

router.post(
    '/new-organization',
    organizationValidation,
    createOrganizationController
);

router.get('/edit-organization/:id', showEditOrganizationPage);

router.post(
    '/edit-organization/:id',
    organizationValidation,
    updateOrganizationController
);

export default router;