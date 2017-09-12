import './index.less'
import React, {Component} from 'react'
import { connect } from 'react-redux'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import DatePicker from 'antd/lib/date-picker'
import Select from 'antd/lib/select'
import {actionLimitRoleSearch} from '../../../actions/limit-role'
const FormItem = Form.Item;

class SearchForm extends Component {
  constructor(props){
    super()
    this.state = {

    }
  }
  render(){
    let { getFieldDecorator } = this.props.form
    return (
      <Form
      horizontal
      style={{'marginTop': '15px','marginBottom':'30px'}}
      className='bill-search-form'
      onSubmit={this.handleSearch.bind(this)}>
        <Row gutter={10}>
          <Col span={12}>
            <FormItem
                label={'角色ID'}
                labelCol={{span: 5}}
                wrapperCol={{span: 16}}>
              {getFieldDecorator('roleId', {
              })(
                <Input size="large" placeholder="角色ID" />
                )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
                label={'角色名称'}
                labelCol={{span: 5}}
                wrapperCol={{span: 16}}>
              {getFieldDecorator('roleName', {
              })(
                <Input size="large" placeholder="角色名称" />
                )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24} key='submit' style={{textAlign: 'right'}}>
            <Button type="primary" htmlType="submit">查询</Button>
          </Col>
        </Row>
      </Form>
    )
  }
  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      // console.log(values, 12)
      this.props.handleConfirmOk(values);
      // this.props.handleSaveSearch(values)
      // this.props.handleSavePage(1)
    });
  }
}
const mapStateToProps = (state) => {
  return {
    ...state.limitRole
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    // 点击搜索按钮的搜索结果
    handleConfirmOk: (state) => {
      actionLimitRoleSearch(dispatch, state, 1);
    }
  }
}

const SearchGroup = Form.create()(SearchForm)
export default connect(mapStateToProps, mapDispatchToProps)(SearchGroup);