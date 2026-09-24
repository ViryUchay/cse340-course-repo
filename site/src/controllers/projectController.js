import { getUpcomingProjects, getProjectDetails } from '../models/projects.js';
import { getCategoriesByProject } from '../models/categories.js';

const showProjectsPage = async (req, res, next) => {
    try {
        const projects = await getUpcomingProjects(5);
        res.render('projects', { title: 'Service Projects', projects });
    } catch (error) {
        next(error);
    }
};

const showProjectDetailsPage = async (req, res, next) => {
    try {
        const projectId = Number.parseInt(req.params.id, 10);
        if (Number.isNaN(projectId)) {
            return res.status(404).render('404', { title: 'Project Not Found' });
        }

        const project = await getProjectDetails(projectId);
        if (!project) {
            return res.status(404).render('404', { title: 'Project Not Found' });
        }

        const categories = await getCategoriesByProject(projectId);
        res.render('project-detail', { title: project.title, project, categories });
    } catch (error) {
        next(error);
    }
};

// Export any controller functions
export { showProjectsPage, showProjectDetailsPage };