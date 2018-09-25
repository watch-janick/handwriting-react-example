import {
  combineReducers,
  createStore,
  applyMiddleware,
} from 'redux'
import thunk from 'redux-thunk'
import handwriting from './handwriting'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducers = combineReducers({
  handwriting,
})

export default reducers
export const initializeStore = (initialState) => createStore(reducers, initialState, composeWithDevTools(applyMiddleware(thunk)))
