'use strict';

/**
 *  pull-request controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::pull-request.pull-request');
