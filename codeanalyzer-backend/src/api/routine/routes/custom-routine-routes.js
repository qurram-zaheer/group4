module.exports = {
    routes: [
      { 
        method: 'GET',
        path: '/routine/repository/pullrequests',
        handler: 'routine.getAllPullRequests',
      },
      {
        method: 'GET',
        path: '/routine/repository/contributors',
        handler: ''
      { 
        method: 'GET',
        path: '/routine/repositories',
        handler: 'routine.getRepositories',
      }
    ]
}