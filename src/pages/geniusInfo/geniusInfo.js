import React, {Component} from 'react';
import {
    NavBar,
    Icon,
    InputItem,
    TextareaItem,
    Button,
    WhiteSpace
} from 'antd-mobile';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux';

import AvataSelector from '../../component/avataSelector/avataSelector';
import {saveInfo} from "../../redux/user.redux";

@connect(
    state => state.user,
    {saveInfo}
)
class GeniusInfo extends Component{
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            salary: '',
            desc: ''
        }
    }

    onChange = (key, val) => {
        this.setState({
            [key]: val
        })
    }


    selectAvatar = (imgname) => {
        this.setState({
            avatar: imgname
        })
    }

    render() {

        const path = this.props.location.pathname
        const redirect = this.props.redirectTo
        return (
            <div>
                { (redirect && redirect!== path) ? <Redirect to={this.props.redirectTo}></Redirect> : null }
                <NavBar
                    mode="dark"
                    leftContent="Back"
                    rightContent={[
                        <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                        <Icon key="1" type="ellipsis" />,
                    ]}
                >Boss 完善信息页</NavBar>
                <AvataSelector selectAvatar={this.selectAvatar}></AvataSelector>
                <InputItem onChange={ v => this.onChange('title', v)}>求职意向</InputItem>
                <InputItem onChange={ v => this.onChange('salary', v)}>期望薪资</InputItem>
                <TextareaItem
                    onChange={ v => this.onChange('desc', v)}
                    rows={3}
                    autoHeight
                    title='个人简介'
                >个人简介</TextareaItem>
                <WhiteSpace></WhiteSpace>
                <Button type='primary' onClick={() => {this.props.saveInfo(this.state)}}>保存</Button>
            </div>
        );
    }
}

export default GeniusInfo;