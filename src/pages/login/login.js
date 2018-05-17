import React, {Component} from 'react';
import Logo from '../../component/logo/logo';
import {
    List,
    InputItem,
    WingBlank,
    WhiteSpace,
    Button
} from 'antd-mobile';


class Login extends Component{
    constructor(props) {
        super(props);
        this.register = this.register.bind(this);         // 在组件的 constructor 里定义 this. 有一个性能优化的功效，如果不把方法放到 constructor里，那么每次 Button click 时是传入一个新的方法对象，放到constructor里则每次调用的是组件里定义好的对象
    }

    register() {
        this.props.history.push('/register');       // 把 register 放到 history，使得可以回退到注册页。
    }

    render() {
        return (
            <div>
                <Logo></Logo>
                <WingBlank>
                    <List>
                        <InputItem onChange={val => this.handleChange('user', val)}>用户名</InputItem>
                        <InputItem onChange={val => this.handleChange('pwd', val)} type="password">密码</InputItem>
                    </List>
                    <WhiteSpace></WhiteSpace>

                    <Button type="primary">登陆</Button>
                    <WhiteSpace></WhiteSpace>
                    <Button onClick={this.register} type="primary">注册</Button>
                </WingBlank>
            </div>
        );
    }
}

export default Login;