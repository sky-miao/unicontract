import React, {
  Component,
  PropTypes,
} from 'react'
import {
  Provider,
} from 'react-redux'
import {
  Router,
  Route,
} from 'react-router'
import routes from '../routers'

export default class Root extends Component {
  render(){
    const {
      store,
      history,
    } = this.props
    return (
      <Provider store={store}>
        <Router history={history} routes={routes} />
      </Provider>
    )
  }
}