import './index.less'
import React, {
  Component,
  PropTypes,
} from 'react'
import {
  connect
} from 'react-redux'
import {
  Link,
} from 'react-router'
import Menu, {SubMenu, Item, ItemGroup} from 'antd/lib/menu'
import Icon from 'antd/lib/icon'
export default class Nav extends Component{
  constructor(props){
    super()
    if(!props.menues.length) return
    this.state = {
      current: '', //props.menues[0].key
    }
  }
  render(){
    let {
      menues,
      children,
    } = this.props
    return (
      <div className="app-nav"
      style={{
        width: '15%',
        background: '#232631',
        padding: 0,
      }}>
        {
          menues.length ? <Menu
          onClick={this.handleClick.bind(this)}
          defaultOpenKeys={menues.map((item, index) => {
            return item.key
          })}
          selectedKeys={[this.state.current]}
          mode='inline'>
            {
              menues.map((menu, index) => {
                return (
                  !menu.subMenues ? <Item key={menu.key}><Link activeClassName="active" to={menu.link}>{menu.name}</Link></Item>
                  : (<SubMenu key={menu.key} title={menu.name}>
                    {
                      menu.subMenues.map((subMenu, i) => {
                        return (<Item key={subMenu.key}><Link activeClassName="active" to={subMenu.link}>{subMenu.name}</Link></Item>)
                      })
                    }
                  </SubMenu> : '')
                )
              })
            }
          </Menu> : ''
        }
      </div>
    )
  }
  componentDidMount(){
  }
  componentWillReceiveProps(props){
    let current = props.menues.length ? props.menues[0].key : ''
    this.setState({
      current
    })
  }
  handleClick(e) {
    this.setState({
      current: e.key,
    })
  }
}
