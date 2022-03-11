'use strict';

/**
 *  github-auth controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::github-auth.github-auth');
