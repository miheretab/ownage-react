import { combineReducers } from 'redux';
import pranksReducer from './pranksReducer';
import categoriesReducer from './categoriesReducer';

export default combineReducers({
    pranks: pranksReducer,
    categories: categoriesReducer
});