'use strict';

/**
 * jira-app service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::jira-app.jira-app');
