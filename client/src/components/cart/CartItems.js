import React, { Component } from 'react';
import './Cart.css';
import apple from '../../images/apple.png';
import star from '../../images/rating.png';

class CartItems extends Component {
  constructor(props) {
    super(props);

    this.cartItems = this.props.cartItems;
  }

  render() {
    return (
      <ul class="cart-item-list">
        {this.cartItems.map(cartItem => {
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
    );
  }
}

export default CartItems;











