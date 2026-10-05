import { validationResult } from 'express-validator';

import {
    getOrganizationById,
    getOrganizations,
    getProjectsByOrganization,
    createOrganization,
    updateOrganization
} from '../models/organizations.js';

const showOrganizationsPage = async (req, res, next) => {
    try {
        const organizations = await getOrganizations();

        res.render('organizations', {
            title: 'Organizations',
            organizations
        });
    } catch (error) {
        next(error);
    }
};

const showOrganizationDetailsPage = async (req, res, next) => {
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
};

const showNewOrganizationPage = (req, res) => {
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
};

const createOrganizationController = async (req, res, next) => {
    try {
        const errors = validationResult(req).array();

        const name = req.body.name?.trim() || '';
        const description = req.body.description?.trim() || '';
        const contactEmail = req.body.contact_email?.trim() || '';
        const logoFilename = req.body.logo_filename?.trim() || '';

        if (errors.length > 0) {
            return res.status(400).render('new-organization', {
                title: 'Create New Organization',
                errors: errors.map(error => error.msg),
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

        req.flash('success', 'Organization created successfully.');

        res.redirect('/organizations');
    } catch (error) {
        next(error);
    }
};

const showEditOrganizationPage = async (req, res, next) => {
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
};

const updateOrganizationController = async (req, res, next) => {
    try {
        const organizationId = Number.parseInt(req.params.id, 10);
        const errors = validationResult(req).array();

        const name = req.body.name?.trim() || '';
        const description = req.body.description?.trim() || '';
        const contactEmail = req.body.contact_email?.trim() || '';
        const logoFilename = req.body.logo_filename?.trim() || '';

        if (Number.isNaN(organizationId)) {
            return res.status(404).render('404', {
                title: 'Organization Not Found'
            });
        }

        if (errors.length > 0) {
            return res.status(400).render('edit-organization', {
                title: 'Edit Organization',
                errors: errors.map(error => error.msg),
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

        req.flash('success', 'Organization updated successfully.');

        res.redirect(`/organization/${organizationId}`);
    } catch (error) {
        next(error);
    }
};

export {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationPage,
    createOrganizationController,
    showEditOrganizationPage,
    updateOrganizationController
};