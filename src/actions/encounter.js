import * as request from 'axios';

export const saveEncounter = (encounter) => (dispatch) => {
    return request
        .post('/encounter', { encounter })
        .then(() => {
            console.log('foo')
            dispatch({ type: 'ENCOUNTER_SAVED' });
        })
        .catch((error) => {
            console.log('error', error);
        });
};

export const resetEncounter = () => (dispatch) => {
    dispatch({ type: 'RESET_ENCOUNTER' })
};