import './index.less'
import React, {
	Component
} from 'react'
import {  Tabs , Modal, Button,Input, Icon} from 'antd';
import KeyList from './key'
import ResetForm from './reset'
import BaseForm from './base'
import Off from './off'
const TabPane = Tabs.TabPane;
function callback(key) {
  console.log(key);
}

class SetTabs extends React.Component {
  render() {
  	return(
	  <Tabs defaultActiveKey="key1" onChange={callback}>
	    <TabPane tab="密码重置" key="key1">
				<ResetForm/>
	    </TabPane>
	    <TabPane tab="基本信息" key="key2">
				<BaseForm/>
			</TabPane>
	    <TabPane tab="账号管理" key="key3">
				<KeyList/>
			</TabPane>
	    <TabPane tab="权限查询" key="key4">权限查询</TabPane>
	    <TabPane tab="账号注销" key="key5">
				<Off/>
			</TabPane>
     </Tabs>
  	)
  }
}

export default class SetCon extends React.Component {
  state = {
  	visible: false,
  	width:850
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  render() {
    return (
      <div>
        <span onClick={this.showModal}><Icon type="setting" /> 个人设置</span>
        <Modal
					footer={null}
		  		width={this.state.width}
          title="个人设置"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="确定"
          cancelText="取消"
        >
          <SetTabs/>
        </Modal>
      </div>
    );
  }
}
