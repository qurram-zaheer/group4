'use strict';

/**
 *  pull-request controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::pull-request.pull-request', ({ strapi }) => ({

    // Get the time difference between pull requests of a user
    async getAvgTimeDifferenceBetweenPullRequests(ctx, next) {
        const accessToken = ctx.request.query['accessToken'];
        const contributor = ctx.request.query['contributor'];
        const differenceResult = [], createdOn = [];
        const prs = await strapi.db.query('api::pull-request.pull-request').findMany({
            select:['id','createdOn'],
            where: {
                username: contributor
            },
            orderBy: { createdOn: 'desc' }
        });
        for(let i = 0; i < prs.length - 1; i++){
            let difference = (new Date(prs[i].createdOn).getTime() - new Date(prs[i+1].createdOn).getTime()) / (1000*60*60*24);
            createdOn.push(prs[i].createdOn);
            if(difference != 0){
                differenceResult.push(difference);
            }
        }
        ctx.body = {
            "createdOn": createdOn,
            "difference": differenceResult
        };
        console.log('data', {
            "createdOn": createdOn,
            "difference": differenceResult
        });
    },

}));
