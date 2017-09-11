import './index.less'
import React, {Component} from 'react'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import DatePicker from 'antd/lib/date-picker'
import Select from 'antd/lib/select'

const {RangePicker} = DatePicker
const {Option} = Select
const searches = [
{
  name: '',
  key: 'itemTitle',
  label: '合约名称',
  id: 'orderitemTitleinput',
},{
  name: '',
  key: 'orderCode',
  label: '合约编号',
  id: 'orderordercodeinput',
},{
  name: '',
  key: 'createdate',
  label: '合约日期',
  id: 'ordercreatetimeinput',
  type: 'time',
}]


class SearchForm extends Component {
  constructor(props){
    super()
    this.state = {
      itemTitle: '',
      orderCode: '',
      createTimeStart: '', // 订单
      createTimeEnd: '',
    }
  }
  render(){
    let {
      getFieldDecorator,
    } = this.props.form
    return (
      <Form
      horizontal
      style={{'marginTop': '15px','marginBottom':'30px'}}
      className='bill-search-form'
      onSubmit={this.handleSearch.bind(this)}>
        <Row gutter={10}>
        {
          searches.map((item, index) => {
            return (
              <Col span={12} key={item.key}>
                <Form.Item
                label={item.label}
                labelCol={{span: 5}}
                wrapperCol={{span: 16}}>
                  {getFieldDecorator(item.id)(
                    item.type === 'date'
                      ? <RangePicker onChange={this.handleChange.bind(this, item)}/>
                      : item.type === 'time'
                        ? <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{width: '317px',"display":"block"}} onChange={this.handleChange.bind(this, item)}/>
                          : <Input onChange={this.handleChange.bind(this, item)} placeholder="" />
                  )}
                </Form.Item>
              </Col>
            )
          })
        }
        </Row>
        <Row>
          <Col span={24} key='submit' style={{textAlign: 'right'}}>
            <Button type="primary" htmlType="submit">查询</Button>
          </Col>
        </Row>
      </Form>
    )

  }
  handleChange(item, event, info){
    console.log(event, info)
    let value
    switch(item.type){
      case 'date':
      case 'time':
        let pre = item.key.substring(0, item.key.indexOf('date'))
        this.setState({
          [pre + 'TimeStart']: info[0] || '',
          [pre + 'TimeEnd']: info[1] || '',
        }, () => {
          console.log(this.state);
        })
        break
      default:
        this.setState({
          [item.key]: event.target.value,
        })
    }
  }
  handleSearch(e){
    e.preventDefault()
    this.props.onSearch(this.state)
  }
}

const SearchGroup = Form.create()(SearchForm)
export default SearchGroup