import axios from 'axios'
import config from '../config/config'

/**
 * Wrapper for axios to handle auth and headers
 */
const createRequest = (type, url, data, userOptions) => {
  const { key, secret, baseURL } = config.handwriting.api

  const defaults = {
    url: baseURL + url,
    method: type,
    auth: {
      username: key,
      password: secret,
    },
  }

  if (data) {
    if (type === 'post' || type === 'put' || type === 'patch') {
      defaults.data = data
    } else if (type === 'get') {
      defaults.params = data
    } else {
      throw new Error(`This request type haven't been implemented yet.`)
    }
  }

  const options = { ...defaults, ...userOptions }

  return axios.request(options)
    .then(response => {
      const { status, statusText } = response

      if (status === 200 && statusText === "OK") {
        return response.data
      }

      throw new Error(statusText)
    })
    .catch(error => {
      // TODO log error somewhere (ex: send a request to the server)
      console.error('An error occured:', error)

      // rethrow the error to hit the next catch
      throw error
    })
}

/**
 * Post wrapper for axios
 */
export const postRequest = (url, data, options) => {
  return createRequest('post', url, data, options)
}

/**
 * Put wrapper for axios
 */
export const putRequest = (url, data, options) => {
  return createRequest('put', url, data, options)
}

/**
 * Patch wrapper for axios
 */
export const patchRequest = (url, data, options) => {
  return createRequest('patch', url, data, options)
}

/**
 * Get wrapper for axios
 */
export const getRequest = (url, data, options) => {
  return createRequest('get', url, data, options)
}
