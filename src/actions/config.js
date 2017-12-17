import * as request from 'axios';

export const getStripeToken = () => (dispatch) => {
    return request
        .get('/stripe')
        .then((data) => {
            dispatch({ type: 'STRIPE_TOKEN', payload: data.data });
        })
        .catch((error) => {
            console.log('error', error);
        });
};


export const getPaypalEnv = () => (dispatch) => {
    return request
        .get('/paypal')
        .then((data) => {
            dispatch({ type: 'PAYPAL_ENV', payload: data.data });
        })
        .catch((error) => {
            console.log('error', error);
        });
};