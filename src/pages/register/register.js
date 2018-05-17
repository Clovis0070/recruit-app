import React, {Component} from 'react';
import Logo from '../../component/logo/logo';
import {
    List,
    InputItem,
    WingBlank,
    WhiteSpace,
    Button,
    Radio,
    // Flex,
} from 'antd-mobile';
import {connect} from 'react-redux';

import {register} from "../../redux/user.redux";

require('./register.css');


const RadioItem = Radio.RadioItem;

@connect(
    state => state.user,
    {register}
    )
class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: '',
            pwd: '',
            repeatpwd: '',
            type: 'genius'
        }

        this.handleRegister = this.handleRegister.bind(this);
    }

    handleChange = (key, val) => {
        this.setState({
            [key]: val              // 要注意这里的语法： 尤其是 [key] 这里方括号的使用
        })
    }

    handleRegister = () => {
        this.props.register(this.state);
    }

    render() {
        return (
            <div className="register-container">
                <Logo/>
                {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
                <WingBlank>
                    <List>
                        <InputItem onChange={val => this.handleChange('user', val)}>用户名</InputItem>
                        <InputItem onChange={val => this.handleChange('pwd', val)} type="password">密码</InputItem>
                        <InputItem onChange={val => this.handleChange('repeatpwd', val)} type="password">确认密码</InputItem>
                    </List>
                    <WhiteSpace></WhiteSpace>
                    <List>
                        <RadioItem checked={this.state.type === 'genius'}
                                   onChange={() => this.handleChange('type', 'genius')}>我要offer</RadioItem>
                        <RadioItem checked={this.state.type === 'boss'}
                                   onChange={() => this.handleChange('type', 'boss')}>我是老板</RadioItem>
                    </List>
                    <WhiteSpace></WhiteSpace>

                    <Button type="primary" onClick={this.handleRegister}>注册</Button>
                    {/*<WhiteSpace></WhiteSpace>*/}
                    {/*<Button onClick={this.register} type="primary">注册</Button>*/}
                </WingBlank>
            </div>

        );
    }
}

export default Register;