import './index.less'
import React, {
	Component
} from 'react'
import { Link, } from 'react-router'
import Table from 'antd/lib/table'
import Icon from 'antd/lib/icon'
import Button from 'antd/lib/button'
import Input from 'antd/lib/input'
import Modal from 'antd/lib/modal'
import fetch from '../../../utils/fetch' //资源请求
import message from 'antd/lib/message'
import { confirm } from 'antd/lib/modal'
import { camelize, JSONToParams } from '../../../utils/lang' //转url方法
import { checkAuth, } from '../../../utils/auth' //检查用户
import SidebarPage from '../sidebar' //列表详情
import RightModel from '../../../components/rightModel' //右侧容器
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
	Column,
	ColumnGroup
} = Table;

export default class ListTable extends Component {
	constructor(props) {
		super()
		this.state = {
			record:{},
			id:'',
			contractId:'',
			isPage: false,
			data: [{}],
			total: 20,
			loading: false,
			pagination: {
				current: 1,
				total: 0,
				pageSize: 10,
			},
			showModal: false,
			showAuditModal: false,
			audit: {},
			curTransactionId: '',
			selectedRowKeys: [],
		}
		this.columns = [{
			title: '名称',
			dataIndex: 'name',
			width: 150,
			key: 'name',
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
			filters: [
				{
				    text: '未执行',
					value: 0,
			 	 }
				, {
				    text: '正在执行',
					value: 1,
			 	}
				, {
				    text: '终止',
					value: 2,
			 	}
			 ],
		}]
	}
	render() {
		let {
			record,
			id,
			contractId,
			isPage,
			data,
			pagination,
			loading,
			showModal,
			showAuditModal,
			audit,
			curTransactionId,
			curOrderCode,
			selectedRowKeys,
		} = this.state
		let {
			authes
		} = this.props
		return(
			<div>
        {/*侧边栏*/}
        <RightModel show={isPage} handleShowArea={this.handleShowArea}>
          <div className='content-page'>
            <SidebarPage  record={this.state.record} contractId={this.state.record.contractId} id={this.state.record.id}/>
          </div>
        </RightModel>
        <Table
          className="order-mange list-table"
          bordered
          dataSource={data}
          pagination={pagination}
          onChange={this.handlePageChange.bind(this)}
          columns={this.columns}
          loading={loading}
          onRowClick={this.handleTableClick.bind(this)}
        />
      </div>
		)
	}

	//	获取数据
	getData(){
		var par=param({})
		reqwest(api(url.executeQueryAll,par)).then((req) => {
			console.log(req)
			if(req.code == 0){
				var list = req.result.data;
				for(var i = 0; i < list.length; i++) {
					if(list[i].status == 'Contract_Unknown' || list[i].status == 'Contract_Create' || list[i].status == 'Contract_Signature') {
						list[i].status = '未执行';
					} else if(list[i].status == 'Contract_In_Process') {
						list[i].status = '正在执行';
					} else if(list[i].status == 'Contract_Completed') {
						list[i].status = '已完成';
					} else if(list[i].status == 'Contract_Discarded') {
						list[i].status = '终止';
					}
				}
				this.setState({
					data: list,
					record:list[0]
				})
			}
		});
	}

	componentDidMount() {
		this.getData()
	}


//	componentDidMount() {
//		this.fetchData(this.props.searchParams)
//	}
	componentWillReceiveProps(props) {
		if(props.searchParams){
			console.log(props.searchParams)
		}
	}
	//点击Table中的每行
	handleTableClick(record, index, e) {
		console.log("%c-------------record-------------------", "color:red")
		console.log(record)
		this.setState({
			record: record
		})
		console.log(this.state.record)
		let flag = true
		if(e.target.localName !== 'td') {
			flag = false
		}
		if(flag) {
			this.setState({
				isPage: !this.state.isPage,
			})
			let self = this
			setTimeout(function() {
				if(self.state.isPage) {
					const calc = function() {
						self.setState({
							isPage: false
						})
						document.removeEventListener('click', calc)
					}
					document.addEventListener('click', calc)
				}
			}, 20)
		}
	}
	handleShowArea(e) {
		e.nativeEvent.stopImmediatePropagation()
	}

	handlePageChange(pagination) {
		this.setState({
			pagination: pagination
		}, () => {
			this.fetchData(this.props.searchParams)
		})
	}


	fetchData(params) {
		this.setState({
			loading: true
		})
		params = JSONToParams({
			...params,
			pageSize: this.state.pagination.pageSize,
			page: this.state.pagination.current,
		})
		fetch('/platform-buyer/api/platform/trade/order/queryPurchaseOrder?' + params).then((data) => {
			if(data.errorCode === 0) {
				this.setState({
					data: data.result.dataList,
					pagination: {
						...this.state.pagination,
						total: data.result.totalCount,
					}
				})
			}
			this.setState({
				loading: false
			})
		}).catch((e) => {
			this.setState({
				loading: false
			})
			// console.log(e)
		})
	}
}
