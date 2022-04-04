module.exports = {
    routes: [
      { 
        method: 'GET',
        path: '/commit/getCommmitCountsByBranch',
        handler: 'commit.getCommmitCountsByBranch',
      },
      { 
        method: 'GET',
        path: '/commit/getAll',
        handler: 'commit.getAll',
      }
    ]
}