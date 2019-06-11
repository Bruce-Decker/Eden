import { GET_CART_ITEMS, CHANGE_QUANTITY } from '../actions/types';

const initialState = {
  items: []
}

const cart = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART_ITEMS:
      return {
        items: action.items
      }
    /*
    case ADD_TO_CART:
      if (state.ids.indexOf(action.id) !== -1) {
        let quantities = {...state.quantities}
        quantities[action.id] += 1
        return {
          ...state,
          quantities: {...quantities}
        }
      }
      return {
        ...state,
        ids: [...state.ids, action.id],
        quantities: {...state.quantities, [action.id]: 1}
      }*/
    case CHANGE_QUANTITY:
      return {
        items: state.items.map(item => {
          if (item.id == action.iid) {
            return {
              ...item,
              quantity: action.newQuantity
            }
          } else {
            return item;
          }
        })
      }
    default:
      return state
  }
}

export default cart