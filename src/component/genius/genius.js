import React, {Component} from 'react';
import {connect} from 'react-redux';

import {getUserList} from '../../redux/chatuser.redux';
import Usercard from "../usercard/usercard";


// Genius 的操作主页内容Route，展示正在求职的大牛列表
@connect(
    state => state.chatuser,
    {getUserList}
)
class Genius extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this.props.getUserList('boss');
    }

    render() {
        return <Usercard userlist={this.props.userlist}></Usercard>
    }
}

export default Genius;