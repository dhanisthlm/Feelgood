import { handleActions } from 'redux-actions'

export default handleActions({
    GET_STAFF: (state, action) => {
        return {
            ...state,
           list: action.payload
        }
    }
}, {
    list: []
})
