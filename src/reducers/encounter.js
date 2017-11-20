import { handleActions } from 'redux-actions'

export default handleActions({
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
    saved: false
})
