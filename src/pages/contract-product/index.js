import './index.less'
import React, {Component} from 'react'
import PageTitle from '../../components/page-title'
import SearchGroup from './search-group'
import ListTable from './list-table'

export default class contractProduct extends Component {
  constructor(props){
    super()
    this.state = {
      searchParams: {}, // 搜索参数
    }
  }
  	handleSearchChange(searchParams){
	    this.setState({
	      searchParams
	    })
 	}
	render(){
	    return (
	    	<div className="page">
       			<PageTitle title="合约产品" />
	        	<SearchGroup onSearch={this.handleSearchChange.bind(this)} />
	        	<ListTable {...this.props}  searchParams={this.state.searchParams} />
	    	</div>
	    )
	}
}

