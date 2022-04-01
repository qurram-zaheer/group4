const Config = require('../config/config');
const { Octokit } = require("@octokit/core");
const { paginateRest, composePaginateRest } = require("@octokit/plugin-paginate-rest");

/**
 * @author Bharatwaaj Shankar
 * @param {user, repository, accessToken} info 
 * @returns Branches
 */
exports.getBranches = async (info) => {
    const MyOctokit = Octokit.plugin(paginateRest);
    const octokit = new MyOctokit({auth: info.accessToken});
    return await octokit.paginate('GET /repos/{owner}/{repo}/branches', {
        owner: info.owner,
        repo: info.repositoryName
    });
};

/**
 * @author Bharatwaaj Shankar
 * @param {user, repository, accessToken} info 
 * @returns Repositories
 */
exports.getRepositories = async (info) => {
    const MyOctokit = Octokit.plugin(paginateRest);
    const octokit = new MyOctokit({auth: info.accessToken});
    return await octokit.paginate('GET /users/{owner}/repos', {
        owner: info.owner
    });
};

/**
 * @author Bharatwaaj Shankar
 * @param {user, repository, accessToken} info 
 * @returns PullRequests
 */
 exports.getPullRequests = async (info) => {
    const MyOctokit = Octokit.plugin(paginateRest);
    const octokit = new MyOctokit({auth: info.accessToken});
    const pullRequests = await octokit.paginate('GET /repos/{owner}/{repo}/pulls?state={state}', {
        owner: info.owner,
        repo: info.repositoryName,
        state: info.state || 'all'
    });
    return pullRequests;
};

/**
 * @author Bharatwaaj Shankar
 * @param {query} info 
 * @returns SearchResults
 */
 exports.searchUsingQuery = async (info) => {
    const MyOctokit = Octokit.plugin(paginateRest);
    const octokit = new MyOctokit({auth: info.accessToken});
    return await octokit.paginate('GET /search/issues?q={query}', {
        query: info.query
    });
};

