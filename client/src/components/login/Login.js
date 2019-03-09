import React, { Component } from 'react';
import './Login.css';
import { BrowserRouter , Route, Link, Switch } from 'react-router-dom';

class Login extends Component {
    render() {
      return (
        <div>
            <h3>*Login*</h3>
            <Link to = "/cart"> Cart  </Link>
        </div>
      );
    }
}

export default Login;