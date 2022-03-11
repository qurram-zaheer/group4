import axios from 'axios'

const dev = true
// const dev = process.env.NODE_ENV === 'development'
const prod = process.env.NODE_ENV === 'production'
const staging =
  window.location.href.includes('staging.meetotis.com') ||
  window.location.href.includes('localhost:1337') ||
  process.env.NODE_ENV === 'staging'

export const fbApiVersion = 'v12.0'

export const webUrl = (() => {
  if (staging) {
    // TODO: Yet to be updated
    return 'https://'
  }

  if (dev) {
    return 'http://localhost:1337'
  }

  if (prod) {
    // TODO: Yet to be updated
    return 'https://'
  }
})()


const apiClient = axios.create({
  baseURL: webUrl + '/api',
  timeout: 30000,
})

apiClient.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => Promise.reject(error)
)

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.data) {
      return Promise.reject(error.response.data)
    }
    return Promise.reject(error)
  }
)

const { get, post, put, delete: destroy } = apiClient
export { get, post, put, destroy }