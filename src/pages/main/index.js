// antd.css中的代码编译有报错，所以单独抽取出来删除了报错的代码
import './index.less'
import React, {
  Component,
  PropTypes,
} from 'react'
import {
  connect,
} from 'react-redux'
import {
  Link,
} from 'react-router'

import Menu, {SubMenu, Item, ItemGroup} from 'antd/lib/menu'
import Icon from 'antd/lib/icon'
import Nav from '../../components/nav'
import Head from '../../components/head'
import {
  fetchUserInfo,
} from '../../actions/user'


class Main extends Component{
  constructor(props){
    super()
  }
  render(){
    let {
      user,
      menues,
      children,
    } = this.props
    return (
      <div className="main-container">
        <Head user={user}/>
        <div className="content-container">
          <Nav menues={menues} />
          {menues.length ? children : ''}
        </div>
      </div>
    )
  }
  componentDidMount(){
    // this.props.fetchUserInfo()
  }
}
const mapStateToProps = (state) => {
  return {
    ...state.user,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserInfo(){
      // dispatch(fetchUserInfo())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)