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

export const getNewsletters = () => (dispatch) => {
    return request
        .get('/newsletter')
        .then((data) => {
            console.log(data);
            dispatch({ type: 'NEWSLETTERS', payload: data.data });
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

export const eraseNewsletter = (id) => (dispatch) => {
    return request
        .delete(`/newsletter/${id}`)
        .then(() => {
            dispatch({ type: 'NEWSLETTER_DELETED'});
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
    console.log(encounter, id);
    
    return request
        .post('/encounter', { encounter, id })
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

export const addUserToNewsletter = (email) => (dispatch) => {
    return request
        .post('/newsletter', { email })
        .then((data) => {
        })
        .catch((error) => {
            console.log('error', error);
        });
};
