import axios from 'axios';
import {Toast} from 'antd-mobile';

axios.interceptors.request.use(function (config) {
    Toast.loading('loading', 0);
    return config;
});

axios.interceptors.response.use(function (config) {
    // setTimeout(() => {
    //     Toast.hide();
    // }, 2000);
    Toast.hide();
    return config;
});