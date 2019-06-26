import { GET_CART_ITEMS, ADD_TO_CART, CHANGE_QUANTITY, REMOVE_FROM_CART } from '../actions/types';

const initialState = {
  items: []
}

const cart = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART_ITEMS:
      return {
        items: action.items
      }
    case ADD_TO_CART:
      if (action.isNewItem) {
        // if it's a new item, add it to the cart's list of items
        let newItem = Object.assign({}, action.item);
        newItem.quantity = 1;

        return {
          ...state,
          items: [...state.items, newItem]
        }
      } else {
        // if it's not a new item, increase its quantity by 1
        return {
          ...state,
          items: state.items.map(item => {
            if (item.id === action.item.item_id) {
              return {
                ...item,
                quantity: item.quantity + 1
              }
            } else {
              return item;
            }
          })
        }
      }
    case CHANGE_QUANTITY:
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id === action.iid) {
            return {
              ...item,
              quantity: action.newQuantity
            }
          } else {
            return item;
          }
        })
      }
    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.iid)
      }
    default:
      return state
  }
}

export default cart