import './index.less';
import React from 'react';
import reqwest from 'reqwest';
import { Row, Col } from 'antd';
import {
	api,
} from '../../../../common/api_server'
import {
	param,
}from '../../../../common/param'
import {
	url,
}from '../../../../common/url_api'

class InfoForm extends React.Component {
	  state = {
      pagination:false,
      loading:false,
      data:{
        name:"sdiofj",
        relate:"23423423423",
        role:"管理者",
				effect:"生效",
        status:"通过审核",
        username:"1111",
        phone:"1903284082340",
      },
	  };

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
		return(
      <div>
        <Row>
          <Col span={12} offset={6}><span className="infoKey">用户名：</span><span className="infoValue">{this.state.data.name}</span></Col>
          <Col span={12} offset={6}><span className="infoKey">关联账号：</span><span className="infoValue">{this.state.data.relate}</span></Col>
          <Col span={12} offset={6}><span className="infoKey">角色：</span><span className="infoValue">{this.state.data.role}</span></Col>
          <Col span={12} offset={6}><span className="infoKey">是否生效：</span><span className="infoValue">{this.state.data.effect}</span></Col>
          <Col span={12} offset={6}><span className="infoKey">状态：</span><span className="infoValue">{this.state.data.status}</span></Col>
          <Col span={12} offset={6}><span className="infoKey">姓名：</span><span className="infoValue">{this.state.data.username}</span></Col>
          <Col span={12} offset={6}><span className="infoKey">电话：</span><span className="infoValue">{this.state.data.phone}</span></Col>
        </Row>
      </div>
		);
	}
}

export default InfoForm;
