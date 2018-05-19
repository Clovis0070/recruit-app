import React, {Component} from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux';
import {loadData} from "../../redux/user.redux";

@withRouter     // 修饰组件，使其props里拥有路由信息
@connect(
    state => state.user,
    {loadData}
)
class AuthRoute extends Component {
    // 授权路由模块，完成以下功能：
    // 1. 使用axios跨域访问服务端，请求用户状态，根据服务端返回判断用户是否登陆；
    // 2. 再根据当前url判断是否跳转，是login不需要跳转；
    // 3. 需要取得用户的type是 boss 还是 genius；
    // 4. 判断用户是否已经完善信息

    componentDidMount() {
        const publicList = ['/login', '/register'];     // 当前路由是否在 login register，如果是，则不用去做跳转，也不用下面用户状态查询了
        const pathname = this.props.location.pathname;  // 获取当前路由，它放在 this.props.location.pathnam
        if (publicList.indexOf(pathname) !== -1) {
            return null
        }

        axios.get('/user/info')
            .then(res => {
                if (res.status === 200) {
                    if (res.data.code === 0) {  // 已经登陆
                        this.props.loadData(res.data.data);
                    } else {               // 如果没有登陆，则跳转到登陆页
                        this.props.history.push('/login');   // 一般组件的props是没有history这样的路由信息的，要使它有路由信息，需要使用 react-router 的 withRouter 进行修饰，这样就会把路由相关的信息放到组件的props里。
                    }
                }
            })
    }

    render() {
        return null;
    }
}

export default AuthRoute;

