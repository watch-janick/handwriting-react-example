import { getRequest } from '../../utils/request'

/**
 * Fetch the handwriting styles from the API
 * @param {number} limit Number of results in the set
 * @return {array} An array of handwriting styles
 */
export const fetchChoicesService = limit => {
  return getRequest('/handwritings', { limit })
}

/**
 * Render the PNG from the API
 * @param {string} text The text to be rendered
 * @param {number} handwriting_id The ID of the handwriting style to be used
 */
export const fetchImageService = (text, handwriting_id) => {
  return getRequest('/render/png', { text, handwriting_id }, {
    // transforms the binary data received to a blob
    // making it easy to handle in javascript
    responseType: 'blob',
  })
}