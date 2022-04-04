'use strict';

/**
 *  commit controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::commit.commit', ({ strapi }) => ({
    // To Fetch and store Pull Requests from Github into our Database
    async getAll(ctx, next) {
        try {
            ctx.body = {
                success: true,
            };
        } catch (err) {
            console.log(err);
            ctx.body = err;
        }
    },

    // To Fetch all commits by branches
    async getCommmitCountsByBranch(ctx, next) {
        const repository = ctx.request.query['repositoryId'];
        try {
            let result = [];
            const branches = await strapi.db.query('api::commit.commit').findMany({
                select: ['branch'],
                where: {
                    repository: repository
                },
            });
            const uniqBranches = [...new Set(branches)];
            for (var i = 0; i < uniqBranches.length; i++) {
                const branch = uniqBranches[i].branch;
                const count = await strapi.query('api::commit.commit').count({
                    select: ['branch'],
                    where: {
                        branch: branch
                    }
                });
                result.push({
                    "branch": branch,
                    "commits": count
                });
            }
            ctx.body = result;
        } catch (err) {
            console.log(err);
            ctx.body = err;
        }
    },

    // Get the time difference between pull requests of a user
    async getAvgTimeDifferenceBetweenCommits(ctx, next) {
        const accessToken = ctx.request.query['accessToken'];
        const differenceResult = [], createdOn = [];
        const prs = await strapi.db.query('api::commit.commit').findMany({
            select: ['id', 'commitdate'],
            orderBy: { commitdate: 'desc' }
        });
        for (let i = 0; i < prs.length - 1; i++) {
            let difference = (new Date(prs[i].commitdate).getTime() - new Date(prs[i + 1].commitdate).getTime()) / (1000 * 60 * 60 * 24);
            createdOn.push(prs[i].commitdate);
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
}));
