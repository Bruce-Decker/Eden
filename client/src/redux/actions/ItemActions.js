import axios from 'axios'
import { GET_ITEM, GET_ITEMS, GET_ITEMS_PAGE } from './types';

const url = '/items/'

export const getItem = (id) => dispatch => {
  return axios.get(url + id)
      .then(response => {
        dispatch(getItemSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
};

export const getItems = () => dispatch => {
  return axios.get(url)
      .then(response => {
        dispatch(getItemsSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
};

export const getItemsByCategory = (category) => dispatch => {
  return axios.get(url + '?category=' + category)
      .then(response => {
        dispatch(getItemsSuccess(1, response.data))
      })
      .catch(error => {
        throw(error);
      });
};

export const getItemsByPageNumber = (category, pageNumber) => dispatch => {
  return axios.get(url + '?category=' + category + '&page=' + pageNumber)
      .then(response => {
        dispatch(getPageSuccess(pageNumber, response.data))
      })
      .catch(error => {
        throw(error);
      });
};

export const getItemSuccess = (item) => ({
  type: GET_ITEM,
  item
})

export const getItemsSuccess = (activePage, data) => ({
  type: GET_ITEMS,
  activePage: activePage,
  numItems: data.numItems,
  itemsPerPage: data.itemsPerPage,
  items: data.items
})

export const getPageSuccess = (activePage, data) => ({
  type: GET_ITEMS_PAGE,
  activePage: activePage,
  items: data.items
})