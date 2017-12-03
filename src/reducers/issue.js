import { handleActions } from 'redux-actions'

export default handleActions({
    GET_ISSUES: (state, action) => {
        return {
            ...state,
            list: action.payload
        }
    }
}, {
    list: []
})
