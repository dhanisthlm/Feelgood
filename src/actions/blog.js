import * as request from 'axios';

export const getBlogs = () => (dispatch) => {
    return request
        .get('/blog')
        .then((data) => {
            dispatch({ type: 'GET_BLOGS', payload: data.data });
        })
        .catch((error) => {
            console.log('error', error);
        });
};