import * as request from 'axios';

export const getIssues = () => (dispatch) => {
    return request
        .get('/issues')
        .then((data) => {
            dispatch({ type: 'GET_ISSUES', payload: data.data });
        })
        .catch((error) => {
            console.log('error', error);
        });
};