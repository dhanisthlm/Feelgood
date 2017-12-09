import { handleActions } from 'redux-actions'

export default handleActions({
    ENCOUNTERS: (state, action) => {
        return {
            ...state,
            list: action.payload
        }
    },
    ENCOUNTER_SAVED: (state, action) => {
        return {
            ...state,
            stripe: action.payload,
            saved: true
        }
    },
    RESET_ENCOUNTER: (state) => {
        return {
            ...state,
            saved: false
        }
    },
    ENCOUNTER_DATA: (state, action) => {
        return {
            ...state,
            data: action.payload.data,
            cost: action.payload.cost,
            emailDiscount: action.payload.emailDiscount,
            promoDiscount: action.payload.promoDiscount
        }
    },
    CHECKOUT_ERROR: (state, action) => {
        return {
            ...state,
            errorMessage: action.payload
        }
    }
}, {
    saved: false,
    list: [],
    data: {},
    cost: {},
    stripe: {},
    emailDiscount: 0,
    promoDiscount: 0,
    errorMessage: ''
})
