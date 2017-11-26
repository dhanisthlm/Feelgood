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
    console.log('encounter', encounter);
    return request
        .post('/encounter', { encounter })
        .then((data) => {
            dispatch({ type: 'ENCOUNTER_SAVED' });
        })
        .catch((error) => {
            console.log('error', error);
        });
};

export const resetEncounter = () => (dispatch) => {
    dispatch({ type: 'RESET_ENCOUNTER' })
};