import mongoose, { Schema } from 'mongoose'

const encounterSchema = Schema({
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
    skype: {
        type: String,
        default: ''
    },
    mail: {
      type: String
    },
    phone: {
      type: String
    },
    issue: {
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
    timeframe: {
        type: String
    },
    order: {
        skype: {
            week: {
                type: Number,
                default: 0
            },
            cost: {
                type: Number,
                default: 0
            },
            duration: {
                type: Number,
                default: 0
            }
        },
        email: {
           week: {
               type: Number,
               default: 0
           },
            cost: {
               type: Number,
                default: 0
            }
        }
    },
    price: {
        type: Number,
        default: 0
    },
    date: {
        type: Date
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

export default mongoose.model('Encounter', encounterSchema)
