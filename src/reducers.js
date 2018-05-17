// 用于合并多个 reducer 并返回

import {combineReducers} from 'redux';
import {user} from "./redux/user.redux";

export default combineReducers({user});
