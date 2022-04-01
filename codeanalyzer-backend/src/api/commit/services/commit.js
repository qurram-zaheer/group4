'use strict';

/**
 * commit service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::commit.commit');
