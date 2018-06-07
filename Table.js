import React, { Component }from 'react';
import { AppRegistry } from 'react-native';

import GesturePassword from '@DEX/mob-GesturePassword';

let Password1 = ''; // 用于初始设置密码
class AppDemo extends Component {

    construstor(props) {
        super(props)
        this.state = {
            message: 'Please input your password.',
            status: 'normal'
        }
    }

    // 验证密码是否正确
    onEnd = (password) => {
        if (password == '123') {
            this.setState({
                status: 'right',
                message: 'Password is right, success.'
            });

            // your codes to close this view
        } else {
            this.setState({
                status: 'wrong',
                message: 'Password is wrong, try again.'
            });
        }
    }
    onStart = () => {
        this.setState({
            status: 'normal',
            message: 'Please input your password.'
        });
    }
    onReset = () => {
        this.setState({
            status: 'normal',
            message: 'Please input your password (again).'
        });
    }
 
    render() {
        return (
            <GesturePassword
                status={this.state.status}
                message={this.state.message}
                onStart={() => this.onStart()}
                onEnd={(password) => this.onEnd(password)}
                />
        );
    }
}