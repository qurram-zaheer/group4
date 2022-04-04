import {get, post} from "../../config";
import {getJiraAccessToken, getJiraAuthCode, getJiraCloudId, jiraOAuthFlow,} from "./jira";

const bearerToken = localStorage.getItem("token")

const authGithubUser = (accessToken) => {
    return get("/auth/github/callback?access_token=" + accessToken);
};

const createAuths = (info, headers) => {
    return post('/github-auths?populate=%2A', info, headers);
}

const getAllRepositories = (info, headers) => {
    return get('/repositories', info, headers);
}

const getRepositoriesCount = (info, headers) => {
    return get('/repository/count', info, headers);
}

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
}

const getUserRepos = (info) => {
    return get(`/repositories?populate=%2A&filters[user][id][$eq]=${info}`, {headers: { Authorization: `Bearer ${bearerToken}`}})
}
const getPullRequestFrequencyPerUser = (info, headers) => {
    return get(`/pull-request/avgtimediff?accessToken=${info.accessToken}&contributor=${info.contributor}`, null, headers);
}

const getRepositories = (headers) => {
    return get(`/repositories`, null, headers);
}

const getPullRequests = (headers) => {
    return get(`/pull-request`, null, headers);
}

const getPullRequestsUniqueUsers = (info, headers) => {
    return get(`/pull-request/getUsers?repository=${info.repository}`, null, headers);
}

const getContributorsCount = (info, headers) => {
    return get('/contributor/count', info, headers);
}

const getCommmitCountsByBranch = (info, headers) => {
    return get(`/commit/getCommmitCountsByBranch?repositoryId=${info.repository}`, null, headers);
}

const getCommitsFrequencyByRepository = (info, headers) => {
    return get(`/commit/getAvgTimeDifferenceBetweenCommits?repository=${info.repository}`, null, headers);
}

export const api = {
    authGithubUser,
    createAuths,
    getJiraAuthCode,
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
    getCommitsFrequencyByRepository
    // fetchGithubRepo
}
