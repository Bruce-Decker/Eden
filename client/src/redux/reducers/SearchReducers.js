import { GET_SEARCH_RESULTS, NO_SEARCH_RESULTS } from '../actions/types';

const initialState = {
  numItems: 0,
  activePage: 0,
  itemsPerPage: 0,
  items: []
}

const search = (state = initialState, action) => {
  switch (action.type) {
    case GET_SEARCH_RESULTS:
      return {
        numItems: action.numItems,
        activePage: action.activePage,
        itemsPerPage: action.itemsPerPage,
        items: action.items,
        searchType: action.searchType
      }
    case NO_SEARCH_RESULTS:
      return {
        items: []
      }
    default:
      return state
  }
}

export default search