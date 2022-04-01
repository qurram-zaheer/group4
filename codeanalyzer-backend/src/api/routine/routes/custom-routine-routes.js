module.exports = {
    routes: [
      { 
        method: 'GET',
        path: '/routine/repository/pullrequests',
        handler: 'routine.getAllPullRequests',
      }
    ]
}