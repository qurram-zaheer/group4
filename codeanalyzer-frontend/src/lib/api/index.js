import { get, post } from "../../config";
import {
  getJiraAccessToken,
  getJiraAuthCode,
  getJiraCloudId,
  jiraOAuthFlow,
} from "./jira";

const bearerToken = localStorage.getItem("token");

const authGithubUser = (accessToken) => {
  return get("/auth/github/callback?access_token=" + accessToken);
};

const createAuths = (info, headers) => {
  return post("/github-auths?populate=%2A", info, headers);
};

const getAllRepositories = (info, headers) => {
  return get("/repositories", info, headers);
};

const getRepositoriesCount = (info, headers) => {
  return get("/repository/count", info, headers);
};

// const fetchGithubRepo = async (username)=>{
//     const url = "https://api.github.com/users/tushartushar/repos";

//     const response = await get(url)
//     //console.log(response.data)
//     cleanData(response.data)
// }

const lengthOfFetchedData = async (url) => {
  return await get(url).length;
};

const postRepos = (info, headers) => {
  return post("/repositories", info, headers);
};

const getUserRepos = (info) => {
  return get(`/repositories?populate=%2A&filters[user][id][$eq]=${info}`, {
    headers: { Authorization: `Bearer ${bearerToken}` },
  });
};
const getPullRequestFrequencyPerUser = (info, headers) => {
  return get(
    `/pull-request/avgtimediff?accessToken=${info.accessToken}&contributor=${info.contributor}`,
    null,
    headers
  );
};

const getRepositories = (headers) => {
  return get(`/repositories`, null, headers);
};

const getPullRequests = (headers) => {
  return get(`/pull-request`, null, headers);
};

const getPullRequestsUniqueUsers = (info, headers) => {
  return get(
    `/pull-request/getUsers?repository=${info.repository}`,
    null,
    headers
  );
};

const getContributorsCount = (info, headers) => {
  return get("/contributor/count", info, headers);
};

const getCommmitCountsByBranch = (info, headers) => {
  return get(
    `/commit/getCommmitCountsByBranch?repositoryId=${info.repository}`,
    null,
    headers
  );
};

const getCommitsFrequencyByRepository = (info, headers) => {
  return get(
    `/commit/getAvgTimeDifferenceBetweenCommits?repositoryId=${info.repository}`,
    null,
    headers
  );
};

const getContributorsForRepo = (info, headers) => {
  console.log("infooooooo", info);
  return get(`/contributors?filters[repository][id][$eq]=${info.repoId}`);
};

const getPullRequestsCountsByBranch = (info, headers) => {
  return get(
    `/pull-request/getPullRequestsCountsByBranch?repositoryId=${info.repository}`,
    null,
    headers
  );
};

const getCommitCountPerHour = (info, headers) => {
  console.log("info per hour", info);
  return get(`/commit/getCommitsByHour?repositoryId=${info.repositoryId}`);
};

const getUserLanguageEffort = (info, headers) => {
  console.log("info user language effort", info);
  return get(`/commit/getUserLanguageEffort?repositoryId=${info.repositoryId}`);
};

const getTotalRefactoringsForRepo = (info, headers) => {
  return get(`/commit/getTotalRefactoringsForRepo?repositoryId=${info.repositoryId}`)
}

const getRefactoringData = (info, headers) => {
  return get(`/commits?fields[0]=totalchanges&fields[1]=commitdate`)
}

const getTotalRefactorings = (info, headers) => {
  return get(`/commit/getTotalRefactorings`)
}

const getCommitsCountByRepo = (info, headers) => {
  return get(`/commit/getCommitsCountByRepo`)
}

export const api = {
  authGithubUser,
  createAuths,
  getJiraAuthCode,
  getContributorsForRepo,
  getJiraAccessToken,
  getJiraCloudId,
  jiraOAuthFlow,
  postRepos,
  getUserRepos,
  getPullRequestFrequencyPerUser,
  getRepositories,
  getPullRequests,
  getPullRequestsUniqueUsers,
  getRepositoriesCount,
  getContributorsCount,
  getCommmitCountsByBranch,
  getCommitsFrequencyByRepository,
  getPullRequestsCountsByBranch,
  getCommitCountPerHour,
  getUserLanguageEffort,
  getTotalRefactoringsForRepo,
  getTotalRefactorings,
  getRefactoringData,
  getCommitsCountByRepo
  // fetchGithubRepo
};
