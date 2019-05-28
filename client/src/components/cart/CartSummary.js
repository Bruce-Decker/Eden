import React, { Component } from 'react';
import './Cart.css';
import store from '../../redux/store.js';

class CartSummary extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.toCheckout = this.toCheckout.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
  }

  handleSubmit(event) {
    event.preventDefault();
    var url = '/checkout';
    this.props.history.push(url);
  }

  sumPrices() {
    if(this.props.cartItems.length == 0) {
      return 0.00;
    } else {
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      return this.props.cartItems.map(cartItem => cartItem.price).reduce(reducer).toFixed(2);
    }
  }

  toCheckout() {
    console.log("going to checkout page");
    let s = store.getState();
    console.log(s);
  }

  render() {
    return (
      <div>
        Subtotal: ${this.sumPrices()}<br/>
        Tax: ${(this.sumPrices() * 0.15).toFixed(2)}<br/>
        Total: ${(this.sumPrices() * 1.15).toFixed(2)}<br/>
        <button id="checkout-button" onClick={this.toCheckout}>Proceed to Checkout</button>
      </div>
    );
  }

}

export default CartSummary;




















