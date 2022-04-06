const request = require('supertest');
const Github = require('../../src/app/github');

/**
 * @author Bharatwaaj Shankar
 * @description Get all repositories from Github
 * @name TEST005
 */
it('Get all Repositories from Github', async () => {
  await Github.getRepositories().expect(200);
});

/**
 * @author Bharatwaaj Shankar
 * @description Get all Branches from Github
 * @name TEST006
 */
it('Get all Branches from Github', async () => {
  await Github.getBranches().expect(200);
});


/**
 * @author Bharatwaaj Shankar
 * @description Get all Commits from Github
 * @name TEST007
 */
 it('Get all Commits from Github', async () => {
  await Github.getCommits().expect(200);
});

/**
 * @author Bharatwaaj Shankar
 * @description Get all Commits from Github
 * @name TEST008
 */
 it('Get all Contributors from Github', async () => {
  await Github.getContributors().expect(200);
});

/**
 * @author Bharatwaaj Shankar
 * @description Get all Pull Requests from Github
 * @name TEST009
 */
 it('Get all Pull Requests from Github', async () => {
  await Github.getPullRequests().expect(200);
});


/**
 * @author Bharatwaaj Shankar
 * @description Get all Language Data from Github
 * @name TEST010
 */
 it('Get all Language Data from Github', async () => {
  await Github.getLangDataFromLangUrl().expect(200);
});
