import React from 'react';
import { Form, Icon, Input, Button, Checkbox, message, Tooltip, Cascader, Select } from 'antd';
import { hashHistory } from 'react-router'
import reqwest from 'reqwest';
import {
	api,
} from '../../../../../common/api_server'
import {
	param,
}from '../../../../../common/param'
import {
	url,
}from '../../../../../common/url_api'
const FormItem = Form.Item;
const Option = Select.Option;

class NormalLoginForm extends React.Component {
	  state = {
      oldPass:'',
	    confirmDirty: false,
	    roleList:[],
	  };
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if(!err) {
				console.log('Received values of form: ', values);
        var par=param({
          "username": values['nickname'],
          "password": values['password']
        })
				// reqwest(
        //   api(url.persetResetPass,par)
        // ).then((res) => {
				// 	console.log(res)
				// 	if(res.code == 0) {
				// 		message.success(res.msg);
				// 	} else {
				// 		message.error(res.msg);
				// 	}
				// });
			}
		});
	}
  //  checkOldPass = (rule, value, callback) => {
  //  		reqwest({
  //  			url: 'http://localhost:9088/companyUser/list',
  //  			method: 'post',
  //  			withCredentials: true,
  //  			data: {
  //  				"token": "futurever",
  //  			},
  //  			type: 'json',
  //  		}).then((req) => {
  //  			console.log(req)
  //  			this.setState({
  //  				odlPass:req.result
  //  			})
  //  			console.log(this.state)
  //  		});
  //     var oldPass="123456";
	//     const form = this.props.form;
	//     if (value && value !== oldPass) {
	//       callback('原始密码不正确！');
	//     } else {
	//       callback();
	//     }
  //  }
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
    handleReset = () => {
      this.props.form.resetFields();
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
  		<Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="原始密码"
          hasFeedback
        >
          {getFieldDecorator('oldname', {
            rules: [
              {
                required: true,
                message: '输入您的原始密码!',
                whitespace: true
              },
          ],
          })(
            <Input type="password"/>
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
            <Input type="password"/>
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
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" style={{ marginLeft: "20%" }}>重置</Button>
          <Button type="primary" onClick={this.handleReset} style={{ marginLeft: "20%" }}>清空</Button>
        </FormItem>
      </Form>
		);
	}
}

const ResetForm = Form.create()(NormalLoginForm);

export default ResetForm;
