'use strict';

/**
 * github-auth router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::github-auth.github-auth');
