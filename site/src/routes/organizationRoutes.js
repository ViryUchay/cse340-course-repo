import { Router } from 'express';
import { body } from 'express-validator';

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
        .isLength({ min: 3, max: 150 })
        .withMessage('Organization name must be between 3 and 150 characters.'),

    body('description')
        .trim()
        .notEmpty()
        .withMessage('Organization description is required.')
        .isLength({ min: 3, max: 1000 })
        .withMessage('Organization description must be between 3 and 1000 characters.'),

    body('contact_email')
        .trim()
        .notEmpty()
        .withMessage('Contact email is required.')
        .isEmail()
        .withMessage('Please enter a valid email address.')
        .isLength({ max: 255 })
        .withMessage('Contact email must not exceed 255 characters.'),

    body('logo_filename')
        .trim()
        .notEmpty()
        .withMessage('Logo filename is required.')
        .isLength({ min: 3, max: 255 })
        .withMessage('Logo filename must be between 3 and 255 characters.')
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