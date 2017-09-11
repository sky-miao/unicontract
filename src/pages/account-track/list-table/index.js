import './index.less'
import React, {
	Component
} from 'react'
import { Table, Badge, Menu, Dropdown, Icon } from 'antd';
import reqwest from 'reqwest';
import RightModel from '../../../components/rightModel' //右侧容器
import DetailPage from '../sidebar/detail'
const {
	Columns,
} = Table;
import {
	api,
} from '../../../common/api_server'
import {
	url,
} from '../../../common/url_api'
import {
	param,
}from '../../../common/param'


export default class ListTable extends Component {

  constructor(props) {
  	super()
  	this.state = {
      oneArr:[],
      twoArr:[],
      isPage: false,
      width:"100%",
      data:[
        {
          key: 1,
          username: '区块链',
          role: '管理者',
          effect: '生效',
          status: '通过审批',
        },
        {
          key: 2,
          username: '区块链2',
          role: '管理者',
          effect: '生效',
          status: '通过审批',
        },
        {
          key: 3,
          username: '区块链3',
          role: '管理者',
          effect: '生效',
          status: '通过审批',
        },
        {
          key: 4,
          username: '区块链4',
          role: '管理者',
          effect: '生效',
          status: '通过审批',
        },
      ]
  	}
  	this.columns = [
      { title: '账户', dataIndex: 'username', key: 'username' },
      { title: '角色', dataIndex: 'role', key: 'role' },
      { title: '是否生效', dataIndex: 'effect', key: 'effect' },
      { title: '状态', dataIndex: 'status', key: 'status' },
      { title: '操作', key: 'operation', render: (index) => <a onClick={this.handelDetail.bind(this,index)}>查看详情</a> },
    ];

  }

  expandedRowRender(){
    const columns = [
      { title: '关联账户账号', dataIndex: 'user', key: 'user' },
      { title: '是否生效', dataIndex: 'effect', key: 'effect' },
      { title: '状态', dataIndex: 'status', key: 'status' },
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i,
        user: '29837592379',
        effect: '失效',
        status: '未通过审核',
      });
    }
    return (
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    );
  };
    // componentDidMount(){
    //   var par=param({})
    //   reqwest(
    //     api(url.accountTrackQuery,par)
    //   ).then((req) => {
    //     console.log(req)
    //     if (req.code == 0) {
    //       var data=req.result.data;
    //       var oneArr=[];
    //       var twoArr=[];
    //       for (var i = 0; i < data.length; i++) {
    //         var oneInfo={
    //           "username":data[i].username,
    //           "role":data[i].role,
    //           "effect":data[i].effect,
    //           "status":data[i].status,
    //         }
    //         var twoInfo={
    //           data:data[i].detail
    //         }
    //         oneArr.push(oneInfo)
    //         twoArr.push(twInfo)
    //       }
    //       this.setState({
    //         oneArr:oneArr,
    //         twoArr:twoArr,
    //       })
    //     }else{
    //       message.error(res.msg);
    //     }
    //   });
    // }
  handelDetail(index){
    console.log(index);
		this.setState({
			isPage: !this.state.isPage,
      width:"80%",
		})
		let self = this
		setTimeout(function() {
			if(self.state.isPage) {
				const calc = function() {
					self.setState({
						isPage: false,
            width:"100%",
					})
					document.removeEventListener('click', calc)
				}
				document.addEventListener('click', calc)
			}
		}, 20)
    console.log(this.state.isPage);
  }

	handleShowArea(e){
		e.nativeEvent.stopImmediatePropagation()
		console.log(e)
	}

    render(){
      return (
        <div>
          {/*侧边栏*/}
          <RightModel show={this.state.isPage} handleShowArea={this.handleShowArea}>
            <p style={{fontSize:"16px",marginLeft:"10px",lineHeight:"30px",borderBottom:"1px solid #ccc"}}>详细记录</p>
          </RightModel>
          <div style={{width:this.state.width}}>
            <Table
              className="components-table-demo-nested"
              expandedRowRender={this.expandedRowRender}
              columns={this.columns}
              dataSource={this.state.data}
            />
          </div>
        </div>
      );
    }
}
