import './index.less'
import React, {
	Component
} from 'react'
import { Modal, Button,Input, Icon, message } from 'antd';
import reqwest from 'reqwest';
import {
	api,
} from '../../../../common/api_server'
import {
	param,
}from '../../../../common/param'
import {
	url,
}from '../../../../common/url_api'

class CreateInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
    };
  }
  emitEmpty = () => {
    this.userNameInput.focus();
    this.setState({ userName: '' });
  }
  onChangeUserName = (e) => {
    this.setState({ userName: e.target.value });
  }
  render() {
    const { userName } = this.state;
    const suffix = userName ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
    return (
      <Input
        placeholder="Enter your contract name"
        prefix={<Icon type="edit" />}
        suffix={suffix}
        value={userName}
        onChange={this.onChangeUserName}
        ref={node => this.userNameInput = node}
      />
    );
  }
}

export default class CreateBtn extends React.Component {
  state = {
  	visible: false,
	update:false,
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
    console.log(this.refs.myInput.state.userName)
    var value=this.refs.myInput.state.userName;
	var par=param({
		"name": value
	})
	reqwest(
			api(url.fileCreate,par)
		).then((res) => {
		console.log(res)
		this.setState({
			update:true
		})
		console.log(this.state)
		this.props.onUpdate(this.state)
//		var parameters = 'name=' + encodeURI(res.result.name) + '&id=' + res.result.id + '&contractId=' + res.result.contractId;
//		location.href = 'http://localhost:63342/unicontract-design/new/main/static/contract/index.html?' + encodeURI(parameters);
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
        <Button type="primary" onClick={this.showModal}>创建合约</Button>
        <Modal
          title="合约名称"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="创建"
          cancelText="取消"
        >
          <CreateInput ref="myInput"/>
        </Modal>
      </div>
    );
  }
}
