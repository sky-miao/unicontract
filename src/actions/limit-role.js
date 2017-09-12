import {
    ACTION_ROLE_LIST,
} from './reducers-type'
import reqwest from 'reqwest';
import { hashHistory } from 'react-router'
import { Button, Modal, message } from 'antd';

export const actionRoleList = (dispatch) => {
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
            roleId:"ddd",
            roleName:"2323252341234",
            roleDetail:"管理者",
        }];
    // });
    dispatch({
        roleList,
        type: ACTION_ROLE_LIST
    })
}