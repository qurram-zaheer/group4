module.exports = {
    routes: [
      { 
        method: 'GET',
        path: '/pull-request/avgtimediff',
        handler: 'pull-request.getAvgTimeDifferenceBetweenPullRequests',
        config: {
          auth: false,
        },
      },
      { 
        method: 'GET',
        path: '/pull-request/getUsers',
        handler: 'pull-request.getUsers',
        config: {
          auth: false,
        },
      }
    ]
}