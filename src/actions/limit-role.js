import {
    ACTION_ROLE_LIST,
} from './reducers-type'
import reqwest from 'reqwest';
import { hashHistory } from 'react-router'
import { Button, Modal, message } from 'antd';
//角色列表
export const actionLimitRoleSearch = (dispatch, search) => {
    // reqwest({
    //     url: 'http://localhost:9088/companyUser/list',
    //     method: 'post',
    //     withCredentials: true,
    //     data: {
    //         "token": "futurever",
    //     },
    //     type: 'json',
    // }).then((req) => {
        // let roleList = req.result
        let roleList = [{
            roleId:"123",
            roleName:"23232523we41234",
            roleDetail:"管理者123",
        },{
            roleId:"456",
            roleName:"23232523ds41234",
            roleDetail:"管理者456",
        }];
    // });
    dispatch({
        roleList,
        type: ACTION_ROLE_LIST
    })
}
// 角色编辑
export const actionRoleEdit = (dispatch, info) => {
    // reqwest({
    //     url: 'http://localhost:9088/companyUser/list',
    //     method: 'post',
    //     withCredentials: true,
    //     data: {
    //         "token": "futurever",
    //     },
    //     type: 'json',
    // }).then((req) => {
        // let roleList = req.result
    // });
}