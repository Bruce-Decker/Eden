import { GET_ERRORS, GET_CART_ITEMS } from './types';
import axios from 'axios';

export const getCartItems = email => dispatch => {
  // get the email of the current logged-in user
  let params = {
    email: email
  };

  axios
    .get('/cart/getCartItems', {params:params})
    .then(res => {
      let items = res.data;
      dispatch(cartSuccess(items));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

export const addToCart = iid => dispatch => {
  let items = [];
  dispatch(cartSuccess(items));
}

export const removeFromCart = iid => dispatch => {
  let items = [];
  dispatch(cartSuccess(items));
}

export const changeQuantity = (iid, newQuantity) => dispatch => {
  let items = [];
  dispatch(cartSuccess(items));
}

export const cartSuccess = items => ({
  type: GET_CART_ITEMS,
  items
})
