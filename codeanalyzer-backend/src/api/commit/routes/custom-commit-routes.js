module.exports = {
  routes: [
    {
      method: "GET",
      path: "/commit/getCommmitCountsByBranch",
      handler: "commit.getCommmitCountsByBranch",
    },
    {
      method: "GET",
      path: "/commit/getAll",
      handler: "commit.getAll",
    },
    {
      method: "GET",
      path: "/commit/getAvgTimeDifferenceBetweenCommits",
      handler: "commit.getAvgTimeDifferenceBetweenCommits",
    },
    {
      method: "GET",
      path: "/commit/getCommitsByHour",
      handler: "commit.getCommitsByHour",
    },
    {
      method: "GET",
      path: "/commit/getUserLanguageEffort",
      handler: "commit.getUserLanguageEffort",
    },
  ],
};
