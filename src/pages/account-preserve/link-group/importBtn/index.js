import './index.less'
import React, {
	Component
} from 'react'
import { Modal, Button, Icon, message, Input } from 'antd';
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

export default class ImportBtn extends React.Component {
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
		var files = this.refs.myfile.files[0];
		if(this.refs.myfile.value == "") {
			message.error(`导入文件不能为空!`);
		} else {
			var name = files.name;
			var filename = name.split('.')[0]
			if(name.split('.')[1] != 'xml') {
				message.error('请选择标准的XML格式文件导入！')
			} else {
				var _this=this
				var reader = new FileReader(); //新建一个FileReader
				reader.readAsText(files, "UTF-8"); //读取文件
				reader.onload = function(evt) { //读取完文件之后会回来这里
					var fileString = evt.target.result; // 读取文件内容
					console.log(fileString)
					var par=param({
						"name": filename,
						"createFlag": true
					})
					var datas={
						"xmlContract": fileString,
					}
					reqwest(
						api(url.fileImport,par,datas)
					).then((res) => {
						message.success(`${filename}--导入成功!`);
						console.log(res)
						_this.setState({
							update:true
						})
						console.log(_this.state)
    					_this.props.onUpdate(_this.state)
//								var parameters = 'name=' + encodeURI(res.result.name) + '&id=' + res.result.id + '&contractId=' + res.result.contractId;
//								location.href = 'http://localhost:63342/unicontract-design/new/main/static/contract/index.html?' + encodeURI(parameters);
					});
				}
			}
		}
	}
	handleCancel = (e) => {
		console.log(e);
		this.setState({
			visible: false,
		});
	}
	render() {
		return(
			<div>
        <Button type="primary" onClick={this.showModal}>导入账户信息</Button>
        <Modal
          title="选择账户信息文件"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="导入"
          cancelText="取消"
        >
			<input type="file" ref="myfile" style={{'marginLeft':'150px'}}/>
        </Modal>
      </div>
		);
	}
}
