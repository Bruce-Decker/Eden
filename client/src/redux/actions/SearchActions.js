import { GET_ERRORS, GET_SEARCH_RESULTS, NO_SEARCH_RESULTS } from './types';
import axios from 'axios';

export const getSearchResults = (pageNumber) => dispatch => {
  // obtain url, containing search query
  let uri = window.location.href;
  console.log(uri);

  // isolate search query
  let url = new URL(uri);

  // search keyword
  let kw = url.searchParams.get('kw');

  // search category
  let cg = url.searchParams.get('cg');

  // search type
  let st = cg.slice(0,3);

  // simple or not
  let sm = 'false';
  if(cg == 'itm-all' || cg == 'svc-all') {
    sm = 'true';
  }
  
  let params = {
    simple: sm,
    searchType: st,
    keyword: kw,
    category: cg,
    pageNumber: pageNumber
  };

  axios
    .get('/search/getSearchResults', {params:params})
    .then(res => {
      if(!res.data.msg) {
        let numItems = res.data.numItems;
        let activePage = pageNumber;
        let itemsPerPage = res.data.itemsPerPage;
        let items = res.data.items;
        let searchType = st;
        dispatch(searchResultsSuccess(numItems, activePage, itemsPerPage, items, searchType));
      } else {
        // we weren't able to find any search results for some reason...
        dispatch(noSearchResults(res.data.msg));
      }
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

export const searchResultsSuccess = (numItems, activePage, itemsPerPage, items, searchType) => ({
  type: GET_SEARCH_RESULTS,
  numItems: numItems,
  activePage: activePage,
  itemsPerPage: itemsPerPage,
  items: items,
  searchType: searchType
})

export const noSearchResults = (msg) => ({
  type: NO_SEARCH_RESULTS,
  msg: msg
})