import React from 'react';
import './index.less';
import {
 connect
} from 'react-redux'
import { Button, } from 'antd';
import ListTable from './list-table'
import PageTitle from '../../components/page-title'

export default class TrackPage extends React.Component {
 render(){
     return (
       <div className="page">
          <PageTitle title="账户状态跟踪" />
          <ListTable/>
       </div>
     )
 }
}
