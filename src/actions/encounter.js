import * as request from 'axios';

export const saveEncounter = (encounter) => (dispatch) => {
    return request
        .post('/encounter', { encounter })
        .then(() => {
            dispatch({
                type: 'ENCOUNTER_SAVED'
            });
        })
        .catch((error) => {
            console.log('error', error);
        });
};