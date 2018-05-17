// 用于合并多个 reducer 并返回

import {combineReducers} from 'redux';
import {counter} from './redux/index.redux';
import {auth} from './redux/auth.redux';

export default combineReducers(counter, auth);
