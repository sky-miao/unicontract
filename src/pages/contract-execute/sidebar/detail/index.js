import './index.less'
import React, {
  Component,
} from 'react'
import {
  connect
} from 'react-redux'
import Button from 'antd/lib/button'
import Input from 'antd/lib/input'
import reqwest from 'reqwest';
import {
	api,
} from '../../../../common/api_server'
import {
	param,
}from '../../../../common/param'
import {
	url,
}from '../../../../common/url_api'

class DetailPage extends Component{
  constructor(props){
    super(props)
    this.state = {
    		contractId:'',
    		id:'',
	      record:{},
	      data:[],

        descriptions:[{
          title: '名称',
          dataIndex: 'name',
          key: 'name',
        },{
          title: '数量',
          dataIndex: 'count',
          key: 'count',
        },{
          title: '型号',
          dataIndex: 'type',
          key: 'type',
        },{
          title: '颜色',
          dataIndex: 'color',
          key: 'color',
        }],
        details:[{
          title: '1',
          content: '1.xxxxxxxxxxxxxxxxx',
          key: 'details1',
        },{
          title: '2',
          content: '2.xxxxxxxxxxxxxxxxx',
          key: 'details2',
        },{
          title: '3',
          content: '3.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          key: 'details3',
        }]
    }
  }

  	componentWillReceiveProps(nextProps) {
		console.log(nextProps.record)
		this.setState({
			record:nextProps.record
		})
		console.log('%c--------------------------------componentWillReceiveProps-------------------------------------',"color:red")
		console.log(nextProps.record)

    var _this=this;
		var par=param({
			"contractId": _this.state.record.contractId
		})
	   reqwest(
	   	api(url.executeQueryContent,par)
	   ).then((req) => {
    	console.log(req)
    	if(req.result){
	    	var data = eval('(' + req.result + ')');
	    	console.log(data)
	    	this.setState({
	    		data:data.ContractBody,
	    	})
	    	console.log(this.state.data)
    	}
    });
	}


	componentDidMount() {
		this.setState({
			record:this.state.record,
			contractId:this.props.contractId,
			id:this.props.id,
		})
//		console.log(this.state)
		//	获取数据
		var _this=this;
		var par=param({
			"contractId": _this.state.contractId
		})
	   reqwest(
	   	api(url.executeQueryContent,par)
	   ).then((req) => {
    	console.log(req)
    	if(req.result){
	    	var data = eval('(' + req.result + ')');
	    	console.log(data)
	    	this.setState({
	    		data:data.ContractBody,
	    	})
	    	console.log(this.state.data)
    	}
    });
	}
  render(){
    let {
      record,
      id,
      contractId,
      descriptions,
      details
    } = this.state
    var owners=[];
    var components=[];
		if(this.state.data.ContractOwners){
		this.state.data.ContractOwners.forEach(function(item,index){
			owners.push(
				<div key={'owner'+index}>
					<span>合约主体{index+1}：</span><span>{item}</span>
				</div>
			)
		})
		}
		if(this.state.data.ContractComponents){
		this.state.data.ContractComponents.forEach(function(item,index){
			components.push(
				<div key={'component'+index}>
					<span>{index+1}.</span><span>{item.Description}</span>
				</div>
			)
		})
	}
		var asset=[];
		if(this.state.data.ContractAssets){
			asset.push(
					<div key="asset">

              <div>
                <span>名称：</span><span>{this.state.data.ContractAssets[0].Name}</span>
              </div>
              <div>
                <span>数量：</span><span>{this.state.data.ContractAssets[0].amount}</span>
              </div>
            	<div>
                <span>型号：</span><span>{this.state.data.ContractAssets[0].Description}</span>
            	</div>
            	<div>
                <span>颜色：</span><span>{this.state.data.ContractAssets[0].AssetId}</span>
            	</div>
					</div>

			)

		}
    return (
      <div className="content-page">
        <ul className='wrap'>
          {/*合约编号*/}
            <li className='item-body'>
              <div>
                <span>合约编号：</span>
                <span>{this.state.data.ContractId}</span>
              </div>
              <div>
                <div className='left'>
                {owners}
                </div>
              </div>
            </li >
            {/*合约日期*/}
            <li className='item-body'>
              <div>
                <span>合约创建日期：</span><span>{this.state.data.CreateTime}</span>
              </div>
              <div>
                <span>合约起始日期：</span><span>{this.state.data.StartTime}</span>
              </div>
            	<div>
                <span>合约截止日期：</span><span>{this.state.data.EndTime}</span>
            	</div>
            </li>
            {/*资产描述*/}
            <li className='item-body'>
              <span>资产描述：</span>
              {asset}
            </li>
        </ul>
        <div className='item-detail'>
          <span className='title'>合约权利和义务：</span>
          {components}
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    ...state.user
  }
}
const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage)
