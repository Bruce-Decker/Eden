import axios from 'axios'
import setTokenHeader from '../../utils/setTokenHeader'
import jwt_decode from 'jwt-decode'
import { GET_ERRORS, SET_CURRENT_USER } from './types';

export const registerUser = (userData, history) => dispatch => {
    axios
      .post('/userAuthentication/register', userData)
      .then(res => history.push('/login'))
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
        // Set token to ls
        localStorage.setItem('jwtToken', token);
        // Set token to Auth header
        setTokenHeader(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // Set current user
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
    localStorage.removeItem('token')
   
    setTokenHeader(false)
   
    dispatch(activeUser({}))
}

export const activeUser = (decrypt_data) => {
  return {
      type: SET_CURRENT_USER,
      payload: decrypt_data
  }
}