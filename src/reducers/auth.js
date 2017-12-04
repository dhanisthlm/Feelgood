import { handleActions } from 'redux-actions';

const initialState = {
    username: '',
    scope: null,
    session: [],
    credentials: {},
    isAuthenticated: false
};

export default handleActions({
    AUTH_INFO: (state, action) => {
        const cred = action.payload.credentials;
        const isAuth = action.payload.isAuthenticated;

        return {
            ...state,
            credentials: cred,
            isAuthenticated: isAuth
        }
    },

    AUTH_LOGOUT: (state, action) => initialState
}, initialState);
