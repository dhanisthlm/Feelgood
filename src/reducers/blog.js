import { handleActions } from 'redux-actions'

export default handleActions({
    GET_BLOGS: (state, action) => {
        return {
            ...state,
            list: action.payload
        }
    }
}, {
    list: []
})
