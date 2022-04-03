'use strict';

/**
 *  contributor controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::contributor.contributor', ({strapi}) => ({

async getCounts(ctx) {
    return strapi.query('api::contributor.contributor').count();
}

}));
