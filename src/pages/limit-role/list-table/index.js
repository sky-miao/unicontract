import './index.less'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Table, Icon, Button, Form, Input  } from 'antd';
import reqwest from 'reqwest';
import $ from 'jquery';
const { Columns } = Table;
import { api } from '../../../common/api_server'
import { url } from '../../../common/url_api'
import { param }from '../../../common/param'
import EditModal from '../role-edit'
import InfoForm from '../role-auth'
import { actionLimitRoleSearch } from '../../../actions/limit-role'
const confirm = Modal.confirm;
const FormItem = Form.Item;

class Role extends Component {
	constructor(props) {
		super()
		this.state = {
			showEditModal:false,
			showAuthModal:false,
			roleInfo: {},
			total: 20,
			loading: false,
			pagination: {
				current: 1,
				total: 0,
				pageSize: 1,
			},
		}
		this.columns = [{
			title: '角色ID',
			dataIndex: 'roleId',
			key: 'roleId',
			width: '20%',
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
			render: (text, record) => (
				<span>
			      <a  onClick={this.handleEdit.bind(this, text, record)}>编辑</a>
			      <span className="ant-divider" />
			      <a  onClick={this.handleDetail.bind(this, text, record)}>权限</a>
			      <span className="ant-divider" />
			      <a  onClick={this.handelOff.bind(this, text, record)}>删除</a>
			    </span>
			),
		}];
	}
	render() {
		let {getFieldDecorator} = this.props.form
		let {showEditModal, roleInfo} = this.state
		let { roleList } = this.props
		return(
			<div>
				<Table 
					columns={this.columns}
	        rowKey={record => record.registered}
	        dataSource={roleList}
	        pagination={this.state.pagination}
	        loading={this.state.loading}
					onChange={this.handleTableChange.bind(this)}
	      />
				<EditModal
            show={showEditModal}
            roleInfo={roleInfo}
            onCancel={() => {
              this.setState({
                showEditModal: false,
              })
            }}
            onConfirm={this.handleEditRole.bind(this)}  //点击编辑的确认
        />
        <Modal
          title="查看详细"
          visible={this.state.showAuthModal}
          onOk={this.handleDetailOk}
          onCancel={this.handleDetailCancel}
          okText="确定"
          cancelText="取消"
          ref="detailModal"
        >
					<InfoForm id={this.state.id}/>
        </Modal>
			</div>
		);
	}
	submitEdit(){

	}
	handleCancel(){

	}

	//	编辑按钮
	handleEdit(text, record) {
		this.setState({
			showEditModal: true,
			roleInfo: record,
		});
	}
	handleEditRole() {
    this.setState({
      showEditModal: false,
      pagination: {
        ...this.state.pagination,
        pager: 1,
      }
    })
    this.fetchData()
	}
	
	//	查看详细按钮
	handleDetail(record) {
			this.setState({
				showAuthModal: true,
				roleInfo: record,
			});
	}
	//	删除按钮
	handelOff(text, record) {
		confirm({
			title: '您确定要删除此角色?',
			content: '删除后将删除角色所有信息',
			okText: '确定',
			okType: 'danger',
			cancelText: '取消',
			onOk() {
				console.log(record.roleId, 'roleId')
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
		this.props.fetchData()
	}

	handleDetailOk = (e) => {
		this.setState({
			showAuthModal: false,
		});
	}
	handleDetailCancel = (e) => {
		this.setState({
			showAuthModal: false,
		});
	}
	onPageChange(pagination) {
    this.setState({
      pagination: pagination
    }, () => {
      this.fetchData()
    })
  }
}
const mapStateToProps = (state) => {
  return {
    ...state.limitRole,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (search) => {
      actionLimitRoleSearch(dispatch, search);
    },
  }
}
const RoleModal = Form.create()(Role);
export default connect(mapStateToProps, mapDispatchToProps)(RoleModal)
