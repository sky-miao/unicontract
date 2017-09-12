import React from 'react';
import { Form, Icon, Input, Button, Checkbox, message, Tooltip, Cascader, Select } from 'antd';
import { hashHistory } from 'react-router'
import reqwest from 'reqwest';
import {
	api,
} from '../../../../common/api_server'
import {
	param,
}from '../../../../common/param'
import {
	url,
}from '../../../../common/url_api'
const FormItem = Form.Item;
const Option = Select.Option;

class NormalLoginForm extends React.Component {
	  state = {
      data:{
        role:"管理者",
				effect:"生效",
      },
	  };
	handleSubmit = (e) => {
    console.log(this.props.id);
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if(!err) {
				console.log('Received values of form: ', values);
//				withCredentials: true,
				var par = param({
					"role": values['role'],
					"effect": values['effect'],
          "id":this.props.id,
				})
				// reqwest(
				// 	api(url.accountPreserveReset,par)
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

	// componentDidMount() {
	// 	var par=param({
  //     "id":this.props.id,
	// 	})
	// 	reqwest(
	// 			api(url.accountPreserveInfo,par)
	// 		).then((req) => {
	// 		console.log(req)
	// 		if(req.result){
	// 			var data = req.result.data;
	// 			for(var i = 0; i < data.length; i++) {
  //         var roleArr = ['管理者', '设计者', '审核者', '用户'];
	// 				data[i].role = arr[(data[i].role-1)];
  //         data[i].effect=(data[i].effect?"生效":"不生效")
	// 			}
	// 			this.setState({
	// 				data: data,
	// 			})
	// 		}
	// }
	render() {
	let {} = this.state
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
          label="角色"
          hasFeedback
        >
          {getFieldDecorator('role', {
            rules: [
              { required: true, message: '请选择用户角色!' },
            ],
						initialValue:this.state.data.role,
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
          label="是否生效"
          hasFeedback
        >
          {getFieldDecorator('effect', {
            rules: [
              { required: true, message: '请选择是否生效!' },
            ],
						initialValue:this.state.data.effect,
          })(
            <Select placeholder="请选择用户角色">
              <Option value="1" >生效</Option>
              <Option value="0" >不生效</Option>
            </Select>
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" style={{marginLeft:"33%"}}>更新</Button>
        </FormItem>
      </Form>
		);
	}
}

const DetailForm = Form.create()(NormalLoginForm);

export default DetailForm;
