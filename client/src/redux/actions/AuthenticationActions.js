import axios from 'axios';
import setTokenHeader from '../../utils/setTokenHeader';
import getRandomInt from '../../utils/utils';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS, SET_CURRENT_USER } from './types';

export const registerUser = (userData, history) => dispatch => {
    axios
      .post('/userAuthentication/register', userData)
      .then(res => {
        // create the cart for the user
        let cartData = {
          cart_id: getRandomInt(100000,999999).toString(),
          items: [],
          email: userData.email
        };

        axios
          .post('/cart/createCart', cartData)
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });


        history.push('/login');
      })
      .catch(err =>
       
      
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };

  export const setCurrentUser = decoded => {
    return {
      type: SET_CURRENT_USER,
      payload: decoded
    };
  };

  export const loginUser = userData => dispatch => {
    axios
      .post('/userAuthentication/login', userData)
      .then(res => {
        // Save to localStorage
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('currentUser', userData.email);

        // Set token to Auth header
        setTokenHeader(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // Set current user
        console.log("dsdfsd " + JSON.stringify(decoded))
        dispatch(setCurrentUser(decoded));
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };

export const logout = () => dispatch => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('currentUser');
   
    setTokenHeader(false);
   
    dispatch(activeUser({}));
}

export const activeUser = (decrypt_data) => {
  return {
      type: SET_CURRENT_USER,
      payload: decrypt_data
  }
}