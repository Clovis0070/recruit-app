import React, {Component} from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';
import {connect} from 'react-redux';
import {
    NavBar
} from 'antd-mobile';

import NavLinkBar from '../../component/navlink/navlink'
import {saveInfo} from "../../redux/user.redux";
import Boss from '../boss/boss';
import Genius from '../genius/genius';
import User from '../user/user';


function Msg() {
    return <h2>消息列表</h2>
}

@connect(
    state => state,
    {saveInfo}
)
class Dashboard extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        let {pathname} = this.props.location;
        const user = this.props.user;
        const navList = [
            {
                path: '/boss',
                text: '大牛',
                icon: 'boss',
                title: '大牛列表',
                component: Boss,
                hide: user.type === 'genius'
            },
            {
                path: '/genius',
                text: 'Boss',
                icon: 'job',
                title: 'Boss列表',
                component: Genius,
                hide: user.type === 'boss'
            },
            {
                path: '/msg',
                text: '消息',
                icon: 'msg',
                title: '消息列表',
                component: Msg,
            },
            {
                path: '/me',
                text: '个人中心',
                icon: 'user',
                title: '个人中心',
                component: User,
            }
        ]
        console.log('dashboard loading');

        const navHeader = navList.find(v => v.path === pathname);
        return (
            <div>
                <NavBar mode='dark' className="fixed-header">{navHeader && navHeader.title}</NavBar>
                    <div className='functional-body'>
                        <Switch>
                            {navList.map(v=>(
                                <Route key={v.path} path={v.path} component={v.component}></Route>
                            ))}
                        </Switch>
                    </div>
                {/*<Route path='boss' component={Boss}></Route>*/}
                {/*<Route path='Genius' component={Genius}></Route>*/}
                <NavLinkBar data={navList}></NavLinkBar>
            </div>


        );
    }
}

export default Dashboard;