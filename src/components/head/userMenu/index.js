import React, {
  Component,
  PropTypes,
} from 'react'
import { Menu, Dropdown, Icon, message } from 'antd';
import { hashHistory } from 'react-router'
import reqwest from 'reqwest';
import SetCon from './setting';
import {
	api,
} from '../../../common/api_server'
import {
	param,
}from '../../../common/param'
import {
	url,
}from '../../../common/url_api'

export default class UserMenu extends Component {

	handleHelp(){
		console.log("help")
	}
	handleLogout(){
		console.log("logout")
		var par=param({})		
		reqwest(api(url.logout,par)).then((req) => {
			console.log(req)
			if(req.code == 0) {
				message.success(req.msg);
				hashHistory.push('/login')
			}else{
				message.error(req.msg);
      }
		});
	}
	render(){
		const menu = (
		  <Menu>
		    <Menu.Item>
		    	<SetCon/>
		    </Menu.Item>
		    <Menu.Item>
		      <span onClick={this.handleHelp}><Icon type="paper-clip" /> 帮助</span>
		    </Menu.Item>
		    <Menu.Item>
		      <span onClick={this.handleLogout}><Icon type="logout" /> 退出</span>
		    </Menu.Item>
		  </Menu>
		)
		return(
			<div>
				<Dropdown
					overlay={menu}
				>
				    <a className="ant-dropdown-link" href="JavaScript:;">
				     <Icon type="user" />
				    </a>
				</Dropdown>
			</div>
		)
	}
}
