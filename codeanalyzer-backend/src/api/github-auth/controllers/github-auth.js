'use strict';

/**
 *  github-auth controller
 */

const {createCoreController} = require('@strapi/strapi').factories;
const {Octokit} = require("@octokit/core");


module.exports = createCoreController('api::github-auth.github-auth');
