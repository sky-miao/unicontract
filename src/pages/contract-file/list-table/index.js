import './index.less'
import React, {
	Component
} from 'react'
import { Modal, Table, Icon, Button  } from 'antd';
import reqwest from 'reqwest';
import $ from 'jquery';
const {
	Columns,
} = Table;
import {
	api,
} from '../../../common/api_server'
import {
	url,
} from '../../../common/url_api'
import {
	param,
}from '../../../common/param'
export default class App extends Component {
	constructor(props) {
		super()
		this.state = {
			msgTitle:'',
			msgs:'未查询到建议信息',
			visible:false,
			isPage: false,
			data: [{}],
			total: 20,
			loading: false,
			pagination: {
				current: 1,
				total: 0,
				pageSize: 6,
			},
			showModal: false,
			showAuditModal: false,
			audit: {},
			curTransactionId: '',
			selectedRowKeys: [],
		}
		this.columns = [{
			title: '序号',
			dataIndex: 'id',
			key: 'id',
			width: '10%',
		}, {
			title: '合约编号',
			dataIndex: 'contractId',
			key: 'contractId',
			width: '20%',
		}, {
			title: '合约名称',
			dataIndex: 'name',
			key: 'name',
			width: '20%',
		}, {
			title: '修改时间',
			dataIndex: 'createTime',
			key: 'createTime',
			width: '20%',
		}, {
			title: '文件状态',
			dataIndex: 'status',
			key: 'status',
			width: '10%',
			filters: [
				{
				    text: '创建中',
					value: 0,
			 	 }
				, {
				    text: '审核中',
					value: 1,
			 	}
				, {
				    text: '修改中',
					value: 2,
			 	}
				, {
				    text: '等待发布',
					value:3,
			 	}
				, {
				    text: '已发布',
					value: 4,
			 	}
			 ],
		}, {
			title: '操作',
			dataIndex: 'handle',
			width: '20%',
			render: (record, index, e) => (
				<span>
			      <a  onClick={this.handleEdit.bind(this, record,index)}>编辑</a>
			      <span className="ant-divider" />
			      <a  disabled = { index.status =="创建中" || index.status == "修改中" ? '' : "disabled" } onClick={this.handleSendAudit.bind(this, record,index)}>送审</a>
			      <span className="ant-divider" />
			      <a  disabled = { index.status =="创建中" ? 'disabled' : "" }  onClick={this.handleSuggestion.bind(this, record,index)}>查看修改意见</a>
			      <span className="ant-divider" />
			      <a  style={{"disable":""}} onClick={this.handelDelete.bind(this, record,index)}>删除</a>
			    </span>
			),
		}];
	}
//	编辑按钮
	handleEdit(record, index) {
		var parameters = 'name=' + encodeURI(index.name) + '&id=' + index.id + '&contractId=' + index.contractId+'&username='+encodeURI(sessionStorage.name)+'&pubkey='+encodeURI(sessionStorage.pubkey);
		location.href = 'http://localhost:63342/unicontract-design/new/main/static/contract/index.html?' + encodeURI(parameters);
	}
//	送审按钮
	handleSendAudit(record, index) {
		var par=param({
			"id": index.id
		})
		reqwest(
			api(url.fileSendAudit,par)
		).then((req) => {
			console.log(req)
			this.getData(-1)
		});
	}
//	查看修改意见按钮
	handleSuggestion(record, index) {
		index.suggestion = index.suggestion ||  ('未查询到建议信息!')
	    this.setState({
	      visible: true,
	      msgs:index.suggestion,
	      msgTitle:index.name
	    });
		console.log(this.refs.suggestCon)
	}
//	删除按钮
	handelDelete(record, index) {
		var par=param({
			"id": index.id
		})
		reqwest(
			api(url.fileDelete,par)
		).then((req) => {
			console.log(req)
			this.getData(-1)
		});
	}
//分页 筛选状态
	handleTableChange = (pagination, filters, sorter) => {
		const pager = { ...this.state.pagination
		};
		console.log(pagination)
		console.log(sorter)
		pager.current = pagination.current;
		this.setState({
			pagination: pager,
		});
		if(filters.status){
			console.log(5555)
			this.getData(filters.status[0])
		}else{
			console.log(4444)
			this.getData(-1)
		}
	}
//	获取数据
	getData(status){
		var par=param({
			"status": -1,
			"pageNum": 1,
			"pageSize": 100,
		})
		reqwest(
				api(url.fileList,par)
			).then((req) => {
			console.log(req)
			if(req.result){
				var data = req.result.data;
				for(var i = 0; i < data.length; i++) {
					var arr = ['创建中', '审核中', '修改中', '等待发布', '已发布'];
					data[i].status = arr[data[i].status];
				}
				this.setState({
					data: data,
				})
			}
		});
	}
	componentDidMount() {
		this.getData(-1)
	}
	componentWillReceiveProps(props) {
		if(props.isUpdate.update){
			console.log(props.isUpdate.update);
			this.getData(-1)
		}
		if(props.searchParams){
			console.log(props.searchParams)
		}
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
	//点击Table中的每行
	handleTableClick(record, index, e) {
		let flag = true
		if(e.target.localName !== 'td') {
			flag = false
		}
		if(flag) {
			console.log(record)
		}
	}
	render() {
		return(
			<div>
				<Table columns={this.columns}
			        rowKey={record => record.registered}
			        dataSource={this.state.data}
			        pagination={this.state.pagination}
			        loading={this.state.loading}
			        onChange={this.handleTableChange}
		     		onRowClick={this.handleTableClick.bind(this)}
			      />
		        <Modal
		          title="修改意见"
		          visible={this.state.visible}
		          onOk={this.handleOk}
		          onCancel={this.handleCancel}
		          okText="确定"
		          cancelText="取消"
		          ref="modal"
		        >
		          <p ref="suggestTitle">合约名称:{this.state.msgTitle}</p>
		          <p ref="suggestCon">修改意见:{this.state.msgs}</p>
		        </Modal>
			</div>
		);
	}
}
