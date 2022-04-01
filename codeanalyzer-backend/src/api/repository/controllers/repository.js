'use strict';

/**
 *  repository controller
 */

const {createCoreController} = require('@strapi/strapi').factories;
const axios = require("axios");

module.exports = createCoreController('api::repository.repository', ({strapi}) => ({
  async create(ctx) {
    const repoUrls = ctx.request.body.data.urls
    const githubUser = ctx.request.body.data.user
    const userId = ctx.request.body.data.userId
    let repoData = []
    await Promise.all(repoUrls.map(async url => {
      const res = await axios.get(`https://api.github.com/repos/${url}`, {
        headers: {
          'Authorization': `token ${githubUser.accessToken}`
        }
      })
      const resJson = await res.data
      const langData = await axios.get(resJson.languages_url, {
        headers: {
          'Authorization': `token ${githubUser.accessToken}`
        }
      })
      const langJson = await langData.data
      const filteredRes = {
        name: resJson.name,
        url: resJson.url,
        owner: resJson.owner.login,
        size: resJson.size,
        publishedAt: new Date().toISOString(),
        user: githubUser.id,
        languages: langJson
      }
      console.log('HAHAHA', filteredRes)
      repoData.push(filteredRes)
      await strapi.entityService.create('api::repository.repository', {data: filteredRes})
      
    }))
    return repoData
  }
}));
