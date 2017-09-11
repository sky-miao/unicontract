import './index.less'
import React, {Component,} from 'react'

export default class ColumnTable extends Component {
  render(){
    let {
      title,
    } = this.props
    return (
      <h2 className="page-title">{title}</h2>
    )
  }
}