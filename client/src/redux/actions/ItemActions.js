import axios from 'axios'
import { GET_ITEM, GET_ITEMS } from './types';

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
        dispatch(getItemsSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
};

export const getItemSuccess = (item) => ({
  type: GET_ITEM,
  item
})

export const getItemsSuccess = (items) => ({
  type: GET_ITEMS,
  items
})