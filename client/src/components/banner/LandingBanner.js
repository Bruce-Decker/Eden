import React, { Component } from 'react';
import '../../containers/App.css';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import search from '../../images/search.png';
import cart from '../../images/cart.png';
import apple from '../../images/apple.png';
import Home from '../home/Home';
import Product from '../product/Product';
import Service from '../service/Service';
import Property from '../property/Property';
import Food from '../food/Food';
import Cart from '../cart/Cart';
import Login from '../login/Login';
import SearchBar from './SearchBar';

class LandingBanner extends Component {
    render() {
      
      return (
      
        <div className="navbar-custom">
          <div className="container">
            <nav className="navbar navbar-expand-md">
              <div className="navbar-header">
                <Link to="/">
                  <img src={apple} height="32" width="32" alt="Home"></img>
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
              </div>
              <div className="navbar-collapse collapse" id="navbar">
                  <ul className="navbar-nav mr-auto">
                      <li className="nav-item">
                        <Link className="nav-link" to="/product">Product</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/service">Service</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/property">Property</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/food">Food</Link>
                      </li>
                  </ul>
                  <SearchBar/>
                  <ul className="navbar-nav ml-auto">
                      <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/register">Register</Link>
                      </li>
                  </ul>
              </div>
            </nav>
          </div>
        </div>

      )
    }

}

export default LandingBanner;