import './index.less'
import React, {
  Component,
} from 'react'
import {
  connect
} from 'react-redux'
import Button from 'antd/lib/button'
import Input from 'antd/lib/input'
import { Steps, Icon, Timeline} from 'antd';
import reqwest from 'reqwest';
import {
	api,
} from '../../../common/api_server'
import {
	param,
}from '../../../common/param'
import {
	url,
}from '../../../common/url_api'

const Step = Steps.Step;

class ContentPage extends Component{
  constructor(props){
    super(props)
    this.state = {
      id:'',
      contractId:'',
      time: [],
      record:this.props.record,
      data:[],
    }
  }
	componentWillReceiveProps(nextProps) {
		console.log(nextProps.record)
		this.setState({
			record:nextProps.record
		})
		var _this=this;
		var par=param({
			"id": _this.state.record.id
		})
		console.log(par)
		console.log(this.state)
    reqwest(
      api(url.productQueryLog,par)
    ).then((req) => {
    	console.log(req)
    	req.sesult = req.sesult ||  []
      if (req.code==0) {
      	this.setState({
      		data:req.result.data,
      	})
      	console.log(this.state)
      }
    });
	}

	componentDidMount() {
		this.setState({
			id:this.props.id,
		})
		console.log(this.state.id)
		//	获取数据
		var _this=this;
		var par=param({
			"id": _this.state.id,
		})
    console.log(par);
	    reqwest(
	    	api(url.productQueryLog,par)
	    ).then((req) => {
	    		console.log(req)
	    		req.sesult = req.sesult ||  []
          if (req.code==0) {
          	this.setState({
          		data:req.result.data,
          	})
          	console.log(this.state)
          }
	    });
		}
//	}
  render(){
    let {
      data,
      time,
    } = this.state
    var lists=[];
    if(this.state.data){
      this.state.data.forEach(function(list,index){
  			var time=list.createTime;
  			var timeArr=time.split(' ')[0].split('-');
      	lists.push(
          <Timeline.Item key={index}>
            <div className="item-date">
                <div className="date-left">{timeArr[2]}</div>
                <div className="date-right">
                    <div className="right-may">{timeArr[1]}月</div>
                    <div className="right-year">{timeArr[0]}</div>
                </div>
            </div>
            <div className="item-content">
                {list.description}
            </div>
          </Timeline.Item>
      	)
      })
    }
    return (
      <div className="content-page">
        <Timeline>
            {lists}
        </Timeline>
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

export default connect(mapStateToProps, mapDispatchToProps)(ContentPage)
