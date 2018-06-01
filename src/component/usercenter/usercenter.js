import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Result,
    List,
    WhiteSpace,
    Modal
} from 'antd-mobile';
import {Redirect} from 'react-router-dom';
import {logoutSubmit} from "../../redux/user.redux";


const cookies = require('browser-cookies');
const alert = Modal.alert;

// 用户个人中心，dashboard 的 User 路由所指向
@connect(
    state => state.user,
    {logoutSubmit}
)
class UserCenter extends Component {

    logout = () => {
        alert('退出登录', '确认要退出吗?', [
            {text: 'Cancel', onPress: () => {}},
            {
                text: 'Yes', onPress: () => {
                    cookies.erase('userid');
                    this.props.logoutSubmit();
                }
            },
        ])

        // cookies.erase('userid');

    }

    handleClick = () => {
        console.log('nonononoo');
    }


    render() {
        // console.log(document.cookie);
        const Item = List.Item;
        const Brief = Item.Brief;
        let renderHeader = this.props.type === 'boss' ? '招聘需求' : '个人简介';
        let desc = this.props.type === 'boss' ? this.props.requirement : this.props.brief;
        return this.props.user ? (
                <div>
                    <Result
                        img={<img style={{width: 50}} src={require(`../img/${this.props.avatar}.png`)}/>}
                        title={this.props.user}
                        message={this.props.company}
                    ></Result>
                    {/*<p>用户中心</p>*/}
                    <List renderHeader={() => renderHeader} className="my-list">
                        <Item multipleLine>
                            {this.props.title}
                            {desc.split('\n').map(v => <Brief key={v}>{v}</Brief>)}
                        </Item>
                    </List>
                    <WhiteSpace></WhiteSpace>
                    <WhiteSpace></WhiteSpace>
                    <List id="logout">
                        <Item onClick={this.logout}>退出登录</Item>
                    </List>
                </div>
            )
            : <Redirect to='/login'></Redirect>;
    }
}

export default UserCenter;