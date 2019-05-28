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

// for testing
const cartItems = [
  {
    id: 1,
    title: 'Orange',
    img: apple,
    rating: [1],
    price: '$0.99',
    description: 'High in vitamin C, oranges are a delicious part of any diet.',
    quantity: 1
  },
  {
    id: 2,
    title: 'Apple',
    img: apple,
    rating: [1, 2, 3],
    price: '$2.99',
    description: 'High in antioxidants, apples are a wholesome part of any diet.',
    quantity: 2
  },
  {
    id: 3,
    title: 'Melon',
    img: apple,
    rating: [1, 2, 3, 4, 5],
    price: '$4.99',
    description: 'High in potassium, melons are an enjoyable part of any diet.',
    quantity: 3
  }
];

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cartItems: []
    };

    this.getCart();
  }

  async getCart() {
    // get the email of the current logged-in user
    let params = {
      email: window.localStorage.getItem('currentUser')
    };

    try {
      console.log(params);
      const res = await axios.get('/cart/getCartItems', {params:params});
      let ci = res.data;
      this.setState({
        cartItems: ci
      });

    } catch (err) {
      console.log(err);
    }
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
              <CartItems cartItems={this.state.cartItems}/>
            </div>
            <hr/>
            <Recommendation/>
          </div>
          <div class="col-3">
            <div class="right-col">
              <CartSummary cartItems={this.state.cartItems}/>
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

export default Cart;













