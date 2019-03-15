import { ADD_TO_CART, REMOVE_FROM_CART, CHANGE_QUANTITY } from './types';

export const addToCart = id => ({
  type: ADD_TO_CART,
  id
})

export const removeFromCart = id => ({
  type: REMOVE_FROM_CART,
  id
})

export const changeQuantity = (id, newQuantity) => ({
  type: ADD_TO_CART,
  id,
  newQuantity
})
