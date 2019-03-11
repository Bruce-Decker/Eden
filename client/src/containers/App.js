import React, { Component } from 'react';
import './App.css';
import Landing from '../components/landing/Landing';
import Home from '../components/home/Home';
import Login from '../components/login/Login';

import { BrowserRouter , Route, Link, Switch } from 'react-router-dom';




class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
      
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
