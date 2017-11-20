import { handleActions } from 'redux-actions'

export default handleActions({
    ENCOUNTER_SAVED: (state) => {
        return {
            ...state,
            saved: !this.state.saved
        }
    }
}, {
    saved: false
})
