import './index.less'
import React, {
	Component
} from 'react'
import reqwest from 'reqwest';
import { Icon } from 'antd';
import {
	api,
} from '../../../../common/api_server'
import {
	param,
}from '../../../../common/param'
import {
	url,
}from '../../../../common/url_api'

class Record extends Component {
	state={
		data:[
			{
				"name":"owner1",
				"amount":100,
			},	{
				"name":"owner2",
				"amount":120,
			},	{
				"name":"owner3",
				"amount":130,
			},
		],
	}

	componentDidMount() {
		var par=param({})
		reqwest(
			api(url.transferQuery,par)
		).then((req) => {
			console.log(req)
			if(req.data){
				this.setState({
					data: req.data,
				})
			}
		});
	}

//					switch (msg.operation){
//						case "CREATE":
//							msgs.push(
//								<p>为【<b>{msg.owners_after}</b>】创建资产{msg.amount}元</p>
//							)
//							break;
//						case "TRANSFER":
//                          if(msg.owners_after==msg.owner_before){
//								msgs.push(
//									<p>冻结【<b>{msg.owners_after}</b>】{msg.amount}元</p>
//								)
//                          }else{
//								msgs.push(
//									<p>转给【<b>{msg.owners_after}</b>】{msg.amount}元</p>
//								)
//                          }
//							break;
//						default:
//							break;
//					}
	render(){
				var msgs = [];
				this.state.data.forEach(function(msg,index){
					console.log(index)
					console.log(msg)
					msgs.push(
						<div key={index+'record'}>
							<p><Icon type="exception" />转给【<b>{msg.name}</b>】{msg.amount}元</p>
						</div>
					)
				});
				return (
					<div className="recordCon">{msgs}</div>
				)
			}
}
export default Record;
