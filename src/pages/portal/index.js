 import React from 'react';
import './index.less';
import {
  connect
} from 'react-redux'
import { Layout } from 'antd';
import LoginForm from './components';
import Head from './head'
import Banner from './banner'
import CardCon from './card'
import FootCon from './footer'
const {  Footer } = Layout;
class LoginPage extends React.Component {
	render(){
	    return (
	    	<div style={{"width":"100%"}}>
	    		<Head/>
	    		<Banner/>
	    		<CardCon/>
	    		<FootCon/>
	    	</div>
	    )
	}
}
export default connect()(LoginPage)
