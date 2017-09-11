import './index.less'
import React, {
  Component,
} from 'react'
import {
  connect
} from 'react-redux'

import Button from 'antd/lib/button'
import Input from 'antd/lib/input'


import ConInfo from './con-info'

class OrderList extends Component{
  constructor(props){
    super()
    this.state = {
      searchParams: {}, // 搜索参数
    }
  }
//      <PageTitle title="转账设置" />
  render(){
    return (
      <div className="order-mange-page page">
        <ConInfo />
      </div>
    )
  }
  handleSearchChange(searchParams){
    this.setState({
      searchParams
    })
  }
}

//      <SearchGroup onSearch={this.handleSearchChange.bind(this)} />
//      <ListTable {...this.props} searchParams={this.state.searchParams} />
const mapStateToProps = (state) => {
  return {
    ...state.user
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderList)