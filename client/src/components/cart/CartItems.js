import React, { Component } from 'react';
import './Cart.css';

import { BrowserRouter as Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import apple from '../../images/apple.png';
import star from '../../images/rating.png';

class CartItems extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <ul class="cart-item-list">
        {this.props.cart.items.map(cartItem => {
          return (
            <li key={cartItem.id} class="cart-item row">
              <div class="col-2">
                <img class="cart-item-img" style={{width: "100%"}} src={cartItem.image} alt="Item"></img>
              </div>
              <div class="col-6">
                <Link to={"/items/" + cartItem.id}>
                  <div onClick={() => window.scrollTo(0, 0)}>{cartItem.name}</div>
                </Link>
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

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
};

export default connect(
  mapStateToProps
)(CartItems);











