import React, { Component } from 'react';
import '../../containers/App.css';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import search from '../../images/search.png'
import cart from '../../images/cart.png'
import apple from '../../images/apple.png'
import Home from '../home/Home'
import Product from '../product/Product'
import Service from '../service/Service'
import Property from '../property/Property'
import Food from '../food/Food'
import Cart from '../cart/Cart'
import Login from '../login/Login'


class LandingBanner extends Component {
    render() {
      
      return (
      
        <div class="navbar-custom">
          <div class="container">
            <nav class="navbar navbar-expand-md">
              <div class="navbar-header">
                <Link to="/">
                  <img src={apple} height="32" width="32" alt="Search"></img>
                </Link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
              </div>
              <div class="navbar-collapse collapse" id="navbar">
                  <ul class="navbar-nav mr-auto">
                      <li class="nav-item">
                        <Link class="nav-link" to="product">Product</Link>
                      </li>
                      <li class="nav-item">
                        <Link class="nav-link" to="service">Service</Link>
                      </li>
                      <li class="nav-item">
                        <Link class="nav-link" to="property">Property</Link>
                      </li>
                      <li class="nav-item">
                        <Link class="nav-link" to="food">Food</Link>
                      </li>
                  </ul>
                  <ul class="navbar-nav ml-auto">
                      <li class="nav-item">
                        <a class="nav-link" href=".">
                          <img src={search} height="24" width="24" alt="Search"></img>
                        </a>
                      </li>
                      <li class="nav-item">
                        <Link class="nav-link" to="cart">
                          <img src={cart} height="28" width="28" alt="Cart"></img>
                        </Link>
                      </li>
                      <li class="nav-item">
                        <Link class="nav-link" to="/login">Login</Link>
                      </li>
                      <li class="nav-item">
                        <Link class="nav-link" to="/register">Register</Link>
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