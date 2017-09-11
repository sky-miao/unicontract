import './index.less'
import React, {
	Component
} from 'react'
import { Link, } from 'react-router'
import { confirm, Button, Icon, Table, Input, Modal, message } from 'antd'
import reqwest from 'reqwest';
import {
	api,
} from '../../../common/api_server'
import {
	param,
}from '../../../common/param'
import {
	url,
}from '../../../common/url_api'

const {
	columns,
} = Table;
export default class ListTable extends Component {
	constructor(props) {
		super()
		this.state = {
			data:[
				{
					name:"区块链1",
					role:1,
					status:false,
					applytime:"2017-09-01",
				},
				{
					name:"区块链2",
					role:3,
					status:true,
					applytime:"2017-09-04",
				},
				{
					name:"区块链3",
					role:2,
					status:false,
					applytime:"2017-09-02",
				},
				{
					name:"区块链4",
					role:4,
					status:true,
					applytime:"2017-09-06",
				},
			],
			pagination: {
				current: 1,
				total: 0,
				pageSize: 6,
			},
		}
		this.columns = [{
			title: '账户名',
			dataIndex: 'name',
			width: 150,
			key: 'name',
		}, {
			title: '账户角色',
			dataIndex: 'role',
			key: 'role',
			width: 100,
		}, {
			title: '账户状态',
			dataIndex: 'status',
			key: 'status',
			width: 150,
		}, {
			title: '申请日期',
			dataIndex: 'applytime',
			key: 'applytime',
			width: 100,
		}, {
			title: '操作',
			dataIndex: 'handle',
			width: 200,
			render: (record, index, e) => (
				<span>
		      <a  disabled = { index.status =="未通过" ? '' : "disabled" }  onClick={this.handlePass.bind(this, record,index)}>审核通过</a>
		      <span className="ant-divider" />
		      <a  disabled = { index.status =="未通过" ? 'disabled' : "" } onClick={this.handleNoPass.bind(this, record,index)}>审核不通过</a>
		    </span>
			),
		}]
	}
	//	审核通过
	handlePass(e, record, index) {
		console.log(record)
	// 	var par=param({
	// 			"id": record.id,
	// 	})
	// 	reqwest(
	// 		api(url.accountCheckPass,par)
	// 	).then((req) => {
	// 		console.log(req)
	// 		if (req.code == 0) {
	// 			message.success(req.msg)
	// 			this.getData()
	// 		}else {
	// 			message.error(req.msg)
	// 		}
	// 	});
	}
	//	审核不通过
	handleNoPass(e, record, index) {
		console.log(record)
	// 	var par=param({
	// 			"id": record.id,
	// 	})
	// 	reqwest(
	// 		api(url.accountCheckNopass,par)
	// 	).then((req) => {
	// 		console.log(req)
	// 		if (req.code == 0) {
	// 			message.success(req.msg)
	// 			this.getData()
	// 		}else {
	// 			message.error(req.msg)
	// 		}
	// 	});
	}

	render() {
		return(
			<div>
        <Table
          className="order-mange list-table"
          bordered
					dataSource={this.state.data}
          pagination={this.state.pagination}
          columns={this.columns}
        />
      </div>
		)
	}

	// //	获取数据
	// getData(status) {
	// 	var par=param({
	// 		"pageSize": 10
	// 	})
	// 	reqwest(
	// 		api(url.accountCheckList,par)
	// 	).then((req) => {
	// 		console.log(req)
	// 		if(req.result) {
	// 			var data = req.result.data;
	// 			for(var i = 0; i < data.length; i++) {
						// var arr=["管理员","设计者","审核者","用户"]
						// data[i].role=arr[(data[i].role-1)]
						// data[i].status=(data[i].status?"通过":"未通过")
	// 			}
	// 			this.setState({
	// 				data: data,
	// 			})
	// 		}
	// 	});
	// }
	//
	componentDidMount() {
		// this.getData();
		var data=this.state.data
		for (var i = 0; i < data.length; i++) {
			var arr=["管理员","设计者","审核者","用户"]
			data[i].role=arr[(data[i].role-1)]
			data[i].status=(data[i].status?"通过":"未通过")
		}
		this.setState({
			data:data
		})
	}
}
