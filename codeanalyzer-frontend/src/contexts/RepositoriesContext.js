import React from 'react'

const RepoContext = React.createContext([
{
    repos: [],
    selectedRepo: ''
}, () => {
    }
])

export default RepoContext