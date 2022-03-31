'use strict';

/**
 * github-auth service.
 */

const {Octokit} = require("@octokit/core");

const {createCoreService} = require('@strapi/strapi').factories;

module.exports = createCoreService('api::github-auth.github-auth', ({strapi}) => ({}));
