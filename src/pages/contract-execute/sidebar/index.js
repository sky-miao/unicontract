import './index.less'
import React, {
  Component,
} from 'react'
import {
  connect
} from 'react-redux'
import {Tabs, Icon, Button, Input, Nav, Modal} from 'antd'
import PageTitle from '../../../components/page-title'
import Content from './content'
import Detail from './detail'

let TabPane = Tabs.TabPane
class SidebarPage extends Component{
  constructor(props){
    super(props)
    this.state = {
      title: '合约内容',
      record:this.props.record
    }
  }
  render(){
    let {
      show
    } = this.props
    let {
      title,
    } = this.state
    return (
        <div className="sidebarx Kpage">
          <p style={{fontSize: 16, marginLeft: 10}}>{title}</p>
          <div className='Kpage-content'>
            <Tabs
              defaultActiveKey='detail'
            >
              <TabPane tab="执行记录" key='detail'>
                <Content record={this.state.record}/>
              </TabPane>
              <TabPane tab="合约内容" key="content">
                <Detail record={this.state.record}/>
              </TabPane>
            </Tabs>
          </div>
        </div>
    )
  }
  componentWillReceiveProps(nextProps) {
//		console.log(nextProps.record)
		this.setState({
			record:nextProps.record,
			title:nextProps.record.name
		})
		console.log(this.state.title)
	}
  componentDidMount(){
  	this.setState({
      record:this.props.record,
			title:this.props.record.name
  	})
  	console.log(this.state.title)
  }
}
const mapStateToProps = (state) => {
  return {
    ...state.user
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarPage)
