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
import DetailForm from './detail'
import InfoForm from './info'
const confirm = Modal.confirm;
export default class App extends Component {
	constructor(props) {
		super()
		this.state = {
			id:"12342340980",
			detailVisible:false,
			editVisible:false,
			data: [
				{
					name:"ddd",
					relate:"2323252341234",
					role:"管理者",
					effect:"生效",
					status:"激活",
				}
			],
			total: 20,
			loading: false,
			pagination: {
				current: 1,
				total: 0,
				pageSize: 6,
			},
		}
		this.columns = [{
			title: '账户名称',
			dataIndex: 'name',
			key: 'name',
			width: '10%',
		}, {
			title: '账户关联账号',
			dataIndex: 'relate',
			key: 'relate',
			width: '20%',
		}, {
			title: '账户角色',
			dataIndex: 'role',
			key: 'role',
			width: '20%',
		}, {
			title: '账户生效',
			dataIndex: 'effect',
			key: 'effect',
			width: '20%',
		}, {
			title: '账户状态',
			dataIndex: 'status',
			key: 'status',
			width: '10%',
		}, {
			title: '操作',
			dataIndex: 'handle',
			width: '20%',
			render: (record, index, e) => (
				<span>
			      <a  onClick={this.handleEdit.bind(this, record,index)}>编辑</a>
			      <span className="ant-divider" />
			      <a  disabled = { index.status =="创建中" ? 'disabled' : "" }  onClick={this.handleDetail.bind(this, record,index)}>查看详细</a>
			      <span className="ant-divider" />
			      <a  style={{"disable":""}} onClick={this.handelOff.bind(this, record,index)}>注销</a>
			    </span>
			),
		}];
	}

//	编辑按钮
	handleEdit(record, index) {
		console.log(index);
	    this.setState({
	      editVisible: true,
	    });
	}
//	查看详细按钮
	handleDetail(record, index) {
		console.log(index);
		// index.suggestion = index.suggestion ||  ('未查询到建议信息!')
	    this.setState({
	      detailVisible: true,
	      // msgs:index.suggestion,
	      // msgTitle:index.name
	    });
		// console.log(this.refs.suggestCon)
	}

//	注销按钮
	handelOff(record, index) {
		confirm({
			title: '您确定要注销此账户?',
			content: '注销后将删除账户所有信息',
			okText: '确定',
			okType: 'danger',
			cancelText: '取消',
			onOk() {
				console.log(index);
				// var par=param({"id":index.id})
				// reqwest(
				// 	api(url.accountPreserveOff,par)
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
	}
//	获取数据
	// getData(status){
	// 	var par=param({
	// 		"status": -1,
	// 		"pageNum": 1,
	// 		"pageSize": 100,
	// 	})
	// 	reqwest(
	// 			api(url.accountPreserveQuery,par)
	// 		).then((req) => {
	// 		console.log(req)
	// 		if(req.result){

	// 			var data = req.result.data;
			// 	this.props.onInfo(data)
	// 			for(var i = 0; i < data.length; i++) {
	// 				var arr = ['创建中', '审核中', '修改中', '等待发布', '已发布'];
	// 				data[i].status = arr[data[i].status];
	// 			}
	// 			this.setState({
	// 				data: data,
	// 			})
	// 		}
	// 	});
	// }
	// componentDidMount() {
	// 	this.getData(-1)
	// }
	// componentWillReceiveProps(props) {
	// 	if(props.isUpdate.update){
	// 		console.log(props.isUpdate.update);
	// 		this.getData(-1)
	// 	}
	// 	if(props.searchParams){
	// 		console.log(props.searchParams)
	// 	}
	// }
	handleDetailOk = (e) => {
    this.setState({
      detailVisible: false,
    });
  }
  handleDetailCancel = (e) => {
    this.setState({
      detailVisible: false,
    });
  }
	 handleEditOk = (e) => {
    this.setState({
      editVisible: false,
    });
  }
  handleEditCancel = (e) => {
    this.setState({
      editVisible: false,
    });
  }

	render() {
		return(
			<div>
				<Table columns={this.columns}
	        rowKey={record => record.registered}
	        dataSource={this.state.data}
	        pagination={this.state.pagination}
	        loading={this.state.loading}
	      />
        <Modal
          title="查看详细"
          visible={this.state.detailVisible}
          onOk={this.handleDetailOk}
          onCancel={this.handleDetailCancel}
          okText="确定"
          cancelText="取消"
          ref="detailModal"
        >
					<InfoForm id={this.state.id}/>
        </Modal>
        <Modal
          title="编辑"
          visible={this.state.editVisible}
          onOk={this.handleEditOk}
          onCancel={this.handleEditCancel}
          okText="确定"
          cancelText="取消"
          ref="editModal"
        >
					<DetailForm id={this.state.id}/>
        </Modal>
			</div>
		);
	}
}
