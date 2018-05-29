import React, {Component} from 'react';
import {
    Card,
    WhiteSpace,
    WingBlank
} from 'antd-mobile';
import axios from 'axios';



// Boss 的操作主页内容Route，展示正在求职的大牛列表
class Boss extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }



    componentWillMount() {
        console.log('boss will mount');
        axios.get('/user/list?type=genius')
            .then(res => {
                if (res.data.code === 0) {
                    this.setState({data: res.data.data})
                }
            })
    }

    render() {
        console.log('boss mount');
        const Header = Card.Header,
            Body = Card.Body;
        console.log(this.state.data);
        return (
            <WingBlank className="list-content">
                {this.state.data.map(v => (
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