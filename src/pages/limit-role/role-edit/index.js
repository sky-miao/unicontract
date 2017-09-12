import React, {Component}from 'react';
import { connect } from 'react-redux'
import { Form, Icon, Input, Button, Checkbox, message, Modal } from 'antd';
import { hashHistory } from 'react-router'
import reqwest from 'reqwest';
import { api } from '../../../common/api_server'
import { param }from '../../../common/param'
import { url }from '../../../common/url_api'
import { actionRoleEdit } from  '../../../actions/limit-role'
const FormItem = Form.Item;

class Edit extends Component {
  constructor(props) {
		super()
      this.state = {
        
      };
  }
	render() {
		let {
      show,
      roleInfo,
    } = this.props
    let {getFieldDecorator} = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
		return(
  		<Modal className="role-info-model" title="角色编辑" visible={show}
        okText="保存"
        onOk={this.submitEdit.bind(this)}   onCancel={this.handleCancel.bind(this)}
          >
        <Form>
          <FormItem
              {...formItemLayout}
              label="角色ID"
              hasFeedback
            >
              <div className="input-wrap">
                {getFieldDecorator('roleId', {
                    rules: [{ required: true, type: 'string', min: 1, message: '请输入角色ID'}],
                    initialValue: roleInfo.roleId,
                  })(
                  <Input name='roleName' key='roleName'/>
                )}
              </div>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="角色名称"
              hasFeedback
            >
              <div className="input-wrap">
                {getFieldDecorator('roleName', {
                    rules: [{ required: true, type: 'string', min: 1, message: '请输入角色名称'}],
                    initialValue: roleInfo.roleName,
                  })(
                  <Input name='roleName' key='roleName'/>
                )}
              </div>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="角色描述"
              hasFeedback>
              <div className="input-wrap">
                {getFieldDecorator('roleDetail', {
                    rules: [{ required: true, type: 'string', min: 1, message: '请输入角色描述'}],
                    initialValue: roleInfo.roleDetail
                  })(
                    <Input name='roleDetail' key='roleDetail'/>
                )}
              </div>
            </FormItem>
            </Form>
        </Modal>
		);
  }
    //点击取消
  handleCancel() {
    this.props.form.resetFields()
    this.props.onCancel()
  }
  // 点击确定
  submitEdit(e){
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.submitEdit(values)
      }
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
    submitEdit: (info) => {
      actionRoleEdit(dispatch, info);
    },
  }
}


const EditModal = Form.create()(Edit);
export default connect(mapStateToProps, mapDispatchToProps)(EditModal)
