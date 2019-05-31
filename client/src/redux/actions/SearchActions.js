import { GET_ERRORS, GET_SEARCH_RESULTS, GET_SEARCH_PAGE } from './types';
import axios from 'axios';

export const getSearchResults = () => dispatch => {
  // obtain url, containing search query
  let uri = window.location.href;

  // isolate search query
  let cmp = uri.substring(uri.lastIndexOf('/') + 1);

  // remove any extra query parameters
  if(cmp.indexOf('?') > -1) {
    cmp = cmp.substring(0, cmp.indexOf('?'));
  }

  let uri_dec = decodeURIComponent(cmp);
  let params = {
    simple: 'true',
    keyword: uri_dec,
  };

  axios
    .get('/search/getSearchResults', {params:params})
    .then(res => {
      let numItems = res.data.numItems;
      let activePage = 1;
      let itemsPerPage = res.data.itemsPerPage;
      let items = res.data.items;
      dispatch(searchResultsSuccess(numItems, activePage, itemsPerPage, items));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

export const getSearchPage = (pageNumber) => dispatch => {
  let params = {
    pageNumber: pageNumber
  }

  axios
    .get('/search/getSearchPage', {params:params})
    .then(res => {
      let activePage = pageNumber;
      let items = res.data;
      dispatch(searchPageSuccess(activePage, items));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

export const searchResultsSuccess = (numItems, activePage, itemsPerPage, items) => ({
  type: GET_SEARCH_RESULTS,
  numItems: numItems,
  activePage: activePage,
  itemsPerPage: itemsPerPage,
  items: items
})

export const searchPageSuccess = (activePage, items) => ({
  type: GET_SEARCH_PAGE,
  activePage: activePage,
  items: items
})