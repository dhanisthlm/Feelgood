import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import encounter from './encounter';
import staff from './staff';

export default combineReducers({
    routeReducer,
    encounter,
    staff
})
