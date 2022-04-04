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
            select: ['id', 'createdOn'],
            where: {
                username: contributor
            },
            orderBy: { createdOn: 'desc' }
        });
        for (let i = 0; i < prs.length - 1; i++) {
            let difference = (new Date(prs[i].createdOn).getTime() - new Date(prs[i + 1].createdOn).getTime()) / (1000 * 60 * 60 * 24);
            createdOn.push(prs[i].createdOn);
            if (difference != 0) {
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

    // Get Users
    async getUsers(ctx, next) {
        const repository = ctx.request.query['repository'];
        const contributorsSet = [];
        console.log('repository', repository);
        try {
            const contributors = await strapi.db.query('api::pull-request.pull-request').findMany({
                select: ['username'],
                where: {
                    repository: repository
                },
                orderBy: { createdOn: 'desc' }
            });
            for (let i = 0; i < contributors.length; i++) {
                contributorsSet.push(contributors[i].username);
            }
            ctx.body = {
                "contributors": [...new Set(contributorsSet)]
            };
            console.log('data', {
                "contributors": [...new Set(contributorsSet)]
            });
        } catch (err) {
            ctx.body = {
                "contributors": []
            }
        }
    },

    // To Fetch all commits by branches
    async getPullRequestsCountsByBranch(ctx, next) {
        const repository = ctx.request.query['repositoryId'];
        try {
            let result = [];
            const branches = await strapi.db.query('api::pull-request.pull-request').findMany({
                select: ['targetBranch'],
                where: {
                    repository: repository
                },
            });
            const uniqBranches = [...new Set(branches)];
            console.log('uniqBranches', uniqBranches);
            for (var i = 0; i < uniqBranches.length; i++) {
                const branch = uniqBranches[i].targetBranch;
                console.log('branch', branch);
                const count = await strapi.query('api::pull-request.pull-request').count({
                    select: ['targetBranch'],
                    where: {
                        targetBranch: branch
                    }
                });
                console.log('count', count);
                result.push({
                    "branch": branch,
                    "prs": count
                });
            }
            ctx.body = result;
        } catch (err) {
            console.log(err);
            ctx.body = err;
        }
    },

}));
