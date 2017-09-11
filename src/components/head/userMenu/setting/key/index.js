import React, {
	Component
} from 'react'
import { Link} from 'react-router'
import { Table, Button, message, } from 'antd';
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
const {
	Columns,
} = Table;
class KeyList extends Component {
	constructor(props) {
		super()
		this.state={
			data:[],
		    pagination: false,
		}
		this.columns = [
			{
				title: '用户',
				dataIndex: 'createUserName',
				key: 'createUserName',
			},
			{
				title: '公钥',
				dataIndex: 'pubkey',
				key: 'pubkey',

			}, {
			  title: '私钥',
			  dataIndex: 'prikey',
			  key: 'prikey',
			},
			{
		    title: '操作',
		    key: 'operation',
		    fixed: 'right',
		    width: 150,
				render: (record, index, e) => (
					<span>
				      <a  onClick={this.handleRelate.bind(this, record,index)}>关联</a>
				      <span className="ant-divider" />
				      <a  style={{"disable":""}} onClick={this.handelDelete.bind(this, record,index)}>删除</a>
				    </span>
				),
		  },
		]
	}

//	关联按钮
	handleRelate(record, index) {
		console.log(index);
		// var par=param({
		// 	"id": index.id
		// })
		// reqwest(
		// 	api(url.persetRelateKey,par)
		// ).then((req) => {
		// 	console.log(req)
		// 	if (req.code == 0) {
		// 		message.success(res.msg);
		// 		this.getData()
		// 	}else{
		// 		message.error(res.msg);
		// 	}
		// });
	}
	//	删除按钮
	handelDelete(record, index) {
		console.log(index);
		// var par=param({
		// 	"id": index.id
		// })
		// reqwest(
		// 	api(url.persetDeleteKey,par)
		// ).then((req) => {
		// 	console.log(req)
		// 	if (req.code == 0) {
		// 		message.success(res.msg);
		// 		this.getData()
		// 	}else{
		// 		message.error(res.msg);
		// 	}
		// });
	}
	// 申请按钮
	handleApply(){
		console.log("apply");
		// var par=param({})
		// reqwest(
		// 	api(url.persetApplyKey,par)
		// ).then((req) => {
		// 	console.log(req)
		// 	if (req.code == 0) {
		// 		message.success(res.msg);
		// 		this.getData()
		// 	}else{
		// 		message.error(res.msg);
		// 	}
		// });
	}
	getData(){
		var par=param({})
		reqwest(api(url.persetkeyList,par)).then((req) => {
			console.log(req)
			this.setState({
				data:req.result.data
			})
			console.log(this.state)
		});
	}
	componentDidMount() {
		this.getData();
	}
	render() {
		return(
			<div>
				<Table
				scroll={{ x: 1000, y: 300}}
				columns={this.columns}
				dataSource={this.state.data}
				pagination={this.state.pagination}
				/>
				<Button type="primary" onClick={this.handleApply} style={{marginLeft:"45%",marginTop:"20px"}}>申请</Button>
			</div>
		)
	}
}
export default KeyList
