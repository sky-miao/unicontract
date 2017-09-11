import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux'
import thunk from 'redux-thunk'
// import DevTools from '../containers/devTools'
import rootReducer from '../reducers'

export default (preloadedState) => {
  return createStore(
    rootReducer,
    preloadedState,
  )
}