import './index.less'
import React, {Component,} from 'react'

export default class RightModel extends Component {
  render(){
    let {
      title,
      show,
      children,
      handleShowArea
    } = this.props
    return (
      <div className={show?'isShow right-page':'isHide' } onClick={this.props.handleShowArea}>
        {/*<h2 className="page-title">{title}</h2>*/}
        <div className='content'>
          {children}
        </div>
      </div>
    )
  }
  handleClear(){
    console.log('kkkk')
  }
}
