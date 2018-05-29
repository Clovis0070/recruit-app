import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    TabBar
} from 'antd-mobile';
import {
    withRouter
    // Route
} from 'react-router-dom';

@withRouter
class NavLinkBar extends Component{
    static propTypes = {
        data: PropTypes.array.isRequired
    }

    render() {

        const navList = this.props.data.filter( v => !v.hide)   // 把 hide 为true 的组件隐藏
        // console.log(navList);
        const {pathname} = this.props.location;             // this.props 必有一个 location，这个是react加的，保存了当前的路径的最后一个词，即路径最后一个 / 号后的词
        return (
            <TabBar>
                {navList.map(v => (
                    <TabBar.Item
                        key={v.path}
                        title={v.text}
                        icon={{uri: require(`./img/${v.icon}.png`)}}
                        selectedIcon={{uri: require(`./img/${v.icon}-active.png`)}}
                        selected={pathname===v.path}
                        onPress={()=>{
                            this.props.history.push(v.path)
                        }}
                    >
                    </TabBar.Item>
                ))}
            </TabBar>
        );
    }
}

export default NavLinkBar;