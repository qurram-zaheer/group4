module.exports = {
    routes: [
      { 
        method: 'GET',
        path: '/repository/count',
        handler: 'repository.getCounts',
        config: {
          auth: false,
        },
      }
    ]
}