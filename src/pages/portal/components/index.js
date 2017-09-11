import React from 'react';
import './index.less';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import { hashHistory } from 'react-router'
import reqwest from 'reqwest';
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if(!err) {
				console.log('Received values of form: ', values);
				// console.log(values['用户名'])
				reqwest({
					url: 'http://localhost:8081/login',
					method: 'post',
					data: {
						"username": values['userndame'],
						"password": values['password']
					},
					type: 'json',
				}).then((res) => {
					console.log(res)
					if(res.code == 200) {
						hashHistory.push('/main')
					} else {
						message.error('您输入的用户名或密码不正确!');
					}
				});
			}
		});
	}
	render() {
		const {
			getFieldDecorator
		} = this.props.form;
		return(
			<div className='con'>
				<h2 className='title'>智能合约管理平台</h2>
				<Form onSubmit={this.handleSubmit} className="login-form">
			        <FormItem>
			          {getFieldDecorator('username', {
			            rules: [{ required: true, message: '请输入您的用户名!' }],
			          })(
			            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
			          )}
			        </FormItem>
			        <FormItem>
			          {getFieldDecorator('password', {
			            rules: [{ required: true, message: '请输入您的密码!' }],
			          })(
			            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
			          )}
			        </FormItem>
			        <FormItem>
			          {getFieldDecorator('remember', {
			            valuePropName: 'checked',
			            initialValue: true,
			          })(
			            <Checkbox>记住我</Checkbox>
			          )}
			          <a className="login-form-forgot">忘记密码</a>
			          <Button type="primary" htmlType="submit" className="login-form-button">
			            登录
			          </Button>
			          <a >现在注册!</a>
			        </FormItem>
			      </Form>
			</div>
		);
	}
}

const LoginForm = Form.create()(NormalLoginForm);

export default LoginForm;