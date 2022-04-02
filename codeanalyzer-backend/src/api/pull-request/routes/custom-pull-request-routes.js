module.exports = {
    routes: [
      { 
        method: 'GET',
        path: '/pull-request/avgtimediff',
        handler: 'pull-request.getAvgTimeDifferenceBetweenPullRequests',
        config: {
          auth: false,
        },
      }
    ]
}