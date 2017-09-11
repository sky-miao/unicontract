import React from 'react';
import './index.less';
import { Col, Row } from 'antd';
export default class FootCon extends React.Component {
	render(){
		return(
			<div style={{ background: '#fff', padding: '10px 30px',position:'fixed',bottom:0,left:0,width:'100%'}}>
			    <Row gutter={16}>
			      <Col span={16} offset={1}>
			      		<div className='footText'>
							<p>版权所有 Copyright © 北京大同区块链技术研究院 备案序号：京ICP备16053305号-1</p>
							<p>联系我们：010-59513370</p>
			      		</div>
			      </Col>
			      <Col span={4}>
				        <div className="custom-image">
          					<img alt="example" src={require('../../../assets/img/echo.jpg')} />
					    </div>
						<p style={{'textAlign':'center'}}>扫描关注公众号</p>
			      </Col>
			    </Row>
			  </div>
		)
	}
}
