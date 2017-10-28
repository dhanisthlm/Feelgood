import { handleActions } from 'redux-actions'

export default handleActions({
    LOAD_IMAGES: (state, action) => {
        return {
            ...state,
            list: action.payload

        }
    },
    RESET_MEDIA: (state, action) => {
        return {
            ...state,
            list: []
        }
    },
    LOADER: (state) => {
        return {
            ...state,
            list: [],
            isLoading: 'loader'
        }
    },
    RESET_LOADING: (state) => {
        return {
            ...state,
            isLoading: ''
        }


    },
    DETAIL: (state, action) => {
        return {
            ...state,
            detail: action.payload
        }
    },
    STATUS: (state, action) => {
        return {
            ...state,
            active: action.payload === 'image'
        }
    },
    SEARCH: (state, action) => {
        return {
            ...state,
            list: [],
            search: action.payload
        }
    },
}, {
    list: [],
    detail: [],
    active: true,
    isLoading: '',
    search: ''
})
