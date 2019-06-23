import React, { Component } from 'react';
import './App.css';

import Landing from '../components/landing/Landing';
import Home from '../components/home/Home';
import Login from '../components/login/Login';
import Product from '../components/product/Product';
import ChangeProfile from '../components/profile/ChangeProfile';
import ShowProfile from '../components/profile/ShowProfile';
import Register from '../components/register/Register';
import Items from '../components/items/index';
import List from '../components/service/List';
import ShowAllUserItems from '../components/item/ShowAllUserItems'
import SearchResults from '../components/search/SearchResults';
import Ar from '../components/ar/index';
import VR from '../components/vr/VR';
import Item from '../components/item/index';
import CreateItem from '../components/item/CreateItem'
import Cart from '../components/cart/Cart';
import Checkout from '../components/checkout/Checkout';

import { Provider } from 'react-redux';
import { setCurrentUser } from '../redux/actions/AuthenticationActions';
import  setTokenHeader  from '../utils/setTokenHeader';
import jwt_decode from 'jwt-decode';
import store from '../redux/store';

import { BrowserRouter , Route, Link, Switch } from 'react-router-dom';
import Property from '../components/property/Property';
import Service from '../components/service/Service';

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
          <Route exact path="/property" component={Property} />
          <Route exact path="/service" component={Service} />
          <Route exact path="/product/:category" component={Items} />
          <Route exact path="/service/:category" component={List} />
          <Route exact path="/changeProfile" component = {ChangeProfile} />
          <Route exact path="/showProfile/:email" component = {ShowProfile} />
          <Route exact path="/items/:id" component={Item} />
          <Route exact path="/createItem" component={CreateItem} />
          <Route exact path="/showShowAllUserItems/:email" component={ShowAllUserItems} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/search/:keyword" component={SearchResults} />
          <Route exact path="/checkout" component={Checkout} />
          <Route exact path="/vr/:item_id" component={VR} />
          <Route exact path="/items/:id/ar" component={Ar} />

        </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
