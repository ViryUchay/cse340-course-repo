import {
    getOrganizationById,
    getOrganizations,
    getProjectsByOrganization
} from '../models/organizations.js';

export async function showOrganizationsPage(req, res, next) {
    try {
        const organizations = await getOrganizations();

        res.render('organizations', {
            title: 'Organizations',
            organizations
        });
    } catch (error) {
        next(error);
    }
}

export async function showOrganizationDetailsPage(req, res, next) {
    try {
        const organizationId = Number.parseInt(req.params.id, 10);

        if (Number.isNaN(organizationId)) {
            return res.status(404).render('404', {
                title: 'Organization Not Found'
            });
        }

        const organization = await getOrganizationById(organizationId);

        if (!organization) {
            return res.status(404).render('404', {
                title: 'Organization Not Found'
            });
        }

        const projects = await getProjectsByOrganization(organizationId);

        res.render('organization-detail', {
            title: organization.name,
            organization,
            projects
        });
    } catch (error) {
        next(error);
    }
}