import React, { Component } from 'react';
import './Cart.css';
import CartEmpty from './CartEmpty';
import DeleteModal from './DeleteModal';

import { BrowserRouter as Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeFromCart, changeQuantity } from '../../redux/actions/CartActions';

import apple from '../../images/apple.png';
import star from '../../images/rating.png';

class CartItems extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
  }

  handleChange(e) {
    let arr = e.target.value.split('_');
    let email = this.props.auth.user.email;
    let iid = arr[0];
    let newQuantity = parseInt(arr[1]);
    this.props.changeQuantity(email, iid, newQuantity);
  }

  render() {
    if (this.props.cart.items.length === 0) {
      return (
        <CartEmpty/>
      );
    } else {
      return (
        <ul class="cart-item-list">
          {this.props.cart.items.map(cartItem => {
            return (
              <li key={cartItem.id} class="cart-item row">
                <div class="col-3">
                  <img class="cart-item-img" style={{width: "100%"}} src={cartItem.image} alt="Item"></img>
                </div>
                <div class="col-7">
                  <Link to={"/items/" + cartItem.id}>
                    <span class="cart-item-title" onClick={() => window.scrollTo(0, 0)}>{cartItem.name}</span>
                  </Link>
                  <hr/>
                  <div>{cartItem.description}</div>
                </div>
                <div class="col-2">
                  <span class="cart-item-price">{"$" + cartItem.price.toFixed(2)}</span>
                  <hr/>
                  <div>
                    <span class="quantity-spn">Quantity </span>
                    <select class="quantity-sel" name="quantity" defaultValue={cartItem.id+"_"+cartItem.quantity} onChange={this.handleChange}>
                      <option value={cartItem.id+"_1"}>1</option>
                      <option value={cartItem.id+"_2"}>2</option>
                      <option value={cartItem.id+"_3"}>3</option>
                      <option value={cartItem.id+"_4"}>4</option>
                      <option value={cartItem.id+"_5"}>5</option>
                      <option value={cartItem.id+"_6"}>6</option>
                      <option value={cartItem.id+"_7"}>7</option>
                      <option value={cartItem.id+"_8"}>8</option>
                      <option value={cartItem.id+"_9"}>9</option>
                      <option value={cartItem.id+"_10"}>10</option>
                    </select>
                  </div>
                  <hr/>
                  <DeleteModal iid={cartItem.id}/>
                </div>
              </li>
            )
          })}
        </ul>
      );
    }
  }
}

const mapDispatchToProps = dispatch => {
  return({
    removeFromCart: (email, iid) => {
      dispatch(removeFromCart(email, iid));
    },
    changeQuantity: (email, iid, newQuantity) => {
      dispatch(changeQuantity(email, iid, newQuantity));
    }
  });
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    cart: state.cart
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartItems);











