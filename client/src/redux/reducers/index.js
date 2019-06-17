import { combineReducers } from 'redux';
import AuthenticationReducers from './AuthenticationReducers';
import errorReducer from './errorReducer';
import CartReducers from './CartReducers';
import SearchReducers from './SearchReducers';

export default combineReducers({
    auth: AuthenticationReducers,
    errors: errorReducer,
    cart: CartReducers,
    search: SearchReducers,
})