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
    },
    ENCOUNTER_DATA: (state, action) => {
        return {
            ...state,
            data: action.payload.data,
            cost: action.payload.cost,
            emailDiscount: action.payload.emailDiscount,
            promoDiscount: action.payload.promoDiscount
        }
    }
}, {
    saved: false,
    list: [],
    data: {},
    cost: {},
    emailDiscount: 0,
    promoDiscount: 0
})
