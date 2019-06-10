import axios from 'axios'
import { GET_PROPERTIES } from './types';

const url = '/properties'




export const getProperties = (nelat, swlat, nelng, swlng, price, bed, type, listing) => dispatch => {
  const params =  'nelat=' + nelat +
                  '&swlat=' + swlat +
                  '&nelng=' + nelng +
                  '&swlng=' + swlng +
                  '&price=' + price +
                  '&bed=' + bed +
                  '&type=' + type +
                  '&listing=' + listing
  return axios.get(url + '?' + params)
      .then(response => {
        dispatch(getPropertiesSuccess(response.data))
      })
      .catch(error => {
        throw(error);
      });
};

export const getPropertiesSuccess = (data) => ({
  type: GET_PROPERTIES,
  properties: data
})