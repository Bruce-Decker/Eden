import { GET_ITEM, GET_ITEMS } from '../actions/types';

const initialState = {
  object: Object,
  data: []
}

const items = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEM:
      return {
        ...state,
        object: action.item[0]
      }
    case GET_ITEMS:
      return {
        ...state,
        data: action.items
      }
    default:
      return state
  }
}

export default items