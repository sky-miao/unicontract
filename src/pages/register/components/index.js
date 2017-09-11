import React from 'react';
import './index.less';
import { Form, Icon, Input, Button, Checkbox, message, Tooltip, Cascader, Select } from 'antd';
import { hashHistory } from 'react-router'
import reqwest from 'reqwest';
const FormItem = Form.Item;
const Option = Select.Option;

class NormalLoginForm extends React.Component {
	  state = {
	    confirmDirty: false,
	    roleList:[],
	  };
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if(!err) {
				console.log('Received values of form: ', values);
//				withCredentials: true,
				reqwest({
					url: 'http://localhost:8081/register',
					method: 'post',
					data: {
						"username": values['nickname'],
						"password": values['password']
					},
					type: 'json',
				}).then((res) => {
					console.log(res)
					if(res.code == 0) {
						message.success(res.msg);
						hashHistory.push('/logins')
					} else {
						message.error(res.msg);
					}
				});
			}
		});
	}
	 checkPassword = (rule, value, callback) => {
	    const form = this.props.form;
	    if (value && value !== form.getFieldValue('password')) {
	      callback('两次输入密码不一致!');
	    } else {
	      callback();
	    }
	  }
	  checkConfirm = (rule, value, callback) => {
	    const form = this.props.form;
	    if (value && this.state.confirmDirty) {
	      form.validateFields(['confirm'], { force: true });
	    }
	    callback();
	  }
	render() {
	let {roleList,} = this.state
		const {
			getFieldDecorator
		} = this.props.form;
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
        const tailFormItemLayout = {
	      wrapperCol: {
	        xs: {
	          span: 24,
	          offset: 0,
	        },
	        sm: {
	          span: 14,
	          offset: 6,
	        },
	      },
	    };
    var keys=[];
		return(
			<div className='con'>
				<h2 className='title'>智能合约管理平台注册</h2>
				<Form onSubmit={this.handleSubmit}>
			        <FormItem
			          {...formItemLayout}
			          label={(
			            <span>
			              用户名&nbsp;
			              <Tooltip title="设置您的账户用户名">
			                <Icon type="question-circle-o" />
			              </Tooltip>
			            </span>
			          )}
			          hasFeedback
			        >
			          {getFieldDecorator('nickname', {
			            rules: [{ required: true, message: '输入您的用户名!', whitespace: true }],
			          })(
			            <Input type="text"/>
			          )}
			        </FormItem>
			        <FormItem
			          {...formItemLayout}
			          label="姓名"
			          hasFeedback
			        >
			          {getFieldDecorator('linkname', {
			            rules: [{ required: true, message: '输入您的姓名!', whitespace: true }],
			          })(
			            <Input />
			          )}
			        </FormItem>
			        <FormItem
			          {...formItemLayout}
			          label="联系电话"
			          hasFeedback
			        >
			          {getFieldDecorator('linkphone', {
			            rules: [{ required: true, message: '输入您的联系电话!', whitespace: true }],
			          })(
			            <Input />
			          )}
			        </FormItem>
		           <FormItem
			          {...formItemLayout}
			          label="角色"
			          hasFeedback
			        >
			          {getFieldDecorator('select', {
			            rules: [
			              { required: true, message: '请选择用户角色!' },
			            ],
			          })(
			            <Select placeholder="请选择用户角色">
			              <Option value="4">设计者</Option>
			              <Option value="5">审核者</Option>
			              <Option value="6">用户</Option>
			            </Select>
			          )}
			        </FormItem>

			        <FormItem
			          {...formItemLayout}
			          label="密码"
			          hasFeedback
			        >
			          {getFieldDecorator('password', {
			            rules: [{
			              required: true, message: '请设置您的用户密码!',
			            }, {
			              validator: this.checkConfirm,
			            }],
			          })(
			            <Input type="password" />
			          )}
			        </FormItem>
			        <FormItem
			          {...formItemLayout}
			          label="确认密码"
			          hasFeedback
			        >
			          {getFieldDecorator('confirm', {
			            rules: [{
			              required: true, message: '请再次输入您的用户密码!',
			            }, {
			              validator: this.checkPassword,
			            }],
			          })(
			            <Input type="password" onBlur={this.handleConfirmBlur} />
			          )}
			        </FormItem>
			        <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
			          {getFieldDecorator('agreement', {
			            valuePropName: 'checked',
			          })(
			            <Checkbox>我同意平台<a href="">用户协议</a></Checkbox>
			          )}
			        </FormItem>
			        <FormItem {...tailFormItemLayout}>
			          <Button type="primary" htmlType="submit">注册</Button>
			        </FormItem>
			      </Form>
			</div>
		);
	}
  componentDidMount() {
		reqwest({
			url: 'http://localhost:9088/companyUser/list',
			method: 'post',
			withCredentials: true,
			data: {
				"token": "futurever",
			},
			type: 'json',
		}).then((req) => {
			console.log(req)
			this.setState({
				roleList:req.result
			})
			console.log(this.state)
		});
	}
}

const LoginForm = Form.create()(NormalLoginForm);

export default LoginForm;
