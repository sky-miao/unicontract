import './index.less'
import React, {
	Component
} from 'react'
import { Link} from 'react-router'
import { Table } from 'antd';
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
	Columns,
} = Table;
class ListTable extends Component {
	constructor(props) {
		super()
		this.state={
			data:[],
			pagination: {
				current: 1,
				total: 0,
				pageSize: 3,
			},
		}
		this.columns = [{
			title: '名称',
			dataIndex: 'contractName',
			width: 150,
			key: 'contractName',
		}, {
			title: '创建时间',
			dataIndex: 'createTime',
			key: 'createTime',
			width: 150,
		}, {
			title: '编号',
			dataIndex: 'contractId',
			key: 'contractId',
			width: 150,
		}, {
			title: '执行时间',
			dataIndex: 'start',
			key: 'start',
			width: 150,
		}, {
		  title: '执行状态',
		  dataIndex: 'status',
		  key: 'status',
		  width: 150,
		}]
	}
	componentDidMount() {
		var par=param({})
		reqwest(
			api(url.transferQueryAll,par)
		).then((req) => {
			console.log(req)
			if(req.code == 0){
				var list = req.result.data;
        for(var i = 0; i < list.length; i++) {
            if(list[i].status == 'Contract_Unknown' || list[i].status == 'Contract_Create' || list[i].status == 'Contract_Signature') {
                list[i].status  = '未执行';
            } else if(list[i].status == 'Contract_In_Process') {
                list[i].status  = '正在执行';
            } else if(list[i].status == 'Contract_Completed') {
                list[i].status  = '已完成';
            } else if(list[i].status == 'Contract_Discarded') {
                list[i].status  = '终止';
            }
        }
				this.setState({
					data: list,
				})
			}
		});
	}
	render() {
		return(
			<Table columns={this.columns} dataSource={this.state.data} />
		)
	}
}
export default ListTable
