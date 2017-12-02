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

export const saveEncounter = (encounter) => (dispatch) => {
    return request
        .post('/encounter', { encounter })
        .then((data) => {
            dispatch({ type: 'ENCOUNTER_SAVED' });
        })
        .catch((error) => {
            console.log('error', error);
        });
};

export const setEncounterData = (data, cost, emailDiscount) => (dispatch) => {
    dispatch({ type: 'ENCOUNTER_DATA', payload: { data, cost, emailDiscount }});
};

export const resetEncounter = () => (dispatch) => {
    dispatch({ type: 'RESET_ENCOUNTER' })
};