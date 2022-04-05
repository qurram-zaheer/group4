"use strict";
const Github = require("../../../app/github");

/**
 *  routine controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::routine.routine", ({ strapi }) => ({
  async getBranches(ctx) {
    let results = [];
  },

  // To Fetch and store Pull Requests from Github into our Database
  async getRepositories(ctx, next) {
    let results = [];
    try {
      const repositories = await Github.getRepositories({
        accessToken: ctx.request.query.accessToken,
        owner: ctx.request.query.owner,
        repositoryName: ctx.request.query.repositoryName,
      });
      console.log("repos", repositories);
      Promise.all(
        repositories.map(async (repository) => {
          const repositoryDataModel = {
            name: repository.name,
            user: {
              id: 23,
            },
            url: repository.url,
            owner: repository.owner.login,
            size: repository.size,
          };
          try {
            const uploadRepository = await strapi.db
              .query("api::repository.repository")
              .create({
                data: repositoryDataModel,
              });
            results.push(uploadRepository);
          } catch (err) {
            console.log(err);
          }
        })
      );
      ctx.body = {
        success: true,
      };
    } catch (err) {
      console.log(err);
      ctx.body = err;
    }
  },

  async getAllCommits(ctx, next) {
    console.log("Entered");
    let results = [];
    try {
      console.log("herehehrehehrehrhehr");
      const repositoryId = ctx.request.query.repositoryId;
      const allCommits = await Github.getCommits({
        accessToken: ctx.request.query.accessToken,
        owner: ctx.request.query.owner,
        repositoryName: ctx.request.query.repositoryName,
        repositoryId: ctx.request.query.repositoryId,
        strapiToken: ctx.request.query.strapiToken,
      });

      console.log("Fetched allCommits", repositoryId, allCommits);
      const commitEntries = Promise.all(
        allCommits.map(async (commit) => {
          const commitDataModel = {
            commit_id: commit.sha.substring(0, 6),
            message: commit.message,
            sha: commit.sha,
            authorid: commit.author?.id || '',
            totalchanges: commit.stats?.total,
            totaladditions: commit.stats?.additions,
            totaldeletions: commit.stats?.deletions,
            branch: commit.branch,
            commitdate: new Date(commit.commit.author.date).toISOString(),
            committedfiles: [1],
            repository: repositoryId,
            authorname: commit.author.login,
          };
          const uploadCommitDataModel = await strapi.db
            .query("api::commit.commit")
            .create({
              data: commitDataModel,
            });
          results.push(commitDataModel);
        })
      );
      return commitEntries;
    } catch (err) {
      console.log(err);
    }
  },

  //To Fetch and store Contributors data from Github into our database
  async getAllContributors(ctx, next) {
    const repoId = ctx.request.query.repoId;
    const allCommitsForRepo = await strapi.entityService.findMany(
      "api::commit.commit",
      {
        populate: { repository: true },
        fields: [
          "totalchanges",
          "totaladditions",
          "totaldeletions",
          "authorid",
          "authorname",
        ],
        filters: { repository: { id: { $eq: repoId } } },
      }
    );
    console.log("ALL COMMITS FOR REPOOO", allCommitsForRepo);
    let contributors = {};
    allCommitsForRepo.map((commitData) => {
      const { authorid } = commitData;

      if (!contributors[authorid]) {
        contributors[authorid] = {};
        contributors[authorid].sumadditions = 0;
        contributors[authorid].sumdeletions = 0;
        contributors[authorid].sumchanges = 0;
        contributors[authorid].name = commitData.authorname;
      }
      contributors[authorid].sumadditions =
        contributors[authorid].sumadditions + commitData.totaladditions;
      contributors[authorid].sumdeletions =
        contributors[authorid].sumdeletions + commitData.totaldeletions;
      contributors[authorid].sumchanges =
        contributors[authorid].sumchanges + commitData.totalchanges;
    });
    console.log("No. of contributors", Object.keys(contributors).length);
    console.log(contributors);
    await Promise.all(
      Object.entries(contributors).map(
        async ([authorid, contribObj], index) => {
          console.log("key", authorid), console.log("value", contribObj);
          const contribEntry = {
            name: contribObj.name,
            author_id: authorid,
            sumadditions: contribObj.sumadditions,
            sumdeletions: contribObj.sumdeletions,
            sumchanges: contribObj.sumchanges,
            // publishedAt: new Date().toISOString,
            repository: repoId,
          };
          console.log("contribEntry", contribEntry);
          const entry = await strapi.entityService.create(
            "api::contributor.contributor",
            {
              data: contribEntry,
            }
          );
        }
      )
    );
  },

  // To Fetch and store Pull Requests from Github into our Database
  async getAllPullRequests(ctx, next) {
    let results = [];
    try {
      const repoId = ctx.request.query.repositoryId;
      const pullRequests = await Github.getPullRequests({
        accessToken: ctx.request.query.accessToken,
        owner: ctx.request.query.owner,
        repositoryName: ctx.request.query.repositoryName,
      });
      Promise.all(
        pullRequests.map(async (pullRequest) => {
          const pullRequestDataModel = {
            repository: repoId,
            username: pullRequest.user.login,
            name: pullRequest.title,
            prID: pullRequest.id,
            sourceBranch: pullRequest.head.ref,
            targetBranch: pullRequest.base.ref,
            createdOn: new Date(pullRequest.created_at).toISOString(),
            stateOpen: pullRequest.state == "closed" ? false : true,
            closedOn: new Date(pullRequest.closed_at).toISOString(),
          };
          // const repository = await strapi.db.query('api::pull-request.pull-request');
          // console.log('repository', repository);
          const uploadPRDataModel = await strapi.db
            .query("api::pull-request.pull-request")
            .create({
              data: pullRequestDataModel,
            });
          results.push(uploadPRDataModel);
        })
      );
      ctx.body = {
        success: true,
      };
    } catch (err) {
      console.log(err);
      ctx.body = err;
    }
  },
}));
