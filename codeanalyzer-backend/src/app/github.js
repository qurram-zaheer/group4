const Config = require('../config/config');
const {Octokit} = require("@octokit/core");

/**
 * @author Bharatwaaj Shankar
 * @param {user, repository, accessToken} info 
 * @returns Branch
 */
exports.getBranches = async (info) => {
    const octokit = new Octokit({auth: info.accessToken});
    return await octokit.request('GET /repos/{owner}/{repo}/branches', {
        owner: info.owner,
        repo: info.repositoryName
    });
};

/**
 * @author Bharatwaaj Shankar
 * @param {user, repository, accessToken} info 
 * @returns Branch
 */
exports.getRepositories = async (info) => {
    const octokit = new Octokit({auth: info.accessToken});
    return await octokit.request('GET /users/{owner}/repos', {
        owner: info.owner
    });
};