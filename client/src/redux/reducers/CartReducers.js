import { GET_CART_ITEMS } from '../actions/types';

/*const initialState = {
  ids: [],
  quantities: {}
}*/

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
    default:
      return state
  }
}

export default cart