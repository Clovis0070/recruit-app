import React, {Component} from 'react';
import logoImg from './job.png';

require('./logo.css');

class Logo extends Component{
    render() {
        return (
            <div className="logo-container">
                <img src={logoImg} alt="logo img"/>
            </div>
        );
    }
}

export default Logo;