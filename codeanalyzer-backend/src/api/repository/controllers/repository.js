"use strict";

/**
 *  repository controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
const axios = require("axios");
const Github = require("../../../app/github");

module.exports = createCoreController(
  "api::repository.repository",
  ({ strapi }) => ({
    async create(ctx) {
      const { data } = ctx.request.body;
      const repoUrls = data.urls;
      const githubUser = data.user;
      const strapiUserId = githubUser.id;
      console.log("request data", repoUrls, githubUser.accessToken);
      const repoData = await Github.getRepoDetailsBySlug({
        repoSlugs: repoUrls,
        accessToken: githubUser.accessToken,
      });

      Promise.all(
        repoData.map(async (r) => {
          const repoEntry = {
            ...r,
            user: githubUser.id,
            publishedAt: new Date().toISOString(),
          };
          console.log(repoEntry);
          const entry = await strapi.entityService.create(
            "api::repository.repository",
            { data: repoEntry }
          );
        })
      );
      return { msg: "Success" };
    },

    async getCounts(ctx) {
      return strapi.query("api::repository.repository").count();
    },
  })
);