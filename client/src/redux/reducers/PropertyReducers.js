import { GET_PROPERTIES } from '../actions/types';

const initialState = {
  data: []
}

const property = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROPERTIES:
      return {
        ...state,
        data: action.properties
      }
    default:
      return state
  }
}

export default property