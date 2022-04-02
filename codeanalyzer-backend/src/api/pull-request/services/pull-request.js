'use strict';

/**
 * pull-request service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::pull-request.pull-request');
