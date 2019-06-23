import React, { Component } from 'react';
import './Cart.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class CartSummary extends Component {
  constructor(props) {
    super(props);

    this.toCheckout = this.toCheckout.bind(this);
    this.checkoutButtonClass = this.checkoutButtonClass.bind(this);
  }

  prices() {
    if(this.props.cart.items.length === 0) {
      return {
        subtotal: 0.00,
        tax: 0.00,
        total: 0.00
      }
    } else {
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      let subtotal = this.props.cart.items.map(cartItem => cartItem.price*cartItem.quantity).reduce(reducer).toFixed(2);
      let tax = (subtotal * 0.15).toFixed(2);
      let total = (parseFloat(subtotal) + parseFloat(tax)).toFixed(2);
      return {
        subtotal: subtotal,
        tax: tax,
        total: total
      }
    }
  }

  toCheckout() {
    if(this.props.cart.items.length === 0) {
      console.log("Cannot checkout with an empty cart...");
    } else {
      let url = '/checkout';
      let prices = this.prices();

      this.props.history.push({
        pathname: url,
        state: prices
      });
    }
  }

  checkoutButtonClass() {
    if(this.props.cart.items.length === 0) {
      return "no-checkout-button";
    } else {
      return "cart-checkout-button";
    }
  }

  render() {
    let prices = this.prices();
    return (
      <div id="cart-summary-div">
        <span class="cart-price-title">Subtotal:</span> 
        <span class="cart-price-amt">${prices.subtotal}</span><br/>
        <span class="cart-price-title">Tax:</span> 
        <span class="cart-price-amt">${prices.tax}</span><br/>
        <span id="cart-total-title">Total:</span> 
        <span id="cart-total-amt">${prices.total}</span><br/>
        <br/>
        <button 
          class={this.props.cart.items.length === 0
          ? "no-checkout-button"
          : "cart-checkout-button"}
          onClick={this.toCheckout}>Proceed to Checkout</button>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
};

export default withRouter(connect(
  mapStateToProps
)(CartSummary));




















