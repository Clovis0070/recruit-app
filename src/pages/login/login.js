import React, {Component} from 'react';
import Logo from '../../component/logo/logo';
import {
    List,
    InputItem,
    WingBlank,
    WhiteSpace,
    Button
} from 'antd-mobile';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {login} from "../../redux/user.redux";



@connect(
    state => state.user,
    {login}
)
class Login extends Component{
    constructor(props) {
        super(props);
        this.register = this.register.bind(this);         // 在组件的 constructor 里定义 this. 有一个性能优化的功效，如果不把方法放到 constructor里，那么每次 Button click 时是传入一个新的方法对象，放到constructor里则每次调用的是组件里定义好的对象
        this.handleLogin = this.handleLogin.bind(this);

        this.state = {
            user: '',
            pwd: ''
        }
    }

    handleChange = (key, val) => {
        this.setState({
            [key]: val              // 要注意这里的语法： 尤其是 [key] 这里方括号的使用,不用方括号，相当于键名为 key，而不是取变量 key 的值。
        })
    }

    register = () => {
        this.props.history.push('/register');       // 跳转到注册页。
    }

    handleLogin = () => {
        // console.log(this.state);
        this.props.login(this.state);
    }

    render() {
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null}
                <Logo></Logo>
                {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
                <WingBlank>
                    <List>
                        <InputItem onChange={val => this.handleChange('user', val)}>用户名</InputItem>
                        <InputItem onChange={val => this.handleChange('pwd', val)} type="password">密码</InputItem>
                    </List>
                    <WhiteSpace></WhiteSpace>

                    <Button type="primary" onClick={this.handleLogin}>登陆</Button>
                    <WhiteSpace></WhiteSpace>
                    <Button onClick={this.register} type="primary">注册</Button>
                </WingBlank>
            </div>
        );
    }
}

export default Login;