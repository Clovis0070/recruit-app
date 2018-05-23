import React, {Component} from 'react';
import {
    Grid,
    List
} from 'antd-mobile'
import PropTypes from 'prop-types';    // 类型检测组件

// 头像选择
class AvataSelector extends Component {
    static propTypes = {
        selectAvatar: PropTypes.func        // 规定 selectAvatar 的传入参数必须为function，否则报warnning
    }

    constructor(props) {
        super(props);

        this.state = {
            icon: ''
        }
    }


    render() {
        const avatarList = 'boy, bull, chick, crab, girl, hedgehog, hippopotamus, koala, lemur, man, pig, tiger, whale, woman, zebra'.split(', ')
            .map(v => ({
                icon: require(`../img/${v}.png`),
                text: v
            }));

        const gridHeader = this.state.icon
            ? (<div>
                <span>已选择头像</span>
                <img src={this.state.icon} style={{width: 20}} alt="头像"/>
               </div>)
            : '请选择头像';

        return (
            <div>
                <List renderHeader={()=>gridHeader}>
                    <Grid data={avatarList} columnNum={5} onClick={elem => {
                        this.setState(elem);
                        this.props.selectAvatar(elem.text);
                    }}/>
                </List>
            </div>
        );
    }
}

export default AvataSelector;