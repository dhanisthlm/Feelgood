import mongoose, { Schema } from 'mongoose'

const workshopSchema = Schema({
    name: {
        type: String
    },
    street: {
        type: String
    },
    postalCode: {
        type: String
    },
    city: {
        type: String
    },
    country: {
        type: String
    },
    mail: {
        type: String
    },
    phone: {
        type: String
    },
    comment: {
        type: String
    },
    newsletter: {
        type: Boolean
    },
    paymentType: {
        type: String
    },
    currency: {
        type: String
    },
    price: {
        type: Number,
        default: 0
    },
    month: {
        type: String
    },
    day: {
        type: String
    },
    workshopName: {
        type: String
    },
    date: {
        type: Date
    },
    location: {
        type: String
    },
    rating: {
        type: Object,
        default: {},

        web: {
            type: Number,
            default: 0
        },
        pay: {
            type: Number,
            default: 0
        },
        comment: {
            type: String,
            default: ''
        }
    }
});

export default mongoose.model('Workshop', workshopSchema)
