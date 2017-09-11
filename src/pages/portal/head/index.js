import './index.less'
import React, {
  Component,
  PropTypes,
} from 'react'
 import { Link } from 'react-router';
import {
  connect
} from 'react-redux'
import Icon from 'antd/lib/icon'
import {  Menu } from 'antd';
class Head extends Component{
  render(){
    let {
      user,
    } = this.props
    return (
      <div className="head-component">
        <div className="logo">
          <img src={require('../../../assets/img/icon.png')} />
          <p>智能合约管理平台</p>
        </div>
	      <Menu
	        mode="horizontal"
	        style={{ lineHeight: '50px' }}
	      >
	        <Menu.Item key="1"><Link to="/login">登录</Link></Menu.Item>
	        <Menu.Item key="2"><Link to="/register">注册</Link></Menu.Item>
	      </Menu>
      </div>
    )
  }
  handleLogoutClick(){
    this.props.logout()
  }
}
const mapStateToProps = (state) => {
  return {
    ...state.login,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    logout(){
      dispatch(logout())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Head)
