"use strict";

/**
 *  github-auth controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
const { Octokit } = require("@octokit/core");

module.exports = createCoreController(
  "api::github-auth.github-auth",
  ({ strapi }) => ({
    async create(ctx) {
      const { data, meta } = await super.create(ctx);
      const { attributes } = data;
      const user_id = attributes.user.data.id;
      // Check if user has repositories
      const existingRepos = await strapi.db
        .query("plugin::users-permissions.user")
        .findOne({
          where: { id: user_id },
          populate: { repositories: true },
        });
      console.log(existingRepos.repositories);
      if (existingRepos.repositories.length == 0) {
        data.noRepos = true;
      }

      return { data, meta };
    },
  })
);
