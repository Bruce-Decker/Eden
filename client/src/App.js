import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//import './App.css';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Profile from './components/auth/Profile';
import EnterForgotEmail from './components/auth/EnterForgotEmail';
import changePassword from './components/auth/changePassword';
import { Provider } from 'react-redux';
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <Router>
        <div className="App">
         
          <Route exact path="/" component={Landing} />
          <div className="container">
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/EnterForgotEmail" component={EnterForgotEmail} />
              <Route path="/reset/:token" component={changePassword} />
            </div>
        </div>
      </Router>
    </Provider>
    );
  }
}

export default App;
