'use strict';

/**
 * pull-request router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::pull-request.pull-request');
