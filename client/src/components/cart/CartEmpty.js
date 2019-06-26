import React, { Component } from 'react';
import './Cart.css';
import { BrowserRouter as Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';

class CartEmpty extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="outer-div">
        <span id="cart-empty-message">Your cart is currently empty.</span>
        <br/>
        <Link to="/product">
          <button onClick={() => window.scrollTo(0, 0)} className="shop-button">Start Shopping</button>
        </Link>
      </div>
    );
  }
}

export default CartEmpty;













