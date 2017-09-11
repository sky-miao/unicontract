import React from 'react';
import './index.less';
import { Card, Col, Row } from 'antd';
export default class CardCon extends React.Component {
	render(){
		return(
			<div style={{ background: '#ECECEC', padding: '30px' }}>
			    <Row gutter={16}>
			      <Col span={6}>
			        <Card bordered={false}>
				        <div className="custom-image">
          					<img alt="example" src={require('../../../assets/img/login4.png')} />
					    </div>
					    <div className="custom-card">
				        <h3>可视化设计</h3>
				        <p>以组件拖拽方式可视化设计合约，使非编程人员便捷创建和理解合约。</p>
					    </div>
			        </Card>
			      </Col>
			      <Col span={6}>
			        <Card bordered={false}>
				        <div className="custom-image">
          					<img alt="example" src={require('../../../assets/img/login2.png')} />
					    </div>
					    <div className="custom-card">
				        <h3>前置集群</h3>
				        <p>通过共识机制由合约集群各节点共同执行、验证合约中的操作/交易产出。</p>
					    </div>
			        </Card>
			      </Col>
			      <Col span={6}>
			        <Card bordered={false}>
				        <div className="custom-image">
          					<img alt="example" src={require('../../../assets/img/login1.png')} />
					    </div>
					    <div className="custom-card">
				        <h3>持久运行</h3>
				        <p>引入认知计算模型，以类似工作流的方式可持续、智能调度执行合约。</p>
					    </div>
			        </Card>
			      </Col>
			      <Col span={6}>
			        <Card bordered={false}>
				        <div className="custom-image">
          					<img alt="example" src={require('../../../assets/img/login3.png')} />
					    </div>
					    <div className="custom-card">
				        <h3>跨链访问</h3>
				        <p>从逻辑层面解除智能合约和区块链的强耦合关系，快速构建跨链访问合约 </p>
					    </div>
			        </Card>
			      </Col>
			    </Row>
			  </div>
		)
	}
}
