module.exports = {
    routes: [
      { 
        method: 'GET',
        path: '/contributor/count',
        handler: 'contributor.getCounts',
        config: {
          auth: false,
        },
      }
    ]
}