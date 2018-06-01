import React, {Component} from 'react';
import {connect} from 'react-redux';

import {getUserList} from '../../redux/chatuser.redux';
import Usercard from '../../component/usercard/usercard';

// Genius 的操作主页内容Route，展示正在求职的大牛列表
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



    componentDidMount() {
        this.props.getUserList('genius');
    }

    render() {
        console.log('boss mount');
        return (
            <Usercard userlist={this.props.userlist}></Usercard>
        );
    }
}

export default Boss;