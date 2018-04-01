import * as request from 'axios';

export const getWorkshops = () => (dispatch) => {
    return request
        .get('/workshops')
        .then((data) => {
            dispatch({ type: 'WORKSHOPS', payload: data.data });
        })
        .catch((error) => {
            console.log('error', error);
        });
};

export const getEncounters = () => (dispatch) => {
    return request
        .get('/encounters')
        .then((data) => {
            dispatch({ type: 'ENCOUNTERS', payload: data.data });
        })
        .catch((error) => {
            console.log('error', error);
        });
};

export const eraseWorkshop = (id) => (dispatch) => {
    return request
        .delete(`/workshop/${id}`)
        .then(() => {
            dispatch({ type: 'WORKSHOP_DELETED'});
        })
        .catch((error) => {
            console.log('error', error);
        });
};

export const payPaypal = () => (dispatch) => {
    return request
        .post('/paypal')
        .then((data) => {
            const id = data.data.id;
            dispatch({ type: 'PAYPAL', payload: id });
        })
        .catch((error) => {
            console.log('error', error);
        });
};

export const eraseEncounter = (id) => (dispatch) => {
    return request
        .delete(`/encounter/${id}`)
        .then(() => {
            dispatch({ type: 'ENCOUNTER_DELETED'});
        })
        .catch((error) => {
            console.log('error', error);
        });
};

export const saveRating = (encounterId, ratingObj) => (dispatch) => {
    const payload = { id: encounterId, ratingObj };
    return request
        .post('/rating', payload)
        .then(() => {
             console.log('save rating')
            dispatch({ type: 'RATING_SAVED' });
        })
        .catch((error) => {
            console.log('error', error);
        });
};

export const saveEncounter = (encounter, id) => (dispatch) => {
    return request
        .post('/encounter', { id, encounter })
        .then((data) => {
            if (data.data.code === 'StripeCardError') {
                dispatch({type: 'CHECKOUT_ERROR', payload: data.data.message });
            } else {
                dispatch({type: 'ENCOUNTER_SAVED', payload: data });
            }
        })
        .catch((error) => {
            console.log('error', error);
        });
};

export const setEncounterData = (data, cost, emailDiscount, promoDiscount) => (dispatch) => {
    dispatch({
        type: 'ENCOUNTER_DATA',
        payload: {
            data,
            cost,
            emailDiscount,
            promoDiscount
        }
    });
};

export const resetEncounter = () => (dispatch) => {
    dispatch({ type: 'RESET_ENCOUNTER' })
};

export const resetRating = () => (dispatch) => {
    dispatch({ type: 'RESET_RATING' })
};