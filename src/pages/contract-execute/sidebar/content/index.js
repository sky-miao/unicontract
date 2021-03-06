import './index.less'
import React, {
  Component,
} from 'react'
import {
  connect
} from 'react-redux'
import { Steps, Icon, Timeline, Button, Input} from 'antd';
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
		this.setState({
			record:nextProps.record
		})
		var _this=this;
		var par=param({
			"contractId": _this.state.record.contractId
		})
		console.log(this.state)

    reqwest(
      api(url.executeQueryLog,par)
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
			contractId:this.props.contractId,
		})
		console.log(this.state)

    var _this=this;
    var par=param({
      "contractId": _this.state.contractId,
    })
    reqwest(
      api(url.executeQueryLog,par)
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
  render(){
    let {
      record,
    	id,
    	contractId,
      data,
      time,
    } = this.state
    var lists=[];
    this.state.data.forEach(function(list,index){
			var time=list.timestamp;
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
