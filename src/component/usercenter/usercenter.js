import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Result,
    List,
    WhiteSpace
} from 'antd-mobile';


// 用户个人中心，dashboard 的 User 路由所指向
@connect(
    state => state.user
)
class UserCenter extends Component {
    constructor(props) {
        super(props);
        // this.logout = this.logout.bind(this)
    }

    logout = () => {
        console.log('log out');
        return 1
    }

    render() {
        // console.log(document.cookie);
        const Item = List.Item;
        const Brief = Item.Brief;
        let renderHeader = this.props.type == 'boss' ? '招聘需求' : '个人简介';
        let desc = this.props.type == 'boss' ? this.props.requirement : this.props.brief;
        return this.props.user ? (
                <div onClick={function () {
                    console.log('this is nonsense');
                }}>
                    <div className='stt' style={{width :50, height:50}}>aaaa</div>
                    <Result
                        img={<img style={{width:50}} src={require(`../img/${this.props.avatar}.png`)}/>}
                        title={this.props.user}
                        message={this.props.company}
                    ></Result>
                    {/*<p>用户中心</p>*/}
                    <List renderHeader={()=>renderHeader} className="my-list">
                        <Item multipleLine>
                            {this.props.title}
                            {desc.split('\n').map(v=><Brief key={v}>{v}</Brief>)}
                        </Item>
                    </List>
                    <WhiteSpace></WhiteSpace>
                    {/*<WhiteSpace></WhiteSpace>*/}
                    <List id="logout">
                        <Item>退出登录</Item>
                    </List>
                </div>
            )
            : null;
    }
}

export default UserCenter;