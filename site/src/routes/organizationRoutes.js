
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

import { requireRole } from '../middleware/auth.js';

const router = Router();

// Validation rules for organization forms
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

// Public viewing routes
router.get('/organizations', showOrganizationsPage);
router.get('/organization/:id', showOrganizationDetailsPage);

// Administrator-only creation routes
router.get(
    '/new-organization',
    requireRole('Admin'),
    showNewOrganizationPage
);

router.post(
    '/new-organization',
    requireRole('Admin'),
    organizationValidation,
    createOrganizationController
);

// Administrator-only editing routes
router.get(
    '/edit-organization/:id',
    requireRole('Admin'),
    showEditOrganizationPage
);

router.post(
    '/edit-organization/:id',
    requireRole('Admin'),
    organizationValidation,
    updateOrganizationController
);

export default router;