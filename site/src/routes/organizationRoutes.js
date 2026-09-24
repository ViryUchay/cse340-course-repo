import { Router } from 'express';
import { showOrganizationsPage, showOrganizationDetailsPage } from '../controllers/organizationController.js';

const router = Router();

router.get('/organizations', showOrganizationsPage);
router.get('/organization/:id', showOrganizationDetailsPage);

export default router;
