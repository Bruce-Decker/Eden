import { GET_ITEM, GET_ITEMS, GET_ITEMS_PAGE } from '../actions/types';

const initialState = {
  object: Object,
  data: [],
  numItems: 0,
  activePage: 0,
  itemsPerPage: 0
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
        numItems: action.numItems,
        activePage: action.activePage,
        itemsPerPage: action.itemsPerPage,
        data: action.items
      }
    case GET_ITEMS_PAGE:
      return {
        ...state,
        activePage: action.activePage,
        data: action.items
      }
    default:
      return state
  }
}

export default items