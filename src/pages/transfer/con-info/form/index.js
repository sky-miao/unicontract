import React, {
	Component
} from 'react'
  import {
  Form, Select, InputNumber, Switch, Radio,
  Slider, Button, Upload, Icon,DatePicker, message
} from 'antd';
import reqwest from 'reqwest';
import moment from 'moment';
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


var ContractUtils=require('../../../../common/contract-utils')
require('../../../../common/encrpt-ed25519')
var JsonUtils =require('../../../../common/json-utils')

class Demo extends React.Component {
	constructor(props) {
		super()
		this.state={
			keyList:[]
		}
	}
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      const values = {
        ...fieldsValue,
        'date-time-picker': fieldsValue['date-time-picker'].format('YYYY-MM-DD HH:mm:ss'),
      };
      console.log('Received values of form: ', values);
//		获取contractId
		var par=param({})
		reqwest(
			api(url.transferLatelyContract,par)
		).then((req) => {
			console.log(req)
			var contractId=req.result.contractId;
			var id=req.result.id;
//    -----------------------签约----------------------------
		    var pubkey = values.user;
		    var jsonContract='';
			var par=param({
				"contractId": contractId,
			})
			reqwest(
				api(url.productOriginContract,par)
			).then((res) => {
	            jsonContract = res.result;
	            jsonContract = JSON.parse(jsonContract);
	            console.log("-----***********************************---");
	            console.log(jsonContract);
	            jsonContract['ContractBody']['ContractOwners'] = null;
	            var fullfiledContract = ContractUtils.field_fullfil(jsonContract, "Contract_Create");
	            fullfiledContract = ContractUtils.addOwners(fullfiledContract, pubkey);
	            ContractUtils.hash(fullfiledContract);
				var par=param({
                    "id": id,
                    "auditOp": 4,
                    "publishOwner": pubkey
				})
				var datas={
				"jsonContract": JSON.stringify(fullfiledContract),
				}
				reqwest(
					api(url.productPublish,par,datas)
				).then((req) => {
					if (req.code==0) {
						message.success(`转账成功!`);
						console.log(req)
					}
				});
			});
		});
    });
  }
  render() {
	let {keyList,} = this.state
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const config = {
      rules: [{ type: 'object', required: true, message: 'Please select time!' }],
    };
    const rangeConfig = {
      rules: [{ type: 'array', required: true, message: 'Please select time!' }],
    };

	var keys=[];
    this.state.keyList.forEach(function(item,index){
        keys.push(
          <Option key={index+'user'} value={item.pubkey}>{item.name}</Option>
        )
    })
    return (
      <Form onSubmit={this.handleSubmit} style={{"marginTop":"30px"}}>
        <FormItem
          {...formItemLayout}
          label="收款人"
          hasFeedback
        >
          {getFieldDecorator('user', {
            rules: [
              { required: true, message: '请选择收款人!' },
            ],
          })(
            <Select placeholder="请选择收款人" style={{"width":"70%"}}>
            	{keys}
            </Select>
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="转账日期"
        >
          {getFieldDecorator('date-time-picker', config)(
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="转账金额"
        >
          {getFieldDecorator('transfer-number', { initialValue: 3 })(
            <InputNumber min={1} max={1000} />
          )}
          <span className="ant-form-text"> 元</span>
        </FormItem>
        <FormItem
          wrapperCol={{
            xs: { span: 16, offset: 8 },
            sm: { span: 16, offset: 8 },
          }}
        >
          <Button type="primary" htmlType="submit">确定</Button>
        </FormItem>
      </Form>
    );
  }
  componentDidMount() {
		var par=param({})
		reqwest(
			api(url.userList,par)
		).then((req) => {
			console.log(req)
			this.setState({
				keyList:req.result.data,
			})
			console.log(this.state)
		});
	}
}

const WrappedDemo = Form.create()(Demo);
export default WrappedDemo
