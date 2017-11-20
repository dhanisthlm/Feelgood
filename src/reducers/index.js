import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import encounter from './encounter';

export default combineReducers({
    routeReducer,
    encounter
})
