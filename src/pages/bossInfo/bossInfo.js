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
class BossInfo extends Component{
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            company: '',
            salary: '',
            requirement: ''
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
                <InputItem onChange={ v => this.onChange('title', v)}>招聘职位</InputItem>
                <InputItem onChange={ v => this.onChange('company', v)}>公司名称</InputItem>
                <InputItem onChange={ v => this.onChange('salary', v)}>职位薪资</InputItem>
                <TextareaItem
                    onChange={ v => this.onChange('requirement', v)}
                    rows={3}
                    autoHeight
                    title='职位要求'
                >职位要求</TextareaItem>
                <WhiteSpace></WhiteSpace>
                <Button type='primary' onClick={() => {this.props.saveInfo(this.state)}}>保存</Button>
            </div>
        );
    }
}

export default BossInfo;