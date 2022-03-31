'use strict';

/**
 * routine router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = {
    routes: [
      { 
        method: 'GET',
        path: '/restaurants/:category/:id',
        handler: 'Restaurant.findOneByCategory',
      }
    ]
}

module.exports = createCoreRouter('api::routine.routine');
