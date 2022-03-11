import axios from 'axios'
import { get, post, put, destroy, fbApiVersion } from '../../config'

const authGithubUser = (accessToken) => {
    return get('/auth/github/callback?access_token=' + accessToken)
}

export const api = {
    authGithubUser
}