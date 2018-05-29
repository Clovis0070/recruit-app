import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Result
} from 'antd-mobile';


// 用户个人中心，dashboard 的 User 路由所指向
@connect(
    state => state.user
)
class User extends Component {

    render() {
        console.log(this.props);
        return this.props.user ? (
                <div>
                    <Result
                        img={<img src={require(`../img/${this.props.avatar}.png`)}/>}
                        title={this.props.user}
                    ></Result>
                    <p>用户中心</p>
                </div>
            )
            : null;
    }
}

export default User;