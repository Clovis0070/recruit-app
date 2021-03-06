import axios from 'axios';
import {getRedirectPath} from "../util";

const REGISTER_SUCCESS = 'REGISTER_SUCCESS',
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOAD_DATA = 'LOAD_DATA',
    AUTH_SUCCESS = 'AUTH_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';

const initState = {
    // isAuth: false,
    redirectTo: '',     // 注册登陆成功后跳转的位置
    msg: '',
    user: '',
    pwd: '',
    type: ''
}

// define reducer
export function user(state = initState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {
                ...state,
                msg: '',
                ...action.payload,
                redirectTo: getRedirectPath(action.payload)
            }
        case LOAD_DATA:         // 用于获取已登录用户的信息
            return {...state, ...action.payload}
        case ERROR_MSG:
            return {
                ...state,
                msg: action.msg
                // isAuth: false
            }
        default:
            return state;
    }
}

function errorMsg(msg) {
    return {
        msg: msg,
        type: ERROR_MSG
    }
}

function authSuccess(data) {
    return{type: AUTH_SUCCESS, payload: data}
}

// function loginSuccess(data) {
//     return {type: LOGIN_SUCCESS, payload: data}
// }

export function register({user, pwd, repeatpwd, type}) {
    if (!user || !pwd ) {
        return errorMsg("用户名和密码必须输入！");
    }
    if (pwd !== repeatpwd) {
        return errorMsg('两次输入的密码不同！')
    }

    return dispatch => {
        axios.post('/user/register', {user, pwd, type})
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(authSuccess({user, pwd, type}))
                } else {
                    dispatch(errorMsg(res.data.msg));
                }
            });
    }
}



export function login({user, pwd}) {
    if(!user || !pwd) {
        return errorMsg("用户名和密码必须输入");
    }

    return dispatch => {
        axios.post('/user/login', {user, pwd})
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    // console.log(res.data.userdata);
                    dispatch(authSuccess({type: res.data.usertype}));
                } else {
                    dispatch(errorMsg(res.data.msg));
                }
            })
    }
}

export function loadData(userinfo) {
    return {type:LOAD_DATA, payload: userinfo}
}

export function saveInfo(data) {
    return dispatch => {
        axios.post('/user/saveinfo', data)
            .then(res=>{
                if (res.status == 200 && res.data.code == 0) {
                    dispatch(authSuccess(res.data.data));
                } else {
                    dispatch(errorMsg(res.data.msg));
                }
            })
    }
}