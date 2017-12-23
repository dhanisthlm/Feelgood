import * as request from 'axios';
import store from '../store';
import { logout } from '../actions/auth';

export const requireAuth = (nextState, replace, callback) => {
    request
        .get('/auth/ping')
        .then(({ data }) => {
            const body = document.getElementsByTagName('body')[0];
            body.classList.add('inside');

            if (data.isAuthenticated === false) {
                replace('/');
            }
            store.dispatch({
                type: 'AUTH_INFO',
                payload: data
            });
            callback();
        })
        .catch((error) => {
            if (error.response && error.response.status === 401) {
                store.dispatch(logout());
                replace('/admin/logout')
            }
        })
        .then(callback);
};