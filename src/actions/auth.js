import * as request from 'axios';
import { routeActions } from 'redux-simple-router';

export const login = (credentials) => (dispatch) => {
    return request
        .post('/auth/login', credentials)
        .then(({ data }) => {
            console.log('data', data);
            dispatch(routeActions.replace('/admin'));
        })
        .catch((error) => {
            console.log('error', error);
        });
};

export const register = (credentials) => (dispatch) => {
    return request
        .post('/auth/signup', credentials)
        .then(({ data }) => {
            dispatch(routeActions.replace('/login'));
        })
        .catch((error) => {
            console.log('error', error);
        });
};

export const logout = (auth) => (dispatch) => {
    return request
        .get('auth/logout')
        .then(({ data }) => {
            dispatch(routeActions.replace('/anka'));
            dispatch({
                type: 'AUTH_LOGOUT',
                payload: data
            });

            dispatch(gotoLogout());
        })
        .catch((error) => {
            console.log(error)
        });
};

export const gotoLogout = () => (dispatch) => {
    dispatch(routeActions.replace('/anka'));
};


export const ping = () => (dispatch) => {
    return request
        .get('/auth/ping')
        .then((data) => {
            dispatch({
                type: 'AUTH_INFO',
                payload: data.data
            });
        });
};
