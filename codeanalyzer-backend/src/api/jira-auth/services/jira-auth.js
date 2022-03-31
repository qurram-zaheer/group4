'use strict';

/**
 * jira-auth service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::jira-auth.jira-auth');
