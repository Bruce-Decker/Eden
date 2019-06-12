import React, { Component } from 'react';
import './Cart.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class CartSummary extends Component {
  constructor(props) {
    super(props);

    this.toCheckout = this.toCheckout.bind(this);
  }

  prices() {
    if(this.props.cart.items.length == 0) {
      return 0.00;
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

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
};

export default withRouter(connect(
  mapStateToProps
)(CartSummary));




















