const Config = require("../config/config");
const { Octokit } = require("@octokit/core");
const {
  paginateRest,
  composePaginateRest,
} = require("@octokit/plugin-paginate-rest");
const axios = require("axios");

const githubRequestHeader = (accessToken) => {
  return {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  };
};

const githubApi = axios.create({
  baseURL: "https://api.github.com",
});

const { get } = githubApi;

/**
 * @author Bharatwaaj Shankar
 * @param {user, repository, accessToken} info
 * @returns Branches
 */
exports.getBranches = async (info) => {
  const MyOctokit = Octokit.plugin(paginateRest);
  const octokit = new MyOctokit({ auth: info.accessToken });
  return await octokit.paginate("GET /repos/{owner}/{repo}/branches", {
    owner: info.owner,
    repo: info.repositoryName,
  });
};

/**
 * @author Bharatwaaj Shankar
 * @param {user, repository, accessToken} info
 * @returns Repositories
 */
exports.getRepositories = async (info) => {
  const MyOctokit = Octokit.plugin(paginateRest);
  const octokit = new MyOctokit({ auth: info.accessToken });
  return await octokit.paginate("GET /users/{owner}/repos", {
    owner: info.owner,
  });
};

/**
 * @author Bharatwaaj Shankar
 * @param {user, repository, accessToken} info
 * @returns PullRequests
 */
exports.getPullRequests = async (info) => {
  const MyOctokit = Octokit.plugin(paginateRest);
  const octokit = new MyOctokit({ auth: info.accessToken });
  const pullRequests = await octokit.paginate(
    "GET /repos/{owner}/{repo}/pulls?state={state}",
    {
      owner: info.owner,
      repo: info.repositoryName,
      state: info.state || "all",
    }
  );
  return pullRequests;
};

/**
 * @author Bharatwaaj Shankar
 * @param {query} info
 * @returns SearchResults
 */
exports.searchUsingQuery = async (info) => {
  const MyOctokit = Octokit.plugin(paginateRest);
  const octokit = new MyOctokit({ auth: info.accessToken });
  return await octokit.paginate("GET /search/issues?q={query}", {
    query: info.query,
  });
};

/**
 * @author Arshdeep Singh
 * @param {user, repository, accessToken} info
 * @returns Commits
 */
exports.getCommits = async (info) => {
  const MyOctokit = Octokit.plugin(paginateRest);
  const octokit = new MyOctokit({ auth: info.accessToken });

  const getAllCommitsSha = async (allBranches) => {
    const allCommitsSha = [];
    for (const branch of allBranches) {
      const data = await octokit.paginate(
        "GET /repos/{owner}/{repo}/commits?sha={branch_name}",
        {
          owner: info.owner,
          repo: info.repositoryName,
          branch_name: branch,
        }
      );

      for (const commit of data) {
        allCommitsSha.push({
          branch: branch,
          sha: commit.sha,
        });
      }
    }
    return allCommitsSha;
  };

  const getAllCommitsDetails = async (allCommitsSha) => {
    const allCommitsDetails = [];
    for (var i = 0; i < allCommitsSha.length; i++) {
      const sha = allCommitsSha[i].sha;
      const branch = allCommitsSha[i].branch;
      const data = await octokit.paginate(
        "GET /repos/{owner}/{repo}/commits/{commit_sha}",
        {
          owner: info.owner,
          repo: info.repositoryName,
          commit_sha: sha,
        }
      );

      for (const commitDetails of data) {
        commitDetails.branch = branch;
        allCommitsDetails.push(commitDetails);
      }
    }
    return allCommitsDetails;
  };

  const allBranches = await this.getBranches(info).then((branches) => {
    const allBranches = [];
    for (const branch of branches) {
      allBranches.push(branch.name);
    }
    return allBranches;
  });
  const allCommitsSha = await getAllCommitsSha(allBranches);
  const allCommitsDetails = await getAllCommitsDetails(allCommitsSha);
  return allCommitsDetails;
};

/**
 * @author Kishan Savaliya
 * @param {login, contributions, accessToken} info
 * @returns contributors
 */
exports.getContributors = async (info) => {
  const MyOctokit = Octokit.plugin(paginateRest);
  const octokit = new MyOctokit({ auth: info.accessToken });
  return await octokit.paginate("GET /repos/{owner}/{repo}/contributors", {
    login: info.login,
    contributions: info.contributions,
  });
};

/**
 * @author Qurram Zaheer Syed
 * @param {[repoSlugs] , accessToken} info
 * @returns [repoData]
 */
exports.getRepoDetailsBySlug = async (info) => {
  const repoData = await Promise.all(
    info.repoSlugs.map(async (slug) => {
      const repoRes = await get(
        `repos/${slug}`
        // githubRequestHeader(info.accessToken)
      ).then((res) => res.data);
      const repoLang = await exports.getLangDataFromLangUrl({
        accessToken: info.accessToken,
        owner: repoRes.owner.login,
        repo: repoRes.name,
      });
      return {
        name: repoRes.name,
        url: repoRes.url,
        owner: repoRes.owner.login,
        size: repoRes.size,
        languages: repoLang,
      };
    })
  );

  return repoData;
};

/**
 * @author Qurram Zaheer Syed
 * @param {owner, repo, accessToken} info
 * @returns languages
 */
exports.getLangDataFromLangUrl = async (info) => {
  const MyOctokit = Octokit.plugin(paginateRest);
  const octokit = new MyOctokit({ auth: info.accessToken });
  const { owner, repo } = info;
  return await get(`/repos/${owner}/${repo}/languages`).then((res) => res.data);
};

/**
 * @author Kavya Raval
 * @param { accessToken } info
 * @returns messages
 */
exports.getCommitMessages = async (info) => {
  const MyOctokit = Octokit.plugin(paginateRest);
  const octokit = new MyOctokit({ auth: info.accessToken });

  return await octokit.paginate("GET /repos/{owner}/{repo}/commits", {
    owner: "bharatwaaj",
    repo: "ASDCDemoRepository",
  });
};
