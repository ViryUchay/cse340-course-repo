import {
    getOrganizationById,
    getOrganizations,
    getProjectsByOrganization,
    createOrganization,
    updateOrganization
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

// Show the create organization form
export function showNewOrganizationPage(req, res) {
    res.render('new-organization', {
        title: 'Create New Organization',
        errors: [],
        organization: {
            name: '',
            description: '',
            contact_email: '',
            logo_filename: ''
        }
    });
}

// Create a new organization
export async function createOrganizationController(req, res, next) {
    try {
        const name = req.body.name?.trim() || '';
        const description = req.body.description?.trim() || '';
        const contactEmail = req.body.contact_email?.trim() || '';
        const logoFilename = req.body.logo_filename?.trim() || '';

        const errors = [];

        // Server-side validation
        if (!name) {
            errors.push('Organization name is required.');
        } else if (name.length > 150) {
            errors.push('Organization name must not exceed 150 characters.');
        }

        if (!description) {
            errors.push('Organization description is required.');
        }

        if (!contactEmail) {
            errors.push('Contact email is required.');
        } else if (contactEmail.length > 255) {
            errors.push('Contact email must not exceed 255 characters.');
        }

        if (!logoFilename) {
            errors.push('Logo filename is required.');
        } else if (logoFilename.length > 255) {
            errors.push('Logo filename must not exceed 255 characters.');
        }

        if (errors.length > 0) {
            return res.status(400).render('new-organization', {
                title: 'Create New Organization',
                errors,
                organization: {
                    name,
                    description,
                    contact_email: contactEmail,
                    logo_filename: logoFilename
                }
            });
        }

        await createOrganization(
            name,
            description,
            contactEmail,
            logoFilename
        );

        res.redirect('/organizations');
    } catch (error) {
        next(error);
    }
}

// Show the edit organization form
export async function showEditOrganizationPage(req, res, next) {
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

        res.render('edit-organization', {
            title: 'Edit Organization',
            errors: [],
            organization
        });
    } catch (error) {
        next(error);
    }
}

// Update an existing organization
export async function updateOrganizationController(req, res, next) {
    try {
        const organizationId = Number.parseInt(req.params.id, 10);

        const name = req.body.name?.trim() || '';
        const description = req.body.description?.trim() || '';
        const contactEmail = req.body.contact_email?.trim() || '';
        const logoFilename = req.body.logo_filename?.trim() || '';

        const errors = [];

        if (Number.isNaN(organizationId)) {
            return res.status(404).render('404', {
                title: 'Organization Not Found'
            });
        }

        // Server-side validation
        if (!name) {
            errors.push('Organization name is required.');
        } else if (name.length > 150) {
            errors.push('Organization name must not exceed 150 characters.');
        }

        if (!description) {
            errors.push('Organization description is required.');
        }

        if (!contactEmail) {
            errors.push('Contact email is required.');
        } else if (contactEmail.length > 255) {
            errors.push('Contact email must not exceed 255 characters.');
        }

        if (!logoFilename) {
            errors.push('Logo filename is required.');
        } else if (logoFilename.length > 255) {
            errors.push('Logo filename must not exceed 255 characters.');
        }

        if (errors.length > 0) {
            return res.status(400).render('edit-organization', {
                title: 'Edit Organization',
                errors,
                organization: {
                    organization_id: organizationId,
                    name,
                    description,
                    contact_email: contactEmail,
                    logo_filename: logoFilename
                }
            });
        }

        const updatedOrganization = await updateOrganization(
            organizationId,
            name,
            description,
            contactEmail,
            logoFilename
        );

        if (!updatedOrganization) {
            return res.status(404).render('404', {
                title: 'Organization Not Found'
            });
        }

        res.redirect(`/organization/${organizationId}`);
    } catch (error) {
        next(error);
    }
}