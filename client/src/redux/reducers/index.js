import { combineReducers } from 'redux';
import AuthenticationReducers from './AuthenticationReducers'
import errorReducer from './errorReducer'
import CartReducers from './CartReducers'


export default combineReducers({
    auth: AuthenticationReducers,
    errors: errorReducer,
    cart: CartReducers
})