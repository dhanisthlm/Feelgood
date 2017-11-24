import * as request from 'axios';

export const getStaff = () => (dispatch) => {
    return request
        .get('/staff')
        .then((data) => {
            dispatch({ type: 'GET_STAFF', payload: data });
        })
        .catch((error) => {
            console.log('error', error);
        });
};

export const createStaff = (staff) => (dispatch) => {
    return request
        .post('/staff', { staff })
        .then((data) => {})
        .catch((error) => {
            console.log('error', error);
        });
};