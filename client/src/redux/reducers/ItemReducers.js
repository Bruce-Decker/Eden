import { GET_ITEM, GET_ITEMS } from '../actions/types';

const initialState = {
  object: Object,
  data: []
}

const items = (state = initialState, action) => {
  console.log(state)
  switch (action.type) {
    case GET_ITEM:
      console.log(action.item[0])
      return {
        ...state,
        object: action.item[0]
      }
    case GET_ITEMS:
      console.log(action.items)
      return {
        ...state,
        data: action.items
      }
    default:
      return state
  }
}

export default items