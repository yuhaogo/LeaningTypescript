import {combineReducers, Reducer} from 'redux';
import LoginReducers from './login';

const rootReducers:any=combineReducers({
    login:LoginReducers
});

export default rootReducers;