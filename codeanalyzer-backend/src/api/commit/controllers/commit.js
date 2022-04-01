'use strict';

/**
 *  commit controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::commit.commit');
