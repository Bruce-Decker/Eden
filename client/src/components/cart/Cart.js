import React, { Component } from 'react';
import './Cart.css';
import axios from 'axios';

import CartItems from './CartItems';
import CartSummary from './CartSummary';
import OtherBoughtItems from './OtherBoughtItems';
import RegularBanner from '../banner/RegularBanner';
import Recommendation from '../item/Recommendation';
import Footer from '../footer/Footer';
import apple from '../../images/apple.png';
import star from '../../images/rating.png';

import { connect } from 'react-redux'
import { getCartItems, addToCart, removeFromCart, changeQuantity } from '../../redux/actions/CartActions';

// for testing
const cartItems = [
  {
    id: 1,
    title: 'Orange',
    img: apple,
    rating: [1],
    price: 0.99,
    description: 'High in vitamin C, oranges are a delicious part of any diet.',
    quantity: 1
  },
  {
    id: 2,
    title: 'Apple',
    img: apple,
    rating: [1, 2, 3],
    price: 2.99,
    description: 'High in antioxidants, apples are a wholesome part of any diet.',
    quantity: 2
  },
  {
    id: 3,
    title: 'Melon',
    img: apple,
    rating: [1, 2, 3, 4, 5],
    price: 4.99,
    description: 'High in potassium, melons are an enjoyable part of any diet.',
    quantity: 3
  }
];

class Cart extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    let currentUser = window.localStorage.getItem('currentUser');
    this.props.getCartItems(currentUser);
  }

  render() {
    return (
      <div>
        <RegularBanner/>
        <div class="cart-header">
          <h1>Shopping Cart</h1>
        </div>
        <div class="cart-container row">
          <div class="col-8 divider">
            <div class="left-col">
              <CartItems cartItems={this.props.cart.items}/>
            </div>
            <hr/>
            <Recommendation/>
          </div>
          <div class="col-3">
            <div class="right-col">
              <CartSummary cartItems={this.props.cart.items}/>
              <hr/>
              <OtherBoughtItems/>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return({
    getCartItems: email => {
      dispatch(getCartItems(email));
    },
    addToCart: iid => {
      dispatch(addToCart(iid));
    },
    removeFromCart: iid => {
      dispatch(removeFromCart(iid));
    },
    changeQuantity: (iid, newQuantity) => {
      dispatch(changeQuantity(iid, newQuantity));
    }
  });
};

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);



















