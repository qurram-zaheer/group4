'use strict';

/**
 *  commit controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::commit.commit', ({ strapi }) => ({
    // To Fetch and store Pull Requests from Github into our Database
    async getCommmitCountsByBranch(ctx, next) {
        try{
            console.log('here yeah!')
            ctx.body = {
                success: true,
            };
        } catch (err) {
            console.log(err);
            ctx.body = err;
        }
    },
}));
