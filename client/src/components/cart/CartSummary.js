import React, { Component } from 'react';
import './Cart.css';
import { withRouter } from 'react-router-dom';

class CartSummary extends Component {
  constructor(props) {
    super(props);

    this.toCheckout = this.toCheckout.bind(this);
  }

  prices() {
    if(this.props.cartItems.length == 0) {
      return 0.00;
    } else {
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      let subtotal = this.props.cartItems.map(cartItem => cartItem.price).reduce(reducer).toFixed(2);
      let tax = (subtotal * 0.15).toFixed(2);
      let total = (parseFloat(subtotal) + parseFloat(tax)).toString();
      return {
        subtotal: subtotal,
        tax: tax,
        total: total
      }
    }
  }

  toCheckout() {
    let url = '/checkout';
    let prices = this.prices();

    this.props.history.push({
      pathname: url,
      state: prices
    });
  }

  render() {
    let prices = this.prices();
    return (
      <div>
        Subtotal: ${prices.subtotal}<br/>
        Tax: ${prices.tax}<br/>
        Total: ${prices.total}<br/>
        <button id="checkout-button" onClick={this.toCheckout}>Proceed to Checkout</button>
      </div>
    );
  }

}

export default withRouter(CartSummary);




















