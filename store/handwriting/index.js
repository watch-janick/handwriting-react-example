import { actionTypes } from './actions'

const defaultState = {
  /**
   * @var List of handwritings
   */
  choices: [],

  /**
   * @var selectedId ID of the selected handwriting
   */
  selectedId: null,

  /**
   * @var image Rendered PNG
   */
  image: null,

  /**
   * @var text User entered text to generate the image
   */
  text: '',
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_CHOICES:
    case actionTypes.SELECT_CHOICE:
    case actionTypes.UPDATE_IMAGE:
    case actionTypes.UPDATE_TEXT:
      // merges incoming payload with current state
      return {
        ...state,
        ...action.payload
      }

    default:
      return state
  }
}
