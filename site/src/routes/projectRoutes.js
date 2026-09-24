import { Router } from 'express';
import { showProjectsPage, showProjectDetailsPage } from '../controllers/projectController.js';

const router = Router();

router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);

export default router;