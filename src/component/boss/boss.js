import React, {Component} from 'react';
import {
    Card,
    WhiteSpace,
    WingBlank
} from 'antd-mobile';
import axios from 'axios';
import {connect} from 'react-redux';

import {getUserList} from '../../redux/chatuser.redux';


// Boss 的操作主页内容Route，展示正在求职的大牛列表
@connect(
    state => state.chatuser,
    {getUserList}
)
class Boss extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }



    componentWillMount() {
        this.props.getUserList('genius');
    }

    render() {
        console.log('boss mount');
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
                                {v.brief}
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

export default Boss;