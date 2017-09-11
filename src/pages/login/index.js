 import React from 'react';
import {
  connect
} from 'react-redux'
import { Layout } from 'antd';
import LoginForm from './components';
import Head from './head'
import FootCon from './footer'
const {  Footer } = Layout;
class LoginsPage extends React.Component {
	render(){
	    return (
	    	<div style={{"width":"100%"}}>
	    		<Head/>
		      	<LoginForm />
		      	<FootCon/>
	    	</div>
	    )
	}
}
export default connect()(LoginsPage)
