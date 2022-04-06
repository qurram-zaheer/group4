const request = require('supertest');
const Github = require('../../src/app/github');

/**
 * @author Bharatwaaj Shankar
 * @description Get all repositories from Github
 * @name TEST005
 */
it('Get all Repositories from Github', async () => {
  const output = await strapi.db.query("api::repository.repository").findMany({orderBy: {id: 'desc'}});
  expect(output).toBeDefined();
});

/**
 * @author Bharatwaaj Shankar
 * @description Get all Branches from Github
 * @name TEST006
 */
it('Get all Branches from Github', async () => {
  const output = await strapi.db.query("api::branch.branch").findMany({orderBy: {id: 'desc'}});
  expect(output).toBeDefined();
});


/**
 * @author Bharatwaaj Shankar
 * @description Get all Commits from Github
 * @name TEST007
 */
 it('Get all Commits from Github', async () => {
  const output = await strapi.db.query("api::commit.commit").findMany({orderBy: {id: 'desc'}});
  expect(output).toBeDefined();
});

/**
 * @author Bharatwaaj Shankar
 * @description Get all Contributors from Github
 * @name TEST008
 */
 it('Get all Contributors from Github', async () => {
  const output = await strapi.db.query("api::contributor.contributor").findMany({orderBy: {id: 'desc'}});
  expect(output).toBeDefined();
});

/**
 * @author Bharatwaaj Shankar
 * @description Get all Pull Requests from Github
 * @name TEST009
 */
 it('Get all Pull Requests from Github', async () => {
  const output = await strapi.db.query("api::pull-request.pull-request").findMany({orderBy: {id: 'desc'}});
  expect(output).toBeDefined();
});

/**
 * @author Bharatwaaj Shankar
 * @description Get all Github Auths from Github
 * @name TEST010
 */
 it('Get all Github Auths from Github', async () => {
  const output = await strapi.db.query("api::github-auth.github-auth").findMany({orderBy: {id: 'desc'}});
  expect(output).toBeDefined();
});