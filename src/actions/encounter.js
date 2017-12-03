import * as request from 'axios';

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

export const saveEncounter = (id, encounter) => (dispatch) => {
    return request
        .post('/encounter', { id, encounter })
        .then((data) => {
            dispatch({ type: 'ENCOUNTER_SAVED' });
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