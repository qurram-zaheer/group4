module.exports = {
    routes: [
      { 
        method: 'GET',
        path: '/routine/repository/pullrequests',
        handler: 'routine.getAllPullRequests',
      },
      { 
        method: 'GET',
        path: '/routine/repository/commits',
        handler: 'routine.getAllCommits',
      }
    ]
}