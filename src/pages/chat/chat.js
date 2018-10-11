import React, {Component} from 'react';
import {
    List,
    InputItem
} from 'antd-mobile'

const io = require('socket.io-client');
class Chat extends Component{
    constructor(props) {
        super(props);
        this.state = {text: ''}
    }

    componentDidMount() {
        const socket = io('ws://localhost:9093');

    }

    handleSubmit = () => {
        console.log(this.state);
    }

    render() {
        // console.log(this.props);
        return (
            <div className="stick-footer">
                <List>
                    <InputItem
                        placeholder="请输入"
                        value={this.state.text}
                        onChange={v=>{this.setState({text: v})}}
                        extra={<span onClick={this.handleSubmit}>Send</span>}
                    >

                    </InputItem>
                </List>
            </div>

        );
    }
}

export default Chat;