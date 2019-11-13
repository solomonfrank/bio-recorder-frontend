import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers';
import logger from 'redux-logger'
import thunk from 'redux-thunk';

const middleware = [thunk];

if(process.env.NODE_ENV === 'development'){
    middleware.push(logger);
}

const store = createStore(reducer, applyMiddleware(...middleware));

export default store;
