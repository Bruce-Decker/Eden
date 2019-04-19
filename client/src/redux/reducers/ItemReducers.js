import { GET_ITEMS } from '../actions/types';

const initialState = {
  data: []
}

const items = (state = initialState, action) => {
  console.log(state)
  switch (action.type) {
    case GET_ITEMS:
      console.log(action.items);
      return {
        ...state,
        data: action.items
      }
    default:
      return state
  }
}

export default items