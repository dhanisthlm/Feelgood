import { combineReducers } from 'redux';
import { routeReducer } from 'redux-simple-router';
import encounter from './encounter';
import staff from './staff';
import issue from './issue';
import auth from './auth';

export default combineReducers({
    routeReducer,
    encounter,
    staff,
    issue,
    auth
})
