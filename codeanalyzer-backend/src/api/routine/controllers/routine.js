'use strict';
const Github = require('../../../app/github'); 

/**
 *  routine controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::routine.routine', ({ strapi }) =>  ({

    // To Fetch and store Pull Requests from Github into our Database
    async getAllPullRequests(ctx, next) {
        let results = [];
        try {
          const pullRequests = await Github.getPullRequests({
            accessToken: 'ghu_VuJfKpr4FqGrHBTWldAtzuG2qKCUaP1Xypzo',
            owner: 'htmlunit',
            repositoryName: 'htmlunit'
          });
          console.log('PR DATA -> ', pullRequests);
          Promise.all(pullRequests.map(async pullRequest => {
            const pullRequestDataModel = { 
              username: pullRequest.user.login,
              name: pullRequest.title,
              prID: pullRequest.id,
              createdOn: new Date(pullRequest.created_at).toISOString(),
              stateOpen: pullRequest.state == 'closed'?false:true,
              closedOn: new Date(pullRequest.closed_at).toISOString()
            }
            const uploadPRDataModel = await strapi.db.query('api::pull-request.pull-request').create({
              data: pullRequestDataModel
            });
            console.log("UPDM", uploadPRDataModel);
            results.push(uploadPRDataModel);
          }));
          ctx.body = results;
        } catch (err) {
          console.log(err);
          ctx.body = err;
        }
    },

    //To Fetch and store Contributors data from Github into our database
    async getAllContributors(ctx,next) {
      let results =[];
      try{
        const contributors = await Github.getContributors({
          accessToken: 'ghu_VuJfKpr4FqGrHBTWldAtzuG2qKCUaP1Xypzo',
          login: 'bharatwaaj',
          repositoryName: 'ASDCDemoRepository'
        });
        console.log('Contributors Data ->', contributors);
        Promise.all(contributors.map(async contributors =>{
          const contributorsDataModel = {
            username: contributors.user.login,
            contributors: contributors.contributors,
          }
          const uploadContributorsDataModel = await strapi.db.query('api::contributor.contributor').create({
            data:contributorsDataModel
          })
          console.log("CONTRIBUTORS--->", uploadContributorsDataModel);
          results.push(uploadContributorsDataModel);
        } ))
      }  catch (err) {
          console.log(err);
          ctx,body = err;
      }
    },

  }));
