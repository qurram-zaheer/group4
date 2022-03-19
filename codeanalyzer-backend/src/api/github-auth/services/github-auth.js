'use strict';

/**
 * github-auth service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::github-auth.github-auth');
