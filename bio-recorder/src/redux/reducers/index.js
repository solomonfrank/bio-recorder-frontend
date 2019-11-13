import { combineReducers } from 'redux';
import userReducer from './userReducer'
import { modalReducer } from './modalReducer';

const reducer = combineReducers({
    users: userReducer,
    isHidden: modalReducer
})

export default reducer;