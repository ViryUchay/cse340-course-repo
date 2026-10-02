import {
    getAllProjects,
    getProjectDetails,
    createProject,
    updateProject
} from '../models/projects.js';

import { getCategoriesByProject } from '../models/categories.js';
import { getOrganizations } from '../models/organizations.js';

const showProjectsPage = async (req, res, next) => {
    try {
        const projects = await getAllProjects();

        res.render('projects', {
            title: 'Service Projects',
            projects
        });
    } catch (error) {
        next(error);
    }
};

const showProjectDetailsPage = async (req, res, next) => {
    try {
        const projectId = Number.parseInt(req.params.id, 10);

        if (Number.isNaN(projectId)) {
            return res.status(404).render('404', {
                title: 'Project Not Found'
            });
        }

        const project = await getProjectDetails(projectId);

        if (!project) {
            return res.status(404).render('404', {
                title: 'Project Not Found'
            });
        }

        const categories = await getCategoriesByProject(projectId);

        res.render('project-detail', {
            title: project.title,
            project,
            categories
        });
    } catch (error) {
        next(error);
    }
};

const showNewProjectPage = async (req, res, next) => {
    try {
        const organizations = await getOrganizations();

        res.render('new-project', {
            title: 'Create New Service Project',
            errors: [],
            organizations,
            project: {
                organization_id: '',
                title: '',
                description: '',
                location: '',
                project_date: ''
            }
        });
    } catch (error) {
        next(error);
    }
};

const createProjectController = async (req, res, next) => {
    try {
        const organizationId = Number.parseInt(req.body.organization_id, 10);
        const title = req.body.title?.trim() || '';
        const description = req.body.description?.trim() || '';
        const location = req.body.location?.trim() || '';
        const projectDate = req.body.project_date?.trim() || '';

        const errors = [];

        if (Number.isNaN(organizationId)) {
            errors.push('Organization is required.');
        }

        if (!title) {
            errors.push('Project title is required.');
        } else if (title.length > 150) {
            errors.push('Project title must not exceed 150 characters.');
        }

        if (!description) {
            errors.push('Project description is required.');
        }

        if (!location) {
            errors.push('Project location is required.');
        } else if (location.length > 150) {
            errors.push('Project location must not exceed 150 characters.');
        }

        if (!projectDate) {
            errors.push('Project date is required.');
        }

        if (errors.length > 0) {
            const organizations = await getOrganizations();

            return res.status(400).render('new-project', {
                title: 'Create New Service Project',
                errors,
                organizations,
                project: {
                    organization_id: organizationId,
                    title,
                    description,
                    location,
                    project_date: projectDate
                }
            });
        }

        await createProject(
            organizationId,
            title,
            description,
            location,
            projectDate
        );

        res.redirect('/projects');
    } catch (error) {
        next(error);
    }
};

const showEditProjectPage = async (req, res, next) => {
    try {
        const projectId = Number.parseInt(req.params.id, 10);

        if (Number.isNaN(projectId)) {
            return res.status(404).render('404', {
                title: 'Project Not Found'
            });
        }

        const project = await getProjectDetails(projectId);

        console.log('PROJECT DATE:', project.project_date);
        console.log('PROJECT DATE TYPE:', typeof project.project_date);

        if (!project) {
            return res.status(404).render('404', {
                title: 'Project Not Found'
            });
        }

        const organizations = await getOrganizations();

        const formattedProject = {
            ...project,
            project_date: project.project_date
                ? new Date(project.project_date).toISOString().split('T')[0]
                : ''
        };

        res.render('edit-project', {
            title: 'Edit Service Project',
            errors: [],
            organizations,
            project: formattedProject
        });
    } catch (error) {
        next(error);
    }
};

const updateProjectController = async (req, res, next) => {
    try {
        const projectId = Number.parseInt(req.params.id, 10);
        const organizationId = Number.parseInt(req.body.organization_id, 10);
        const title = req.body.title?.trim() || '';
        const description = req.body.description?.trim() || '';
        const location = req.body.location?.trim() || '';
        const projectDate = req.body.project_date?.trim() || '';

        if (Number.isNaN(projectId)) {
            return res.status(404).render('404', {
                title: 'Project Not Found'
            });
        }

        const errors = [];

        if (Number.isNaN(organizationId)) {
            errors.push('Organization is required.');
        }

        if (!title) {
            errors.push('Project title is required.');
        } else if (title.length > 150) {
            errors.push('Project title must not exceed 150 characters.');
        }

        if (!description) {
            errors.push('Project description is required.');
        }

        if (!location) {
            errors.push('Project location is required.');
        } else if (location.length > 150) {
            errors.push('Project location must not exceed 150 characters.');
        }

        if (!projectDate) {
            errors.push('Project date is required.');
        }

        if (errors.length > 0) {
            const organizations = await getOrganizations();

            return res.status(400).render('edit-project', {
                title: 'Edit Service Project',
                errors,
                organizations,
                project: {
                    project_id: projectId,
                    organization_id: organizationId,
                    title,
                    description,
                    location,
                    project_date: projectDate
                }
            });
        }

        const updatedProject = await updateProject(
            projectId,
            organizationId,
            title,
            description,
            location,
            projectDate
        );

        if (!updatedProject) {
            return res.status(404).render('404', {
                title: 'Project Not Found'
            });
        }

        res.redirect(`/project/${projectId}`);
    } catch (error) {
        next(error);
    }
};

export {
    showProjectsPage,
    showProjectDetailsPage,
    showNewProjectPage,
    createProjectController,
    showEditProjectPage,
    updateProjectController
};