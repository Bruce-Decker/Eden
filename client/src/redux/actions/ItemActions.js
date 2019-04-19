import axios from 'axios'
import { GET_ITEMS } from './types';

const url = '/items/'


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

export const getItemsSuccess = (items) => ({
  type: GET_ITEMS,
  items
})