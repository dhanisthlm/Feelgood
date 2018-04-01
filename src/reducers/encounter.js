import { handleActions } from 'redux-actions'

export default handleActions({
    WORKSHOPS: (state, action) => {
        return {
            ...state,
            workshops: action.payload,
            workshopErased: false
        }
    },
    ENCOUNTERS: (state, action) => {
        return {
            ...state,
            list: action.payload,
            erased: false
        }
    },
    ENCOUNTER_SAVED: (state, action) => {
        return {
            ...state,
            stripe: action.payload,
            errorMessage: '',
            saved: true,
            rating: false,
            erased: false

        }
    },
    ENCOUNTER_DELETED: (state, action) => {
        return {
            ...state,
           erased: true
        }
    },
    RATING_SAVED: (state, action) => {
        return {
            ...state,
            rating: true,
            saved: false
        }
    },
    RESET_RATING: (state, action) => {
        return {
            ...state,
            rating: false,
            stripe: {}
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
            promoDiscount: action.payload.promoDiscount,
            errorMessage: ''
        }
    },
    STRIPE_TOKEN: (state, action) => {
        return {
            ...state,
           stripeToken: action.payload
        }
    },
    CHECKOUT_ERROR: (state, action) => {
        return {
            ...state,
            errorMessage: action.payload
        }
    },
    PAYPAL: (state, action) => {
        return {
            ...state,
            paypalId: action.payload
        }
    },
    PAYPAL_ENV: (state, action) => {
        return {
            ...state,
            paypalEnv: action.payload
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
    errorMessage: '',
    rating: false,
    erased: false,
    stripeToken: '',
    paypalId: '',
    paypalEnv: '',
    workshops: [],
    workshopErased: false
})
