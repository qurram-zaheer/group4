"use strict";

/**
 *  commit controller
 */

const htmlTemplate = "../../../config/templates/daily-summary.html";
const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::commit.commit", ({ strapi }) => ({

  // To Fetch all commits by branches
  async getCommmitCountsByBranch(ctx, next) {
    const repository = ctx.request.query["repositoryId"];
    try {
      let result = [];
      const branches = await strapi.db.query("api::commit.commit").findMany({
        select: ["branch"],
        where: {
          repository: repository,
        },
      });
      const uniqBranches = [...new Set(branches)];
      for (var i = 0; i < uniqBranches.length; i++) {
        const branch = uniqBranches[i].branch;
        const count = await strapi.query("api::commit.commit").count({
          select: ["branch"],
          where: {
            branch: branch,
          },
        });
        result.push({
          branch: branch,
          commits: count,
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
    const accessToken = ctx.request.query["accessToken"];
    const repository = ctx.request.query["repositoryId"];
    console.log("repository", repository);
    const differenceResult = [],
      createdOn = [];
    const prs = await strapi.db.query("api::commit.commit").findMany({
      select: ["id", "commitdate"],
      where: {
        repository: repository,
      },
      orderBy: { commitdate: "desc" },
    });
    console.log("prs", prs);
    for (let i = 0; i < prs.length - 1; i++) {
      let difference =
        (new Date(prs[i].commitdate).getTime() -
          new Date(prs[i + 1].commitdate).getTime()) /
        (1000 * 60 * 60 * 24);
      createdOn.push(prs[i].commitdate);
      if (difference != 0) {
        differenceResult.push(difference);
      }
    }
    ctx.body = {
      createdOn: createdOn,
      difference: differenceResult,
    };
    console.log("data", {
      createdOn: createdOn,
      difference: differenceResult,
    });
  },

  async getCommitsByHour(ctx) {
    const repositoryId = ctx.request.query.repositoryId;
    const repoCommits = await strapi.db.query("api::commit.commit").findMany({
      select: ["id", "commit_id", "commitdate", "authoravatar"],
      populate: { repository: true },
      where: {
        repository: {
          id: {
            $eq: repositoryId,
          },
        },
      },
    });

    const hours = {};
    for (let i = 0; i < 24; i++) {
      hours[i] = 0;
    }
    repoCommits.map((commit) => {
      const h = new Date(commit.commitdate).getHours();
      hours[h] = hours[h] + 1;
    });
    return hours;
  },

  async getUserLanguageEffort(ctx) {
    const repositoryId = ctx.request.query.repositoryId;
    const repoCommits = await strapi.db.query("api::commit.commit").findMany({
      populate: true,
      where: {
        repository: {
          id: {
            $eq: repositoryId,
          },
        },
      },
    });
    console.log(repoCommits);
    /*
        userEffortObj = {
            language: {
                userId: {
                    totalchanges
                }
            }
            ...
        } 
    */
    let userEffortObj = {};

    repoCommits.map((commit) => {
      const { authorname } = commit;
      const { authoravatar } = commit;
      commit.committedfiles.map((file) => {
        const pathArr = file.filename.split("/");
        let lastToken = pathArr[pathArr.length - 1];
        const extensionArr = lastToken.split(".");
        lastToken = extensionArr[extensionArr.length - 1];
        console.log(lastToken);

        if (!userEffortObj[lastToken]) {
          userEffortObj[lastToken] = {};
        }
        if (!userEffortObj[lastToken][authorname]) {
          userEffortObj[lastToken][authorname] = 0;
          // userEffortObj[lastToken][authorname] = authoravatar;
        }
        userEffortObj[lastToken][authorname] =
          userEffortObj[lastToken][authorname] + file.totalchanges;
      });
    });

    return userEffortObj;
  },

  async getCommitRefactoringsByTime(ctx) {
    const repositoryId = ctx.request.query.repositoryId;
    const repoCommits = await strapi.db.query("api::commit.commit").findMany({
      select: ["id", "commit_id", "commitdate", "totalchanges"],
      populate: { repository: true },
      where: {
        repository: {
          id: {
            $eq: repositoryId,
          },
        },
      },
      orderBy: { commitdate: "desc" },
    });
    return repoCommits;
  },

  async getTotalRefactoringsForRepo(ctx) {
    const repositoryId = ctx.request.query.repositoryId;
    const repoCommits = await strapi.db.query("api::commit.commit").count({
      where: {
        repository: {
          id: {
            $eq: repositoryId,
          },
        },
        orderBy: { commitdate: "desc" },
      },
    });
    return repoCommits;
  },

  async getTotalRefactorings(ctx) {
    const repoCommits = await strapi.db.query("api::commit.commit").findMany({
      select: ["totalchanges"],
    });
    console.log("repoCommits", repoCommits);
    return repoCommits
      .map((changes) => changes.totalchanges)
      .reduce((a, b) => a + b);
  },

  async getCommitsCountByRepo(ctx) {
    const repoCommits = await strapi.db.query("api::commit.commit").findMany({
      select: ["id"],
      populate: { repository: true },
    });
    const result = {};
    repoCommits.map((commit) => {
      if (
        result[commit.repository.name] == null ||
        result[commit.repository.name] == undefined
      ) {
        result[commit.repository.name] = 0;
      } else {
        result[commit.repository.name] = result[commit.repository.name] + 1;
      }
    });
    return result;
  },
}));
