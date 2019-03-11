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


class Footer extends Component {

    render() {
        return (
            <footer>
            <div class="footer-copyright text-center">
                © 2019 Eden
            </div>    
          </footer>
        )
    }
}

export default Footer