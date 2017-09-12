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
  key: 'username',
  label: '账户名',
  id: 'username',
},{
  name: '',
  key: 'roleSelect',
  label: '角色',
  id: 'roleSelect',
  type: 'roleSelect',
},{
  name: '',
  key: 'effectSelect',
  label: '是否失效',
  id: 'effectSelect',
  type: 'effectSelect',
},{
  name: '',
  key: 'statusSelect',
  label: '状态',
  id: 'statusSelect',
  type: 'statusSelect',
}]
const roleSelect = [{
  id: '0',
  name: '管理者',
},{
  id: '1',
  name: '设计者',
},{
  id: '2',
  name: '审核者',
},{
  id: '3',
  name: '用户',
}]
const effectSelect = [{
  id: '0',
  name: '生效',
},{
  id: '1',
  name: '不生效',
}]
const statusSelect = [{
  id: '0',
  name: '新建',
},{
  id: '1',
  name: '通过审核',
},{
  id: '2',
  name: '未通过审核',
},{
  id: '3',
  name: '失效',
}]

class SearchForm extends Component {
  constructor(props){
    super()
    this.state = {
      statusSelect: '',
      roleSelect: '',
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
                    item.type === 'roleSelect'
                    ? (
                      <Select onChange={this.handleChange.bind(this, item)}>
                        {
                          roleSelect.map((item, index) => {
                            return (
                              <Option key={item.id} value={item.id}>{item.name}</Option>
                            )
                          })
                        }
                      </Select>
                      )
                    : item.type === 'effectSelect'
                    ? (
                      <Select onChange={this.handleChange.bind(this, item)}>
                        {
                          effectSelect.map((item, index) => {
                            return (
                              <Option key={item.id} value={item.id}>{item.name}</Option>
                            )
                          })
                        }
                      </Select>
                      )
                    : item.type === 'statusSelect'
                    ? (
                      <Select onChange={this.handleChange.bind(this, item)}>
                        {
                          statusSelect.map((item, index) => {
                            return (
                              <Option key={item.id} value={item.id}>{item.name}</Option>
                            )
                          })
                        }
                      </Select>
                      )
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
  handleChange(item, event){
    // console.log(event)
    let value
    switch(item.type){
      case 'roleSelect':
        this.setState({
          [item.key]: event,
        })
        break
      case 'effectSelect':
        this.setState({
          [item.key]: event,
        })
        break
      case 'statusSelect':
        this.setState({
          [item.key]: event,
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
    console.log(this.state);
    this.props.onSearch(this.state)
  }
}

const SearchGroup = Form.create()(SearchForm)
export default SearchGroup
