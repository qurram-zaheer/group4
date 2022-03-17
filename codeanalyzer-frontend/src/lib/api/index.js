import axios from 'axios'
import { get, post, put, destroy } from '../../config'

const authGithubUser = (accessToken) => {
    return get('/auth/github/callback?access_token=' + accessToken)
}

const createGithubAuths = (info) => {
    return post('/github-auths', info);
}

export const api = {
    authGithubUser,
    createGithubAuths
}