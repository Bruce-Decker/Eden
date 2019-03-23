import React, { Component } from 'react';
import './Cart.css';

class CartSummary extends Component {
  constructor(props) {
    super(props);

    this.cartItems = this.props.cartItems;
  }

  sumPrices() {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    return this.cartItems.map(cartItem => parseFloat(cartItem.price.substr(1))).reduce(reducer);
  }

  toCheckout() {
    console.log("going to checkout page");
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
















