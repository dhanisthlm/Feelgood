import { handleActions } from 'redux-actions'

export default handleActions({
    ENCOUNTERS: (state, action) => {
        return {
            ...state,
            list: action.payload
        }
    },
    ENCOUNTER_SAVED: (state) => {
        return {
            ...state,
            saved: true
        }
    },
    RESET_ENCOUNTER: (state) => {
        return {
            ...state,
            saved: false
        }
    }
}, {
    saved: false,
    list: []
})
