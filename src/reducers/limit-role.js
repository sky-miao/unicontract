import {
    ACTION_ROLE_LIST,
} from '../actions/reducers-type'

export default (state = {
    roleList: [],
}, action) => {
    const {
        type,
        roleList,
        ...other,
    } = action

    switch (type) {
        case ACTION_ROLE_LIST:
            return {
                ...other,
                roleList,
            }
        default:
            return state
    }
}