import React, { Component } from 'react';
import './Cart.css';
import RegularBanner from '../banner/RegularBanner';
import Recommendation from '../item/Recommendation';
import Footer from '../footer/Footer';
import apple from '../../images/apple.png'
import star from '../../images/rating.png'

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

    this.sumPrices = this.sumPrices.bind(this);
    this.toCheckout = this.toCheckout.bind(this);
  }

  sumPrices() {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    return cartItems.map(cartItem => parseFloat(cartItem.price.substr(1))).reduce(reducer);
  }

  toCheckout() {
    console.log("going to checkout page");
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
              <ul class="cart-item-list">
                {cartItems.map(cartItem => {
                  return (
                    <li key={cartItem.id} class="cart-item row">
                      <div class="col-2">
                        <img class="cart-item-img" style={{width: "100%"}} src={cartItem.img} alt="Item"></img>
                      </div>
                      <div class="col-6">
                        <div>{cartItem.title}</div>
                        <div>{cartItem.description}</div>
                        {/*
                        <div>
                          {cartItem.rating.map(i => {
                            return <img key={i} class="item-rating" src={star} alt="Rating" style={{width: "16px", height: "16px"}}></img>
                          })}
                        </div>
                        */}
                      </div>
                      <div class="col-3">
                        <div>{cartItem.price}</div>
                        <div>Change Quantity</div>
                        <div>Remove From Cart</div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
            <hr/>
            <Recommendation/>
          </div>
          <div class="col-3">
            <div class="right-col">
              <div>
                Subtotal: ${this.sumPrices()}<br/>
                Tax: ${(this.sumPrices() * 0.15).toFixed(2)}<br/>
                Total: ${(this.sumPrices() * 1.15).toFixed(2)}<br/>
                <button id="checkout-button" onClick={this.toCheckout}>Proceed to Checkout</button>
              </div>
              <hr/>
              <div>
                <h3>Other Users Also Bought</h3>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default Cart;