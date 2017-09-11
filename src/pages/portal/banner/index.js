import React from 'react';
import './index.less';
 import { Link } from 'react-router';
export default class Banner extends React.Component {
	render(){
	    return (
    		<div className="banner">
				<div className="ban_con">
					<div className="ban">
						<h2>智能合约管理平台</h2>
						<p>北京大同区块链技术研究院有限公司于2016年6月成立，2016年11月获得大同市政府投资;</p>
						<p>主要从事区块链底层技术和智能合约的研发，以及面向企业提供区块链技术的解决方案、技术应用、产品服务等。</p>
						<p>公司同时在大数据和人工智能技术方面投入大量研究并已取得创新式成果。</p>
						<div className="btn">
							<span className="btn_l"><Link to="/login">已有账户?登录</Link></span>
							<span className="btn_r"><Link to="/register">加入智能合约</Link></span>
						</div>
					</div>
				</div>
			</div>
	    )
	}
}
