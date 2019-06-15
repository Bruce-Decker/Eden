import React, { Component } from 'react';
import './Cart.css';

import { connect } from 'react-redux';
import { addToCart } from '../../redux/actions/CartActions';

class CartAddButton extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
  }

  handleClick() {
    let email = this.props.auth.user.email;
    let item = this.props.item; // get item information from parent

    this.props.addToCart(email, item);
  }

  render() {
    return (
      <button className="addtocart-button" onClick={this.handleClick}>Add To Cart</button>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return ({
    addToCart: (email, item) => {
      dispatch(addToCart(email, item));
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
)(CartAddButton);



















