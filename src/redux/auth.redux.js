import axios from 'axios';

const LOGIN = 'login',
    LOGOUT = 'logout',
    USER_DATA = 'USER_DATA';

const initState = {isAuth: false, user: 'yunlong', age: 27}


export function auth(state = initState, action) {
    console.log(state);
    switch (action.type) {
        case LOGIN:
            return {...state, isAuth: true};
        case LOGOUT:
            return {...state, isAuth: false};
        case USER_DATA:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}

//action
export function login() {
    return {type: LOGIN}
}

export function logout() {
    return {type: LOGOUT}
}

export function getUserData() {
    return dispatch => {
        axios.get('/data')
            .then(res => {

                if (res.status === 200) {
                    dispatch(userData(res.data));
                }
            })
    }
}

export function userData(data) {
    return {type: USER_DATA, payload: data}
}