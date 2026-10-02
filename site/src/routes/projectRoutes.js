import { Router } from 'express';

import {
    showProjectsPage,
    showProjectDetailsPage,
    showNewProjectPage,
    createProjectController,
    showEditProjectPage,
    updateProjectController
} from '../controllers/projectController.js';

const router = Router();

router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);

router.get('/new-project', showNewProjectPage);
router.post('/new-project', createProjectController);

router.get('/edit-project/:id', showEditProjectPage);
router.post('/edit-project/:id', updateProjectController);

export default router;