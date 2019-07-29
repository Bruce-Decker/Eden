import React, { Component } from 'react';
import './Cart.css';

import CartItems from './CartItems';
import CartSummary from './CartSummary';
import OtherBoughtItems from './OtherBoughtItems';
import RegularBanner from '../banner/RegularBanner';
import TopRatedItems from './TopRatedItems';
import Footer from '../footer/Footer';
import apple from '../../images/apple.png';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCartItems } from '../../redux/actions/CartActions';

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
    if(!this.props.auth || !this.props.auth.user || !this.props.auth.user.email) {
      let url = '/login';

      this.props.history.push({
        pathname: url
      });
    } else {
      let email = this.props.auth.user.email;
      sessionStorage.setItem('email', email);
      this.props.getCartItems(email);
    }
  }

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <div>
        <RegularBanner/>
        <div className="cart-header">
          <h1>Shopping Cart</h1>
        </div>
        <div className="cart-container row">
          <div className="col-8 divider">
            <div className="cart-item-div left-col">
              <CartItems/>
            </div>
            <TopRatedItems/>
          </div>
          <div className="col-3">
            <div className="right-col">
              <CartSummary/>
              <div id="obi-div">
                <OtherBoughtItems/>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return ({
    getCartItems: email => {
      dispatch(getCartItems(email));
    }
  });
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    cart: state.cart
  }
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart));



















