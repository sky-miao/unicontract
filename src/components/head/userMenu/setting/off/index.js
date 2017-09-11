import React, {
	Component
} from 'react'
import { Link} from 'react-router'
import { Table, Button, message, Modal, } from 'antd';
import reqwest from 'reqwest';
import {
	api,
} from '../../../../../common/api_server'
import {
	param,
}from '../../../../../common/param'
import {
	url,
}from '../../../../../common/url_api'
const confirm = Modal.confirm;
export default class Off extends Component{

	showDeleteConfirm() {
	  confirm({
	    title: '您确定要注销此账户?',
	    content: '注销后将删除账户所有信息',
	    okText: '确定',
	    okType: 'danger',
	    cancelText: '取消',
	    onOk() {
	      console.log('OK');
				// var par=param({})
				// reqwest(
				// 	api(url.persetOff,par)
				// ).then((req) => {
				// 	console.log(req)
				// 	if (req.code == 0) {
				// 		message.success(res.msg);
				// 	}else{
				// 		message.error(res.msg);
				// 	}
				// });
	    },
	    onCancel() {
	      console.log('Cancel');
	    },
	  });
	}
	render() {
		return(
			<div>
		    <Button onClick={this.showDeleteConfirm} type="dashed" style={{marginLeft:"45%",marginTop:"20px"}}>
		      注销
		    </Button>
			</div>
		)
	}
}

// <Button type="primary" onClick={this.handleOff} style={{marginLeft:"45%",marginTop:"20px"}}>注销</Button>
