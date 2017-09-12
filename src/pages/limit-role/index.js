import './index.less'
import React, {Component} from 'react'
import PageTitle from '../../components/page-title'
import SearchGroup from './search-group'
import ListTable from './list-table'
import { Row, Col, Button, message} from 'antd';
import { api } from '../../common/api_server'
import { param }from '../../common/param'
import { url }from '../../common/url_api'

export default class RolePage extends Component {
  constructor(props){
    super()
    this.state = {
      info:{},
    	isUpdate:{},
      searchParams: {}, // 搜索参数
    }
  }
	handleUpdate(isUpdate){
    this.setState({
      isUpdate:isUpdate,
    })
    console.log(this.state)
 	}
 	handleSearch(searchParams){
	    this.setState({
	      searchParams
	    })
	    console.log(this.state)
 	}
  handleInfo(info){
	    this.setState({
	      info
	    })
	    console.log(this.state)
  }
  exportFile(){
    console.log(this.state)
    // var _this=this;
    // var par = param({
    //   "info":_this.state.info,
    // })
		// reqwest(
		// 		api(url.accountPreserveExport,par)
		// 	).then((req) => {
		// 	console.log(req)
		// 	if(req.code == 0){
    //     message.success(req.msg)
		// 	}else {
		// 	  message.error(req.msg)
		// 	}
		// });
  }
	render(){
	    return (
	    	<div className="page">
       			<PageTitle title="角色管理" />
				<Row
			      style={{'marginTop': '10px','marginBottom': '10px'}}
			      >
			      	{/* <Col span={4} offset={16} style={{'textAlign':'right'}}>
                <Button onClick={this.exportFile}>导出账户信息</Button>
			      	</Col> */}
			     </Row>
       			<SearchGroup onSearch={this.handleSearch.bind(this)}/>
	        	<ListTable {...this.props} onInfo={this.handleInfo.bind(this)} 
              searchParams={this.state.searchParams}
              isUpdate={this.state.isUpdate}/>
	    	</div>
	    )
	}
}
