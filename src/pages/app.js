// antd.css中的代码编译有报错，所以单独抽取出来删除了报错的代码
import './antd.less'
import './app.less'
import React, {
  Component,
  PropTypes,
} from 'react'
import {
  connect,
} from 'react-redux'
import {
  Link,
  Lifecycle,
  RouteContext,
} from 'react-router'

import Menu, {SubMenu, Item, ItemGroup} from 'antd/lib/menu'
import Icon from 'antd/lib/icon'
export default class App extends Component{
  constructor(props){
    super()
  }
  render(){
    let {
      children,
    } = this.props
    return (
      <div className="app-container">
        {children}
      </div>
    )
  }
}
// export default connect(mapStateToProps, mapDispatchToProps)(App)