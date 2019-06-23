import React, { Component } from 'react';
import './Cart.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

    let name = item.item_name;
    toast.success(name + " was successfully added to the cart!", {
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      newestOnTop: true,
      className: "addtocart-toast-toast",
      bodyClassName: "addtocart-toast-body",
      progressClassName: "addtocart-toast-progress",
      draggable: false,
    });

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



















