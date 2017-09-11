import 'babel-polyfill'
import './components'
import React, {
  Component,
} from 'react'
import {
  render,
} from 'react-dom'
import {
  hashHistory,
} from 'react-router'
import {
  syncHistoryWithStore,
} from 'react-router-redux'
import configStore from './store'
import Root from './pages/root'

const store = configStore()
const history = syncHistoryWithStore(hashHistory, store)

render(
  <Root store={store} history={history} />,
  document.getElementById('app')
)