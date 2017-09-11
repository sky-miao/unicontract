import {
  routerReducer as routing
} from 'react-router-redux'
import {
  combineReducers
} from 'redux'
import {default as user} from './user'
import {default as placeOrder} from './place-order'
import {default as auth} from './auth'

export default combineReducers({
  user,
  placeOrder,
  auth,
  routing,
})