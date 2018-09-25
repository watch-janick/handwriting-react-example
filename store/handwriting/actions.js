import {
  fetchChoicesService,
  fetchImageService,
} from './services'

/**
 * Action types constants
 */
export const actionTypes = {
  UPDATE_CHOICES: 'UPDATE_CHOICES',
  SELECT_CHOICE: 'SELECT_CHOICE',
  UPDATE_IMAGE: 'UPDATE_IMAGE',
  UPDATE_TEXT: 'UPDATE_TEXT',
}

/**
 * Actions used to modify the store
 */
export const actions = {
  updateChoices: choices => ({
    type: actionTypes.UPDATE_CHOICES,
    payload: {
      choices,
    },
  }),
  selectChoice: selectedId => ({
    type: actionTypes.SELECT_CHOICE,
    payload: {
      selectedId,
    },
  }),
  updateImage: image => ({
    type: actionTypes.UPDATE_IMAGE,
    payload: {
      image,
    },
  }),
  updateText: text => ({
    type: actionTypes.UPDATE_TEXT,
    payload: {
      text,
    },
  }),
}

const methods = {
  /**
   * Fetch the handwritings from the API
   * Will dispatch actions.updateChoices and actions.selectChoice eventually
   */
  fetchChoices: size => dispatch => {
    return fetchChoicesService(size)
      .then(choices => {
        if (choices.length > 0) {
          // select the first by default
          dispatch(actions.selectChoice(choices[0].id))
        }

        // update the store
        return dispatch(actions.updateChoices(choices))
      })
      .catch(error => console.error('An error occured while retrieving handwritings:', error))
  },

  /**
   * Select a handwriting
   * Will dispatch actions.selectChoice
   */
  selectChoice: selectedId => (dispatch, getState) => {
    const text = getState().handwriting.text

    dispatch(actions.selectChoice(selectedId))

    if (text && selectedId) {
      dispatch(methods.fetchImage(text, selectedId))
    }
  },

  /**
   * Update the text
   */
  updateText: text => (dispatch, getState) => {
    const selectedId = getState().handwriting.selectedId

    dispatch(actions.updateText(text))

    if (text && selectedId) {
      dispatch(methods.fetchImage(text, selectedId))
    }
  },

  /**
   * Render the image as a PNG from the API
   * Will dispatch actions.updateImage
   */
  fetchImage: (text, handwritingId) => dispatch => {
    return fetchImageService(text, handwritingId)
      .then(image => {
        // create an URL for our blob
        const url = URL.createObjectURL(image)

        // update the store with the URL
        return dispatch(actions.updateImage(url))
      })
      .catch(error => console.error('An error occured while retrieving handwritings:', error))
  },
}

export default methods