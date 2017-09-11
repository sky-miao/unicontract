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

class NormalLoginForm extends React.Component {
	  state = {
      data:{
        username:"sdf",
        role:"sss",
				name:"sdfsd",
				phone:"222",
      },
	    confirmDirty: false,
	    roleList:[],
	  };
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if(!err) {
				console.log('Received values of form: ', values);
//				withCredentials: true,
				var par = param({
					"linkname": values['linkname'],
					"linkphone": values['linkphone'],
				})
				// reqwest(
				// 	api(url.persetResetBase,par)
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
	setFieldsValue(){

	}
	render() {
	let {roleList,msg} = this.state
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
          label="用户名"
          hasFeedback
        >
          {getFieldDecorator('nickname',)(
            <Input readOnly placeholder={this.state.data.username} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="姓名"
          disable="disable"
          hasFeedback
        >
          {getFieldDecorator('linkname', {
            rules: [{ required: true, message: '输入您的姓名!', whitespace: true }],
						initialValue:this.state.data.name,
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
						initialValue:this.state.data.phone,
          })(
            <Input />
          )}
        </FormItem>
         <FormItem
          {...formItemLayout}
          label="角色"
          hasFeedback
        >
          {getFieldDecorator('select',)(
            <Input readOnly placeholder={this.state.data.role} />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" style={{marginLeft:"33%"}}>更新</Button>
        </FormItem>
      </Form>
		);
	}
}

const BaseForm = Form.create()(NormalLoginForm);

export default BaseForm;
