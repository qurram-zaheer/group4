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
  console.log("here", info);
  const commitBrief = await octokit
    .request(`GET /repos/{owner}/{repo}/commits`, {
      owner: info.owner,
      repo: info.repositoryName,
      per_page: 30,
    })
    .then((res) => res.data);
  // console.log(commitBrief);
  const commitUrls = commitBrief.map((item) => item.url);

  const branches = await this.getBranches(info);

  const commitEntityArray = await Promise.all(
    commitUrls.map(async (url) => {
      console.log(url);
      const res = await axios.get(url).then((r) => r.data);
      console.log(res.sha);

      const fileEntityArray = res.files.map((fileEntry) => {
        const { sha, filename, status, additions, deletions, changes } =
          fileEntry;

        const fileEntityObj = {
          sha,
          filename,
          status,
          additions,
          deletions,
          changes,
          repository: info.repositoryId,
          authorname: res.committer?.login,
          commitdate: res.commit.author.date,
        };
        return fileEntityObj;
      });

      console.log(fileEntityArray);
      const fileEntries = await Promise.all(
        fileEntityArray.map(async (obj) => {
          const entry = await axios
            .post("http://localhost:1337/api/committedfiles", {
              data: { ...obj, totalchanges: obj.changes },
            })
            .then((res) => res.data);
          return entry.data.id;
        })
      );
      console.log("FILE ENTRIES HERE", fileEntries);
      const entityObj = {
        commit_id: res.sha.slice(0, 6),
        message: res.commit.message,
        sha: res.commit.tree.sha,
        authorid: res.author?.id,
        totalchanges: res.stats.total,
        totaladditions: res.stats.additions,
        totaldeletions: res.stats.deletions,
        committedfiles: fileEntries,
        commitdate: res.commit.author.date,
        branch: "master",
        repository: info.repositoryId,
        authorname: res.committer?.login,
        authoravatar: res.committer?.avatar_url,
      };

      console.log("entityObj", entityObj);
      return entityObj;
    })
  );
  console.log(commitEntityArray);
  return commitEntityArray;
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
