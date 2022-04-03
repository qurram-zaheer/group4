module.exports = {
    routes: [
      { 
        method: 'GET',
        path: '/commit/getCommmitCountsByBranch',
        handler: 'commit.getCommmitCountsByBranch',
      }
    ]
}