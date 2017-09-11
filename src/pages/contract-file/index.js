import './index.less'
import React, {Component} from 'react'
import PageTitle from '../../components/page-title'
import SearchGroup from './search-group'
import ListTable from './list-table'
import CreateBtn from './link-group/createBtn'
import ImportBtn from './link-group/importBtn'
import { Row, Col } from 'antd';
//
//	        	<SearchGroup onSearch={this.handleSearchChange.bind(this)} />
export default class contractFile extends Component {
  constructor(props){
    super()
    this.state = {
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
	render(){
	    return (
	    	<div className="page">
       			<PageTitle title="文件管理" />
				<Row
			      style={{'marginTop': '10px','marginBottom': '10px'}}
			      >
			      	<Col span={4} offset={16} style={{'textAlign':'right'}}>
			            <CreateBtn onUpdate={this.handleUpdate.bind(this)} />
			      	</Col>
			      	<Col span={4}style={{'textAlign':'right'}}>
			            <ImportBtn onUpdate={this.handleUpdate.bind(this)} />
			      	</Col>
			     </Row>
       			<SearchGroup onSearch={this.handleSearch.bind(this)}/>
	        	<ListTable {...this.props}  searchParams={this.state.searchParams} isUpdate={this.state.isUpdate}/>
	    	</div>
	    )
	}
}
