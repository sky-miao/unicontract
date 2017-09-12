import {
  routerReducer as routing
} from 'react-router-redux'
import {
  combineReducers
} from 'redux'
import {default as user} from './user'
import {default as auth} from './auth'
import {default as limitRole} from './limit-role'

export default combineReducers({
  user,
  auth,
  limitRole,
  routing,
})