import './index.less'
import React, {
	Component
} from 'react'
import {
	Layout,
	Row,
	Col,
	Radio ,
	Select,
	DatePicker,
	Button
} from 'antd';
import NumericInput from '../input'
import reqwest from 'reqwest';

import ListTable from '../list-table'
import FormCon from './form'
import RecordCon from './record'
import {
	api,
} from '../../../common/api_server'
import {
	param,
}from '../../../common/param'
import {
	url,
}from '../../../common/url_api'
const Option = Select.Option;

function handleChange(value) {
  console.log(`selected ${value}`);
}

function handleBlur() {
  console.log('blur');
}

function handleFocus() {
  console.log('focus');
}
export default class ConInfo extends Component {
  constructor(props){
    super()

	this.state = {
		open: false ,
		checked:'checked',
		disabled:true,
		amount:100,
		selectUser:'',
		timepicker:'',
		value:'',
		checked:true,
	};
  }
	handleOpenChange = (open) => {
		this.setState({ open });
	}
    handleClose = () => this.setState({ open: false })
	handleChange(value) {
	  console.log(`selected ${value}`);
	}
	onChange(value, dateString) {
	  console.log(value);
	  console.log(dateString);
	}
//	获取数据
	getData(){
		var par=param({})
		reqwest(
			api(url.transferBalanceQuery,par)
		).then((req) => {
			console.log(req)
      if(req.code == 0){
          var data = req.result;
          this.setState({
          	amount:data.amount
          })
      }
      console.log(this.state)
		});
	}
componentDidMount() {
	this.getData()
}
	render() {
		return(
			<div>
			    <Row>
			      <Col span={10}>
			      	<h2>转账设置</h2>
			     	<div className="con-list">
				      	<Radio checked={this.state.checked}>单次转账</Radio>
				      	<p>设置转账的时间，根据设置的转账信息自动转账。一次设置只完成一次转账。</p>
			     	</div>
			     	<FormCon/>
			      	<div>
			      		<Radio disabled={this.state.disabled}>周期转账</Radio>
			      	</div>
			      </Col>
			      <Col span={14}>
			      		<h2 style={{'marginBottom':'10px'}}>合约记录</h2>
			      		<ListTable/>
			      		<div className='list_bot'>
				      		<Row>
				      			<Col span={10}>
				      				<h2>账户余额</h2>
				      				<p className='showMoney'><span>{this.state.amount}</span>元</p>
				      			</Col>
				      			<Col span={14}>
				      				<h2>转账记录</h2>
				      				<RecordCon/>
				      			</Col>
				      		</Row>
			      		</div>
			      </Col>
			    </Row>
			  </div>
		)
	}
}
