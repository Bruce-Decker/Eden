import { GET_ERRORS,
         GET_CART_ITEMS,
         ADD_TO_CART,
         CHANGE_QUANTITY,
         REMOVE_FROM_CART } from './types';
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

export const addToCart = (email, item) => dispatch => {
  let params = {
    email: email,
    iid: item.item_id || item.id
  };

  axios
    .post('/cart/addToCart', params)
    .then(res => {
      let isNewItem = res.isNewItem;
      dispatch(addSuccess(item, isNewItem));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

export const removeFromCart = (email, iid) => dispatch => {
  let params = {
    email: email,
    iid: iid
  }

  axios
    .post('/cart/removeFromCart', params)
    .then(res => {
      dispatch(removeSuccess(iid));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

export const changeQuantity = (email, iid, newQuantity) => dispatch => {
  let params = {
    email: email,
    iid: iid,
    newQuantity: newQuantity
  }

  axios
    .post('/cart/changeQuantity', params)
    .then(res => {
      dispatch(changeQuantitySuccess(iid, newQuantity));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

export const cartSuccess = items => ({
  type: GET_CART_ITEMS,
  items: items
})

export const addSuccess = (item, isNewItem) => ({
  type: ADD_TO_CART,
  item: item,
  isNewItem: isNewItem
})

export const changeQuantitySuccess = (iid, newQuantity) => ({
  type: CHANGE_QUANTITY,
  iid: iid,
  newQuantity: newQuantity
})

export const removeSuccess = iid => ({
  type: REMOVE_FROM_CART,
  iid: iid
})
