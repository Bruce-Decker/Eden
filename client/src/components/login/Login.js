import React, { Component } from 'react';
import './Login.css';
import { BrowserRouter , Route, Link, Switch } from 'react-router-dom';
import RegularBanner from '../banner/RegularBanner'

class Login extends Component {
    render() {
      return (
        <div>
            <RegularBanner />
           
        </div>
      );
    }
}

export default Login;