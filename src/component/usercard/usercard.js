import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Card,
    WingBlank,
    WhiteSpace
} from "antd-mobile";

// 用于展示可选联系人的组件，展示联系人的头像、职位、简介等信息
// 注意，使用此组件，务必定义 userlist 属性，将联系人的数据（为json数组）放入userlist
class Usercard extends Component {

    static propTypes = {userlist: PropTypes.array.isRequired}    // 类型检查，this.props 里必须有 userlist

    render() {
        const Header = Card.Header,
            Body = Card.Body;

        return (
            <WingBlank className="list-content">
                {this.props.userlist.map(v => (
                    v.avatar
                        ? (<div key={v._id}>
                            <Card>
                                <Header title={v.user} thumb={require(`../img/${v.avatar}.png`)}
                                        extra={<span>{v.title}</span>}>
                                </Header>
                                <Body>
                                    {v.type === 'boss' ? <div><span>公司</span> ：{v.company}</div> : null}
                                    {v.type === 'boss' ? <hr/> : null}
                                    <div>{v.type === 'boss' ? '职位要求：' : null}</div>
                                    {
                                        (v.type === 'boss' ? v.requirement : v.brief).split('\n').map(v => (
                                            <div key={v}>{v}</div>
                                        ))
                                    }
                                    <hr/>
                                    <div>{v.type === 'boss' ? '职位' : '期望'}薪资: {v.salary}</div>
                                </Body>
                            </Card>
                            <WhiteSpace></WhiteSpace>

                        </div>)
                        : null
                ))}
            </WingBlank>
        );
    }
}

export default Usercard;