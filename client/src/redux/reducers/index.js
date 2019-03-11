import { combineReducers } from 'redux';
import AuthenticationReducers from './AuthenticationReducers'
import errorReducer from './errorReducer'


export default combineReducers({
    auth: AuthenticationReducers,
    errors: errorReducer
})