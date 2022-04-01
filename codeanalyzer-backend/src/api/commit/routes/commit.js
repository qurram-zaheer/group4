'use strict';

/**
 * commit router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::commit.commit');
