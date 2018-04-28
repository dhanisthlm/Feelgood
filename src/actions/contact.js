import * as request from 'axios';

export const sendContactInfo = (message) => (dispatch) => {
    return request
        .post('/contact', { message })
        .then((data) => {
            dispatch({ type: 'CONTACT_MESSAGE_SENT' });
        })
        .catch((error) => {
            console.log('error', error);
        });
};

export const resetContact = (message) => (dispatch) => {
    dispatch({ type: 'RESET_CONTACT' });
};