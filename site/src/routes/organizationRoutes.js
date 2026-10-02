import { Router } from 'express';

import {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationPage,
    createOrganizationController,
    showEditOrganizationPage,
    updateOrganizationController
} from '../controllers/organizationController.js';

const router = Router();

router.get('/organizations', showOrganizationsPage);
router.get('/organization/:id', showOrganizationDetailsPage);

router.get('/new-organization', showNewOrganizationPage);
router.post('/new-organization', createOrganizationController);

router.get('/edit-organization/:id', showEditOrganizationPage);
router.post('/edit-organization/:id', updateOrganizationController);

export default router;