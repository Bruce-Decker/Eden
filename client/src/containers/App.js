import React, { Component } from 'react';
import './App.css';
import Landing from '../components/landing/Landing';
import Home from '../components/home/Home';
import Login from '../components/login/Login';
import Product from '../components/product/Product'
import ChangeProfile from '../components/profile/ChangeProfile'
import ShowProfile from '../components/profile/ShowProfile'
import Register from '../components/register/Register'
import { Provider } from 'react-redux';
import { setCurrentUser } from '../redux/actions/AuthenticationActions'
import  setTokenHeader  from '../utils/setTokenHeader'
import jwt_decode from 'jwt-decode';
import store from '../redux/store'

import { BrowserRouter , Route, Link, Switch } from 'react-router-dom';

// for testing
import Item from '../components/item/index'
import Cart from '../components/cart/Cart'
// for testing

if (localStorage.jwtToken) {
  // Set auth token header auth
  setTokenHeader(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    // store.dispatch(logoutUser());
    // // Clear current Profile
    // store.dispatch(clearCurrentProfile());
    // // Redirect to login
    // window.location.href = '/login';
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
        <div className="App">
        
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/product" component={Product} />
          <Route exact path = "/changeProfile" component = {ChangeProfile} />
          <Route exact path = "/showProfile" component = {ShowProfile} />

          {/* for testing */}
          <Route exact path="/item" component={Item} />
          <Route exact path="/cart" component={Cart} />
          {/* for testing */}


        </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;