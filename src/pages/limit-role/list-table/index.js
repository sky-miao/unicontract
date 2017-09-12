import './index.less'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Table, Icon, Button  } from 'antd';
import reqwest from 'reqwest';
import $ from 'jquery';
const { Columns } = Table;
import { api } from '../../../common/api_server'
import { url } from '../../../common/url_api'
import { param }from '../../../common/param'
import DetailForm from './detail'
import InfoForm from './info'
import { actionRoleList } from '../../../actions/limit-role'
const confirm = Modal.confirm;

class Role extends Component {
	constructor(props) {
		super()
		this.state = {
			id:"12342340980",
			detailVisible:false,
			editVisible:false,
			total: 20,
			loading: false,
			pagination: {
				current: 1,
				total: 0,
				pageSize: 6,
			},
		}
		this.columns = [{
			title: '角色ID',
			dataIndex: 'roleId',
			key: 'roleId',
			width: '10%',
		}, {
			title: '角色名称',
			dataIndex: 'roleName',
			key: 'roleName',
			width: '20%',
		}, {
			title: '角色描述',
			dataIndex: 'roleDetail',
			key: 'role',
			width: '20%',
		}, {
			title: '操作',
			dataIndex: 'handle',
			width: '20%',
			render: (record, index, e) => (
				<span>
			      <a  onClick={this.handleEdit.bind(this, record,index)}>编辑</a>
			      <span className="ant-divider" />
			      <a  disabled = { index.status =="创建中" ? 'disabled' : "" }  onClick={this.handleDetail.bind(this, record,index)}>权限</a>
			      <span className="ant-divider" />
			      <a  style={{"disable":""}} onClick={this.handelOff.bind(this, record,index)}>删除</a>
			    </span>
			),
		}];
	}

//	编辑按钮
	handleEdit(record, index) {
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
		pager.current = pagination.current;
		this.setState({
			pagination: pager,
		});
	}

	componentDidMount() {
		this.props.fetchDate()
	}

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
	        dataSource={this.props.roleList || []}
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
const mapStateToProps = (state) => {
  return {
    ...state.limitRole,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchDate: (id, search) => {
      actionRoleList(dispatch, search);
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Role)